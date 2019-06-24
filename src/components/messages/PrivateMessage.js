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

function PrivateMessage(props) {
	const classes = useStyles()

	const {
		author,
		content,
		date
	} = props.message

	return (
		<Paper className={ classes.root }>
			<Typography variant="h6">
				{ author } whispered to you:
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

export default PrivateMessage
