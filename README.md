# Messagist

Welcome to [messagist](https://kicklox-messagist.web.app/). A small app to test React/Redux front-end skills, with a bit of Firebase in the backend just to make it work.
This small app lets you write public posts and private messages to users in the app.
For the UI I leverage the power of material-ui.
Use email and a password to signup and login. Afterwards you can post public messages or send private messages to other users.

## Running it locally

If you want to run this locally in your own firebase instance, simply 
1. create a [firebase account](https://console.firebase.google.com)
2. create a new project
3. replace the local [config object in this project](src\firebase\config.js) to the object in the project you just created. Click on the "Web" configuration in your firebase project to see your config object. 

## Important things that I usually do, but that are missing in this project
1. [prop-types](https://www.npmjs.com/package/prop-types)
2. error handling, fail cases, 404...
3. blocked routes (if you go directly to /create when not logged in, you can still access the page). Usually with a "requestAuth" HOC
4. dynamic routes to private messages (conversation style)
5. HOC (higher order components) to pass all props down to children, instead of having each component accessing the store or firebase middleware
6. atomization of smaller components, which became too big during development.
7. a constants file to avoid using magic strings in action types
8. tests
9. form validation
10. firestore rules are still in development mode
11. probably many other things...

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
