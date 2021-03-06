;(function($){
    $.fn.realert = function(options){  //一个按钮的弹窗
        var defaults = { //默认参数
            backgroundcolor : "#72D1FF",
            text : '',
            color:'#60B0D1',
            prompt:'提示',
            img:"none",
            width:371,
            button:'show',
            content:'',
            click:function(){

            }
        };
        options = $.extend(defaults,options);
        var nodeParent = $("<div class='parentbox'></div>"); //弹出层遮罩层节点
        var nodeBox = $("<div class='alertbox'></div>"); //弹出框节点
        var contentBox = $("<div class='contentbox'><i></i><span>" + options.text + "</span></div>"); //弹出框内容节点
        var nodeWrapp = $("<div class='wrappbox'>"+options.prompt+"</div>"); 
        var confirmBox = $("<div class='confirmbox'></div>"); //弹出框按钮父节点
        var confirmButton = $("<div class='confirmbutton'>确定</div>"); //按钮节点
        var nodeClose = $("<span class='closeicon'>×</span>");
        var nodeform = $(options.content);
        $('body').prepend(nodeParent);  //将节点插入文档
        nodeBox.append(contentBox);
        nodeBox.append(confirmBox);
        confirmBox.append(confirmButton);
        nodeParent.prepend(nodeBox);
        nodeBox.prepend(nodeWrapp);
        contentBox.after(nodeform);
        nodeBox.append(nodeClose);
        nodeBox.css({
            width:options.width,
        });
        nodeWrapp.css({
            'background-color':options.backgroundcolor,
        });
        contentBox.css({
            'color':options.color
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
                    'background':"url('../Images/icon.png') no-repeat",
                });
            }
            if(defaults.img == 'error'){
                contentBox.children('i').css({
                    'background-position': '-60px 0'
                });
            }
        };
        function buttonhave(){
            if(defaults.button == 'none'){
                confirmBox.hide();
            }
            if(defaults.button == 'show'){
                confirmBox.show();
            }
        };
        imgtype();
        buttonhave();
        nodeClose.on('click',function(){
            nodeParent.hide();
        });
        nodeClose.hover(function(e){
            nodeClose.css({
                'font-size': '28px'
            })
        },function(){
            nodeClose.css({
                'font-size': '26px'
            })
        });
        confirmButton.on('click',options.click);
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
            dx = nodeBox.offset().left - $(window).scrollLeft();
            dy = nodeBox.offset().top - $(window).scrollTop();
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
        });
        $(document).mouseup(function(e){
            isDraging = false;
        });
    };
    $.fn.reconfirm = function(options){
        var defaults = { //默认参数
            backgroundcolor : "#72D1FF",
            text : '',
            color:'#60B0D1',
            prompt:'提示',
            img:'none',
            width:371,
            button: 'show',
            content:'',
            yes: function(){},
            no:function(){
                nodeParent.hide();
            }
        };
        options = $.extend(defaults,options);
        var nodeParent = $("<div class='parentbox'></div>");
        var nodeBox = $("<div class='alertbox'></div>");
        var contentBox = $("<div class='contentbox'><i></i><span>" + options.text + "</span></div>");
        var nodeWrapp = $("<div class='wrappbox'>"+options.prompt+"</div>");
        var confirmBox = $("<div class='confirmbox'></div>");
        var confirmButton = $("<div class='confirmbutton'>确定</div>");
        var cancelButton = $("<div class='cancelbutton'>取消</div>");
        var nodeClose = $("<span class='closeicon'>×</span>");
        var nodeform = $(options.content);
        $('body').prepend(nodeParent);
        nodeBox.append(contentBox);
        nodeBox.append(confirmBox);
        confirmBox.append(confirmButton);
        confirmBox.append(cancelButton);
        nodeParent.prepend(nodeBox);
        nodeBox.prepend(nodeWrapp);
        contentBox.after(nodeform);
        nodeBox.append(nodeClose);
        nodeBox.css({
            width:options.width,
        });
        nodeWrapp.css({
            'background-color':options.backgroundcolor,
        });
        contentBox.css({
            'color':options.color
        });
        confirmButton.css({
            float:"left"
        });
        cancelButton.css({
            float:"right",
            'background-color':options.backgroundcolor,

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
        };
        function buttonhave(){
            if(defaults.button == 'none'){
                confirmBox.hide();
            }
            if(defaults.button == 'show'){
                confirmBox.show();
            }
        };

        imgtype();
        buttonhave();
        confirmButton.on('click',options.yes);  //点击确定的回调函数
        cancelButton.on('click',options.no);
        nodeClose.on('click',function(){
            nodeParent.hide();
        });
        nodeClose.hover(function(e){
            nodeClose.css({
                'font-size': '28px'
            })
        },function(){
            nodeClose.css({
                'font-size': '26px'
            })
        });
        var mx = 0,my = 0;      //鼠标x、y轴坐标（相对于left，top）
        var dx = 0,dy = 0;      //对话框坐标（同上）
        var isDraging = false;      //不可拖动
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
            dx = nodeBox.offset().left - $(window).scrollLeft();
            dy = nodeBox.offset().top -$(window).scrollTop();
            console.log(dx+","+dy)
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
        });
        $(document).mouseup(function(e){
            isDraging = false;
        });
    };
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
            'background-color': options.backgroundcolor,
            color: options.color,
        });
        tipsBox.fadeIn(2000,function(){
            tipsBox.delay(2000);
            tipsBox.fadeOut(1000,function(){
                $(this).remove();
            }); 
        });
        function postips(){
            if(defaults.position == 'ptop'){
                tipsBox.css({
                    bottom:'100%',
                    'margin-bottom':'10px',
                    left:0
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
                    'margin-top':'10px',
                    left:0
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
        };
        postips();
        $(this).append(tipsBox);
        $(this).css({
            position:'relative'
        });
    };       
})(jQuery)
 