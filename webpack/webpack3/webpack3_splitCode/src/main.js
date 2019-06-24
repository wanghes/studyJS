const val = 2;

if (val==1) {
    let hello = import(/*webpackChunkName:'hello'*/ './lib/hello');
    hello.then(function(result){
        let echo = result.default.echo
        echo();
    });
} else if(val==2) {
    let hello2 = import(/*webpackChunkName:'hello2'*/ './lib/hello2');
    hello2.then(function(result){
        let echo = result.default.echo
        echo();
    });
} else {
    let hello3 = import(/*webpackChunkName:'hello3'*/ './lib/hello3');
    hello3.then(function(result){
        let echo = result.default.echo
        echo();
    });
}
