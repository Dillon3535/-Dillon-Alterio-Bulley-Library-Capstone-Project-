const bcrypt = require('bcrypt');
const rounds = 10;

exports.hash = (pass, callback) =>
{
	bcrypt.hash(pass, rounds, (error, hash) =>
	{
		if (error)
		{
			console.log(error);
		}

		callback(hash);
	});
}

exports.authenticate = (pass, hash, callback) =>
{
	bcrypt.compare(pass, hash, (error, result) => 
	{
		if (error)
		{
			console.log("\nAuthentication error\n");
			console.log(error);
		}

		callback(result);
	});
}
