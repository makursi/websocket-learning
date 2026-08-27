# 06 · 协议对比 — Comparisons

> WebSocket 与其他实时/传输方案的对比与选型。对应站点：/comparisons/*。

## 学习目标

- [ ] 建立对比矩阵：全双工 / 半双工、单向 / 双向、开销、状态、复杂度
- [ ] 能说出 WebSocket vs SSE 的决策要点（单向够用时选 SSE）
- [ ] 能说出 WebSocket vs HTTP 的本质差异（请求驱动 vs 事件驱动）
- [ ] 了解长轮询、gRPC、MQTT、Socket.IO、SignalR、WebRTC、WebTransport 各自的定位
- [ ] 会用站点的选型工具（choose-a-protocol）验证自己的判断

## 关键概念清单

- [ ] HTTP：半双工 / 请求-响应 / 无状态
- [ ] SSE：单向服务端推送 / EventSource / 自动重连
- [ ] 长轮询：服务器挂起连接直到有数据
- [ ] gRPC：双向流 + HTTP/2
- [ ] MQTT：发布-订阅 / QoS / IoT
- [ ] Socket.IO / SignalR：带回退的库（长轮询兜底）
- [ ] WebRTC / WebTransport：P2P 与 QUIC 时代的对手

## 对应站点链接

- https://websocket.org/comparisons/decision-guide/
- https://websocket.org/comparisons/http/
- https://websocket.org/comparisons/sse/
- https://websocket.org/comparisons/long-polling/
- https://websocket.org/comparisons/grpc/
- https://websocket.org/comparisons/mqtt/
- https://websocket.org/comparisons/socket-io/
- https://websocket.org/comparisons/signalr/
- https://websocket.org/comparisons/webrtc/
- https://websocket.org/comparisons/webtransport/
- https://websocket.org/comparisons/rest/
- https://websocket.org/comparisons/managed-services/
- 选型工具：https://websocket.org/tools/choose-a-protocol/

## 笔记状态

📝 未开始
