var degree = 0;
(function (document, $, log) {
    $.fn.artZoom = function (config) {

        config = $.extend({}, $.fn.artZoom.defaults, config);
        var tmpl,that = this,
            $this = $(this),
            path = config.path,
            loading = path + '/loading.gif';

        var $artZoom, buttonClick,originHeight,originWidth,
            $parent = $this.parent(),
            src = $this.attr('src'),
            show = $this.attr('data-artZoom-show') || src,
            source = $this.attr('data-artZoom-source') || show,
            maxWidth = config.maxWidth || $this.parent().width(),
            maxHeight = config.maxHeight || 99999;

        //new Image().src = loading;

        tmpl = [
            '<div class="ui-artZoom-toolbar" style="display:none">',
                '<span class="ui-artZoom-buttons" style="display:none">',
                    '<a href="#" data-go="left" class="ui-artZoom-left"><span></span>',
                        config.left,
                    '</a>',
                    '<a href="#" data-go="right" class="ui-artZoom-right"><span></span>',
                        config.right,
                    '</a>',
                    '<a href="#" data-go="origin" class="ui-artZoom-origin"><span></span>',
                        config.origin,
                    '</a>',
                    '<a href="#" data-go="source" class="ui-artZoom-source"><span></span>',
                        config.source,
                    '</a>',
                    '<a href="#" data-go="hide" class="ui-artZoom-hide"><span></span>',
                        config.hide,
                    '</a>',
                '</span>',
                '<span class="ui-artZoom-loading">',
                    '<img data-live="stop" src="',
                        loading,
                        '" style="',
                        'display:inline-block;*zoom:1;*display:inline;vertical-align:middle;',
                        'width:16px;height:16px;"',
                    ' />',
                    ' <span>Loading..</span>',
                '</span>',
            '</div>',
            '<div class="ui-artZoom-box" id="ui-artZoom-box" style="display:none">',
                    '<img data-name="thumb" data-go="hide" data-live="stop" src="',
                        loading,
                    '" />',
                '</span>',
            '</div>'
        ].join('');

        if (!$this.data('artZoom')) {
            var wrap = document.createElement('div'),
                $thumb, $box, $show;
            $artZoom = $(wrap);
            wrap.className = 'ui-artZoom ui-artZoom-noLoad';
            wrap.innerHTML = tmpl;
            $this.before(wrap);
            $this.data('artZoom', $artZoom);
            $box = $artZoom.find('.ui-artZoom-box');
            $thumb = $artZoom.find('[data-name=thumb]');

            // 快速获取大图尺寸
            imgReady(show, function () {
                var width = this.width,
                    height = this.height,
                    maxWidth2 = Math.min(maxWidth, width);

                height = maxWidth2 / width * height;
                width = maxWidth2;
                originHeight = height;
                originWidth = width;

                // 插入大图并使用逐渐清晰加载的效果
                $thumb.attr('src', src).
                    css(config.blur ? {
                        width: width + 'px',
                        height: height + 'px'
                    } : {display: 'none'}).
                    after([
                        '<img class="ui-artZoom-show" id="showBoxImg" title="',
                        that.title,
                        '" alt="',
                        that.alt,
                        '" src="',
                        show,
                        '" style="width:',
                        width,
                        'px;height:',
                        height, // IE8 超长图片height属性失效BUG，改用CSS
                        'px;position:absolute;left:0;top:0;background:transparent"',
                        ' />'
                    ].join(''));

                $show = $artZoom.find('.ui-artZoom-show');
                $thumb.attr('class', 'ui-artZoom-show');
                $artZoom.addClass('ui-artZoom-ready');
                $artZoom.find('.ui-artZoom-buttons').show();
                $this.data('artZoom-ready', true);
                $this.hide();
                $box.height(originHeight);
                $box.width(originWidth);
                $box.show();
                setZoom();
            }, function () {// 大图完全加载完毕
                $thumb.removeAttr('class').hide();
                $show.css({
                    position: 'absolute',
                    left: 'auto',
                    top: 'auto'
                });

                $artZoom.removeClass('ui-artZoom-noLoad');
                $artZoom.find('.ui-artZoom-loading').hide();
                $this.data('artZoom-load', true);

            }, function () {// 图片加载错误
                $artZoom.addClass('ui-artZoom-error');
                log('jQuery.fn.artZoom: Load "' + show + '" Error!');
            });
        }


        $artZoom = $this.data('artZoom');
        buttonClick = function (event) {
            var target = this,
                go = target.getAttribute('data-go'),
                live = target.getAttribute('data-live'),
                elem = $artZoom.find('.ui-artZoom-show')[0];
                $box = $artZoom.find('.ui-artZoom-box');
            if (live === 'stop') return false;

            if (/img|canvas$/i.test(target.nodeName)) go = 'hide';

            switch (go) {
                case 'left':
                    degree -= 90;
                    degree = degree === -90 ? 270 : degree;
                    break;
                case 'right':
                    degree += 90;
                    degree = degree === 360 ? 0 : degree;
                    break;
                case 'origin':
                    break;
                case 'source':
                    window.open(source || show || src);
                    break;
                case 'hide':
                    $this.show();
                    $artZoom.find('.ui-artZoom-toolbar').hide();
                    $artZoom.hide();
                    $artZoom.find('[data-go]').die('click', buttonClick);
                    break;
            }

            if ((go === 'left' || go === 'right') && $this.data('artZoom-load')) {
                $this.data('artZoom-degree', degree);
                if(degree==90 || degree == 270){
                    $box.height(originWidth);
                    $box.width(originHeight);
                    imgRotate(elem, degree, originHeight, originWidth);
                }else{
                    $box.height(originHeight);
                    $box.width(originWidth);
                    imgRotate(elem, degree, originWidth, originHeight);
                }
            }

            if(go === 'origin'){
                if(degree==0){
                    $box.width(originWidth);
                    $box.height(originHeight);
                    $('#ui-artZoom-box').height(originHeight);
                    //alert($('canvas').height());
                    if($('canvas').length>0){
                        $('canvas').remove();
                        $thumb = $artZoom.find('[data-name=thumb]');

                        $(elem).css('transform','rotate(0deg)');
                        $(elem).css('-webkit-transform','rotate(0deg)');
                        $(elem).css('-moz-transform','rotate(0deg)');
                        $(elem).css('-msd-transform','rotate(0deg)');
                        $(elem).height(originHeight).width(originWidth).show();

                    }
                }else if(degree==90){
                    $box.height(originWidth);
                    $box.width(originHeight);
                    $('#ui-artZoom-box').height(originWidth);
                    if($('canvas').length>0){
                        $('canvas').remove();
                        $thumb = $artZoom.find('[data-name=thumb]');
                        $(elem).css({left:originHeight,top:0});
                        $(elem).css('transform','rotate(90deg)');
                        $(elem).css('-webkit-transform','rotate(90deg)');
                        $(elem).css('-moz-transform','rotate(90deg)');
                        $(elem).css('-msd-transform','rotate(90deg)');
                        $(elem).height(originHeight).width(originWidth).show();

                    }
                }else if(degree==180){
                    $box.width(originWidth);
                    $box.height(originHeight);
                    $('#ui-artZoom-box').height(originHeight);
                    if($('canvas').length>0){
                        $('canvas').remove();
                        $thumb = $artZoom.find('[data-name=thumb]');
                        $(elem).css({left:0,top:0});
                        $(elem).css('transform','rotate(180deg)');
                        $(elem).css('-webkit-transform','rotate(180deg)');
                        $(elem).css('-moz-transform','rotate(180deg)');
                        $(elem).css('-msd-transform','rotate(180deg)');
                        $(elem).height(originHeight).width(originWidth).show();
                        $(elem).css({left:0,top:0});
                    }
                }else {
                    $box.height(originWidth);
                    $box.width(originHeight);
                    $('#ui-artZoom-box').height(originWidth);
                    if($('canvas').length>0){
                        $('canvas').remove();
                        $thumb = $artZoom.find('[data-name=thumb]');
                        $(elem).css({left:0,top:0});
                        $(elem).css('transform','rotate(270deg)');
                        $(elem).css('-webkit-transform','rotate(270deg)');
                        $(elem).css('-moz-transform','rotate(270deg)');
                        $(elem).css('-msd-transform','rotate(270deg)');
                        $(elem).height(originHeight).width(originWidth).show();
                        $(elem).css({left:0,top:0});
                    }
                }
            }
            return false;
        };
        $artZoom.show().find('.ui-artZoom-toolbar').slideDown(150);
        $artZoom.find('[data-go]').on('click', buttonClick);

        return this;
    };


    $.fn.artZoom.defaults = {
        path: './images',
        left: '\u5de6\u65cb\u8f6c',
        right: '\u53f3\u65cb\u8f6c',
        source: '\u770b\u539f\u56fe',
        hide: '\xd7',
        blur: true,
        preload: true,
        maxWidth: null,
        maxHeight: null,
        borderWidth: 18
    };

/**
 * 图片旋转
 * @version	2011.05.27
 * @author	TangBin
 * @param	{HTMLElement}	图片元素
 * @param	{Number}		旋转角度 (可用值: 0, 90, 180, 270)
 * @param	{Number}		最大宽度限制
 * @param	{Number}		最大高度限制
 */
var imgRotate = $.imgRotate = function () {
	var eCanvas = '{$canvas}',
		isCanvas = !!document.createElement('canvas').getContext;

	return function (elem, degree, maxWidth, maxHeight) {
		var x, y, getContext,
			resize = 1,
			width = elem.naturalWidth,
			height = elem.naturalHeight,
			canvas = elem[eCanvas];

		// 初次运行
		if (!elem[eCanvas]) {
			// 获取图像未应用样式的真实大小 (IE和Opera早期版本)
			if (!('naturalWidth' in elem)) {
				var run = elem.runtimeStyle, w = run.width, h = run.height;
				run.width  = run.height = 'auto';
				elem.naturalWidth = width = elem.width;
				elem.naturalHeight = height = elem.height;
				run.width  = w;
				run.height = h;
			}

			elem[eCanvas] = canvas = document.createElement(isCanvas ? 'canvas' : 'span');
			elem.parentNode.insertBefore(canvas, elem.nextSibling);
			elem.style.display = 'none';

			canvas.className = elem.className;
			canvas.title = elem.title;
			if (!isCanvas) {
				canvas.img = document.createElement('img');
				canvas.img.src = elem.src;
				canvas.appendChild(canvas.img);
				canvas.style.cssText = 'display:inline-block;*zoom:1;*display:inline;' +
					// css reset
					'padding:0;margin:0;border:none 0;position:static;float:none;overflow:hidden;width:auto;height:auto';
			}
		}else{
            elem.parentNode.insertBefore(canvas, elem.nextSibling);
            elem.style.display = 'none';
        }

		var size = function (isSwap) {
			if (isSwap) width = [height, height = width][0];
			if (width > maxWidth) {
				resize = maxWidth / width;
				height =  resize * height;
				width = maxWidth;
			}
			if (height > maxHeight) {
				resize = resize * maxHeight / height;
				width = maxHeight / height * width;
				height = maxHeight;
			}
			if (isCanvas) (isSwap ? height : width) / elem.naturalWidth;
		};
		switch (degree) {
			case 0:
				x = 0;
				y = 0;
				size();
				break;
			case 90:
				x = 0;
				y = -elem.naturalHeight;
				size(true);
				break;
			case 180:
				x = -elem.naturalWidth;
				y = -elem.naturalHeight
				size();
				break;
			case 270:
				x = -elem.naturalWidth;
				y = 0;
				size(true);
				break;
		}

		if (isCanvas) {
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			getContext = canvas.getContext('2d');
			getContext.rotate(degree * Math.PI / 180);
			getContext.scale(resize, resize);
			getContext.drawImage(elem, x, y);
		} else {
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';// 解决IE8使用滤镜后高度不能自适应
			canvas.img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + degree / 90 + ')';
			canvas.img.width = elem.width * resize;
			canvas.img.height = elem.height * resize;
		}
	};
}();

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version	2011.05.27
 * @author	TangBin
 * @see		http://www.planeart.cn/?p=1121
 * @param	{String}	图片路径
 * @param	{Function}	尺寸就绪
 * @param	{Function}	加载完毕 (可选)
 * @param	{Function}	加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
var imgReady = (function () {
	var list = [], intervalId = null,

	// 用来执行队列
	tick = function () {
		var i = 0;
		for (; i < list.length; i++) {
			list[i].end ? list.splice(i--, 1) : list[i]();
		}
		!list.length && stop();
	},

	// 停止所有定时器队列
	stop = function () {
		clearInterval(intervalId);
		intervalId = null;
	};

	return function (url, ready, load, error) {
		var onready, width, height, newWidth, newHeight,
			img = new Image();

		img.src = url;

		// 如果图片被缓存，则直接返回缓存数据
		if (img.complete) {
			ready.call(img);
			load && load.call(img);
			return;
		}

		width = img.width;
		height = img.height;

		// 加载错误后的事件
		img.onerror = function () {
			error && error.call(img);
			onready.end = true;
			img = img.onload = img.onerror = null;
		};

		// 图片尺寸就绪
		onready = function () {
			newWidth = img.width;
			newHeight = img.height;
			if (newWidth !== width || newHeight !== height ||
				// 如果图片已经在其他地方加载可使用面积检测
				newWidth * newHeight > 1024
			) {
				ready.call(img);
				onready.end = true;
			};
		};
		onready();

		// 完全加载完毕的事件
		img.onload = function () {
			// onload在定时器时间差范围内可能比onready快
			// 这里进行检查并保证onready优先执行
			!onready.end && onready();

			load && load.call(img);

			// IE gif动画会循环执行onload，置空onload即可
			img = img.onload = img.onerror = null;
		};

		// 加入队列中定期执行
		if (!onready.end) {
			list.push(onready);
			// 无论何时只允许出现一个定时器，减少浏览器性能损耗
			if (intervalId === null) intervalId = setInterval(tick, 40);
		}
	};
})();

}(document, jQuery, function (msg) {window.console && console.log(msg)}));

