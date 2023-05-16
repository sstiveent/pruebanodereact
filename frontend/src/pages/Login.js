import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { actions } from '../store/modules'


function Login(props) {
    const { login } = props;

    const [formData, setFormData] = useState({
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
        const loggedIn = await login(formData.username, formData.password);
        if (loggedIn) {
            setMessage("");
        }else{
            setMessage("Usuario o contraseña incorrectos");
        }
    }

    const handleSignUp= async (e) => {
        window.location.href = '/signup'
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">Iniciar sesión</h1>
                    <form>
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
                        <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>Iniciar sesión</button>
                        <button type="button" className="btn btn-link w-100" onClick={handleSignUp}>Registrarse</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(actions.app.login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
