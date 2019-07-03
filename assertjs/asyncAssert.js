(function(){
    var queue = [], paused = false, results;
    this.asyncTest = function asyncTest(name, fn) {
        queue.push(function(){
            results = document.getElementById('results');
            results = asyncAssert(true, name).appendChild(
                document.createElement('ul')
            );
            fn();
        });
        runTest();
    };
    this.pause = function() {
        paused = true;
    }
    this.resume = function() {
        paused = false;
        setTimeout(runTest, 1);
    }
    function runTest() {
        if (!paused && queue.length) {
            queue.shift()();
            if (!paused) {
                resume();
            }
        }
    }

    this.asyncAssert = function asyncAssert(value, desc) {
        var li=  document.createElement('li');
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));
        results.appendChild(li);
        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        return li;
    }
})();