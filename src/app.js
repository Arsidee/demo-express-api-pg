var { Client } = require("pg")
var express = require("express")
var configuration = require("./configuration")

var app = express()

app.use(express.static("public"))

app.use(express.json())

let dbConnection // This is initialized when the server starts

app.get('/health', async function(request, response) {
  response.json({ status: 'healthy' });
})

app.get("/users", async function(request, response) {
  var results = await dbConnection.query(`
    SELECT *
    FROM users
  `)

  console.log(results.rows)
  response.json(results.rows)
})

app.get("/users/:id", async function(request, response) {
  var id = request.params.id

  var results = await dbConnection.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [id])

  console.log(results.rows[0])
  response.json(results.rows[0])
})

app.post("/users", async function(request, response) {
  var newUser = {
    firstName: request.body["firstName"],
    lastName: request.body["lastName"],
    age: request.body["age"],
    weight: request.body["weight"],
    smoker: request.body["smoker"]
  }
  console.log(newUser)

  var sql = `
    INSERT INTO users (first_name, last_name, age, weight, smoker)
    VALUES ($1, $2, $3, $4, $5)
  `
  var values = [newUser["firstName"], newUser["lastName"], newUser["age"], newUser["weight"], newUser["smoker"]]

  await dbConnection.query(sql, values)

  response.json(newUser)
})

app.put("/users/:id", async function(request, response) {
  var user = {
    id: request.params.id,
    firstName: request.body["firstName"],
    lastName: request.body["lastName"],
    age: request.body["age"],
    weight: request.body["weight"],
    smoker: request.body["smoker"]
  }
  console.log(user)

  var sql = `
    UPDATE users
    SET first_name = $1,
        last_name = $2,
        age = $3,
        weight = $4,
        smoker = $5
    WHERE id = $6
  `
  var values = [user["firstName"], user["lastName"], user["age"], user["weight"], user["smoker"], user["id"]]

  await dbConnection.query(sql, values)

  response.json(user)
})

app.delete("/users/:id", async function(request, response) {
  var id = request.params.id

  var sql = `
    DELETE FROM users
    WHERE id = $1
  `
  await dbConnection.query(sql, [id])

  var message = { msg: "Deleted user" }
  console.log(message)
  response.json(message)
})

var client = new Client(configuration)
client.connect()
  .then(function() {
    dbConnection = client  // This makes it globally available
    console.log("[Connected to the database]")

    // Start the server after connecting to the database
    app.listen(3000, function() {
      console.log("> Server listening on http://localhost:3000")
    })
  })

module.exports = app
