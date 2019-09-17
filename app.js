const express = require('express')
const server = express()

const port= process.env.PORT || 3000

server.listen( port, () => console.log('Ready the chicken '))
server.get('/', function(request,response){
	response.end ('Hola desde express')
})
				