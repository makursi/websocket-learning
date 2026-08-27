# 02 · 协议核心 — WebSocket Protocol（RFC 6455）

> 本项目的核心章节：URI、打开握手、帧结构、掩码、分片、控制帧、关闭握手、扩展、子协议。对应站点：/guides/websocket-protocol/ 及 Reference 子页。

## 学习目标

- [ ] 能手写一个完整的客户端握手请求并校验服务器 101 响应
- [ ] 能画出帧结构图并解释每个字段（FIN/RSV/opcode/MASK/长度编码）
- [ ] 能实现掩码/去掩码算法（4 字节 XOR）并解释为什么客户端必须掩码
- [ ] 理解消息分片规则（首帧带操作码、续帧 0x0、末帧 FIN=1）
- [ ] 理解控制帧约束（≤125 字节、不可分片、Ping 必须回 Pong）
- [ ] 理解关闭握手与常用关闭码语义
- [ ] 了解扩展（permessage-deflate）与子协议（MQTT/STOMP/JSON-RPC）的协商机制
- [ ] 了解 HTTP/2（RFC 8441）与 HTTP/3（RFC 9220）上的引导差异

## 关键概念清单

- [ ] ws / wss URI scheme（默认端口 80 / 443，禁止 fragment）
- [ ] `Upgrade: websocket`、`Sec-WebSocket-Key`、`Sec-WebSocket-Accept`（SHA-1 + GUID）
- [ ] `101 Switching Protocols`
- [ ] 操作码表：0x0 续帧 / 0x1 文本 / 0x2 二进制 / 0x8 关闭 / 0x9 Ping / 0xA Pong
- [ ] 负载长度编码：7 位 / 126+16 位 / 127+64 位
- [ ] 掩码键（32 位随机）与缓存投毒防御
- [ ] 关闭码：1000/1001/1002/1003/1008/1011，应用码 4000–4999
- [ ] RFC 7692 压缩（CRIME/BREACH 风险）
- [ ] RFC 8441 Extended CONNECT / RFC 9220 QUIC

## 对应站点链接

- https://websocket.org/guides/websocket-protocol/
- https://websocket.org/reference/handshake/
- https://websocket.org/reference/headers/
- https://websocket.org/reference/ports/
- https://websocket.org/reference/wss-vs-ws/
- https://websocket.org/reference/websocket-vs-tcp/
- RFC 6455: https://tools.ietf.org/html/rfc6455

## 配套实验

- experiments/01-手写握手
- experiments/02-帧解析器

## 笔记状态

📝 未开始（计划拆分为逐主题笔记：握手 / 帧 / 掩码 / 分片 / 关闭 / 扩展与子协议）
