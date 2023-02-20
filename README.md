# Interview Scheduler

Interview Scheduler was a project done during a bootcamp at Lighthouse Labs. This app was created in order to demonstrate my understanding of React, along with several different testing tools and development environments including Storybook, Jest, and Cypress.

Interview Scheduler is a single-page application that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Database

To get yourself started with a database and some initial seed data, you can fork the scheduler-api repository [here](https://github.com/lighthouse-labs/scheduler-api). Follow the steps in the README in order to get set up. You will need to run this server and the Scheduler webpack development server at the same time.

## Preview

### Creating and Editing an appointment

![](https://user-images.githubusercontent.com/44046763/220208833-ef90a44e-6c94-4208-879b-530bb46b7983.gif)

### Deleting an appointment

![](https://user-images.githubusercontent.com/44046763/220209045-dc879420-2a3d-4226-9377-dff8d373bdc9.gif)

## Main Dependencies

- Axios
- Classnames
- Normalize
- React
- @testing-library/react-hooks
- Storybook
- Cypress
- Jest
