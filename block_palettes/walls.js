var { makePalette, allVariants } = require('./common.js')

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
        ['minecraft:moss_block', 'minecraft:mossy_stone_bricks', 'minecraft:mossy_cobblestone', 'minecraft:oak_leaves[persistent=true]', 'minecraft:spruce_leaves[persistent=true]', 'minecraft:jungle_leaves[persistent=true]']
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
let extraMapping = {
    "minecraft:polished_blackstone_bricks": {
        "slab": "minecraft:polished_blackstone_brick_slab",
        "wall": "minecraft:polished_blackstone_brick_wall",
        "stairs": "minecraft:polished_blackstone_brick_stairs"
    },
    "minecraft:cracked_polished_blackstone_bricks": {
        "slab": "minecraft:polished_blackstone_brick_slab",
        "wall": "minecraft:polished_blackstone_brick_wall",
        "stairs": "minecraft:polished_blackstone_brick_stairs"
    },
    "minecraft:blackstone": {
        "slab": "minecraft:blackstone_slab",
        "wall": "minecraft:blackstone_wall",
        "stairs": "minecraft:blackstone_stairs"
    },
    "chipped:blackstone": {
        "slab": "minecraft:blackstone_slab",
        "wall": "minecraft:blackstone_wall",
        "stairs": "minecraft:blackstone_stairs"
    },
    "blue_skies:lunar_stonebrick": {
        "slab": "blue_skies:lunar_stonebrick_slab",
        "wall": "blue_skies:lunar_stonebrick_wall",
        "stairs": "blue_skies:lunar_stonebrick_stairs"
    },
    "blue_skies:cracked_lunar_stonebrick": {
        "slab": "blue_skies:cracked_lunar_stonebrick_slab",
        "wall": "blue_skies:cracked_lunar_stonebrick_wall",
        "stairs": "blue_skies:cracked_lunar_stonebrick_stairs"
    },
    "blue_skies:mossy_lunar_stonebrick": {
        "slab": "blue_skies:mossy_lunar_stonebrick_slab",
        "wall": "blue_skies:mossy_lunar_stonebrick_wall",
        "stairs": "blue_skies:mossy_lunar_stonebrick_stairs"
    },
    "forbidden_arcanus:polished_darkstone_bricks": {
        "slab": "forbidden_arcanus:polished_darkstone_brick_slab",
        "wall": "forbidden_arcanus:polished_darkstone_brick_wall",
        "stairs": "forbidden_arcanus:polished_darkstone_brick_stairs"
    },
    "forbidden_arcanus:cracked_polished_darkstone_bricks": {
        "slab": "forbidden_arcanus:polished_darkstone_brick_slab",
        "wall": "forbidden_arcanus:polished_darkstone_brick_wall",
        "stairs": "forbidden_arcanus:polished_darkstone_brick_stairs"
    },
    "create:cut_scorchia_bricks": {
        "slab": "create:cut_scorchia_brick_slab",
        "wall": "create:cut_scorchia_brick_wall",
        "stairs": "create:cut_scorchia_brick_stairs"
    },
    "byg:soapstone_bricks": {
        "slab": "byg:soapstone_brick_slab",
        "wall": "byg:soapstone_brick_wall",
        "stairs": "byg:soapstone_brick_stairs"
    },
    "blue_skies:smooth_midnight_sandstone": {
        "slab": "blue_skies:smooth_midnight_sandstone_slab",
        "stairs": "blue_skies:smooth_midnight_sandstone_stairs",
        "wall": "blue_skies:midnight_sandstone_wall"
    },
    "botania:dark_quartz": {
        "slab": "botania:dark_quartz_slab",
        "stairs": "botania:dark_quartz_stairs"
    },
    "minecraft:obsidian": {
        "slab": "absentbydesign:slab_obsidian",
        "wall": "absentbydesign:wall_obsidian",
        "stairs": "absentbydesign:stairs_obsidian"
    },
    "ars_nouveau:arcane_bricks": {},
    "chipped:purpur_block": {
        "slab": "minecraft:purpur_slab",
        "wall": "absentbydesign:wall_purpur",
        "stairs": "minecraft:purpur_stairs"
    },
    "minecraft:purpur_block": {
        "slab": "minecraft:purpur_slab",
        "wall": "absentbydesign:wall_purpur",
        "stairs": "minecraft:purpur_stairs"
    },
    "create_confectionery:ruby_chocolate_bricks": {
        "slab": "create_confectionery:ruby_chocolate_brick_slab",
        "stairs": "create_confectionery:ruby_chocolate_brick_stairs"
    },
    "supplementaries:lapis_bricks": {
        "slab": "supplementaries:lapis_bricks_slab",
        "wall": "supplementaries:lapis_bricks_wall",
        "stairs": "supplementaries:lapis_bricks_stairs"
    },
    "byg:blue_nether_bricks": {
        "slab": "byg:blue_nether_brick_slab",
        "wall": "byg:blue_nether_brick_wall",
        "stairs": "byg:blue_nether_brick_stairs"
    },
    "chipped:packed_ice": {
        "slab": "blue_skies:polished_rimestone_slab",
        "stairs": "blue_skies:polished_rimestone_stairs",
        "wall": "blue_skies:polished_rimestone_wall"
    },
    "chipped:ice": {
        "slab": "blue_skies:polished_rimestone_slab",
        "stairs": "blue_skies:polished_rimestone_stairs",
        "wall": "blue_skies:polished_rimestone_wall"
    },
    "chipped:blue_ice": {
        "slab": "blue_skies:polished_rimestone_slab",
        "stairs": "blue_skies:polished_rimestone_stairs",
        "wall": "blue_skies:polished_rimestone_wall"
    },
    "create:cut_asurine_bricks": {
        "slab": "create:cut_asurine_brick_slab",
        "wall": "create:cut_asurine_brick_wall",
        "stairs": "create:cut_asurine_brick_stairs"
    },
    "chipped:prismarine": {
        "slab": "minecraft:prismarine_brick_slab",
        "wall": "absentbydesign:wall_prismarine_bricks",
        "stairs": "minecraft:prismarine_brick_stairs"
    },
    "chipped:dark_prismarine": {
        "slab": "minecraft:dark_prismarine_slab",
        "wall": "absentbydesign:wall_dark_prismarine",
        "stairs": "minecraft:dark_prismarine_stairs"
    },
    "create:cut_veridium_bricks": {
        "slab": "create:cut_veridium_brick_slab",
        "wall": "create:cut_veridium_brick_wall",
        "stairs": "create:cut_veridium_brick_stairs"
    },
    "minecraft:warped_wart_block": {
        "slab": "minecraft:warped_slab",
        "wall": "absentbydesign:wall_stripped_warped",
        "stairs": "minecraft:warped_stairs"
    },
    "chipped:warped_wart_block": {
        "slab": "minecraft:warped_slab",
        "wall": "absentbydesign:wall_stripped_warped",
        "stairs": "minecraft:warped_stairs"
    },
    "thermal:bamboo_block": {
        "slab": "bambooeverything:bamboo_slab",
        "stairs": "bambooeverything:bamboo_stairs",
        "wall": "bambooeverything:bamboo_fence"
    },
    "bambooeverything:bamboo_bundle": {
        "slab": "bambooeverything:bamboo_slab",
        "stairs": "bambooeverything:bamboo_stairs",
        "wall": "bambooeverything:bamboo_fence"
    },
    "domum_ornamentum:green_cactus_extra": {},
    "chipped:moss_block": {},
    "minecraft:moss_block": {},
    "minecraft:mossy_stone_bricks": {
        "slab": "minecraft:mossy_stone_brick_slab",
        "wall": "minecraft:mossy_stone_brick_wall",
        "stairs": "minecraft:mossy_stone_brick_stairs"
    },
    "minecraft:mossy_cobblestone": {
        "slab": "minecraft:mossy_cobblestone_slab",
        "wall": "minecraft:mossy_cobblestone_wall",
        "stairs": "minecraft:mossy_cobblestone_stairs"
    },
    "minecraft:oak_leaves": {},
    "minecraft:spruce_leaves": {},
    "minecraft:jungle_leaves": {},
    "rechiseled:sandstone_bricks": {
        "slab": "minecraft:smooth_sandstone_slab",
        "wall": "absentbydesign:wall_sandstone_smooth",
        "stairs": "minecraft:smooth_sandstone_stairs"
    },
    "chipped:sandstone": {
        "slab": "minecraft:sandstone_slab",
        "wall": "minecraft:sandstone_wall",
        "stairs": "minecraft:sandstone_stairs"
    },
    "minecraft:end_stone_bricks": {
        "slab": "minecraft:end_stone_brick_slab",
        "wall": "minecraft:end_stone_brick_wall",
        "stairs": "minecraft:end_stone_brick_stairs"
    },
    "chipped:end_stone": {
        "slab": "absentbydesign:slab_end_stone",
        "wall": "absentbydesign:wall_end_stone",
        "stairs": "absentbydesign:stairs_end_stone"
    },
    "domum_ornamentum:cream_stone_bricks": {},
    "domum_ornamentum:beige_stone_bricks": {},
    "domum_ornamentum:cactus_extra": {},
    "bambooeverything:dry_bamboo_bundle": {
        "slab": "bambooeverything:dry_bamboo_slab",
        "stairs": "bambooeverything:dry_bamboo_stairs",
        "wall": "bambooeverything:dry_bamboo_fence"
    },
    "create_confectionery:white_chocolate_bricks": {
        "slab": "create_confectionery:white_chocolate_bricks_slab",
        "stairs": "create_confectionery:white_chocolate_bricks_stairs"
    },
    "chipped:magma_block": {
        "slab": "absentbydesign:slab_magma",
        "wall": "absentbydesign:wall_magma",
        "stairs": "absentbydesign:stairs_magma"
    },
    "minecraft:red_mushroom_block": {
        "slab": "absentbydesign:slab_red_mushroom",
        "wall": "absentbydesign:wall_red_mushroom",
        "stairs": "absentbydesign:stairs_red_mushroom"
    },
    "chipped:red_mushroom_block": {
        "slab": "absentbydesign:slab_red_mushroom",
        "wall": "absentbydesign:wall_red_mushroom",
        "stairs": "absentbydesign:stairs_red_mushroom"
    },
    "minecraft:nether_wart_block": {},
    "chipped:nether_wart_block": {},
    "chipped:red_nether_bricks": {
        "slab": "minecraft:red_nether_brick_slab",
        "wall": "minecraft:red_nether_brick_wall",
        "stairs": "minecraft:red_nether_brick_stairs"
    },
    "chipped:nether_bricks": {
        "slab": "minecraft:nether_brick_slab",
        "wall": "minecraft:nether_brick_wall",
        "stairs": "minecraft:nether_brick_stairs"
    },
    "byg:red_rock_bricks": {
        "slab": "byg:red_rock_brick_slab",
        "wall": "byg:red_rock_brick_wall",
        "stairs": "byg:red_rock_brick_stairs"
    },
    "byg:cracked_red_rock_bricks": {
        "slab": "byg:cracked_red_rock_brick_slab",
        "wall": "byg:cracked_red_rock_brick_wall",
        "stairs": "byg:cracked_red_rock_brick_stairs"
    },
    "byg:mossy_red_rock_bricks": {
        "slab": "byg:mossy_red_rock_brick_slab",
        "wall": "byg:mossy_red_rock_brick_wall",
        "stairs": "byg:mossy_red_rock_brick_stairs"
    },
    "create_confectionery:chocolate_bricks": {
        "slab": "create_confectionery:chocolate_bricks_slab",
        "stairs": "create_confectionery:chocolate_bricks_stairs"
    },
    "chipped:bricks": {
        "slab": "minecraft:granite_slab",
        "wall": "minecraft:granite_wall",
        "stairs": "minecraft:granite_stairs"
    },
    "minecraft:brown_mushroom_block": {
        "slab": "absentbydesign:slab_brown_mushroom",
        "wall": "absentbydesign:wall_brown_mushroom",
        "stairs": "absentbydesign:stairs_brown_mushroom"
    },
    "chipped:brown_mushroom_block": {
        "slab": "absentbydesign:slab_brown_mushroom",
        "wall": "absentbydesign:wall_brown_mushroom",
        "stairs": "absentbydesign:stairs_brown_mushroom"
    },
    "chipped:dirt": {
        "slab": "botania:metamorphic_desert_stone_slab",
        "wall": "botania:metamorphic_desert_stone_wall",
        "stairs": "botania:metamorphic_desert_stone_stairs"
    },
    "create:cut_ochrum_bricks": {
        "slab": "create:cut_ochrum_brick_slab",
        "wall": "create:cut_ochrum_brick_wall",
        "stairs": "create:cut_ochrum_brick_stairs"
    },
    "chipped:granite": {
        "slab": "minecraft:granite_slab",
        "wall": "minecraft:granite_wall",
        "stairs": "minecraft:granite_stairs"
    },
    "tconstruct:mud_bricks": {
        "slab": "tconstruct:mud_bricks_slab",
        "stairs": "tconstruct:mud_bricks_stairs"
    },
    "chipped:brown_terracotta": {},
    "create_confectionery:black_chocolate_bricks": {
        "slab": "create_confectionery:black_chocolate_bricks_slab",
        "stairs": "create_confectionery:black_chocolate_bricks_stairs"
    },
    "domum_ornamentum:brown_stone_bricks": {},
    "botania:livingrock_bricks": {
        "slab": "botania:livingrock_bricks_slab",
        "wall": "botania:livingrock_bricks_wall",
        "stairs": "botania:livingrock_bricks_stairs"
    },
    "botania:cracked_livingrock_bricks": {},
    "botania:mossy_livingrock_bricks": {
        "slab": "botania:mossy_livingrock_bricks_slab",
        "wall": "botania:mossy_livingrock_bricks_wall",
        "stairs": "botania:mossy_livingrock_bricks_stairs"
    },
    "chipped:diorite": {
        "slab": "minecraft:diorite_slab",
        "wall": "minecraft:diorite_wall",
        "stairs": "minecraft:diorite_stairs"
    },
    "chipped:calcite": {
        "slab": "absentbydesign:slab_calcite",
        "wall": "absentbydesign:wall_calcite",
        "stairs": "absentbydesign:stairs_calcite"
    },
    "create:cut_limestone_bricks": {
        "slab": "create:cut_limestone_brick_slab",
        "wall": "create:cut_limestone_brick_wall",
        "stairs": "create:cut_limestone_brick_stairs"
    },
    "blue_skies:smooth_crystal_sandstone": {
        "slab": "blue_skies:smooth_crystal_sandstone_slab",
        "stairs": "blue_skies:smooth_crystal_sandstone_stairs"
    },
    "botania:sunny_quartz": {
        "slab": "botania:sunny_quartz_slab",
        "stairs": "botania:sunny_quartz_stairs"
    },
    "botania:mana_quartz": {
        "slab": "botania:mana_quartz_slab",
        "stairs": "botania:mana_quartz_stairs",
        "wall": "ae2:quartz_wall"
    },
    "botania:lavender_quartz": {
        "slab": "botania:lavender_quartz_slab",
        "stairs": "botania:lavender_quartz_stairs"
    },
    "chipped:cobblestone": {
        "slab": "minecraft:cobblestone_slab",
        "wall": "minecraft:cobblestone_wall",
        "stairs": "minecraft:cobblestone_stairs"
    },
    "chipped:mossy_cobblestone": {
        "slab": "minecraft:mossy_cobblestone_slab",
        "wall": "minecraft:mossy_cobblestone_wall",
        "stairs": "minecraft:mossy_cobblestone_stairs"
    },
    "minecraft:tuff": {
        "slab": "absentbydesign:slab_tuff",
        "wall": "absentbydesign:wall_tuff",
        "stairs": "absentbydesign:stairs_tuff"
    },
    "minecraft:dead_tube_coral_block": {
        "slab": "elementalcraft:whiterock_slab",
        "wall": "elementalcraft:whiterock_wall",
        "stairs": "elementalcraft:whiterock_stairs"
    },
    "minecraft:dead_brain_coral_block": {
        "slab": "elementalcraft:whiterock_slab",
        "wall": "elementalcraft:whiterock_wall",
        "stairs": "elementalcraft:whiterock_stairs"
    },
    "minecraft:dead_bubble_coral_block": {
        "slab": "elementalcraft:whiterock_slab",
        "wall": "elementalcraft:whiterock_wall",
        "stairs": "elementalcraft:whiterock_stairs"
    },
    "minecraft:dead_fire_coral_block": {
        "slab": "elementalcraft:whiterock_slab",
        "wall": "elementalcraft:whiterock_wall",
        "stairs": "elementalcraft:whiterock_stairs"
    },
    "minecraft:dead_horn_coral_block": {
        "slab": "elementalcraft:whiterock_slab",
        "wall": "elementalcraft:whiterock_wall",
        "stairs": "elementalcraft:whiterock_stairs"
    },
    "chipped:stone": {
        "slab": "minecraft:stone_slab",
        "wall": "utilitix:stone_wall",
        "stairs": "minecraft:stone_stairs"
    },
    "chipped:mossy_stone_bricks": {
        "slab": "minecraft:mossy_stone_brick_slab",
        "wall": "minecraft:mossy_stone_brick_wall",
        "stairs": "minecraft:mossy_stone_brick_stairs"
    },
    "minecraft:deepslate_bricks": {
        "slab": "minecraft:deepslate_brick_slab",
        "wall": "minecraft:deepslate_brick_wall",
        "stairs": "minecraft:deepslate_brick_stairs"
    },
    "minecraft:cracked_deepslate_bricks": {
        "slab": "absentbydesign:slab_cracked_deepslate_bricks",
        "wall": "absentbydesign:wall_cracked_deepslate_bricks",
        "stairs": "absentbydesign:stairs_cracked_deepslate_bricks"
    },
    "chipped:deepslate": {
        "slab": "create:cut_deepslate_slab",
        "wall": "create:cut_deepslate_wall",
        "stairs": "create:cut_deepslate_stairs"
    },
    "minecraft:deepslate_tiles": {
        "slab": "minecraft:deepslate_tile_slab",
        "wall": "minecraft:deepslate_tile_wall",
        "stairs": "minecraft:deepslate_tile_stairs"
    },
    "minecraft:cracked_deepslate_tiles": {
        "slab": "absentbydesign:slab_cracked_deepslate_tiles",
        "wall": "absentbydesign:wall_cracked_deepslate_tiles",
        "stairs": "absentbydesign:stairs_cracked_deepslate_tiles"
    },
    "minecraft:cobbled_deepslate": {
        "slab": "minecraft:cobbled_deepslate_slab",
        "wall": "minecraft:cobbled_deepslate_wall",
        "stairs": "minecraft:cobbled_deepslate_stairs"
    },
    "twilightforest:aurora_block": {
        "slab": "twilightforest:aurora_slab",
        "wall": "absentbydesign:wall_stripped_warped",
        "stairs": "securitycraft:crystal_quartz_stairs"
    },
    "compactmachines:wall": {}
}

function makeSubBlock(wallBlocks, type, suffix) {
    let result = []
    for(let block of wallBlocks) {
        let name = block.block.replace(/_\d+/g, '').replace(/(\[.*\])/g, '')
        if(!extraMapping[name] || !extraMapping[name][type]) continue

        result.push({
            "block": extraMapping[name][type] + suffix,
            "random": block.random
        })
    }

    if(result.length != 0) {
        result[result.length-1]["random"] = 1000
        return {"blocks": result}
    }

    let mainBlock = wallBlocks[wallBlocks.length-1].block
    let miniMapping = {"slab": "domum_ornamentum:vanilla_slab_compat", "stairs": "domum_ornamentum:vanilla_stairs_compat", "wall": "domum_ornamentum:vanilla_wall_compat"}
    return {
        "block": miniMapping[type] + suffix,
        "tag": {
            "textureData": {"minecraft:block/oak_planks": mainBlock},
        }
    }
}

function makeWallVariants() {
    for (let [color, types] of Object.entries(variants)) {
        for (let variant of types) {
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

                eval(makePalette('wall'))
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
            eval(makePalette('wall', 'wall_random'))
        }
    }
}

module.exports = makeWallVariants