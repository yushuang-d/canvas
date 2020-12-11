<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
    data(){
        return {
            ctx:{},
            ball:{x:5,y:155,r:20,g:2,vx:-4,vy:-2,color:'#799e46'},
            balls:[],
            colors:['#418242','#82b36e','#76a14b','#37763a','#799e46'],
            begin:[5,155],
            control:[15.5,80],
            end:[16,161],
            time:0
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
          this.ctx.arc(this.ball.x,this.ball.y,2,0,2*Math.PI);
          this.ctx.fill();
          this.ctx.moveTo(5,155);
          this.ctx.quadraticCurveTo(15.5,80,16,161);
          this.ctx.quadraticCurveTo(22.5,100,26,150);
          this.ctx.quadraticCurveTo(31.5,60,38,161);
          this.ctx.quadraticCurveTo(44.5,100,49,150);
          this.ctx.stroke();
          this.ctx.closePath();
        },
        updataBall(time){
            time = time*1/600;
            let x = Math.pow((1 - time) ,2)*this.begin[0] + 2*time*(1 - time)*this.control[0] + Math.pow(time ,2) * this.end[0];
            let y = Math.pow((1 - time) ,2)*this.begin[1] + 2*time*(1 - time)*this.control[1] + Math.pow(time ,2) * this.end[1];
            // console.log(x,y);
            this.ball.x = x;
            this.ball.y = y;
            console.log(x,y);
            // if(x>=15.98){
            //     this.begin = [16,161];
            //     this.control = [22.5,100];
            //     this.end = [26,150];
            // }else if(x>=25.98){
            //     this.begin = [26,150];
            //     this.control = [31.5,60];
            //     this.end = [38,161];
            //     console.log(x);
            // }else if(x>=37.98){
            //     this.begin = [38,161];
            //     this.control = [44.5,100];
            //     this.end = [49,150];
            // }
            
            
        }
    },
    mounted(){
        setInterval(()=>{
            this.initBall();
            this.updataBall(this.time+=50);
        },50);
    }
}
</script>

<style>

</style>