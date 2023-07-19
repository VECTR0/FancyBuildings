var { makePalette, allVariants } = require('./common.js')


class Mob {
    static fromString(str) {
        return {"id": str, "DeathLootTable": "minecraft:empty"}
    }
}

function makeSpawnerPalette(mobs) {
    mobs = mobs.map(Mob.fromString)
    eval(makePalette('spawner'))
}

makeSpawnerPalette(["minecraft:creeper", "creeperoverhaul:jungle_creeper", "creeperoverhaul:bamboo_creeper", "creeperoverhaul:desert_creeper", "creeperoverhaul:badlands_creeper", "creeperoverhaul:hills_creeper", "creeperoverhaul:savannah_creeper", "creeperoverhaul:mushroom_creeper"])
makeSpawnerPalette(["creeperoverhaul:swamp_creeper", "creeperoverhaul:dripstone_creeper", "creeperoverhaul:cave_creeper", "creeperoverhaul:dark_oak_creeper", "creeperoverhaul:spruce_creeper", "creeperoverhaul:beach_creeper", "creeperoverhaul:snowy_creeper"])
makeSpawnerPalette(["minecraft:blaze", "thermal:basalz", "thermal:blizz", "thermal:blitz"])
makeSpawnerPalette(["minecraft:skeleton", "minecraft:wither_skeleton", "twilightforest:skeleton_druid", "minecraft:stray"])
makeSpawnerPalette(["blue_skies:whistleshell_crab", "twilightforest:helmet_crab"])
makeSpawnerPalette(["minecraft:wither_skeleton", "minecraft:blaze", "minecraft:zombified_piglin"])
makeSpawnerPalette(["minecraft:zombie", "minecraft:husk", "minecraft:drowned", "minecraft:zombie_villager"])
makeSpawnerPalette(["minecraft:zombie", "minecraft:skeleton", "minecraft:spider"])
makeSpawnerPalette(["minecraft:cave_spider", "minecraft:spider", "blue_skies:venom_spider", "blue_skies:nested_spider", "twilightforest:hedge_spider", "twilightforest:swarm_spider", "twilightforest:carminite_broodling"])
makeSpawnerPalette(["ars_nouveau:wilden_hunter", "twilightforest:hostile_wolf", "twilightforest:mist_wolf", "twilightforest:winter_wolf"])
makeSpawnerPalette(["twilightforest:mosquito_swarm", "minecraft:silverfish", "minecraft:endermite", "twilightforest:towerwood_borer", "evilcraft:netherfish"])
makeSpawnerPalette(["twilightforest:redcap", "twilightforest:redcap_sapper"])
makeSpawnerPalette(["minecraft:witch", "minecraft:evoker", "minecraft:vindicator", "minecraft:pillager"])
makeSpawnerPalette(["twilightforest:stable_ice_core", "twilightforest:ice_crystal", "creeperoverhaul:snowy_creeper", "twilightforest:stable_ice_core", "twilightforest:ice_crystal", "creeperoverhaul:snowy_creeper", "twilightforest:unstable_ice_core"])
makeSpawnerPalette(["twilightforest:death_tome"])
makeSpawnerPalette(["blue_skies:emberback", "blue_skies:nyctofly", "twilightforest:fire_beetle", "twilightforest:pinch_beetle", "twilightforest:slime_beetle"])