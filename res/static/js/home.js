layui.define(['jquery', 'element', 'carousel', 'laypage', 'layer', 'table'], function (exports) {
    var $ = layui.jquery
        , element = layui.element
        , layer = layui.layer
        , table = layui.table
        , carousel = layui.carousel
        , laypage = layui.laypage;

    //只能使用一种方式查询
    $('.inputFocus').val('');
    $('.inputFocus').focus(function () {
        $('.inputFocus').css('color', '#d1c7c7').removeClass('curtype');
        $(this).css('color', '#000').addClass('curtype');
    });

    $('#txtAccountCheckCode').keyup(function () {
        var checkCode = $.trim($('#txtAccountCheckCode').val());
        var value = '';
        var reg = /^0{1}[0-9]{6}[,]{0,1}$/;
        var auto = /^0{1}[1-9]{1}[0-9]+[,]{0,1}$/;
        var name = /^[\u4e00-\u9fa5]{1,5}$|^[\u4e00-\u9fa5]{1,5}[0-9]*$/;

        checkCode = checkCode.replace(/，/ig, ',');

        var type = '';
        if (reg.test(checkCode) || auto.test(checkCode)) {
            type = 'checkcode';
        } else if (name.test(checkCode)) {
            type = 'bankname';
        }
        if (type == 'bankname') {
            $('#lbPassword').show();
            $('#txtPassword').show();
            layer.tips('提示：如果已经在远诚宝路通物流公司注册密码，请输入密码；否则不要填写密码！', '#txtPassword', {
                tips: [1, '#ff443a']
            });
        } else {
            $('#lbPassword').hide();
            $('#txtPassword').hide();
        }
    });
    //查询转账信息（和当前运单号一起下账的信息）
    $('#btnAccountSearch').click(function () {
        var checkCode = $.trim($('#txtAccountCheckCode').val());
        var password = $.trim($('#txtPassword').val());
        var value = '';
        var reg = /^[0-9]+$/;
        var auto = /^[0-9]+$/;
        var name = /^[\u4e00-\u9fa5]{2,5}$|^[\u4e00-\u9fa5]{2,5}[0-9]*$/;

        checkCode = checkCode.replace(/，/ig, ',');

        var type = '';
        if (reg.test(checkCode) || auto.test(checkCode)) {
            type = 'orderCode';
        } else if (name.test(checkCode)) {
            type = 'customerName';
        }


        if (type.length <= 0) {
            layer.tips('请输入正确的运单号或户主姓名', '#btnAccountSearch', {
                tips: [1, '#ff443a']
            });
            return false;
        }
        value = checkCode;

        if (value.length <= 0) {
            return false;
        }

        //loading层
        var index = layer.load(1, {
            shade: [0.5, '#445a5d'] //0.1透明度的白色背景
        });

        $.ajax({
            type: "POST",
            url: "/openapi/getpayorder",
            dataType: "json",
            data: JSON.stringify({
                "searchValue": value,
                "type": type,
                "pwd": password
            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                layer.close(index);
                if (data.code) {
                    layer.open({
                        content: data.msg,
                        scrollbar: false
                    });
                } else {
                    var html = '';
                    var list = data.data;
                    var len = list.length;
                    for (var i = 0; i < len; i++) {
                        var data = list[i];
                        var transHtml = '';
                        var transAccount = parseInt(data.totalShouldTransFunds);
                        if (transAccount > 0) {
                            transHtml = ' - (运费)' + data.totalShouldTransFunds;
                        }
                        html += `
                        <table class="layui-table">
                        <tr>
                            <th>下账时间</th>
                            <td>${data.payDate}</td>
                            <th>下账条数</th>
                            <td>${data.orderNum}</td>
                        </tr>
                        <tr>
                            <th>下账总额</th>
                            <td colspan="3">${data.totalActualGoodsFunds}(实收货款) - ${data.payTrans}(运费) - ${data.payAgencyFee}(代办费) - ${data.insuranceAmount}(保费) = ${data.payAmount}</td>
                        </tr>
                        </table>
                        <table class="layui-table">
                        <tr>
                            <th>运单号</th>
                            <th>实收货款</th>
                            <th>应收货款</th>
                        </tr>
                        ${data.downDialogTable}
                        </table>
                        `
                    }

                    let table_id = layer.open({
                        type: 1 //Page层类型
                        , area: ['500px', '300px']
                        , title: '转账查询'
                        , shade: 0.6 //遮罩透明度
                        , maxmin: true //允许全屏最小化
                        , anim: 1 //0-6的动画形式，-1不开启
                        , content: html
                    });
                    if (!isPC()) {
                        let table_id_el = $("#layui-layer" + table_id);
                        table_id_el[0].style.width = 95 + '%';
                        table_id_el[0].style.left = 2.5 + '%';
                    }
                }
            },
            error: function () {
                layer.close(index);
                layer.msg("查询失败");
            }
        });
    });


    //货物跟踪
    $('#btnTrackSearch').click(function () {
        var checkCode = $.trim($('#txtTrackCode').val());
        var customerName = $.trim($('#txtUserName').val());
        var value = '';
        var reg = /^0{1}[0-9]{6}[,]{0,1}$/;
        var auto = /^0{1}[1-9]{1}[0-9]+[,]{0,1}$/;
        checkCode = checkCode.replace(/，/ig, ',');

        if (!reg.test(checkCode) && !auto.test(checkCode)) {
            layer.tips('请输入正确的运单号', '#txtTrackCode', {
                tips: [1, '#ff443a']
            });
            return false;
        } else {
            value = checkCode;
        }

        if (value.length <= 0) {
            return false;
        }

        //loading层
        var index = layer.load(1, {
            shade: [0.5, '#445a5d'] //0.1透明度的白色背景
        });

        $.ajax({
            type: "POST",
            url: "/openapi/getgoodstrack",
            dataType: "json",
            data: JSON.stringify({ "checkCode": value }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                layer.close(index);
                layer.msg(data.order_info, [100000, '#ff443a']);
            },
            error: function () {
                layer.close(index);
                layer.msg("查询失败");
            }
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

    exports('home-js', {});
});