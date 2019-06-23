import React from 'react'
import { Container } from '@material-ui/core'

import MessageList from '../messages/MessageList'


function Dashboard() {

	return (
		<Container>
			<MessageList />
		</Container>
	)
}

export default Dashboard