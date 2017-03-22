// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
/***
Polyfill就是垫片，按发明这个词的人的原话来说，它就是一段这样的代码，让浏览器原生地支持我们期望使用的一些API。

就比如这里的requestAnimationFrame，在看到了上面的浏览器支持情况后，你就知道了比上面列出的浏览器版本老的就不支持该方法，但为了让代码能够有更好的浏览器兼容性在老机器上也能运行不报错，我们可以写一些代码让浏览器在不支持requestAnimationFrame的情况下使用window.setTimeout()，这是一种回退（fallback）到过去的方法。

这样一来，就可以通俗一点的理解polyfill了，它就是备胎。

下面是由Paul Irish及其他贡献者放在GitHub Gist上的代码片段，用于在浏览器不支持requestAnimationFrame情况下的回退，回退到使用setTmeout的情况。当然，如果你确定代码是工作在现代浏览器中，下面的代码是不必的。
***/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());
复制代码