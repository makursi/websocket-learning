# WebSocket 学习项目

以 websocket.org 为内容主体、动手实验为辅助的 WebSocket 协议学习项目。项目的"领域"就是 WebSocket 协议本身及其工程实践，术语表收录本项目内容组织用语与协议核心词汇。

## Language

### 项目组织

**章节 (Chapter)**:
本项目内容组织的基本单位，按学习路径排序（`content/00-总览` → `content/10-参考速查`），每章映射到站点一个或多个信息块。
_Avoid_: 模块、目录、section

**实验 (Experiment)**:
`experiments/` 下每个动手编码练习，一个实验只验证一个协议概念，配测试。
_Avoid_: demo、小项目、练习（与笔记混用）

**回显服务器 (Echo Server)**:
把收到的消息原样返回的测试服务器，用于验证客户端行为（本站在线版：`wss://echo.websocket.org`，本项目本地版见 experiments/03）。
_Avoid_: echo 服务、测试服务器

### 连接生命周期

**连接 (Connection)**:
客户端与服务器之间一条持久的全双工通道，状态机为 CONNECTING → OPEN → CLOSING → CLOSED。
_Avoid_: socket（与 TCP socket 混淆）、会话

**握手 (Handshake)**:
连接建立/关闭时的协议交换。打开握手是 HTTP 升级（`Upgrade: websocket` + `101 Switching Protocols`）；关闭握手是双方交换 Close 帧。
_Avoid_: 三次握手（那是 TCP 的）、握手协议

**关闭码 (Close Code)**:
Close 帧负载中的 16 位状态码，语义由 RFC 6455 与 IANA 注册表定义（如 1000 正常关闭、1006 异常关闭），应用自定义码用 4000–4999。
_Avoid_: 错误码、状态码（与 HTTP 状态码混淆）

### 数据传输

**帧 (Frame)**:
协议层最小传输单元，由帧头（FIN/RSV/操作码/MASK/长度）+ 可选掩码 + 负载组成。协议传输的对象是帧。
_Avoid_: 数据包、报文

**消息 (Message)**:
应用层概念：一个完整的逻辑消息，由一个或多个帧组成（分片时首帧带操作码、后续为续帧）。
_Avoid_: 数据、内容（与帧混用）

**操作码 (Opcode)**:
帧头 4 位字段，标识帧类型：文本(0x1)、二进制(0x2)、续帧(0x0)、关闭(0x8)、Ping(0x9)、Pong(0xA)。
_Avoid_: 帧类型、opcode 直译

**掩码 (Masking)**:
客户端→服务器帧必须执行的 XOR 混淆（4 字节随机掩码键），防止缓存投毒攻击；服务器→客户端帧不掩码。
_Avoid_: 加密（不是加密，是混淆）

**子协议 (Subprotocol)**:
握手时协商的应用层协议（如 MQTT、STOMP、JSON-RPC over WebSocket），通过 `Sec-WebSocket-Protocol` 头选择。
_Avoid_: 协议扩展（混淆）、子协议直接叫协议

**扩展 (Extension)**:
握手时协商的协议层能力，通过 `Sec-WebSocket-Extensions` 头选择，如 permessage-deflate 压缩。
_Avoid_: 插件、增强

### 应用模式

**心跳 (Heartbeat)**:
用 Ping/Pong 帧定期探测连接存活性并测量延迟的机制。
_Avoid_: 保活、keepalive（keepalive 是 TCP 层的）

**重连 (Reconnection)**:
连接异常关闭后按退避策略自动重建连接的客户端模式。
_Avoid_: 断线重连、重试（重试常用于 HTTP 请求）
