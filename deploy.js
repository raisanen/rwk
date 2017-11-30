const FtpDeploy = require('ftp-deploy');
const ftp = new FtpDeploy();

const config = {
	host: 'ftp.fivebyfive.se',
	username: 'fivebyfive.se',
	port: 21,
	localRoot: __dirname + '/dist',
	remoteRoot: '/rwk'
};
const progressHandler = (data) => process.stdout.write("\r" + '[deploy] Uploading: ' +  data.percentComplete + '%');

console.log('[deploy] Deploying...');

ftp.deploy(config, (err) => {
	(err) ? console.error(err) : console.log('\n[deploy] Finished.');
});

ftp.on('uploading', progressHandler);
ftp.on('uploaded', progressHandler);
