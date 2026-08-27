# 实验台 — Experiments

一个实验只验证一个协议概念，配 vitest 测试，可直接运行。

## 实验清单

| # | 实验 | 验证的概念 | 依赖 | 状态 |
|---|---|---|---|---|
| 01 | 手写打开握手 | RFC 6455 握手：构造请求、校验 `Sec-WebSocket-Accept` | 原生 `node:http` | 📝 未开始 |
| 02 | 帧解析器 | 帧头各字段、长度编码、掩码/去掩码 | 原生 `node:buffer` | 📝 未开始 |
| 03 | 浏览器回显 | 浏览器 API + 本地回显服务器 | 浏览器 + 本地服务器 | 📝 未开始 |
| 04 | 心跳与重连 | Ping/Pong 保活、指数退避重连、消息队列 | 自建服务器 | 📝 未开始 |
| 05 | 聊天应用 | 广播、房间、加入/离开、打字状态 | 自建服务器 + 浏览器 | 📝 未开始 |

## 运行方式

```bash
pnpm install          # 首次
pnpm test             # 运行全部实验测试（vitest）
pnpm exp <文件路径>   # 直接运行某个 TS 脚本（tsx），如：pnpm exp experiments/01-手写握手/client.ts
pnpm typecheck        # 类型检查
```

## 约定

- 实验目录名用 `NN-短横线名`，与内容章节编号呼应（01→02-协议核心，04→04-生产模式…）
- 每个实验一个 `README.md`：要验证的概念、设计、踩坑记录
- 优先用 Node 原生能力（`node:http` / `node:crypto` / `node:buffer`），不引第三方协议库 —— 协议学习阶段不看 `ws` 源码前，先自己写
- 引入 `ws` 库的实验（如 09 语言章节对照）放 `experiments/extra/`
