// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Developed By `}
        <Link href='#'>Maid App</Link>
      </Typography>
    </Box>
  )
}

export default FooterContent
