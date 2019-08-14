const  express = require('express')
const  app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.set("view engine" , "ejs")
app.use(bodyParser.urlencoded({extended : true}))

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password: '',
	database: 'join_us'
})

app.get("/", (req , res) => {
	
	// find count.users in DB
	var q = 'SELECT COUNT(*) AS count FROM users';
	connection.query(q , (err , results) => {
		if (err) throw err; 
		var count = results[0].count
		// res.send('WE have ' + count + ' users in our db')
		res.render('home' , {data: count});
	})
	
	// Respond with that count
	
	
	
})

app.post('/register' , (req , res ) => {
var person = {
	email : req.body.email
  }

connection.query('INSERT INTO users SET ? ' , person , (err,results) => {
	if(err) throw err;
	console.log(results)
	res.send("Thanks for joinging our waitlist")
 })
})


app.get('/joke' , (req , res) => {
	res.send('Hello this is a bomb ass joke')
})

app.get('/random_number' , (req , res) => {
 var num =  Math.floor(Math.random() * 10 ) + 1
		res.send(`Your lucky number is ${num}`)
})

app.listen(3000 , () => {
	console.log('App listening on port 8080')
})
