# A brief about the application

It is a single page web application that allows users to create/generate users.
Pulling and mapping data from an endpoint provided to render options for two select inputs - `occupation` and `state`. 
The app has form validation for all inputs on the form which upon filling out correctly will enable the submit button allowing users to submit the form. The submit button triggers a POST request to the same endpoint and if successful the user will recieve a pop-up  message.

# Steps to Run

- Clone the repo
- Install Dependencies using `npm install`
- Start the app using `npm run start`
- The app will start running on `localhost:3000`

# Tech Stack
- React
- Tailwind CSS
- DaisyUI

# Minimum Requirements

- Display a form with inputs for each field outlined
- Allow a user to complete and submit the form
- Do not allow form submission without completing the entire form
- Provide feedback upon successful form submission

# Added Features
- Form Validations
- Hide/Unhide password on toggle(using the eye icon in password field)
- Form State reset upon successful submission
- Mobile Responsive


