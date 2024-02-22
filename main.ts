function spawnZ () {
    spawnZombies = tiles.getTilesByType(sprites.dungeon.collectibleInsignia)
    enmieList = [img`
        . . . . . . f f f . . . . . . . 
        . . . . . f b b b f . . . . . . 
        . . . . f b b 2 b b f . . . . . 
        . . . f b b 2 2 2 b b f . . . . 
        . . . f b 2 2 2 2 2 b f . . . . 
        . . . . f b 2 2 2 b f . . . . . 
        . . . . . f b b b f . . . . . . 
        . . . . . . f b f . . . . . . . 
        . . . . f f b b b f f . . . . . 
        . . . f b b f b f b b f . . . . 
        . . . . f f f b f f f . . . . . 
        . . . . . . f b f . . . . . . . 
        . . . . . f b b b f . . . . . . 
        . . . . f b f f f b f . . . . . 
        . . . f b f . . . f b f . . . . 
        . . . f b f . . . f b f . . . . 
        `, img`
        . . . . . . f f f . . . . . . . 
        . . . . . f 4 4 4 f . . . . . . 
        . . . . f 4 4 2 4 4 f . . . . . 
        . . . f 4 4 2 2 2 4 4 f . . . . 
        . . . f 4 2 2 2 2 2 4 f . . . . 
        . . . . f 4 2 2 2 4 f . . . . . 
        . . . . . f 4 4 4 f . . . . . . 
        . . . . . . f 4 f . . . . . . . 
        . . . . f f 4 4 4 f f . . . . . 
        . . . f 4 4 f 4 f 4 4 f . . . . 
        . . . . f f f 4 f f f . . . . . 
        . . . . . . f 4 f . . . . . . . 
        . . . . . f 4 4 4 f . . . . . . 
        . . . . f 4 f f f 4 f . . . . . 
        . . . f 4 f . . . f 4 f . . . . 
        . . . f 4 f . . . f 4 f . . . . 
        `, img`
        . . . . . . f f f . . . . . . . 
        . . . . . f 2 2 2 f . . . . . . 
        . . . . f 2 2 9 2 2 f . . . . . 
        . . . f 2 2 9 9 9 2 2 f . . . . 
        . . . f 2 9 9 9 9 9 2 f . . . . 
        . . . . f 2 9 9 9 2 f . . . . . 
        . . . . . f 2 2 2 f . . . . . . 
        . . . . . . f 2 f . . . . . . . 
        . . . . f f 2 2 2 f f . . . . . 
        . . . f 2 2 f 2 f 2 2 f . . . . 
        . . . . f f f 2 f f f . . . . . 
        . . . . . . f 2 f . . . . . . . 
        . . . . . f 2 2 2 f . . . . . . 
        . . . . f 2 f f f 2 f . . . . . 
        . . . f 2 f . . . f 2 f . . . . 
        . . . f 2 f . . . f 2 f . . . . 
        `]
    zombies = sprites.create(enmieList._pickRandom(), SpriteKind.Enemy)
    tiles.placeOnRandomTile(zombies, sprites.dungeon.collectibleInsignia)
    zombies.follow(warrior, 40)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -25
    pause(500)
})
let zombies: Sprite = null
let enmieList: Image[] = []
let spawnZombies: tiles.Location[] = []
let statusbar: StatusBarSprite = null
let warrior: Sprite = null
tiles.loadMap(tiles.createMap(tilemap`level0`))
warrior = sprites.create(img`
    . . . . . . f f f . . . . . . . 
    . . . . . 2 2 2 2 2 . . . . . . 
    . . . . f b b b b b f . . . . . 
    . . . f b b 9 b 9 b b f . . . . 
    . . . f b b b b b b b f . . . . 
    . . . . f b b b b b f . . . 9 9 
    . . . . . f b b b f . . . 9 9 9 
    . . . . . . f b f . . . 9 9 9 . 
    . . . . f f b b b f f e e 9 . . 
    . . . f b b f b f b b f e . . . 
    . . . . f f f b f f f . . . . . 
    . . . . . . f b f . . . . . . . 
    . . . . . f b b b f . . . . . . 
    . . . . f b f f f b f . . . . . 
    . . . f b f . . . f b f . . . . 
    . . . f b f . . . f b f . . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(warrior, tiles.getTileLocation(7, 7))
scene.cameraFollowSprite(warrior)
controller.moveSprite(warrior, 75, 75)
statusbar = statusbars.create(100, 5, StatusBarKind.Health)
statusbar.max = 300
statusbar.value = 300
statusbar.positionDirection(CollisionDirection.Top)
statusbar.setColor(7, 2)
for (let index = 0; index < 10; index++) {
    spawnZ()
}
