const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const _ = require('underscore')
const webpush = require('../webpush')

const router = Router()

// let pushSubscription;
const championships = require('../championships.json')
const clasics = require('../clasics.json')

router.get('/championships', (req, res) =>{
	res.json(championships)
})

router.post('/clasics/:slug', (req, res) =>{
	const { slug } = req.params
	_.find(clasics, (clasic) =>{
		if(clasic.slug == slug){
			res.json(clasic)
		}
	})
})

router.get('/get-image-liga/:image', (req, res) =>{
	const { image } = req.params
	const dir = path.join(__dirname, `../assets/img/${image}`)

	fs.stat(dir, (err) =>{
		if(!err){
			return res.sendFile(path.resolve(dir))
		}

		return res.status(404)
	})
})

router.get('/get-image-team/:logo', (req, res) =>{
	const { logo } = req.params
	const dir = path.join(__dirname, `../assets/img/teams/${logo}`)

	fs.stat(dir, (err) =>{
		if(!err){
			return res.sendFile(path.resolve(dir))
		}

		return res.status(404)
	})
})

router.post('/subscription', async (req, res) =>{
	// pushSubscription = req.body;
	// // console.log(req.body)
	res.status(200).json({success: 'Subscribed'});
})

// router.post('/unsubscription', async (req, res) =>{
// 	pushSubscription = req.body;
// 	res.status(200).json();
// 	console.log('unsubcribed')
// })

router.post('/new-gol', async (req, res) =>{
	const { message,pushSubscription } = req.body
	let payload = JSON.stringify({
		title: 'Brya10 notification',
		message: message
	})
	
	console.log('subscription',pushSubscription)
	console.log('payload',payload)
	try{
		await webpush.sendNotification(pushSubscription, payload)
	}
	catch(err){
		console.log(err)
	}
})

module.exports = router