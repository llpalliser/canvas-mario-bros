class Coin {
  
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.sprite = new Image();
    this.sprite.src = './assets/img/coin.sprite.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.verticalFrames = 1;
    this.sprite.horizontalFrames = 4;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    }

    this.movements = {
      right: false
    }

    this.drawCount = 0;
  }


  onKeyEvent(event) {
    const state = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = state;
        break;
    }
  } 

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.drawCount++;
      this.animate();
    }
  }

  animate() {
    if (this.drawCount % MOVEMENT_FRAMES === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
      this.drawCount = 0;
    }
  }

  move() {
    if (this.movements.right) {
      this.x -= SPEED;
    }
  }
}
