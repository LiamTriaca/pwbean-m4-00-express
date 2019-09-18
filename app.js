const express = require('express')
const srv = express()
const bodyParser= require ('body-parser')
const nodemailer= require('nodemailer')


const port= process.env.PORT || 3000

srv.use(bodyParser.urlencoded({extended: false}))
srv.use(bodyParser.json())

srv.listen( port, () => console.log('Ready the chicken '))
srv.get('/', function(req,res){
	//response.end ('Hola desde express')
	res.sendFile(__dirname + '/index.html')
})

srv.get('/noticias', function(req,res){
	const noticias= [
	{titulo: 'Aprendiendo express', autor: 'Liam', detalle :'En proceso...'}, 
	{titulo: 'Olvidando Simple Node.js', autor: 'Liam', detalle :'En proceso...'}
	]

	res.json(noticias)
})

const miniOutlook= nodemailer.createTransport({
	host: process.env.SMTP,
	auth : {
			user:process.env.USER,
			pass:process.env.PASS,
			port:process.env.MPORT
	}

srv.post('/enviar',function(req,res){
/*
	req.on("data", function(form){
			
			let datos = form.toString()	
})
*/
console.log (req.body.correo)
res.json (req.body)

})
	