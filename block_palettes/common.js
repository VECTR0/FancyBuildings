let {mappingRotate, mappingFlipX, mappingFlipY} = require('./../structure_generation/transformers_mapping.js')
const defaultDict = (defaultValueFunc) => new Proxy({}, {
    get(target, prop) {
        if (!target[prop]) target[prop] = defaultValueFunc(prop)
        return target[prop];
    }
})

const allVariants = defaultDict((name) => [])

const paletteCounter = defaultDict((name) => 0)
function makePalette(source, name) {
    if(!name) name = source
    name = name.replace(/[^a-zA-Z0-9]/g, '_')
    return $$.create(`src/${source}.json`, `${out}/palettes/${name}_${paletteCounter[name]++}.json`)
}

function fillInWeights(blocks) {
    let result = []
    let leftover = 128-blocks.length
    let paletteSum = blocks.reduce((a, b) => a + b[0], 0)

    for(let i=0;i<blocks.length;i++) {
        let block = blocks[i]
        let weight = Math.round(block[0]/paletteSum*leftover)
        if(weight > leftover) weight = leftover
        leftover -= weight
        paletteSum -= block[0]
        result.push({
            "random": weight+1,
            "block": block[1]
        })
    }

    return result
}

function makeSimplePalette(name, pallettes) {

    for(let p in pallettes.blocks) {
        let blocks = []
        let factor = 1
        let source = pallettes.blocks[p]
        if(typeof source[0] == 'number') {
            factor = source[0]
            source = source.slice(1)
        }
        for(let char in source) {
            let palette = source[char]
            if(typeof palette == 'string') palette = [palette]
            let paletteParsed = palette.map(block => {
                if(typeof block == 'string') return [1, block]
                return block
            })
            let charBlocks = fillInWeights(paletteParsed)
            blocks.push({
                char: pallettes.chars[char],
                blocks: charBlocks
            })
        }
        eval(makePalette('simple_palette', name))
    }
}
function makeSingleBlockPallete(name, char, pallettes) {
    if(char.length != 1) throw new Error(`Char must be a single character, got '${char}' of length ${char.length}`)
    makeSimplePalette(name, {chars: [char], blocks: pallettes.map(b => typeof b !== "string" && typeof b[0] !== "string" ? [b[0], b.slice(1)]: [b])})
}
let rotationBlacklist = [
    'utilitix:experience_crystal[facing=up]', 'minecraft:crafting_table', 'minecraft:brewing_stand', 'minecraft:cartography_table', 'byg:embur_crafting_table', 'byg:holly_crafting_table', 'byg:jacaranda_crafting_table', 'byg:lament_crafting_table', 'apotheosis:reforging_table', 'minecraft:smithing_table', 'byg:pine_crafting_table', 'byg:redwood_crafting_table', 'apotheosis:salvaging_table', 'powah:energy_cell_starter', 'minecraft:air', 'byg:sythian_crafting_table',
    'minecraft:sea_pickle[pickles=1,waterlogged=false]', 'minecraft:sea_pickle[pickles=2,waterlogged=false]', 'ae2:tiny_tnt', 'minecraft:flower_pot', 'supplementaries:hourglass', 'supplementaries:jar', 'twilightforest:firefly_jar', 'supplementaries:urn', 'minecraft:lantern', 'minecraft:soul_lantern', 'minecraft:redstone_wire[north=none,south=none,east=none,west=none]', 'supplementaries:gunpowder[north=none,south=none,east=none,west=none]', 'supplementaries:present_black', 'supplementaries:present_blue', 'supplementaries:trapped_present_orange', 'supplementaries:trapped_present_red', 'botania:black_floating_flower', 'botania:white_floating_flower', 'botania:yellow_floating_flower', 'botania:purple_floating_flower'
]
function makePalleteWithSuffix(name, suffixMap, blocks) {
    function addSuffix(block, suffix) {
        if(rotationBlacklist.includes(block) || rotationBlacklist.includes(block[1])) return block
        let combine = b => (b + suffix).replace(/\]\s*\[/g, ',')
        if(typeof block == 'string') return combine(block)
        return [block[0], combine(block[1])]
    }
    let pallete = {
        chars: Object.keys(suffixMap),
        blocks: blocks.map(b => Object.values(suffixMap).map(s => (Array.isArray(b) ? b : [b]).map(n => addSuffix(n, s))))
    }
    makeSimplePalette(name, pallete)
}
function makePalleteWithRotation(name, chars, blocks) {
    let suffixMap = {
        [chars[0]]: '[facing=south]',
        [chars[1]]: '[facing=east]',
        [chars[2]]: '[facing=north]',
        [chars[3]]: '[facing=west]'
    }
    mappingFlipX[chars[1]] = chars[3]
    mappingFlipX[chars[3]] = chars[1]
    mappingFlipY[chars[0]] = chars[2]
    mappingFlipY[chars[2]] = chars[0]
    mappingRotate[chars[0]] = chars[3]
    mappingRotate[chars[1]] = chars[0]
    mappingRotate[chars[2]] = chars[1]
    mappingRotate[chars[3]] = chars[2]
    makePalleteWithSuffix(name, suffixMap, blocks)
}

module.exports = {allVariants, makePalette, makeSingleBlockPallete, makeSimplePalette, makePalleteWithSuffix, makePalleteWithRotation} 