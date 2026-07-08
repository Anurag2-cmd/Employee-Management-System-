import { useState, useCallback } from 'react'
import { loadEmployees, saveEmployees, DEPARTMENTS, formatCurrency } from './data'
import Dashboard from './components/Dashboard'
import EmployeeList from './components/EmployeeList'
import Departments from './components/Departments'
import EmployeeForm from './components/EmployeeForm'
import Toast from './components/Toast'
import './index.css'

const PAGES = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
  { id: 'employees', label: 'Employees', icon: 'fa-users' },
  { id: 'departments', label: 'Departments', icon: 'fa-building' },
]

export default function App() {
  const [employees, setEmployees] = useState(loadEmployees)
  const [page, setPage] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [toasts, setToasts] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [filterDept, setFilterDept] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const addToast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500)
  }, [])

  const updateEmployees = useCallback((newEmployees) => {
    setEmployees(newEmployees)
    saveEmployees(newEmployees)
  }, [])

  const handleSave = useCallback((data) => {
    let newEmployees
    if (editingEmployee) {
      newEmployees = employees.map(e => e.id === editingEmployee.id ? { ...e, ...data } : e)
      addToast('Employee updated!')
    } else {
      data.id = Math.max(...employees.map(e => e.id), 0) + 1
      data.joined = new Date().toISOString().split('T')[0]
      newEmployees = [...employees, data]
      addToast('Employee added!')
    }
    updateEmployees(newEmployees)
    setFormOpen(false)
    setEditingEmployee(null)
  }, [employees, editingEmployee, updateEmployees, addToast])

  const handleDelete = useCallback((id) => {
    if (!confirm('Delete this employee?')) return
    updateEmployees(employees.filter(e => e.id !== id))
    addToast('Employee deleted', 'error')
  }, [employees, updateEmployees, addToast])

  const handleEdit = useCallback((emp) => {
    setEditingEmployee(emp)
    setFormOpen(true)
  }, [])

  const openAdd = useCallback(() => {
    setEditingEmployee(null)
    setFormOpen(true)
  }, [])

  const filteredEmployees = employees.filter(e => {
    const q = search.toLowerCase()
    const name = (e.firstName + ' ' + e.lastName).toLowerCase()
    const matchSearch = !q || name.includes(q) || e.email.toLowerCase().includes(q) || e.position.toLowerCase().includes(q)
    const matchDept = !filterDept || e.department === filterDept
    const matchStatus = !filterStatus || e.status === filterStatus
    return matchSearch && matchDept && matchStatus
  })

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <i className="fas fa-users-gear"></i>
          <h2>EMS</h2>
        </div>
        <nav className="sidebar-nav">
          {PAGES.map(p => (
            <a key={p.id} href="#" className={'nav-item' + (page === p.id ? ' active' : '')}
               onClick={e => { e.preventDefault(); setPage(p.id) }}>
              <i className={'fas ' + p.icon}></i><span>{p.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-footer"><p>&copy; 2026 EMS</p></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>{PAGES.find(p => p.id === page)?.label}</h1>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search employees..." value={search}
                     onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={openAdd}>
              <i className="fas fa-plus"></i> Add Employee
            </button>
          </div>
        </header>

        {page === 'dashboard' &&
          <Dashboard employees={employees} />
        }
        {page === 'employees' &&
          <EmployeeList employees={filteredEmployees}
            filterDept={filterDept} setFilterDept={setFilterDept}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
            onEdit={handleEdit} onDelete={handleDelete} />
        }
        {page === 'departments' &&
          <Departments employees={employees} />
        }
      </main>

      {formOpen &&
        <EmployeeForm employee={editingEmployee}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditingEmployee(null) }} />
      }

      <Toast toasts={toasts} />
    </div>
  )
}
