// ⛏️⛏️ ALL OPERATIONS OF ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import React, { Component } from 'react';
import { hostname } from '../utils/global';
import Login from '../components/admin/Login';
import Register from '../components/admin/Register';
import { Tabs, Tab } from 'react-bootstrap';
import './Admin.css';





class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerPassword: "",
            loginEmail: "",
            loginPassword: "",
            errors: [],
            success: ""
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }



    // ⛏️⛏️ VALUE IS COMING FROM CHILD COMPONENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    // ⛏️⛏️ LOGIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async handleLogin(e) {
        e.preventDefault();
        try {
            // console.log(this.state);
            const response = await fetch(`${hostname}/api/admin/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.state.loginEmail,
                    password: this.state.loginPassword
                })
            });
            if (response.status === 200) {
                this.setState({
                    errors: [],
                    success: "Login successfull"
                });

                this.props.authValidation(true);
            }

            if (response.status === 400 || response.status === 401) {
                this.setState({
                    errors: [...this.state.errors, { msg: "Your email or password is invalid" }],
                    success: "",
                });
                this.props.authValidation(false);

            }
        } catch (error) {
            console.log(error);
        }
    }





    // ⛏️⛏️ REGISTER ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async handleRegister(e) {
        e.preventDefault();
        try {
            // console.log(this.state);
            const response = await fetch(`${hostname}/api/admin/register`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.registerEmail,
                    password: this.state.registerPassword
                })
            });
            const textRes = await response.text();
            const jsonRes = await JSON.parse(textRes);
            // console.log(jsonRes.admin);
            // console.log(jsonRes);
            if (response.status === 201) {
                this.setState({
                    errors: [],
                    success: "Register successfull"
                });
            }
            // success response 
            // admin:
            // {    email: "admin10@gmail.com"
            //     name: "admin10"
            //     password: "$2a$10$5e/S4wd9LgOa3hNnP8o9Ke4gbisix5E4w8Zq8aaUJbOLYslIhlfiC"
            //     role: "general"
            //     _id: "61180913d314051345f5ee8e"}



            // FAILURE RESPONSE 
            // errors: Array(2)
            // 0: {value: "adm", msg: "Email must not empty and a valid email", param: "email", location: "body"}
            // 1: {value: "1234", msg: "Password should be more than 5 character long", param: "password", location: "body"}
            // length: 2

            // console.log("Response - ", JSON.parse(textRes));
            if (jsonRes.errors) {
                // this.state.errors = jsonRes.errors
                this.setState({
                    errors: jsonRes.errors,
                    success: ""
                })
                // console.log(this.state.errors);
            }
        } catch (error) {
            console.log(error);
        }

    }









    render() {
        return (
            <div className="Admin">
                <div className="container">
                    <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="login" title="Login">
                            {/* ⛏️⛏️ LOGIN ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */}
                            <Login success={this.state.success} handleChange={this.handleChange} errors={this.state.errors} handleLogin={this.handleLogin} />
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            {/* ⛏️⛏️ REGISTER ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */}
                            < Register success={this.state.success} handleChange={this.handleChange} errors={this.state.errors} handleRegister={this.handleRegister} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}


export default Admin;