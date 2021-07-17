import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Chart from "react-google-charts";
import MomentUtils from '@date-io/moment';

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



class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            date: new Date(),
            denuncias: [],
            sessions: [],
            chartData: [],
            reportsData: []
        };
        this.selectDate = this.selectDate.bind(this)
    }

    async componentDidMount() {
        await this.getDenuncias()
        await this.getSessions()
        this.setState({loading: false})
    }

    async getDenuncias() {
        const token = '';
        const endpoint = 'https://tdp2-tp1-users-service.herokuapp.com/report/dataset';
        const response = await get(endpoint, token);        
        if (response.status == 200) {
          let json = await response.json();
          this.setState({ denuncias: json });         
        }
    }

    async getSessions() {
        const token = '';
        const endpoint = 'https://tdp2-tp1-users-service.herokuapp.com/login/dataset';
        const response = await get(endpoint, token);        
        if (response.status == 200) {
          let json = await response.json();
          this.setState({ sessions: json });
        }
    }

    selectDate(date) {
        this.setState({ date: date })
    }

    render() {

        return (
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Mes y Año"
                        helperText="Seleccione mes y año"
                        value={this.state.date}
                        onChange={this.selectDate}
                        disableFuture={true}
                    />
                </MuiPickersUtilsProvider>

                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            'Día',
                            'Usuarios únicos',
                            'Cantidad de mensajes',
                        ],
                        [0, 37.8, 8000.8],
                        [1, 37.8, 8000.8],
                        [2, 30.9, 6900.5],
                        [3, 25.4, 5700],
                        [4, 11.7, 1800.8],
                        [5, 11.9, 1700.6],
                        [6, 8.8, 1300.6],
                        [7, 7.6, 1200.3],
                        [8, 12.3, 2900.2],
                        [9, 16.9, 4200.9],
                        [10, 12.8, 3000.9],
                        [11, 5.3, 700.9],
                        [12, 6.6, 800.4],
                        [13, 4.8, 600.3],
                        [14, 4.2, 600.2],
                        [15, 5.3, 700.9],
                        [16, 6.6, 800.4],
                        [17, 4.8, 600.3],
                        [18, 4.2, 60.2],
                        [19, null, null],
                        [21, null, null],
                        [22, null, null],
                        [23, null, null],
                        [24, null, null],
                    ]}
                    options={{
                        chart: {
                            title: 'Actividad diaria',
                        },
                        series: {
                            // Gives each series an axis name that matches the Y-axis below.
                            0: { axis: 'Sesiones' },
                            1: { axis: 'Mensajes' },
                        },
                        axes: {
                            // Adds labels to each axis; they don't have to match the axis names.
                            y: {
                                Sesiones: { label: 'Sesiones' },
                                Mensajes: { label: 'Mensajes' },
                            },
                          },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>

        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);