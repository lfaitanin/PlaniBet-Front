import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
}));

const columns = [
  { field: 'date', headerName: 'Data', width: 110 },
  { field: 'enter', headerName: 'Entrada', width: 199 },
  { field: 'market', headerName: 'Mercado Apostado', width: 184 },
  { field: 'units', headerName: 'Unidades', width: 115 },

  { field: 'odds', headerName: 'Odds', width: 104 },
  { field: 'result', headerName: 'Status', width: 104 },
  {
    field: 'profit',
    headerName: 'Lucro Obtido(u)',
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

const rows = [
  { 
    id: 1, 
    date: new Date().toLocaleDateString(), 
    enter: 'Shakhtar (Alback) Esports', 
    market: 'Fifa eSports 10 minutos', 
    units: 1, 
    odds: 1.900,
    result: 'GREEN',
    profit: 0.9,
    profitPercentage: '0.9%'
  },
  { 
    id: 2, 
    date: new Date().toLocaleDateString(), 
    enter: 'Shakhtar (Alback) Esports', 
    market: 'Fifa eSports 10 minutos', 
    units: 1, 
    odds: 1.900,
    result: 'GREEN',
    profit: 0.9,
    profitPercentage: '0.9%'
  },
  { 
    id: 3, 
    date: new Date().toLocaleDateString(), 
    enter: 'Shakhtar (Alback) Esports', 
    market: 'Fifa eSports 10 minutos', 
    units: 1, 
    odds: 1.900,
    result: 'GREEN',
    profit: 0.9,
    profitPercentage: '0.9%'},
  { 
    id: 4, 
    date: new Date().toLocaleDateString(), 
    enter: 'Shakhtar (Alback) Esports', 
    market: 'Fifa eSports 10 minutos', 
    units: 1, 
    odds: 1.900,
    result: 'GREEN',
    profit: 0.9,
    profitPercentage: '0.9%'
  },
  { 
    id: 5, 
    date: new Date().toLocaleDateString(), 
    enter: 'Shakhtar (Alback) Esports', 
    market: 'Fifa eSports 10 minutos', 
    units: 1, 
    odds: 1.900,
    result: 'GREEN',
    profit: 0.9,
    profitPercentage: '0.9%'
  },
  { 
    id: 6, 
    date: new Date().toLocaleDateString(), 
    enter: 'Shakhtar (Alback) Esports', 
    market: 'Fifa eSports 10 minutos', 
    units: 1, 
    odds: 1.900,
    result: 'GREEN',
    profit: 0.9,
    profitPercentage: '0.9%'
  },
];

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Planibet
          </Typography>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Planilha
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
         Maio
        </Typography>
      </Container>

      <Container component="main">
        <Grid container spacing={2} alignItems="flex-end">
            <Grid xs={12} sm={12} md={12}>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
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