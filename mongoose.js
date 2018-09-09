var mongoose = require('mongoose');

var error = (err)=>{
		if(err)
			throw err;
		console.log("connected");
		}

var options = { useNewUrlParser: true } ;

mongoose.connect('mongodb://localhost/try',options,error);
		
module.exports = mongoose;
