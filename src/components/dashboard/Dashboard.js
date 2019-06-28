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
	welcomeMessage: {
		padding: theme.spacing(1)
	},
	loader: {
		marginTop: '40%'
	}
}))

/**
 * Dashboard component. Currently holds only the list of messages
 * @param {*} props 
 */
function Dashboard(props) {
	const {
		auth, 
		messages,
		users
 } = props

	const classes = useStyles()
	
	const showMessages = () => {
		const allLoaded = isLoaded(auth, users)
		const user = allLoaded && props.users.find(user => user.id === auth.uid)
		const username = user ? user.username : ''

		return isEmpty(messages)
			? <Typography className={ classes.messageEmpty } variant="h4"> There are no messages yet! </Typography>
			: (
				<React.Fragment>
					<Typography className={ classes.welcomeMessage } variant="body1"> 
						{
							isEmpty(username)
							? 'Welcome! Login or Sign up to post messages!'
							: `Welcome ${ username }, here are your messages:`
						}
					</Typography>

					<MessageList auth={ auth } messages={ messages } />
				</React.Fragment>
			)
	}

	/**
	 * TODO: atomize this as a Loader component and import it where needed,
	 * and customize it via props
	 */
	const loader = () => (
		<Grid className={ classes.loader } container direction="row" alignItems="center" justify="center">
			<CircularProgress color="secondary" />
		</Grid>
	)

	return (
		<Container>
			{ 
				isLoaded(props.users) && isLoaded(props.auth) && isLoaded(messages)
				? showMessages()
				: loader()
			}
		</Container>
	)
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	messages: state.firestore.ordered.messages,
	users: state.firestore.ordered.users
})	

/**
 * Syncs the messages collection in firestore to the Dashboard component
 */
export default compose(
	firestoreConnect([
		{ collection: 'messages', orderBy: ['date', 'desc'] },
		{ collection: 'users' }
	]),
	connect(mapStateToProps)
)(Dashboard)
