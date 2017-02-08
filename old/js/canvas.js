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
  }

  function create(u) {
    var domContainer = document.getElementById('mainContent');
    var bounds = new Phaser.Rectangle(game.world.centerX - domContainer.offsetWidth / 2, 152, domContainer.offsetWidth, 400);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;
    //  Some balls to collide with

    customBounds = { left: null, right: null, top: null, bottom: null };

    createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    //  Just to display the bounds
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.drawRect(0, 0, bounds.width, bounds.height);

    cursors = game.input.keyboard.createCursorKeys();
  }

  function update() {
    if (bot) {
      bot.x -= 2;

      if (bot.x < game.world.centerX - 500) {
        bot.x = game.world.centerX + 500;
      }
    }
  };

  window.game = this;

  window.game.createBot = function () {
    bot = game.add.sprite(game.world.centerX, 152, 'bot');
    bot.anchor.setTo(0.5, 1);
    bot.animations.add('run');
    bot.animations.play('run', 15, true);
  };
};