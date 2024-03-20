---
title: bytehound使用指南
date: '2024-03-20 04:23:00.000'
tags:
- 工具
- 内存分析
- rust
description: bytehound使用指南介绍了安装和使用方法，包括基本用法和高级用法。还提供了分析内存泄漏的示例代码和回溯打印的方法。
from_notion: https://www.notion.so/bytehound-3a4671e343c54e3b97a1bffc299b952c
author: heziah
last_edited_time: '2024-03-20 04:49:00.000'
---
## Install

[bytehound](487c190c_bytehound.zip)

[https://file.notion.so/f/f/05f1dd7a-9a77-43c1-938d-6db01688e616/7cce5871-e1f6-4e78-8b64-1dd61aa5fe47/bytehound.zip](https://file.notion.so/f/f/05f1dd7a-9a77-43c1-938d-6db01688e616/7cce5871-e1f6-4e78-8b64-1dd61aa5fe47/bytehound.zip?id=7650d40f-7c80-4bd9-a702-00dcd4d29e1a&table=block&spaceId=05f1dd7a-9a77-43c1-938d-6db01688e616&expirationTimestamp=1711000800000&signature=pq_t0nrZIgqT8-4LGxwvC3K-GEIIKijTd8r5ODcdFE8&downloadName=bytehound.zip)

## Usage

### Basic Usage


```bash
$ export MEMORY_PROFILER_LOG=warn
$ LD_PRELOAD=./libbytehound.so ./server
$ ./bytehound server memory-profiling_*.dat
```

### Advanced usage


```bash
$ MEMORY_PROFILER_OUTPUT=./log/memprof_%e_%t_%p_%n.mem \
MEMORY_PROFILER_LOG=info \
MEMORY_PROFILER_LOGFILE=./log/bytehound_%e_%p.log \
LD_PRELOAD=./libbytehound.so \
./server
$ ./bytehound server log/*.mem  
```

## Analysis

### **找出所有明显的内存泄漏**


```rust
graph()
    .add("Leaked", allocations().only_leaked())
    .add("Temporary", allocations())
    .save();
```

![Untitled](3aa72a67_Untitled.png)

### 通过回溯来拆分泄漏部分


```rust
let groups = allocations()
    .only_leaked()
    .group_by_backtrace()
        .sort_by_size();

graph().add(groups).save();
```

![Untitled](8eb0d635_Untitled.png)

### 打印出回溯


```rust
fn analyze_group(list) {
    let list_all = allocations().only_matching_backtraces(list);

    graph()
        .add("Leaked", list_all.only_leaked())
        .add("Temporary", list_all)
        .save();

    println("Total: {}", list_all.len());
    println("Leaked: {}", list_all.only_leaked().len());
    println();
    println("Backtrace:");
    println(list_all[0].backtrace().strip());
}
for i in 0..groups.len() {
    println("group[{}]", i);
    analyze_group(groups[i]);
    println("----------------------------------------------------");
}
```

<br/>

