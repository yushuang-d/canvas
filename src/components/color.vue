<template>
   <canvas id="colors" ref="colors" ></canvas>
</template>

<script>
export default {
    data(){
        return{
            ctx:{},
            t:0,
            t2:1/100,
            num:300,
            u:0,
            u2:null,
            s:null,
            a:null,
            b:null,
            x:null,
            y:null,
            x2:null,
            y2:null
        }
    },
    methods:{
        initCanvas(){
            let canvas = this.$refs.colors;
            this.ctx = canvas.getContext('2d'); 
            canvas.width = 600;
            canvas.height = 300;
        },
        animate(){
            this.ctx.clearRect(0,0,600,300);
            this.ctx.globalCompositeOperation="source-over";
            this.ctx.fillStyle="hsla(0,0%,0%,0)";
            this.ctx.fillRect(0,0,600,300);
            this.ctx.globalCompositeOperation="destination-over";
            for(var i=0;i<1;i++){
                this.x=0;
                this.u2=(this.u/4)+i;
                this.ctx.beginPath();
                for(var j=0;j<this.num;j++){
                    this.x-=0.72*Math.sin(4);
                    this.y=this.x*Math.sin(i+3.0*this.t+this.x/20)/2;
                    this.x2=this.x*Math.cos(this.b)-this.y*Math.sin(this.b);
                    this.y2=this.x*Math.sin(this.b)+this.y*Math.cos(this.b);
                    this.b=(j*3)*Math.PI/6.8;
                    this.ctx.lineWidth = 0.18;
                    this.ctx.arc(600/2-this.x2,300/2-this.y2,0.5,0,2*Math.PI);
                }
                //设置线性渐变
                var lineGradient = this.ctx.createLinearGradient(600/2+this.x2,300/2+this.y2,0,600/2+this.x2,300/2+this.y2);
                            lineGradient.addColorStop(0, 'hsla('+this.u+',85%,50%,1)');
                            lineGradient.addColorStop(0.5, 'hsla('+this.u2+',85%,40%,1)');
                            lineGradient.addColorStop(1, 'hsla(0,0%,5%,1)');
                this.ctx.strokeStyle = lineGradient;
                this.ctx.stroke();
            }
            this.t+=this.t2;
            this.u-=0.2;
            // requestAnimationFrame(this.animate);
        }
    },
    mounted(){
        this.initCanvas()
        this.animate();
    }
}
</script>

<style>

</style>