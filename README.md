# GovTech-Assessment1
## Project Title: Author/User Registry

### Description
This project is a single-page application (SPA) built with React JS. It allows users to:

- Submit Author Names: Users can enter author names into a form and submit them.
- Display Submitted Authors: The submitted author names are displayed in a list on the page.
- Retrieve User List from API: The application fetches a list of users from an external API (https://jsonplaceholder.typicode.com/users).
- Display Retrieved User List: The retrieved user data is displayed in a separate list.

Features:
* Autocomplete search function on frontend so users can find staff entries without keying in entire name
* Ensure unique authors are submitted
* Sorting function by ID, Name and Username
* Logical sectioning of data on the table

## Prerequisites
- Node.js and npm (or yarn) installed on your system.
- Add the .env file sent over. It should contain DATABASE_URL="..."
- Docker installed if you are using it to run this project

## Running the project via Docker
1. ```docker-compose build```
2. ```docker-compose up```

## Running the project locally
### Install Dependencies
- ```npm install```

### Set up the database
- Run ```npx prisma migrate dev```
- Or if you would like to start the database from scratch, you may run ```npx prisma migrate reset```

### Start the application
- Development server: ```npm run dev```
- Production server: ```npm run build``` then ```npm start```

Built with:
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,ts,react,postgres,prisma" />
  </a>
</p>

