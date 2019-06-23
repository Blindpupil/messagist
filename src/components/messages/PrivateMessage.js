import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0),
		backgroundColor: theme.palette.grey[100]
  }
}))

function PrivateMessage() {
	const classes = useStyles()

	return (
		<Paper className={ classes.root }>
			<Typography variant="h5">
				Romain Ville whispered to you
			</Typography>

			<Typography variant="body1">
				Hey Cesar, yo thurr?
			</Typography>

			<Typography variant="caption">
				July 20, 14:05
			</Typography>
		</Paper>
	)
}

export default PrivateMessage
