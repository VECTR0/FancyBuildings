module.exports = {
    FLOOR_COUNT: 100,
    SIDE_EFFECT_REGULARIZATION(createdWalls, createdSpaces) {return Math.sqrt(createdWalls+createdSpaces/4)/3}
}