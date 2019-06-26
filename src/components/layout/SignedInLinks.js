import React from 'react'
import { NavLink } from 'react-router-dom'

import { withFirebase } from 'react-redux-firebase'

import { makeStyles } from '@material-ui/core/styles'
import {
	IconButton,
	Badge,
	MenuItem,
	Menu
} from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'

import MenuItemButton from './MenuItemButton'

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

function SignedInLinks(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }

  function handleMenuClose() {
    setAnchorEl(null)
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
  const renderMenu = (
    <Menu
      anchorEl={ anchorEl }
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={ menuId }
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }} 
      open={ isMenuOpen }
      onClose={ handleMenuClose }
    >
      <MenuItem onClick={ handleMenuClose }>Profile</MenuItem>

      <MenuItem onClick={ handleLogout }>
				<NavLink className={ classes.menuItemLink } to="#!">
					Logout
				</NavLink>
			</MenuItem>
    </Menu>
  )

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
      <MenuItem>
        <IconButton aria-label="Show 4 new mails" color="inherit">
          <Badge badgeContent={ 4 } color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      
      <MenuItem>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <Badge badgeContent={ 11 } color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
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
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <React.Fragment>
      <MenuItemButton to="/create"> New Message </MenuItemButton>

			<div className={ classes.sectionDesktop }>
				<IconButton aria-label="Show 4 new mails" color="inherit">
					<Badge badgeContent={ 4 } color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>

				<IconButton aria-label="Show 17 new notifications" color="inherit">
					<Badge badgeContent={ 17 } color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>

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
      { renderMenu }
    </React.Fragment>
  )
}

export default withFirebase(SignedInLinks)

