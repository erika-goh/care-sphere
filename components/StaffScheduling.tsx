'use client'

import { useState } from 'react'
import { 
  PlusIcon, 
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const StaffScheduling = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedShift, setSelectedShift] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock staff data
  const staff = [
    { id: 1, name: 'Sarah Johnson', role: 'Registered Nurse', status: 'active', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', role: 'Caregiver', status: 'active', avatar: 'MC' },
    { id: 3, name: 'Lisa Rodriguez', role: 'Registered Nurse', status: 'active', avatar: 'LR' },
    { id: 4, name: 'Tom Wilson', role: 'Caregiver', status: 'active', avatar: 'TW' },
    { id: 5, name: 'Amy Davis', role: 'Physical Therapist', status: 'active', avatar: 'AD' },
    { id: 6, name: 'John Smith', role: 'Caregiver', status: 'active', avatar: 'JS' }
  ]

  // Mock schedule data
  const schedule = [
    {
      id: 1,
      date: '2024-01-15',
      shifts: [
        {
          id: 1,
          type: 'Morning',
          startTime: '06:00',
          endTime: '14:00',
          staff: ['Sarah Johnson', 'Mike Chen'],
          status: 'filled',
          requiredStaff: 2
        },
        {
          id: 2,
          type: 'Afternoon',
          startTime: '14:00',
          endTime: '22:00',
          staff: ['Lisa Rodriguez', 'Tom Wilson'],
          status: 'filled',
          requiredStaff: 2
        },
        {
          id: 3,
          type: 'Night',
          startTime: '22:00',
          endTime: '06:00',
          staff: ['John Smith'],
          status: 'understaffed',
          requiredStaff: 2
        }
      ]
    }
  ]

  const getCurrentWeekDates = () => {
    const dates = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const getShiftStatusColor = (status: string) => {
    switch (status) {
      case 'filled':
        return 'bg-healthcare-100 text-healthcare-800'
      case 'understaffed':
        return 'bg-warning-100 text-warning-800'
      case 'unfilled':
        return 'bg-danger-100 text-danger-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getShiftStatusIcon = (status: string) => {
    switch (status) {
      case 'filled':
        return <CheckCircleIcon className="h-4 w-4 text-healthcare-600" />
      case 'understaffed':
        return <ExclamationTriangleIcon className="h-4 w-4 text-warning-600" />
      case 'unfilled':
        return <ExclamationTriangleIcon className="h-4 w-4 text-danger-600" />
      default:
        return <ClockIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const weekDates = getCurrentWeekDates()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Scheduling</h1>
          <p className="text-gray-600">Manage staff schedules, shifts, and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Shift
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Weekly Schedule</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setDate(currentDate.getDate() - 7)
                setCurrentDate(newDate)
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label="Previous week"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setDate(currentDate.getDate() + 7)
                setCurrentDate(newDate)
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label="Next week"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Weekly Schedule Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="p-2"></div>
              {weekDates.map((date, index) => (
                <div key={index} className="p-2 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>

            {/* Shifts Rows */}
            <div className="space-y-2">
              {['Morning (6AM-2PM)', 'Afternoon (2PM-10PM)', 'Night (10PM-6AM)'].map((shiftType, shiftIndex) => (
                <div key={shiftIndex} className="grid grid-cols-8 gap-1">
                  <div className="p-2 bg-gray-50 rounded flex items-center">
                    <div className="text-sm font-medium text-gray-700">{shiftType}</div>
                  </div>
                  {weekDates.map((date, dateIndex) => {
                    const shift = schedule.find(s => s.date === date.toISOString().split('T')[0])?.shifts[shiftIndex]
                    return (
                      <div key={dateIndex} className="p-2 border border-gray-200 rounded min-h-[80px]">
                        {shift ? (
                          <div className="space-y-2">
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getShiftStatusColor(shift.status)}`}>
                              {getShiftStatusIcon(shift.status)}
                              <span className="ml-1">{shift.status}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {shift.staff.length}/{shift.requiredStaff} staff
                            </div>
                            <div className="space-y-1">
                              {shift.staff.map((staffMember, index) => (
                                <div key={index} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                                  {staffMember}
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => setSelectedShift(shift.id.toString())}
                              className="text-xs text-primary-600 hover:text-primary-800"
                            >
                              View Details
                            </button>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 text-center pt-4">
                            No shift
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff Overview */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">{member.avatar}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                  <p className="text-sm text-gray-500 truncate">{member.role}</p>
                </div>
                <span className="status-badge status-active">Active</span>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-primary-600 hover:text-primary-900" aria-label="View schedule">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900" aria-label="Edit schedule">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Shift Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Shift</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input type="date" className="input-field" aria-label="Select date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shift Type
                  </label>
                  <select className="input-field" aria-label="Select shift type">
                    <option value="">Select shift</option>
                    <option value="morning">Morning (6AM-2PM)</option>
                    <option value="afternoon">Afternoon (2PM-10PM)</option>
                    <option value="night">Night (10PM-6AM)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input type="time" className="input-field" aria-label="Select start time" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input type="time" className="input-field" aria-label="Select end time" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Staff
                  </label>
                  <input type="number" className="input-field" placeholder="Number of staff needed" min="1" />
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
                    Add Shift
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

export default StaffScheduling
