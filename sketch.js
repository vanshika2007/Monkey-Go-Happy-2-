var monkeyrun,
  monkey,
  back_img,
  back,
  bananaimg,
  banana,
  stoneimg,
  stone,
  bgroup,
  ogroup,
  monkeystop,
  monkeys,
  invisibleground,
  count,
  play = 1,
  end = 0,
  gamestates = play;

function preload() {
  monkeyrun = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  back_img = loadImage("jungle.jpg");
  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("obstacle.png");
  monkeystop = loadImage("sprite_0.png");
}

function setup() {
  createCanvas(600, 200);

  back = createSprite(310, 50, 600, 160);
  back.addImage("back", back_img);
  back.scale = 0.68;

  monkey = createSprite(50, 160, 15, 15);
  monkey.addAnimation("run", monkeyrun);
  monkey.scale = 0.1;

  banana = createSprite(300, 100);
  banana.addImage("food", bananaimg);
  banana.scale = 0.07;
  banana.visible = false;

  stone = createSprite(300, 180);
  stone.addImage("obstacle", stoneimg);
  stone.scale = 0.07;
  stone.visible = false;

  invisibleground = createSprite(300, 195, 600, 10);
  invisibleground.visible = false;

  count = 0;

  bgroup = new Group();
  ogroup = new Group();

  ogroup.setLifetimeEach(-1);
  bgroup.setLifetimeEach(-1);
}

function draw() {
  background("powderblue");

  if (gamestates === play) {
    ogroup.setVelocityXEach(-2.5);
    bgroup.setVelocityXEach(-3);
    spawnogroup();
    spawnbgroup();
    count = count + Math.round(World.frameRate / 60);
    if (keyWentDown("space") && monkey.y >= 80) {
      monkey.velocityY = -5;
    }
    if (monkey.isTouching(bgroup)) {
      bgroup.destroyEach();
      count= count+2;
    }
    
    

    switch (count) {
      case 100:
        monkey.scale = 0.11;
        break;

      case 200:
        monkey.scale = 0.12;
        break;

      case 300:
        monkey.scale = 0.13;
        break;

      case 400:
        monkey.scale = 0.14;
        break;

      default:
        break;
    }
  }

  if (monkey.isTouching(ogroup)) {
    gamestates = 0;
  } else if (gamestates === end) {
    //set velcity of each game object to 0
    ogroup.setVelocityXEach(0);
    bgroup.setVelocityXEach(0);
    monkey.setCollider("circle", 0, 10);
  }

  monkey.velocityY = monkey.velocityY + 0.1;

  monkey.collide(invisibleground);

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + count, 450, 50);
}

function spawnbgroup() {
  if (World.frameCount % 180 === 0) {
    banana = createSprite(300, 100);
    banana.addImage("food", bananaimg);
    banana.scale = 0.07;
    banana.x = random(580, 590);
    bgroup.add(banana);
  }
}

function spawnogroup() {
  if (World.frameCount % 120 === 0) {
    stone = createSprite(300, 180);
    stone.addImage("obstacle", stoneimg);
    stone.scale = 0.07;
    stone.x = random(540, 555);
    ogroup.add(stone);
    stone.lifetime = -164;
  }
}
