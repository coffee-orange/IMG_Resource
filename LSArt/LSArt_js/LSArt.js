window.onload = function(){			/* 加载函数 */
    /*定义字符串，进行网络上的图片数据名传输*/
    var imgData={"data":[
        {"src":"17"},{"src":"18"},{"src":"19"},{"src":"21"},{"src":"22"},
        {"src":"23"},{"src":"24"},{"src":"25"},{"src":"26"},{"src":"27"},
        {"src":"28"},{"src":"29"},{"src":"30"},{"src":"31"},{"src":"32"},
        {"src":"33"}
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
                img.src = "LSArt_images/LSArt"+imgData.data[i].src +".jpg";
                boximg.appendChild(img);

                var passBox = document.createElement("div");
                passBox.className="pass_box";
                boximg.appendChild(passBox);

                var pass = document.createElement("div");
                pass.className="pass";
                passBox.appendChild(pass);

                var bottomHidden = document.createElement("div");
                bottomHidden.className="bottom_hidden";
                boximg.appendChild(bottomHidden);

                var LSArtdWord = document.createElement("div");
                LSArtdWord.className="LSArtdWord";
                bottomHidden.appendChild(LSArtdWord);

                var span = document.createElement("span");
                span.className="word";
                LSArtdWord.appendChild(span);
                span.innerHTML="&nbsp;&nbsp;Light and Shadow Art Material "+imgData.data[i].src+"&nbsp;";

                var a = document.createElement("a");
                a.href="#";
                a.className="aicon";
                a.download="LSArt"+imgData.data[i].src +".jpg";
                LSArtdWord.appendChild(a);

                var icon = document.createElement("i");
                icon.className="iconfont icon-plus-download";
                a.appendChild(icon);
                icon.style.color="rgb(185, 253, 255)";
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


