var fs = require('fs-extra')
var file = './tmp/this/myfile.txt'

fs.outputFile(file, 'hello!', function(err) {
  console.log(err) // => null

  fs.readFile(file, 'utf8', function(err, data) {
    console.log(data) // => hello!
  })
})