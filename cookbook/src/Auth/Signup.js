import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import Notification from '../Features/Notifications/Notification'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../Config/config';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">

    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignUp(props) {
  const classes = useStyles();
  const [isloading, setIsloading] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const history = useHistory();


  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    uname: "",
    email: "",
    password: "",
    cpassword: ""
  })
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  let regurl = config.API_BASE_URL() + '/api/register/'
  function handleSubmit(e) {
    setIsloading(true)
    e.preventDefault();
    let userinfo = {
      username: state.uname,
      password: state.password,
      password2: state.cpassword,
      email: state.email,
      first_name: state.fname,
      last_name: state.lname
    }
    const form = new FormData();
    Object.keys(userinfo).forEach((key) => {
      form.append(key, userinfo[key]);
    });

    if (state.uname === '' || state.password === '' || state.cpassword === '' || state.fname === '' || state.lname === '' || state.email === "") {
      setNotify({
        isOpen: true,
        message: 'Please Enter All Details',
        type: 'error'
      })
      setIsloading(false)
    } else if ((userinfo.password !== userinfo.password2)) {
      // setMsg('Both Password and Confirm Password Are not same')
      setNotify({
        isOpen: true,
        message: 'Both Password and Confirm Password Are Not same',
        type: 'error'
      })
      setIsloading(false)
    } else {
      axios.post(regurl, form)
        .then((res) => {
          // setMsg('User Registered Successfully Please Check')
          setIsloading(false)
          setNotify({
            isOpen: true,
            message: 'User registered Please Wait for Email after Admin Approval',
            type: 'Success'
          })
          setTimeout(() => {
            history.push('/')
          }, 3000);
        })
        .catch((error) => {
          setIsloading(false)
          if(error.response.data?.username){
            setNotify({
              isOpen: true,
              message: "Username: "+error.response.data?.username[0],
              type: 'error'
            })
          }else if(error.response.data?.email){
            setNotify({
              isOpen: true,
              message: "Email: "+error.response.data?.email[0],
              type: 'error'
            })
          }else if(error.response.data?.password){
            setNotify({
              isOpen: true,
              message: "Password: "+error.response.data?.password[0],
              type: 'error'
            })
          }
          else {
            setNotify({
              isOpen: true,
              message: "Something Went Wrong Please Try Again",
              type: 'error'
            })
          }
          

          })

        }


  }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  value={state.fname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="lname"
                  value={state.lname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="uname"
                  label="Username"
                  name="uname"
                  autoComplete="uname"
                  value={state.uname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="current-password"
                  value={state.cpassword}
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
            {isloading ?
              <div style={{ marginTop: '5px' }}>
                <center><CircularProgress /></center>

              </div> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
      </Container>
    );
  }