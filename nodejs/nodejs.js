var buf = new Buffer(256);
var len = buf.write('\u00bd + \u00bc = \u00be', 0);
console.log(len + ' bytes: ' + buf.toString('utf8', 0, len));
console.log('Version: ' + process.version);
process.exit(1);
//console.log('Current gid: ' + process.getgid());
console.log(__filename);
console.log(__dirname);

process.on('exit', function() {
    process.nextTick(function() {
        console.log('This will not run');
    });
    console.log('About to exit.');
});

var stdin = process.openStdin();
stdin.setEncoding('utf8');
stdin.on('data', function (chunk) {
process.stdout.write('data: ' + chunk);
});
stdin.on('end', function () {
process.stdout.write('end');
});

console.log(process.argv);
console.log(process.execPath);
console.log(process.cwd());

/*process.on('uncaughtException', function (err) {
console.log('Caught exception: ' + err);
});
setTimeout(function () {
console.log('This will still run.');
}, 500);

nonexistentFunc();
console.log('This will not run.');

console.log(11);*/



