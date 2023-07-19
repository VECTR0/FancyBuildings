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

function makeSingleBlockPallete(name, char, pallettes) {
    for(let p in pallettes) {
        let palette = pallettes[p]
        if(typeof palette == 'string') palette = [palette]
        if(typeof palette[0] == 'string') palette = [1, ...palette]

        let blocks = palette.slice(1).map(block => ({
            "random": Math.ceil(128/(palette.length-1)),
            "block": block
        }))
        let factor = palette[0]
        eval(makePalette('single_block_palette', name))
    }
}

module.exports = {allVariants, makePalette, makeSingleBlockPallete} 