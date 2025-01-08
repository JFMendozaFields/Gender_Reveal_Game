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
        this.load.image('bullet', 'media/images/bullet.png');
        this.load.image('enemyBullet', 'media/images/eBullet.png');

        //Preload Game Music
        //this.load.audio()

        //Preload Game SFX
        //this.load.audio()
    }

    create() {
        //stop, assign and play new music
        // if (gameState.currentMusic.stop) {
        //    gameState.currentMusic.stop();
        // }
        // gameState.currentMusic = this.sound.add('gameMusic');
        // gameState.currentMusic.play({ loop: true });

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

        //sets up player sprite
        gameState.player = this.physics.add.sprite(gameState.cam.midpoint.x, 400, 'BShip').setScale(0.5);
        gameState.player.setCollideWorldBounds(true);

        // enemy sprites
        gameState.enemies = this.physics.add.group();
        
        //Cursor Keys Creation
        gameState.cursors = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        }
        gameState.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        // Create initial enemies
        this.spawnEnemies();


        //Create projectiles and enemy projectiles GROUP
        gameState.projectiles = this.physics.add.group({
            defaultKey: 'bullet'
        });

    
        //Colliders 
        this.physics.add.collider(gameState.enemies, gameState.projectiles, function(enemy, projectile) {
            enemy.destroy();
            projectile.destroy();
            gameState.score += 10;
        });
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
            this.fireProjectile();
        }
    }

    //function to fire projectiles
    fireProjectile() {
        const leftBullet = gameState.projectiles.create(gameState.player.x - 10, gameState.player.y - 10, 'bullet').setScale(0.10);
        const rightBullet = gameState.projectiles.create(gameState.player.x + 10, gameState.player.y - 10, 'bullet').setScale(0.10);

        leftBullet.setVelocityY(-400);
        rightBullet.setVelocityY(-400);
    }

    //function to spawn enemies
    spawnEnemies() {
        // set how many enemies to spawn in current wave
        const numEnemies = Phaser.Math.Between(3, 5);

        // Spawn Enemies
        for (let i = 0; i < numEnemies; i++) {
            const enemyType = Phaser.Math.Between(1, 2); // Randomly pick between 1 and 2
            const enemyX = Phaser.Math.Between(50, this.game.config.width - 50); // Random X position
            const enemyY = Phaser.Math.Between(-100, this.game.config.height / 3 - 50); // spawn position above screen
        
            let enemy;

            if (enemyType === 1) {
                enemy = gameState.enemies.create(enemyX, enemyY, 'Enemy1').setScale(0.5);
            }
            else {
                enemy = gameState.enemies.create(enemyX, enemyY, 'Enemy2').setScale(0.5);
            }
            
            // Sets random vertical speed for enemy
            const randomVerticalSpeed = Phaser.Math.Between(50, 100);
            enemy.setVelocityY(randomVerticalSpeed);
            
            // Sets random horizontal speed for enemy
            const randomHorizontalSpeed = Phaser.Math.Between(-100, -50);
            enemy.setVelocityX(randomHorizontalSpeed); 

            // Ensures stays withing the top half of the screen
            enemy.setBounce(1, 1); // makes enenmy bounce when hitting world bounds
            enemy.setCollideWorldBounds(true); // ensures enemy collides with world bounds
            // Increase the wave count
            gameState.currentEnemyWave +=1;
        }
    }
}
console.log(Phaser.VERSION)