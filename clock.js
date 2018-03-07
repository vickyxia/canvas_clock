/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-07 14:04:29
 * @version $Id$
 */

var dom = document.getElementById('clock');
var ctx = dom.getContext("2d"); //获取canvas环境
var width= ctx.canvas.width;  
var height = ctx.canvas.height;
var r = width/2;
var radio = width/200; //画图的比例，canvas变化大小时内容随着变大小

function drawBackground(){
	ctx.save();// 保存状态，后面清除重画的时候要用到，原点坐标是左上角
	//画外框
	ctx.translate(r,r); //圆心换到画布正中心(中心变成（０,０））
	ctx.beginPath();
	ctx.lineWidth = 10*radio;　//框10px
	ctx.arc(0,0,r-ctx.lineWidth/2,0, 2*Math.PI,false);  //画圆形
	ctx.stroke();//描边外框

　　　//画数字
	var hourNum = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18 *radio+"px Arial";
	ctx.textAlign = "center";  //文本的中心被放置在指定的位置，文本对齐
	ctx.textBaseline = 'middle';　//绘制文本基线
	hourNum.forEach(function(number,i){
		var rad = 2*Math.PI/12 *i ; //每个点对应的弧度数
		var x = Math.cos(rad)*(r-30*radio); 
		var y = Math.sin(rad)*(r-30*radio);
		ctx.fillText(number,x,y); //填数字
	});

	//画点点60个
	for(var i=0;i<60;i++){
		var sec = 2*Math.PI/60*i;
		var x = Math.cos(sec)*(r-18*radio);
		var y = Math.sin(sec)*(r-18*radio);
		ctx.beginPath();
		if(i %5 ===0){  //整数点画大黑点
			ctx.fillStyle = "#000";  //灰色
			ctx.arc(x,y,2*radio,0,2*Math.PI,false);//每个计算出的点处都要画圆
		}else{
			ctx.fillStyle = "#ccc";  //灰色
			ctx.arc(x,y,1*radio,0,2*Math.PI);//每个计算出的点处都要画圆
		}
		
		ctx.fill();//填充圆点
	}

}


function drawHour(hour,min){
	ctx.save(); //保存当前环境的状态，因为不同时分秒要旋转
	ctx.beginPath();
	var rad = 2*Math.PI / 12 *hour;
	var mrad =  2*Math.PI / 12/ 60 * min;
	ctx.rotate(rad+mrad);//旋转绘图
	ctx.lineCap = "round"; //圆形线帽
	ctx.lineWidth = 4*radio; //线宽
	ctx.strokeStyle = "#282626"; //笔触颜色
	ctx.moveTo(0,10*radio);
	ctx.lineTo(0,-r/2);
	ctx.stroke();　//划线描边
	ctx.restore();//恢复之前环境
}

function drawMin(min){
	ctx.save();
	ctx.beginPath();
	rad = 2*Math.PI/60 *min;
	ctx.rotate(rad);
	ctx.lineCap = "round";
	ctx.lineWidth = 3*radio;
	ctx.strokeStyle = "#e33e3e";
	ctx.moveTo(0,10*radio);
	//ctx.lineTo(0,-r+35*radio);
	ctx.lineTo(-2,20*radio);
	ctx.lineTo(2,20*radio);
	ctx.lineTo(1,-r+35*radio);
	ctx.lineTo(-1, -r+35*radio);
	ctx.stroke();
	ctx.restore();
}

function drawSec(sec){
	ctx.save();
	ctx.beginPath();
	var rad =2* Math.PI/60*sec;
	ctx.rotate(rad);
	ctx.lineWidth = 2*radio;
	ctx.lineCap ="round";
	ctx.strokeStyle = "#f4c018";
	ctx.moveTo(0,20*radio);
	ctx.lineTo(0,-r+30*radio);
	ctx.stroke();
	ctx.restore();
}


function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0,0,3*radio,0,2*Math.PI,false);
	ctx.fill();
}



	// drawBackground();
	// drawHour(4,30);
	// drawMin(30);
	// drawSec(50);
	// drawDot();

function draw(){
	ctx.clearRect(0,0,width,height); //清空工作区重画，不然所有的轨迹都有
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	drawBackground();
	drawHour(hour,min);
	drawMin(min);
	drawSec(sec);
	drawDot();
	ctx.restore();//恢复原来环境，坐标原点左上角．因为中间调用了一次原点是设置，所以需要还原
}

draw();
setInterval(draw, 1000); 　　//每隔１秒画一次．