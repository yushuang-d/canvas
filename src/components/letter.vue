<template>
   <canvas ref="canvas" @click="showBall"></canvas>
</template>

<script>
import * as util from "./../assets/js/util.js";
export default {
    data(){
        return {
            winW:window.innerWidth,
            winH:window.innerHeight/2,
            ctx:{},
            radiu:4,
            balls:[],
            colors:['#f44336','#9c27b0','#3f51b5','#00bcd4','#4caf50','#cddc39','#ffeb3b','#ff5722','#607d8b','#673ab7']
        }
    },
    methods:{
        initletter(){
            let canvas = this.$refs.canvas;
            this.ctx = canvas.getContext('2d'); 
            canvas.width = this.winW;
            canvas.height = this.winH;
            //绘制
            var letter = 'NUTUI';
            var letters = letter.split('');
            for(var a=0;a<letters.length;a++){
                var x = a*10*10+a*10;
                this.renderletter(x,0,letters[a],this.ctx);
            }
        },
        initBalls(){
            let canvas = this.$refs.canvas;
            this.ctx = canvas.getContext('2d'); 
            canvas.width = this.winW;
            canvas.height = this.winH;
            //绘制
            var letter = 'NUTUI';
            var letters = letter.split('');
            for(var a=0;a<letters.length;a++){
                var x = a*10*10+a*10;
                this.createBalls(x,0,letters[a]);
            }
        },
        renderletter(x,y,letter,ctx){
            ctx.fillStyle = "rgb(83,150,225)";
            for(var i=0;i<util.lettersArr[letter].length;i++){
                for(var j =0;j<util.lettersArr[letter][i].length;j++){
                    if(util.lettersArr[letter][i][j] == 1){
                        ctx.beginPath();
                        ctx.arc(x+j*(this.radiu*2+2)+(this.radiu+1),y+i*(this.radiu*2+2)+(this.radiu+1),this.radiu,0,2*Math.PI);
                        // ctx.fillRect(x+j*this.radiu,y+i*this.radiu,this.radiu,this.radiu);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
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
                            color:this.colors[Math.floor(Math.random()*this.colors.length)]
                            // color:'rgb(83,150,225)'
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
            this.ctx.clearRect(0,0,this.winW,this.winH);
            for(var c= 0;c<this.balls.length;c++){
                this.ctx.fillStyle = this.balls[c].color;
                this.ctx.beginPath();
                this.ctx.arc(this.balls[c].x,this.balls[c].y,this.radiu,0,2*Math.PI);
                this.ctx.closePath();
                this.ctx.fill();
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
       this.initletter();
    }
}
</script>

<style>

</style>