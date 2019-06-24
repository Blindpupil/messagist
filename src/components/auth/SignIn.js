import React from 'react'
import {
  Button,
  Grid,
  Paper,
  TextField
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

function SignIn() {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    setState({
      ...state,
      [event.target.id]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(state)
  }

  const classes = useStyles()

	return (
		<Paper className={ classes.root }>
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

export default SignIn
