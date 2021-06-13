import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {app} from "../app/app";
import {registerEndpoint, userToken} from "../communication/endpoints/EndpointList";
import {post} from "../communication/Request";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }  
}));

function SignUp(props) {
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
        <Typography component="h1" variant="h5">
          User Creation Form
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                onChange={(e) => changeHandler(e)}
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
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="alias"
                label="User Name"
                name="alias"
                autoComplete="alias"
                onChange={(e) => changeHandler(e)}
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
                onChange={(e) => changeHandler(e)}
              />
            </Grid>            
            <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="national_id_type"
                label="Document Type"
                type="national_id_type"
                id="national_id_type"
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="national_id"
                label="Document Number"
                type="national_id"
                id="national_id"
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                variant="outlined"
                required
                fullWidth
                id="profile"
                name="profile"
                label="User Type"
                type="profile"
                autoComplete="2"
                onChange={(e) => changeHandler(e)}
                select>
                <MenuItem value="1">Host</MenuItem>
                <MenuItem value="2">Guest</MenuItem>
              </TextField>
            </Grid>        
          </Grid>
          {props.errorMessage && <Typography component="h1" variant="h5" style={{color: 'red'}}>
            {props.errorMessage}
          </Typography>}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Create User
          </Button>
        </form>
      </div>      
    </Container>
  );
}

class Register extends React.Component {    
  constructor(props) {
    super(props);

    this.state = {
        formData: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            national_id_type: '',
            national_id: '',
            google_token: '',
            user_type: 'GetFluent',
            alias: '',
            profile: 2
        },
        errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  initializeForm(){
    this.setState({formData:{
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      national_id_type: '',
      national_id: '',
      google_token: '',
      user_type: 'GetFluent',
      alias: '',
      profile: 2
  } })
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
        alert("User Created Successfully");        
    }
}

async register(){
  const token = localStorage.getItem('token');
  let body = this.state.formData;
  body['profile'] = Number(body['profile'])
  const endpoint = registerEndpoint;
  let response = await post(endpoint, body, token);
  if(response.status == 200){
    this.initializeForm()
    this.setState({errorMessage: 'User created successfully.'})
  }else{
    let json = await response.json();
    this.setState({errorMessage: json.message ?? 'Oops! Something went wrong.'})
  }
}

handleSubmit() {
    this.register();
}

  render(){     
      return <SignUp handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} errorMessage={this.state.errorMessage}></SignUp>
  }    
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);