import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,

} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import users from '../../../_mock/users';
import { loginFailure, loginSuccess } from '../../../redux/slices/authAction';
import { useDispatch } from '../../../redux/store';
import { toast, ToastContainer } from 'react-toastify';
import backImage from "../../../assets/Images/backgrounds/login-background.jpg"
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${backImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
   
    justifyContent: "center",
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingTop:15
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  
  },
  avatar: {},
  form: {
    width: "100%", 
    marginTop: 2,
    padding:20,
  },
  submit: {
    margin: 120,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
       To Do APP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const validationSchema = Yup.object({
    email: Yup.string()
    .email("Invalid email address") 
    .required("Email is required"),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = isVerifiedUser(values.email, values.password);
      if (user) {
        dispatch(loginSuccess({ user: values.email })); // Dispatch loginSuccess with the username
        console.log('Login Successful');
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
        dispatch(loginFailure('Invalid username or password'));
        toast.error('Invalid username or password'); 
      }
    },
  });

  const isVerifiedUser = (email, password) => {
    return users.some(user => user.email === email && user.password === password);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="Email"
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginView;
