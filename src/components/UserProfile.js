import React, {Component} from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from "@material-ui/core/styles";

import {Button, TextField, Card, CardContent} from '@material-ui/core';


import { Redirect } from 'react-router-dom';

import Swal from 'sweetalert2'

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [],
            text: '',
            password: '',
            confirmPassword: '',
            email: '',
            username: '',
            profileIsEddited: false
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount(){
        this.setState({username : localStorage.getItem('username')});
        this.setState({text : localStorage.getItem('name')});
        this.setState({email : localStorage.getItem('email')});
        this.setState({password : localStorage.getItem('password')});
        this.setState({confirmPassword : localStorage.getItem('password')});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.profileIsEddited && <Redirect to="/dashboard" />}
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <form>
                        <h3>Edit Profile</h3>
                        <table>
                                <tbody>
                                <tr>
                                    <th>Username</th>
                                    <th>Full Name</th>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            disabled = {true}
                                            id="standard-numbeggghr"
                                            type="text"
                                            value={this.state.username}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            required
                                            label="Text"
                                            id="outlined-margin-none"
                                            defaultValue="Default Value"
                                            className={classes.textField}
                                            variant="outlined"
                                            onChange={this.handleTextChange}
                                            value={this.state.text}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Email:
                                </label>
                            </div>
                                <TextField
                                    required
                                    id="standard-number22s2"
                                    type="text"
                                    value={this.state.email}
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={this.handleEmailChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Password:
                                </label>
                            </div>
                            <TextField
                                    error = {this.state.confirmPassword !== this.state.password}
                                    helperText = {
                                        (this.state.confirmPassword !== this.state.password)
                                        && "error contraseñas no coinciden"}
                                    required
                                    id="standard-number222ss"
                                    type="text"
                                    value={this.state.password}
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={this.handlePasswordChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Confirm Password:
                                </label>
                            </div>
                            <TextField
                                    error = {this.state.confirmPassword !== this.state.password}
                                    helperText = {
                                        (this.state.confirmPassword !== this.state.password)
                                        && "error contraseñas no coinciden"}
                                    required
                                    id="standard-number2dd22ss"
                                    type="text"
                                    value={this.state.confirmPassword}
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={this.handleConfirmPasswordChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        </div>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick ={this.handleSubmit}
                        >
                            Edit Profile
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleConfirmPasswordChange(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length ||
            !this.state.password.length ||
            !this.state.confirmPassword.length ||
            !this.state.email.length){
            Swal.fire('Error', 'Llene tofos los campos!!', 'error')
        }
        else if (this.state.confirmPassword !== this.state.password){
            Swal.fire('Error', 'contraseñas no coinciden!!', 'error')
        }
        else if (!this.state.email.includes('@')){
            Swal.fire('Error', 'ponga un email valido!!', 'error')
        }
        
        else{
            localStorage.setItem('name', this.state.text);
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('password', this.state.password);

            Swal.fire('Completado', 'Edicion realizada con exito!!', 'success')
            this.setState({profileIsEddited:true})

        }
    }

}

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    card: {
        width: '500px',
        margin: 'auto',
        marginTop: "10px"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default withStyles(styles, { withTheme: true })(UserProfile);