import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Loggin } from "../Context/loggin";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import L from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <L color="inherit" href="https://material-ui.com/">
        Your Website
      </L>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignIn = (props) => {
  const classes = useStyles();
  const [user, setUSer] = useState({});
  const [open, setOpen] = React.useState(false);
  const { auth, setAuth } = useContext(Loggin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Authetication Problem"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Incorrect Password and username
          </DialogContentText>
          </DialogContent>
        </Dialog>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => { user["id"] = event.target.value }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => { user["pass"] = event.target.value }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              event.preventDefault();
              //              http://localhost:4000/login?username=musaunal&pass=123456
              // .then(res => setFet(res))
              // .then(res => console.log(res))
              fetch(`http://localhost:4000/login?username=${user.id}&pass=${user.pass}`)
                .then(res => res.json())
                .then(res => {
                  console.log(res)
                  if (res[0] != undefined) {
                    setAuth(user);
                    props.history.push("/");
                  } else {
                    handleClickOpen()
                  }}
                )
            }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <L href="#" variant="body2">
                Forgot password?
              </L>
            </Grid>
            <Grid item>
              <L href="#" variant="body2" component={Link} to="/singup">
                {"Don't have an account? Sign Up"}
              </L>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn);