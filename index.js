const { createSocket } = require('dgram')

/**
 * @param {Number} stripLength
 * @param {Number[]} pixels - Must be Array of depth=0
 * @returns {Buffer}
 */
function createOpcPacket(stripLength = 2, pixels = [255, 255, 255, 0, 0, 0]) {
    const header = [
        0, // channel
        0, // commands
        0, // high key
        0, // low key
    ]

    const packet = [ ...header, ...pixels ]

    packet[2] = pixels.length >> 8  // high byte
    packet[3] = pixels.length & 255 // low byte

    return new Buffer(packet)
}

/**
 * @returns {Socket}
 */
function createUdpClient() {
    return createSocket('udp4')
}

/**
 * @param {Socket} client
 * @param {String} host
 * @param {Number} port
 * @param {Number} stripLength
 * @returns {Function}
 */
function getSendPixels({ client = createUdpClient(), host = 'localhost', port = 1337, stripLength = 1 }) {
    /**
     * @param {Number[]} pixels - Must be Array of depth=0
     */
    return (pixels = [255, 255, 0]) => {
        const packet = createOpcPacket(stripLength, pixels)
        client.send(packet, 0, packet.length, port, host)
    }
}

module.exports = {
    createOpcPacket,
    createUdpClient,
    getSendPixels
}
