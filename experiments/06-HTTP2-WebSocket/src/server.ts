/*
Demo实现功能示例: 客户端想Nodejs服务器发送请求建立连接，然后服务器响应请求200, 客户端通过制作WebSocket Frame(WebSocket 协议传输数据的基本单位。)发送"text"消息
服务器解码帧并同样制作帧回复"hello";

Node.js Client                         Node.js Server

HTTP/2 Connection
       │
       │ CONNECT
       │ :protocol = websocket
       │ :path = /chat
       ├──────────────────────────────>
       │
       │             200
       │<──────────────────────────────
       │
       │
       │     WebSocket Frame
       │ "hello"
       ├──────────────────────────────>
       │
       │     WebSocket Frame
       │ "echo: hello"
       │<──────────────────────────────

*/

import http2 from 'node:http2'

const server = http2.createServer({
  settings: {
    // 重点: RFC 8441官方要求
    // 告诉客户端：我支持 Extended CONNECT
    enableConnectProtocol: true,
  },
})

// 开启服务

server.on('stream', (stream, headers) => {
  console.log('\n收到 HTTP/2 Stream')

  console.log('headers:', headers)

  // 方括号属性法取对象属性
  const method = headers[':method']
  const protocol = headers[':protocol']
  const path = headers[':path']

  // 判断请求头中的method是否为CONNECT,protocol是否为WebSocket。

  if (
    method === 'CONNECT'
    && protocol === 'websocket'
  ) {
    console.log('发现 HTTP/2 WebSocket 请求')
    console.log('path:', path)

    // RFC 8441：
    // 成功以后返回 200
    stream.respond({
      ':status': 200,
    })

    console.log('WebSocket 连接建立')

    // 连接成功，开始接受WebSocket Frame

    stream.on('data', (chunk: Buffer) => {
      console.log('收到原始 WebSocket Frame:', chunk)

      const message = decodeWebSocketFrame(chunk)

      if (message !== null) {
        console.log('收到消息:', message)

        // 返回 WebSocket Text Frame
        const response = createWebSocketFrame(
          `echo: ${message}`,
        )

        stream.write(response)
      }
    })

    stream.on('close', () => {
      console.log('WebSocket Stream 关闭')
    })

    return
  }

  // 如果是普通请求
  stream.respond({
    ':status': 404,
  })

  stream.end()
})

// 监听服务
server.listen(8080, () => {
  console.log('HTTP/2 server running at http://localhost:8080')
})

// WebSocket Frame解码
function decodeWebSocketFrame(buffer: Buffer): string | null {
  if (buffer.length < 2) {
    return null
  }
  const secondByte = buffer[1]

  // MASK
  const masked = (secondByte & 0x80) !== 0

  // Payload length
  const payloadLength = secondByte & 0x7F

  let offset = 2

  // 本例只处理 <= 125 bytes
  if (payloadLength > 125) {
    throw new Error('Demo only supports payload <= 125 bytes')
  }

  let maskingKey: Buffer | undefined

  if (masked) {
    maskingKey = buffer.subarray(offset, offset + 4)
    offset += 4
  }

  let payload = buffer.subarray(
    offset,
    offset + payloadLength,
  )

  // 客户端发送的 WebSocket Frame 必须 Mask
  if (masked && maskingKey) {
    const decoded = Buffer.alloc(payload.length)

    for (let i = 0; i < payload.length; i++) {
      decoded[i]
        = payload[i]
          ^ maskingKey[i % 4]
    }

    payload = decoded
  }

  // opcode
  const opcode = buffer[0] & 0x0F

  // 1 = Text Frame
  if (opcode === 0x1) {
    return payload.toString('utf8')
  }

  return null
}

// 创建 WebSocket Text Frame
function createWebSocketFrame(
  message: string,
): Buffer {
  const payload = Buffer.from(message)

  if (payload.length > 125) {
    throw new Error('Demo only supports payload <= 125 bytes')
  }

  const frame = Buffer.alloc(
    2 + payload.length,
  )

  // FIN = 1
  // Opcode = 1 (Text)
  frame[0] = 0x81

  // Server -> Client 不需要 MASK
  frame[1] = payload.length

  payload.copy(frame, 2)

  return frame
}
