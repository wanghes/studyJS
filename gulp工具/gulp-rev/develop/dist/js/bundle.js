(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={isArray:function(){console.log("yes")}};
},{}],2:[function(require,module,exports){
module.exports={dWrite:function(){document.write("<h1>这是一个gulp的生成的前段框架页面1</h1>")}};
},{}],3:[function(require,module,exports){
var flander=require("./flander"),add=require("./add");flander.dWrite(),add.isArray();
},{"./add":1,"./flander":2}]},{},[3]);
