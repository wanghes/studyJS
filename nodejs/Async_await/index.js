function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms, 'ok');
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms).then(function(result){console.log(result)});
    console.log(value);
}

asyncPrint('hello world', 1000);
