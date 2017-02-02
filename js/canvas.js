window.onload = function () {

  var game = new Phaser.Game('100', '100', Phaser.AUTO, 'backdrop-canvas', { preload: preload, create: create, update: update }, true);
  var bot;

  function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.setShowAll();
    window.addEventListener('resize', function () {
      game.scale.refresh();
    });
    game.scale.refresh();
    game.load.atlasJSONHash('bot', 'res/assets/running_bot.png', 'res/assets/running_bot.json');
    game.load.image('ball', 'res/assets/shinyball.png');
  }

  function create(u) {
    var domContainer = document.getElementById('mainContent');
    var bounds = new Phaser.Rectangle(game.world.centerX - domContainer.offsetWidth / 2, 152, domContainer.offsetWidth, 400);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;
    //  Some balls to collide with
    balls = game.add.physicsGroup(Phaser.Physics.P2JS);

    for (var i = 0; i < 20; i++) {
      var ball = balls.create(bounds.randomX, bounds.randomY, 'ball');
      ball.body.setCircle(16);
    }

    customBounds = { left: null, right: null, top: null, bottom: null };

    createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    //  Just to display the bounds
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.drawRect(0, 0, bounds.width, bounds.height);

    cursors = game.input.keyboard.createCursorKeys();
  }

  function createPreviewBounds(x, y, w, h) {

    var sim = game.physics.p2;

    //  If you want to use your own collision group then set it here and un-comment the lines below
    var mask = sim.boundsCollisionGroup.mask;

    customBounds.left = new p2.Body({ mass: 0, position: [sim.pxmi(x), sim.pxmi(y)], angle: 1.5707963267948966 });
    customBounds.left.addShape(new p2.Plane());
    // customBounds.left.shapes[0].collisionGroup = mask;

    customBounds.right = new p2.Body({ mass: 0, position: [sim.pxmi(x + w), sim.pxmi(y)], angle: -1.5707963267948966 });
    customBounds.right.addShape(new p2.Plane());
    // customBounds.right.shapes[0].collisionGroup = mask;

    customBounds.top = new p2.Body({ mass: 0, position: [sim.pxmi(x), sim.pxmi(y)], angle: -3.141592653589793 });
    customBounds.top.addShape(new p2.Plane());
    // customBounds.top.shapes[0].collisionGroup = mask;

    customBounds.bottom = new p2.Body({ mass: 0, position: [sim.pxmi(x), sim.pxmi(y + h)] });
    customBounds.bottom.addShape(new p2.Plane());
    // customBounds.bottom.shapes[0].collisionGroup = mask;

    sim.world.addBody(customBounds.left);
    sim.world.addBody(customBounds.right);
    sim.world.addBody(customBounds.top);
    sim.world.addBody(customBounds.bottom);

  }



  window.game = this;
  window.game.createBot = function () {
    bot = game.add.sprite(game.world.centerX, 152, 'bot');
    bot.anchor.setTo(0.5, 1);
    bot.animations.add('run');
    bot.animations.play('run', 15, true);
  }

  function update() {
    if (bot) {
      bot.x -= 2;

      if (bot.x < game.world.centerX - 500) {
        bot.x = game.world.centerX + 500;
      }
    }
  }
};