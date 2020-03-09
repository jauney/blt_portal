function initMapXian(canvas, clickreg, ctrltype, zoom) {
    // 百度地图API功能
    var map = new BMap.Map(canvas);
    var point = new BMap.Point(108.934363, 34.332074);
    map.centerAndZoom(point, zoom);

    function setMarker(location) {
        point = new BMap.Point(location.lng, location.lat);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        var label = new BMap.Label(location.label, { offset: new BMap.Size(20, -10) });
        label.setStyle({
            border: '#ccc',
            color: "#000",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑"
        });
        marker.setLabel(label);
    }

    var points = [];
    var labelPrefix = '';
    if (!clickreg) {
        labelPrefix = '陕西远程宝路通物流';
    }
    //http://api.map.baidu.com/lbsapi/getpoint/index.html
    // 西安总公司 109.076092,34.364474
    points.push({ lng: 109.076092, lat: 34.364474, label: '西安总公司' });
    // 禹辰营业部 109.001974,34.371723
    points.push({lng: 109.001974, lat: 34.371723, label: '禹辰营业部'});
    // 北辰机电营业部 109.01021,34.383867
    points.push({lng: 109.01021, lat: 34.383867, label: '北辰机电营业部'});
    // 中储营业部 109.00944,34.291026
    points.push({ lng: 109.00944, lat: 34.291026, label: '中储营业部' });
    // 西站营业部 108.923695,34.279307 远诚宝路通物流(西站路店)
    points.push({ lng: 108.923695, lat: 34.279307, label: '西站营业部' });
    // 西站2营业部 108.923266,34.279295 108.922765,34.279273
    points.push({ lng: 108.922765, lat: 34.279273, label: '西站2营业部' });
    // 六村堡营业部 108.863577,34.359176
    points.push({ lng: 108.863577, lat: 34.359176, label: '六村堡营业部' });
    // 北三环营业部 108.99175,34.370462
    points.push({ lng: 108.99175, lat: 34.370462, label: '北三环营业部' });
    // 大明营业部 108.998151,34.336834
    points.push({ lng: 108.998151, lat: 34.336834, label: '大明营业部' });
    // 新大明营业部 109.119733,34.402664
    points.push({ lng: 109.119733, lat: 34.402664, label: '新大明营业部' });
    // 祥云营业部 108.833458,34.323234
    points.push({ lng: 108.833458, lat: 34.323234, label: '祥云营业部' });
    // 三桥营业部 108.858865,34.293395
    points.push({ lng: 108.858865, lat: 34.293395, label: '三桥营业部' });
    // 贝斯特营业部 108.986464,34.284245
    points.push({ lng: 108.986464, lat: 34.284245, label: '贝斯特营业部' });
    // 丰庆路营业部 108.926676,34.259503
    points.push({ lng: 108.926676, lat: 34.259503, label: '丰庆路营业部' });
    // 华南城营业部 109.039108,34.365562
    points.push({ lng: 109.039108, lat: 34.365562, label: '华南城营业部' });
    // 国亨营业部 108.882664,34.29418
    points.push({ lng: 108.882664, lat: 34.29418, label: '国亨营业部' });
    // 方欣营业部 位置找不到 108.897409,34.293648
    points.push({ lng: 108.897409, lat: 34.293648, label: '方欣营业部' });
    // 石化大道营业部 位置找不到 108.874358,34.328471
    points.push({ lng: 108.874358, lat: 34.328471, label: '石化大道营业部' });
    // 红旗营业部 位置待定 108.982915,34.350357
    points.push({ lng: 108.982915, lat: 34.350357, label: '红旗营业部' });
    // 团结营业部 位置待定 108.991729,34.352402
    points.push({ lng: 108.991729, lat: 34.352402, label: '团结营业部' });
    // 田马路营业部 位置待定 109.037876,34.240447
    points.push({ lng: 109.037876, lat: 34.240447, label: '田马路营业部' });

    for (var i = 0; i < points.length; i++) {
        setMarker(points[i]);
    }

    //下面代码先关键字搜索出具体位置，然后点击地图上位置alert出坐标
    var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map }
    });
    //local.search("西安三十一中东门");

    //测距
    var myDis = new BMapLib.DistanceTool(map);
    $('.toolbar').click(function () {
        myDis.open();  //开启鼠标测距
        //myDis.close();  //关闭鼠标测距大
    });

    if (clickreg == 1) {
        map.addEventListener("click", function (e) {
            var pt = e.point;
            //alert(pt.lng + ',' + pt.lat);

            window.open('http://www.bltwlgs.com/HTML/position.htm?site=jingbian');
        });
    }
    return map;
}



