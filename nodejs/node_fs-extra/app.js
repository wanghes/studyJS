var fs = require('fs-extra');

fs.copy('./tmp/myfile.txt', './tmp/mynewfile.txt', function(err) {
  if (err) return console.error(err)
  console.log("success!")
});

fs.copy('./tmp/mydir', './tmp/mynewdir', function(err) {
  if (err) return console.error(err)
  console.log("success!")
});