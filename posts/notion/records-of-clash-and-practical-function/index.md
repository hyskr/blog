---
title: Clash实用功能的记录
date: '2024-02-16 15:05:00.000'
tags:
- 工具
- Clash
description: 本博客介绍了利用TUN模式和相关配置解决软件不遵循系统代理设置的问题，包括启用服务模式、预处理配置和混合模式的使用方法。
from_notion: https://www.notion.so/Clash-f6cc8a84568d4cbf9c7c5722d058aff4
author: heziah
last_edited_time: '2024-02-16 15:28:00.000'
---
## TUN 模式

某些软件不遵循系统代理设置，例如终端。

TUN 模式旨在解决这个问题。它可以接管不遵循系统代理的软件流量，并将其传递给 CFW 处理。

启用 TUN 模式需要启动服务模式（Service Mode）。

## 预处理配置（Parser）

需要在配置文件上右键添加。在分流规则生效之前，设置自定义规则。
由于配置文件通常自带分流规则，同时你可能需要自定义规则，Parser 会在应用订阅规则前首先应用你的规则，并将其合并到最终生效的规则中。

## 混合模式（Mixin）

混合模式允许在 Clash 配置中添加额外配置项。特别适用于自定义分流规则或 DNS。

混合模式支持 YAML 和 JavaScript 两种语法：

- YAML 会覆盖配置文件中的其他规则。

- JavaScript 则支持对规则的任何自定义操作，包括扩充。

以下是使用 JavaScript 添加配置规则的示例：


```javascript
module.exports.parse = async (
  { content, name, url }, 
  { axios, yaml, notify }
) => {
  const extra = { 
    rules: [
      'DOMAIN-SUFFIX,huggingface.co,国外流量',
      'DOMAIN-SUFFIX,notion.so,国外流量',
      'DOMAIN-SUFFIX,notion.site,国外流量',
      ...content.rules,
    ],
  }
  return { ...content, ...extra }
}
```

<br/>

