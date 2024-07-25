# Setup

This project uses React on the frontend, NodeJS on the backend, and a MySQL database.

Programs necessary

1. VSCode
2. NodeJS
3. MySQL

You need to look online for the specific steps on how to install each program for your system.

After installing necessary applications:

1. Clone the repository
2. Open it in VSCode
3. Find the `.env.example` file in the `server` directory inside the project
4. Make a copy of the `.env.example` file and rename it to `.env`
5. Fill out your MySQL details in the .env
6. Open a terminal and navigate to the `server` directory in this project
7. Start MySQL here typically done in Unix like systems by executing `sudo mysql -u TypeYourUserNameHere -p`
8. When you see the `mysql>` prompt run these commands
   1. `CREATE DATABASE dbA06;`
   2. `USE dbA06;`
   3. `exit`
   4. `sudo mysql -u TypeYourUserNameHere -p dbA06 < dbA06_24_07_25.sql`
9. In this terminal run `npm i && npm run dev`
10. Open another terminal while you keep this one running
11. Navigate to the `client` directory
12. In the client directory run `npm i && npm run dev`
13. In your browser go to `http://localhost:5173`

To stop:

1. Ctrl/Cmd + C in both the terminals
2. Shutdown/Stop MySQL

# Features

- In the `http://localhost:5173/` route we can interact with the database unsafely. For the safe interaction demonstration use the `http://localhost:5173/safe` route.
- Please look at the files in the tests directory for sample SQL injection tests
