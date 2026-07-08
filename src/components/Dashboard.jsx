import { formatCurrency } from '../data'

export default function Dashboard({ employees }) {
  const total = employees.length
  const depts = new Set(employees.map(e => e.department)).size
  const now = new Date()
  const thisMonth = employees.filter(e => {
    const d = new Date(e.joined)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const avg = total ? Math.round(employees.reduce((s, e) => s + Number(e.salary), 0) / total) : 0

  const sorted = [...employees].sort((a, b) => new Date(b.joined) - new Date(a.joined)).slice(0, 5)

  return (
    <section className="page active">
      <div className="stats-grid">
        {[
          { label: 'Total Employees', value: total, icon: 'fa-users', cls: 'blue' },
          { label: 'Departments', value: depts, icon: 'fa-building', cls: 'green' },
          { label: 'This Month', value: thisMonth, icon: 'fa-user-plus', cls: 'orange' },
          { label: 'Avg Salary', value: formatCurrency(avg), icon: 'fa-money-bill', cls: 'purple' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={'stat-icon ' + s.cls}><i className={'fas ' + s.icon}></i></div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><h3><i className="fas fa-clock"></i> Recent Employees</h3></div>
        <div className="card-body">
          <table className="table">
            <thead><tr><th>Name</th><th>Department</th><th>Position</th><th>Joined</th></tr></thead>
            <tbody>
              {sorted.map(e => (
                <tr key={e.id}><td>{e.firstName} {e.lastName}</td><td>{e.department}</td><td>{e.position}</td><td>{e.joined}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
