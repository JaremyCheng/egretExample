// 游戏准备页面

class GameStartView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }
    private initView():void {
        // 背景图
        var bg:egret.Bitmap = ResUtils.createBitmapByName('bg_jpg');
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
        // 开始按钮
        var startBtn:Button = new Button('start_btn_png', 'start_btn_png');
        this.addChild(startBtn);
        // 距离底部50
        startBtn.y = Const.SCENT_HEIGHT - startBtn.height - 50;
        // 横向居中
        startBtn.x = Const.SCENT_WIDTH / 2 - startBtn.width / 2;
        startBtn.setClick(this.onStartGameHandler.bind(this));
    }
    private onStartGameHandler() {
        console.log('start!')
    }
    private removeAll():void {
        this.removeChildren();
    }
}