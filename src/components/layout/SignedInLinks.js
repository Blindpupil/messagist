import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import {
  Badge,
	IconButton,
	MenuItem,
  Menu,
  Typography
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import MoreIcon from '@material-ui/icons/MoreVert'

import MenuItemButton from './MenuItemButton'
import { markPrivateMessagesAsRead } from '../../store/actions/messageActions'


const useStyles = makeStyles(theme => ({
	menuItemLink: {
		color: theme.palette.text.primary,
		textDecoration: 'none'
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex'
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	}
}))

/**
 * Component that handles the UI buttons in NavBar during the logged-in state
 * BIG TODO: this functional component got WAAAAY bigger than expected
 * Extract smaller components and reduce the logic here.
 * @param {*} props
 */
function SignedInLinks(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl)

  const currentUser = props.auth.uid
  const privateMessages = props.messages.filter(message => message.recipient === currentUser)
  const newPrivateMessages = privateMessages.filter(privateMessage => privateMessage.isNew)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }
  
  function handleNotificationsMenuOpen(event) {
    setNotificationsAnchorEl(event.currentTarget)

    if (Boolean(newPrivateMessagesAmount)) { // false for 0, true for any other number
      props.markPrivateMessagesAsRead(newPrivateMessages)
    }
  }

  function handleMenuClose() {
    setAnchorEl(null)
    setNotificationsAnchorEl(null)
    handleMobileMenuClose()
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  function handleLogout() {
    props.firebase.logout()

    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderProfileMenu = (
    <Menu
      anchorEl={ anchorEl }
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={ menuId }
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }} 
      open={ isMenuOpen }
      onClose={ handleMenuClose }
    >
      <MenuItem onClick={ handleMenuClose }>
        <NavLink className={ classes.menuItemLink } to="/profile">
          Profile
        </NavLink>
      </MenuItem>

      <MenuItem onClick={ handleLogout }>
				<NavLink className={ classes.menuItemLink } to="/">
					Logout
				</NavLink>
			</MenuItem>
    </Menu>
  )

  const notificationsId = 'notifications-account-menu'
  const renderNotificationsMenu = (
    <Menu
      anchorEl={ notificationsAnchorEl }
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={ notificationsId }
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }} 
      open={ isNotificationsMenuOpen }
      onClose={ handleMenuClose }
    >
      { privateMessages.map(message => (
        <MenuItem key={ message.id }>
          <NavLink className={ classes.menuItemLink } to="/">
            <Typography variant="caption"> { message.author } whispered you </Typography>
            <Typography variant="body2"> { message.content } </Typography>
          </NavLink>
        </MenuItem>
        ))
      }
    </Menu>
  )

  const newPrivateMessagesAmount = newPrivateMessages.length
  const renderNotifications = () => {
    return (
      <IconButton 
        aria-label={ `Show ${ newPrivateMessagesAmount } new mails` }
        color="inherit"
        aria-controls={ menuId }
        aria-haspopup={ Boolean(newPrivateMessagesAmount) } // false for 0, true for any other number
        onClick={ handleNotificationsMenuOpen }
      >
        <Badge badgeContent={ newPrivateMessagesAmount } color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
    )
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={ mobileMoreAnchorEl }
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={ mobileMenuId }
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={ isMobileMenuOpen }
      onClose={ handleMobileMenuClose }
    >
      <MenuItem onClick={ handleNotificationsMenuOpen }>
        { renderNotifications() }
        <p>Messages</p>
      </MenuItem>

      <MenuItem onClick={ handleProfileMenuOpen }>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  )

  return (
    <React.Fragment>
      <MenuItemButton to="/create"> New Message </MenuItemButton>

			<div className={ classes.sectionDesktop }>
        { renderNotifications() }

				<IconButton
					edge="end"
					aria-label="Account of current user"
					aria-controls={ menuId }
					aria-haspopup="true"
					onClick={ handleProfileMenuOpen }
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			</div>
          
			<div className={ classes.sectionMobile }>
				<IconButton
					aria-label="Show more"
					aria-controls={ mobileMenuId }
					aria-haspopup="true"
					onClick={ handleMobileMenuOpen }
					color="inherit"
				>
					<MoreIcon />
				</IconButton>
			</div>

      { renderMobileMenu }
      { renderProfileMenu }
      { renderNotificationsMenu }
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({
  markPrivateMessagesAsRead: (privateMessages) => dispatch(markPrivateMessagesAsRead(privateMessages))
})

export default compose(
  firebaseConnect(),
	connect(null, mapDispatchToProps)
)(SignedInLinks)
