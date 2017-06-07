
// 规定好每张图片处于的位置和状态
var states = [
	{ZIndex:1,width: 120,height: 150,top: 75,left: 100,ZOpacity: 0.2},
	{ZIndex:2,width: 130,height: 170,top: 65,left: 50,ZOpacity: 0.45},
	{ZIndex:3,width: 150,height: 200,top: 50,left: 140,ZOpacity: 0.7},
	{ZIndex:4,width: 200,height: 300,top: 0,left: 275,ZOpacity: 1},
	{ZIndex:3,width: 150,height: 200,top: 50,left: 460,ZOpacity: 0.7},
	{ZIndex:2,width: 130,height: 170,top: 65,left: 565,ZOpacity: 0.45},
	{ZIndex:1,width: 120,height: 150,top: 75,left: 450,ZOpacity: 0.2}
]

var lis = $('#box li');
// 让每个 li 对应 上面设置的 states 的每个状态
function move(){
	lis.each(function(index,ele){
		var state = states[index];
		
		$(ele).css('z-index',state.ZIndex).finish().animate(state,1000).find('img').css('opacity',state.ZOpacity);
	})
}
// 让 li 从中间展开
move()
// 下一张，让轮播图动起来
function next(){
	// 原理 ： 把数组中最后一个元素移到数组的第一位
	states.unshift(states.pop());
	move();
}
// 上一张
function prev(){
	states.push(states.shift());
	move();
}
// 点击下一张
$('#box .next').click(function(){
	next()
});
// 点击上一张
$('#box .prev').click(function(){
	prev()
});

// 自动轮播的方法
var interval = null;
function autoPlay(){
	interval = setInterval(function(){
		next();
	},2000);
}
autoPlay();

// 停止轮播
$('#box section').hover(function(){
	clearInterval(interval);
},function(){
	autoPlay();
})

