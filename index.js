$$ = require('./multiplo.js')
out = 'dist/lostcities'
$$.clear(out)
$$.clone('src/static', out)

function sanitizeName(name) {
    return name.replace(/[: _"'{}\][]/g, '_').toLowerCase()
}

const variant_handler = {
    get(target, prop) {
        if (!target[prop]) target[prop] = []
        return target[prop];
    }
};
const allVariants = new Proxy({}, variant_handler);

(function make_glass_variants() {
    let variants = [
        ["connectedglass:borderless_glass", "connectedglass:borderless_glass_pane"],
        ["connectedglass:clear_glass", "connectedglass:clear_glass_pane"],
        ["connectedglass:scratched_glass", "connectedglass:scratched_glass_pane"],
        ["create:tiled_glass", "create:tiled_glass_pane"],
        ["create:framed_glass", "create:framed_glass_pane"],
        ["create:horizontal_framed_glass", "create:horizontal_framed_glass_pane"],
        ["create:vertical_framed_glass", "create:vertical_framed_glass_pane"],
        ["tconstruct:seared_glass", "tconstruct:seared_glass_pane"],
        ["tconstruct:scorched_glass", "tconstruct:scorched_glass_pane"],
        ["tconstruct:soul_glass", "tconstruct:soul_glass_pane"],
        ["tconstruct:clear_tinted_glass", "connectedglass:scratched_glass_black_pane"],
        ["connectedglass:tinted_borderless_glass", "connectedglass:scratched_glass_black_pane"],
        ["industrialforegoing:dark_glass", "connectedglass:scratched_glass_black_pane"],
        ["mob_grinding_utils:tinted_glass", "connectedglass:scratched_glass_black_pane"],
    ]
    let colored_variants = [
        ["connectedglass:borderless_glass_$", "connectedglass:borderless_glass_$_pane"],
        ["connectedglass:clear_glass_$", "connectedglass:clear_glass_$_pane"],
        ["connectedglass:scratched_glass_$", "connectedglass:scratched_glass_$_pane"],
        ["mcwwindows:$_mosaic_glass", "connectedglass:scratched_glass_$_pane"],
        ["connectedglass:tinted_borderless_glass_$", "connectedglass:scratched_glass_$_pane"]
    ]
    for (let i in [2, 5, 6, 7, 8, 9, 10]) colored_variants.push(["chipped:$_stained_glass_" + i, "chipped:$_stained_glass_pane_" + i])
    for (let scheme of [[["white", "gray", "light_gray", "black"], 0.12], [["orange", "magenta", "light_blue", "yellow", "lime", "pink", "cyan", "purple", "blue", "brown", "green", "red"], 0.03]])
        for (let color of scheme[0])
            for (let base of colored_variants) variants.push([base[0].replace(/\$/g, color), base[1].replace(/\$/g, color), scheme[1]])

    for (let v of variants) {
        let filename = sanitizeName(v[0]+'_'+v[1])
        let glass_block = v[0]
        let glass_pane = v[1]
        let glass_variant_factor = v[2] || 1
        eval($$.create('src/glass.json', out + '/palettes/glass_' + filename + '.json'))
    }
})();

const shuffleArray = array => {
    array = [...array]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }
  
(function make_wall_variants() {
    let variants = {
        "black": [
            ['minecraft:polished_blackstone_bricks', 'minecraft:cracked_polished_blackstone_bricks', 'minecraft:blackstone'],
            ['chipped:blackstone_8', 'chipped:blackstone_26', 'chipped:blackstone_34', 'chipped:blackstone_31', 'chipped:blackstone_21'],
            ['blue_skies:lunar_stonebrick', 'blue_skies:cracked_lunar_stonebrick', 'blue_skies:mossy_lunar_stonebrick'],
            ['forbidden_arcanus:polished_darkstone_bricks', 'forbidden_arcanus:cracked_polished_darkstone_bricks'],
            ['create:cut_scorchia_bricks'], 
            ['byg:soapstone_bricks'],
            ['blue_skies:smooth_midnight_sandstone'],
            ['botania:dark_quartz'],
            ['minecraft:obsidian']
        ],
        "purple": [
            ['ars_nouveau:arcane_bricks'], 
        ],
        "light_purple": [
            ['chipped:purpur_block_15', 'minecraft:purpur_block', 'chipped:purpur_block_33', 'chipped:purpur_block_37'],
            ['chipped:purpur_block_7']
        ],
        "pink": [
            ['create_confectionery:ruby_chocolate_bricks']
        ],
        "blue": [
            ['supplementaries:lapis_bricks'], 
            ['byg:blue_nether_bricks']
        ],
        "light_blue": [
            ['chipped:packed_ice_15', 'chipped:ice_37', 'chipped:blue_ice_15']
        ],
        "asurine": [
            ['create:cut_asurine_bricks']
        ],
        "light_cyan": [
            ['chipped:prismarine_15', 'chipped:prismarine_33', 'chipped:prismarine_14'],
            ['chipped:prismarine_8', 'chipped:prismarine_26', 'chipped:prismarine_34', 'chipped:prismarine_31']
        ],
        "cyan": [
            ['chipped:dark_prismarine_15', 'chipped:dark_prismarine_33', 'chipped:dark_prismarine_37', 'chipped:dark_prismarine_8'],
            ['create:cut_veridium_bricks'],
            ['minecraft:warped_wart_block', 'chipped:warped_wart_block_12', 'chipped:warped_wart_block_11', 'chipped:warped_wart_block_9', 'chipped:warped_wart_block_10']
        ],
        "green": [
            ['thermal:bamboo_block'],
            ['bambooeverything:bamboo_bundle'],
            ['domum_ornamentum:green_cactus_extra'],
            ['chipped:moss_block_2', 'chipped:moss_block_1', 'chipped:moss_block_5', 'chipped:moss_block_11', 'chipped:moss_block_8'],
            ['minecraft:moss_block', 'minecraft:mossy_stone_bricks', 'minecraft:mossy_cobblestone', 'minecraft:oak_leaves', 'minecraft:spruce_leaves', 'minecraft:jungle_leaves']
        ],
        "yellow": [
            ['rechiseled:sandstone_bricks', 'chipped:sandstone_33', 'chipped:sandstone_37', 'chipped:sandstone_67'],
            ['chipped:sandstone_41', 'chipped:sandstone_26', 'chipped:sandstone_34', 'chipped:sandstone_31'],
            ['minecraft:end_stone_bricks', 'chipped:end_stone_33', 'chipped:end_stone_37'],
            ['chipped:end_stone_8', 'chipped:end_stone_26', 'chipped:end_stone_34', 'chipped:end_stone_21'],
            ['domum_ornamentum:cream_stone_bricks'], 
            ['domum_ornamentum:beige_stone_bricks'],
            ['chipped:sandstone_7'],
            ['domum_ornamentum:cactus_extra']
        ],
        "orange": [
            ['bambooeverything:dry_bamboo_bundle'],
            ['create_confectionery:white_chocolate_bricks']
        ],
        "light_red": [
            ['chipped:magma_block_15', 'chipped:magma_block_37', 'chipped:magma_block_33', 'chipped:magma_block_67']
        ],
        "red": [
            ['minecraft:red_mushroom_block', 'chipped:red_mushroom_block_1', 'chipped:red_mushroom_block_2', 'chipped:red_mushroom_block_3', 'chipped:red_mushroom_block_4', 'chipped:red_mushroom_block_5', 'chipped:red_mushroom_block_11', 'chipped:red_mushroom_block_12', 'chipped:red_mushroom_block_13', 'chipped:red_mushroom_block_14', 'chipped:red_mushroom_block_15'],
            ['minecraft:nether_wart_block', 'chipped:nether_wart_block_6', 'chipped:nether_wart_block_7'],
            ['chipped:red_nether_bricks_7']
        ],
        "dark_red": [
            ['chipped:nether_bricks_7'], 
        ],
        "red_brown": [
            ['byg:red_rock_bricks', 'byg:cracked_red_rock_bricks', 'byg:mossy_red_rock_bricks'],
            ['create_confectionery:chocolate_bricks'],
            ['chipped:bricks_7']
        ],
        "brown": [
            ['minecraft:brown_mushroom_block', 'chipped:brown_mushroom_block_10', 'chipped:brown_mushroom_block_9', 'chipped:brown_mushroom_block_11', 'chipped:brown_mushroom_block_12'],
            ['minecraft:brown_mushroom_block', 'chipped:brown_mushroom_block_3', 'chipped:brown_mushroom_block_4', 'chipped:brown_mushroom_block_5', 'chipped:brown_mushroom_block_6'],
            ['chipped:dirt_7'],
            ['create:cut_ochrum_bricks'],
            ['chipped:granite_7'],
            ['tconstruct:mud_bricks'],
            ['chipped:granite_15', 'chipped:granite_37', 'chipped:granite_33'],
            ['chipped:granite_8', 'chipped:granite_26', 'chipped:granite_34', 'chipped:granite_31', 'chipped:granite_21']
        ],
        "dark_brown": [
            ['chipped:brown_terracotta_54', 'chipped:brown_terracotta_55'],
            ['create_confectionery:black_chocolate_bricks'],
        ],
        "gray_brown": [
            ['domum_ornamentum:brown_stone_bricks'],
        ],
        "white": [
            ['botania:livingrock_bricks', 'botania:cracked_livingrock_bricks', 'botania:mossy_livingrock_bricks'],
            ['chipped:diorite_15', 'chipped:diorite_33', 'chipped:diorite_37'],
            ['chipped:diorite_8', 'chipped:diorite_26', 'chipped:diorite_34', 'chipped:diorite_31', 'chipped:diorite_21'],
            ['chipped:calcite_15', 'chipped:calcite_33', 'chipped:calcite_37'],
            ['chipped:calcite_8', 'chipped:calcite_26', 'chipped:calcite_34', 'chipped:calcite_31', 'chipped:calcite_21'],
            ['create:cut_limestone_bricks'], 
            ['blue_skies:smooth_crystal_sandstone']
        ],
        "bright": [
            ['botania:sunny_quartz'],
            ['botania:mana_quartz'],
            ['botania:lavender_quartz'],
        ],
        "gray": [
            ['chipped:cobblestone_15', 'chipped:cobblestone_33', 'chipped:cobblestone_37', 'chipped:mossy_cobblestone_15', 'chipped:mossy_cobblestone_33', 'chipped:mossy_cobblestone_37', 'chipped:mossy_cobblestone_21'],
            ['minecraft:tuff'],
            ['minecraft:dead_tube_coral_block'], 
            ['minecraft:dead_brain_coral_block'], 
            ['minecraft:dead_bubble_coral_block'], 
            ['minecraft:dead_fire_coral_block'], 
            ['minecraft:dead_horn_coral_block'],
            ['chipped:stone_7', 'chipped:cobblestone_7', 'chipped:mossy_cobblestone_7', 'chipped:mossy_stone_bricks_7']
        ],
        "dark_gray": [
            ['minecraft:deepslate_bricks', 'minecraft:cracked_deepslate_bricks', 'chipped:deepslate_37'],
            ['minecraft:deepslate_tiles', 'minecraft:cracked_deepslate_tiles'],
            ['chipped:deepslate_8', 'chipped:deepslate_31', 'chipped:deepslate_33'],
            ['minecraft:cobbled_deepslate'],
        ],
        "special": [
            ['twilightforest:aurora_block'],
            ['compactmachines:wall']
        ]
    }

    for (let [color, types] of Object.entries(variants)) {
        for (let variant of types) {
            let filename = sanitizeName(variant[0])
            let damageTypes = {
                "": 0,
                "_damaged": Math.ceil(12/variant.length),
                "_badly_damaged": Math.ceil(96/variant.length),
            }

            for (const[name, weight] of Object.entries(damageTypes)) {
                let wall_blocks = []
                if(weight > 0) {
                    for (let block of variant.slice(1)) {
                        wall_blocks.push({
                            "random": weight,
                            "block": block
                        })
                    }
                }
                wall_blocks.push({
                    "random": 1000,
                    "block": variant[0]
                })

                eval($$.create('src/wall.json', out + '/palettes/wall_' + filename + name + '.json'))
                if(variant.length == 1) break
            }
        }
        if(color == "special") continue

        types = shuffleArray(types)
        for (let i=0;i<types.length-2;i+=3) {
            let wall_blocks = [{
                "random": 43,
                "block": types[i][0]
            }, {
                "random": 43,
                "block": types[i+1][0]
            }, {
                "random": 1000,
                "block": types[i+2][0]
            }]
            eval($$.create('src/wall.json', out + '/palettes/wall_random_' + color + '_' + (i/3) + '.json'))
        }
    }
})();

(function make_floor_structures() {require('./structure_generation/main.js')})();

eval($$.create('src/style.json', out + '/styles/standard.json'))

$$.clear('C:/Users/Aurif/curseforge/minecraft/Instances/All the Mods 7 - ATM7/kubejs/data/lostcities')
$$.clone(out, 'C:/Users/Aurif/curseforge/minecraft/Instances/All the Mods 7 - ATM7/kubejs/data/lostcities/lostcities')
console.log('Done!')