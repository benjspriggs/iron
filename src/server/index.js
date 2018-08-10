const express = require("express")
const _ = require("lodash")

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

// use json encoded bodies
app.use(express.json())
// use CORS
app.use(require("cors")())

// routes

const port = process.env.PORT || 5000

app.post("/post", (req, res, next) => {
  const { title, content, source, date } = req.body.post

  knex("posts")
    .insert({ title, content: content.join("\n"), source, date })
    .then(([rowId]) => res.send({ rowId, title, content, source, date }))
    .catch(next)
})

app.get("/post", (req, res, next) => {
  const query = _.isEmpty(req.query) ? req.body : req.query

  knex("posts")
    .where(query)
    .then(rows => res.send({ rows, query }))
    .catch(next)
})

app.listen(port)

console.log("Listening on port", port)
