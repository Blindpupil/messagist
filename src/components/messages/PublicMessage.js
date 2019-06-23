import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0)
  }
}))


function PublicMessage() {
	const classes = useStyles()

	return (
		<Paper className={ classes.root }>
			<Typography variant="h4">
				Romain Ville published
			</Typography>

			<Typography variant="body1">
				OMG! cool stuff here
			</Typography>

			<Typography variant="caption">
				July 20, 14:05
			</Typography>
		</Paper>
	)
}

export default PublicMessage
