"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
//创建组件核心文件模板
function genCoreTemplate(name) {
    var compName = 'S' + (0, utils_1.upperFirst)(name);
    //属性类型名和属性名
    var propsTypeName = (0, utils_1.upperFirst)(name) + 'Props';
    var propsName = name + 'Props';
    var propsFileName = name + '-type';
    var className = 's-' + name;
    return "import {defineComponent, toRefs} from \"vue\";\nimport {".concat(propsTypeName, ", ").concat(propsName, "} from \"./").concat(propsFileName, "\";\n\nexport default defineComponent({\n  name: '").concat(compName, "',\n  props: ").concat(propsName, ",\n  setup(props: ").concat(propsTypeName, ") {\n    return () => {\n      return (\n        <div class=\"").concat(className, "\"></div>\n      )\n    }\n  }\n})\n");
}
exports["default"] = genCoreTemplate;
