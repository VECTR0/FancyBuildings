let {mappingRotate, mappingFlipX, mappingFlipY} = require('./transformers_mapping.js')

var transformers = {
    rotate_90(struct) {
        let newStructure = []
        for(let i=0;i<struct[0].length;i++) {
            let row = ""
            for(let j=struct.length-1;j>=0;j--) {

                row += mappingRotate[struct[j][i]] || struct[j][i]
            }
            newStructure.push(row)
        }
        return newStructure
    },
    rotate_180(struct) {
        return this.rotate_90(this.rotate_90(struct))
    },
    rotate_270(struct) {
        return this.rotate_90(this.rotate_90(this.rotate_90(struct)))
    },
    flip_x(struct) {
        return struct.map(row => row.split("").reverse().join("").replace(/./g, m => mappingFlipX[m] || m))
    },
    flip_y(struct) {
        return [...struct].reverse().map(row => row.replace(/./g, m => mappingFlipY[m] || m))
    },
    rotate_90_flip(struct) {
        return this.flip_y(this.rotate_90(struct))
    },
    rotate_270_flip(struct) {
        return this.flip_y(this.rotate_270(struct))
    }
}

module.exports = Object.values(transformers).map(t => t.bind(transformers))