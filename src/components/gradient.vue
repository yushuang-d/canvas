<template>
    <div>
        <canvas class="start" ref="canvas" style="background:#777;"></canvas>
        <canvas class="nut" ref ="mycanvas" style="background:transparent;" ></canvas>
        <canvas class="nut-star" ref ="nutStarCanvas" style="background:transparent;" ></canvas>
   </div>
</template>

<script>
import * as util from "./../assets/js/util.js";
// import { set } from 'vue/types/umd';
export default {
    data(){
        return {
            winW:600,
            winH:600,
            ctx:{},
            radiu:4,
            balls:[],
            time:0,
            ball:{x:50,y:270,r:6,g:2,vx:-4,vy:-2,color:'#799e46'},
            begin:[50,270],
            control:[110,-110],
            end:[160,280],
            percent:0,
            ctx2:{},
            num:20,
            ctx3:{},
            colors:['#f44336','#9c27b0','#3f51b5','#00bcd4','#4caf50','#cddc39','#ffeb3b','#ff5722','#607d8b','#673ab7']
        }
    },
    methods:{
        init(){
            this.percent = 0;  //每次重置进程
            this.draw();
        },
        //nutui底层字母
        initletter(){
            //第二个canvas
            let canvas = this.$refs.mycanvas;
            this.ctx2 = canvas.getContext('2d'); 
            canvas.width = this.winW;
            canvas.height = this.winH;
            //绘制
            var letter = 'NUTUI';
            var letters = letter.split('');
            for(var a=0;a<letters.length;a++){
                var x = a*10*10+a*10;
                this.renderletter(x,220,letters[a],this.ctx2);
            }
        },
        renderletter(x,y,letter,ctx){
            ctx.fillStyle = "rgb(83,150,225)";
            // ctx.shadowBlur=this.num;
            ctx.shadowColor="rgb(83,150,225)";
            for(var i=0;i<util.lettersArr[letter].length;i++){
                for(var j =0;j<util.lettersArr[letter][i].length;j++){
                    if(util.lettersArr[letter][i][j] == 1){
                        ctx.beginPath();
                        ctx.arc(x+j*(this.radiu*2+2)+(this.radiu+1)+Math.random(),y+i*(this.radiu*2+2)+(this.radiu+1)+Math.random(),this.radiu+Math.random()*(-1)+Math.random(),0,2*Math.PI);
                        // ctx.fillRect(x+j*this.radiu,y+i*this.radiu,this.radiu,this.radiu);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
            // this.renderBeatline(ctx);
        },
        //star贝塞尔路径
        draw(){
            let canvas = this.$refs.canvas;
            this.ctx = canvas.getContext('2d'); 
            canvas.width = this.winW;
            canvas.height = this.winH;
            this.ctx.clearRect(0, 0, 600, 600);  //每次清除画布
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#777';   
            this.ctx.strokeStyle = this.createLinearGradient(this.begin,this.end,'rgba(240,224,35,.2)','rgba(240,224,35,1)');//设置线条样式  
            if(this.percent >= 99.99 && this.ball.x<=160){
                this.begin = [160,280];
                this.control = [225,-240];
                this.end = [270,220];
            }else if(this.percent >= 99.99 && this.ball.x>160 && this.ball.x<=270){
                this.begin = [270,220];
                this.control = [325,-80];
                this.end = [380,330];
            }else if(this.percent >= 99.99 && this.ball.x>270 && this.ball.x<=380){
                this.begin = [380,330];
                this.control = [435,-240];
                this.end = [490,220];
            }else if (this.percent >= 99.99 && this.ball.x>400 ){
                setInterval(()=>{
                    this.ctx.clearRect(0, 0, 600, 600);
                    this.renderStar(this.ctx);
                },100);
                this.showBall();
                return;
            }
            this.drawCurvePath(this.begin, this.control, this.end, this.percent);
           
            this.percent += 2; //进程增加,这个控制动画速度
             if (this.percent <= 100) { //没有画完接着调用,画完的话重置进度
                requestAnimationFrame(this.draw);
            }else{
                this.init()
            }
        },
        drawCurvePath(start, point, end, percent){
            this.ctx.beginPath();    //开始画线
            this.ctx.moveTo(start[0], start[1]);   //画笔移动到起点
            for (var t = 0; t <= percent / 100; t += 0.005) {
                //获取每个时间点的坐标
                var x = this.quadraticBezier(start[0], point[0], end[0], t);   
                var y = this.quadraticBezier(start[1], point[1], end[1], t);
                this.ctx.lineTo(x, y);   //画出上个时间点到当前时间点的直线
                this.ball.x = x;
                this.ball.y = y;
            }
            this.ctx.stroke();   //描边
            this.renderStar(this.ctx);//五角星
        },
        quadraticBezier(p0, p1, p2, t) {
            var k = 1 - t;
            return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2; 
        },
        createLinearGradient(begin,end,startColor,endColor){
              var lineGradient = this.ctx.createLinearGradient(...begin, ...end);
                            lineGradient.addColorStop(0, startColor);
                            lineGradient.addColorStop(0.4, 'rgba(240,224,35,.2)');
                            lineGradient.addColorStop(1, endColor);
              return lineGradient
        },
        renderStar(ctx){
            // ctx.fillStyle = this.ball.color;
            // this.ctx.clearRect(0, 0, 600, 600); 
            ctx.beginPath();
            this.num =Math.floor(Math.random()*20);
            ctx.shadowBlur=this.num;
            ctx.shadowColor="rgba(240,224,35,1)";
            var radialGradient = ctx.createRadialGradient(this.ball.x,this.ball.y, 0, this.ball.x, this.ball.y, 15);
            radialGradient.addColorStop(0, "rgba(240,224,35,1)");
            radialGradient.addColorStop(.3, "rgba(240,224,35,.8)");
            radialGradient.addColorStop(1, "rgba(119,119,119,1)");
            ctx.fillStyle = radialGradient;
            let R = 16;
            let r = 8;
            for(var m=0;m<5;m++){
                ctx.lineTo(Math.cos((18+m*72)/180*Math.PI)*R+this.ball.x,
                        -Math.sin((18+m*72)/180*Math.PI)*R+this.ball.y
                );
                ctx.lineTo(Math.cos((54+m*72)/180*Math.PI)*r+this.ball.x,
                        -Math.sin((54+m*72)/180*Math.PI)*r+this.ball.y
                );
            }
            ctx.fill(); 
            ctx.closePath();
        },
        //star散落
        initBalls(){
            let canvas = this.$refs.nutStarCanvas;
            this.ctx3 = canvas.getContext('2d'); 
            canvas.width = this.winW;
            canvas.height = this.winH;
            //绘制
            var letter = 'NUTUI';
            var letters = letter.split('');
            for(var a=0;a<letters.length;a++){
                var x = a*10*10+a*10;
                this.createBalls(x,220,letters[a]);
            }
        },
        createBalls(x,y,letter){
            for(var i=0;i<util.lettersArr[letter].length;i++){
                for(var j =0;j<util.lettersArr[letter][i].length;j++){
                    if(util.lettersArr[letter][i][j] == 1){
                        var aball={
                            x:x+j*(this.radiu*2+2)+(this.radiu+1),
                            y:y+i*(this.radiu*2+2)+(this.radiu+1),
                            vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                            vy:-8,
                            g:1.5+Math.random(),
                            color:"rgba(240,224,35,1)",
                            // color:'rgb(83,150,225)'
                            R:Math.random()*8,
                            r:Math.random()*4
                        };
                        this.balls.push(aball);
                    }
                }
            }
            // this.renderBalls(ctx)
        },
        updataBall(){
            for(var b=0;b<this.balls.length;b++){
                this.balls[b].x += this.balls[b].vx;
                this.balls[b].y += this.balls[b].vy;
                this.balls[b].vy += this.balls[b].g;
                if(this.balls[b].y>=this.winH - this.radiu){
                    this.balls[b].y = this.winH - this.radiu;
                    this.balls[b].vy = -this.balls[b].vy*0.5;
                }
            }
        },
        renderBalls(){
            this.ctx3.clearRect(0,0,this.winW,this.winH);
            for(var c= 0;c<this.balls.length;c++){
                this.ctx3.fillStyle = this.balls[c].color;
                this.ctx3.beginPath();
                // this.ctx3.arc(this.balls[c].x,this.balls[c].y,this.radiu,0,2*Math.PI);
                this.num =Math.floor(Math.random()*20);
                this.ctx3.shadowBlur=this.num;
                this.ctx3.shadowColor="rgba(240,224,35,1)";
                var radialGradient = this.ctx.createRadialGradient(this.balls[c].x,this.balls[c].y, 0, this.balls[c].x, this.balls[c].y, 15);
                radialGradient.addColorStop(0, "rgba(240,224,35,1)");
                radialGradient.addColorStop(.3, "rgba(240,224,35,.8)");
                radialGradient.addColorStop(1, "rgba(119,119,119,1)");
                this.ctx.fillStyle = radialGradient;
                // let R = Math.random()*8;
                // let r = Math.random()*4;
                for(var m=0;m<5;m++){
                    this.ctx3.lineTo(Math.cos((18+m*72)/180*Math.PI)*this.balls[c].R+this.balls[c].x,
                            -Math.sin((18+m*72)/180*Math.PI)*this.balls[c].R+this.balls[c].y
                    );
                    this.ctx3.lineTo(Math.cos((54+m*72)/180*Math.PI)*this.balls[c].r+this.balls[c].x,
                            -Math.sin((54+m*72)/180*Math.PI)*this.balls[c].r+this.balls[c].y
                    );
                }
                this.ctx3.closePath();
                this.ctx3.fill();
            }
        },
        showBall(){
            this.initBalls();
            setInterval(()=>{
                this.renderBalls();
                this.updataBall();
            },50);
        }
    },
    mounted(){
        // this.initletter();
        setInterval(()=>{
             this.initletter();
        },200);
        this.init();
    }
}
</script>

<style>
    .nut,.start,.nut-star,.nut-star{
        position: absolute;
        left: 64px;
    }
</style>