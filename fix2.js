const fs = require('fs');
const f = '/home/non0/montse-portfolio/angular.json';
const d = JSON.parse(fs.readFileSync(f));
if (d.projects['montse-portfolio'].architect.build.builder.includes('angular-devkit')) {
  d.projects['montse-portfolio'].architect.build.builder = '@angular/build:application';
  d.projects['montse-portfolio'].architect.serve.builder = '@angular/build:dev-server';
}
fs.writeFileSync(f, JSON.stringify(d, null, 2));
