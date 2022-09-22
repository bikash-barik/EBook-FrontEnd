import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUp from './Signup';
import axios from 'axios'
import config from '../Config/config';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Quadrant
      </Link>{' '}
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



function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  let history = useHistory();
  const handleInputChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const handleInputChangePassword = (event) => {
    setPassword(event.target.value)
  }


  const login = (user) => {
    // history.push("/dashboard");
    // sessionStorage.setItem('isAuth', true)
    // history.push("/dashboard");
    let loginurl = config.API_BASE_URL() + '/login/'
    // console.log(loginurl)
    axios.post(loginurl, user)
      .then((res) => {
        if (res.status === 200 && res.data.access !== null) {
          sessionStorage.setItem('isAuth', true)
          sessionStorage.setItem('isSuperAdmin', res.data.superadmin)
          sessionStorage.setItem('isUserAdmin', res.data.useradmin)
          sessionStorage.setItem('quadranttoken', res.data.access)
          sessionStorage.setItem('quser', user.username)
          sessionStorage.setItem('uemail', res.data.email)
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response?.data?.detail) {
          setMsg(error.response?.data?.detail)

        } else {
          setMsg("Something went wrong Please Try Again")
        }

      })


  }

  const handleLogin = () => {
    let user = {
      username: username,
      password: password
    }
    if (username !== '' & password !== '') {
      login(user)
    }
    else {
      setMsg("Please Enter All Details")
    }



  }

  var display_msg = null;
  if (msg.length > 0) {
    display_msg = <Alert variant="filled" severity="error">{msg}</Alert>
  }
  let isAuth=sessionStorage.getItem('isAuth')
  React.useEffect(()=>{
       if(isAuth){
         debugger
      history.push('/dashboard')
       }

  },[isAuth])
   console.log(isAuth)
  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => handleInputChangeUsername(e)}
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
            onChange={(e) => handleInputChangePassword(e)}
          />
          {display_msg}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>

            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn