(function($) {
	//创建构造方法
	function Slide(ele,options) {
	    var setting = {
            // 控制炸开的时间
            delay: 1000,
            // 控制轮播图的速度
            speed: 2000
        };
	    this.ele = ele;
	    this.interval = null;
	    this.setting = (options ? ($.extend(true, setting, options)) : setting);
	    this.states = [
            {
                ZIndex: 1,
                width: 120,
                height: 150,
                top: 75,
                left: 100,
                ZOpacity: 0.2
            },
            {
                ZIndex: 2,
                width: 130,
                height: 170,
                top: 65,
                left: 50,
                ZOpacity: 0.45
            },
            {
                ZIndex: 3,
                width: 150,
                height: 200,
                top: 50,
                left: 140,
                ZOpacity: 0.7
            },
            {
                ZIndex: 4,
                width: 200,
                height: 300,
                top: 0,
                left: 275,
                ZOpacity: 1
            },
            {
                ZIndex: 3,
                width: 150,
                height: 200,
                top: 50,
                left: 460,
                ZOpacity: 0.7
            },
            {
                ZIndex: 2,
                width: 130,
                height: 170,
                top: 65,
                left: 565,
                ZOpacity: 0.45
            },
            {
                ZIndex: 1,
                width: 120,
                height: 150,
                top: 75,
                left: 450,
                ZOpacity: 0.2
            }
        ];
	    this.lis = $(this.ele).find('li');
    }

    Slide.prototype = {
        move: function () {
            var _this = this;
            this.lis.each(function(index, ele) {
                var state = _this.states[index];

                $(ele).css('z-index', state.ZIndex).finish().animate(state, _this.setting.delay).find('img').css('opacity', state.ZOpacity);
            })
        },
        next: function () {
            this.states.unshift(this.states.pop());
            console.log(this.states);
            this.move();
        },
        prev: function () {
            this.states.push(this.states.shift());
            this.move();
        },
        autoPlay: function () {
            var _this = this;
            this.interval = setInterval(function() {
                _this.next();
            }, _this.setting.speed);
        },
        showShuffling: function () {
            var _this = this;
            this.move();
            this.autoPlay();
            // 点击下一张
            $(this.ele).find('.zy-next').click(function() {
                _this.next()
            });
            // 点击上一张
            $(this.ele).find('.zy-prev').click(function() {
                _this.prev()
            });
            // 前后按钮的hover事件
            $(this.ele).find('section').hover(function() {
                clearInterval(_this.interval);
            }, function() {
                _this.autoPlay();
            });
        }
    }


    // 找到要轮播图的根标签
	$.fn.zySlide = function(options){
		// options 传过来的参数
		
		$(this).each(function(i,ele){
			console.log(options)
			// 遍历出所有的 轮播图根标签
			// slide(ele,options);
            new Slide(ele,options).showShuffling();
		})
		// 返回 元素
		// 设置支持链式调用
		return this;
	}
})(jQuery);