"use strict";
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var kolorist_1 = require("kolorist");
var core_1 = require("../template/core");
var types_1 = require("../template/types");
var style_1 = require("../template/style");
var test_1 = require("../template/test");
var template_1 = require("../template");
var WRITE_FILE_OPTIONS = { encoding: 'utf-8' };
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
    //创建组件核心文件
    var coreFilePath = (0, path_1.resolve)(compSrcDir, name + '.tsx');
    (0, fs_extra_1.writeFileSync)(coreFilePath, (0, core_1["default"])(name), WRITE_FILE_OPTIONS);
    //创建组件类型文件
    var typesFilePath = (0, path_1.resolve)(compSrcDir, name + '-type.ts');
    (0, fs_extra_1.writeFileSync)(typesFilePath, (0, types_1["default"])(name), WRITE_FILE_OPTIONS);
    //创建组件样式文件
    var styleFilePath = (0, path_1.resolve)(styleDir, name + '.scss');
    (0, fs_extra_1.writeFileSync)(styleFilePath, (0, style_1["default"])(name), WRITE_FILE_OPTIONS);
    //创建组件测试文件
    var testFilePath = (0, path_1.resolve)(testDir, name + '.test.ts');
    (0, fs_extra_1.writeFileSync)(testFilePath, (0, test_1["default"])(name), WRITE_FILE_OPTIONS);
    //创建组件索引文件
    var indexFilePath = (0, path_1.resolve)(componentDir, 'index.ts');
    (0, fs_extra_1.writeFileSync)(indexFilePath, (0, template_1["default"])(name), WRITE_FILE_OPTIONS);
    //创建成功通知
    console.log((0, kolorist_1.lightGreen)("\u221A \u7EC4\u4EF6".concat(name, "\u76EE\u5F55\u521B\u5EFA\u6210\u529F")));
    console.log((0, kolorist_1.lightBlue)("\u221A \u7EC4\u4EF6\u76EE\u5F55\uFF1A".concat(componentDir)));
}
exports["default"] = createComponent;
