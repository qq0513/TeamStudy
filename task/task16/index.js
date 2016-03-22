/**
 * Created by Terry on 2016/3/22.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData=new Array();
var i=0;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityname= $.trim($("#aqi-city-input").val());
    var cityaqi= $.trim($("#aqi-value-input").val());
    if(cityname=="" || cityaqi==""){
        alert("城市名和天气指数都不可为空");
        return;
    }
    aqiData[i]=new Array();
    aqiData[i][0]=cityname;
    aqiData[i++][1]=cityaqi;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    $("#aqi-table").html("<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>");
    for(var j=0;j<i;j++){
        var html="<tr><td>"+aqiData[j][0]+"</td><td>"+aqiData[j][1]+"</td><td><button onclick='delBtnHandle("+j+")'>删除</button></td></tr>";
        $("#aqi-table").html($("#aqi-table").html()+html);
    }
    var j=0;
    while(document.getElementById("add-btn").get(j)){
        document.getElementById("add-btn").get(j++).click(delBtnHandle());
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(index) {
    // do sth.
    for(var j=index;j<i-1;j++){
        aqiData[j][0]=aqiData[j+1][0];
        aqiData[j][1]=aqiData[j+1][1];
    }
    i--;
    renderAqiList();
}

var p;
function init() {
    p=0;
    $(function(){
        document.getElementById("add-btn").onclick=function(){
            if(p==1)
            addBtnHandle();
        }
        // $("#add-btn").click(addBtnHandle());
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    });
    p=1;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();