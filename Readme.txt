the prerequisites and steps for setting up a Quiz Application. Here's a breakdown of what you've provided:

Prerequisites:
1. Node.js Installation: You need to have Node.js installed along with some specific packages like Express.js, body-parser, fs, and path.

2. Internet Connection: This is required for fetching Bootstrap files.

3. MongoDB: MongoDB is needed for the application's database. There are two types of users:

	Admin: Manages Quiz Data (Create, Edit, Delete).
	Student: Takes tests and accesses leaderboards.
Project Setup Steps:
1. Start MongoDB:
        Open command prompt and type: mongod --dbpath %DB% to start MongoDB.
2. Accessing the Application:
        Open a browser and type: http://localhost:3000/login.html to access the login page.
3. User Roles:
    Admin: Can manage Quiz Data. The login credentials are:
           * Email: admin@gmail.com
           * Password: 123
    Student: Can take tests and access leaderboards.
           * Sign-up with Name, Email, Password.
           * Log in with the provided credentials.
           * Access multiple quiz sections for taking tests.
           * View results via the leaderboard.