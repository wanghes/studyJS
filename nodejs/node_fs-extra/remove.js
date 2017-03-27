var fs = require('fs-extra')

fs.remove('./tmp/this/myfile.txt', function(err) {
  if (err) return console.error(err)

  console.log("success!")
})
//同步移除
//fs.removeSync('./tmp/this/myfile.txt')