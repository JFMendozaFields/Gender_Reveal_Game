const gameState = {
    score: 0,
    currentEnemyWave: 1, 
    cam: {},
    totalWaveCount: 3,
    currentMusic: {}
};

//Gameplay Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        //Preload images
        this.load.image('bg', 'media/images/ombre.png');
        this.load.image('BShip', 'media/images/large-ship.png');
        this.load.image('Enemy1', 'media/images/saucer-ship.png');
        this.load.image('Enemy2', 'media/images/bobafet-ship.png');
        this.load.image('Aship', 'media/images/tiny-ship.png');
        this.load.image('star', 'media/images/tiny-star.png');
        this.load.image('bullet', 'media/images/redbullet.png');

        //Preload Game Music
        //this.load.audio()

        //Preload Game SFX
        //this.load.audio()
    }

    create() {
        //stop, assign and play new music
        //gameState.currentMusic.stop();
        //gameState.currentMusic = this.sound.add('gameMusic');
        //gameState.currentMusic.play({ loop: true });

        //Assign SFX

        //Create Background
        let bg = this.add.image(0, 0, 'bg');
        const width = this.game.config.width;
        const height = this.game.config.height;
        bg.setDisplaySize(width, height);
        bg.setOrigin(0, 0); // sets origin to the top-left of corner
        bg.setPosition(0, 0); // Positions it at the top-left corner

        // Setting up Camera Midpoint
        gameState.cam.midpoint = { x: width / 2, y: height / 2 };

        //sets up sprites
        gameState.player = this.add.sprite(gameState.cam.midpoint.x, 400, 'BShip').setScale(0.5);

        //Cursor Keys Creation
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Create Bullets GROUP
        gameState.projectiles = this.physics.add.group();
    }

    update() {
        //Player Movement
        if (gameState.cursors.left.isDown) {
            gameState.player.x -= 5;
        } else if (gameState.cursors.right.isDown) {
            gameState.player.x += 5;
        }

        if (gameState.cursors.up.isDown) {
            gameState.player.y -= 5;
        } else if (gameState.cursors.down.isDown) {
            gameState.player.y += 5;
        }

        if (Phaser.Input.Keyboard.JustDown(gameState.spacebar)) {
            this.launchProjectiles();
        }
    }

    launchProjectiles() {
        // Create two projectiles slightly in front of the player
        const leftProjectile = this.physics.add.sprite(gameState.player.x - 10, gameState.player.y - 20, 'bullet').setScale(1.5);
        const rightProjectile = this.physics.add.sprite(gameState.player.x + 10, gameState.player.y - 20, 'bullet').setScale(1.5);

        // Set velocity for both projectiles
        leftProjectile.setVelocityY(-300);
        rightProjectile.setVelocityY(-300);

        // Add projectiles to the group
        gameState.projectiles.add(leftProjectile);
        gameState.projectiles.add(rightProjectile);
    }
}