# 00 · 环境验证 — Environment Check

验证工具链（tsx / vitest / typescript）与 Node 24 内置 WebSocket 可用性。
所有实验的地基：跑不通这个，后面都白搭。

## 验证内容

- [x] tsx 能运行 TS 脚本
- [x] vitest 能跑测试
- [x] tsc 类型检查通过（本项目至少有一个 TS 文件）
- [x] Node ≥ 22 内置全局 `WebSocket` 可用（后续实验可不装客户端库）

## 命令

```bash
pnpm exp experiments/00-环境验证/check.ts   # 打印环境信息
pnpm test experiments/00-环境验证            # 跑本实验测试
pnpm typecheck                              # 全项目类型检查
```
