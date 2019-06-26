import React from 'react'
import PublicMessage from './PublicMessage'
import PrivateMessage from './PrivateMessage'

function MessageList(props) {
	const { messages, auth } = props
	const currentUser = auth.uid

	const publicMessages = messages.filter(message => message.isPublic)
	const privateMessages = messages.filter(message => message.recipient === currentUser)

	const publicMessageList = publicMessages.map(publicMessage => 
		publicMessage &&
		<PublicMessage key={ publicMessage.id } message={ publicMessage } />
	)

	const privateMessageList = privateMessages.map(privateMessage =>
		privateMessage &&
		<PrivateMessage key={ privateMessage.id } message={ privateMessage } />
	)

	return (
		<React.Fragment>
			{ publicMessageList }

			{ privateMessageList }
		</React.Fragment>
	)
}

export default MessageList