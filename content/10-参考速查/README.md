# 10 · 参考速查 — Reference

> 查表用：关闭码、浏览器支持、头部、端口、故障排查。对应站点：/reference/* 与 /guides/troubleshooting/*。本目录刻意保持与站点一致的"速查手册"组织（见 ADR-0001）。

## 学习目标

- [ ] 能记住并解释核心关闭码（1000/1001/1002/1003/1008/1011，以及浏览器私有 1006）
- [ ] 能查用关闭码速查表（含 4000–4999 应用码）
- [ ] 了解浏览器支持矩阵与 polyfill/回退方案（SockJS、Socket.IO）
- [ ] 掌握故障排查清单：403 / 连接被拒 / CORS / 超时 / Chrome DevTools 调试
- [ ] 了解 Autobahn 测试套件（协议合规性测试）

## 关键概念清单

- [ ] 关闭码表：1000 / 1001 / 1002 / 1003 / 1007 / 1008 / 1009 / 1010 / 1011 / 1012–1014 / 4000–4999
- [ ] 浏览器支持：Chrome 16+ / Firefox 11+ / Safari 7+ / Edge 12+（2013 起全覆盖）
- [ ] 握手头部速查：Upgrade / Connection / Sec-WebSocket-Key / Accept / Version / Protocol / Extensions
- [ ] 端口：ws=80 / wss=443
- [ ] 常见故障：403（Origin/鉴权）、1006（代理中断）、超时（心跳缺失）

## 对应站点链接

- https://websocket.org/reference/close-codes/
- https://websocket.org/reference/browser-support/
- https://websocket.org/reference/headers/
- https://websocket.org/reference/ports/
- https://websocket.org/guides/troubleshooting/403/
- https://websocket.org/guides/troubleshooting/connection-refused/
- https://websocket.org/guides/troubleshooting/cors/
- https://websocket.org/guides/troubleshooting/timeout/
- https://websocket.org/guides/troubleshooting/debugging-chrome/
- https://websocket.org/guides/testing/autobahn/

## 笔记状态

📝 未开始
