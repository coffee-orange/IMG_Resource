/* Created by 53284 on 2018-03-29 */
window.onload = function(){
    /*�����ַ��������������ϵ�ͼƬ����������*/
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

    /* �����ڲ�����������ض���,����Ч�� */
    var timer  = null;
    backtop.onclick = function(){
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
                /* ʹ�ö�ʱ������scrollTop��ֵÿ�μ���80��ֱ�����ٵ�0���򶯻���� */
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 80;
                timer = requestAnimationFrame(fn); /* ��ʱ�� */
            }else{
                cancelAnimationFrame(timer);
            }
        });
    }

}

/*Ŀ�Ļ�ö�����ͼƬ����ö���div���У�ͨ����Ԫ�ػ�ȡ*/
function imgLocation(parent, content){
    var cparent = document.getElementById(parent);/*��ȡ����*/
    var ccontent = getChildElement(cparent, content);
    /*console.log(ccontent.length);*//*���Ը���*/
    var imgWidth = ccontent[0].offsetWidth;/*�õ�ͼƬ���*/
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);/*һ�����ܳ��صĸ���*/
    cparent.style.cssText = "width:"+imgWidth * cols+"px; margin:0 auto";

    var BoxHeightArr=[];/*����һ�ź��ӵĸ��߶�*/
    for(var i=0; i<ccontent.length; i++){
        if(i<cols){
            BoxHeightArr[i] = ccontent[i].offsetHeight;/*�õ����ӵĸ߶Ȳ���������*/
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

/*�õ�һ����С�߶Ⱥ��ӵ�λ��*/
function getminheightLocation(BoxHeightArr, minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}

/*ͼƬ�洢����*/
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
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;/* ����������� */
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    /*console.log(lastContentHeight+":"+screenTop+":"+pageHeight);*/ /*�����������ı仯*/
    if(lastContentHeight < scrollTop+pageHeight){
        return true;
    }
}
/* ��2018-04-01 22:00 �ύ */