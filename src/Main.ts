//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    private _scene:Scene;


    public constructor() {
        super();
        // 被加入舞台显示列表的时候调用
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        Const.SCENT_WIDTH = this.stage.stageWidth
        Const.SCENT_HEIGHT = this.stage.stageHeight

        // 增加生命周期
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                
            }
        })
        // 生命周期 - 暂停
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        // 生命周期 - 回到游戏页面
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        // 调用运行游戏
        this.runGame().catch(e => {
            console.log(e);
        })



    }
    /**
     * 运行游戏
     */
    private async runGame() {
        // 加载资源
        await this.loadResource()
        // 创建游戏场景
        this.createGameScene();
        // 获取描述列表文件
        const result = await RES.getResAsync("description_json")
        // 播放描述列表动画
        this.startAnimation(result);
        // 假登陆
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }
    /**
     * 加载资源
     * 基于配置文件
     */
    private async loadResource() {
        try {
            // 显示loading
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            // 先加载配置文件
            await RES.loadConfig("resource/default.res.json", "resource/");
            // 获取配置文件中对应group下的内容
            await RES.loadGroup("preload", 0, loadingView);
            // 关闭loading
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        // // 通过json中的name值进行获取图片资源
        // let sky = this.createBitmapByName("bg_jpg");
        // // 将资源加入
        // this.addChild(sky);
        // // 获取当前绘图区的宽高
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        this._scene = new Scene();
        this._scene.width = Const.SCENT_WIDTH;
        this._scene.height = Const.SCENT_HEIGHT;
        this.addChild(this._scene);
        // 顶部遮罩
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, Const.SCENT_WIDTH, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        // 白鹭icon
        let icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        // 分割线
        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);

        // 文字
        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = Const.SCENT_WIDTH - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        // 描述
        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = Const.SCENT_WIDTH - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;


    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}