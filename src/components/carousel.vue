<template>
    <div>
        <div class="card panels-card rounded-top lighten-2 card-style">
            <canvas id="mycanvas" :width="canvas_width" :height="canvas_height" class="canvas-style"></canvas>
            <div class="row labels">
                <mdb-btn color="green" class="label-btn btn-sm btn-rounded">
                    卡车
                </mdb-btn>
                <mdb-btn color="red" class="label-btn btn-sm btn-rounded">
                    挖掘机
                </mdb-btn>
                <mdb-btn color="yellow" class="label-btn btn-sm btn-rounded">
                    堆高机
                </mdb-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbCardHeader, mdbCardFooter } from 'mdbvue';

    export default {
        components: {
            mdbCard,
            mdbCardBody,
            mdbCardHeader,
            mdbCardTitle,
            mdbCardText,
            mdbBtn,
            mdbCardFooter
        },
        data() {
            return{
                window:{
                    width : -1,
                    height : -1
                },
                topHeight: -1
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        methods: {
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
                this.topHeight = document.getElementById('topBar').clientHeight;
                console.log(window.innerWidth,window.innerHeight,document.getElementById('topBar').clientHeight)
                console.log(this.window.width,this.window.height,this.topHeight)
                this.doDraw();
            },
            doDraw(){
                //  获取canvas
                let that = this;
                var canvas = document.getElementById("mycanvas");
                //  由于弹窗，确保已获取到
                var a = setInterval(() =>{
                    if(!canvas){
                        return false
                    } else {
                        console.log("get canvas successfully");
                        clearInterval(a);
                        //  可以理解为一个画笔，可画路径、矩形、文字、图像
                        var context = canvas.getContext('2d');
                        var img = new Image();
                        console.log(that.currentDisplayed);
                        if(that.currentDisplayed.filename === "")return;
                        let file_path = 'shigongdiansucai/' + that.currentDisplayed.filename;
                        img.src = require('../assets/' + file_path);
                        //  加载图片
                        img.onload = function(){
                            if(img.complete){
                                let o_width = img.width;
                                let o_height = img.height;
                                console.log(o_width,o_height);
                                img.width = that.canvas_width;
                                img.height = that.canvas_height;
                                //  根据图像重新设定了canvas的长宽
                                // canvas.setAttribute("width",img.width)
                                // canvas.setAttribute("height",img.height)
                                //  绘制图片
                                context.drawImage(img,0,0,img.width,img.height);
                                let ratio_w = o_width / img.width;
                                let ratio_h = o_height / img.height;
                                console.log(ratio_w, ratio_h);
                                if(that.problemMap.get(file_path)!==undefined){
                                    // console.log(that.problemMap);
                                    // console.log(that.problemMap.get(file_path));
                                    let boxes = that.problemMap.get(file_path);
                                    for(var i=0;i<boxes.length;i++){
                                        console.log(boxes[i])
                                        switch (boxes[i].category) {
                                            case 2:
                                                context.strokeStyle = "green";
                                                break;
                                            case 1:
                                                context.strokeStyle = "yellow";
                                                break;
                                            case 0:
                                                context.strokeStyle = "red";
                                                break;
                                        }
                                        context.lineWidth = 3;
                                        let b = boxes[i].box;
                                        context.strokeRect(b[0]/ratio_w, b[1]/ratio_h, b[2]/ratio_w, b[3]/ratio_h);
                                    }
                                }

                            }
                        }
                    }
                },0.1);
            },
        },
        computed : {
            ...mapState([
                'problemList',
                'problemMap',
                'fileList',
                'isProblemImage',
                'currentDisplayed'
            ]),
            displayList:function() {
            },
            currentImg:function(){
                let path = '../assets/' + this.problemMap.get(this.currentDisplayed.filename).file_name
                console.log(path)
                return require(path)
            },
            canvas_width:function(){
                console.log("in c width" , this.canvas_height);
                return this.canvas_height * 1.3333;
            },
            canvas_height:function(){
                return 0.88 * (this.window.height - this.topHeight);
            },
            update_flag: function () {
                return this.currentDisplayed;
            }
        },
        watch:{
            update_flag(n,o){
                this.doDraw();
            }
        }

    }
</script>

<style>
    .is-active .al img {
        filter: grayscale(0%);
    }
    .al img {
        filter: grayscale(100%);
    }
    .card-style{
        width: auto;height:auto;max-height: 47rem; margin-left: 1rem; margin-top:1rem;
        align-items: center;
    }
    .canvas-style{
        padding: 1rem 1rem 0.2rem 1rem;
    }
    .label-btn{
        width: auto;
        font-weight: 600;
    }


</style>
