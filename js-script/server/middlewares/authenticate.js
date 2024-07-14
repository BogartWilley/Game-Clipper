const fs = require('fs');
const authenticate = (req, res, next) => {
	// Header Verification
	// TODO : check if this game is supported
	if (!req.headers['game']) {
		console.log('Invalid game header on the request.');
		res.status(404).send({ message: 'Invalid game parameter.' }); // TODO: Send a more generic error message
		return;
	}
	console.log(process.env.SELECTED_GAME);
	if (process.env.SELECTED_GAME !== req.headers['game'])
		process.env.SELECTED_GAME = req.headers['game'];
	fs.writeFileSync(
		'.env',
		`SELECTED_GAME=${process.env.SELECTED_GAME}`,
		'utf8'
	);
	next();
	/* 
	// Token Verification
	const token = req.headers['authorization'];
	if (token === `Bearer ${AUTH_TOKEN}`) {
		next();
	} else {
		res.status(403).json({ error: 'Invalid Request' });
	}  */
};

module.exports = authenticate;
