/* Created by 53284 on 2018-03-29 */
window.onload = function(){
    /*定义字符串，进行网络上的图片数据名传输*/
    var imgData={"data":[
        {"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"21.jpg"},{"src":"22.jpg"},
        {"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},
        {"src":"28.jpg"},{"src":"29.jpg"},{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},
        {"src":"33.jpg"},{"src":"34.jpg"},{"src":"35.jpg"}
    ]};

    imgLocation("container", "box"); /*  */

    /*  */
    window.onscroll = function(){
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for(var i=0; i<imgData.data.length; i++){
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);

                var boximg = document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);

                var img = document.createElement("img");
                img.src = "skybeauty_images/skybeauty"+imgData.data[i].src;
                boximg.appendChild(img);

                var bottomHidden = document.createElement("div");
                bottomHidden.className="bottom_hidden";
                boximg.appendChild(bottomHidden);

            }
        }
        imgLocation("container", "box");
    }

    /* 作用于侧栏，点击返回顶部,动画效果 */
    var timer  = null;
    backtop.onclick = function(){
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
                /* 使用定时器，将scrollTop的值每次减少80，直到减少到0，则动画完毕 */
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 80;
                timer = requestAnimationFrame(fn); /* 定时器 */
            }else{
                cancelAnimationFrame(timer);
            }
        });
    }

}

/*目的获得多少张图片，获得多少div就行，通过父元素获取*/
function imgLocation(parent, content){
    var cparent = document.getElementById(parent);/*获取父级*/
    var ccontent = getChildElement(cparent, content);
    /*console.log(ccontent.length);*//*测试个数*/
    var imgWidth = ccontent[0].offsetWidth;/*得到图片宽度*/
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);/*一排所能承载的个数*/
    cparent.style.cssText = "width:"+imgWidth * cols+"px; margin:0 auto";

    var BoxHeightArr=[];/*承载一排盒子的各高度*/
    for(var i=0; i<ccontent.length; i++){
        if(i<cols){
            BoxHeightArr[i] = ccontent[i].offsetHeight;/*得到盒子的高度并存至数组*/
        }else{
            var minheight = Math.min.apply(null, BoxHeightArr);
            var minIndex = getminheightLocation(BoxHeightArr, minheight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minheight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}

/*得到一排最小高度盒子的位置*/
function getminheightLocation(BoxHeightArr, minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}

/*图片存储方法*/
function getChildElement(parent, content){
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for(var i = 0; i<allcontent.length; i++){
        if(allcontent[i].className == content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}

/*   */
function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;/* 浏览器兼容性 */
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    /*console.log(lastContentHeight+":"+screenTop+":"+pageHeight);*/ /*测试鼠标活动距离的变化*/
    if(lastContentHeight < scrollTop+pageHeight){
        return true;
    }
}
/* 至2018-04-01 22:00 提交 */