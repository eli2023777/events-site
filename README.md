# events-site

**events-site** is a web application that allows users to manage and attend events. The platform allows users to create, view, and interact with events. Business users can create and manage their own events, while regular users can view and like events. The application integrates a calendar feature for easy event scheduling.

## Features

- **User Authentication**: Users can register, log in, and log out of their accounts.
- **Event Management**: Business users can create, edit, and delete events. Each event has a date, time, and description.
- **Event Calendar**: Users can view events in a calendar view.
- **Favourites**: Users can mark their favourite events for later viewing.
- **Dark Mode**: The site supports dark and light modes, which users can toggle for a better viewing experience.
- **Responsive Design**: The application is fully responsive and optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, Bootstrap 5, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Libraries/Tools**: FontAwesome, React Router, React-Bootstrap

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm or yarn (package managers)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eli2023/events-site.git
   cd events-website
   
2. npm install
# or
yarn install

3. npm start
# or
yarn start

4. Open your browser and go to http://localhost:3000 to view the application.

### Environment Variables
Create a .env file in the root of your project and add the following variables:

MONGO_URI=<your_mongo_database_uri>
JWT_SECRET=<your_jwt_secret_key>
PORT=3000

Replace the placeholders with your actual credentials.

### Usage
Sign Up: New users can register for an account.
Login: Returning users can log into their accounts.
Create Events: Business users can create new events with details like name, date, time, and participants.
View Events: All users can view events in a calendar format.
Mark Favourites: Users can save events as favorites.
Dark Mode Toggle: Switch between dark and light modes from the navbar.


### Acknowledgements

Bootstrap 5 for the responsive layout.
FontAwesome for icons.
React-Bootstrap for Bootstrap components in React.
MongoDB for the database.

### Contact
For inquiries or issues, feel free to contact the project owner at eli770440@gamil.com.



