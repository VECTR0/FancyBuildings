var transformers = {
    rotate_90(struct) {
        let newStructure = []
        for(let i=0;i<struct[0].length;i++) {
            let row = ""
            for(let j=struct.length-1;j>=0;j--) {
                row += struct[j][i]
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
        return struct.map(row => row.split("").reverse().join(""))
    },
    flip_y(struct) {
        return [...struct].reverse()
    },
    rotate_90_flip(struct) {
        return this.flip_y(this.rotate_90(struct))
    },
    rotate_270_flip(struct) {
        return this.flip_y(this.rotate_270(struct))
    }
}

module.exports = Object.values(transformers).map(t => t.bind(transformers))