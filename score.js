const ScoreBoard = {
    ctx: undefined,
  
    init: function (ctx) {
      this.ctx = ctx
      this.ctx.font = "30px sans-serif"
    },
    
    update: function (score , posX, posY, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillText(score, posX, posY);
    }
  }
