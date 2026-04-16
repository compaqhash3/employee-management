import Link from 'next/link'

export default function EmployeeTable({ employees, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-400">No employees yet.</p>
        <Link href="/employees/new" className="text-blue-600 text-sm mt-2 inline-block">
          Add your first employee →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-5 py-3 font-medium text-gray-500">Name</th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">Department</th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">Role</th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">Salary</th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, i) => (
            <tr key={emp.id} className={i !== employees.length - 1 ? 'border-b border-gray-100' : ''}>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                    {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{emp.name}</p>
                    <p className="text-xs text-gray-400">{emp.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-gray-500">{emp.department}</td>
              <td className="px-5 py-4">{emp.role}</td>
              <td className="px-5 py-4">${emp.salary?.toLocaleString()}</td>
              <td className="px-5 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emp.status === 'Active'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {emp.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <Link
                    href={`/employees/${emp.id}`}
                    className="px-3 py-1 border border-gray-200 rounded-lg text-xs hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(emp.id)}
                    className="px-3 py-1 border border-red-200 text-red-500 rounded-lg text-xs hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}