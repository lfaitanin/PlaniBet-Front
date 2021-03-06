import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import  {Link} from 'react-router-dom';
import axios from 'axios'
import FormDialog from './FormDialog'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ptBR } from "date-fns/locale";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Faitanin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const columns = [
  { field: 'date', headerName: 'Data', width: 110,  hide: true },
  { field: 'gameTime', headerName: 'Data', width:170, type: 'date', valueFormatter: (params) => new Date(params.value).toLocaleString(),
},

  { field: 'enter', headerName: 'Entrada', width: 280 },
  { field: 'market', headerName: 'Mercado Apostado', width: 180 },
  { field: 'units', headerName: 'Unidades', width: 115 },
  { 
    field:'status', 
    headerName: 'Status', 
    width: 115,
    editable: true,
    type: 'string',
  },
  { field: 'messageId', headerName: 'ID', width: 115,  hide: true  },
  { field: 'unitValue', headerName: 'Valor Unidade', width: 160 },

  { field: 'odds', headerName: 'Odds', width: 104 },
  { 
    field: 'result', 
    headerName: 'Resultado', 
    width: 130,     
    editable: true,
    type: 'string',

  },
  {
    field: 'profit',
    headerName: 'Lucro Obtido(R$)',
    type: 'number',
    width: 170,
  },
  {
    field: 'profitPercentage',
    headerName: 'Lucro Obtido(%)',
    type: 'number',
    width: 170,
  },
];

export default function App() {
  const classes = useStyles();
  const [bets, setBets] = useState([]);
  const [result, setResult] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());


  useEffect(() => {
    axios.get('https://planibet.herokuapp.com/Bets/GetBets')
    .then((response) => {
      setBets(response.data);
    });
    axios.get('https://planibet.herokuapp.com/Bets/GetBetByMounth')
    .then((response) => {
      setResult(response.data);
    });
  }, []);

  const handleEditCellChange = ({ id, field, props }) => {
      if (field === 'result') {
        debugger;
        const newState = {};
        newState[id] = {
          ...bets[id],
          result: { ...props},
        };
        setBets((state) => ({ ...state, ...newState }));
        let updatedBet = bets.find(x => x.messageId === id);
        updatedBet.result = props.value;
        updatedBet.status = "RESOLVIDA";

        axios.post('https://planibet.herokuapp.com/Bets/UpdateBet', updatedBet)
        .then((response) => {
          window.location.reload();
    })
    }
  }
  const handleDateChange = (date) => {
    console.log(date)
    axios.get(`https://planibet.herokuapp.com/Bets/GetResultByDate?day=${date}`)
      .then((response) => {
        setResult({
          today: response.data
        });
      });
     setSelectedDate(date);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Planibet
          </Typography>
          <Button color="primary"  variant="outlined" className={classes.link}>
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    Login
            </Link>
            </Button>
            <Button color="primary"  variant="outlined" className={classes.link}>
            <Link to="/SignUp" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    Cadastre-se
            </Link>
            </Button>
        </Toolbar>
      </AppBar>
      <Card style={{ maxWidth: 250, marginLeft: '343px', marginBottom: '-87px', marginTop: '33px'}}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Resultado do Dia
            </Typography>
            <Typography variant="h5" component="h2">
            </Typography>
            <Typography variant="body2" component="p">
              R$ {result.today}
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ maxWidth: 250, marginLeft: '85px', marginBottom: '-86px', marginRight: '715px'}}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Resultado do Mês
            </Typography>
            <Typography variant="h5" component="h2">
            </Typography>
            <Typography variant="body2" component="p">
              R$ {result.mounth}
            </Typography>
          </CardContent>
        </Card>

      {/* Hero unit */}
      <Container style={{marginTop: '-168px'}} maxWidth="sm" component="main" className={classes.heroContent}>        
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Planilha
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
         Maio
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Pesquisar por dia"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
      </Container>
      
      <FormDialog />
      <Container component="main">
        <Grid container spacing={2} style={{width: "1650px", marginLeft: "-250px"}} >
            <Grid xl={12} sm={12} md={12} style={{left: '-350px'}}>
            <div style={{ height: 500, width: '100%', left: '-350px'}}>
            <DataGrid onEditCellChangeCommitted={handleEditCellChange} getRowId={(row) => row.messageId} rows={bets} columns={columns} pageSize={20}/>
            </div>
            </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}