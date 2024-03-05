namespace SpriteKind {
    export const attack = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (characterAnimations.matchesRule(warrior, characterAnimations.rule(Predicate.FacingUp))) {
        attack = sprites.create(img`
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . 9 9 9 9 9 . . . . . . 
            . . . . 9 9 9 . 9 9 9 . . . . . 
            . . . 9 9 9 . . . 9 9 9 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 9 . . . . . . . . 
            . . . . . . . 9 . . . . . . . . 
            . . . . . . . 9 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.attack)
        attack.setPosition(warrior.x, warrior.y - 10)
        timer.after(85, function () {
            sprites.destroy(attack)
        })
    } else if (characterAnimations.matchesRule(warrior, characterAnimations.rule(Predicate.FacingRight))) {
        attack = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . 9 . . . 
            . . . . . . . . . . . . 9 9 . . 
            . . . . . . . . . . . . 9 9 9 . 
            . . . . . . . . . . . . . 9 9 9 
            . . . . . . 9 9 9 . . . . . 9 9 
            . . . . . . . . . . . . . 9 9 9 
            . . . . . . . . . . . . 9 9 9 . 
            . . . . . . . . . . . . 9 9 . . 
            . . . . . . . . . . . . 9 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.attack)
        attack.setPosition(warrior.x + 10, warrior.y)
        timer.after(85, function () {
            sprites.destroy(attack)
        })
    } else {
        if (characterAnimations.matchesRule(warrior, characterAnimations.rule(Predicate.FacingLeft))) {
            attack = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 9 . . . . . . . . . . . . 
                . . 9 9 . . . . . . . . . . . . 
                . 9 9 9 . . . . . . . . . . . . 
                9 9 9 . . . . . . . . . . . . . 
                9 9 . . . . . . . . . . . . . . 
                9 9 9 . . . 9 9 9 . . . . . . . 
                . 9 9 9 . . . . . . . . . . . . 
                . . 9 9 . . . . . . . . . . . . 
                . . . 9 . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.attack)
            attack.setPosition(warrior.x - 10, warrior.y)
            timer.after(85, function () {
                sprites.destroy(attack)
            })
        } else if (characterAnimations.matchesRule(warrior, characterAnimations.rule(Predicate.FacingDown))) {
            attack = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . 9 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 9 9 9 . . . 9 9 9 . . . . 
                . . . . 9 9 9 . 9 9 9 . . . . . 
                . . . . . 9 9 9 9 9 . . . . . . 
                . . . . . . 9 9 9 . . . . . . . 
                `, SpriteKind.attack)
            attack.setPosition(warrior.x, warrior.y + 10)
            timer.after(85, function () {
                sprites.destroy(attack)
            })
        }
    }
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    statusbar.value += 200
    sprites.destroy(medkit)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    statusbar.value += 200
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    warriorDown += -1
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.attack, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(zombies, effects.rings, 500)
    statusbar2.value += -25
    sprites.destroy(otherSprite)
    info.changeScoreBy(-1)
    CEnemies += -1
})
function healUp (col: number, row: number) {
    medkit = sprites.create(img`
        . . . . . . . e c 7 . . . . . . 
        . . . . e e e c 7 7 e e . . . . 
        . . c e e e e c 7 e 2 2 e e . . 
        . c e e e e e c 6 e e 2 2 2 e . 
        . c e e e 2 e c c 2 4 5 4 2 e . 
        c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
        c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
        . e e e 2 2 2 2 2 2 2 2 2 4 e . 
        . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
        . . 2 e e 2 2 2 2 2 4 4 2 e . . 
        . . . 2 2 e e 4 4 4 2 e e . . . 
        . . . . . 2 2 e e e e . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(medkit, sprites.castle.tileGrass2)
}
function spawnZ (num: number) {
    for (let index = 0; index < num; index++) {
        spawnZombies = tiles.getTilesByType(sprites.dungeon.collectibleInsignia)
        enmieList = [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . 2 . 2 . . . . . . . 
            . . . . . 2 . 2 . 2 . . . . . . 
            . . . . . 2 . . . 2 . . . . . . 
            . . . . . 2 2 . 2 2 . . . . . . 
            . . . . 2 . 2 2 2 . 2 . . . . . 
            . . . 2 . 2 . 2 . 2 . 2 . . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            . . . . 2 . 2 2 2 . 2 . . . . . 
            . . . . . 2 2 . 2 2 . . . . . . 
            . . . . . 2 . 2 . 2 . . . . . . 
            . . . . . 2 . . . 2 . . . . . . 
            . . . . . . 2 . 2 . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . 8 . . 8 . . . . . . 
            . . . 8 8 8 . . 8 . 8 8 8 . . . 
            . . 8 . . 8 8 . . 8 8 . . 8 . . 
            . 8 . . 8 . 8 8 8 8 . . 8 . 8 . 
            . . 8 . . 8 8 . . 8 8 . . 8 . . 
            . . . 8 8 8 . . 8 . 8 8 8 . . . 
            . . . . . . 8 . . 8 . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 4 4 . . . . 4 4 . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . 4 . 4 . . 4 . 4 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `]
        zombies = sprites.create(enmieList._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnRandomTile(zombies, sprites.dungeon.collectibleInsignia)
        zombies.follow(warrior, 20)
        statusbar2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar2.max = 50
        statusbar2.attachToSprite(zombies)
        if (warriorDown != 0) {
            game.setGameOverScoringType(game.ScoringType.HighScore)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -25
    pause(1000)
})
let level = 0
let enmieList: Image[] = []
let spawnZombies: tiles.Location[] = []
let CEnemies = 0
let statusbar2: StatusBarSprite = null
let zombies: Sprite = null
let medkit: Sprite = null
let attack: Sprite = null
let warriorDown = 0
let statusbar: StatusBarSprite = null
let warrior: Sprite = null
tiles.loadMap(tiles.createMap(tilemap`level0`))
tiles.placeOnTile(warrior, tiles.getTileLocation(7, 7))
warrior = sprites.create(img`
    . . . . . . f f f . . . . . . . 
    . . . . . 2 2 2 2 2 . . . . . . 
    . . . . f b b b b b f . . . . . 
    . . . f b d d b d d b f . . . . 
    . . . f b b d b d b b f . . . . 
    . . . . f b b b b b f . . . 5 5 
    . . . . . f b d b f . . . 5 5 5 
    . . . . . . f b f . . . 5 5 5 . 
    . . . . f f b b b f f e e 5 . . 
    . . . f b b f b f b b f e . . . 
    . . . . f f f b f f f . . . . . 
    . . . . . . f b f . . . . . . . 
    . . . . . f b b b f . . . . . . 
    . . . . f b f f f b f . . . . . 
    . . . f b f . . . f b f . . . . 
    . . . f b f . . . f b f . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(warrior)
controller.moveSprite(warrior, 75, 75)
statusbar = statusbars.create(100, 5, StatusBarKind.Health)
statusbar.max = 300
statusbar.value = 300
statusbar.positionDirection(CollisionDirection.Top)
statusbar.setColor(7, 2)
let numZ = 10
healUp(1, 1)
warriorDown = 0
forever(function () {
    if (CEnemies == 0) {
        info.setScore(numZ)
        level = 0
        CEnemies = numZ
        numZ += 2
        spawnZ(numZ)
    }
})
