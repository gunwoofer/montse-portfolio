const fs = require('fs');
const f = '/home/non0/montse-portfolio/angular.json';
const d = JSON.parse(fs.readFileSync(f));
d.projects['montse-portfolio'].architect.build.options.tsConfig = 'tsconfig.app.json';
fs.writeFileSync(f, JSON.stringify(d, null, 2));
