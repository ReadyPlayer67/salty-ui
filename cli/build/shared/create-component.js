"use strict";
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var kolorist_1 = require("kolorist");
var core_1 = require("../template/core");
function createComponent(meta) {
    var name = meta.name;
    //拼接组件目录
    var componentDir = (0, path_1.resolve)('../src', name);
    //拼接核心文件目录：组件源文件，类型，样式，测试
    var compSrcDir = (0, path_1.resolve)(componentDir, 'src');
    var styleDir = (0, path_1.resolve)(componentDir, 'style');
    var testDir = (0, path_1.resolve)(componentDir, 'test');
    (0, fs_extra_1.ensureDirSync)(compSrcDir);
    (0, fs_extra_1.ensureDirSync)(styleDir);
    (0, fs_extra_1.ensureDirSync)(testDir);
    //创建文件和内容
    var coreFilePath = (0, path_1.resolve)(compSrcDir, name) + '.tsx';
    (0, fs_extra_1.writeFileSync)(coreFilePath, (0, core_1["default"])(name));
    //创建成功通知
    console.log((0, kolorist_1.lightGreen)("\u221A \u7EC4\u4EF6".concat(name, "\u76EE\u5F55\u521B\u5EFA\u6210\u529F")));
    console.log((0, kolorist_1.lightBlue)("\u221A \u7EC4\u4EF6\u76EE\u5F55\uFF1A".concat(componentDir)));
}
exports["default"] = createComponent;
