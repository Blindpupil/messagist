import React from 'react'
import PublicMessage from './PublicMessage'
import PrivateMessage from './PrivateMessage'

function MessageList(props) {
	const { messages } = props

	const publicMessages = []
	const privateMessages = []

	if (messages) {
		messages.forEach(message => message.isPublic 
			? publicMessages.push(message)
			: privateMessages.push(message)
		)
	}

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