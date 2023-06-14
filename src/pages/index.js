// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import '@coreui/coreui/dist/css/coreui.min.css'

import { CCallout } from '@coreui/react'

// ** Demo Components Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

import React, { useState, useEffect } from 'react'
import { TableContainer, CardHeader } from '@mui/material'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Dashboard = () => {
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const [userName, setUserName] = useState('')
  const [userUUID, setUserUUID] = useState('')

  // Check if the user is authenticated on page load
  useEffect(() => {
    const cuuid = ''
    const cname = ''
    cuuid = localStorage.getItem('Cuuid')
    cname = localStorage.getItem('Name')
    console.log('Cuuid : ' + cuuid)
    console.log('Name : ' + cname)
    setUserName(cname)
    setUserUUID(cuuid)
    if (cuuid != null || cuuid != '') {
      console.log('Logged In UUID : ' + cuuid)
    } else {
      console.log('Invalid token')
      window.location.href = '/pages/login'
    }
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Hello {userName}, 🥳</Typography>
              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                Welcome to your customer dashboard
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
            </CardContent>
          </Card>
          <Card style={{ marginTop: '15px' }}>
            <CardHeader title='Process Flow' titleTypographyProps={{ variant: 'h3' }} />
            <TableContainer>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Receive Booking Notifications</h5>
                Once you're logged in, you'll receive real-time booking notifications on your dashboard. These
                notifications inform you about new booking requests from customers in your area.
              </CCallout>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Accept or Reject Bookings</h5>
                Evaluate each booking request and make an informed decision. If you are available accept the booking. By
                accepting, you confirm your commitment to providing your cleaning services to the customer.
              </CCallout>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Deliver Quality Cleaning Service</h5>
                After accepting a booking, it's time to showcase your expertise! Visit the customer's location at the
                scheduled date and time and efficiently carry out the requested cleaning tasks.
              </CCallout>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Receive Final Payment and Provide Feedback</h5>
                Once you've completed the cleaning service to the customer's satisfaction, receive the final payment
                directly from the customer.
              </CCallout>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
