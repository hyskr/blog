---
title: 静态博客搭建
date: '2023-07-17 11:21:00.000'
tags: []
description: 从YouXam借鉴来的很简约的博客主题，配合Github Action实现了自动化部署。
from_notion: https://www.notion.so/adb8c84172c54638aeca4954bcee177f
author: heziah
last_edited_time: '2024-02-06 10:28:00.000'
---
This is a personal blog of [Heziah](https://heziah.top/) from [Youxam](https://youxam.one/)。

## 构建

### 使用yarn构建


```bash
npm install yarn
yarn install && yarn run build
```

### 使用Github Action

### 可自动同步notion的文章到博客

- 需配置`NOTION_TOKEN`

- 大概的配置流程是:

	1. 在 [Notion Integrations](https://www.notion.so/my-integrations) 中创建一个Integration，如取名为 sync-to-blog，然后复制得到的token。

	1. 然后，在你的博客仓库的 GitHub 设置里的 Secrets 添加一项NOTION_TOKEN，内容就是刚才复制得到的 token。

	1. 在你的 notion 文章中打开你想绑定的 notion 页面，在选项里面将这个页面连接到刚创建的 `sync-to-blog integration`。

	1. 然后在 markdown 文件的 front-matter 里面加入一项 notion-url,指向 notion 页面，例如：

<br/>


```yaml
---
notion-url: <https://www.notion.so/youxam/notion-2cfdd47bc13949f38435b0ac347d770e>
---
其他内容...
```

<br/>

- 使用 Notion 的数据库：

	1. 在 Notion 中新建一个新页面，点击 List，然后创建一个新数据库，同样连接到你创建的Integration，然后点击 Copy Link to View (注意必须打开数据库主页面再操作)。

	1. 在博客存放markdown文件的地方添加一个文件 .notion_list，内容直接填入数据库的链接。这样，每次 action 运行的时候都会保持和这个数据库的同步。

- 详细配置方法可参考 博客[使用 notion 作为静态博客的编辑器](https://youxam.one/posts/notion/using-the-notion-as-static-blog-editor.html) 以及 Github项目[Notion-GitHub-Sync](https://github.com/YouXam/Notion-GitHub-Sync)

### 可自动构建发布到七牛云，bark推送通知

- 需在 `settings/actions` 中把 `Workflow permissions` 改成 `Read and write permissions`

- `qshell` 上传七牛云，需配置 `QINIU_ACCESS_KEY` `QINIU_SECRET_KEY`

- `bark` 推送，需配置 `BARK_TOKEN`

- `env` 中参数按需修改

<br/>

<br/>

<br/>

