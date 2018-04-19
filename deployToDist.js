const shelljs = require('shelljs');

shelljs.cp('-rf', 'Server/dist/*', 'dist/');
shelljs.cp('-rf', 'Server/dist/.*', 'dist/');
shelljs.cp('.env.config', 'dist/.env');

// Install Production
shelljs.cd('dist');
shelljs.exec('npm install --production');
shelljs.cd('../');
