// 场景
class Scene extends egret.DisplayObjectContainer{
    public static _scene:Scene;
    private thisContainer:egret.Sprite;
    constructor() {
        super();
        Scene._scene = this;
        this.initView();
    }
    private initView():void {
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.start();
    }
    public start():void {
        this.removeAll();
        var gameStart:GameStartView = new GameStartView();
        this.thisContainer.addChild(gameStart);
    }
    private removeAll():void {}
}