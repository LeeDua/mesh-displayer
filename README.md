# mesh-displayer

## 本地展示
- 将展示样例图片文件夹shigondiansucai放置在src/assets/
- 即该文件夹路径为src/assets/shigongdiansucai

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

建议下个webstorm，有不少没删掉的废弃代码、函数、变量，webstorm会直接提示全局从来没用过（灰色）

浏览器中F12进入控制台，用于选择元素查看css和查看控制台输出并调试，建议使用chrome安装vue插件可以跟踪vuex状态机

- 下面就不说明css的实现方式了，和功能其实没什么关系，要改的话可以选择元素看一下css怎么写的吧

---

### axios

项目中使用的网络请求包

---

### router

单页面应用，未使用vue router

---

### store

- state.js

  - 全局变量声明

- mutation.js

  - state.js中的变量只通过mutation方法改变
- 详细调用逻辑了解vuex
  - updateFiles
  - 图片缓存更新
  - clearFile

    - 图片上传调用结束后清空缓存
- setCurrentDisplayedTask
  
  - 设置当前展示的任务
  - setEditState

    - 当前是否在编辑任务
- setRootSelected
    - 当前是否选中了根节点（因为根节点没有名字，没有和task一样类似的html标签）
- currentDisplayed是当前canvas上的图片，currentDisplayedTask是当前选中的任务

---

## components

### carousel.vue

- canvas和三个类别的标签
- handleResize
  - topHeight为顶栏高度，在求canvas height中手动减去。top-level在App.vue中，是上级标签
- canvas_height和canvas_width是computed变量，每次调用时重新求值，在template中动态绑定使用
- doDraw
  - 获取canvas
  - 在图片加载的回调函数中绘制
    - if逻辑用于调整图片的比例（根据画布大小的约束使图片尽可能填满）
    - 注释部分为画框
    - 我之后在别的地方还写过一个功能更完善一点的canvas支持蒙层放大、缩放、移动图片，有需要的话可以问我要



### taskPanel.vue

- 功能直接看template应该就看得懂吧
- onUpload
  - 选择图片上传
  - 使用axios创建表单，填入task id 和 对应的图片数据
- setupAlert
  - alert悬浮提示与this.warning this.alertFlag动态绑定



### rightBar.vue

- 展示当前选中任务的图片列表



### taskTree.vue

- 未使用，一个可以展开收缩的树结构



### topBar.vue

- 未使用，废弃代码

----

### 流程图和框图

- 很标准的vue项目结构，state声明全局数据结构，mutation声明state变量的修改函数，在各组件中引入vuex访问state并commit mutation修改
- App.vue顶层，一共就写了三个组件，功能感觉也挺容易看图说话的
- 网络请求方面就是简单的和后端收发数据，包括任务列表相关的操作。有了数据以后就是选择任务、选择图片，然后对应地更新state中的变量，最后canvas和图片列表对应地更新
- 数据流方面，其实taskPanel的一些功能是不需要使用state的（比如进入编辑模式），不过当时改来改去就索性全局了，也不影响理解
- 图就不画了吧