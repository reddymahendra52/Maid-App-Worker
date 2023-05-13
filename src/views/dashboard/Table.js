// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}



const DashboardTable = () => {

  const [customer, setCustomer] = useState("");

  const [customerId, setCustomerId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");

  useEffect(async () => {
    const response = await fetch('http://13.127.200.135:8080/api/getAll/bookings', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
      .then(response => {
      
          console.log(response);
          setCustomer(response);
          console.log(customer.length);
          
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const bookWorker = async (event) => {
    event.preventDefault();

    var phone = mobileNumber;
    var passwd = values.password;

    console.log(" Phone Number : " + phone);
    console.log(" Password : " + passwd);

    if(phone === null || phone === '') {
      console.log('Enter your mobile number.');
      alert("Enter your mobile number.");
    } else if (passwd === null || passwd === '') {
      alert("Enter your password.");
    } else {
      var payload = JSON.stringify({ 
        "phone": mobileNumber,
        "password": values.password,
      });
      console.log(payload);
  
      const response = await fetch('http://13.127.200.135:8080/api/login/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:payload
      }).then(response => response.json())
      .then(response => {
      
          console.log(response);
          console.log(response['message']);
          if(response['message'] === 'No data found') {
            alert("Invalid Credentials");
          } else if(response['message'] === 'Invalid Password!') {
            alert("Invalid Password!");
          } else {
            localStorage.setItem('Name', response['name']);
            localStorage.setItem('Email', response['email']);
            localStorage.setItem('Phone', response['phone']);
            localStorage.setItem('Cuuid', response['customer_id']);
            localStorage.setItem('Cid', response['id']);
            window.location.href = '/';
          }
      });
    }
  };

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Type of Service</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(customer.length == 0) ? <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell colSpan={6}>-- No Data Found --</TableCell>
              </TableRow> : customer.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.id}</Typography>
                    {/* <Typography variant='caption'>{row.designation}</Typography> */}
                  </Box>
                </TableCell>
                <TableCell>{row.type_of_work}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {row.status == 'Booked' ? <Button disabled={true} variant='outlined' sx={{ color: 'grey' }}>Already Booked</Button> : <Button variant='outlined' sx={{ color: 'blue' }} onClick={handleClickOpen}>Book Now</Button> }
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
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                label='Enter work location'
                placeholder='Enter work location'
                helperText='Enter location for the worker to reach you on time...'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setWorkType(e.target.value)}
                fullWidth
                type='text'
                label='Type of Work'
                placeholder='Enter Type of Work'
                helperText='Enter type of work you want worker to complete...'
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button fullWidth type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
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

export default DashboardTable
