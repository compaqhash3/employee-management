import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return Response.json(employees)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const employee = await prisma.employee.create({
      data: {
        name:       body.name,
        email:      body.email,
        role:       body.role,
        department: body.department,
        salary:     Number(body.salary),
        status:     body.status || 'Active',
      }
    })
    return Response.json(employee, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}