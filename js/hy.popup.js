;(function($){
    $.fn.realert = function(options){  //一个按钮的弹窗
        var defaults = { //默认参数
            backgroundcolor : "#72D1FF",
            text : '这是默认值',
            color:'#60B0D1',
            width:371,
            height:183,
            img:"none"
        };
        options = $.extend(defaults,options);
        var nodeParent = $("<div class='parentbox'></div>"); //弹出层遮罩层节点
    	var nodeBox = $("<div class='alertbox'></div>"); //弹出框节点
    	var contentBox = $("<div class='contentBox'><i></i><span>" + options.text + "</span></div>"); //弹出框内容节点
    	var nodeWrapp = $("<div class='wrappbox'>提示</div>"); 
    	var confirmBox = $("<div class='confirmbox'></div>"); //弹出框按钮父节点
    	var confirmButton = $("<div class='confirmbutton'>确定</div>"); //按钮节点
        $('body').prepend(nodeParent);  //将节点插入文档
        nodeBox.append(contentBox);
        nodeBox.append(confirmBox);
        confirmBox.append(confirmButton);
        nodeParent.prepend(nodeBox);
        nodeBox.prepend(nodeWrapp);
        nodeParent.css({       //设置各节点样式
        	width:100+'%',
        	height:100+'%',
        	'background-color':'rgba(0,0,0,0.3)',
        	position:'fixed',
        	top:0,
        	left:0,
        	'z-index':'999999'
        });
        nodeBox.css({
        	position:'fixed',
        	width:371,
        	height:183,
        	'background-color':'#fff',
        	'border-radius':5+'px',
        });
        nodeWrapp.css({
        	position:'relative',
        	width:100 +'%',
        	height:50,
        	'background-color':options.backgroundcolor,
        	'border-radius':5+'px',
        	'line-height':50+'px',
        	color:'#fff',
        	'padding-left':20,
        });
        contentBox.css({
        	'text-align':'center',
        	'padding':'20px 0',
        	'color':options.color
        });
        contentBox.children('i').css({
        	display:'inline-block',
        	width:30,
        	height:30,
        	'background':"url('../img/icon.png') no-repeat",
        	'vertical-align': 'top',
        	'margin-right':'10px'
        });
        contentBox.children('span').css({
        	'vertical-align': 'sub'
        })
        confirmBox.css({
        	height:40,
        	width:50+'%',
        	'margin-left':'25%',
        	'text-align':'center'
        });
        confirmButton.css({
        	'display':'inline-block',
        	height:30,
        	'line-height':'30px',
        	padding:'0 15px',
        	color:'#fff',
        	'margin-top':'10px',
        	'text-align':'center',
        	'background-color':'#EC6D51',
        	'border-radius':'5px',
        });
        function imgtype(){  //弹出框内容节点里的icon类型函数
        	if(defaults.img == 'none'){
        		contentBox.children('i').hide();
        	}
        	if(defaults.img == 'success'){
        		contentBox.children('i').css({
        			'background-position': '-30px 0'
        		});
        	}
        	if(defaults.img == 'warning'){
        		contentBox.children('i').css({
        			'background':"url('../img/icon.png') no-repeat",
        		});
        	}
        	if(defaults.img == 'error'){
        		contentBox.children('i').css({
        			'background-position': '-60px 0'
        		});
        	}
        }
        imgtype();
        nodeWrapp.hover(function(e){
			nodeWrapp.css({
				'cursor':'move'
			})
		},function(){
    		
		});
        confirmButton.on('click',function(e){  //弹出层隐藏
        	var e = e || window.event;
        	e.stopPropagation;
        	nodeParent.hide();
        })
        var mx = 0,my = 0;      //鼠标x、y轴坐标（相对于left，top）
    	var dx = 0,dy = 0;      //对话框坐标（同上）
    	var isDraging = false;      //不可拖动
    	function autoCenter(el){    //弹出框居中函数
            var bodyW = $(window).width();
            var bodyH = $(window).height();
            var elW = el.width();
            var elH = el.height();
            nodeBox.css({"left":(bodyW-elW)/2 + 'px',"top":(bodyH-elH)/2 + 'px'});        
        };
        autoCenter(nodeBox);
        window.onresize = function(){
            autoCenter(nodeBox);
        };
        nodeWrapp.mousedown(function(e){  //弹出框鼠标移动
        	mx = e.pageX;
        	my = e.pageY;
        	dx = nodeBox.offset().left;
            dy = nodeBox.offset().top;
        	isDraging = true;
        });
        $(document).mousemove(function(e){
        	var e = e || window.event;
        	var x = e.pageX;      //移动时鼠标X坐标
            var y = e.pageY;      //移动时鼠标Y坐标
            if(isDraging){        //判断对话框能否拖动
                    var moveX = dx + x - mx;      //移动后对话框新的left值
                    var moveY = dy + y - my;      //移动后对话框新的top值
                    //设置拖动范围
                    var pageW = $(window).width();
                    var pageH = $(window).height();
                    var dialogW = nodeBox.width();
                    var dialogH = nodeBox.height();
                    var maxX = pageW - dialogW;       //X轴可拖动最大值
                    var maxY = pageH - dialogH;       //Y轴可拖动最大值
                    moveX = Math.min(Math.max(0,moveX),maxX);     //X轴可拖动范围
                    moveY = Math.min(Math.max(0,moveY),maxY);     //Y轴可拖动范围
                    //重新设置对话框的left、top
                    $('.alertbox').css({"left":moveX + 'px',"top":moveY + 'px'});
                };
        })
        nodeWrapp.mouseup(function(e){
        	isDraging = false;
        })
    }
    $.fn.reconfirm = function(options){
        var defaults = { //默认参数
            backgroundcolor : "#72D1FF",
            text : '这是默认值',
            color:'#60B0D1',
            width:371,
            height:183,
            img:'success',
            yes: function(){},
            no:function(){
            	nodeParent.hide();
            }
        };
        options = $.extend(defaults,options);
        var nodeParent = $("<div class='parentbox'></div>");
    	var nodeBox = $("<div class='alertbox'></div>");
    	var contentBox = $("<div class='contentBox'><i></i><span>" + options.text + "</span></div>");
    	var nodeWrapp = $("<div class='wrappbox'>提示</div>");
    	var confirmBox = $("<div class='confirmbox'></div>");
    	var confirmButton = $("<div class='confirmbutton'>确定</div>");
    	var cancelButton = $("<div class='cancelbutton'>取消</div>")
        $('body').prepend(nodeParent);
        nodeBox.append(contentBox);
        nodeBox.append(confirmBox);
        confirmBox.append(confirmButton);
        confirmBox.append(cancelButton);
        nodeParent.prepend(nodeBox);
        nodeBox.prepend(nodeWrapp);
        nodeParent.css({
        	width:100+'%',
        	height:100+'%',
        	'background-color':'rgba(0,0,0,0.3)',
        	position:'fixed',
        	top:0,
        	left:0,
        	'z-index':999999,
        });
        nodeBox.css({
        	position:'fixed',
        	width:371,
        	height:183,
        	'background-color':'#fff',
        	'border-radius':5+'px',
        	'box-shadow': '1px 1px 50px rgba(0,0,0,.3)'

        });
        nodeWrapp.css({
        	position:'relative',
        	width:100 +'%',
        	height:50,
        	'background-color':options.backgroundcolor,
        	'border-radius':5+'px',
        	'line-height':50+'px',
        	color:'#fff',
        	'padding-left':20,
        });
        contentBox.css({
        	'text-align':'center',
        	'padding':'20px 0',
        	'color':options.color
        });
        contentBox.children('i').css({
        	display:'inline-block',
        	width:30,
        	height:30,
        	'background':"url('../img/icon.png') no-repeat",
        	'vertical-align': 'top',
        	'margin-right':'10px'
        });
        contentBox.children('span').css({
        	'vertical-align': 'sub'
        })
        confirmBox.css({
        	height:40,
        	width:50+'%',
        	'margin-left':'25%'
        });
        confirmButton.css({
        	float:"left",
        	height:30,
        	'line-height':'30px',
        	padding:'0 15px',
        	color:'#fff',
        	'margin-top':'10px',
        	'text-align':'center',
        	'background-color':'#EC6D51',
        	'border-radius':'5px',
        });
        cancelButton.css({
        	float:"right",
        	height:30,
        	padding:'0 15px',
        	color:'#fff',
        	'margin-top':'10px',
        	'text-align':'center',
        	'background-color':options.backgroundcolor,
        	'border-radius':'5px',
        	'line-height':'30px'
        });
        function imgtype(){
        	if(defaults.img == 'none'){
        		contentBox.children('i').hide();
        	}
        	if(defaults.img == 'success'){
        		contentBox.children('i').css({
        			'background-position': '-30px 0'
        		});
        	}
        	if(defaults.img == 'warning'){
        		contentBox.children('i').css({
        			'background':"url('../img/icon.png') no-repeat",
        		});
        	}
        	if(defaults.img == 'error'){
        		contentBox.children('i').css({
        			'background-position': '-60px 0'
        		});
        	}
        }
        imgtype();
        confirmButton.on('click',options.yes);  //点击确定的回调函数
        cancelButton.on('click',options.no);
        nodeWrapp.hover(function(e){
			nodeWrapp.css({
				'cursor':'move'
			})
		},function(){
    		
		});
        var mx = 0,my = 0;      //鼠标x、y轴坐标（相对于left，top）
    	var dx = 0,dy = 0;      //对话框坐标（同上）
    	var isDraging = false;      //不可拖动
    	if(document.attachEvent) {//ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
                g('dialog').attachEvent('onselectstart', function() {
                  return false;
                });
            }
    	function autoCenter(el){
            var bodyW = $(window).width();
            var bodyH = $(window).height();
            var elW = el.width();
            var elH = el.height();
            nodeBox.css({"left":(bodyW-elW)/2 + 'px',"top":(bodyH-elH)/2 + 'px'});        
        };
        autoCenter(nodeBox);
        window.onresize = function(){
            autoCenter(nodeBox);
        };
        nodeWrapp.mousedown(function(e){
        	mx = e.pageX;
        	my = e.pageY;
        	dx = nodeBox.offset().left;
            dy = nodeBox.offset().top;
        	isDraging = true;
        });
        $(document).mousemove(function(e){
        	var e = e || window.event;
        	var x = e.pageX;      //移动时鼠标X坐标
            var y = e.pageY;      //移动时鼠标Y坐标
            if(isDraging){        //判断对话框能否拖动
                    var moveX = dx + x - mx;      //移动后对话框新的left值
                    var moveY = dy + y - my;      //移动后对话框新的top值
                    //设置拖动范围
                    var pageW = $(window).width();
                    var pageH = $(window).height();
                    var dialogW = nodeBox.width();
                    var dialogH = nodeBox.height();
                    var maxX = pageW - dialogW;       //X轴可拖动最大值
                    var maxY = pageH - dialogH;       //Y轴可拖动最大值
                    moveX = Math.min(Math.max(0,moveX),maxX);     //X轴可拖动范围
                    moveY = Math.min(Math.max(0,moveY),maxY);     //Y轴可拖动范围
                    //重新设置对话框的left、top
                    $('.alertbox').css({"left":moveX + 'px',"top":moveY + 'px'});
                };
        })
        nodeWrapp.mouseup(function(e){
        	isDraging = false;
        })
    }
    $.fn.retips = function(options){       
        var defaults = { //默认参数
            backgroundcolor : "red",
            text : '这是默认值',
            color:'#fff',
            position:'ptop'
        };
        options = $.extend(defaults,options);
        var tipsBox = $("<div class='tipsbox'>"+options.text+"</div>");
        var tipsBoxTriangle = $("<div class='tipsBoxTriangle'></div>");
        tipsBox.append(tipsBoxTriangle);
        tipsBox.css({
        	position: 'absolute',
			'background-color': options.backgroundcolor,
			color: options.color,
			padding: '5px 10px',
			'white-space': 'nowrap',
			'border-radius': '5px',
			opacity:0,
        });
        tipsBoxTriangle.css({
        	width: 0,
			height: 0,
			position: 'absolute',
			
    	}); 
    	tipsBox.animate({opacity:1},2000,function(){
    		tipsBox.delay(2000);
    		tipsBox.fadeOut(2000);
    	});
    	function postips(){
    		if(defaults.position == 'ptop'){
    			tipsBox.css({
    				bottom:'100%',
    				'margin-bottom':'8px'
    			});
    			tipsBoxTriangle.css({
    				top: '100%',
					left: '10px',
					border: '5px solid transparent',
		        	'border-top': "5px solid  "+ options.backgroundcolor + "",
		        	'border-right': "5px solid  "+ options.backgroundcolor + ""
    			})
    		}
    		if(defaults.position == 'pbottom'){
    			tipsBox.css({
    				top:'100%',
    				'margin-top':'8px'
    			});
    			tipsBoxTriangle.css({
    				bottom: '100%',
					left: '10px',
					border: '5px solid transparent',
		        	'border-bottom': "5px solid  "+ options.backgroundcolor + "",
		        	'border-left': "5px solid  "+ options.backgroundcolor + ""
    			})
    		}
    		if(defaults.position == 'pright'){
    			tipsBox.css({
    				left:'100%',
    				'margin-left':'15px',
    				top:0
    			});
    			tipsBoxTriangle.css({
    				right: '100%',
					top: '50%',
					'margin-top':'-8px',
					border: '8px solid transparent',
		        	'border-right': "8px solid  "+ options.backgroundcolor + ""
    			})
    		}
    		if(defaults.position == 'pleft'){
    			tipsBox.css({
    				right:'100%',
    				'margin-right':'15px',
    				top:0
    			});
    			tipsBoxTriangle.css({
    				left: '100%',
					top: '50%',
					'margin-top':'-8px',
					border: '8px solid transparent',
		        	'border-left': "8px solid  "+ options.backgroundcolor + ""
    			})
    		}
    	}
    	postips();
        $(this).append(tipsBox);
    }        
})(jQuery)
 