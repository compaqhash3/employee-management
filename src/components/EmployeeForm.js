'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EmployeeForm({ employee }) {
  const router = useRouter()
  const isEdit = !!employee

  const [form, setForm] = useState({
    name:       employee?.name       || '',
    email:      employee?.email      || '',
    role:       employee?.role       || '',
    department: employee?.department || '',
    salary:     employee?.salary     || '',
    status:     employee?.status     || 'Active',
  })

  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const url    = isEdit ? `/api/employees/${employee.id}` : '/api/employees'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, salary: Number(form.salary) }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Something went wrong. Please try again.')
      setSaving(false)
    }
  }

  const fields = [
    { name: 'name',       label: 'Full name',   type: 'text',   placeholder: 'Amal Silva' },
    { name: 'email',      label: 'Email',        type: 'email',  placeholder: 'amal@company.com' },
    { name: 'role',       label: 'Job role',     type: 'text',   placeholder: 'Software Engineer' },
    { name: 'department', label: 'Department',   type: 'text',   placeholder: 'Engineering' },
    { name: 'salary',     label: 'Salary (USD)', type: 'number', placeholder: '60000' },
  ]

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 max-w-lg">
      {fields.map(f => (
        <div key={f.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
          <input
            name={f.name}
            type={f.type}
            value={form[f.name]}
            onChange={handleChange}
            placeholder={f.placeholder}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Add employee'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="border border-gray-200 px-5 py-2 rounded-lg text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}