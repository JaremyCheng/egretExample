// 资源加载类
class ResUtils {
    // 根据name获取资源
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static loadImage(url:string, callback:Function, self):void {
        var loader:egret.ImageLoader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadCompelte() {
            callback.call(self)
        }, self);
        loader.load(url);
    }
}