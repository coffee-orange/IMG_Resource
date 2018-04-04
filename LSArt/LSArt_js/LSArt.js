window.onload = function(){			/* ���غ��� */
    /*�����ַ��������������ϵ�ͼƬ����������*/
    var imgData={"data":[
        {"src":"17"},{"src":"18"},{"src":"19"},{"src":"21"},{"src":"22"},
        {"src":"23"},{"src":"24"},{"src":"25"},{"src":"26"},{"src":"27"},
        {"src":"28"},{"src":"29"},{"src":"30"},{"src":"31"},{"src":"32"},
        {"src":"33"}
    ]};

    imgLocation("container", "box"); /* ���� */

    /* onscroll�¼���Ԫ�������ʱ������ */
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

    /* �����ڲ�����������ض���,����Ч�� */
    var timer  = null;
    backtop.onclick = function(){
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
                /* ʹ�ö�ʱ������scrollTop��ֵÿ�μ���70��ֱ�����ٵ�0���򶯻���� */
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 70;
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
    var ccontent = getChildElement(cparent, content);/*��parent�����е�contentȫ��ȡ��,��box*/
    /*console.log(ccontent.length);*//*���Եõ������ݸ���*/
    var imgWidth = ccontent[0].offsetWidth;/*�õ���ͼƬ���*/
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);/*һ�����ܳ��صĸ�������Ļ��ȳ���ͼƬ��ȣ�ת��������*/
    cparent.style.cssText = "width:"+imgWidth * cols+"px; margin:0 auto";/*�������ȹ̶���*/

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
/*ͼƬ�洢���������鷽ʽ*/
function getChildElement(parent, content){
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");/* ͨ�������ռ�õ��������� */
    for(var i = 0; i<allcontent.length; i++){
        if(allcontent[i].className == content){
            contentArr.push(allcontent[i]);/* ���鷽��push����ĩβ׷�� */
        }
    }
    return contentArr;
}

/*�õ�һ����С�߶Ⱥ��ӵ�λ��*/
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
    /*console.log(lastContentHeight+":"+screenTop+":"+pageHeight);*/ /*�����������ı仯*/
    if(lastContentHeight < scrollTop+pageHeight){
        return true;
    }
}
/* ��2018-3-30 22��12�ύ */


