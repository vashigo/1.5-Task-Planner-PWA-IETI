import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { Redirect } from 'react-router-dom';

import Swal from 'sweetalert2'

import './Login.css'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn : false,
            username: "",
            password: "",
            showPassword: false
        };
        this.verificateUser = this.verificateUser.bind(this);
        this.verificate = this.verificate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('isLoggedIn')){
            this.setState({isLoggedIn: true});
        }else{
            this.setState({isLoggedIn: false});
        }
        localStorage.setItem('username', "andres");
        localStorage.setItem('name', "Andres Vasquez");
        localStorage.setItem('email', "andres@gmail.com");
        localStorage.setItem('password', "12345");
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    verificateUser(){
        if(localStorage.getItem('username') && localStorage.getItem('password')){
            if((localStorage.getItem('username') === this.state.username && 
                localStorage.getItem('password') === this.state.password)){
                localStorage.setItem('isLoggedIn', true)
                this.props.signIn();
                Swal.fire('Bienvenido', 'Inicio de sesion exitoso!!', 'success')
            }else{
                Swal.fire('Oops...', 'Usuario no esta registrado!!', 'error')
            }
        }
    }

    verificate(){
        if(this.state.username === "" && this.state.password === ""){
            Swal.fire('Oops...', 'Llene todo los campos!!', 'error')
        }else{
            this.verificateUser();
        }
    }

    handleClickShowPassword = () => {
        this.setState({showPassword : !this.state.showPassword})
      };

    render(){

        return (
            <React.Fragment>
                {localStorage.getItem("isLoggedIn") === "true" && <Redirect to="/dashboard" />}
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <AssignmentIndIcon />
                        </Avatar>
                        <Typography variant="h2">Task Planner</Typography>
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Username</InputLabel>
                                <Input
                                    id="email"
                                    name="username"
                                    autoComplete="email"
                                    autoFocus
                                    value={this.state.username} 
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    name="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick={this.verificate}
                            >
                                Login
                            </Button>
                        </form>

                        <Typography variant="h6">username: andres</Typography>
                        <Typography variant="h6">password: 12345</Typography>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}

export default Login;