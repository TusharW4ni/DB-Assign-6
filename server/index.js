const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USR,
  password: process.env.PSSWRD,
  database: process.env.DB,
});
function executeQuery(pool, query, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection:", err);
        return reject(err);
      }

      connection.query(query, params, (error, results) => {
        connection.release();

        if (error) {
          console.error("Error executing query:", error);
          return reject(error);
        }

        resolve(results);
      });
    });
  });
}

// --------------------------------------------------------------------------

app.post("/unsafe/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const results = await executeQuery(
      db,
      `SELECT username, password, ssn, salary FROM User WHERE username="${username}" AND password="${password}";`
    );
    res.send(results);
  } catch (error) {
    console.error("Error in POST /search", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/unsafe/update", async (req, res) => {
  const { username, oldpass, newpass } = req.body;
  try {
    const results = await executeQuery(
      db,
      `UPDATE User SET password="${newpass}"
      WHERE username="${username}" AND password="${oldpass}";`
    );
    res.send(results);
  } catch (error) {
    console.error("Error in POST /update", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/safe/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const results = await executeQuery(
      db,
      `SELECT username, password, ssn, salary FROM User WHERE username=? AND password=?;`,
      [username, password]
    );
    res.send(results);
  } catch (error) {
    console.error("Error in POST /search", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/safe/update", async (req, res) => {
  const { username, oldpass, newpass } = req.body;
  try {
    const results = await executeQuery(
      db,
      `UPDATE User SET password=?
      WHERE username=? AND password=?;`,
      [newpass, username, oldpass]
    );
    res.send(results);
  } catch (error) {
    console.error("Error in POST /update", error);
    res.status(500).send("Internal Server Error");
  }
});

// --------------------------------------------------------------------------

app.listen(7070, () => {
  console.log("server listening on port 7070");
});
