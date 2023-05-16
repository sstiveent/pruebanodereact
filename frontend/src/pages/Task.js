import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import Card from '../components/Task/Card';
import { actions } from '../store/modules';
function Task(props) {
  const { stateTaskList, getTasks, createTask, logout } = props;
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const handleChange = async e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage("");
  }

  const handleSubmit = async (e) => {
    const created = await createTask(formData.title, formData.description);
    if (created) {
      setFormData({
        title: '',
        description: ''
      });
    } else {
      setMessage("Valide los datos e intente nuevamente.")
    }
  }

  const handleLogOut = async (e) => {
    logout();
  }
  const [message, setMessage] = useState('');

  return (
    <div>
      <div className="container mt-4">
        <h1>Gestión de tareas</h1>
        <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addTaskModal">
          Agregar tarea
        </button>
        <button type="button" className="btn btn-danger mb-3" onClick={handleLogOut}>
          Cerrar sesión
        </button>

        <ul id="task-list" className="list-group">
          {stateTaskList.map((task, index) => (
            <Card task={task} key={index} />
          ))}
        </ul>
      </div>
      <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTaskModalLabel">Agregar tarea</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="add-task-title" className="form-label">Título:</label>
                  <input type="text" className="form-control" id="add-task-title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="add-task-description" className="form-label">Descripción:</label>
                  <textarea className="form-control" id="add-task-description" rows="3" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                {message.length > 0 &&
                  <div className="mb-3">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                }
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = state => ({
  stateTaskList: state.tasks.taskList
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(actions.tasks.getTasks()),
  createTask: (title, description) => dispatch(actions.tasks.createTask(title, description)),
  logout: () => dispatch(actions.app.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);