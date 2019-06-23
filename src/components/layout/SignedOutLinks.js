import React from 'react'
import MenuItemButton from './MenuItemButton'


export default function SignedOutLinks() {

  return (
		<React.Fragment>
			<MenuItemButton to="#!"> Sign up </MenuItemButton>
			<MenuItemButton to="#!"> Login </MenuItemButton>
		</React.Fragment>
	)
  
}
