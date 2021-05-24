import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ptBR } from "date-fns/locale";
import axios from 'axios'


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [selectedMarket, setSelectedMarket] = React.useState(null);


  
  const [bet, setBet] = React.useState({
    enter: "",
    units: 0,
    unitValue:0,
    odds: 0,
  })

  const markets = [
    { market: 'Futebol'},
    { market: 'Fifa'},
    { market: 'Basquete'},
    { market: 'Galgos'},
    { market: 'Cashout'},
  ]
  const handleClickOpen = () => {
    setOpen(true);
  };
  const refreshPage = ()=>{
    window.location.reload();
 }
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value)
    setBet((prevalue) => {
      return {
        ...prevalue,               
        [name]: value
      }
    })
  }
  const handleSubmit = async e => {
    console.log(selectedMarket)
  
    let request = {
      date: new Date().toISOString(),
      gameTime: selectedDate ? selectedDate : new Date().toISOString(),
      enter: bet.enter,
      market: selectedMarket.market,
      units: parseFloat(bet.units),
      unitValue: parseFloat(bet.unitValue),
      odds: parseFloat(bet.odds),
      result: "",
      profit: 0,
      profitPercentage: "",
      status: "",
      messageId: Math.floor(Math.random() * 10000000) + 1
    }
    console.log(request)
    e.preventDefault();
    axios.post('http://localhost:53443/Bets/AddBet', request
    )
    .then(() => {
      handleClose();
      refreshPage();
    });
  }
  return (
    <div style={{paddingTop: '6px'}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{left:"1560px", marginTop: "-40px"}}>
        Adicionar Aposta
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form noValidate onSubmit={handleSubmit}>

        <DialogTitle id="form-dialog-title">Adicionar Aposta</DialogTitle>
        <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
        <DateTimePicker
          variant="inline"
          ampm={false}
          hideTabs
          autoOk
          allowKeyboardControl={false}
          label="Data Entrada"
          dateRangeIcon= "br"
          value={selectedDate}
          onChange={handleDateChange}
          onError={console.log}
          leftArrowButtonProps={{ "aria-label": "Prev month" }}
          rightArrowButtonProps={{ "aria-label": "Next month" }}
          disablePast
          format="dd/MM/yyyy HH:mm"
          fullWidth
        />
        </MuiPickersUtilsProvider>
        <br />
        <TextField
            autoFocus
            margin="dense"
            id="enter"
            name="enter"
            label="Entrada"
            type="string"
            fullWidth
            onChange={handleChange}
        />
          <br />
          <br />
            <Autocomplete
              autoFocus
              id="combo-box-demo"
              options={markets}
              getOptionLabel={(option) => option.market}
              style={{ width: 300 }}
              onChange={(_, newValue) => setSelectedMarket(newValue)}
              renderInput={(params) => 
              <TextField 
              {...params} 
              margin="dense"
              id="market"
              label="Mercado"
              fullWidth
              autoFocus
              />}
            />

        <TextField
            autoFocus
            margin="dense"
            id="units"
            label="Unidades"
            type="number"
            name="units"
            fullWidth
            onChange={handleChange}
        />
          <br />        
        <TextField
            autoFocus
            margin="dense"
            id="unitValue"
            label="Valor apostado"
            type="number"
            name="unitValue"
            fullWidth
            onChange={handleChange}
          />
         <br />
          <TextField
            autoFocus
            margin="dense"
            id="odds"
            label="Odd"
            name="odds"
            type="number"
            fullWidth
            onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}color="primary" onSubmit={handleSubmit}>
            Cancelar
          </Button>
          <Button  type="submit"  onClick={handleClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
          </form>
      </Dialog>
    </div>
  );
}
