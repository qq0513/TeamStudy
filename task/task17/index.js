/**
 * Created by Terry on 2016/3/22.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

var maxH=500;
var maxW=600;

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    $(".aqi-chart-wrap").html("");
    var g_width=0;
    var start_index=0;
    var data_num=0;
    switch (pageState.nowGraTime){
        case "day":{
            g_width=Math.floor((600-91*2)/91);
            start_index=91*(pageState.nowSelectCity-1);
            data_num=91;
        }break;
        case "week":{
            g_width=Math.floor((600-13*2)/13);
            start_index=819+13*(pageState.nowSelectCity-1);
            data_num=13;
        }break;
        case "month":{
            g_width=Math.floor((600-3*2)/3);
            start_index=936+3*(pageState.nowSelectCity-1);
            data_num=3;
        }break;
    }
    for(var i=0;i<data_num;i++){
        var html='<div class="dg" style="width:'+g_width+'px;height:'+chartData[start_index+i]+'px;top: '+(500-chartData[start_index+i]-2)+'px;left: '+(g_width*i+(i-1)*2)+'px;"></div>';
        $(".aqi-chart-wrap").append(html);
    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var graTime;
    for(var i=0;i<3;i++){
        graTime= document.getElementsByName("gra-time").item(i);
        if(graTime.checked){
            if(pageState.nowGraTime!=graTime.value){
                // 设置对应数据
                pageState.nowGraTime=graTime.value;

                // 调用图表渲染函数
                renderChart();
                break;
            }
        }
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var city=$("#city-select").val();
    // 确定是否选项发生了变化
    if(pageState.nowSelectCity!=city){
        // 设置对应数据

        pageState.nowSelectCity=city;
        // 调用图表渲染函数
        renderChart();

    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    $(":radio").attr("onclick","graTimeChange()");
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var num=1;
    for (var property in aqiSourceData){
        $("#city-select").append("<option value='"+num+++"'>"+property+"</option>");
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    $("#city-select").attr("onchange","citySelectChange()");
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    //计算每个城市最大的数据
    var index=0;
    var datStr = '';
    //按天算   91*3
    for (var property in aqiSourceData){
        var dat = new Date("2016-01-01");
        for(var j=0;j<91;j++){
            datStr = getDateStr(dat);
            chartData[index++]=aqiSourceData[property][datStr];
            dat.setDate(dat.getDate() + 1);
        }
    }
    //按周算
    for (var property in aqiSourceData){
        var dat = new Date("2016-01-01");
        var sum=0;
        var week=0;
        var week_num=0;
        for(var j=0;j<91;j++){
            datStr = getDateStr(dat);
            sum=sum+aqiSourceData[property][datStr];
            week=dat.getDay();
            week_num++;
            //如果到了星期天
            if(week==0){
                chartData[index++]=Math.ceil(sum/week_num);
                sum=0;
                week_num=0;
            }
            dat.setDate(dat.getDate() + 1);
        }
    }
    //按月算
    for (var property in aqiSourceData){
        var dat = new Date("2016-01-01");
        var sum=0;
        var old_month=0;
        var month=1;
        var month_num=0;
        for(var j=0;j<91;j++){
            datStr = getDateStr(dat);
            sum=sum+aqiSourceData[property][datStr];
            old_month=month;
            month=dat.getMonth();
            month_num++;
            //如果到了星期天
            if(month!=old_month){
                chartData[index++]=Math.ceil(sum/month_num);
                sum=0;
                month_num=0;
            }
            dat.setDate(dat.getDate() + 1);
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    $(function(){
        initGraTimeForm()
        initCitySelector();
        initAqiChartData();
    })
}

init();