// 游戏准备页面

class GameStartView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }
    private initView():void {
        this.drawBg();
        this.drawStartBtn();
        this.drawTitle();
    }
    private drawBg():void {
        // 背景图
        var bg:egret.Bitmap = ResUtils.createBitmapByName('bg_jpg');
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
    }
    private drawTitle():void {
        // 标题
        var title = new egret.TextField();
        title.textColor = 0x000000;
        title.width = Const.SCENT_WIDTH - 172;
        title.textAlign = 'center';
        title.text = 'Hello Egret';
        title.size = 50;
        title.x = 172 / 2;
        title.y = 80;
        this.addChild(title)
    }
    private drawStartBtn():void {
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
        Scene._scene.play();
    }
    private removeAll():void {
        this.removeChildren();
    }
}