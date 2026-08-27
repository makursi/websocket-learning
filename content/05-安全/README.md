# 05 · 安全 — Security

> 生产环境必须知道的安全面。对应站点：/guides/security/ 与协议指南中的压缩安全部分。

## 学习目标

- [ ] 明确"生产必须用 wss://"及其原因（传输加密 + 代理兼容）
- [ ] 理解 CSWSH（跨站 WebSocket 劫持）攻击原理与防御（校验 Origin）
- [ ] 掌握服务端输入校验与消息类型白名单
- [ ] 了解 DoS 防护手段（速率限制、超时、资源上限）
- [ ] 理解 permessage-deflate 压缩的 CRIME/BREACH 风险与规避模式
- [ ] 知道"敏感数据与用户输入同消息压缩"为何是漏洞

## 关键概念清单

- [ ] wss / TLS
- [ ] CSWSH / Origin 头校验
- [ ] 鉴权与授权（握手时携带凭证）
- [ ] 压缩攻击：CRIME / BREACH
- [ ] 速率限制、连接数限制、消息大小上限

## 对应站点链接

- https://websocket.org/guides/security/
- https://websocket.org/guides/websocket-protocol/（压缩安全小节）
- https://websocket.org/reference/wss-vs-ws/

## 笔记状态

📝 未开始
