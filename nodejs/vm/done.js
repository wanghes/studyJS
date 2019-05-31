let fs = require('fs'),
    pathSystem = require('path'),
    vm = require('vm');

// 模块加载器的实现
function Module(path) {
    this.path = path;
    this.exports = {};
}
Module.prototype.read = function (path) {
    let ext = pathSystem.extname(path);
    // 调用支持后缀的对应的读取方法
    Module._support[ext](this);
};

// 支持类型
Module._support = {
    ".js": function (module) {
        let fnTxt = '(function(module){' + fs.readFileSync(module.path, "utf-8") + '})';
        // 函数里 module.exports 会改变module
        vm.runInThisContext(fnTxt).call(module.exports, module);
    },
    ".json": function (module) {
        return JSON.parse(fs.readFileSync(module.path, "utf-8"));
    }
};

// 解析路径
Module._resolvePath = function (path) {
    path = pathSystem.resolve(path);

    if (pathSystem.extname(path)) {
        // 有后缀
        return path;
    } else {
        // 无后缀
        let arrKey = Object.keys(Module._support);
        let iNum = 0;
        for (let i = 0, len = arrKey.length; i < len; i++) {
            let fullPath = path + arrKey[i];
            try {
                // 是否存在路径，存在不报错，反之报错
                fs.accessSync(fullPath);

                return fullPath;
            } catch (e) {
                if (++iNum === arrKey.length) {
                    // 说明每次都没找到则打印出错误
                    console.log(e);
                }
            }
        }
    }
};

// 缓存module.exports
Module._cache = {};

function load(path) {
    // 解析路径：绝对路径和后缀名问题
    path = Module._resolvePath(path);

    // 有则返回，无则继续
    if (Module._cache[path]) {
        return Module._cache[path];
    }

    // 读取文件并返回读取内容
    let module = new Module(path);

    module.read(path);

    // 存
    Module._cache[path] = module.exports;

    return module.exports;
}


load('./a')();