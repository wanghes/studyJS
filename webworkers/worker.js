var i = 0;
function timedCount(){
    for(var j = 0, sum = 0; j < 100; j++){
        for(var i = 0; i < 1000000; i++){
            sum+=i;
        };
    };
    //将得到的sum发送回主线程
    postMessage({num:sum});
};
console.log(new XMLHttpRequest())
onmessage = function(event){
    //向主线程发送event.data.name信息
    postMessage(event.data.name);
};
//将执行timedCount前的时间，通过postMessage发送回主线程
postMessage('Before computing, '+new Date());
timedCount();
//结束timedCount后，将结束时间发送回主线程
postMessage('After computing, ' +new Date());