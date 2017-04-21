function joinFunc1() {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 500, 'joinFunc1');
    });
}
function joinFunc2() {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 1000, 'joinFunc2');
    });
}
Promise.join(joinFunc1(), joinFunc2(), function(result1, result2) {
    console.log(result1);
    console.log(result2);
})
