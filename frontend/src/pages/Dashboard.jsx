import React, { useState, useEffect } from 'react';
import { analyticsAPI, productsAPI } from '../services/api';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  Users,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { es } from 'date-fns/locale';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(30);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const startDate = format(subDays(new Date(), dateRange), 'yyyy-MM-dd');
      const endDate = format(new Date(), 'yyyy-MM-dd');
      const params = { startDate, endDate };

      const [
        dashboardRes,
        topProductsRes,
        categoryRes,
        genderRes,
        branchRes,
        recommendationsRes,
      ] = await Promise.all([
        analyticsAPI.getDashboard(params),
        analyticsAPI.getTopProducts({ ...params, limit: 5 }),
        analyticsAPI.getByCategory(params),
        analyticsAPI.getByGender(params),
        analyticsAPI.getByBranch(params),
        analyticsAPI.getRecommendations(),
      ]);

      setKpis(dashboardRes.data.kpis);
      setTopProducts(topProductsRes.data.products);
      setCategoryData(categoryRes.data.data);
      setGenderData(genderRes.data.data);
      setBranchData(branchRes.data.data);
      setRecommendations(recommendationsRes.data.recommendations);
    } catch (error) {
      console.error('Error loading dashboard:', error);
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

  const StatCard = ({ title, value, icon: Icon, change, color }) => (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Resumen general de ventas e inventario
          </p>
        </div>
        
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Totales"
          value={kpis?.totalSales || 0}
          icon={ShoppingBag}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Ingresos"
          value={formatCurrency(kpis?.totalRevenue || 0)}
          icon={DollarSign}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Ganancia"
          value={formatCurrency(kpis?.totalProfit || 0)}
          icon={TrendingUp}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Ticket Promedio"
          value={formatCurrency(kpis?.avgTicket || 0)}
          icon={BarChart3}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Alerts */}
      {recommendations.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Recomendaciones Inteligentes
            </h2>
          </div>
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high'
                    ? 'bg-red-50 border-red-500'
                    : rec.priority === 'medium'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    {rec.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Top 5 Productos Más Vendidos
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => value.toLocaleString()}
              />
              <Bar dataKey="totalQuantity" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Gender */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Ventas por Género
          </h2>
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
                  `${_id} ${(percent * 100).toFixed(0)}%`
                }
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Ventas por Categoría (Top 10)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis dataKey="_id" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="totalRevenue" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Branch */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Ventas por Sucursal
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="_id"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  typeof value === 'number' && value > 1000
                    ? formatCurrency(value)
                    : value.toLocaleString()
                }
              />
              <Legend />
              <Bar dataKey="totalSales" fill="#10b981" radius={[8, 8, 0, 0]} name="Ventas" />
              <Bar dataKey="totalRevenue" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Ingresos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm font-medium">Productos Totales</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {kpis?.totalProducts || 0}
          </p>
        </div>

        <div className="card text-center">
          <div className="inline-block p-3 bg-yellow-100 rounded-full mb-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-gray-600 text-sm font-medium">Alertas Stock Bajo</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {kpis?.lowStockAlerts || 0}
          </p>
        </div>

        <div className="card text-center">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 text-sm font-medium">Margen de Ganancia</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {kpis?.profitMargin || 0}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

