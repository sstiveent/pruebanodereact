import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Task from '../pages/Task';
import { connect } from 'react-redux';

function Root(props) {
  const { stateLogin } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={stateLogin ? <Navigate to="/tasks" /> : <Login />} />
        <Route path="/signUp" element={stateLogin ? <Navigate to="/tasks" /> : <SignUp />} />
        <Route path="/tasks" element={stateLogin ? <Task /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  stateLogin: state.app.loggedIn
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps) (Root);
