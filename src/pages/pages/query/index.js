import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

import { Card, CardHeader, CardContent, Grid, TextField, InputAdornment, Button } from '@mui/material'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'

const Query = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [messageError, setMessageError] = useState('')

  const form = useRef()

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePhoneChange = e => {
    setPhone(e.target.value)
  }

  const handleMessageChange = e => {
    setMessage(e.target.value)
  }

  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Please enter your name.')
    } else {
      setNameError('')
    }
  }

  const validateEmail = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!email.match(emailRegex)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  const validatePhone = () => {
    const phoneRegex = /^[0-9]{10}$/
    if (!phone.match(phoneRegex)) {
      setPhoneError('Please enter a valid 10-digit phone number.')
    } else {
      setPhoneError('')
    }
  }

  const validateMessage = () => {
    if (message.trim() === '') {
      setMessageError('Please enter your message.')
    } else {
      setMessageError('')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    validateName()
    validateEmail()
    validatePhone()
    validateMessage()
    emailjs
      .sendForm('service_dyr75mh', 'template_p4tcnva', form.current, 'ioZoaQ2aQO0D49b4f')
      .then(
        result => {
          console.log(result.text)
        },
        error => {
          console.log(error.text)
        }
      )
      .then(response => {
        console.log('Email sent successfully!')
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      })
      .catch(error => {
        console.error('Error sending email:', error)
      })
  }

  return (
    <Card>
      <CardHeader title='Submit your Query' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form ref={form} onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                readonly
                fullWidth
                label='Full Name'
                name='_name'
                placeholder='Enter your name'
                value={name}
                onChange={handleNameChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* <div>
                    <label>Name:</label>
                    <input type='text' value={name} onChange={handleNameChange} onBlur={validateName} />
                    <p className='error'>{nameError}</p>
                  </div> */}
            <Grid item xs={12}>
              <TextField
                readonly
                fullWidth
                type='email'
                label='Email'
                name='_email'
                placeholder='Enter your email'
                helperText='You can use letters, numbers & periods'
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* <div>
                    <label>Email:</label>
                    <input type='text' value={email} onChange={handleEmailChange} onBlur={validateEmail} />
                    <p className='error'>{emailError}</p>
                  </div> */}
            <Grid item xs={12}>
              <TextField
                readonly
                fullWidth
                type='tel'
                max='10'
                name='_phone'
                label='Phone No.'
                placeholder='Enter your Phone no'
                value={phone}
                onChange={handlePhoneChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* <div>
                    <label>Phone:</label>
                    <input type='text' value={phone} onChange={handlePhoneChange} onBlur={validatePhone} />
                    <p className='error'>{phoneError}</p>
                  </div> */}
            <Grid item xs={12}>
              <TextField
                readonly
                fullWidth
                type='text'
                rows={10}
                multiline
                label='Query'
                name='_query'
                placeholder='Enter Query'
                value={message}
                onChange={handleMessageChange}
                InputProps={{
                  startAdornment: <InputAdornment position='start'></InputAdornment>
                }}
              />
            </Grid>
            {/* <div>
                    <label>Message:</label>
                    <textarea value={message} onChange={handleMessageChange} onBlur={validateMessage}></textarea>
                    <p className='error'>{messageError}</p>
                  </div> */}
            {/* <button type='submit'>Submit</button> */}
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

export default Query
