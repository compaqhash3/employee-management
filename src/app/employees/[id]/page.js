import EmployeeForm from '@/components/EmployeeForm'
import { prisma } from '@/lib/prisma'

async function getEmployee(id) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id }
    })
    return employee
  } catch (error) {
    console.error('Failed to fetch employee:', error)
    return null
  }
}

export default async function EditEmployeePage({ params }) {
  const { id } = await params        // ← await params (Next.js 15 change)
  const employee = await getEmployee(id)

  if (!employee) return <p className="text-gray-500">Employee not found.</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit employee</h1>
      <EmployeeForm employee={employee} />
    </div>
  )
}