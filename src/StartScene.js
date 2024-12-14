class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene'})
    }
    preload() {
        this.load.image('star', 'media/images/star.jpg')
    }
    
    create() {
        this.add.image(400, 300, 'star');
    }
    
};

