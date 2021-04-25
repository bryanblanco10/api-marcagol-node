'use strict'
//Ejecutar dotenv
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//setting
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
	//datos de un formulario
app.use(express.urlencoded({extended: false}))
	//datos type json
app.use(express.json())

//CORS
app.use(cors())

//Routes
app.use('/api', require('./routes/index.js'))

//dir static
app.use('/static',express.static(__dirname + '/public'));

//Starting the serve
app.listen(app.get('port'), () =>{
	console.log(`Server on port ${app.get('port')}`)
})