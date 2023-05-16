import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { actions } from '../store/modules'


function SignUp(props) {
    const { signup } = props;

    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: ''
    })
    const [message, setMessage] = useState('');


    const handleChange = async e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        const signupResponse = await signup(formData.fullname, formData.username, formData.password);
        if (signupResponse) {
            setMessage("");
            window.location.href = '/';
        } else {
            setMessage("Valide los datos e intente nuevamente");
        }
    }

    const handleLogin = async (e) => {
        window.location.href = '/';
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">Registrarse</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">Nombre completo</label>
                            <input type="text" className="form-control" id="fullname" name="fullname" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input type="text" className="form-control" id="username" name="username" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
                        </div>
                        {message.length > 0 &&
                            <div className="mb-3">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        }
                        <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>Registrarse</button>
                        <button type="button" className="btn btn-link w-100" onClick={handleLogin}>Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    signup: (fullname, username, password) => dispatch(actions.app.signup(fullname, username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
