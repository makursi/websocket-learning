# 03 · 浏览器 API — The WebSocket API

> 浏览器端 WebSocket 对象的完整用法。对应站点：/reference/websocket-api/。

## 学习目标

- [ ] 掌握构造函数 `new WebSocket(url[, protocols])` 与子协议参数
- [ ] 掌握 readyState 状态机：CONNECTING(0) / OPEN(1) / CLOSING(2) / CLOSED(3)
- [ ] 掌握四个事件 open / message / error / close 及其触发时机
- [ ] 掌握 send() 支持的数据类型（string / ArrayBuffer / Blob / TypedArray）
- [ ] 理解 binaryType（'arraybuffer' vs 'blob'）与 MessageEvent.data 的类型分支
- [ ] 会用 bufferedAmount 做背压控制
- [ ] 会用 close(code, reason) 主动关闭并选对关闭码
- [ ] 知道 error 事件几乎不携带细节，随后必有 close 事件携带 code/reason

## 关键概念清单

- [ ] `socket.url` / `socket.protocol` / `socket.extensions` / `socket.bufferedAmount`
- [ ] onxxx 属性 vs addEventListener
- [ ] close 事件：`code` / `reason` / `wasClean`（1006 = 异常关闭）
- [ ] TypeScript 内置类型与类型守卫（discriminated union）

## 对应站点链接

- https://websocket.org/reference/websocket-api/
- 在线回显服务器：https://websocket.org/tools/websocket-echo-server/（或 `wss://echo.websocket.org`）

## 配套实验

- experiments/03-浏览器回显（浏览器页 + 在线/本地回显服务器）

## 笔记状态

📝 未开始
