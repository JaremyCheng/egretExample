// 游戏页面
class GamePlayView extends egret.Sprite {
    private sp:egret.Sprite;
    private an:An;
    constructor() {
        super();
        this.initView();
    }
    // 初始化
    private initView():void {
        this.drawBg();
        this.drawAn();
        this.drawItem();
    }
    private drawAn():void {
        this.an = new An();
        this.addChild(this.an);
        this.an.x = 300;
        this.an.y = 600;
        // an.initEvent();
    }
    private drawBg():void {
        // 背景图
        var bg:egret.Bitmap = ResUtils.createBitmapByName('bg2_png');
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
    }
    private drawItem():void {
        // 道具加载
        var texture:egret.Texture = RES.getRes('item_png');
        var spriteSheet:egret.SpriteSheet = new egret.SpriteSheet(texture);
        var baziTexture = spriteSheet.createTexture('bazi', 0, 0, 83, 81);
        var bazi = new ButtonWithTexture(baziTexture);
        this.addChild(bazi);
        bazi.x = Const.SCENT_WIDTH / 2 - bazi.width / 2 - 200;
        bazi.y = Const.SCENT_HEIGHT - bazi.height - 100;
        bazi.setClick(() => {
            this.an.playAnimation('attack', () => {
                console.log('attack', this);
            });
        })
        var leidianTexture = spriteSheet.createTexture('leidian', 85, 0, 70, 91);
        var leidian = new ButtonWithTexture(leidianTexture);
        this.addChild(leidian);
        leidian.x = Const.SCENT_WIDTH / 2 - bazi.width / 2;
        leidian.y = Const.SCENT_HEIGHT - bazi.height - 100;
        leidian.setClick(() => {
            this.an.playAnimation('attack2', () => {
                console.log(this)
            });
        })

        var xueyaoTexture = spriteSheet.createTexture('xueyao', 157, 0, 68, 84);
        var xueyao = new ButtonWithTexture(xueyaoTexture);
        this.addChild(xueyao);
        xueyao.x = Const.SCENT_WIDTH / 2 - bazi.width / 2 + 200;
        xueyao.y = Const.SCENT_HEIGHT - bazi.height - 100;
    }
    // 清理内容
    private removeAll():void {
        this.removeChildren()
    }
}