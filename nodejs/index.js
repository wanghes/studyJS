// index.js
let fs = require('fs'),
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
    console.log(path); // a.json
}

load('./a');