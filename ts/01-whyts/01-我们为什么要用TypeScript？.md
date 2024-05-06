[TOC]

# 01-我们为什么要用TypeScript？

# 环境搭建

## 工具vscode

插件：1、Chinese 简体中文；2、reload 重新加载vscode

## 环境

使用`fnm`管理`node`

# 案例

## MyTest.js

```javascript
//简单的学籍管理系统
function getInputSomething() {
    return '1341534';
}

function loadFromDatabase(id) {
    //load from datebase
    return {
        id,
        name: '张三',
        age: 25
    }
}

let id = getInputSomething();
id = parseInt(id);

let {name, age} = loadFromDatabase(id);
console.log(name, age);
```

运行js案例`node MyTest.js`

输出：`张三 25`



如果放到**TypeScript**中去会提醒我们一些**bug**。

下面把环境从`node.js`切换到TypeScript

## 如何把js切换ts环境

1. npm init -y

> 如果初始化器被省略（通过调用 `npm init`），init 将回退到旧的 init 行为。它会问你一堆问题，然后为你写一个 package.json。它将尝试根据现有字段、依赖项和选择的选项进行合理的猜测。它是严格附加的，因此它将保留已设置的所有字段和值。您也可以使用 `-y`/`--yes` 完全跳过问卷。如果您通过 `--scope`，它将创建一个范围包。

生成文件 `package.json`

然后这个目录被当成了Node.js的一个包 npm的一个包

下面是用TS的命令初始化一下当前目录

`tsc --init --target es2020 --module es2020 --lib es2020`

输出：

```
Created a new tsconfig.json with:                                                  TS 
  target: es2020
  module: es2020
  lib: es2020
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig
```

生成文件 [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

然后`tsconfig.json`文件还是有点问题的，缺少这个项目中使用的TS代码文件有哪些。

下面在文件中添加参数

```
 "include": ["**/*.ts"]
```

当前工作目录下的所有`.ts`文件，直接重命名`MyTest.js`为`MyTest.ts`



这时我们发现`tsconfig.json`还是有错误提示，我们通过开始安装的插件`reload`重新加载。发现tsconfig.json文件错误提示没有了。

下面我们发现`MyTest.ts`中出现了几个错误。

- 第一个错误 `console.log(name, age);` console下面有错误提醒。

  > [npm install](https://nodejs.cn/npm/cli/v6/commands/npm-install/)

​	这个是我们对这个项目初始化成`Node.js`项目，然后我们需要让TS支持`Node.js`，需要在当前目录下安装一个包`npm install -D @types/node`
​	

​	命令用于安装 Node.js 的类型定义文件，这样你就可以在 TypeScript 项目中使用 Node.js 的类型和函数了。 `-D` 标志将该依赖项添加到开发依赖项中，这意味着它仅在开发过程中需要，而不是在生产环境中。



​	@types/node 是一个 TypeScript 类型定义文件的包，主要用于提供 Node.js API 的类型定义。

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，可以在服务器端运行 JavaScript。Node.js 提供了一系列的 API，例如文件读写、网络通信、进程管理等等，这些 API 是基于底层的系统调用封装而来的。

​	@types/node 的作用就是提供这些 Node.js API 的类型定义，使得在 TypeScript 项目中使用 Node.js API 时，可以获得更好的代码提示、类型检查和代码补全等功能。这有助于提高代码的可读性、可维护性和安全性。

​	需要注意的是，@types/node 仅提供 Node.js API 的类型定义，并不包含 Node.js 自身的实现。因此，在使用 @types/node 时，需要先安装 Node.js，然后在 TypeScript 项目中引入 @types/node 包即可。

- 第二个错误 `function loadFromDatabase(id)` id被隐式推断出类型是**any**

​	通过下面parseInt我们知道id类型是number类型，因此修改为

​	`function loadFromDatabase(id: number) `



- 第三个错误 `id = parseInt(id);` 不能把一个number类型赋值给string



修改后的代码

```typescript
//简单的学籍管理系统
function getInputSomething() {
    return '1341534';
}

function loadFromDatabase(id: number) {
    //load from datebase
    return {
        id,
        name: '张三',
        age: 25
    }
}

let s = getInputSomething();
let id = parseInt(s);

let {name, age} = loadFromDatabase(id);
console.log(name, age);
```



## 修改MyTest.js代码

```javascript
//简单的学籍管理系统
function getInputSomething() {
    return '1341534';
}

function loadFromDatabase(id) {
    if(isNaN(id)) return;
    
    //load from datebase
    return {
        id,
        name: '张三',
        age: 25
    }
}

let s = getInputSomething();
let id = parseInt(s);//NaN

let {name, age} = loadFromDatabase(id);
console.log(name, age);
```



这个代码在mock数据中是可以正常运行的，但是当你切换到ts环境中去时。就会出现问题了。

![ts错误提示](https://github.com/Thor-jelly/ReactStudy/blob/master/ts/01-whyts/01.png)

可以发现在 isNaN(id) 后 返回了 undefined 类型，导致 解结构 失败了。



# 总结

1. TypeScript 的主要作用
   - 在代码上显示标注类型，可以让代码更易读
   - 在开发和编译时，通过类型推断和静态类型检查可以显著提高代码质量
2. Typescript 有两种主要用法
   - 编译指定文件（例如`tsc MyTest.ts`）
   - 创建和编译TS项目（例如 `tsc --inti ...`）
3. 简单的开发环境及其他
   - 基础环境：Node.js + VSCode
   - 安装TypeScript
   - 安装VSCode插件（Chinese、reload）
   - 简单命令行使用，和VSCode的简单配置
     - tsc，npm，npx，node
   - 基本类型的概念：类型安全、类型标注、类型推断、强类型、类型检查等
