const $ = require('webpack-zepto');
const val = 2;

const hello = (cb) => { 
    import(/* webpackChunkName: "hello" */ './lib/hello').then((item) => {
        cb(item.default);
    });
};
const hello2 = (cb) => { 
    import(/* webpackChunkName: "hello2" */ './lib/hello2').then((item) => {
        cb(item.default);
    });
};
const hello3 = (cb) => { 
    import(/* webpackChunkName: "hello3" */ './lib/hello3').then((item) => {
        cb(item.default);
    });
};

if (val==1) {
    hello(function(result){
        let echo = result.echo
        echo();
    });
} else if(val==2) {
    hello2(function(result){
        let echo = result.echo
        echo();
    });
} else if(val==3) {
    hello3(function(result){
        let echo = result.echo
        echo();
    });
} else {
    //console.log(require.ensure);
}

console.log($('#test').html());
