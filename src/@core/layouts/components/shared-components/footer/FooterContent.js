// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Developed By `}
        <Link target='_blank' href='https://runshaw.in/'>
          RunShaw Technologies
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          
          <Link target='_blank' href='https://runshaw.in'>
            Privacy Policy
          </Link>
          <Link
            target='_blank'
            href='https://runshaw.in'
          >
            Terms & Conditions
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
