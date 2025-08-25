'use client'

import { useState } from 'react'
import { 
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview')
  const [dateRange, setDateRange] = useState('30d')

  // Mock data for charts
  const occupancyData = [
    { month: 'Jan', occupancy: 85, admissions: 12, discharges: 8, revenue: 125000 },
    { month: 'Feb', occupancy: 87, admissions: 15, discharges: 10, revenue: 132000 },
    { month: 'Mar', occupancy: 89, admissions: 18, discharges: 12, revenue: 138000 },
    { month: 'Apr', occupancy: 91, admissions: 14, discharges: 9, revenue: 145000 },
    { month: 'May', occupancy: 88, admissions: 16, discharges: 11, revenue: 140000 },
    { month: 'Jun', occupancy: 86, admissions: 13, discharges: 10, revenue: 135000 },
  ]

  const medicationComplianceData = [
    { month: 'Jan', onTime: 78, late: 15, missed: 7 },
    { month: 'Feb', onTime: 82, late: 12, missed: 6 },
    { month: 'Mar', onTime: 85, late: 10, missed: 5 },
    { month: 'Apr', onTime: 88, late: 8, missed: 4 },
    { month: 'May', onTime: 90, late: 7, missed: 3 },
    { month: 'Jun', onTime: 92, late: 5, missed: 3 },
  ]

  const carePlanProgressData = [
    { category: 'Mobility', completed: 85, inProgress: 12, notStarted: 3 },
    { category: 'Medication', completed: 92, inProgress: 6, notStarted: 2 },
    { category: 'Nutrition', completed: 78, inProgress: 18, notStarted: 4 },
    { category: 'Social', completed: 70, inProgress: 25, notStarted: 5 },
    { category: 'Safety', completed: 88, inProgress: 10, notStarted: 2 },
  ]

  const staffUtilizationData = [
    { role: 'Nurses', utilization: 92, satisfaction: 4.2 },
    { role: 'Caregivers', utilization: 88, satisfaction: 4.0 },
    { role: 'Therapists', utilization: 85, satisfaction: 4.3 },
    { role: 'Administrative', utilization: 78, satisfaction: 3.8 },
    { role: 'Support Staff', utilization: 82, satisfaction: 4.1 },
  ]

  const reports = [
    { id: 'overview', name: 'Overview Dashboard', icon: ChartBarIcon, description: 'Key metrics and performance indicators' },
    { id: 'occupancy', name: 'Occupancy Report', icon: DocumentTextIcon, description: 'Resident occupancy and admission trends' },
    { id: 'medications', name: 'Medication Compliance', icon: DocumentTextIcon, description: 'Medication administration and compliance rates' },
    { id: 'care-plans', name: 'Care Plan Progress', icon: DocumentTextIcon, description: 'Care plan completion and effectiveness' },
    { id: 'staff', name: 'Staff Utilization', icon: DocumentTextIcon, description: 'Staff productivity and satisfaction metrics' },
    { id: 'financial', name: 'Financial Summary', icon: DocumentTextIcon, description: 'Revenue, costs, and financial performance' },
  ]

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="text-2xl font-bold text-primary-600">142</div>
                <div className="text-sm text-gray-600">Total Residents</div>
                <div className="text-xs text-healthcare-600 mt-1">+3 this month</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-healthcare-600">89%</div>
                <div className="text-sm text-gray-600">Occupancy Rate</div>
                <div className="text-xs text-healthcare-600 mt-1">+2% vs last month</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-warning-600">92%</div>
                <div className="text-sm text-gray-600">Medication Compliance</div>
                <div className="text-xs text-healthcare-600 mt-1">+3% vs last month</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-primary-600">$145K</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
                <div className="text-xs text-healthcare-600 mt-1">+5% vs last month</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Occupancy Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="occupancy" stroke="#0ea5e9" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Compliance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={medicationComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="onTime" stackId="1" stroke="#22c55e" fill="#22c55e" />
                    <Area type="monotone" dataKey="late" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="missed" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
      
      case 'occupancy':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Occupancy & Admissions</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="occupancy" fill="#0ea5e9" />
                  <Bar yAxisId="left" dataKey="admissions" fill="#22c55e" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      case 'medications':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Compliance Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={medicationComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="missed" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      case 'care-plans':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Care Plan Progress by Category</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={carePlanProgressData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip />
                  <Bar dataKey="completed" stackId="a" fill="#22c55e" />
                  <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="notStarted" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      case 'staff':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Utilization & Satisfaction</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={staffUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="utilization" fill="#0ea5e9" />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      default:
        return <div>Select a report to view</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive healthcare analytics and performance insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field w-auto"
            aria-label="Select date range"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn-secondary flex items-center">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Available Reports</h2>
          <button className="btn-secondary flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                selectedReport === report.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-2">
                <report.icon className={`h-5 w-5 mr-2 ${
                  selectedReport === report.id ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className={`font-medium ${
                  selectedReport === report.id ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {report.name}
                </span>
              </div>
              <p className={`text-sm ${
                selectedReport === report.id ? 'text-primary-600' : 'text-gray-600'
              }`}>
                {report.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Report Content */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {reports.find(r => r.id === selectedReport)?.name}
          </h2>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center">
              <EyeIcon className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button className="btn-primary flex items-center">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>
        
        {renderReportContent()}
      </div>
    </div>
  )
}

export default Reports
