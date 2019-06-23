import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
	AppBar,
	Toolbar,
	Typography
} from '@material-ui/core'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
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

export default function Navbar() {
	const classes = useStyles()
	
	const loggedIn = true

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
          
					{ 
						loggedIn 
						? 
						<SignedInLinks />
						:
						<SignedOutLinks />
					}
        </Toolbar>
      </AppBar>
    </div>
  )
}
