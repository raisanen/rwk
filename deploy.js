const FtpDeploy = require('ftp-deploy');
const ftp = new FtpDeploy();

const config = {
	host: 'ftp.fivebyfive.se',
	username: 'fivebyfive.se',
	port: 21,
	localRoot: __dirname + '/dist',
	remoteRoot: '/rwk'
};
const progressHandler = (data) => {
	process.stdout.write("\r" + '[deploy] Uploading: ' +  data.percentComplete + '%');
};

console.log('[deploy] Uploading to ', config.host);

ftp.deploy(config, (err) => {
	(err) ? console.error(err) : console.log('\r[deploy] Finished uploading to', config.host);
});

ftp.on('uploading', progressHandler);
ftp.on('uploaded', progressHandler);
