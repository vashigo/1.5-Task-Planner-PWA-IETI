import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

const items = [
    {description: "Implement Login View ",responsible: {name: "Santiago Carrillo",email: "sancarbar@gmail"},status: "Ready",dueDate: new Date().getDay() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear()},
    {description: "Implement Login Controller ",responsible: {name: "Santiago Carrillo",email: "sancarbar@gmail"},status: "Completed",dueDate: new Date().getDay() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear()},
    {description: "FaceBook Integration",responsible: {name: "Santiago Carrillo",email: "sancarbar@gmail"},status: "In Progress",dueDate: new Date().getDay() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear()},
]

if(!localStorage.getItem('items')){  
    localStorage.setItem('items', JSON.stringify(items));
}

// console.log('retrievedObject: ', JSON.parse(localStorage.getItem('items')));

class MainViewCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tasks: []
        }
    }
    componentDidMount(){
        this.setState({tasks : JSON.parse(localStorage.getItem('items'))})
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.grid}>
                {this.state.tasks.map((task,index) => {
                    return (
                        <center key={index}>
                        <Grid >
                            <Card className={classes.root}>
                            <CardActionArea>
                                <CardHeader
                                    avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {task.status === "Ready" && <AlarmOnIcon fontSize = "large" className={classes.statusReady}/>}
                                        {task.status === "Completed" && <CheckCircleIcon fontSize = "large" className={classes.statusCompleted}/>}
                                        {task.status === "In Progress" && <AutorenewIcon fontSize = "large" className={classes.statusInProgress}/>}
                                    </Avatar>
                                    }
                                    title={
                                    <Typography gutterBottom variant="h5" component="h2">
                                                {task.description}
                                    </Typography>}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {task.status}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {task.dueDate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {task.responsible.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                        </Grid>
                        </center>
                    )
                })}
            </Grid>
        )
    }
}



const styles = theme => ({
    root: {
        maxWidth: 800,
        marginBottom: "50px",
    },
    grid: {
        alignContent: "center",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: "#FFFFFF",
    },
    statusReady: {
        color: "#0071EA",
    },
    statusCompleted: {
        color: "#3CCA0A",
    },
    statusInProgress: {
        color: "#DA4B15",
    },
});


export default withStyles(styles, { withTheme: true })(MainViewCards);