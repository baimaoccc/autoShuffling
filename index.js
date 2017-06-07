// jQuwey 让出 $ 符号的使用权限,也就是说从现在开始 $ 将不在是
// jQuwey， 只能使用变量 jQuery
jQuery.noConflict();
// $('#a')

jQuery('.slide').zySlide({speed:1000});
jQuery('#slide').zySlide({delay:2000,speed:2000}).css({
	'border': '2px solid red',
	'backgroundColor': 'green'
});

