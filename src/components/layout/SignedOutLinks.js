import React from 'react'
import MenuItemButton from './MenuItemButton'


export default function SignedOutLinks() {

  return (
		<React.Fragment>
			<MenuItemButton to="/signup"> Sign up </MenuItemButton>
			<MenuItemButton to="/login"> Login </MenuItemButton>
		</React.Fragment>
	)
  
}
