const $ = require('webpack-zepto');
const val = 2;

const hello = async () => { 
    let moduleItem = await import(/* webpackChunkName: "hello" */ './lib/hello'); 
    return moduleItem.default;
};
const hello2 = async () => { 
    let moduleItem = await import(/* webpackChunkName: "hello2" */ './lib/hello2');
    return moduleItem.default;
};
const hello3 = async () => { 
    let mouleItem = await import(/* webpackChunkName: "hello3" */ './lib/hello3');
    return mouleItem.default;
};

if (val==1) {
    hello().then(function(result){
        let echo = result.echo
        echo();
    });
} else if(val==2) {
    hello2().then(function(result){
        let echo = result.echo
        echo();
    });
} else if(val==3) {
    hello3().then(function(result){
        let echo = result.echo
        echo();
    });
} else {
    //console.log(require.ensure);
}

