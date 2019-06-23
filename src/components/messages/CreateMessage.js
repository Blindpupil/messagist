import React from 'react'
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
  TextField
} from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core/styles'


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

function CreateMessage() {
  const [recipient, setRecipient] = React.useState('')
  const [text, setText] = React.useState('')
  const [publicPost, setPublic] = React.useState(true)

  const classes = useStyles()

  function handleRecipient(event) {
    setRecipient(event.target.value)
  }

  function handleText(event) {
    setText(event.target.value)
  }

  function handleSwitch() {
    setPublic(!publicPost)
  }

  let switchLabel = publicPost ? 'Public post' : 'Private message'

	return (
		<Paper className={ classes.root }>
			<form className={ classes.container } noValidate autoComplete="off">
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
          <FormControlLabel
            control={
              <Switch checked={ publicPost } onChange={ handleSwitch } value="publicPost" />
            }
            label={ switchLabel }
          />
        </Grid>

        { !publicPost &&
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
          value={ text }
          multiline
          fullWidth
          rowsMax="6"
          onChange={ handleText }
          className={ classes.textField }
          margin="normal"
        />

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button variant="contained" color="primary" className={classes.button}>
            Send
            <Send className={ classes.icon } />
          </Button>
        </Grid>
      </form>
		</Paper>
	)
}

export default CreateMessage
