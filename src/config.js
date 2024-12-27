

/* CONFIGURATION */
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#800080', // Purple Background
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scale: {
        mode: Phaser.Scale.FIT, // Adjust game size to fit
        autoCenter: Phaser.Scale.CENTER_BOTH // Center game on the Screen
    },
    scene: [ GameScene ] // ensures scene registration
};

// Initializes the Phaser Game with the Configurations
let game = new Phaser.Game(config);
