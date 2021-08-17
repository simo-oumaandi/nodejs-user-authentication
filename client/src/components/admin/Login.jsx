import React from 'react';

function Login(props) {
    const errorList = props.errors.map((err, idx)=>(
        <div className="alert alert-danger" key={idx} role="alert">
            {err.msg}
        </div>
    ));
    // const errorList = [{msg: "null"}]
    // console.log(props.errors);
    return (
        <div className="Login"  >
            {/* ⛏️⛏️ LOGIN ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */}
            {errorList}
            {props.success !== ""? (<div className="alert alert-success" role="alert"> {props.success} </div>): null}
            <form className="login-admin">
                <h2 className="text-primary">Login</h2>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="loginEmail" className="form-control" placeholder="name@example.com" onChange={props.handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">password</label>
                    <input type="password" name="loginPassword" className="form-control" autoComplete="on" placeholder="******" onChange={props.handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={props.handleLogin} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
