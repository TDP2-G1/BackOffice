import {Table, TableBody, TableCell, Box, Avatar, Typography, TableContainer, Collapse, TableHead, TableRow, IconButton} from '@material-ui/core'
import React,{useState} from 'react';
import { get, put } from "../communication/Request";
import { reportsEndpoint } from "../communication/endpoints/EndpointList"
import { Cancel, CheckCircle, Person } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const UserListRow = ({user, blockStatusHandler}) => {

    const [open, setOpen] = React.useState(false);
    const [reportsData, setReportsData] = useState([])
    //const [accessButton, setAccessButton] 


    let blockText = 'Deshabilitar';
    let blockIcon =<CheckCircle />
    let blockColor = 'green'
    if (user.is_disabled) {
      blockText = 'Habilitar';
      blockIcon = <Cancel /> 
      blockColor = 'red'
    }

    const getReportData = async (userId) =>{
        //const token = localStorage.getItem('token');
        const token = '';
        const endpoint = reportsEndpoint + userId;
        const response = await get(endpoint, token);       
        if (response.status == 200) {
          let json = await response.json();
          return json
        }
    
        return null
    }

    const getReportDataForUser = async () => {
        const dataResult = await getReportData(user.id_user)
        let orderedData = dataResult
        orderedData.sort((a, b) => (a.date < b.date) ? 1 : -1)
        setReportsData(orderedData)
        setOpen(!open)
    }
    
    return (
        <React.Fragment>
          <TableRow key={user.id_user}>
            <TableCell>
              <IconButton disabled={user.reported_by.length === 0 ? true : undefined} aria-label="expand row" size="small" onClick={() => getReportDataForUser()}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>            
            <TableCell align="center" style={{ fontWeight: 'bold' }}>{user.first_name + ' ' + user.last_name}</TableCell>
            <TableCell align="center" ><Avatar alt={user.first_name} src={user.pictures[0].url} style={{width:'80px', height:'80px', margin:'auto'}}/></TableCell>
            <TableCell align="center" style={{ maxWidth: '120px' }}>{user.topics_descriptions}</TableCell>
            <TableCell align="center">{user.reported_by.length}</TableCell>
            {/* <TableCell align="center"><Person></Person></TableCell> */}
            <TableCell align="center">
            <IconButton title={user.is_disabled ? 'Restaurar Acceso a GetFluent' : 'Inhabilitar Acceso a GetFluent'} aria-label={user.is_disabled ? 'Restaurar Acceso a GetFluent' : 'Inhabilitar Acceso a GetFluent' } style={{ marginBottom: '1.2rem' }} type="button" style= {{color: blockColor}} onClick={() => blockStatusHandler(user.id_user, !user.is_disabled)}  component="span">
              {blockIcon}
            </IconButton>            
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div" style={{fontWeight:'bold'}}>
                    Denuncias
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontWeight:'bold'}}>Nombre</TableCell>
                        <TableCell style={{fontWeight:'bold'}}>Fecha</TableCell>
                        <TableCell style={{fontWeight:'bold'}}>Motivo</TableCell>
                        <TableCell style={{fontWeight:'bold'}}>Descripción Adicional</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportsData.map((data) => (
                        <TableRow key={data.id_report}>
                          <TableCell>{data.first_name}</TableCell>
                          <TableCell component="th" scope="row">
                            {data.date}
                          </TableCell>                        
                          <TableCell >{data.report_description}</TableCell>
                          <TableCell >{data.text}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>)
}


export default UserListRow