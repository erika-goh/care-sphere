'use client'

import { useState } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const CarePlans = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock care plan data
  const carePlans = [
    {
      id: 1,
      residentName: 'John Smith',
      room: '101A',
      carePlanType: 'Assisted Living',
      status: 'active',
      lastUpdated: '2024-01-10',
      nextReview: '2024-04-10',
      careGoals: ['Maintain mobility', 'Monitor blood pressure', 'Ensure medication compliance'],
      interventions: ['Daily exercise program', 'Blood pressure monitoring', 'Medication reminders'],
      assignedStaff: ['Nurse Sarah', 'Caregiver Mike'],
      progress: 85,
      alerts: []
    },
    {
      id: 2,
      residentName: 'Mary Johnson',
      room: '102B',
      carePlanType: 'Memory Care',
      status: 'active',
      lastUpdated: '2024-01-08',
      nextReview: '2024-03-08',
      careGoals: ['Maintain cognitive function', 'Prevent wandering', 'Ensure safety'],
      interventions: ['Cognitive stimulation activities', 'Safety monitoring', 'Structured daily routine'],
      assignedStaff: ['Nurse Lisa', 'Caregiver John'],
      progress: 72,
      alerts: ['Due for cognitive assessment']
    },
    {
      id: 3,
      residentName: 'Robert Davis',
      room: '103A',
      carePlanType: 'Independent Living',
      status: 'pending',
      lastUpdated: '2024-01-12',
      nextReview: '2024-04-12',
      careGoals: ['Maintain independence', 'Monitor health status', 'Social engagement'],
      interventions: ['Health check-ups', 'Social activities', 'Wellness monitoring'],
      assignedStaff: ['Nurse Tom'],
      progress: 45,
      alerts: ['Initial assessment pending']
    },
    {
      id: 4,
      residentName: 'Sarah Wilson',
      room: '104B',
      carePlanType: 'Assisted Living',
      status: 'active',
      lastUpdated: '2024-01-05',
      nextReview: '2024-04-05',
      careGoals: ['Manage diabetes', 'Maintain mobility', 'Monitor nutrition'],
      interventions: ['Blood glucose monitoring', 'Physical therapy', 'Dietary management'],
      assignedStaff: ['Nurse Sarah', 'Therapist Amy'],
      progress: 90,
      alerts: []
    }
  ]

  const filteredCarePlans = carePlans.filter(plan => {
    const matchesSearch = plan.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.carePlanType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'status-active',
      pending: 'status-pending',
      inactive: 'status-inactive',
      completed: 'status-active'
    }
    return `status-badge ${statusClasses[status as keyof typeof statusClasses] || 'status-inactive'}`
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-healthcare-600 bg-healthcare-100'
    if (progress >= 60) return 'text-warning-600 bg-warning-100'
    return 'text-danger-600 bg-danger-100'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Care Plans</h1>
          <p className="text-gray-600">Manage resident care plans, assessments, and interventions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Care Plan
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
              placeholder="Search care plans by resident, room, or type..."
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
              <option value="completed">Completed</option>
            </select>
            <button className="btn-secondary flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Due Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Care Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCarePlans.map((plan) => (
          <div key={plan.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {plan.residentName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">{plan.residentName}</h3>
                  <p className="text-sm text-gray-500">Room {plan.room}</p>
                </div>
              </div>
              <span className={getStatusBadge(plan.status)}>
                {plan.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Care Plan Type:</span>
                <span className="ml-2 text-sm text-gray-900">{plan.carePlanType}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Progress:</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="h-2 rounded-full bg-healthcare-500" 
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${getProgressColor(plan.progress)}`}>
                    {plan.progress}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <p className="font-medium text-gray-900">{plan.lastUpdated}</p>
                </div>
                <div>
                  <span className="text-gray-500">Next Review:</span>
                  <p className="font-medium text-gray-900">{plan.nextReview}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700">Care Goals:</span>
                <ul className="mt-1 space-y-1">
                  {plan.careGoals.slice(0, 2).map((goal, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <CheckCircleIcon className="h-3 w-3 text-healthcare-500 mr-2" />
                      {goal}
                    </li>
                  ))}
                  {plan.careGoals.length > 2 && (
                    <li className="text-sm text-gray-500">
                      +{plan.careGoals.length - 2} more goals
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700">Assigned Staff:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plan.assignedStaff.map((staff, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      <UserGroupIcon className="h-3 w-3 mr-1" />
                      {staff}
                    </span>
                  ))}
                </div>
              </div>

              {plan.alerts.length > 0 && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-4 w-4 text-warning-500 mr-2" />
                    <span className="text-sm text-warning-700">{plan.alerts[0]}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-900" aria-label="View care plan">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900" aria-label="Edit care plan">
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button className="text-danger-600 hover:text-danger-900" aria-label="Delete care plan">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
              <button className="btn-secondary text-sm">
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Care Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Care Plan</h3>
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
                    Care Plan Type
                  </label>
                  <select className="input-field" aria-label="Select care plan type">
                    <option value="">Select type</option>
                    <option value="independent">Independent Living</option>
                    <option value="assisted">Assisted Living</option>
                    <option value="memory">Memory Care</option>
                    <option value="skilled">Skilled Nursing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Goals
                  </label>
                  <textarea 
                    className="input-field" 
                    rows={3}
                    placeholder="Enter initial care goals..."
                  ></textarea>
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
                    Create Plan
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

export default CarePlans
