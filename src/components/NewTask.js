import React, {Component} from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { withStyles } from "@material-ui/core/styles";

import {Button, TextField, Card, CardContent, Select, FormControl } from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { Redirect } from 'react-router-dom';

import Swal from 'sweetalert2'

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [],
            text: '',
            responsable: '',
            status: '',
            email: '',
            dueDate: moment().format("YYYY/MM/DD"),
            selectedDate: moment(),
            taskIsAdded: false
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleresponsableChange = this.handleresponsableChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.taskIsAdded && <Redirect to="/dashboard" />}
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <form>
                        <h3>New Task</h3>

                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Description:
                                </label>
                            </div>
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
                        </div>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Responsable:
                                </label>
                            </div>
                            <table>
                                <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            required
                                            id="standard-number"
                                            type="text"
                                            value={this.state.responsable}
                                            className={classes.textField}
                                            variant="outlined"
                                            onChange={this.handleresponsableChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            required
                                            id="standard-number222"
                                            type="text"
                                            value={this.state.email}
                                            className={classes.textField}
                                            variant="outlined"
                                            onChange={this.handleEmailChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Status:
                                </label>
                            </div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    native
                                    value={this.state.status}
                                    onChange={this.handleStatusChange}
                                    inputProps={{
                                        name: 'status',
                                        id: 'filled-age-native-simple',
                                    }}
                                    >
                                    <option aria-label="None" value="" />
                                    <option value={"Ready"}>Ready</option>
                                    <option value={"In Progress"}>In Progress</option>
                                    <option value={"Completed"}>Completed</option>
                                </Select>
                            </FormControl>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Fecha:
                                </label>
                            </div>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    format="YYYY/MM/DD"

                                    inputVariant="outlined"

                                    value={this.state.selectedDate}
                                    inputValue={this.state.dueDate}
                                    onChange={this.handleDateChange}
                                    
                                />
                            </MuiPickersUtilsProvider>


                        </div>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick ={this.handleSubmit}
                        >
                            Add New Task
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

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleresponsableChange(e) {
        this.setState({
            responsable: e.target.value
        });
    }

    handleDateChange(date, value) {
        this.setState(prevState => ({
            selectedDate: date,
            dueDate: value
        }));
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length ||
            !this.state.responsable.length ||
            !this.state.dueDate ||
            !this.state.status.length ||
            !this.state.email.includes('@')){
            Swal.fire('Error', 'Llene tofos los campos!!', 'error')
        }else{
          
            const newItem = {
                description: this.state.text,
                responsible: {name:this.state.responsable, email: this.state.email},
                status: this.state.status,
                dueDate: this.state.dueDate,
            };

            // sacar tareas de localestorage
            var arrayTasksLocal = JSON.parse(localStorage.getItem('items'));
            var newArrayTasks = [newItem];
            newArrayTasks.push();
            arrayTasksLocal.map(function(task) {
                newArrayTasks.push(task);
                return null
            });
            localStorage.setItem('items', JSON.stringify(newArrayTasks));
            Swal.fire('Tarea', 'Agregada con exito!!', 'success')
            this.setState({taskIsAdded:true})

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

export default withStyles(styles, { withTheme: true })(NewTask);