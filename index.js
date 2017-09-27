const { createSocket } = require('dgram')
const flattenDeep = require('lodash.flattendeep')

const udpClient = createSocket('udp4')

/**
 * @param {Number} stripLength
 * @param {Number[]} pixels
 * @returns {Buffer}
 */
function createOpcPacket(stripLength = 2, pixels = [255, 255, 255, 0, 0, 0]) {
    const header = [
        0, // channel
        0, // commands
        0, // high byte
        0, // low byte
    ]

    const normalizedPixels = flattenDeep(pixels)

    const packet = [
        ...header,
        ...normalizedPixels
    ]

    packet[2] = normalizedPixels.length >> 8 // high byte
    packet[3] = normalizedPixels.length & 255 // low byte

    return new Buffer(packet)
}

function sendPacket({ packet, host = 2342, port = 'localhost' }) {
    udpClient.send(packet, 0, packet.length, port, host)
}

createOpcPacket()

module.exports = {
    createOpcPacket,
    sendPacket
}
