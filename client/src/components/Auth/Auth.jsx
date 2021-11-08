import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signup, signin } from '../../actions/auth';

// STEP 1 - GO TO GOOGLE DEVELOPER CONSOLE AND CREATE OAUTH CONSENT SCREEN 
// STEP 2 - CREATE CREDENTIALS FOR OAUTH 2.0 CLIENT IDS , SET ORIGIN URI AND REDIRECT URI
// STEP 3 - GET CLIENT ID AND CLIENT SECRET  


const initialState = { firstName: '', lastName: "", email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const CLIENT_ID = "639976478471-u58kobjerg6ra3l7h8hbeotnv73g9cid.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword(prevState => !prevState);
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const switchMode = (e) => {
        e.preventDefault();
        setIsSignup(prevState => !prevState);
        setShowPassword(false);
    }


    const googleSuccess = async (response) => {
        // console.log("success - Auth.jsx \n", response);
        const result = response?.profileObj;
        const token = response?.tokenId;

        try {
            // dispatch({ type: "AUTH" });
            dispatch({ type: "AUTH", data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }


    const googleFailure = (error) => {
        console.log("Failure - Auth.jsx \n", error);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}><LockOutLinedIcon /></Avatar>
                <Typography variant="h5" component="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? "Sign Up" : "Sign In"}</Button>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        render={renderProps => (
                            <Button
                                className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already signed up? let's sign in" : "Didn't signup? let's sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
