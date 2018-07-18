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
4. [重新创建Twitter点赞动效](http://www.open-open.com/lib/view/open1467428268935.html)
5. [es6对象字面量增强](https://www.cnblogs.com/monsterooo/p/6523435.html)
6. [优质参考项目](https://github.com/havvg/vuejs-typescript-todo-mvc)
