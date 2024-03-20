---
title: bytehound使用指南
date: '2024-03-20 04:23:00.000'
tags: []
description: ''
from_notion: https://www.notion.so/bytehound-3a4671e343c54e3b97a1bffc299b952c
author: heziah
last_edited_time: '2024-03-20 04:39:00.000'
---
## Install

[bytehound](487c190c_bytehound.zip)

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

