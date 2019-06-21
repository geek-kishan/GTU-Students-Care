const express = require ('express');
const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');
const User = require ('../models/user');
const router = express.Router();
const Data = require ('../models/data');
const multer = require ('multer');

const db= "mongodb+srv://userkishan:passwordkishan@cluster0-iwlia.mongodb.net/GTU?retryWrites=true";

const MIME_TYPE_MAP = {
	'application/pdf' : 'pdf'
};


const storage = multer.diskStorage({ 
	destination: (req, file, cb) => {
		 cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const name = file.originalname.split(' ').join('_');
		const ext = MIME_TYPE_MAP[file.mimetype];
		cb(null, name+"_"+ Date.now() +"." + ext);
	}
});

mongoose.connect(db, { useNewUrlParser: true }, err => {
	if(err) {
		console.log("Error occured: " + err);
	} else {
		console.log("Connected with database");
	} 
});

router.get('/', function(req, res) {
	res.send('Api works');
});

router.post('/login', (req,res) => {
	let userData = req.body;

	User.findOne({email: userData.email}, (err, user) => {
		if(err) {
			console.log(err);
		}else if (!user) {
				res.status(401).send('Invalid email');
			} else if( user.password !== userData.password) {
				res.status(401).send('Invalid password');
			} else {
				let payload = {subject: user._id}
				let token = jwt.sign(payload, 'abcd');
				res.status(200).send({user,token});
				console.log({user,token});
			}
	}); 
});

router.post('/signup', (req, res) => {
	let userData = req.body;
	let user = new User(userData);

	User.findOne({email: userData.email}, (err, user) => {
		if(err) {
			console.log(err);
		}else if(!user){
							user.save((err, registeredUser) => {
											if(err) {
											console.log(err);
											}else{
											let payload =  { subject : registeredUser._id }
											let token = jwt.sign(payload, 'abcd');
											res.status(200).send({registeredUser,token});
											console.log({token,registeredUser});
											}
										});
		}else{
			res.status(401).send('Email already exists');
		}
	});
});

router.post('/upload', multer({storage: storage}).single("pdf"), (req, res, next) => {
	const url = req.protocol +"://"+req.get("host");
	const data = new Data({
		id: req.body.id,
		name: req.body.name,
		sem: req.body.sem,
		subject: req.body.subject,
		material: req.body.material,
		content: req.body.content,
		filePath: url + "/uploads/" + req.file.filename
	});
	data.save((err, uploadedData) => {
		if(err) {
			console.log(err);
		}else{
			res.status(200).send(uploadedData);
		}
	});
	//console.log(data);
});

router.post('/search', (req, res) => {
	let seme = req.body.semester;
	let sub = req.body.subject;
	let mat = req.body.material;
	console.log(req.body);
	Data.find({ "sem" : seme, "subject" : sub, "material": mat},(err, searchResults) => {
			if(err) {
				console.log(err);
			}else {
				console.log(searchResults)
				res.status(200).send(searchResults);
			}
	});
});

router.post('/myfiles', (req, res) => {
	console.log(req.body);
	let uId = req.body.id;
	Data.find({"id": uId}, (err, myfiles) => {
		if(err) {
			console.log(err);
		}else{
			console.log(myfiles);
			res.status(200).send(myfiles)
		}
	});
});

module.exports = router;	