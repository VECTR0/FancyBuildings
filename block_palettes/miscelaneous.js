var { makeSingleBlockPallete, allVariants } = require('./common.js')

function makeBars() {
    makeSingleBlockPallete('bars', ':', [
        'minecraft:iron_bars', 
        'additionalbars:gold_bars', 
        [0.25, 'additionalbars:waxed_copper_bars'], 
        [0.25, 'additionalbars:waxed_exposed_copper_bars'], 
        [0.25, 'additionalbars:waxed_weathered_copper_bars'], 
        [0.25, 'additionalbars:waxed_oxidized_copper_bars'], 
        ['additionalbars:copper_bars', 'additionalbars:exposed_copper_bars', 'additionalbars:weathered_copper_bars', 'additionalbars:oxidized_copper_bars'],
        'additionalbars:crimson_bars', 
        'additionalbars:warped_bars', 
        [0.2, 'securitycraft:reinforced_iron_bars']
    ]);
}

function makeCeilingDecorations() {
    let palletes = ['minecraft:lantern', 'minecraft:soul_lantern', 'chipped:lantern_4', 'chipped:soul_lantern_3', 'chipped:lantern_1', 'chipped:soul_lantern_1', 'chipped:lantern_2', 'chipped:soul_lantern_2', 'supplementaries:brass_lantern', 'supplementaries:crimson_lantern', 'supplementaries:silver_lantern', 'supplementaries:lead_lantern', 'byg:glowstone_lantern', 'byg:therium_lantern', 'byg:cryptic_lantern']
    palletes = palletes.map(b => b+'[hanging=true]')
    palletes = palletes.concat(['torchmaster:dreadlamp', 'minecraft:bell[attachment=ceiling]', 'laserio:laser_connector[facing=up]', 'supplementaries:sack', 'minecraft:chain', 'mcwlights:white_ceiling_light', 'mcwlights:light_gray_ceiling_light', 'mcwlights:gray_ceiling_light', 'mcwlights:black_ceiling_light', 'utilitix:experience_crystal[facing=down]', 'simplylight:illuminant_panel[facing=down]', 'forbidden_arcanus:arcane_golden_chain', 'additionallanterns:obsidian_chain', 'byg:witch_hazel_blossom', 'minecraft:spore_blossom'])

    let candles = ['supplementaries:candle_holder', 'supplementaries:candle_holder_yellow', 'supplementaries:candle_holder_orange', 'supplementaries:candle_holder_gray', 'supplementaries:candle_holder_black']
    for(let candle of candles) {
        for(let i of [1, 2, 3, 4]) 
            palletes.push([1/candles.length/2, `${candle}[candles=${i},face=ceiling]`])
    }

    makeSingleBlockPallete('ceiling_decor', '^', palletes)
}

module.exports = function() {
    makeBars()
    makeCeilingDecorations()
    makeSingleBlockPallete('elevator', 'e', ['elevatorid:elevator_white', 'elevatorid:elevator_light_gray', 'elevatorid:elevator_gray', 'elevatorid:elevator_black'].map(f=>f+'[directional=false]'))
}