// 按钮
class ButtonWithTexture extends egret.Sprite {
    // 标题图
    private bg:egret.Bitmap;
    // 点击事件回调
    private onClick:Function;
    // 动画
    private tw:egret.Tween;
    // 内层容器
    private sp:egret.Sprite;
    public constructor(texture: egret.Texture) {
        super();
        // 新建内层容器
        this.sp = new egret.Sprite();
        // 加入到组件容器内
        this.addChild(this.sp);
        this.bg = new egret.Bitmap();
        this.bg.texture = texture;
        this.sp.addChild(this.bg);
    }
    // 设置点击功能及点击回调
    public setClick(callback:Function):void {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        this.onClick = callback
    }
    // 内部点击事件 - 动画及回调调用
    private onClickEvent():void {
        var scaleX:number = (this.sp.width-this.sp.width*0.8)/2;
        var scaleY:number = (this.sp.height-this.sp.height*0.8)/2;
        this.tw = egret.Tween.get(this.sp);
        this.tw.to({ "scaleX": 0.7, "scaleY": 0.7, "x": scaleX, "y": scaleY }, 40).to({ "scaleX": 1, "scaleY": 1,"x": this.sp.x,"y": this.sp.y }, 40).call(this.onClickHandler,this);
    }
    // 内部点击事件 - 回调处理
    private onClickHandler():void {
        this.onClick();
    }
}