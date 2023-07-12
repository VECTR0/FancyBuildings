var fs = require('fs')
$$ = require('./multiplo.js')
out = 'dist/lostcities'

class Building {
    constructor(buildingId, floorId) {
        this.buildingId = buildingId
        this.floorId = floorId
        this.structure = []
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

function generate_floors(building) {
    for(let slice of building.structure) {
        for(let i=0;i<slice.length;i++)
            slice[i] = slice[i].replaceAll("?", " ")
    }
    building.floorId = 0
    return [building]
}

function save_building(building, floors) {
    let floorsStruct = []
    for(let floor of floors) {
        let slices = floor.structure
        let filename = `building_${floor.buildingId}_${floor.floorId}`
        eval($$.create('src/floor.json', `${out}/parts/${filename}.json`))
        floorsStruct.push({"top": false, "part": filename})
    }
    eval($$.create('src/building.json', `${out}/buildings/building_${building.buildingId}.json`))
}

function generate_structures() {
    let buildings = load_walls()

    for(let building of buildings)
        save_building(building, generate_floors(building))

    buildings = buildings.map(building => ({"factor": 1.0, "value": 'building_'+building.buildingId}))
    eval($$.create('src/citystyle.json', `${out}/citystyles/citystyle_common.json`))
}
generate_structures()