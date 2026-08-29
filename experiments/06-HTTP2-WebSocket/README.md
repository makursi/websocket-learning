# 06 · HTTP/2 WebSocket（RFC 8441 Extended CONNECT）

## 要验证的概念

- **RFC 8441**：Bootstrapping WebSockets with HTTP/2 —— WebSocket 不再通过 HTTP/1.1 的 `Upgrade` 握手建立，而是复用一条 HTTP/2 连接
- **Extended CONNECT**：HTTP/2 中新增 `:protocol` 伪请求头。客户端发送 `:method: CONNECT` + `:protocol: websocket`，服务器以 `200` 响应后，这条 stream 就是一条 WebSocket 通道
- **与 RFC 6455 的关系**：RFC 6455 定义的 WebSocket Frame 格式（FIN、opcode、MASK、payload length）完全不变，变的只是"帧跑在哪"——从裸 TCP socket 变成 HTTP/2 stream 的 DATA 流

## 设计

```
Node.js Client                         Node.js Server

HTTP/2 Connection
       │
       │ CONNECT  :protocol=websocket  :path=/chat
       ├──────────────────────────────>
       │
       │             200
       │<──────────────────────────────
       │
       │     WebSocket Frame "hello"（客户端帧必须 MASK）
       ├──────────────────────────────>
       │
       │     WebSocket Frame "echo: hello"（服务端帧不 MASK）
       │<──────────────────────────────
```

- `server.ts`
  - `http2.createServer` 时开启 `settings.enableConnectProtocol: true`，向客户端声明"我支持 Extended CONNECT"（RFC 8441 官方要求）
  - 在 `stream` 事件里校验 `:method === CONNECT` 且 `:protocol === websocket`，通过后 `stream.respond({ ":status": 200 })`，随后在 stream 上直接收发 WebSocket Frame
  - 手写 `decodeWebSocketFrame`（去掩码）与 `createWebSocketFrame`（服务端不掩码），echo 回消息
- `client.ts`
  - `http2.connect` 后发起 CONNECT 请求，携带 `:protocol: websocket`、`:scheme`、`:path`、`:authority`
  - 响应 200 后手写带 MASK 的 Text Frame 发送 `"hello"`，收到回显后关闭 stream 与连接
- 帧格式实现刻意只做最小子集：payload ≤ 125 字节、仅 Text 帧（opcode 0x1），突出帧结构本身

## 运行方式

两个终端分别执行：

```bash
# 终端 1：启动服务器
pnpm exp experiments/06-HTTP2-WebSocket/src/server.ts

# 终端 2：启动客户端
pnpm exp experiments/06-HTTP2-WebSocket/src/client.ts
```

## 踩坑记录 / 已知局限

- **浏览器 API 不适用**：浏览器的 `new WebSocket()` 走 HTTP/1.1 Upgrade（或依赖代理转 RFC 8441），Node 端也没有内置 RFC 8441 客户端，所以本实验用 Node 同时扮演收发双方，手写帧
- **帧边界问题（TODO）**：`stream.on("data")` 的 chunk 不保证与 WebSocket Frame 一一对应（TCP/HTTP2 流式传输可能拆包粘包），严格实现需要按帧头 length 做缓冲切分，demo 假设一个 chunk 恰好一个帧
- **未覆盖**：126/127 的扩展长度编码（16/64 位）、分片帧（continuation）、Close/Ping/Pong 帧、服务端校验 Origin
- **客户端掩码**：RFC 6455 要求客户端→服务端方向必须 MASK，demo 里用固定掩码 `12 34 56 78` 演示异或去掩码过程，真实实现须随机掩码
