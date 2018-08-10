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
  t.text("meta")
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

const deserializePost = post => ({ ...post, meta: JSON.parse(post.meta) })

const handleErr = res => err => {
  console.dir(err)
  return res.send({ err })
}

app.post("/post", (req, res) => {
  const { title, content, source, date, meta, html } = req.body.post

  knex("posts")
    .insert({
      title,
      meta: JSON.stringify(meta),
      content: content ? content.join(newline) : content,
      source,
      date,
      html
    })
    .then(([id]) => res.send({ id, title, content, source, date, meta, html }))
    .catch(handleErr(res))
})

app.put("/post", (req, res, next) => {
  const { id, ...post } = req.body.post

  knex("posts")
    .where("id", id)
    .update(post)
    .then(rows => res.send({ rows_affected: rows }))
    .catch(handleErr(res))
})

app.get("/post", (req, res, next) => {
  const query = !_.isEmpty(req.query)
    ? req.query
    : !_.isEmpty(req.body)
      ? req.body
      : true

  knex("posts")
    .where(query)
    .then(posts =>
      res.send({ posts: posts.map(deserializePost), query, newline })
    )
    .catch(handleErr(res))
})

app.delete("/post", (req, res, next) => {
  const query = !_.isEmpty(req.query) ? req.query : req.body

  knex("posts")
    .where("id", query.id)
    .del()
    .then(res.send)
    .catch(handleErr(res))
})

app.listen(port)

console.log("Listening on port", port)
