const fs = require('fs');
const f = '/home/non0/montse-portfolio/angular.json';
const d = JSON.parse(fs.readFileSync(f));
d.projects['montse-portfolio'].architect.build.options.assets.push({'glob':'**/*','input':'src/assets'});
fs.writeFileSync(f, JSON.stringify(d, null, 2));
