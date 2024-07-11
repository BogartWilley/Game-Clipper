function handleErrors(err) {
	if (err.code === 207) {
		// 207 : OBS is not ready to perform the request.
		console.log('Retrying...');
		setTimeout(() => {
			createNewScene();
		}, 500);
	}
}
module.exports = handleErrors;
