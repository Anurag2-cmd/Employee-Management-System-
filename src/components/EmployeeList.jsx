import { DEPARTMENTS } from '../data'

export default function EmployeeList({ employees, filterDept, setFilterDept, filterStatus, setFilterStatus, onEdit, onDelete }) {
  return (
    <section className="page active">
      <div className="card">
        <div className="card-header"><h3><i className="fas fa-list"></i> All Employees</h3></div>
        <div className="card-body">
          <div className="table-toolbar">
            <div className="filter-group">
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                <option value="">All Departments</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <span className="emp-count">{employees.length} employees</span>
          </div>
          <table className="table" id="emp-table">
            <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Position</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.id}>
                  <td><strong>{e.firstName} {e.lastName}</strong></td>
                  <td>{e.email}</td>
                  <td>{e.department}</td>
                  <td>{e.position}</td>
                  <td><span className={'badge ' + e.status.toLowerCase()}>{e.status}</span></td>
                  <td>
                    <button className="btn-icon edit" onClick={() => onEdit(e)} title="Edit"><i className="fas fa-edit"></i></button>
                    <button className="btn-icon delete" onClick={() => onDelete(e.id)} title="Delete"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
