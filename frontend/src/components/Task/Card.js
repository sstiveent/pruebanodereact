import React from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { actions } from '../../store/modules';

function Card(props) {
    const { task, index, deleteTask } = props;

    const handleDeleteTask = (id) => {
        deleteTask(id);
    };

    return (
        <li className="list-group-item" key={index}>
            <div className="d-flex justify-content-between">
                <div>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                </div>
                <div>
                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>
                        Eliminar
                    </button>
                </div>
            </div>
        </li>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
    deleteTask: (id) => dispatch(actions.tasks.deleteTask(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card)