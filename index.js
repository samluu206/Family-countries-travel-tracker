import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL environment variable is not set!");
  process.exit(1);
}

console.log("Connecting to database...");
console.log("DATABASE_URL is set:", process.env.DATABASE_URL ? "Yes" : "No");

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [currentUserId]);
  return result.rows[0];
}

async function getAllUsers() {
  const result = await db.query("SELECT * FROM users ORDER BY id");
  return result.rows;
}

async function checkVisited(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [userId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    const currentUser = await getCurrentUser();
    const countries = await checkVisited(currentUserId);

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
    });
  } catch (err) {
    console.error("Error loading home page:", err);
    res.status(500).send("Error loading page");
  }
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  if (!input || input.trim() === "") {
    return res.redirect("/");
  }

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      console.log("Country not found:", input);
      return res.redirect("/");
    }

    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.error("Error inserting country:", err);
      res.redirect("/");
    }
  } catch (err) {
    console.error("Error finding country:", err);
    res.redirect("/");
  }
});
app.post("/user", async (req, res) => {
  const action = req.body.add;
  const userId = req.body.user;

  if (action === "new") {
    res.render("new.ejs");
  } else if (userId) {
    currentUserId = parseInt(userId);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  if (!name || name.trim() === "") {
    return res.redirect("/");
  }

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *",
      [name.trim(), color || "teal"]
    );

    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.error("Error creating new user:", err);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await db.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  await db.end();
  process.exit(0);
});
