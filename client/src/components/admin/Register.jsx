import React from 'react';

function Register(props) {

    const errorList = props.errors.map((err, idx)=>(
        <div className="alert alert-danger" key={idx} role="alert">
            {err.msg}
        </div>
    ));
    // CHANGE VISIBILITY IN CLICK OF LOGIN 
    return (
        <div className="Register">
            {errorList}
            {props.success !== ""? (<div className="alert alert-success" role="alert"> {props.success} </div>): null}
            <form className="register-admin">
                <h2 className="text-primary">Register</h2>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Neymar JR" onChange={props.handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name="registerEmail" className="form-control" placeholder="name@example.com" onChange={props.handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">password address</label>
                    <input type="password" name="registerPassword" className="form-control" autoComplete="on" placeholder="******" onChange={props.handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={props.handleRegister}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
