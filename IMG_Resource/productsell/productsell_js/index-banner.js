/**
 * Created by MIN on 2018/3/29.
 */
/**
 * Created by Administrator on 2016/4/30 0030.
 * blog:wjf444128852.github.io
 *  ��֧��IE
 */
window.onload=function(){
    var arrFR = ['img/ferrari01.jpg','img/ferrari02.jpg','img/ferrari03.jpg','img/ferrari04.jpg'];
    var arrBC = ['img/benchi01.jpg','img/benchi02.jpg','img/benchi03.jpg','img/benchi04.jpg'];
    var arrBM = ['img/baoma01.jpg','img/baoma02.jpg','img/baoma03.jpg','img/baoma04.jpg'];
    var arrAD = ['img/aodi01.jpg','img/aodi02.jpg','img/aodi03.jpg','img/aodi04.jpg'];
    var array = [arrFR,arrBC,arrBM,arrAD];
    var btns=document.getElementsByClassName('js_btn');
    var divList=document.getElementsByClassName('banner_lists');
    // Ʒ���л�
    for(var i=0;i<btns.length;i++){
        btns[i].index=i;
        btns[i].onclick=showItems;
    }
    //ClassName�л�,�Ƿ���ָ��class
    function hasClass(elem,cls){
        return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }
    // û�о�׷��ָ��class
    function addClass(elem,cls){
        if(!hasClass(elem,cls)){
            elem.className+=" "+cls;
        }
    }
    // �о��Ƴ�ָ��class
    function removeClass(elem,cls){
        if(hasClass(elem,cls)){
            var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');
            elem.className=elem.className.replace(reg,"");
        }
    }
    //ClassName�л�,�Ƴ�����
    function removeAll(obj){
        for (var i = 0; i < obj.length; i++) {
            removeClass(obj[i],"selected");
        }
    }
    // DIV��ʾ�л�
    function showItems(){
        removeAll(btns);
        addClass(this,"selected");
        for (var s = 0; s< divList.length; s++) {
            divList[s].style.display="none";
            divList[this.index].style.display="block";
        }
        willHover(this.index);
    }
    // �ұ��л���ťЧ��
    function willHover(sum){
        var hoverbtns=divList[sum].getElementsByClassName('btn');
        var img=divList[sum].getElementsByTagName('img')[0];
        for (var i = 0; i < hoverbtns.length; i++) {
            hoverbtns[i].index=i;
            hoverbtns[i].onmouseover=function(){
                removeAll(hoverbtns);
                addClass(this,"selected");
                var imgSrc=array[sum][this.index];
                img.src=array[sum][this.index];
            }
        }
    }
    // Ĭ�ϵ�һ�ο����л�
    willHover(0);
};