import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core/styles'

import { createMessage } from '../../store/actions/messageActions'


const useStyles = makeStyles(theme => ({
  root: {
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1)
  },
  icon: {
    paddingLeft: theme.spacing(1)
  },
  loader: {
		margin: theme.spacing(4)
	}
}))

function CreateMessage(props) {
  const [recipient, setRecipient] = React.useState('')
  const [content, setContent] = React.useState('')
  const [isPublic, setPublic] = React.useState(true)
  const classes = useStyles()

  // Redirect to login if user is not authenticated
  if (isEmpty(props.auth)) return <Redirect to="/login" />

  const usersLoaded = isLoaded(props.users)
  const isOnlyUser = usersLoaded && props.users.length === 1

  const loader = () => (
		<Grid className={ classes.loader } container direction="row" alignItems="center" justify="center">
			<CircularProgress color="secondary" />
		</Grid>
  )
  
  const usersMenuItems = () => {
    return props.users.map(user => (
      <MenuItem key={ user.id } value={ user.id }>{ user.username }</MenuItem>
    ))
  }

  function handleRecipient(event) {
    setRecipient(event.target.value)
  }

  function handleContent(event) {
    setContent(event.target.value)
  }

  function handleSwitch() {
    setPublic(!isPublic)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const { uid } = props.auth
    const { username } = props.users.find(o => o.id === uid)
    
    // TODO: error handling
    props.createMessage({
      author: username,
      authorId: uid,
      content,
      recipient,
      isPublic
    })

    props.history.push('/')
  }

  const switchLabel = isPublic ? 'Public post' : 'Private message'
  const buttonLabel = isPublic ? 'Publish' : 'Send'

	return (
		<Paper className={ classes.root }>
      <Typography variant="h4"> New message </Typography>
      { usersLoaded ?
        <form onSubmit={ handleSubmit } className={ classes.container } noValidate autoComplete="off">

          { !isOnlyUser && // if there's only 1 user, there's no one to send the message to
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <FormControlLabel
                control={
                  <Switch checked={ isPublic } onChange={ handleSwitch } value="publicPost" />
                }
                label={ switchLabel }
              />
            </Grid>
          }

          { !isPublic &&
            <FormControl>
              <InputLabel htmlFor="user-target">To</InputLabel>
              <Select
                value={ recipient }
                onChange={ handleRecipient }
                inputProps={{
                  name: 'recipient',
                  id: 'user-target',
                }}
                autoWidth
              >
                { usersMenuItems() }
              </Select>
            </FormControl>
          }

          <TextField
            label="Message"
            placeholder="Type your message"
            value={ content }
            multiline
            fullWidth
            rowsMax="6"
            onChange={ handleContent }
            className={ classes.textField }
            margin="normal"
          />

          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Button onClick={ handleSubmit } variant="contained" color="primary" className={ classes.button }>
              { buttonLabel }
              <Send className={ classes.icon } />
            </Button>
          </Grid>
        </form>

        : loader()
      }
		</Paper>
	)
}

const mapDispatchToProps = (dispatch) => ({
  createMessage: (message) => dispatch(createMessage(message))
})

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users
})

export default compose(
  firestoreConnect([ 'users' ]),
	connect(mapStateToProps, mapDispatchToProps)
)(CreateMessage)
