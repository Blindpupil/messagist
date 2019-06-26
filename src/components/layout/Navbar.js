import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import {
	AppBar,
	CircularProgress,
	Toolbar,
	Typography
} from '@material-ui/core'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	loader: {
		margin: theme.spacing(0, 4)
	},
	logo: {
		textDecoration: 'none',
		color: theme.palette.common.white
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

function Navbar({ auth, messages }) {
	const allLoaded = isLoaded(auth) && isLoaded(messages)
	const authEmpty = isEmpty(auth)

	const authLinks = () => {
		return !authEmpty
			? <SignedInLinks auth={ auth } messages={ messages } />
			: <SignedOutLinks />
	}
	
	const classes = useStyles()

  return (
    <div className={ classes.grow }>
      <AppBar position="static">
        <Toolbar>
          <Typography className={ classes.title } variant="h6" noWrap>
            <Link className={ classes.logo } to="/">
							Messagist
						</Link>
          </Typography>

          <div className={ classes.grow } />
          
					{ allLoaded 
						? authLinks()
						: <CircularProgress className={ classes.loader } color="secondary" />
					}

        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => ({ 
	auth: state.firebase.auth,
	messages: state.firestore.ordered.messages,
	users: state.firestore.ordered.users
})

export default compose(
	firebaseConnect(),
	connect(mapStateToProps)
)(Navbar)
