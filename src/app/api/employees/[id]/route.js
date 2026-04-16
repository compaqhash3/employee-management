import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id }
    })
    if (!employee) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(employee)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch employee' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: {
        name:       body.name,
        email:      body.email,
        role:       body.role,
        department: body.department,
        salary:     Number(body.salary),
        status:     body.status,
      }
    })
    return Response.json(employee)
  } catch (error) {
    return Response.json({ error: 'Failed to update employee' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.employee.delete({
      where: { id: params.id }
    })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}