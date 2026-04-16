import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Employee Management',
  description: 'Manage your employees',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-800">
              Employee Management
            </Link>
            <Link
              href="/employees/new"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
            >
              + Add Employee
            </Link>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}