import React from 'react'
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'

import MessageList from '../messages/MessageList'


function Dashboard(props) {
	const { messages } = props

	return (
		<Container>
			<MessageList messages={ messages } />
		</Container>
	)
}

const mapStateToProps = state => ({
	messages: state.message.messages
})

export default connect(mapStateToProps)(Dashboard)