window.onload = function(){			/* 加载函数 */
    /*定义字符串，进行网络上的图片数据名传输*/
    var imgData={"data":[
        {"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"21.jpg"},{"src":"22.jpg"},
        {"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},
        {"src":"28.jpg"},{"src":"29.jpg"},{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},
        {"src":"33.jpg"},{"src":"34.jpg"},{"src":"35.jpg"},{"src":"36.jpg"},{"src":"37.jpg"},
        {"src":"38.jpg"},{"src":"39.jpg"},{"src":"40.jpg"},{"src":"41.jpg"},{"src":"42.jpg"},
        {"src":"43.jpg"},{"src":"44.jpg"},{"src":"45.jpg"},{"src":"46.jpg"},{"src":"47.jpg"},
        {"src":"48.jpg"},{"src":"49.jpg"},{"src":"50.jpg"},{"src":"51.jpg"},{"src":"52.jpg"},
        {"src":"53.jpg"},{"src":"54.jpg"},{"src":"55.jpg"},{"src":"56.jpg"},{"src":"57.jpg"},
        {"src":"58.jpg"},{"src":"59.jpg"},{"src":"60.jpg"},{"src":"61.jpg"},{"src":"62.jpg"},
        {"src":"63.jpg"},{"src":"64.jpg"},{"src":"65.jpg"},{"src":"66.jpg"},{"src":"67.jpg"},
        {"src":"68.jpg"},{"src":"69.jpg"},{"src":"70.jpg"}
    ]};

    imgLocation("container", "box"); /* 调用 */

    /* onscroll事件，元素轴滚动时触发的 */
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
                img.src = "LSArt_images/LSArt"+imgData.data[i].src;
                boximg.appendChild(img);

                var bottomHidden = document.createElement("div");
                bottomHidden.className="bottom_hidden";
                boximg.appendChild(bottomHidden);

                /*
                var LSArtWorld = document.createElement("p");

                bottomHidden.appendChild(LSArtWorld);
                */
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
                /* 使用定时器，将scrollTop的值每次减少70，直到减少到0，则动画完毕 */
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 70;
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
    var ccontent = getChildElement(cparent, content);/*将parent下所有的content全部取出,即box*/
    /*console.log(ccontent.length);*//*测试得到的内容个数*/
    var imgWidth = ccontent[0].offsetWidth;/*得到其图片宽度*/
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);/*一排所能承载的个数，屏幕宽度除以图片宽度，转换成整数*/
    cparent.style.cssText = "width:"+imgWidth * cols+"px; margin:0 auto";/*将整体宽度固定化*/

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
/*图片存储方法，数组方式*/
function getChildElement(parent, content){
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");/* 通过父级空间得到所有内容 */
    for(var i = 0; i<allcontent.length; i++){
        if(allcontent[i].className == content){
            contentArr.push(allcontent[i]);/* 数组方法push向其末尾追加 */
        }
    }
    return contentArr;
}

/*得到一排最小高度盒子的位置*/
function getminheightLocation(BoxHeightArr, minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}

/*   */
function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    /*console.log(lastContentHeight+":"+screenTop+":"+pageHeight);*/ /*测试鼠标活动距离的变化*/
    if(lastContentHeight < scrollTop+pageHeight){
        return true;
    }
}
/* 至2018-3-30 22：12提交 */


