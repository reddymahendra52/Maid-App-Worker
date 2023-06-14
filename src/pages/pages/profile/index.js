import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const Profile = () => {
  const [userID, setUserID] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')

  // Check if the user is authenticated on page load
  useEffect(() => {
    const cname = localStorage.getItem('Name')
    const cemail = localStorage.getItem('Email')
    const cphone = localStorage.getItem('Phone')
    const id = localStorage.getItem('Cuuid')
    setUserID(id)
    setUserName(cname)
    setUserEmail(cemail)
    setUserPhone(cphone)
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    var cid = userID
    var name = userName
    var email = userEmail
    var phone = userPhone

    if (name === null || name === '') {
      alert('Enter your full name')
    } else if (email === null || email === '') {
      alert('Enter your email id.')
    } else if (phone === null || phone === '') {
      alert('Enter your mobile number.')
    } else {
      var payload = JSON.stringify({
        name: userName,
        email: userEmail,
        phone: userPhone
      })
      console.log(payload)

      const response = await fetch('http://maid-app-test.onrender.com/api/update/worker/' + cid, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          console.log(response['message'])
          if (response['message'] === 'No data found to update') {
            alert('No data found to update')
          } else {
            window.location.href = '/'
          }
        })
    }
  }

  return (
    <Card>
      <CardHeader title='My Profile' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                onChange={e => setUserName(e.target.value)}
                fullWidth
                label='Full Name'
                placeholder={userName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
                // onChange={(e) => setUserEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setUserEmail(e.target.value)}
                fullWidth
                type='email'
                label='Email'
                placeholder={userEmail}
                helperText='You can use letters, numbers & periods'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setUserPhone(e.target.value)}
                fullWidth
                type='number'
                label='Phone No.'
                placeholder={userPhone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Profile
