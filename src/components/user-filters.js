import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function UserFilters({searchHandler, toggleWithAccessFilter, toggleWithoutAccessFilter, includeWithAccess, includeWithoutAccess}) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('')


  const handleChange = (event) => {
    setSearchText(event.target.value)
  };

  const submitSearchRequest = (event) =>{
    event.preventDefault()
    searchHandler(searchText)
  }

  return (
    <Paper onSubmit={submitSearchRequest} component="form" className={classes.root}>      
      <InputBase
        className={classes.input}
        placeholder="Busca en los intereses"
        value={searchText}
        inputProps={{ 'aria-label': 'Busca en los intereses' }}
        onChange={handleChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
        <Typography variant="button"> Mostrar Acceso </Typography>
      <IconButton className={classes.iconButton} aria-label="Habilitados" title={'Habilitados'} onClick={toggleWithAccessFilter} style={{color: includeWithAccess ? 'green' : 'grey'}}>
        <CheckCircle />
      </IconButton>
      <IconButton className={classes.iconButton} title={'Inhabilitados'} aria-label="Inhabilitados" onClick={toggleWithoutAccessFilter} style={{color: includeWithoutAccess ? 'red' : 'grey'}}>
        <Cancel />
      </IconButton>
    </Paper>
  );
}