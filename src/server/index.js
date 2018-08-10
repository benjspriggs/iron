const express = require("express")
const config = {
  filename: "./data.db"
}

// database

var knex = require("knex")({
  client: "sqlite",
  connection: config,
  useNullAsDefault: true
})

const createIfNotExists = (tableName, schema) =>
  knex.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      return knex.schema.createTable(tableName, schema)
    }
  })

createIfNotExists("posts", t => {
  t.increments("id").primary()

  t.string("title", 150)
  t.string("source", 150)

  t.date("date", 150)

  t.text("content")
})

console.log("Database configuration :::", config)

const app = express()

app.use(require("cors")())

// routes

const port = process.env.PORT || 5000

app.post("/post", (req, res, next) => {
  console.dir(req.body)
  knex("posts")
    .insert(req.body)
    .then(rows => res.send(rows))
    .catch(next)
})

app.get("/post", (req, res, next) => {
  knex("posts")
    .where(req.query)
    .then(rows => res.send(rows))
    .catch(next)
})

app.listen(port)

console.log("Listening on port", port)
