import React from 'react'
import { withFirebase } from 'react-redux-firebase'

import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1)
  }
}))

function SignIn(props) {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    setCredentials({
      ...credentials,
      [event.target.id]: event.target.value
    })
  }

  /**
   * TODO: error handling
   */
  async function handleSubmit(event) {
    event.preventDefault()
    
    await props.firebase.login(credentials)
    
    props.history.push('/')
  }

  const classes = useStyles()

  /**
   * TODO: form validation
   */
	return (
		<Paper className={ classes.root }>
      <Typography variant="h4"> Login </Typography>  
			<form onSubmit={ handleSubmit } className={ classes.container }>
        <TextField
          label="Email"
          type="email"
          id="email"
          placeholder="Your email"
          onChange={ handleChange }
          margin="normal"
          fullWidth
        />

        <TextField
          label="Password"
          onChange={ handleChange }
          type="password"
          id="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
        />

        <Grid container direction="row" alignItems="center" justify="center">
          <Button onClick={ handleSubmit } color="primary" className={ classes.button }>
            Login
          </Button>
        </Grid>
      </form>
		</Paper>
	)
}

export default withFirebase(SignIn)
