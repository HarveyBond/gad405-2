const mainState = {

  create: function() {
    game.state.backgroundColor = '#2d2d2d';
    this.ship = game.add.sprite(400,550, 'ship');
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.aliens = game.add.group();
    this.aliens.enableBody = true;
    this.aliens.PhysicsBodyType = Phaser.Physics.ARCADE;

     for (let i = 0; i < 48; i++){
     let a = this.aliens.create(
      100 + (i % 8) * 80,
      80 + Math.floor(i/8) * 60,
      'enemy'
    );
    }


    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.PhysicsBodyType = Phaser.Physics.ARCADE;

      for (let i = 0; i < 20; i++) {
      let b = this.bullets.create(0, 0,'bullet');
      b.visable = false;
      b.exists = false;
      b.checkWorldBounds = true;
      b.events.onOutOfBounds.add((bullet) => {bullet.kill(); });
    }

    this.bulletTime = 0;

    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

   },

  fire: function () {

    if(game.time.now > this.bulletTime){
     let bullet = this.bullets.getFirstExists(false);
     if (bullet !=null)  {
       console.log('fire');
      bullet.reset(this.ship.x, this.ship.y);
      bullet.body.velocity.y = -300
      this.bulletTIme = this.time.now + 175;
     }
   }

  },

  preload: function() {

   game.load.image('ship','assets/ship.png');
   game.load.image('enemy','assets/enemy.png');
   game.load.image('bullet','assets/bullet.png');
   game.load.audio('fire','assets/fire.mp3');

  },


  hit: function(bullets, aliens) {
    bullets.kill();
    aliens.kill();

  },
  update: function() {
    game.physics.arcade.overlap(this.bullets, this.aliens, this.hit, null, this);

     if(this.cursors.left.isDown) {
      this.ship.body.velocity.x = -300;
    } else if (this.cursors.right.isDown) {
      this.ship.body.velocity.x = 300;
    } else {
      this.ship.body.velocity.x = 0;
    }
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.fire()
        }



    }
  };




const gameOverState={
  create: function(){},
  preload: function(){}
};

const game = new Phaser.Game(800,600)
   game.state.add('main', mainState);
   game.state.add('gameover',gameOverState);
   game.state.start('main');
