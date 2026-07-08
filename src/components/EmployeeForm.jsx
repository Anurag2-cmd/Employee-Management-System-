import { useState } from 'react'
import { DEPARTMENTS } from '../data'

export default function EmployeeForm({ employee, onSave, onClose }) {
  const [data, setData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || DEPARTMENTS[0],
    position: employee?.position || '',
    salary: employee?.salary || '',
    status: employee?.status || 'Active',
    address: employee?.address || '',
  })

  const set = field => e => setData(d => ({ ...d, [field]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    onSave({ ...data, salary: Number(data.salary) })
  }

  return (
    <div className="modal-overlay open" onClick={e => { if (e.target.className === 'modal-overlay open') onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {[
              { label: 'First Name', id: 'fname', value: data.firstName, onChange: set('firstName'), required: true },
              { label: 'Last Name', id: 'lname', value: data.lastName, onChange: set('lastName'), required: true },
              { label: 'Email', id: 'email', type: 'email', value: data.email, onChange: set('email'), required: true },
              { label: 'Phone', id: 'phone', type: 'tel', value: data.phone, onChange: set('phone') },
              { label: 'Department', id: 'dept', type: 'select', value: data.department, onChange: set('department'), options: DEPARTMENTS },
              { label: 'Position', id: 'position', value: data.position, onChange: set('position'), required: true },
              { label: 'Salary ($)', id: 'salary', type: 'number', value: data.salary, onChange: set('salary') },
              { label: 'Status', id: 'status', type: 'select', value: data.status, onChange: set('status'), options: ['Active', 'Inactive'] },
            ].map(f => (
              <div className="form-group" key={f.id}>
                <label>{f.label}</label>
                {f.type === 'select' ? (
                  <select value={f.value} onChange={f.onChange}>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type || 'text'} value={f.value} onChange={f.onChange} required={f.required} />
                )}
              </div>
            ))}
            <div className="form-group full-width">
              <label>Address</label>
              <textarea rows="2" value={data.address} onChange={set('address')}></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
