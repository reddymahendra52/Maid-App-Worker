import React from 'react';
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// import { moment } from 'moment';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

const BookingsNew = () => {

  const [listData, setListData] = useState([]);

  useEffect(() => {
    // Reset the list data
    // setListData([]);

    // Fetch the new list data
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.127.200.135:8080/api/getAll/worker');
        const data = await response.json();
        console.log(data);
        console.log(data.length);
        setListData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [customerId, setCustomerId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [amount, setAmount] = useState("");
  const [washingAmount, setWashingAmount] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [area, setArea] = useState('');
  const [cloths, setCloths] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const handleClickOpen = (wid) => {
    setWorkerId(wid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };


  const bookWorker = async (event) => {
    event.preventDefault();

    if(area == '100') {
      console.log(" Amount is 50");
      setAmount('50');
    } else if(area == '100-200') {
      console.log(" Amount is 100");
      setAmount('100');
    } else if(area == '200-400') {
      console.log(" Amount is 150");
      setAmount('150');
    } else if(area == '400-600') {
      console.log(" Amount is 200");
      setAmount('200');
    }

    var workDate = `${year}-${month}-${day}`;
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(amount);

    console.log(workDate);

    var payload = JSON.stringify({ 
      "customer_id": customerId,
      "worker_id": workerId,
      "type_of_work": workType,
      "area": area,
      "date": workDate,
      "amount": amount,
      "location": location
    });
    console.log(payload);

    // Send the POST request
    const response = await fetch('http://13.127.200.135:8080/api/add/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });

    // Handle the response
    if (response.ok) {
      // Successful request, handle the response data
      const data = await response.json();
      console.log('Response:', data);
    } else {
      // Error occurred, handle the error
      const error = await response.text();
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
          {/* <Typography variant='body2'>
          My Bookings
        </Typography> */}
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Type of Service</TableCell>
              <TableCell>Worker Name</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(listData.length == 0) ? <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell colSpan={6}>-- No Data Found --</TableCell>
              </TableRow> : listData.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.id}</Typography>
                    {/* <Typography variant='caption'>{row.designation}</Typography> */}
                  </Box>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{row.name}</TableCell>
                {/* <TableCell>{row.amount}</TableCell> */}
                {/* <TableCell>{row.status}</TableCell> */}
                <TableCell>
                  {row.status == 'Booked' ? <Button disabled={true} variant='outlined' sx={{ color: 'grey' }}>Already Booked</Button> : <Button variant='outlined' sx={{ color: 'blue' }} onClick={() => handleClickOpen(row.id)}>Book Now</Button>
 }
                  <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Book Worker Now!"}</DialogTitle>
        <DialogContent>
        <Card>
      <CardContent>
        <form onSubmit={bookWorker}>
          
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
            <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Choose the type of work:</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setWorkType(e.target.value)}
            >
              <FormControlLabel value="Cleaning" control={<Radio />} label="Cleaning" />
              <FormControlLabel value="Washing" control={<Radio />} label="Washing" />
            </RadioGroup>
          </FormControl>
            </Grid>
            {workType == 'Cleaning' ? <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Area:</InputLabel>
              <Select label='Area' defaultValue='- Select -' onChange={(e) => setArea(e.target.value)}>
                <MenuItem value='- Select -' selected disabled>- Select -</MenuItem>
                <MenuItem value='100'>Less than 100sq</MenuItem>
                <MenuItem value='100-200'>100sq - 200sq</MenuItem>
                <MenuItem value='200-400'>200sq - 400sq</MenuItem>
                <MenuItem value='400-600'>400sq - 600sq</MenuItem>
              </Select>
            </FormControl>
          </Grid> : workType == 'Washing' ? <Grid item xs={12} sm={12}>
              <TextField
                onChange={(e) => setCloths(e.target.value)}
                type="number"
                fullWidth
                label='Enter no. of cloths'
                placeholder='Enter no. of cloths'
                helperText='Enter number of cloths'
              />
            </Grid> : null}
            
            {area != '' || cloths != '' ? <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel>Choose Date:</InputLabel>
      <DateCalendar disablePast onChange={(e) => {
        setYear(e['$y']);
        setMonth(e['$M']);
        setDay(e['$D']);
      }} />
    </LocalizationProvider>
            </Grid> : null}

            {area == '100' ? <Typography
          variant="secondary"> Amount: ₹50 </Typography> : area == '100-200' ? <Typography
          variant="secondary"> Amount: ₹100</Typography> : area == '200-400' ? <Typography
          variant="secondary"> Amount: ₹150</Typography> : area == '400-600' ? <Typography
          variant="secondary"> Amount: ₹200 </Typography> : null}

    {day != '' ? <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Location:</InputLabel>
              <Select label='Location' defaultValue='- Select -'>
                <MenuItem value='- Select -' selected disabled>- Select -</MenuItem>
                <MenuItem value='Gokulam'>Gokulam</MenuItem>
                <MenuItem value='Vidyanagar'>Vidyanagar</MenuItem>
                <MenuItem value='Gandhi Nagar'>Gandhi Nagar</MenuItem>
              </Select>
            </FormControl>
          </Grid> : null}

            {day != '' ? <Grid item xs={12} sm={12}>
              <Button fullWidth type='submit' variant='contained' size='large'>
                Confirm & Book Now!
              </Button>
            </Grid> : null}
          </Grid>
        </form>
      </CardContent>
    </Card>
        </DialogContent>
        
      </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Card>
  )
}

export default BookingsNew