function stopEvent(e){
    if(e && e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

function setZoom(){
    var picItem = document.getElementById("ui-artZoom-box"),
        artZoomImg = document.getElementById("showBoxImg"),
        scale = 2;

    picItem.left = picItem.getBoundingClientRect().left;
    picItem.top = picItem.getBoundingClientRect().top;

    picItem.onmouseover = function(e){
        var event = e || window.event;
        artZoomImg.style.width = artZoomImg.offsetWidth * scale + "px";
        artZoomImg.style.height = artZoomImg.offsetHeight * scale + "px";
        artZoomImg.style.left = (this.offsetWidth - artZoomImg.offsetWidth) / 2 + "px";
        artZoomImg.style.top = (this.offsetHeight - artZoomImg.offsetHeight) / 2 + "px";

        this.dsx = Math.abs(parseInt(artZoomImg.style.left));
        this.dsy = Math.abs(parseInt(artZoomImg.style.top));
        this.cdx = this.offsetWidth / 2;
        this.cdy = this.offsetHeight / 2;
        this.left = (this.offsetWidth - artZoomImg.offsetWidth) / 2;
        this.top = (this.offsetHeight - artZoomImg.offsetHeight) / 2;

        stopEvent(event);
    };
    picItem.onmouseout = function(e){
        var event = e || window.event;
        artZoomImg.style.width = artZoomImg.offsetWidth / scale + "px";
        artZoomImg.style.height = artZoomImg.offsetHeight / scale + "px";
        artZoomImg.style.left = Math.floor((this.offsetWidth - artZoomImg.offsetWidth) / 2) + "px";
        artZoomImg.style.top = Math.floor((this.offsetHeight - artZoomImg.offsetHeight) / 2) + "px";

        stopEvent(event);
    };
    picItem.onmousemove = function(e){
        var event = e || window.event;
        var center = {"x":this.getBoundingClientRect().left + this.offsetWidth / 2,"y":this.getBoundingClientRect().top + this.offsetHeight / 2};
        var mPos = {"x":event.clientX,"y":event.clientY};
        var deltax = center.x - mPos.x,deltay = center.y - mPos.y;
        var dleft = deltax / this.cdx * this.dsx;
        var dtop = deltay / this.cdy * this.dsy;
        artZoomImg.style.left = Math.floor(this.left + dleft) + "px";
        artZoomImg.style.top = Math.floor(this.top + dtop) + "px";
        stopEvent(event);
    }
}
