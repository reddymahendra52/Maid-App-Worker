// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'My Bookings',
      icon: Table,
      path: '/pages/bookings'
    },
    {
      title: 'FAQ',
      icon: HelpCircleOutline,
      path: '/pages/faq'
    },
    {
      sectionTitle: 'Account'
    },
    {
      title: 'Profile',
      icon: AccountCogOutline,
      path: '/pages/profile'
    },
    {
      title: 'Raise a Query',
      icon: AlertCircleOutline,
      path: '/pages/query'
    },
    {
      title: 'Logout',
      icon: Login,
      path: '/pages/logout'
    }
  ]
}

export default navigation
