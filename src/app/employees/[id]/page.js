import EmployeeForm from '@/components/EmployeeForm'

async function getEmployee(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/employees/${id}`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  return res.json()
}

export default async function EditEmployeePage({ params }) {
  const employee = await getEmployee(params.id)
  if (!employee) return <p className="text-gray-500">Employee not found.</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit employee</h1>
      <EmployeeForm employee={employee} />
    </div>
  )
}