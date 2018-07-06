# VR-AR实验室前端

> A Vue.js project

# 项目介绍

项目基于vue-cli 3.0，vue-cli 3.0 相较前两个版本，省去了webpack的配置文件，实际上是内置于cli-service中，专门引入了处理svg的file-loader，但是我们项目中使用的是svg-sprite-loader，对于额外引入的loader，需要新建ve.config.js进行配置，此外，对element-ui 的组件也是按需引入。为了规范项目，避免一些不必要的错误，我们使用Typescript代替js，并使用tslint规范代码。

# 构建步骤
```bash
npm install -g @vue/cli
vue create project-name

```


参考文章：
1. [typescript 基础](https://github.com/xcatliu/typescript-tutorial/tree/master/basics)
2. [element-ui 组件按需引入](http://element-cn.eleme.io/#/zh-CN/component/quickstart)
3. [vue-cli 3.0配置信息](https://cli.vuejs.org/config/#babel)


# 编码规范

1. 详细的规范在eslint.js中已经体现，具体到每个属性代表什么，可以在eslint官网进行查询
2. 文件命名使用全部小写字母，且使用"中划线命名法"，例如:this-is-an-apple.js
3. 新增页面需要配置路由信息，请在"src->router->router.js"中进行配置
4. 组件的事件处理方法名称定义规范: handle事件名称, 例如: handleClick
5. 项目所使用的常量一律用大写字母命令

# 目录结构

## src

1. components 可以共享的组件放在这里
2. utils 可以共享的函数.js文件放在这里
3. pages 真正的页面放在这里
4. api 登录等请求的接口函数放在这里
5. assets 存放不能使用icon的静态资源
6. icons/svg 存放所有用到的icon，UI需要提供svg格式，使用时当做字体来处理
7. styles/element.scss 存放覆盖element-ui原有样式的文件
8. styles/index.scss 存放样式变量还有一些公共样式

## 缓存规则
1. 登录token、详情ID，详情entry均存储于cookie中，在浏览器关闭时失效
2. 用户信息使用公共状态管理
3. 频繁操作的数据缓存时间为半小时，不频繁操作缓存时间设置为1小时，使用localStorage（所有缓存数据名称在常量文件中）
