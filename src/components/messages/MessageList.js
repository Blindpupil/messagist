import React from 'react'
import PublicMessage from './PublicMessage'
import PrivateMessage from './PrivateMessage'

const MessageList = () => (
	<React.Fragment>
		<PublicMessage />
		<PrivateMessage />
	</React.Fragment>
)

export default MessageList