var fs = require('fs')
$$ = require('./multiplo.js')
out = 'dist/lostcities'

class Building {
    constructor(buildingId, floorId) {
        this.buildingId = buildingId
        this.floorId = floorId
        this.structure = []
    }

    clone(idSuffix) {
        let building = new Building(this.buildingId + idSuffix, this.floorId)
        building.structure = JSON.parse(JSON.stringify(this.structure))
        return building
    }

    fill_slice(slice, char) {
        slice = this.structure[slice]
        for(let i=0;i<slice.length;i++)
            slice[i] = slice[i].replaceAll("?", char)
    }

    add_to_slice(slice, pattern, override=false) {
        slice = this.structure[slice]
        for(let i=0;i<slice.length;i++) {
            let newPattern = ""
            for(let j=0;j<slice[i].length;j++) {
                if(slice[i][j] == "?" || override)
                    newPattern += pattern[i][j]
                else
                    newPattern += slice[i][j]
            }
            slice[i] = newPattern
        }
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
            newBuilding.add_to_slice(0, patterns[p])
            newBuilding.fill_slice(4, "#")
            newBuilding.fill_slice(5, "#")
            buildings.push(newBuilding)
        }
    }
    
    return buildings
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
    buildings = load_floor_patterns(buildings)

    for(let building of buildings)
        save_building(building, generate_floors(building))

    buildings = buildings.map(building => ({"factor": 1.0, "value": 'building_'+building.buildingId}))
    eval($$.create('src/citystyle.json', `${out}/citystyles/citystyle_common.json`))
}
generate_structures()