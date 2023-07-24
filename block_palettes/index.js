module.exports = {
    generatePalettes: function() {
        require('./spawners.js')
        require('./miscelaneous.js')()
        require('./walls.js')()
    }
}