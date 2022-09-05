//inquirer比较老旧，是commonjs规范的，所以不能用import inquirer from 'inquirer'
import * as inquirer from 'inquirer'
import {red} from 'kolorist'
//创建类型
const CREATE_TYPES = ['component', 'lib-entry']
//组件分类
const DOCS_CATEGORIES = ['通用', '导航', '反馈', '数据录入', '数据显示']

export async function onCreate(args = {type: ''}) {
  //容错，判断用户是否输入type
  let {type} = args
  //如果用户未输入，提示用户重新输入，给用户一个列表去选择
  if (!type) {
    //通过inquirer获取用户的选择
    const result = await inquirer.prompt([
      {
        name: 'type',//获取输入后的属性名
        type: 'list',//交互方式为列表
        message: '（必填）请选择类型：',//提示信息
        choices: CREATE_TYPES, //选项列表
        default: 0 //默认选项
      }
    ])
    type = result.type
  }
  //用户输入了信息，但是输入错误，要求用户重新选择
  if (!CREATE_TYPES.includes(type)) {
    console.log(
      red(`当前类型仅支持：${CREATE_TYPES.join(', ')}，您输入的是"${type}"，请重新选择！`)
    )
    return onCreate()
  }
  //输入正确，开始创建对应的内容
  try {
    switch (type) {
      case 'component':
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件name，将用作文件名和文件夹名称',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件name不能为空'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件中文名称，将用作文档列表中显示',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件名称不能为空'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类，将用作文档列表分类中',
            choices: DOCS_CATEGORIES
          },
        ])
        createComponent(info)
        break;
      default:
        break;
    }
  } catch (error) {

  }
}

function createComponent(info){
  console.log(info)
}
