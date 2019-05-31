// index.js
let fs = require('fs'),
    vm = require("vm"),
    pathSystem = require('path');

function resolvePath(path) {
    // 转为绝对路径
    path = pathSystem.resolve(path);

    if (pathSystem.extname(path)) {
        // 有后缀直接返回
        return path;
    } else {
        // 无后缀分别添加.js和.json后缀，看是否存在此文件
        let arrKey = ['.js', '.json'];
        let iNum = 0;
        for (let i = 0, len = arrKey.length; i < len; i++) {
            let fullPath = path + arrKey[i];
            try {
                // 是否存在路径，存在不报错，反之报错
                fs.accessSync(fullPath);

                return fullPath;
            } catch (e) {
                if (++iNum === arrKey.length) {
                    // 说明每次都没找到，那么是时候打印出错误了
                    console.log(e);
                }
            }
        }
    }
};

function load(path) {
    // 解析路径：绝对路径和后缀名问题
    path = resolvePath(path);
    
    let module = {
        exports: null
    };

    if (pathSystem.extname(path) === '.js') {
        // 把读取到的函数包在匿名函数里，这样外部就访问不到函数里的变量 #1
        let fnTxt = '(function(module){' + fs.readFileSync(path, "utf-8") + '})';
        // 传进去 module，会被函数b.js里的 module.exports 改变
        // 通过 runInThisContext 而不是eval，这样函数里就访问不到外面定义的变量 #2
        // #1 和 #2 对比理解下就明白啦
        vm.runInThisContext(fnTxt)(module);
    }

    return module.exports;
}

let fn = load('./b');
fn(); // hello world

// 重复加载问题
load('./b'); // I am b.js ~  
load('./b'); // I am b.js ~
