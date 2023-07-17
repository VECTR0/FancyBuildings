const { reverse } = require('dns')
var fs = require('fs')
var {overlap} = require('./utils.js')
$$ = require('../multiplo.js')

class Building {
    constructor(buildingId, floorId) {
        this.buildingId = buildingId
        this.floorId = floorId
        this.structure = []
    }

    clone(idSuffix, floorId=null) {
        let building = new Building(this.buildingId + idSuffix, floorId || this.floorId)
        building.structure = JSON.parse(JSON.stringify(this.structure))
        return building
    }

    make_floor() {
        this.projection
        this.floorCount = (this.floorCount || 0) + 1
        return this.clone("", this.floorCount)
    }

    fill_slice(slice, char) {
        slice = this.structure[slice]
        for(let i=0;i<slice.length;i++)
            slice[i] = slice[i].replaceAll("?", char)
    }

    get projection() {
        if(!this._projection) {
            const blockMap = {
                0: "?",
                1: " ",
                2: "#X$+",
                3: ":a`",
            }
            const reverseBlockMap = {}
            for(let key in blockMap)
                for(let char of blockMap[key])
                    reverseBlockMap[char] = key

            this._projection = []
            for(let i=0;i<this.structure[0].length;i++) {
                let row = ""
                for(let j=0;j<this.structure[1].length;j++) {
                    let flag = 0
                    for(let k of [1, 2, 3]) {
                        flag = Math.max(flag, reverseBlockMap[this.structure[k][i][j]])
                    }
                    row += blockMap[flag][0]
                }
                this._projection.push(row)
            }
        }
        return this._projection
    }

}

function load_walls() {
    let walls = []
    for (let file of fs.readdirSync('src/structure/walls')) {
        let raw_structure = JSON.parse(fs.readFileSync('src/structure/walls/' + file))
        let wall = new Building(file.split('.')[0])
        for(let sliceId of raw_structure.order)
            wall.structure.push(JSON.parse(JSON.stringify(raw_structure.slices[sliceId])))

        walls.push(wall)
    }
    return walls
}

function load_floor_patterns(buildingBases) {
    let patterns = {}
    for (let file of fs.readdirSync('src/structure/floors'))
        patterns[file.split('.')[0]] = JSON.parse(fs.readFileSync('src/structure/floors/' + file))
    
        let buildings = []
    for(let building of buildingBases) {
        for(let p in patterns) {
            let newBuilding = building.clone(p)
            overlap(newBuilding.structure[0], patterns[p])
            newBuilding.fill_slice(4, "#")
            newBuilding.fill_slice(5, "#")
            buildings.push(newBuilding)
        }
    }
    
    return buildings
}

function load_transportation(buildingBases) {
    let patterns = {}
    for (let file of fs.readdirSync('src/structure/transportation'))
        patterns[file.split('.')[0]] = JSON.parse(fs.readFileSync('src/structure/transportation/' + file))
    
    let buildings = []
    for(let building of buildingBases) {
        for(let p in patterns) {
            let newBuilding = building.clone(p)
            for(let i=0;i<newBuilding.structure.length;i++)
                overlap(newBuilding.structure[i], patterns[p].slices[patterns[p].order[i]], 0, 0, true)
            buildings.push(newBuilding)
        }
    }
    
    return buildings
}


module.exports = function get_building_bases() {
    let buildings = load_walls()
    buildings = load_floor_patterns(buildings)
    buildings = load_transportation(buildings)
    return buildings
}