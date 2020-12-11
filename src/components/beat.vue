<template>
   <canvas ref="canvas"></canvas>
</template>

<script>
import * as util from "./../assets/js/util.js";
export default {
    data(){
        return {
            winW:300,
            winH:300,
            ctx:{},
            radiu:1,
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
                var x = a*10+a;
                this.renderletter(x,150,letters[a],this.ctx);
            }
        },
        renderletter(x,y,letter,ctx){
            ctx.fillStyle = "rgb(83,150,225)";
            for(var i=0;i<util.lettersArr[letter].length;i++){
                for(var j =0;j<util.lettersArr[letter][i].length;j++){
                    if(util.lettersArr[letter][i][j] == 1){
                        ctx.beginPath();
                        // ctx.arc(x+j*(this.radiu*2+2)+(this.radiu+1),y+i*(this.radiu*2+2)+(this.radiu+1),this.radiu,0,2*Math.PI);
                        ctx.fillRect(x+j*this.radiu,y+i*this.radiu,this.radiu,this.radiu);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
            this.renderBeatball(ctx);
        },
        renderBeatball(ctx){
            ctx.fillStyle = "#f00";
            ctx.beginPath();
            ctx.moveTo(5,155);
            ctx.quadraticCurveTo(15.5,80,16,161);
            ctx.quadraticCurveTo(22.5,100,26,150);
            ctx.quadraticCurveTo(31.5,60,38,161);
            ctx.quadraticCurveTo(44.5,100,49,150);
            ctx.stroke();
            ctx.closePath();
        }
        
    },
    mounted(){
       this.initletter();
    }
}
</script>

<style>

</style>