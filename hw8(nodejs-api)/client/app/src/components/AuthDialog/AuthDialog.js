import React from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Person from "@material-ui/icons/Person";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import LoaderCircle from "../LoaderCircle/LoaderCircle";
import { observer, inject } from "mobx-react";
import authForm from '../../stores/forms/authForm';

const styles = (theme) => ({
    root: {
        width: "18vmax",
        [theme.breakpoints.down('sm')]: { 
           width: "100vh"
        }
    },
    backdrop: {
        backgroundColor: "#5a5a5a"
    },
    redAvatar: {
        backgroundColor: "red",
        position: "relative",
        left: "1em",
        [theme.breakpoints.down('sm')]: { 

         }
    },
    title: {
        padding: "1em 0 1em 0"
    }, 
    textFieldLabel: {
        textAlign: "center"
    }
})


let AuthDialog = ({classes, ViewStore}) => {
    return (
    <Dialog classes={{root: classes.backdrop, paper: classes.root}} open={ViewStore.authDialogState}>
    <DialogTitle className={classes.title}>
    <Grid container className="max-height" justify="center" alignItems="center">
    <Grid item xs={1}></Grid>
    <Grid item xs={2} container justify="center" alignItems="center"><div>Вход</div></Grid>
    <Grid item xs={1}><Avatar className={classes.redAvatar}><Person /></Avatar></Grid>
    </Grid>
    </DialogTitle>
    <DialogContent>
    <LoaderCircle value={ViewStore.loaderState}>
    <Grid container justify="center">
    <List>
    <ListItem><TextField className={classes.textField} {...authForm.$("login").bind()}/></ListItem>
    <ListItem><TextField className={classes.textField} {...authForm.$("password").bind()}/></ListItem>
    <ListItem><Grid container justify="center"><Button onClick={() => {authForm.submit()}}>Отправить запрос</Button></Grid></ListItem>
    </List>
    </Grid>
    </LoaderCircle>
    </DialogContent>
    </Dialog>
)
}

AuthDialog = inject('ViewStore', 'ApiStore')(observer(AuthDialog));

export default withStyles(styles)(AuthDialog);