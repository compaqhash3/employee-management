import EmployeeForm from '@/components/EmployeeForm'

export default function NewEmployeePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add employee</h1>
      <EmployeeForm />
    </div>
  )
}