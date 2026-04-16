'use client'
import { useEffect, useState, useCallback } from 'react'
import EmployeeTable from '@/components/EmployeeTable'

export default function HomePage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch('/api/employees')
      const data = await res.json()
      setEmployees(data)
    } catch (err) {
      console.error('Failed to fetch employees:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return
    try {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' })
      fetchEmployees()
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const active = employees.filter(e => e.status === 'Active').length
  const departments = [...new Set(employees.map(e => e.department))].length

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-gray-400 text-sm">Loading employees...</p>
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
        <p className="text-gray-500 text-sm mt-1">{employees.length} total employees</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total employees</p>
          <p className="text-2xl font-semibold">{employees.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Active</p>
          <p className="text-2xl font-semibold text-green-600">{active}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Departments</p>
          <p className="text-2xl font-semibold">{departments}</p>
        </div>
      </div>

      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  )
}