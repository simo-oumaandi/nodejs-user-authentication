import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const userLC = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(userLC);

    // console.log(user);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT 

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    return (
        <div className="Navbar">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                    <img className={classes.image} src={memories} alt="icon" height="60" />
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                            <Button variant="contained" color="secondary" className={classes.logout} onClick={handleLogout}>Logout</Button>
                        </div>
                    ) : (<Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>)}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;