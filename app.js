const express = require('express')
const srv = express()
const bodyParser= require ('body-parser')
const nodemailer= require('nodemailer')
const handleBars= require ('nodemailer-express-handlebars')


const port= process.env.PORT || 2000
//--MAIL--//

const miniThunderBird=nodemailer.createTransport({
	host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ida.smith@ethereal.email',
        pass: 'JFZMp4qWgcBD7mfYd5'
    }
})

const render = {
	extName: ".hbs",//EXTENSIÓN QUE TENDRA
	viewPath: "template/",//EN QUE CARPETA ESTA
	viewEngine: {
		partialsDir:"template/",//CARPETA
		layoutsDir:"template/",//CARPETA
		defaultLayout: false,//LA PLANTILLA QUE ELEGIREMOS(EJ VALIDACION MAIL, POR AHORA IRÁ FALSE)
		extName:".hbr" //EXTENSION QUE USAMOS
	}
}

miniThunderBird.verify( (error,success)=>{
	let mensaje = error ? "No funciona" : "Ready the chicken 2.0" 
	console.log(mensaje)
})

miniThunderBird.use("compile",handleBars(render))



//-- FIN MAIL--//

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

srv.post('/enviar',function(req,res){
/*
	req.on("data", function(form){
			
			let datos = form.toString()	
})
*/
console.log (req.body.correo)
let datos= req.body

/*let cuerpo =  `<h1> Contacto Desde Eant Mailer </h1>`
				+ `<p>Datos del consultante</p>`
				+ `<p>Nombre: ${datos.nombre} </p>`
				+ `<p>E-Mail: ${datos.correo} </p>`
				+ `<p>Asunto: ${datos.asunto} </p>`
				+ `<p>Mensaje: <blockquote> ${datos.mensaje} </blockquote> </p>`*/


miniThunderBird.sendMail({
	 from: datos.correo,//Quien Envia
	 to:"triacaliam@gmail.com", //Quien recibe
	 replyTo:datos.correo, //A quien enviamos
	 subject:datos.asunto,// Asunto
	// html: cuerpo //Mensaje que enviaremos
	template:"plantisha",//NOMBRE ARCHIVO QUE USARA TEMPLATE
	context: {
		nombre: datos.nombre,
		correo: datos.correo,
		asunto: datos.asunto,
		mensaje: datos.mensaje
	}

},function(error,ok){
	if(!error){
		
		miniThunderBird.sendMail({
				from: "no-reply@supersitio.com",//Quien Envia
				 to: datos.correo, //Quien recibe
			 	subject:"Gracias por su mensaje",// Asunto
			 	html: "<h1>Su Mensaje será contestado a la brevedad </h1>"//Mensaje que enviaremos
		})
	}
})
res.json (req.body)

})
	