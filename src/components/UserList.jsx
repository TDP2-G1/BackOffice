import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, IconButton, TablePagination} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import { Cancel, CheckCircle, Person } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { app } from "../app/app";
import { get, put } from "../communication/Request";
import { userListEndpoint, userToken, reportsEndpoint } from "../communication/endpoints/EndpointList"
import UserListRow from './user-list-row'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import UserFilters from './user-filters';

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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ROWS_PER_PAGE = 5;

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      status: null,
      name: '',
      user_list: [],
      errorMessage: '',
      page: 0,
      rowsPerPage: 10,
      showWithAccess: true,
      showWithoutAccess: true,
      topicsSearchText: '',
    };

    this.setBlockStatus = this.setBlockStatus.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.toggleWithAccessFilter = this.toggleWithAccessFilter.bind(this);
    this.toggleWithoutAccessFilter = this.toggleWithoutAccessFilter.bind(this);
  }

 handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleRowsPerPageChange= (event) => {    
    this.setState({rowsPerPage: parseInt(event.target.value, 10), page:0});
  };

  async componentDidMount() {
    this.reloadUserList()
  }

  async reloadUserList() {
    //const token = localStorage.getItem('token');
    const token = '';
    const endpoint = userListEndpoint;
    const response = await get(endpoint, token);
    this.setState({ status: response.status, loading: false });
    if (response.status == 200) {
      let json = await response.json();
      let myList = json
      myList.sort((a, b) => (a.reported_by.length < b.reported_by.length) ? 1 : -1)
      this.setState({ user_list: myList });
    }
  }  

  async setBlockStatus(user_id, new_status) {
    //const token = localStorage.getItem('token');
    const token = ''
    const body = { "is_disabled": new_status }
    const endpoint = userListEndpoint + user_id + "/account_status";
    let response = await put(endpoint, body, token)
    let userToUpdate = this.state.user_list.filter(x => x.id_user === user_id)[0]
    let list = [...this.state.user_list]
    list.forEach(function (x, index) {
      if (x.id_user === userToUpdate.id_user) {
        x.is_disabled = !x.is_disabled
      }
    });
    this.setState({ ...this.state, user_list: list })
  }

  handleSearchChange = (searchText) =>{
    this.setState({topicsSearchText: searchText})
  }

  toggleWithAccessFilter = () =>{
    if(this.state.showWithoutAccess){
      this.setState({showWithAccess: !this.state.showWithAccess})
    }    
  }

  toggleWithoutAccessFilter = () =>{
    if(this.state.showWithAccess){
      this.setState({showWithoutAccess: !this.state.showWithoutAccess})
    }    
  }

  showOnList = (user) => {    
    let passTopicCheck = this.state.topicsSearchText === '' ? true : 
    (user.topics_descriptions.toLowerCase().includes(this.state.topicsSearchText.toLowerCase()) || user.first_name.toLowerCase().includes(this.state.topicsSearchText.toLowerCase()) || user.last_name.toLowerCase().includes(this.state.topicsSearchText.toLowerCase())) ? true: false;
    let passAccessCheck = this.state.showWithAccess && this.state.showWithoutAccess
    if(!passAccessCheck){
      passAccessCheck = this.state.showWithAccess ? user.is_disabled === false : user.is_disabled === true;
    }

    return passTopicCheck && passAccessCheck
  }

  render() {

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.user_list.length > 0) {
      return (
      <>
      <UserFilters searchHandler={this.handleSearchChange} toggleWithAccessFilter={this.toggleWithAccessFilter} 
      toggleWithoutAccessFilter={this.toggleWithoutAccessFilter} includeWithAccess={this.state.showWithAccess} includeWithoutAccess={this.state.showWithoutAccess}/>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell />              
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Nombre y Apellido</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Foto</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Intereses</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Denuncias Abiertas</TableCell>
              {/* <TableCell align="center" style={{ fontWeight: 'bold' }}>Perfil</TableCell> */}
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Acceso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(this.state.rowsPerPage > 0
            ? this.state.user_list.filter( l => this.showOnList(l)).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            : this.state.user_list
          ).map((u) =>  <UserListRow user={u} blockStatusHandler={this.setBlockStatus} key={u.id_user + 'user_list_row'}/>)}
           {/*  {this.state.user_list.filter((e,index) => index >= this.state.page * this.state.rowsPerPage && index < (this.state.page + 1) * this.state.rowsPerPage).map((u) =>  <UserListRow user={u} blockStatusHandler={this.setBlockStatus} key={u.id_user + 'user_list_row'}/>)} */}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              colSpan={3}
              count={this.state.user_list.length}
              onChangeRowsPerPage={this.handleRowsPerPageChange}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={this.handleChangePage}              
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
      </>)
      
    }
    
    return (
      <div>
        <div>Status: {this.state.status}</div>
        <div>{this.state.name}</div>
        <div>{localStorage.getItem("token")}</div>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);