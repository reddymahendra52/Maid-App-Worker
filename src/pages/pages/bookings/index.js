import React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

import styles from './OrderCard.module.css'

const Bookings = () => {
  const [listData, setListData] = useState([])
  const [open, setOpen] = React.useState(false)
  const [rowID, setRowID] = useState('')
  const [ratings, setRatings] = useState('')

  useEffect(() => {
    // Fetch value from LocalStorage
    const workerUUID = localStorage.getItem('Cuuid')
    console.log('UUID : ' + workerUUID)

    // Fetch the new list data
    const fetchData = async () => {
      try {
        const response = await fetch('https://maid-app-test.onrender.com/api/getAll/bookings/' + workerUUID)
        const data = await response.json()

        console.log(data)

        setListData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleClickOpen = wid => {
    setRowID(wid)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    window.location.reload()
  }

  const rateNow = async event => {
    event.preventDefault()

    var payload = JSON.stringify({
      ratings: ratings
    })

    // Send the POST request
    const response = await fetch('https://maid-app-test.onrender.com/api/updateRatings/bookings/' + rowID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    console.log(response.status)

    // Handle the response
    if (response.ok) {
      window.location.reload()
    } else {
      // Error occurred, handle the error
      const error = await response.text()
      console.error('Error:', error)
    }
  }

  const acceptOffer = async params => {
    // event.preventDefault();

    console.log('Status: ' + params)

    var payload = JSON.stringify({
      status: 'Accepted'
    })

    // Send the POST request
    const response = await fetch('https://maid-app-test.onrender.com/api/updateStatus/bookings/' + params, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    // Handle the response
    if (response.ok) {
      window.location.reload()
    } else {
      // Error occurred, handle the error
      const error = await response.text()
      console.error('Error:', error)
    }
  }

  const rejectOffer = async params => {
    // event.preventDefault();

    console.log('Status: ' + params)

    var payload = JSON.stringify({
      status: 'Rejected'
    })

    // Send the POST request
    const response = await fetch('https://maid-app-test.onrender.com/api/updateStatus/bookings/' + params, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    // Handle the response
    if (response.ok) {
      window.location.reload()
    } else {
      // Error occurred, handle the error
      const error = await response.text()
      console.error('Error:', error)
    }
  }

  return (
    <Card>
      <CardHeader title='My Bookings' titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer>
        {listData.length == 0 ? (
          <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
            <TableCell colSpan={6}>-- No Data Found --</TableCell>
          </TableRow>
        ) : (
          <div className={styles.containerCardOrders}>
            {listData.map((row, index) => (
              <div className={styles.deliveryOrderCard} key={row.id}>
                <div className={styles.orderPrimaryInfo}>
                  <span>
                    <strong>Order</strong> #{row.id}
                  </span>
                  <span>
                    <strong>Date</strong> {row.date}{' '}
                  </span>
                </div>
                <div className={styles.orderInfo}>
                  <div className={styles.orderInfoRow}>
                    <strong>Worker Name</strong>
                    {row.customer_name || 'Jane Doe'}
                  </div>
                  <div className={styles.orderInfoRow}>
                    <strong>Worker Email</strong>
                    {row.customer_email || 'DoeJane@gmail.com'}
                  </div>
                  <div className={styles.orderInfoRow}>
                    <strong>Worker Phone</strong>
                    {row.customer_phone || '8890876567'}
                  </div>
                  <div className={styles.orderInfoRow}>
                    <strong>Type of Work</strong>
                    {row.type_of_work || 'All work'}
                  </div>
                  <div className={styles.orderInfoRow}>
                    <strong>Location</strong>
                    {row.location}
                  </div>
                  <div className={styles.orderInfoRow}>
                    <strong>Status </strong>
                    {row.status}
                  </div>
                  <div className={styles.orderInfoRow}>
                    <strong>Rating</strong>
                    {row.ratings || 'N/A'}
                  </div>
                  <br />
                  <div className={styles.orderInfoRow}>
                    <strong>Amount:</strong>₹{row.amount}
                  </div>
                </div>
                <div className={styles.orderFooter}>
                  <div>
                    {row.status == 'Pending' ? (
                      <Button variant='contained' style={{ background: 'green' }} onClick={() => acceptOffer(row.id)}>
                        Accept
                      </Button>
                    ) : null}
                  </div>
                  <div>
                    {row.status == 'Pending' ? (
                      <Button variant='contained' style={{ background: 'red' }} onClick={() => rejectOffer(row.id)}>
                        Reject
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div className={styles.orderFooter} style={{ borderTop: 'none' }}>
                  <div>
                    {row.status == 'Accepted' && (row.ratings == 'NA' || row.ratings == '' || row.ratings == null) ? (
                      <Button
                        variant='container'
                        style={{ background: 'purple', color: 'white' }}
                        onClick={() => handleClickOpen(row.id)}
                      >
                        Rate Now
                      </Button>
                    ) : null}
                    <Dialog
                      open={open}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby='alert-dialog-slide-description'
                    >
                      <DialogTitle>{'Provide Ratings!'}</DialogTitle>
                      <DialogContent>
                        <Card>
                          <CardContent>
                            <form onSubmit={rateNow}>
                              <Grid container spacing={5} mb={5}>
                                {row.status != '' ? (
                                  <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                      <InputLabel>Ratings:</InputLabel>
                                      <Select
                                        label='Ratings'
                                        defaultValue='- Select -'
                                        onChange={e => setRatings(e.target.value)}
                                      >
                                        <MenuItem value='- Select -' selected disabled>
                                          - Select -
                                        </MenuItem>
                                        <MenuItem value='1'>1 - Bad</MenuItem>
                                        <MenuItem value='2'>2</MenuItem>
                                        <MenuItem value='3'>3 - Good</MenuItem>
                                        <MenuItem value='4'>4</MenuItem>
                                        <MenuItem value='5'>5 - Excellent</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                ) : null}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Button fullWidth type='submit' variant='contained' size='large'>
                                  Submit
                                </Button>
                              </Grid>
                            </form>
                          </CardContent>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead> */}
        {/* <Typography variant='body2'>
          My Bookings
        </Typography> */}
        {/* <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type of Work</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Customer Phone</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.length == 0 ? (
              <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell colSpan={6}>-- No Data Found --</TableCell>
              </TableRow>
            ) : (
              listData.map((row, index) => (
                <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{index + 1}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type_of_work}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.customer_name || 'Joe Dane'}</TableCell>
                  <TableCell>{row.customer_email || 'danejoe@gmail.com'}</TableCell>
                  <TableCell>{row.customer_phone || '9879562345'}</TableCell>
                  {row.ratings != null ? <TableCell>{row.ratings}</TableCell> : <TableCell>NA</TableCell>}
                  <TableCell>
                    {row.status == 'Pending' ? (
                      <Button variant='outlined' sx={{ color: 'blue' }} onClick={() => acceptOffer(row.id)}>
                        Accept
                      </Button>
                    ) : null}
                    {row.status == 'Pending' ? (
                      <Button variant='outlined' sx={{ color: 'blue' }} onClick={() => rejectOffer(row.id)}>
                        Reject
                      </Button>
                    ) : null}
                    {row.ratings == 'NA' || row.ratings == '' || row.ratings == null ? (
                      <Button variant='outlined' sx={{ color: 'blue' }} onClick={() => handleClickOpen(row.id)}>
                        Rate Now!
                      </Button>
                    ) : null}
                    <Dialog
                      open={open}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby='alert-dialog-slide-description'
                    >
                      <DialogTitle>{'Provide Ratings!'}</DialogTitle>
                      <DialogContent>
                        <Card>
                          <CardContent>
                            <form onSubmit={rateNow}>
                              <Grid container spacing={5} mb={5}>
                                {row.status != '' ? (
                                  <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                      <InputLabel>Ratings:</InputLabel>
                                      <Select
                                        label='Ratings'
                                        defaultValue='- Select -'
                                        onChange={e => setRatings(e.target.value)}
                                      >
                                        <MenuItem value='- Select -' selected disabled>
                                          - Select -
                                        </MenuItem>
                                        <MenuItem value='1'>1 - Bad</MenuItem>
                                        <MenuItem value='2'>2</MenuItem>
                                        <MenuItem value='3'>3 - Good</MenuItem>
                                        <MenuItem value='4'>4</MenuItem>
                                        <MenuItem value='5'>5 - Excellent</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                ) : null}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Button fullWidth type='submit' variant='contained' size='large'>
                                  Submit
                                </Button>
                              </Grid>
                            </form>
                          </CardContent>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table> */}
      </TableContainer>
    </Card>
  )
}

export default Bookings
