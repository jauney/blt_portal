layui.define(['jquery', 'element', 'carousel', 'laypage'], function (exports) {
    var $ = layui.jquery
        , element = layui.element
        , carousel = layui.carousel
        , laypage = layui.laypage;

    // $(".include").each(function(){
    //     if(!!$(this).attr("file")) {
    //         var $includeObj = $(this);
    //         $(this).load($(this).attr("file"), function(html){
    //             $includeObj.after(html).remove();    //加载的文件内容写入到当前标签后面并移除当前标签
    //         })
    //     }
    // });
    //使用jQuery的load方法
    $(".include").each(function () {
        if (!!$(this).attr("file")) {
            var $includeObj = $(this);
            var file_name = $(this).attr("file");
            $(this).load(file_name, function (html) {
                $includeObj.after(html).remove();    //加载的文件内容写入到当前标签后面并移除当前标签
                load();
            })
        }
    });
    //使用jQuery的load方法
    $(".includefooter").each(function () {
        if (!!$(this).attr("file")) {
            var $includeObj = $(this);
            var file_name = $(this).attr("file");
            $(this).load(file_name, function (html) {
                $includeObj.after(html).remove();    //加载的文件内容写入到当前标签后面并移除当前标签
            })
        }
    });


    var w = window.innerWidth;
    var h = window.innerHeight;
    window.onresize = function(){
        if(w>window.innerWidth||h> window.innerHeight){
            console.log('缩小');
        }
    }

    function load() {

        //滚动监听
        var val = $("#hidden_id").val();
        $("#" + val).addClass('layui-this');
        $(window).scroll(function () {
            var scr = $(document).scrollTop();
            scr > 0 ? $(".nav").addClass('scroll') : $(".nav").removeClass('scroll');
        });

        //导航切换
        var btn = $('.nav').find('.nav-list').children('button')
            , spa = btn.children('span')
            , ul = $('.nav').find('.nav-list').children('.layui-nav');
        btn.on('click', function () {
            if (!$(spa[0]).hasClass('spa1')) {
                spa[0].className = 'spa1';
                spa[1].style.display = 'none';
                spa[2].className = 'spa3';
                $('.nav')[0].style.height = 90 + ul[0].offsetHeight + 'px';
            } else {
                spa[0].className = '';
                spa[1].style.display = 'block';
                spa[2].className = '';
                $('.nav')[0].style.height = 80 + 'px';
            }
        });
        // alert($(window).width()); //浏览器当前窗口可视区域宽度
        // let width_length = $(window).width();
        var width_length = findDimensions().w;
        var height_length = findDimensions().h;

        if ($("#banner").find('img').length > 0) {
            $("#banner")[0].style.height = width_length * (700 / 1920) + "px";
        }
        $("#banner").find('img').each(function () {
            $(this)[0].style.width = width_length + "px";
            $(this)[0].style.height = width_length * (700 / 1920) + "px";
        });
        if (isPC()) {
            if (undefined !== $("#news_item_center")[0]) {
                $("#news_item_center")[0].style.display = "flex";
            }
            $("#logoImg")[0].style.width = width_length * 0.95 * 0.25 + "px"
        } else {
            $("#logoImg")[0].style.width = width_length * 0.8 + "px";

            //
            $('.banner').height($('.banner').height()*0.6);
            var title = $('.banner').find('.title')[0];
            // title.style.height = height_length * 0.8;
            title.style.paddingTop = 10 + "%";
        }
    }


    //轮播渲染
    carousel.render({
        elem: '#banner'
        , width: '100%'
        , height: '700px'
        , arrow: 'always'
        , autoplay: true
    });


    //轮播文字
    $(function () {
        $('.banner').children('.title').addClass('active');
    })

    //关于内容
    $('.main-about').find('.aboutab').children('li').each(function (index) {
        var data = $(this).data('class');
        if (data != 0) {
            $(this).on('click', function () {
                $(this).addClass('layui-this').siblings().removeClass('layui-this');
                $('.aboutab').siblings().fadeOut("fast");
                $('.aboutab').siblings().eq(index).fadeIn("");
                reset();
            });
            if (index === 1) {
                $(this).click()
            }
        }
    });

    //营业网点
    $('.main-case').find('.aboutab').children('li').each(function (index) {
        var data = $(this).data('class');
        if (data != 0) {
            $(this).on('click', function () {
                $(this).addClass('layui-this').siblings().removeClass('layui-this');
                $('.aboutab').siblings().fadeOut("fast");
                $('.aboutab').siblings().eq(index).fadeIn("");
                reset();
            });
            if (index === 1) {
                $(this).click()
            }
        }
    });

    function reset() {
        $("#txtAccountCheckCode").val('')
        $("#txtPassword").val('');
        $("#txtTrackCode").val('');
        $("#trackmsg").hide();
        $("#accountmsg").hide()
    }

    //动态分页
    laypage.render({
        elem: 'newsPage'
        , count: 50
        , theme: '#2db5a3'
        , layout: ['page', 'next']
    });

    //案例分页
    laypage.render({
        elem: 'casePage'
        , count: 50
        , theme: '#2db5a3'
        , layout: ['page', 'next']
    });

    //新闻字段截取
    $(function () {
        $(".main-news").find(".content").each(function () {
            var span = $(this).find(".detail").children("span")
                , spanTxt = span.html();
            if (document.body.clientWidth > 463) {
                span.html(spanTxt);
            } else {
                span.html(span.html().substring(0, 42) + '...')
            }
            ;
            $(window).resize(function () {
                if (document.body.clientWidth > 463) {
                    span.html(spanTxt);
                } else {
                    span.html(span.html().substring(0, 42) + '...')
                }
                ;
            });
        });
    });

    //如果返回的是false说明当前操作系统是手机端，如果返回的是true则说明当前的操作系统是电脑端
    function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }


    //函数：获取尺寸
    function findDimensions() {
        //获取窗口宽度
        var win_w_h = {};
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        }
        //结果输出至两个文本框
        win_w_h.h = winHeight;
        win_w_h.w = winWidth;
        return win_w_h;
    }


    exports('firm', {});
});

