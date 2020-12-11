<template>
  <div class="hello">
     <canvas ref="canvas" @click="drawPxs"></canvas>
  </div>
</template>

<script>
import leaf from "./../assets/leaf.jpg";
export default {
  name: 'img',
  props: {
    msg: String
  },
  data(){
    return {
      ctx:{},
      img:new Image(),
      imageData:{},
      imagePx:[],
      ball:{x:300,y:300,r:20,g:20,vx:-4,vy:0,color:'#f00'},
      balls:[],
      colors:['#418242','#82b36e','#76a14b','#37763a','#799e46']
    }
  },
  methods: {
    initCanvas(){
       this.img.src = leaf;
       let canvas = this.$refs.canvas;
       this.ctx = canvas.getContext('2d');
      //  let winW = window.innerWidth;
      //  let winH = window.innerHeight;
       let winW = 600; 
       let winH =600; 
       canvas.width = winW;
       canvas.height = winH;
       //图片加载完成，获取像素信息
       this.img.onload = () =>{
         this.ctx.drawImage(
           this.img,
           (canvas.width - this.img.width) / 2,
           (canvas.height - this.img.height) / 2,
           this.img.width,
           this.img.height
         );
         //获取图像的像素信息
         this.imageData =this.ctx.getImageData(
           (canvas.width - this.img.width) / 2,
           (canvas.height - this.img.height) / 2,
           this.img.width,
           this.img.height
         );
       }
       
    },
    getPxs() {
        var position = 0;
        var data = this.imageData.data;//存放Rgba的数组数据
        for(var i =1;i<=this.img.height;i++){
          for(var j =1;j<=this.img.width;j++){//图片不一样的宽度，所以取值要去宽的，不然会遍历不完整
            //获取像素的位置
            position = [(i - 1) * this.img.width + (j - 1)] * 4; 
            if(data[position] >=0){ //透明度不为零
              var px = {
                //重新设置每个像素的位置信息
                x:(this.$refs.canvas.width - this.img.width) / 2 + j + Math.random() * 20,
                y:(this.$refs.canvas.height - this.img.height) / 2 + i + Math.random() * 20,
                fillStyle:
                    "rgba(" +
                    data[position] +
                    "," +
                    data[position + 1] +
                    "," +
                    data[position + 2] +
                    "," +
                    data[position + 3] +
                    ")"
                };
              this.imagePx.push(px);
            }
          }
        }
    },
    drawPxs(){
       this.getPxs();
       let canvas = this.$refs.canvas;
       this.ctx = canvas.getContext("2d");
       this.ctx.clearRect(0,0,canvas.width,canvas.height);
       var len = this.imagePx.length;
       var curr_pixel = null;
       for(var i = 0;i<len;i++){
          curr_pixel = this.imagePx[i];
          this.ctx.fillStyle = curr_pixel.fillStyle;
          this.ctx.fillRect(curr_pixel.x,curr_pixel.y,1,1);
       }
    },

  },
  mounted(){
    this.initCanvas();
    // 当调整窗口大小时重绘canvas
    // window.onresize = () => {
    //   this.initCanvas()
    // }
  }
}
</script>

<style scoped>

</style>
