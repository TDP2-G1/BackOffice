import React, {Component} from 'react';
import {app} from "../app/app";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        GetFluent
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

function SignIn(props) {
  const classes = useStyles();

  const submitHandler = () => {
    props.handleSubmit();
  }

  const changeHandler = (e) => {
    props.handleInputChange(e);
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicia sesión en GetFluent
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={changeHandler}
            autoFocus
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
            onChange={(e) => changeHandler(e)}
          />
          {props.errorMessage && <Typography component="h1" variant="h5" style={{color: 'red'}}>
            {props.errorMessage}
          </Typography>}
          <Button
            fullWidth
            type="button"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Entrar
          </Button>
          {/* <Grid container>            
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                email: '',
                password: '',
                google_token: '',
                user_type: 'admin',
            },
            errorMessage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    render() {
        return (
            <SignIn handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} errorMessage={this.state.errorMessage}></SignIn>
        )
    }

    handleInputChange(event) {
        const input = event.target;
        let formData = this.state.formData;
        formData[input.name] = input.value;
        this.setState({formData: formData});
    }

    handleApiResponse(response) {
        if (response.hasError()) {
            this.setState({errorMessage: response.errorMessages()});
        } else {
            app.loginUser(response.content().token);
            this.props.history.push(app.routes().home);
        }
    }

    handleSubmit() {
        app.apiClient().login(this.state.formData, this.handleApiResponse);
    }
}
