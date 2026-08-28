# 02 · 协议核心 — WebSocket Protocol（RFC 6455）


## WebSocket协议概述

WebSocket 协议支持 Web 服务器和 Web 客户端之间通过底层 TCP 连接进行持续的、全双工的双向通信。

WebSocket 协议的基本流程包括：首先是握手（将连接从 HTTP 升级到 WebSocket），然后是数据传输。客户端和服务器成功完成握手后，WebSocket 连接便会作为一个持久的全双工通信通道，双方可以独立地随时发送数据。客户端和服务器以称为消息的概念单元进行数据传输，消息可以包含一个或多个帧。

WebSocket 连接完成其使命后，可以通过握手终止。

```text 
        ┌──────────┐                    ┌──────────┐
        │  Client  │                    │  Server  │
        └────┬─────┘                    └────┬─────┘
             │                               │
             │      Initial HTTP             │
             │       handshake               │
             ├──────────────────────────────►│
             │◄──────────────────────────────┤
             │                               │
             │      WebSockets               │
             │      full-duplex              │
             │      persistent               │
             │◄─────────────────────────────►│
             │                               │
             │         Close                 │
             ├──────────────────────────────►│
             │◄──────────────────────────────┤
```


## URI方案和语法

WebSocket协议定义了两种用于服务器和客户端之间通信的URI方案：

- ws，用于未加密连接。
- wss，用于通过传输层安全协议 (TLS) 建立安全、加密的连接。

WebSocket URI 的其余部分遵循与 HTTP 类似的通用语法。它由几个部分组成：主机、端口、路径和查询，如下例所示。

```text
wss://example.com:443/websocket/demo?foo=bar
└─┘   └──────────┘ └─┘ └────────────┘ └─────┘
 │         │        │        │           │
 │         │        │        │           └── Query
 │         │        │        └───────────── Path
 │         │        └────────────────────── Port
 │         └─────────────────────────────── Host
 └───────────────────────────────────────── Scheme
```

注意事项：

- 端口组件是可选的；ws 的默认端口为 80，wss 的默认端口为 443。
默认可以不写端口号

- WebSocket URI 中不允许使用片段标识符。
例如:https://example.com/article?id=123#comments, 语义为：打开这个网页以后，定位到 `comments` 这个位置。这里 `#comments` 就叫 Fragment(片段标识符)。所以WebSocket协议中不允许使用片段标识符。

- 井号 (#) 必须转义为 %23。
如果必须要在URI中使用#,则需要使用URL编码将 #->%23

## 建立WebSocket连接

建立 WebSocket 连接的过程称为握手。WebSocket 最初是为 HTTP/1.1 设计的，但现在也可以通过 HTTP/1.1、HTTP/2 和 HTTP/3 建立连接，每种协议的建立机制都略有不同。

建立连接具体过程: https://websocket.org/guides/websocket-protocol/#opening-handshake

