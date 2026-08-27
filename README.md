# WebSocket 学习

以 [websocket.org](https://websocket.org) 站点内容为主体的 WebSocket 协议学习项目。

## 目录结构

```
WebSocket学习/
├── CONTEXT.md        # 领域术语表
├── docs/             # 站点映射 + 决策记录（ADR）
├── content/          # 学习内容（11 章，按学习路径组织）
│   ├── 00-总览/ 01-历史之路/ 02-协议核心/ 03-浏览器API/
│   ├── 04-生产模式/ 05-安全/ 06-协议对比/ 07-应用场景/
│   └── 08-规模化与基础设施/ 09-语言与框架/ 10-参考速查/
└── experiments/      # 动手实验（协议实验台）
```

## 命令

```bash
pnpm install     # 安装依赖
pnpm test        # 运行实验测试（vitest）
pnpm exp <文件>  # 运行单个 TS 实验（tsx）
pnpm typecheck   # 类型检查
```
