// 安仔
class An extends egret.Sprite {
    private _animationData:any;
    private _animationTexture:egret.Texture;
    private sp:egret.Sprite;
    private role:egret.MovieClip;
    private isAnimating:Boolean = false;
    private mcDataFactory:egret.MovieClipDataFactory;
    // 注册动画完成callback
    private regCb:Function;
    constructor() {
        super();
        console.log('creating AN')
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        this.initMovieClip()
    }

    private initMovieClip():void {
        /*** 本示例关键代码段开始 ***/
        var data = RES.getRes('bear_json');
        var texture = RES.getRes('bear_png');
        this.mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mcDataFactory.enableCache = true;
        // console.log(mcDataFactory.generateMovieClipData("attack"))
        this.role = new egret.MovieClip(this.mcDataFactory.generateMovieClipData("attack"));
        this.sp.addChild(this.role);
        // console.log(role);
        // this.role.gotoAndPlay(1, -1);
        // role.x = 300;
        // role.y = 600;
        this.role.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
            egret.log("play over!");
            if (this.regCb) {
                this.regCb();
                this.regCb = null;
            }
        }, this);
        
        // var count:number = 0;
        this.role.addEventListener(egret.Event.LOOP_COMPLETE, function (e:egret.Event):void {
            egret.log("loop complete");
        }, this);
        this.role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e:egret.MovieClipEvent):void {
            egret.log("frameLabel:" + e.frameLabel);
        }, this);
        
        // this.sp.addEventListener(egret.Event.ADDED_TO_STAGE, function() {
        //     console.log(this.stage);
        //     this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent):void {
        //         count = 0;
        //         role.movieClipData = this.mcDataFactory.generateMovieClipData("attack2")
        //         role.gotoAndPlay(1, 3);
        //     }, this);
        // }, this)
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent):void {
        //     count = 0;
        //     role.gotoAndPlay(1, 3);
        // }, this);
        /*** 本示例关键代码段结束 ***/
    }
    // 播放动画
    public playAnimation(clipName:string, callback:Function) {
        var newMc = this.mcDataFactory.generateMovieClipData(clipName);
        if (!newMc) return
        this.role.movieClipData = newMc;
        this.role.gotoAndPlay(1, 1);
        this.regCb = callback
    }
    // protected load(callback:Function):void {
    //     var count:number = 0;
    //     var self = this;

    //     function check() {
    //         count--;
    //         if (count === 0) {
    //             callback.call(self)
    //         }
    //     }
    //     count++;
    //     var textureLoader = new egret.URLLoader();
    //     // loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
    //     //     var loader = e.currentTarget;
    //     // })
    //     textureLoader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
    //         var loader = e.currentTarget;
    //         this._animationTexture = loader.data;
    //         check();
    //     }, this);
    //     textureLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
    //     var textureRequest = new egret.URLRequest("resource/assets/mc/animation.png");
    //     textureLoader.load(textureRequest);

    //     count++;
    //     var loader = new egret.URLLoader();
    //     // loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
    //     //     var loader = e.currentTarget;
    //     // })
    //     loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
    //         var loader = e.currentTarget;
    //         this._animationData = JSON.parse(loader.data);
    //         check();
    //     }, this);
    //     var request = new egret.URLRequest("resource/assets/mc/animation.json");
    //     loader.load(request);
    // }
}