# Gist2Snippet

## 介绍

将 Gists 代码块转化为 vscode 的本地项目的代码片段

## 开始使用

### 安装方法

```npm
npm i gist2snippet -g
```

or

```yarn
yarn global add gist2snippet
```

### 使用方法

```node
$ gist2snippet

Usage: gist2snippet [options] [command]

Options:
  -v, --version    脚手架版本号
  -h, --help       显示帮助

Commands:
  show [username]  显示用户公开的`Gists`；如果`username`为空，则显示登录用户的`Gists`
  sync <id>        同步目标`Gists`为`vscode`本地项目代码块
  login <token>    通过`github token`登录，可以访问私人`Gists`
  help [command]   display help for command
```

## 使用规范

### Gists 代码片段格式

每个代码片段新建一个 markdown 文件

markdown 头部需要写 yaml 头来描述一条gist所含有的元数据，格式如下：

```md
    ---
    prefix: v2.test1
    description: v2 模板的测试代码
    scope: javascript, typescript
    ---

    ```js
    console.log($1)
    ```

```

`prefix` vscode 代码片段触发键
`description` vscode 代码片段描述
`scope` 指定 vscode 代码片段作用的文件

代码写在 markdown 文件 yaml 头 下面代码块包裹的区块内

### vscode 插件推荐

> [GistPad](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.gistfs)是一个Visual Studio Code扩展，它允许您完全在编辑器中远程编辑GitHub Gist和存储库。您可以打开，创建，删除，分叉和加星号信息库和存储库，然后无缝地开始编辑文件，就好像它们是本地文件一样，而无需克隆，推送或拉取任何内容。就像您自己的开发人员库一样，它用于构建和引用代码段，常用配置/脚本，与编程相关的注释/文档，知识库和交互式示例。
