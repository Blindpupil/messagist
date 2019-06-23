import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
	menuItemLink: {
		color: theme.palette.common.white,
		textDecoration: 'none'
	}
}))

export default function MenuItemButton({ children, to }) {
	const classes = useStyles()

  return (
		<Link className={ classes.menuItemLink } to={ to }>
			<Button color="inherit">
					{ children }
			</Button>
		</Link>
  )
}