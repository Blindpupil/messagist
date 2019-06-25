import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
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
  }
}))

function CreateMessage(props) {
  const [recipient, setRecipient] = React.useState('')
  const [content, setContent] = React.useState('')
  const [isPublic, setPublic] = React.useState(true)

  const classes = useStyles()

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

    props.createMessage({
      //  author,
      content,
      recipient,
      isPublic
    })
  }

  const switchLabel = isPublic ? 'Public post' : 'Private message'
  const buttonLabel = isPublic ? 'Publish' : 'Send'

	return (
		<Paper className={ classes.root }>
      <Typography variant="h4"> New message </Typography>  
			<form onSubmit={ handleSubmit } className={ classes.container } noValidate autoComplete="off">
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
          <FormControlLabel
            control={
              <Switch checked={ isPublic } onChange={ handleSwitch } value="publicPost" />
            }
            label={ switchLabel }
          />
        </Grid>

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
              <MenuItem value="Dude One">Dude One</MenuItem>
              <MenuItem value="Person Two">Person Two</MenuItem>
              <MenuItem value="Thirty Guy">Thirty Guy</MenuItem>
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

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button onClick={ handleSubmit } variant="contained" color="primary" className={ classes.button }>
            { buttonLabel }
            <Send className={ classes.icon } />
          </Button>
        </Grid>
      </form>
		</Paper>
	)
}

const mapDispatchToProps = (dispatch) => ({
  createMessage: (message) => dispatch(createMessage(message))
})

export default connect(null, mapDispatchToProps)(CreateMessage)
