import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
	firestoreConnect,
	isLoaded,
	isEmpty
} from 'react-redux-firebase'

import {
	CircularProgress,
	Container,
	Grid,
	Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import MessageList from '../messages/MessageList'

const useStyles = makeStyles(theme => ({
  messageEmpty: {
		textAlign: 'center',
		margin: theme.spacing(2)
	},
	loader: {
		marginTop: '40%'
	}
}))

/**
 * Dashboard component. Currently only holding the list of messages
 * @param {*} props 
 */
function Dashboard(props) {
	const { messages } = props
	const classes = useStyles()

	const showMessages = () => {
		return isEmpty(messages)
			? <Typography className={ classes.messageEmpty } variant="h4"> There are no messages yet! </Typography>
			: <MessageList messages={ messages } />
	}

	const loader = () => (
		<Grid className={ classes.loader } container direction="row" alignItems="center" justify="center">
			<CircularProgress color="secondary" />
		</Grid>
	)

	return (
		<Container>
			{
				isLoaded(messages)
					? showMessages()
					: loader()
			}
		</Container>
	)
}

const mapStateToProps = (state) => ({
	messages: state.firestore.ordered.messages
})	

/**
 * Sync the messages collection in firestore to the Dashboard component
 */
export default compose(
	firestoreConnect([ 'messages' ]),
	connect(mapStateToProps)
)(Dashboard)
