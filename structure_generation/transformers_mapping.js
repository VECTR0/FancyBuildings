let mappingRotate = {
    "s": "d",
    "S": "D",
    "d": "S",
    "D": "s",
    "⇊": "⇇",
    "⇈": "⇉",
    "⇇": "⇈",
    "⇉": "⇊"
}
let mappingFlipX = {
    "d": "D",
    "D": "d",
    "⇇": "⇉",
    "⇉": "⇇"
}
let mappingFlipY = {
    "s": "S",
    "S": "s",
    "⇊": "⇈",
    "⇈": "⇊"
}

module.exports = {mappingFlipX, mappingFlipY, mappingRotate}