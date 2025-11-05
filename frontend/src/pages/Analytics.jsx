import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import {
  BarChart3,
  TrendingUp,
  Users,
  Shirt,
  Store,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays } from 'date-fns';

const Analytics = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(30);
  const [selectedGender, setSelectedGender] = useState('');

  const COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#ef4444',
    '#06b6d4',
    '#84cc16',
  ];

  useEffect(() => {
    loadAnalytics();
  }, [dateRange, selectedGender]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const startDate = format(subDays(new Date(), dateRange), 'yyyy-MM-dd');
      const endDate = format(new Date(), 'yyyy-MM-dd');
      const params = { startDate, endDate };

      const [
        topProductsRes,
        categoryRes,
        genderRes,
        sizeRes,
        branchRes,
        trendRes,
      ] = await Promise.all([
        analyticsAPI.getTopProducts({ ...params, limit: 10 }),
        analyticsAPI.getByCategory(params),
        analyticsAPI.getByGender(params),
        analyticsAPI.getBySize({ ...params, gender: selectedGender }),
        analyticsAPI.getByBranch(params),
        analyticsAPI.getSalesTrend({ ...params, groupBy: 'day' }),
      ]);

      setTopProducts(topProductsRes.data.products);
      setCategoryData(categoryRes.data.data);
      setGenderData(genderRes.data.data);
      setSizeData(sizeRes.data.data);
      setBranchData(branchRes.data.data);
      setSalesTrend(trendRes.data.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatTrendData = (data) => {
    return data.map((item) => ({
      ...item,
      date: `${item._id.day}/${item._id.month}`,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Análisis Avanzado</h1>
          <p className="text-gray-600 mt-1">
            Análisis detallado de ventas por múltiples dimensiones
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value={7}>Últimos 7 días</option>
            <option value={30}>Últimos 30 días</option>
            <option value={60}>Últimos 60 días</option>
            <option value={90}>Últimos 90 días</option>
          </select>
        </div>
      </div>

      {/* Top Products */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Top 10 Productos Más Vendidos
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={120}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value, name) => {
                if (name === 'totalRevenue') return [formatCurrency(value), 'Ingresos'];
                return [value.toLocaleString(), name];
              }}
            />
            <Legend />
            <Bar
              dataKey="totalQuantity"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="Unidades"
            />
            <Bar
              dataKey="totalRevenue"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              name="Ingresos"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Trend */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Tendencia de Ventas</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatTrendData(salesTrend)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'totalRevenue') return [formatCurrency(value), 'Ingresos'];
                return [value.toLocaleString(), 'Ventas'];
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalSales"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Ventas"
              dot={{ fill: '#3b82f6', r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalRevenue"
              stroke="#10b981"
              strokeWidth={3}
              name="Ingresos"
              dot={{ fill: '#10b981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gender and Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Gender */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-pink-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Análisis por Género
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="totalRevenue"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ _id, percent }) =>
                  `${_id} ${(percent * 100).toFixed(1)}%`
                }
                labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>

          {/* Gender Stats Table */}
          <div className="mt-6 space-y-2">
            {genderData.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-medium text-gray-900">{item._id}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.totalRevenue)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.totalQuantity} unidades
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Category Top 10 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Shirt className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Top 10 Categorías
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis dataKey="_id" type="category" width={120} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="totalRevenue" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Category Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Categorías</p>
              <p className="text-2xl font-bold text-purple-600">
                {categoryData.length}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Categoría Top</p>
              <p className="text-sm font-bold text-blue-600">
                {categoryData[0]?._id || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Size Analysis */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shirt className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Análisis por Talla
            </h2>
          </div>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos los géneros</option>
            {genderData.map((g) => (
              <option key={g._id} value={g._id}>
                {g._id}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sizeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="_id.size" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                value.toLocaleString(),
                name === 'totalQuantity' ? 'Unidades' : name,
              ]}
            />
            <Legend />
            <Bar
              dataKey="totalQuantity"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="Unidades Vendidas"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Branch Performance */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Store className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Rendimiento por Sucursal
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={branchData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="_id"
              tick={{ fontSize: 11 }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'totalRevenue' || name === 'avgTicket')
                  return [formatCurrency(value), name];
                return [value.toLocaleString(), name];
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="totalSales"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="Ventas"
            />
            <Bar
              yAxisId="right"
              dataKey="totalRevenue"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              name="Ingresos"
            />
            <Bar
              yAxisId="right"
              dataKey="avgTicket"
              fill="#f59e0b"
              radius={[8, 8, 0, 0]}
              name="Ticket Prom."
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

