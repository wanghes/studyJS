var fs = require('fs-extra')

fs.move('./tmp/myfile.txt', './tmp/does/not/exist/yet/somefile', function(err) {
  if (err) return console.error(err)
  console.log("success!")
})