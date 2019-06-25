import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'
import { firestoreConnect } from 'react-redux-firebase'

import MessageList from '../messages/MessageList'

/**
 * Dashboard component. Currently only holding the list of messages
 * @param {*} props 
 */
function Dashboard(props) {
	const { messages } = props

	return (
		<Container>
			<MessageList messages={ messages } />
		</Container>
	)
}

const mapStateToProps = state => {
	return ({
		messages: state.firestore.ordered.messages
	})	
}
/**
 * Sync the messages collection in firestore to the Dashboard component
 */
export default compose(
	firestoreConnect([ 'messages' ]),
	connect(mapStateToProps)
)(Dashboard)