class BoardTile extends BoardElement {
	
	constructor(x, y, type) {
		super();
		
		this.x = x;
		this.y = y;
		this.type = type;
	}

	getOffsetX() {
		return (portrait ? - screenOffsetX : screenOffsetX) - this.width*screenOut/2 -
			((this.width*screenWidth/2) - (this.width*screenWidth/2) / boardScale / tween.zoom);
	}
	
	getOffsetY() {
		return (portrait ? screenOffsetY : -screenOffsetY) - this.height*screenOut/2 -
			((this.height*screenWidth/2) - (this.height*screenWidth/2) / boardScale / tween.zoom);
	}

	getX() {
		return this.getOffsetX() + this.x * this.width + tween.transitionX * this.width;
	}

	getY() {
		return this.getOffsetY() + this.y * this.height + tween.transitionY * this.height;
	}

	update(type) {
		this.type = type;
		this.resize();
	}

	reset() {
		// reflected variables from the corresponding game unit
		// When performing a move all board elements are reset and new data is assigned
		this.overlay = 0;
		this.origin = 0;
		this.selection = 0;
		this.visited = 0;
	}

	resize() {
		super.resize();
		this.draw();
	}

	draw() {
		bgrContext.drawImage(
			offscreenBitmaps[(this.type || 0) + 16], 0, 0, tileWidth, tileWidth,
			this.getX(),
			this.getY(),
			this.width,
			this.width
		);
		if (this.visited < 2) {
			bgrContext.globalAlpha = state ? 0.5 : 1;
			bgrContext.drawImage(
				offscreenBitmaps[15], 0, 0, tileWidth+2, tileWidth+2,
				this.getX() - this.width/3,
				this.getY() - this.width/3,
				this.width + this.width/3,
				this.width + this.width/3
			);
			bgrContext.globalAlpha = 1;
		}
	}
}
