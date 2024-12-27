class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene'})
    }
    preload() {
        this.load.image('bg', 'media/images/space.jpg');
    }
    
    create() {
        let bg = this.add.image(0, 0, 'bg');
        //sets camera dimensions to fit image properly
       const width = this.game.config.width;
       const height = this.game.config.height;
       //set scale of bacground to fit the camera view
       bg.setDisplaySize(width, height);
       //Center background on screen
       Phaser.Display.Align.In.Center(bg, this.cameras.main);
    }
};

