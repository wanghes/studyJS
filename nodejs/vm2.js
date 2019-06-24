let vm = require("vm");
let name = "weixian";
vm.runInThisContext(`(function(){ console.log(name)})`)();