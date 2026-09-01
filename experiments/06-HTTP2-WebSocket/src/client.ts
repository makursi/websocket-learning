import http2 from 'node:http2'

const client = http2.connect('http://localhost:8001')

client.on('error', (err) => {
  console.error(err)
})

// 创建 HTTP/2 Stream
const stream = client.request({
  ':method': 'CONNECT',

  // RFC 8441 最关键的字段
  ':protocol': 'websocket',

  ':scheme': 'http',

  ':path': '/chat',

  ':authority': 'localhost:8080',
})

// 接受服务器响应

stream.on('response', (headers) => {
  console.log('服务器响应:', headers)

  if (headers[':status'] === 200) {
    console.log('WebSocket over HTTP/2 建立成功')

    // 发送 WebSocket Text Frame
    const frame = createWebSocketFrame('hello')

    stream.write(frame)
  }
})

// 接收 WebSocket Frame
stream.on('data', (chunk: Buffer) => {
  console.log('收到 WebSocket Frame:', chunk)

  const message = decodeWebSocketFrame(chunk)

  console.log('服务器说:', message)

  stream.end()

  client.close()
})

// 创建WebSocket Frame方法

function createWebSocketFrame(
  message: string,
): Buffer {
  const payload = Buffer.from(message)

  const maskingKey = Buffer.from([
    0x12,
    0x34,
    0x56,
    0x78,
  ])

  const frame = Buffer.alloc(
    2 + 4 + payload.length,
  )

  // FIN = 1
  // Opcode = 1 Text
  frame[0] = 0x81

  // MASK = 1
  // payload length
  frame[1] = 0x80 | payload.length

  // Masking key
  maskingKey.copy(frame, 2)

  // Mask payload
  for (let i = 0; i < payload.length; i++) {
    frame[6 + i]
      = payload[i]
        ^ maskingKey[i % 4]
  }

  return frame
}

// 解码服务器 WebSocket Frame

function decodeWebSocketFrame(
  buffer: Buffer,
): string {
  const payloadLength
    = buffer[1] & 0x7F

  const payload
    = buffer.subarray(2, 2 + payloadLength)

  return payload.toString('utf8')
}
