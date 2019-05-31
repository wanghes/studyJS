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


;(function() {
    // 存放读取到文件的内容
    let module = {
        exports: null
    };
    function load(path) {
        path = resolvePath(path);

        // 如果有了，就直接返回
        if (module[path]) return module[path];

        if (pathSystem.extname(path) === '.js') {
            let fnTxt = '(function(module){' + fs.readFileSync(path, "utf-8") + '})';
            vm.runInThisContext(fnTxt)(module);
        }

        // 存起来
        module[path] = module.exports;

        return module.exports;
    }
    
    load('./b')(); // I am b.js~
    load('./b')(); // 不会重新加载，取的是存起来的那个函数
})();