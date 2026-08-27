import { describe, expect, it } from 'vitest';

// Node 22+ 提供全局 WebSocket（未定义时跳过，避免假失败）
const hasWebSocket = typeof WebSocket === 'function';

describe('环境验证', () => {
  it('Node 版本 >= 18（本项目要求）', () => {
    const major = Number(process.versions.node.split('.')[0]);
    expect(major).toBeGreaterThanOrEqual(18);
  });

  it('内置 WebSocket 可用（Node >= 22）', () => {
    expect(hasWebSocket).toBe(true);
  });

  it('wss 默认端口 443 会被 URL 解析器规范化掉（RFC 6455 默认端口）', () => {
    const url = new URL('wss://example.com:443/chat?token=abc');
    expect(url.protocol).toBe('wss:');
    expect(url.port).toBe(''); // 443 是 wss 默认端口，被规范化省略
  });

  it('非默认端口会保留（ws 默认 80，wss 默认 443）', () => {
    const ws = new URL('ws://example.com/chat');
    const wss = new URL('wss://example.com:8443/chat');
    expect(ws.port).toBe('');
    expect(wss.port).toBe('8443');
  });
});
