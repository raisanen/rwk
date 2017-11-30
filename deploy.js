const FtpDeploy = require('ftp-deploy');
const ftp = new FtpDeploy();

const config = {
	host: 'ftp.fivebyfive.se',
	username: 'fivebyfive.se',
	port: 21,
	localRoot: __dirname + '/dist',
	remoteRoot: '/rwk'
};
const progressHandler = (data) => console.log('[deploy] Uploading: ', data.percentComplete, '%');

ftp.deploy(config, (err) => {
	(err) ? console.error(err) : console.log('[deploy] Finished.');
});

ftp.on('uploading', progressHandler);
ftp.on('uploaded', progressHandler);
