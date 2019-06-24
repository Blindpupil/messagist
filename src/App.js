import React from 'react'
import { 
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles' 
import customTheme from './theme'

import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import CreateMessage from './components/messages/CreateMessage'


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={ customTheme }>
        <div className="App">
          <header className="App-header">
            <Navbar />

            <Switch>
              <Route path="/" exact component={ Dashboard } />
              <Route path="/create" component={ CreateMessage } />
              <Route path="/login" component={ SignIn } />
              <Route path="/signup" component={ SignUp } />
            </Switch>
          </header>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
