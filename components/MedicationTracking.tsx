'use client'

import { useState } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  BellIcon
} from '@heroicons/react/24/outline'

const MedicationTracking = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock medication data
  const medications = [
    {
      id: 1,
      residentName: 'John Smith',
      room: '101A',
      medicationName: 'Lisinopril 10mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '08:00',
      status: 'administered',
      administeredBy: 'Nurse Sarah',
      administeredAt: '2024-01-15 08:05',
      notes: 'Taken with breakfast',
      lastRefill: '2024-01-01',
      refillsRemaining: 2,
      alerts: []
    },
    {
      id: 2,
      residentName: 'Mary Johnson',
      room: '102B',
      medicationName: 'Donepezil 5mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '20:00',
      status: 'due',
      administeredBy: null,
      administeredAt: null,
      notes: 'Take at bedtime',
      lastRefill: '2024-01-10',
      refillsRemaining: 1,
      alerts: ['Low supply', 'Due for refill']
    },
    {
      id: 3,
      residentName: 'Robert Davis',
      room: '103A',
      medicationName: 'Metformin 500mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      time: '08:00, 20:00',
      status: 'overdue',
      administeredBy: null,
      administeredAt: null,
      notes: 'Take with meals',
      lastRefill: '2024-01-05',
      refillsRemaining: 3,
      alerts: ['Overdue by 2 hours']
    },
    {
      id: 4,
      residentName: 'Sarah Wilson',
      room: '104B',
      medicationName: 'Warfarin 5mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '18:00',
      status: 'administered',
      administeredBy: 'Nurse Mike',
      administeredAt: '2024-01-15 18:02',
      notes: 'Monitor INR levels',
      lastRefill: '2024-01-12',
      refillsRemaining: 0,
      alerts: ['No refills remaining']
    }
  ]

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.room.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || med.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      administered: 'status-active',
      due: 'status-pending',
      overdue: 'status-alert',
      missed: 'status-inactive'
    }
    return `status-badge ${statusClasses[status as keyof typeof statusClasses] || 'status-inactive'}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'administered':
        return <CheckCircleIcon className="h-5 w-5 text-healthcare-600" />
      case 'due':
        return <ClockIcon className="h-5 w-5 text-warning-600" />
      case 'overdue':
        return <ExclamationTriangleIcon className="h-5 w-5 text-danger-600" />
      case 'missed':
        return <XCircleIcon className="h-5 w-5 text-gray-600" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const getTimeUntilDue = (time: string) => {
    const now = new Date()
    const [hours, minutes] = time.split(':').map(Number)
    const dueTime = new Date()
    dueTime.setHours(hours, minutes, 0, 0)
    
    if (dueTime < now) {
      dueTime.setDate(dueTime.getDate() + 1)
    }
    
    const diff = dueTime.getTime() - now.getTime()
    const hoursDiff = Math.floor(diff / (1000 * 60 * 60))
    const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hoursDiff > 0) {
      return `${hoursDiff}h ${minutesDiff}m`
    }
    return `${minutesDiff}m`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medication Tracking</h1>
          <p className="text-gray-600">Monitor medication schedules, administration, and compliance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Medication
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
              placeholder="Search medications by resident, medication name, or room..."
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
              <option value="administered">Administered</option>
              <option value="due">Due</option>
              <option value="overdue">Overdue</option>
              <option value="missed">Missed</option>
            </select>
            <button className="btn-secondary flex items-center">
              <BellIcon className="h-5 w-5 mr-2" />
              Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Medications Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosage & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Administered By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alerts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedications.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(med.status)}
                      <div className="ml-2">
                        <span className={getStatusBadge(med.status)}>
                          {med.status}
                        </span>
                        {med.status === 'due' && (
                          <div className="text-xs text-gray-500 mt-1">
                            Due in {getTimeUntilDue(med.time)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {med.residentName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{med.residentName}</div>
                        <div className="text-sm text-gray-500">Room {med.room}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{med.medicationName}</div>
                    <div className="text-sm text-gray-500">{med.dosage}</div>
                    <div className="text-xs text-gray-400">{med.frequency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{med.time}</div>
                    {med.status === 'administered' && med.administeredAt && (
                      <div className="text-xs text-gray-500">
                        Given at {med.administeredAt.split(' ')[1]}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {med.administeredBy ? (
                      <div className="text-sm text-gray-900">{med.administeredBy}</div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {med.alerts.length > 0 ? (
                      <div className="space-y-1">
                        {med.alerts.map((alert, index) => (
                          <span key={index} className="status-badge status-alert text-xs">
                            {alert}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900" aria-label="View medication">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" aria-label="Edit medication">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {med.status === 'due' && (
                        <button className="text-healthcare-600 hover:text-healthcare-900" aria-label="Mark as administered">
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-danger-600 hover:text-danger-900" aria-label="Delete medication">
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

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Medication</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resident
                  </label>
                  <select className="input-field" aria-label="Select resident">
                    <option value="">Select a resident</option>
                    <option value="john-smith">John Smith - Room 101A</option>
                    <option value="mary-johnson">Mary Johnson - Room 102B</option>
                    <option value="robert-davis">Robert Davis - Room 103A</option>
                    <option value="sarah-wilson">Sarah Wilson - Room 104B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Name
                  </label>
                  <input type="text" className="input-field" placeholder="Enter medication name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dosage
                    </label>
                    <input type="text" className="input-field" placeholder="e.g., 1 tablet" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input type="time" className="input-field" aria-label="Select time" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select className="input-field" aria-label="Select frequency">
                    <option value="once-daily">Once daily</option>
                    <option value="twice-daily">Twice daily</option>
                    <option value="three-times-daily">Three times daily</option>
                    <option value="as-needed">As needed</option>
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
                    Add Medication
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

export default MedicationTracking
