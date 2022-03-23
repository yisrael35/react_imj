## Management events system

### About the project

I built this project for The Israel Museum, Jerusalem.
The technology stack:

> For the DB I used MySQL [Link](https://github.com/yisrael35/rest_imj/tree/main/sql/structure)
> For the FrontEnd I used React with Redux - current repository
> For the BackEnd I used REST-API and WebSocket (NodeJS) [Link](https://github.com/yisrael35/rest_imj)
> For the deployment I used AWS-EC2 [Link](http://yisraelbar.xyz/Login)
> For the documentation I used wiki.js [Link](https://wiki-imj.herokuapp.com/)
> To menage all the project I used Monday and Git
> The project goal is to build a Management events system for IMJ.

### About this repository

There are 3 type of users:

1. Admin - all permissions
2. user - all actions except users
3. guest - can view just the main screen

- All calls to the BackEnd - REST/WS done by token thats you get in the login

Main files and Folders:
App.js contains all the routes to the main pages
src/pages/ contain all the main pages
src/pages/Home.js The main page of the events
src/redux/ contain the store and all redux file, and all calls to BackEnd happens in "action" files
src/services/ init a web-worker thats init a WS the BackEnd (Register to get events - Design patterns observer)

👀 All rights reserved to Yisrael Bar
🌱 How to reach me:
[My Linkedin](https://www.linkedin.com/in/yisrael-bar-7534a842/)
If you want to see more of my projects:
[My GitHub](https://github.com/yisrael35)

### Create by: Yisrael Bar

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
