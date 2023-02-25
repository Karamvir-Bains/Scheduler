# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. 

When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Interview Scheduler
!["Screenshot of Interview Scheduler"](https://github.com/Karamvir-Bains/Scheduler/blob/master/docs/Interview%20Scheduler.gif)
The image demonstrates creating, editing, and deleting an interview.

## Getting Started

1. Install dependencies with `npm install`.
2. Setup and Run the [Scheduler-API](https://github.com/lighthouse-labs/scheduler-api).
3. Change your directory to Scheduler.
4. Start the web server with `npm start`.
5. Go to <http://localhost:8080/> in your browser.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress End-To-End Testing
### Inside Scheduler-API 
1. Add `"test:server": "NODE_ENV=test npm start",` to your package.json file under scripts.
2. Duplicate your `.env.development` file and name it `.env.test` change `PGDATABASE` to `scheduler_test`.
3. Run `npm run test:server`.

### Inside Scheduler
```sh
npm run cypress
```

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Dev Dependencies

- babel/core
- storybook/addon-actions
- storybook/addon-backgrounds
- storybook/addon-links
- storybook/addons
- storybook/react
- testing-library/jest-dom
- testing-library/react
- testing-library/react-hooks
- babel-loader
- prop-types
- react-test-renderer
- sass