<template>
   <canvas ref="canvas" style="background:#777;"></canvas>
</template>

<script>
import * as util from "./../assets/js/util.js";
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
            end:[160,280]
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
                this.renderletter(x,220,letters[a],this.ctx);
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
            this.renderBeatline(ctx);
        },
        renderBeatline(ctx){
            ctx.beginPath();
            ctx.moveTo(50,270);
            ctx.strokeStyle = "rgb(119, 119, 119)";
            // ctx.quadraticCurveTo(110,-100,160,280);
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.createLinearGradient(this.begin,this.end,'rgba(240,224,35,.2)','rgba(240,224,35,1)',ctx);
            // ctx.quadraticCurveTo(215,-240,270,220);
            // ctx.quadraticCurveTo(325,-80,380,330);
            // ctx.quadraticCurveTo(435,-240,490,200);
            ctx.stroke();
            ctx.closePath();
            this.renderBeatball(ctx);
        },
        renderBeatball(ctx){
            // ctx.fillStyle = this.ball.color;
            ctx.beginPath();
            var radialGradient = ctx.createRadialGradient(this.ball.x,this.ball.y, 0, this.ball.x, this.ball.y, 15);
            radialGradient.addColorStop(0, "rgba(240,224,35,1)");
            radialGradient.addColorStop(.2, "rgba(240,224,35,.8)");
            radialGradient.addColorStop(1, "rgba(119,119,119,1)");
            ctx.fillStyle = radialGradient;
            ctx.arc(this.ball.x,this.ball.y,20,0,2*Math.PI);
            // let R = 10;
            // let r = 8;
            // for(var m=0;m<5;m++){
            //     ctx.lineTo(Math.cos((18+m*72)/180*Math.PI)*R+this.ball.x,
            //             -Math.sin((18+m*72)/180*Math.PI)*R+this.ball.y
            //     );
            //     ctx.lineTo(Math.cos((54+m*72)/180*Math.PI)*r+this.ball.x,
            //             -Math.sin((54+m*72)/180*Math.PI)*r+this.ball.y
            //     );
            // };
            ctx.fill(); 
            ctx.closePath();
            // ctx.stroke();
        },
        createLinearGradient(begin,end,startColor,endColor,ctx){
              var lineGradient = ctx.createLinearGradient(...begin, ...end);
                            lineGradient.addColorStop(0, startColor);
                            lineGradient.addColorStop(0.6, 'rgba(240,224,35,.4)');
                            lineGradient.addColorStop(1, endColor);
              return lineGradient
        },
        updataBall(){
            let time = this.time*1/3000;
            let x = Math.pow((1 - time) ,2)*this.begin[0] + 2*time*(1 - time)*this.control[0] + Math.pow(time ,2) * this.end[0];
            let y = Math.pow((1 - time) ,2)*this.begin[1] + 2*time*(1 - time)*this.control[1] + Math.pow(time ,2) * this.end[1];
            this.ball.x = x;
            this.ball.y = y;
            this.time+=250;
            if(time == 1 && x<=160){
                this.time = 0;
                this.begin = [160,280];
                this.control = [225,-240];
                this.end = [270,220];
                this.time += 250;
            }else if(time == 1 && x>160 && x<=270){
                this.time = 0;
                this.begin = [270,220];
                this.control = [325,-80];
                this.end = [380,330];
                this.time += 250;
            }else if(time == 1 && x>270 && x<=380){
                this.time = 0;
                this.begin = [380,330];
                this.control = [435,-240];
                this.end = [490,220];
                this.time += 250;
            }else if(time == 1 && x>380 && x<=490){
                this.ball.x = 490;
                this.ball.y = 220;
            }
        }
    },
    mounted(){
        let chatTimer = window.setInterval(() => {
            this.initletter();
            this.updataBall();
            if(this.time>=3500){
                window.clearInterval(chatTimer)
            }
        }, 50);
    }
}
</script>

<style>

</style>