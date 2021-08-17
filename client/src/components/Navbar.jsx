import React from 'react';
import { Link } from 'react-router-dom';
import { hostname } from '../utils/global';


const Navbar = (props) => {
    /* ⛏️⛏️ LOGOUT EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const handleLogout = async () => {

        try {
            const response = await fetch(`${hostname}/api/admin/logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                console.log(response);
                props.authValidation(false);
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                            {props.isAuthenticated ? (<li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>): null}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}


export default Navbar;