function initMapJingbian(canvas, clickreg, ctrltype, zoom) {
    // 百度地图API功能
    var map = new BMap.Map(canvas);
    var point = new BMap.Point(108.78891, 37.67532);
    map.centerAndZoom(point, zoom);

    function setMarker(location) {
        point = new BMap.Point(location.lng, location.lat);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        var label = new BMap.Label(location.label, { offset: new BMap.Size(20, -10) });
        label.setStyle({
            border: '#ccc',
            color: "#000",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑"
        });
        marker.setLabel(label);
    }

    var points = [];
    var labelPrefix = '';
    if (!clickreg) {
        labelPrefix = '陕西远程宝路通物流';
    }
    // 绥德营业部 位置待定 110.283863,37.525543
    points.push({ lng: 110.283863, lat: 37.525543, label: labelPrefix + '绥德营业部' });
    // 子洲营业部 建材市场位置 110.027559,37.624633
    points.push({ lng: 110.027559, lat: 37.624633, label: labelPrefix + '子洲营业部' });
    // 吴堡营业部 位置待定 110.725055,37.454971
    points.push({ lng: 110.725055, lat: 37.454971, label: labelPrefix + '吴堡营业部' });
    // 洛川营业部 位置待定 109.439533,35.772285
    points.push({ lng: 109.439533, lat: 35.772285, label: labelPrefix + '洛川营业部' });
    // 富县营业部 109.401979,36.015927
    points.push({ lng: 109.401979, lat: 36.015927, label: labelPrefix + '富县营业部' });
    // 羊泉镇营业部 找不到位置 109.270031,35.943385
    points.push({ lng: 109.270031, lat: 35.943385, label: labelPrefix + '羊泉镇营业部' });
    // 店头镇营业部 村委会位置 109.088348,35.641082
    points.push({ lng: 109.088348, lat: 35.641082, label: labelPrefix + '店头镇营业部' });
    // 延安营业部 109.54983,36.63724
    points.push({ lng: 109.54983, lat: 36.63724, label: labelPrefix + '延安营业部' });
    // 吴起营业部 108.212642,36.901434
    points.push({ lng: 108.212642, lat: 36.901434, label: labelPrefix + '吴起营业部' });
    // points.push({ lng: 109.506966, lat: 36.602639, label: labelPrefix + '延安站' });
    // points.push({ lng: 108.208547, lat: 36.898425, label: labelPrefix + '吴起站' });
    points.push({ lng: 108.781843, lat: 36.803996, label: labelPrefix + '志丹站' });
    points.push({ lng: 108.807307, lat: 37.627779, label: labelPrefix + '靖边站' });
    // 东坑镇营业部 108.573551,37.581374
    points.push({ lng: 108.573551, lat: 37.581374, label: labelPrefix + '东坑镇营业部' });
    points.push({ lng: 107.60425, lat: 37.577072, label: labelPrefix + '定边站' });
    points.push({ lng: 108.856229, lat: 38.599476, label: labelPrefix + '乌审旗站' });
    // 榆林营业部 109.725099,38.309465
    points.push({ lng: 109.725099, lat: 38.309465, label: labelPrefix + '榆林营业部' });
    // 神木营业部 110.479628,38.867547
    points.push({ lng: 110.479628, lat: 38.867547, label: labelPrefix + '神木营业部' });
    // 横山营业部 位置待定 109.298801,37.940815
    points.push({ lng: 109.298801, lat: 37.940815, label: labelPrefix + '横山营业部' });
    // 黄陵营业部 109.283199,35.601438
    points.push({ lng: 109.283199, lat: 35.601438, label: labelPrefix + '黄陵营业部' });

    for (var i = 0; i < points.length; i++) {
        setMarker(points[i]);
    }

    //下面代码先关键字搜索出具体位置，然后点击地图上位置alert出坐标
    var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map }
    });
    //local.search("乌审旗邮政储蓄银行");

    //测距
    var myDis = new BMapLib.DistanceTool(map);
    $('.toolbar').click(function () {
        myDis.open();  //开启鼠标测距
        //myDis.close();  //关闭鼠标测距大
    });

    if (clickreg == 1) {
        map.addEventListener("click", function (e) {
            var pt = e.point;
            //alert(pt.lng + ',' + pt.lat);

            window.open('http://www.bltwlgs.com/HTML/position.htm?site=jingbian');
        });
    }
    return map;
}