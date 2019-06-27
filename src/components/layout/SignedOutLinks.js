import React from 'react'
import MenuItemButton from './MenuItemButton'

/**
 * This is how the SignedInLinks component should look like XD
 */
export default function SignedOutLinks() {

  return (
		<React.Fragment>
			<MenuItemButton to="/signup"> Sign up </MenuItemButton>
			<MenuItemButton to="/login"> Login </MenuItemButton>
		</React.Fragment>
	)
  
}
