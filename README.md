# y

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# carnman

- vscode config

```json
{
  "terminal.external.windowsExec": "D:\\software\\Git\\bin\\bash.exe",
  "terminal.integrated.shell.windows": "D:\\software\\Git\\bin\\bash.exe",
  "window.menuBarVisibility": "toggle",
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  //  #让prettier使用eslint的代码格式进行校验
  "prettier.eslintIntegration": true,
  //  #去掉代码结尾的分号
  "prettier.semi": false,
  //  #使用带引号替代双引号
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true
}
```

## 角色

| 角色           | 描述   | 备注 |
| -------------- | ------ | ---- |
| ROLE_ANONYMOUS | 匿名   |      |
| ROLE_ADMIN     | 管理员 |      |
| ROLE_USER      | 用户   |      |

## 约定

| 状态码（status） | 标识 | 消息（msg）  | 备注 |
| ---------------- | ---- | ------------ | ---- |
| 2000             | 成功 | 接口调用成功 | 暂无 |
| 5000             | 失败 | 程序执行失败 | 暂无 |

## 感谢

https://juejin.im/post/591aa14f570c35006961acac
