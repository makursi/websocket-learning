# 04 · 生产模式 — Production Patterns

> 真实应用在协议之上做的事：心跳、重连、认证、错误处理、背压、连接限制、最佳实践。对应站点 Guides 中的模式类文章。

## 学习目标

- [ ] 理解心跳的作用与实现（协议层 Ping/Pong vs 应用层 ping 消息）
- [ ] 掌握指数退避（exponential backoff）+ 抖动（jitter）的重连策略
- [ ] 掌握断开期间的发送队列与重连后的补发/重放问题
- [ ] 理解 bufferedAmount 与背压（backpressure）
- [ ] 了解认证的三种时机：握手 query 参数 / Cookie / Header
- [ ] 了解连接限制的来源（文件描述符、内存、代理）与常用解法
- [ ] 总结一条属于自己的"最佳实践清单"

## 关键概念清单

- [ ] 心跳：Ping 间隔 / Pong 超时 / 收不到就关闭（如 4000）
- [ ] 重连：是否重连的决策（关闭码白名单）、退避上限、抖动
- [ ] 消息队列上限与丢弃策略
- [ ] 打字状态（typing）、加入/离开（join/left）等应用层消息约定
- [ ] 鉴权：握手阶段携带凭证，而非连接后

## 对应站点链接

- https://websocket.org/guides/heartbeat/
- https://websocket.org/guides/reconnection/
- https://websocket.org/guides/authentication/
- https://websocket.org/guides/error-handling/
- https://websocket.org/guides/connection-limits/
- https://websocket.org/guides/best-practices/
- https://websocket.org/guides/building-a-websocket-app/

## 配套实验

- experiments/04-心跳与重连

## 笔记状态

📝 未开始
