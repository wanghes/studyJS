var fs = require('fs-extra');
/****
创建文件、目录
ensureFile(file, callback)
createFile(file, callback)
createFileSync(file),
ensureFileSync(file)
ensureDir(dir, callback)
ensureDirSync(dir)
***/
var file = './tmp/myfile.txt'
var test=fs.ensureFile(file, function(err) {
    if(err){
        console.log(err) // => 如果存在的换 返回null;
        return;
    }

  //file has now been created, including the directory it is to be placed in
   fs.readFile(file,"utf-8",function(err,txt){
    if(err) console.log(err);
     console.log(txt);
   });
});

var dir = './tmp/mydir'
fs.ensureDir(dir, function(err) {
 // console.log(err) // => null
  //dir has now been created, including the directory it is to be placed in
});