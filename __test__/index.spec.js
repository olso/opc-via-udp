const Socket = require('dgram').Socket
const { createUdpClient, createOpcPacket, getSendPixels } = require('../index')

describe('createUdpClient', () => {
    test('should return udp client instance', () => {
        const client = createUdpClient()
        expect(client).toBeInstanceOf(Socket)
    })
})

describe('createOpcPacket', () => {
    test('should return Buffer', () => {
        const packet = createOpcPacket()
        expect(packet).toBeInstanceOf(Buffer)
    })

    test('packet should have length of 7', () => {
        const packet = createOpcPacket(1, [255, 255, 255])
        expect(packet.length).toEqual(7)
    })

    test('5th byte should be 255', () => {
        const packet = createOpcPacket(1, [255, 255, 255])
        expect(packet[4]).toEqual(255)
    })
})
