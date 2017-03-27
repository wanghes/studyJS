var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log("master start...");
     console.log('cpu count:' + numCPUs);

    //  function my_fork() {
    //     var worker = cluster.fork();
    //     worker.send('hi worker');  // send msg to worker
    //     worker.on('message', (msg)=>{ // receive msg from worker
    //         console.log('[master] get msg from worker: '  + msg);
    //     });
    // }

    var worker = cluster.fork();
    var str = 0;
    for(var i =0; i<10000000; i++){
        str += i;
    }
    worker.send(str);
    worker.on('message', (msg)=>{ // receive msg from worker
        console.log('[master] get msg from worker: '  + msg);
    });

    var worker2 = cluster.fork();
    worker2.send("waaco")
    worker2.on('message', (msg)=>{ // receive msg from worker
        console.log('[master] get msg from worker: '  + msg);
    });
    // for (var i = 0; i<numCPUs; i++) {
    //    my_fork()
    // }

    cluster.on('listening',function(worker,address){
        //console.log(address);
        //console.log('listening worker ' + worker.process.pid +', Address '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

    cluster.on('disconnect', function (worker) {
        console.log('[master] ' + 'disconnect: worker' + worker.id);
    });
} else {
    process.on('message', (msg)=>{ // receive msg from master
        console.log('[worker' + cluster.worker.id + '] get msg from master:' + msg);
        process.send('master send message')
    });
    http.createServer(function(req, res) {
        //res.writeHead(200);
        console.log('worker'+cluster.worker.id);
        res.end('worker'+cluster.worker.id+',PID:'+process.pid);
        console.log('Worker #' + cluster.worker.id + ' make a response');
    }).listen(4300);
}