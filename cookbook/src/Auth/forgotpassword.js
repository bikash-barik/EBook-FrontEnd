import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
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



function ForgotPasword() {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    let history = useHistory();
    const handleInputChangeUsername = (event) => {
        setUsername(event.target.value)
    }
   
    const handleResendEmail = () => {
        if (username!==''){
            let formData = {
                "email": username,

            }

            const form = new FormData();
            Object.keys(formData).forEach((key) => {
                form.append(key, formData[key]);
            });
            setLoading(true)
            axios.post(`${config.API_BASE_URL()}/api/request-reset-email/`, form).then(
                (res) => {
                    console.log(res)
                    setMsg(res.data.msg)
                    setLoading(false)
                },
                (error) => {

                    setMsg(error.response.data.msg)
                }
            )
            setLoading(true)
        }
        else {
            setMsg('Please Enter Email ID')
        }
    }



    var display_msg = null;
    if (msg.length > 0) {
        display_msg = <Alert variant="filled" severity="error">{msg}</Alert>
    }
    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username / Email"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => handleInputChangeUsername(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Reset Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        // onChange={(e) => handleInputChangePassword(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Reset Confirm Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="current-password"
                        // onChange={(e) => handleInputChangePassword(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}
                    {/* {display_msg} */}
                    <center> {loading ? <CircularProgress /> : <h3 style={{ color: 'blue' }}>{msg}</h3>}</center>
                    <center>
                        <Button
                            type="button"
                            // fullWidth
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        onClick={handleResendEmail}
                        >
                            Send Email
                        </Button>
                    </center>


                    <Grid container>
                        <Grid item xs >
                            <center>
                                <Link href="/" variant="body2">
                                    Login?
                                </Link>
                                {/* {" "}
                                <Link href="/register" variant="body2">
                                    Register?
                                </Link> */}
                            </center>
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

export default ForgotPasword