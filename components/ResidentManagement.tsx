'use client'

import { useState } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const ResidentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock resident data
  const residents = [
    {
      id: 1,
      name: 'John Smith',
      age: 78,
      room: '101A',
      status: 'active',
      careLevel: 'Assisted Living',
      primaryContact: 'Jane Smith',
      phone: '(555) 123-4567',
      email: 'jane.smith@email.com',
      address: '123 Main St, Anytown, ST 12345',
      admissionDate: '2023-01-15',
      medications: 5,
      alerts: 0,
      lastAssessment: '2024-01-10'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      age: 82,
      room: '102B',
      status: 'active',
      careLevel: 'Memory Care',
      primaryContact: 'Michael Johnson',
      phone: '(555) 234-5678',
      email: 'michael.johnson@email.com',
      address: '456 Oak Ave, Somewhere, ST 23456',
      admissionDate: '2022-11-20',
      medications: 8,
      alerts: 2,
      lastAssessment: '2024-01-08'
    },
    {
      id: 3,
      name: 'Robert Davis',
      age: 75,
      room: '103A',
      status: 'pending',
      careLevel: 'Independent Living',
      primaryContact: 'Sarah Davis',
      phone: '(555) 345-6789',
      email: 'sarah.davis@email.com',
      address: '789 Pine Rd, Elsewhere, ST 34567',
      admissionDate: '2024-01-05',
      medications: 3,
      alerts: 1,
      lastAssessment: '2024-01-12'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      age: 79,
      room: '104B',
      status: 'active',
      careLevel: 'Assisted Living',
      primaryContact: 'David Wilson',
      phone: '(555) 456-7890',
      email: 'david.wilson@email.com',
      address: '321 Elm St, Nowhere, ST 45678',
      admissionDate: '2023-06-10',
      medications: 6,
      alerts: 0,
      lastAssessment: '2024-01-05'
    }
  ]

  const filteredResidents = residents.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.room.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || resident.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'status-active',
      pending: 'status-pending',
      inactive: 'status-inactive',
      discharged: 'status-inactive'
    }
    return `status-badge ${statusClasses[status as keyof typeof statusClasses] || 'status-inactive'}`
  }

  const getCareLevelColor = (careLevel: string) => {
    const colors = {
      'Independent Living': 'text-blue-600 bg-blue-100',
      'Assisted Living': 'text-green-600 bg-green-100',
      'Memory Care': 'text-purple-600 bg-purple-100',
      'Skilled Nursing': 'text-orange-600 bg-orange-100'
    }
    return colors[careLevel as keyof typeof colors] || 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resident Management</h1>
          <p className="text-gray-600">Manage resident information, care plans, and assessments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Resident
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search residents by name or room number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-auto"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="discharged">Discharged</option>
            </select>
            <button className="btn-secondary flex items-center">
              <FunnelIcon className="h-5 w-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Residents Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Care Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alerts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResidents.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {resident.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                        <div className="text-sm text-gray-500">{resident.age} years old</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{resident.room}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(resident.status)}>
                      {resident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCareLevelColor(resident.careLevel)}`}>
                      {resident.careLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{resident.medications}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resident.alerts > 0 ? (
                      <span className="status-badge status-alert">{resident.alerts}</span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{resident.lastAssessment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900" aria-label="View resident">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" aria-label="Edit resident">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-danger-600 hover:text-danger-900" aria-label="Delete resident">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resident Details Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Resident</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input type="text" className="input-field" placeholder="Enter full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input type="number" className="input-field" placeholder="Age" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room
                    </label>
                    <input type="text" className="input-field" placeholder="Room number" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Care Level
                  </label>
                  <select className="input-field" aria-label="Select care level">
                    <option>Independent Living</option>
                    <option>Assisted Living</option>
                    <option>Memory Care</option>
                    <option>Skilled Nursing</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Resident
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResidentManagement
