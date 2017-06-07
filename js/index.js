/*
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
*/

/*
 * 现在的轮播图它不具备插件的功能
 * 
 * 1. 我们不能直接加标签进行使用
 * 2. 插件中最好是不要出现 id ，原因 ： 插件是能够重复
 * 	  使用的，也就是说在同页面中可能多次使用，造成冲突
 * 3. 变量的命名和方法的命名： states，move()，next()
 *    prev()，interval,用户可能在使用这个插件的时候，
 *    可能还会引入自己创建的 js 文件，也有可能是这样命名
 *    的，那么就会产生冲突
 * 4. 标签 class 的值的问题，prev,next这些 class 太过于
 *    大众化，谁写标签都想使用 prev,next ，势必会产生冲突
 * 5. 插件文件命名问题： index.js,index.css 这些名字更
 *    过于大众化，比方我们自己可以有自己独特的名字 wtx.jQuery.js
 * */

/*
 *  变量的作用域问题：
 *  1. 全局域(Window)	2. 函数域(Function)
 * 	全局域： 从页面被打开之后到页面被关闭之前始终存在的
 *  函数域： 存在于函数调用的一瞬间（这个不能太绝对，要考虑闭包的存在）
 * 
 *  什么是闭包：
 * 	闭包的作用： 可以保留函数的作用域
 * 
 */


// 自运行的匿名函数
//(function(){
//	alert('自运行匿名函数');
//})();
//// jQuery 的写法
//$(function(){
//	alert('猜猜我会不会输出');
//});

// JS 语言的特殊之处，函数内部可以直接读取全局变量
//var str = '呵呵';
//function f1(){
//	alert(str);
//}
//f1(); // 结果为 ： 呵呵

// 函数外部无法使用函数内部的变量
//function f2(){
//	var str1 = '你好世界';
//}
//f2();
//alert(str1)

// 函数内部声明变量的时候，一定要加上 var ,如果不加，你实际
// 上是声明了一个全局变量
//function f3(){
//	str2 = '你好我好大家好才是真的好'
//}
//f3()
//alert(str2)
//
//function f4(){
//	var str3 = '鹅鹅鹅';
//	function fs(){
//		alert(str3);
//	}
//	return fs;
//}
//var a = f4();
//a();

function f5(){
	var number = 110;
	numberAdd = function(){
		number++;
	}
	function fz(){
		alert(number);
	}
	return fz;
}
var index = f5();
index();  // 结果为 : 110
numberAdd();  // 可以调用numberAdd方法，因为声明时没有加var
index();  // 结果为 ： 111

// 什么是闭包：
// 当内部函数的作用域，被外部引用时，就创建了该内部函数的
// 闭包，如果内部函数引用了位于外部函数的变量，当外部函数调用
// 完毕后，这些变量在内存中不会被释放，因为闭包需要他们

// 闭包产生的必要条件： 函数里面套函数(内部函数要使用外部函数作用域中的变量)
