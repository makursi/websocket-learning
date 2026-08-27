# 08 · 规模化与基础设施 — Scale & Infrastructure

> 连接多了之后怎么办：连接上限、水平扩展、粘性会话、代理与 K8s。对应站点：/guides/websockets-at-scale/ 与 /guides/infrastructure/*。

## 学习目标

- [ ] 理解"连接即资源"：每连接的内存/文件描述符成本与连接上限
- [ ] 理解单机 vs 多机的扩展策略：会话亲和性（sticky session）vs 集中式 pub/sub
- [ ] 理解代理层的作用：Nginx / Cloudflare / AWS ALB 的升级（Upgrade）与超时配置
- [ ] 了解 Kubernetes 部署的特殊性（Ingress 升级支持、滚动更新的连接排空）
- [ ] 能画出一个小型 WebSocket 集群的架构图

## 关键概念清单

- [ ] 连接上限 / 内存模型
- [ ] 会话亲和性（粘性会话）
- [ ] pub/sub（如 Redis）做跨实例广播
- [ ] 代理超时（proxy_read_timeout 等）、负载均衡器升级支持
- [ ] K8s：Ingress / Service / Pod 生命周期与连接排空

## 对应站点链接

- https://websocket.org/guides/websockets-at-scale/
- https://websocket.org/guides/connection-limits/
- https://websocket.org/guides/infrastructure/nginx/
- https://websocket.org/guides/infrastructure/cloudflare/
- https://websocket.org/guides/infrastructure/kubernetes/
- https://websocket.org/guides/infrastructure/aws/alb/

## 笔记状态

📝 未开始
