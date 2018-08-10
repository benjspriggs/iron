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
  t.text("html")
})

console.log("Database configuration :::", config)

const app = express()

// use json encoded bodies
app.use(express.json())
// use CORS
app.use(require("cors")())

// routes

const port = process.env.PORT || 5000

const newline = "\n"

app.post("/post", (req, res, next) => {
  const { title, content, source, date, html } = req.body.post

  knex("posts")
    .insert({
      title,
      html,
      content: content ? content.join(newline) : content,
      source,
      date
    })
    .then(([id]) => res.send({ id, title, content, source, date, html }))
    .catch(next)
})

app.get("/post", (req, res, next) => {
  const query = !_.isEmpty(req.query)
    ? req.query
    : _.isEmpty(req.body)
      ? req.body
      : true

  knex("posts")
    .where(query)
    .then(posts => res.send({ posts, query, newline }))
    .catch(next)
})

app.listen(port)

console.log("Listening on port", port)
