import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0)
  }
}))

function PublicMessage(props) {
	const classes = useStyles()

	const {
		author,
		content,
		date
	} = props.message

	return (
		<Paper className={ classes.root }>
			<Typography variant="h6">
				{ author } posted:
			</Typography>

			<Typography variant="body1">
				{ content }
			</Typography>

			<Typography variant="caption">
				{ date }
			</Typography>
		</Paper>
	)
}

export default PublicMessage
