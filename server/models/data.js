const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
	id: String,
	name: String,
	sem: String,
	subject: String,
	material: String,
	content: String,
	filePath: String
});

module.exports = mongoose.model('data', dataSchema, 'data'); 