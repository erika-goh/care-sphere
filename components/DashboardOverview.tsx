'use client'

import { useState } from 'react'
import { 
  UsersIcon, 
  BeakerIcon, 
  CalendarIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const DashboardOverview = () => {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data for charts
  const occupancyData = [
    { name: 'Mon', occupancy: 85, admissions: 3, discharges: 1 },
    { name: 'Tue', occupancy: 87, admissions: 2, discharges: 0 },
    { name: 'Wed', occupancy: 89, admissions: 4, discharges: 2 },
    { name: 'Thu', occupancy: 91, admissions: 1, discharges: 1 },
    { name: 'Fri', occupancy: 88, admissions: 3, discharges: 2 },
    { name: 'Sat', occupancy: 86, admissions: 1, discharges: 1 },
    { name: 'Sun', occupancy: 84, admissions: 2, discharges: 3 },
  ]

  const medicationData = [
    { name: 'On Time', value: 78, color: '#22c55e' },
    { name: 'Late', value: 15, color: '#f59e0b' },
    { name: 'Missed', value: 7, color: '#ef4444' },
  ]

  const quickActions = [
    { name: 'Add Resident', icon: UsersIcon, color: 'primary', action: () => console.log('Add resident') },
    { name: 'Schedule Medication', icon: BeakerIcon, color: 'healthcare', action: () => console.log('Schedule medication') },
    { name: 'Create Care Plan', icon: ChartBarIcon, color: 'warning', action: () => console.log('Create care plan') },
    { name: 'Assign Staff', icon: CalendarIcon, color: 'primary', action: () => console.log('Assign staff') },
  ]

  const stats = [
    { name: 'Total Residents', value: '142', change: '+3', changeType: 'positive', icon: UsersIcon },
    { name: 'Medications Due', value: '23', change: '-5', changeType: 'negative', icon: BeakerIcon },
    { name: 'Staff on Duty', value: '18', change: '+2', changeType: 'positive', icon: CalendarIcon },
    { name: 'Alerts', value: '3', change: '-1', changeType: 'negative', icon: ExclamationTriangleIcon },
  ]

  const recentActivities = [
    { id: 1, type: 'medication', message: 'Medication administered to John Smith', time: '2 min ago', status: 'completed' },
    { id: 2, type: 'care', message: 'Care plan updated for Mary Johnson', time: '15 min ago', status: 'completed' },
    { id: 3, type: 'alert', message: 'Fall risk alert for Robert Davis', time: '1 hour ago', status: 'pending' },
    { id: 4, type: 'admission', message: 'New resident admitted: Sarah Wilson', time: '2 hours ago', status: 'completed' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
            aria-label="Select time range"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-healthcare-600' : 'text-danger-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from yesterday</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Chart */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Occupancy & Admissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="occupancy" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="admissions" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="discharges" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={action.action}
                className={`w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 ${
                  action.color === 'primary' ? 'hover:bg-primary-50' :
                  action.color === 'healthcare' ? 'hover:bg-healthcare-50' :
                  action.color === 'warning' ? 'hover:bg-warning-50' : 'hover:bg-gray-50'
                }`}
              >
                <action.icon className={`h-5 w-5 mr-3 ${
                  action.color === 'primary' ? 'text-primary-600' :
                  action.color === 'healthcare' ? 'text-healthcare-600' :
                  action.color === 'warning' ? 'text-warning-600' : 'text-gray-600'
                }`} />
                <span className="text-sm font-medium text-gray-700">{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medication Compliance and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medication Compliance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Compliance</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={medicationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {medicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {medicationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-healthcare-400' :
                  activity.status === 'pending' ? 'bg-warning-400' : 'bg-danger-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
                <span className={`status-badge ${
                  activity.status === 'completed' ? 'status-active' :
                  activity.status === 'pending' ? 'status-pending' : 'status-alert'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
