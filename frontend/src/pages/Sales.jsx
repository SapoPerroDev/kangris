import React, { useState, useEffect } from 'react';
import { salesAPI } from '../services/api';
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  TrendingUp,
  Store,
  CreditCard,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBranch, setFilterBranch] = useState('');
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalProfit: 0,
    avgTicket: 0,
  });

  const branches = [
    'Bogotá Centro',
    'Medellín Norte',
    'Cali Sur',
    'Barranquilla',
    'Cartagena',
    'Bucaramanga',
  ];

  useEffect(() => {
    loadSales();
  }, [filterBranch]);

  const loadSales = async () => {
    try {
      setLoading(true);
      const params = filterBranch ? { branch: filterBranch } : {};
      const response = await salesAPI.getAll(params);
      const salesData = response.data.sales;
      setSales(salesData);

      // Calculate stats
      const totalRevenue = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
      const totalProfit = salesData.reduce((sum, sale) => sum + sale.totalProfit, 0);
      const avgTicket = salesData.length > 0 ? totalRevenue / salesData.length : 0;

      setStats({
        totalSales: salesData.length,
        totalRevenue,
        totalProfit,
        avgTicket,
      });
    } catch (error) {
      console.error('Error loading sales:', error);
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

  const getPaymentMethodColor = (method) => {
    const colors = {
      Efectivo: 'bg-green-100 text-green-700',
      Tarjeta: 'bg-blue-100 text-blue-700',
      Transferencia: 'bg-purple-100 text-purple-700',
      Mixto: 'bg-orange-100 text-orange-700',
    };
    return colors[method] || 'bg-gray-100 text-gray-700';
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
          <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
          <p className="text-gray-600 mt-1">
            Historial y registro de todas las transacciones
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Ventas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalSales}
              </p>
            </div>
            <ShoppingCart className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ingresos</p>
              <p className="text-xl font-bold text-green-600 mt-1">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ganancia</p>
              <p className="text-xl font-bold text-purple-600 mt-1">
                {formatCurrency(stats.totalProfit)}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ticket Promedio</p>
              <p className="text-xl font-bold text-orange-600 mt-1">
                {formatCurrency(stats.avgTicket)}
              </p>
            </div>
            <CreditCard className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card">
        <div className="flex items-center gap-4">
          <Store className="w-5 h-5 text-gray-500" />
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas las sucursales</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  N° Venta
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sucursal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ganancia
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pago
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-primary-600">
                      {sale.saleNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {format(new Date(sale.saleDate), "d 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                    <br />
                    <span className="text-xs text-gray-500">
                      {format(new Date(sale.saleDate), 'HH:mm')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{sale.branch}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                      {sale.items.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatCurrency(sale.totalAmount)}
                  </td>
                  <td className="px-6 py-4 font-medium text-green-600">
                    {formatCurrency(sale.totalProfit)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(
                        sale.paymentMethod
                      )}`}
                    >
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sales.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron ventas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;

