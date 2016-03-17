/**
 * Created by terry on 2016/3/15.
 */
function more(index){
    alert("no more!");
    switch (index){
        case 0:{break;}
        case 1:{break;}
        case 2:{break;}
        default:{alert("error!");break;}
    }
}

function task(){
    var l=document.body.clientWidth;
    var mh=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
    var task_box_height=document.getElementById("task_box").style.height;
    var h= document.body.scrollHeight;
    l=(l-660)/2+"px";
    mh=(mh+200)+"px";

    document.getElementById("task_box").style.left=l;
    document.getElementById("task_box").style.top=mh;

    h=h+"px";
    document.getElementById("bg_box").style.height=h;
    //$("#bg_box").show();
    //$("#task_box").show();
    $("#bg_box").slideDown("slow");
    $("#task_box").slideDown("slow");
}

function to_page(index){
    window.open("task/index.html?id="+index);
}

function close_box(){
    //$("#bg_box").hide();
    //$("#task_box").hide();
    //$("#more_box").hide();
    $("#bg_box").slideUp("slow");
    $("#task_box").slideUp("slow");
    $("#more_box").slideUp("slow");
}