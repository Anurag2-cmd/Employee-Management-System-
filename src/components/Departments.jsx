export default function Departments({ employees }) {
  const counts = {}
  employees.forEach(e => { counts[e.department] = (counts[e.department] || 0) + 1 })

  return (
    <section className="page active">
      <div className="card">
        <div className="card-header"><h3><i className="fas fa-building"></i> Departments</h3></div>
        <div className="card-body">
          <table className="table">
            <thead><tr><th>Department</th><th>Employees</th><th>Headcount</th></tr></thead>
            <tbody>
              {Object.entries(counts).map(([dept, count]) => (
                <tr key={dept}><td><strong>{dept}</strong></td><td>{count} employee{count > 1 ? 's' : ''}</td><td>{count}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
