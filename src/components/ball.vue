<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
    data(){
        return {
            ctx:{},
            ball:{x:540,y:20,r:20,g:2,vx:-4,vy:-2,color:'#799e46'},
            balls:[],
            colors:['#418242','#82b36e','#76a14b','#37763a','#799e46']
        }
    },
    methods:{
        initBall(){
          let canvas = this.$refs.canvas;
          this.ctx = canvas.getContext('2d');
          let winW = 600; 
          let winH =600; 
          canvas.width = winW;
          canvas.height = winH;
          //增加小球test
          this.ctx.clearRect(0,0,canvas.width,canvas.height);
          this.ctx.fillStyle = this.ball.color;
          this.ctx.beginPath();
          this.ctx.arc(this.ball.x,this.ball.y,this.ball.r,0,2*Math.PI);
          this.ctx.fill();
          this.ctx.closePath();
        },
        updataBall(){
            this.ball.x += this.ball.vx;
            this.ball.y += this.ball.vy;
            this.ball.vy += this.ball.g;
            if(this.ball.y>=600 - this.ball.r){
                this.ball.y = 600 - this.ball.r;
                this.ball.vy = -this.ball.vy*0.75;
            }
        }
    },
    mounted(){
        setInterval(()=>{
            this.initBall();
            this.updataBall();
        },50);
    }
}
</script>

<style>

</style>