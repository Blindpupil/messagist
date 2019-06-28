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
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
	Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PrivateMessage from '../messages/PrivateMessage'
import PublicMessage from '../messages/PublicMessage'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 1)
  },
  list: {
    width: '100%'
  },
	loader: {
		marginTop: '40%'
	}
}))


/**
 * Handles the /profile view
 * Another component that turned way too big.
 * TODO: extract smaller components and minimize logic 
 * @param {*} props 
 */
function Profile(props) {
  const classes = useStyles()
  const { 
    auth,
    users,
    messages 
  } = props

  const allLoaded = isLoaded(auth) && isLoaded(users) && isLoaded(messages)
  const currentUser = allLoaded && users.find(user => user.id === auth.uid)

  const loader = () => (
		<Grid className={ classes.loader } container direction="row" alignItems="center" justify="center">
			<CircularProgress color="secondary" />
		</Grid>
  )
  
  const publicMessages = messages && messages.filter(message => (message.authorId === currentUser.id) && message.isPublic)
  const privateMessages = messages && messages.filter(message =>
    (message.recipient === currentUser.id) || (message.authorId === currentUser.id && !message.isPublic)
  )

  const publicMessageList = !isEmpty(publicMessages) && publicMessages.map(publicMessage => 
		<PublicMessage key={ publicMessage.id } message={ publicMessage } />
  )

	const privateMessageList = !isEmpty(privateMessages) && privateMessages.map(privateMessage => {
    const recipient = users.find(user => user.id === privateMessage.recipient)
    const participants = {
      currentUserId: currentUser.id,
      recepientUsername: recipient.username
    }

		return (
      <PrivateMessage key={ privateMessage.id } participants={ participants } message={ privateMessage } />
    ) 
  })
  
  
  const renderPrivateMessages = (
    isEmpty(privateMessages)
      ? <Typography variant="h6" className={ classes.title }> You have no private messages </Typography>
      : <Grid item xs={ 12 }>
          <Typography variant="h5" className={ classes.title }> Your private messages </Typography>
          { privateMessageList }
        </Grid> 
  )

  const renderPublicMessages = (
    isEmpty(publicMessages)
      ? <Typography variant="h6" className={ classes.title }> You have no public posts </Typography>
      : <Grid item xs={ 12 }>
          <Typography variant="h5" className={ classes.title }> Your posts </Typography>
          { publicMessageList }
        </Grid> 
  )

  return (
    <Container>
      <Typography variant="h4" className={ classes.title }> Profile Info </Typography>
      
      { allLoaded
        ? <Grid container>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary="Username" secondary={ currentUser.username } />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Email" secondary={ currentUser.email } />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="ID" secondary={ currentUser.id } />
              </ListItem>
            </List>
            { renderPrivateMessages }
            { renderPublicMessages }
          </Grid>
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

export default compose(
	firestoreConnect([
		{ collection: 'messages', orderBy: ['date', 'asc'] },
		{ collection: 'users' }
	]),
	connect(mapStateToProps)
)(Profile)
