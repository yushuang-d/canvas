<template>
    <div>
        <canvas id="back" ref="background" style="background:#2f3443;"></canvas>
        <canvas id="dot" ref="dots" ></canvas>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ctx:{},
            mouse:{
                x:null,
                y:null,
                max:200
            },
            dots:[],
            mouseDots:[],
            ctx2:{}
        }
    },
    methods:{
        initBackground(){
            //关于画布背景的设置
            let canvas = this.$refs.background;
            this.ctx2 = canvas.getContext('2d'); 
            canvas.width = 600;
            canvas.height = 300;
            this.ctx2.beginPath();
            this.ctx2.arc(300,200,120,0,2*Math.PI);
            this.ctx2.moveTo(480,200);
            this.ctx2.arc(300,200,180,0,2*Math.PI);
            this.ctx2.moveTo(560,200);
            this.ctx2.arc(300,200,260,0,2*Math.PI);
            this.ctx2.strokeStyle="#ffeb3b";
            this.ctx2.stroke();
        },
        initDots(){ 
            //关于画布的设置
            let canvas = this.$refs.dots;
            this.ctx = canvas.getContext('2d'); 
            canvas.width = 600;
            canvas.height = 300;
            //添加鼠标事件
            window.onmousemove = (e)=>{//鼠标对象
                //给鼠标设置水平方向
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            };
            window.onmouseout= ()=>{//鼠标对象
                //给鼠标设置的水平距离/垂直距离恢复
                this.mouse.x = null;
                this.mouse.y = null;
            };
            this.createDot();
        },
        //创建粒子数组
        createDot(){
            this.dots=[];
            //粒子（点的运动）：X,Y  200是随便定义的
            for(var i = 0;i<40;i++){
                var adot ={
                    x: Math.random()*600,//600是画布的宽度
                    y: Math.random()*300,//600是画布的高度
                    vx: Math.random()*8-4,
                    vy: Math.random()*8-4,
                    max:100,
                    // color:`rgba(64,73,99,${Math.random()+0.5})`,
                    color:`rgba(255,235,59,${Math.random()+0.5})`,
                    r:Math.random()*10
                };
                this.dots.push(adot);
            }
            this.renderDot();
            this.animation();
        },
        renderDot(){
            this.ctx.clearRect(0,0,600,300);
            for(var i=0;i<this.dots.length;i++){
                //增加小球
                this.ctx.beginPath();
                this.ctx.arc(this.dots[i].x,this.dots[i].y,this.dots[i].r,0,2*Math.PI);
                this.ctx.fillStyle=this.dots[i].color;
                this.ctx.fill();
                this.ctx.closePath();
            }
            this.updataDot();
            // requestAnimationFrame(this.renderDot);
        },
        //更新粒子的坐标
        updataDot(){
            for(var i=0;i<this.dots.length;i++){
                this.dots[i].x+=this.dots[i].vx;
                this.dots[i].y+=this.dots[i].vy;
                //判断粒子的位置是否超出画布范围
                this.dots[i].vx *= (this.dots[i].x>600 || this.dots[i].x<0)?-1:1;
                this.dots[i].vy *= (this.dots[i].y>300 || this.dots[i].y<0)?-1:1;
            }
        },
        //粒子之间的连线，粒子与鼠标的结合
        //定义一个方法描述粒子的运动方式
        animation(){
            //改变粒子的坐标
            this.dots.forEach((dot)=>{
                var dx = dot.x - this.mouse.x;
                var dy = dot.y - this.mouse.y;
                //两个粒子的距离
                var dxy =Math.sqrt(dx*dx+dy*dy);
                if(dxy<this.mouse.max){
                    //绘制线条
                    this.ctx.beginPath();
                    this.ctx.lineWidth=0.3;
                    this.ctx.strokeStyle ="#ffeb3b";
                    this.ctx.moveTo(dot.x,dot.y);
                    this.ctx.lineTo(this.mouse.x,this.mouse.y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            });
            // requestAnimationFrame(this.animation);
        }

    },
    mounted(){
        this.initBackground();
        this.initDots();
        setInterval(()=>{
            this.renderDot();
            this.animation();
        },150);
    }
}
</script>

<style>
    #back,#dot{
        position: absolute;
        left: 0px;
    }
    #app{
        margin-top:0px;
    }
</style>