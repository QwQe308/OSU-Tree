var none = "none"
var click = "click"
var drag = "drag" //暂不支持drag
var hold = "hold"
var tick = 0
var activeJson = {}
var test = 0
var delayShouldBe = 0.342778

var color = {
    none:"#0f0f0f",
    click:"lightblue",
    clickPrep:"rgb(0, 0, 100)",
    drag:"yellow",
    dragPrep:"rgb(100, 0, 100)",
    hold:"lime",
    holdPrep:"rgb(0, 100, 0)",
}

var presetJSON1 = {
    //格式:  激活时间(单位秒):[按钮位置(行列),按钮类型,存在时间(建议让激活时间-存在时间/2,以让早点也起效果),准备时间,特殊值(click为点击n次,hold是长按所需时间)]
    //该曲bpm为175.04，即为0.342778s/b，减去0.34秒作为准备时间,减去0.4(存在时间/2)秒让按钮可以提前点
    //触发代码:activePreset("presetJSON1","music1")
    //0:[11,click,0.2,0.34,1],
    //0.34:[12,click,0.2,0.34,1],
    //0.68:[13,click,0.2,0.34,1],
    0.62:[14,click,0.8,0.34,1],
    0.97:[15,click,0.8,0.34,1],
    1.31:[25,click,0.8,0.34,1],
    1.65:[24,click,0.8,0.34,1],
    2.00:[23,click,0.8,0.34,1],
    2.34:[22,click,0.8,0.34,1],
    2.68:[21,click,0.8,0.34,1],
    3.02:[11,click,0.8,0.34,1],
    3.37:[12,click,0.8,0.34,1],
    3.71:[13,click,0.8,0.34,1],
    4.05:[14,click,0.8,0.34,1],
    4.39:[15,click,0.8,0.34,1],
    4.74:[25,click,0.8,0.34,1],
    5.08:[35,click,0.8,0.34,1],
    5.42:[34,click,0.8,0.34,1],
    5.77:[33,click,0.8,0.34,1],
    6.11:[35,click,0.8,0.34,1],
    6.45:[34,click,0.8,0.34,1],
    6.79:[33,click,0.8,0.34,1],
    7.14:[34,click,0.8,0.34,1],
    7.48:[33,hold,5,0.34,3],
    7.82:[32,click,0.8,0.68,1],
    8.51:[34,click,0.8,0.68,1],
    9.19:[34,click,0.8,0.68,1],
}

var presetJSON2 = {
    //格式:  激活时间(单位秒):[按钮位置(行列),按钮类型,存在时间(建议让激活时间-存在时间/2,以让早点也起效果),准备时间,特殊值(click为点击n次,hold是长按所需时间)]
    //该曲bpm为175.04，即为0.342778s/b，减去0.34秒作为准备时间,减去0.4(存在时间/2)秒让按钮可以提前点
    //该预设为bpmToTime模式,更方便,使用方式:输入activePreset("预设名","曲在html中的id",BPM,减去的时间) 一般来讲减去的时间就是存在时间/2
    //0:[11,click,0.2,0.34,1],
    //0.34:[12,click,0.2,0.34,1],
    //0.68:[13,click,0.2,0.34,1],
    4:[14,click,0.8,0.34,1],//代表(第四节拍-subTime)时运行,
    5:[15,click,0.8,0.34,1],
    6:[25,click,0.8,0.34,1],
    7:[24,click,0.8,0.34,1],
    8:[23,click,0.8,0.34,1],
    9:[22,click,0.8,0.34,1],
    10:[21,click,0.8,0.34,1],
    11:[11,click,0.8,0.34,1],
    12:[12,click,0.8,0.34,1],
    13:[13,click,0.8,0.34,1],
    14:[14,click,0.8,0.34,1],
    15:[15,click,0.8,0.34,1],
    16:[25,click,0.8,0.34,1],
    17:[35,click,0.8,0.34,1],
    18:[34,click,0.8,0.34,1],
    19:[33,click,0.8,0.34,1],
    20:[35,click,0.8,0.34,1],
    21:[34,click,0.8,0.34,1],
    22:[33,click,0.8,0.34,1],
    23:[34,click,0.8,0.34,1],
    24:[33,hold,5,0.34,3],
    25:[32,click,0.8,0.68,1],
    27:[34,click,0.8,0.68,1],
    29:[34,click,0.8,0.68,1],
}


function creatNewButton(id,type,time,prep,stat = 1){
    player.osu.blockstat[id] = [type,time,prep,stat]
}

function activePreset(presetJSON,music,bpm = 0,subTime = 0){      
    var m = document.getElementById(music)
    m.pause()
    m.src = ""
    
    var deltaT = tick - Math.floor(tick/delayShouldBe)*delayShouldBe
    m.src = "music/08 狂乱のダンサーズハイ.mp3";document.getElementById(music).play()

    setTimeout(function(){
        tick = 0
        activeJson = {}
        if(!bpm) for(i in presetJSON) activeJson[i] = presetJSON[i]
        else for(i in presetJSON) activeJson[i*60/bpm-subTime] = presetJSON[i]
    },deltaT*1000)
}


