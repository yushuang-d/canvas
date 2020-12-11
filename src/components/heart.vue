<template>
    <div>
        <canvas class="start" ref="canvas" style="background:#777;"></canvas>
        <canvas class="nut" ref ="mycanvas" style="background:transparent;" ></canvas>
        <canvas class="nut-star" ref ="nutStarCanvas" style="background:transparent;" ></canvas>
   </div>
</template>

<script>
// import * as util from "./../assets/js/util.js";
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
            ball:{x:250,y:40,r:6,g:2,vx:-4,vy:-2,color:'#799e46'},
            // begin:[50,270],
            // control:[110,-110],
            // end:[160,280],
            begin:[263,371],
            control1:[14,64],
            control2:[204,54],
            end:[265,137],
            percent:0,
            // ctx2:{},
            num:20,
            // ctx3:{},
            colors:['#f44336','#9c27b0','#3f51b5','#00bcd4','#4caf50','#cddc39','#ffeb3b','#ff5722','#607d8b','#673ab7']
        }
    },
    methods:{
        init(){
            this.percent = 0;  //每次重置进程
            this.draw();
        },
        //star贝塞尔路径
        draw(){
            let canvas = this.$refs.canvas;
            this.ctx = canvas.getContext('2d'); 
            canvas.width = this.winW;
            canvas.height = this.winH;
            // this.ctx.clearRect(0, 0, 600, 600);  //每次清除画布
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'rgba(240,224,35,.6)';   
            this.ctx.strokeStyle = this.createLinearGradient(this.begin,this.end,'rgba(240,224,35,.4)','rgba(240,224,35,1)');//设置线条样式  
            //是否到达线条的终点
            if(this.percent >= 99.99 && this.ball.x == 250 && this.ball.y <=50){
                setInterval(()=>{
                    this.ctx.clearRect(0, 0, 600, 600);
                    this.renderStar(this.ctx);
                },100);
                this.initBalls();
                return;
            }
            else if(this.percent >= 99.99 && this.ball.y<=137){
                this.begin = [267,137];
                this.control1 = [361,13];
                this.control2 = [472,142],
                this.end = [250,371];
            }else if(this.percent >= 99.99 && this.ball.y>350){
                this.begin  = [250,371];
                this.end = [250,40]
                this.control1 = [];
                this.control2 = [];
            }

            //要执行哪个动画
            if( this.control1.length == 0){
                this.drawLinePath(this.begin,this.end,this.percent);
            }else{
                this.drawCurvePath(this.begin, this.control1,this.control2, this.end, this.percent);
            }

            this.percent += 2; //进程增加,这个控制动画速度
             if (this.percent <= 100) { //没有画完接着调用,画完的话重置进度
                requestAnimationFrame(this.draw);
            }else{
                this.init();
            }
        },
        //绘制曲线路径
        drawCurvePath(start, point1, point2, end, percent){
            this.ctx.beginPath();    //开始画线
            this.ctx.moveTo(start[0], start[1]);   //画笔移动到起点
            for (var t = 0; t <= percent / 100; t += 0.005) {
                //获取每个时间点的坐标
                // var x = this.quadraticBezier(start[0], point[0], end[0], t);   
                // var y = this.quadraticBezier(start[1], point[1], end[1], t);
                var x = this.bezierBezier(start[0], point1[0], point2[0], end[0], t);
                var y = this.bezierBezier(start[1], point1[1], point2[1], end[1], t);
                this.ctx.lineTo(x, y);   //画出上个时间点到当前时间点的直线
                this.ball.x = x;
                this.ball.y = y;
            }
            this.ctx.stroke();   //描边
            this.renderStar(this.ctx);//五角星
        },
        //绘制直线路径
        drawLinePath(start,end,percent){
            this.ctx.beginPath();    //开始画线
            this.ctx.moveTo(start[0], start[1]);   //画笔移动到起点
            for (var t = 0; t <= percent / 100; t += 0.005) {
                //获取每个时间点的坐标
                var x = this.lineBezier(start[0], end[0], t);
                var y = this.lineBezier(start[1], end[1], t);
                this.ctx.lineTo(x, y);   //画出上个时间点到当前时间点的直线
                this.ball.x = x;
                this.ball.y = y;
            }
            this.ctx.stroke();   //描边
            this.renderStar(this.ctx);//五角星
        },
        //二次贝塞尔
        quadraticBezier(p0, p1, p2, t) {
            var k = 1 - t;
            return k * k * p0 + 2 * k * t * p1 + t * t * p2; 
        },
        //三次贝塞尔
        bezierBezier(p0, p1, p2, p3, t){
            var k = 1 - t;
            return k * k * k * p0 + 3 * p1 * t * k * k + 3 * p2 * t * t * k + p3 * t * t * t;  
        },
        //一次贝塞尔直线
        lineBezier(p0, p1, t){
            var k = 1 - t;
            return k * p0 + t * p1;
        },
        createLinearGradient(begin,end,startColor,endColor){
              var lineGradient = this.ctx.createLinearGradient(...begin, ...end);
                            lineGradient.addColorStop(0, startColor);
                            // lineGradient.addColorStop(0.4, 'rgba(240,224,35,0.2)');
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
        initBalls(){
            //遍历生成30个小星星
            for(var i = 0;i<100;i++){
                var aball={
                        x:250,
                        y:40,
                        vx:Math.pow(-1,Math.ceil(Math.random()*1000))*2,
                        // vx:Math.random()*5,
                        vy:-8,
                        g:1.5+Math.random()*5,
                        color:"rgba(240,224,35,1)",
                        // color:'rgb(83,150,225)'
                        R:Math.random()*16,
                        r:Math.random()*8
                    };
                this.balls.push(aball);
            }
            // requestAnimationFrame(this.updateBalls());
            setInterval(()=>{
                this.updateBalls();
            },100);
        },
        updateBalls(){
            this.renderBalls();
            for(var b=0;b<this.balls.length;b++){
                this.balls[b].x += this.balls[b].vx+Math.pow(-1,Math.ceil(Math.random()*1000))*30;
                this.balls[b].y += this.balls[b].vy;
                this.balls[b].vy += this.balls[b].g;
                // if(this.balls[b].y>=this.winH - this.radiu){
                //     this.balls[b].y = this.winH - this.radiu;
                //     this.balls[b].vy = -this.balls[b].vy*0.5;
                // }
            }
        },
        renderBalls(){
            for(var c= 0;c<this.balls.length;c++){
                this.ctx.fillStyle = this.balls[c].color;
                this.ctx.beginPath();
                // this.ctx.arc(this.balls[c].x,this.balls[c].y,this.radiu,0,2*Math.PI);
                this.num =Math.floor(Math.random()*20);
                this.ctx.shadowBlur=this.num;
                this.ctx.shadowColor="rgba(240,224,35,1)";
                var radialGradient = this.ctx.createRadialGradient(this.balls[c].x,this.balls[c].y, 0, this.balls[c].x, this.balls[c].y, 15);
                radialGradient.addColorStop(0, "rgba(240,224,35,1)");
                radialGradient.addColorStop(.3, "rgba(240,224,35,.8)");
                radialGradient.addColorStop(1, "rgba(119,119,119,1)");
                this.ctx.fillStyle = radialGradient;
                // let R = Math.random()*8;
                // let r = Math.random()*4;
                for(var m=0;m<5;m++){
                    this.ctx.lineTo(Math.cos((18+m*72)/180*Math.PI)*this.balls[c].R+this.balls[c].x,
                            -Math.sin((18+m*72)/180*Math.PI)*this.balls[c].R+this.balls[c].y
                    );
                    this.ctx.lineTo(Math.cos((54+m*72)/180*Math.PI)*this.balls[c].r+this.balls[c].x,
                            -Math.sin((54+m*72)/180*Math.PI)*this.balls[c].r+this.balls[c].y
                    );
                }
                this.ctx.closePath();
                this.ctx.fill();
            }
        },
    },
    mounted(){
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