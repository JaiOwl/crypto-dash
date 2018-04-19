const shelljs = require('shelljs');

shelljs.cp('-rf', 'Server/dist/*', 'dist/');
shelljs.cp('-rf', 'Server/dist/.*', 'dist/');
shelljs.cp('.env.config', 'dist/.env');

// Install Production
shelljs.cd('dist');
shelljs.exec('npm install --production');
shelljs.cd('../');

// Copy Client to Hosted directory
shelljs.cp('-rf', 'Client/dist', 'dist/public');
shelljs.cp('-rf', 'Server/views', 'dist/views');
