var ejs = require('ejs');

var template = "<%= title %>";
var context = {
    title: "The Hills are Alive With the Sound of Critters"
};

console.log(ejs.render(template, context));

ejs.renderFile('./views/test.ejs',function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
});