function doPreset(diff){
    tick += diff
    for(i in activeJson){
        if(tick >= i){
            creatNewButton(activeJson[i][0],activeJson[i][1],activeJson[i][2],activeJson[i][3],activeJson[i][4])
            delete activeJson[i]
        }
    }
}

addLayer("osu", {
    name: "OSU!", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OSU!", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        test: 0,
        testTimes: 0,
        blockstat : {
            11:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            12:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            13:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            14:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            15:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],

            21:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            22:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            23:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            24:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            25:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],

            31:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            32:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            33:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            34:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            35:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],

            41:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            42:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            43:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            44:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            45:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],

            51:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            52:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            53:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            54:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
            55:["none",0/*存在时间*/,0/*准备时间*/,0/*对于click,该值为需点击次数 对于hold是长按时间*/],
        }
    }},
    color: "pink",
    resource: "分数", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    //layerShown(){return player.v.total.gte(1)},
    clickables: {
        61: {
            canClick(){return true},
            display() {
                return "校准按钮 校准值:"+player.osu.test.toFixed(2)
            },
            onClick(){
                var t = new Date()
                var diff=(Number(t.getTime())-this.delay)/1000
                this.delay=t.getTime()
                var testValue = (diff/delayShouldBe-Math.floor(diff/delayShouldBe)) - delayShouldBe
                player.osu.testTimes ++
                player.osu.test = (player.osu.test * (player.osu.testTimes-1) + testValue)/player.osu.testTimes
            },
            delay:0,
        },
        11: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        12: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        13: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        14: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        15: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        21: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        22: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        23: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        24: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        25: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        31: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        32: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        33: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        34: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        35: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        41: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        42: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        43: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        44: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        45: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        51: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        52: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        53: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        54: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
        55: {
            canClick(){
                creatNewButton(this.id,player.osu.blockstat[this.id][0],player.osu.blockstat[this.id][1],player.osu.blockstat[this.id][2],player.osu.blockstat[this.id][3])
                //player.osu.blockstat[this.id][2] -= timeDelay
                if(player.osu.blockstat[this.id][2] > 0) return false
                //player.osu.blockstat[this.id][1] -= timeDelay
                //if(player.osu.blockstat[this.id][1] <= 0) player.osu.blockstat[this.id][0] = none
                return player.osu.blockstat[this.id][0]!="none"
            },
            display() {
                if(player.osu.blockstat[this.id][0] == click){
                    return `Click^${player.osu.blockstat[this.id][3]}<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "点击!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    return `Hold-${player.osu.blockstat[this.id][3].toFixed(2)}s<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "长按!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    return `Drag<br>${player.osu.blockstat[this.id][2] > 0?"准备倒计时:"+player.osu.blockstat[this.id][2].toFixed(2) : "按下鼠标并划过!<br>剩余时间:"+player.osu.blockstat[this.id][1].toFixed(2)}`
                }
                return ""
            },
            onClick(){
                if(player.osu.blockstat[this.id][0] != click) return
                if(player.osu.blockstat[this.id][3] - 1){player.osu.blockstat[this.id][3] -= 1;player.osu.points = player.osu.points.add(0.2);return}
                player.osu.points = player.osu.points.add(1)
                player.osu.blockstat[this.id][0] = none
            },
            onHold(){
                //deltatime-计算时间间隔
                var t = new Date()
                var diff=Math.min((Number(t.getTime())-this.holdDelay)/1000,0.2)
                this.holdDelay=t.getTime()
                //计算结束 真-输出是diff

                if(player.osu.blockstat[this.id][0] != hold && player.osu.blockstat[this.id][0] != drag) return
                if(player.osu.blockstat[this.id][0] == drag){
                    player.osu.points = player.osu.points.add(0.1)
                    player.osu.blockstat[this.id][0] = none
                    return
                }
                if(player.osu.blockstat[this.id][3]>=0){player.osu.blockstat[this.id][3] -= diff;player.osu.points = player.osu.points.add(diff*2);return}
                player.osu.blockstat[this.id][0] = none
            },
            style(){
                if(player.osu.blockstat[this.id][0] == click){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.click}
                    else return {"background-color":color.clickPrep}
                }
                if(player.osu.blockstat[this.id][0] == hold){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.hold}
                    else return {"background-color":color.holdPrep}
                }
                if(player.osu.blockstat[this.id][0] == drag){
                    if(player.osu.blockstat[this.id][2] <= 0) return {"background-color":color.drag}
                    else return {"background-color":color.dragPrep}
                }
                return {"background-color":color.none}
            },
            holdDelay:0
        },
    },
    /*
    upgrades: {
        11: {
            description: "next update is in 5 hours。",
            cost(){return new OmegaNum(5)},
            unlocked(){return true},
            currencyDisplayName:"hours of update time"
        },
    },
    */
    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(ExpantaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */

    //inportant!!!
    update(diff){
        for(i in player.osu.blockstat){
            player.osu.blockstat[i][2] -= diff
            if(player.osu.blockstat[i][2] <= 0) player.osu.blockstat[i][1] -= diff
            if(player.osu.blockstat[i][1] <= 0) player.osu.blockstat[i][0] = none
        }
        doPreset(diff)
        //updateClickableTemp("osu")
        //setupLayer("osu")
    }
})
