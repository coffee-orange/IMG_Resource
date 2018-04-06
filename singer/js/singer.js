/**
 * Created by MIN on 2018/4/5.
 */
window.onload = function() {
    var myAudio1 = document.getElementById('audio1');
    var myAudio2 = document.getElementById('audio2');
    var myAudio3 = document.getElementById('audio3');

    function playPause1() {
        if (myAudio1.paused) {
            myAudio1.play();
            myAudio2.pause();
            myAudio3.pause();
        } else {
            myAudio1.pause();
        }
    }

    function playPause2() {
        if (myAudio2.paused) {
            myAudio2.play();
            myAudio1.pause();
            myAudio3.pause();
        } else {
            myAudio2.pause();
        }
    }

    function playPause3() {
        if (myAudio3.paused) {
            myAudio3.play();
            myAudio1.pause();
            myAudio2.pause();
        } else {
            myAudio3.pause();
        }
    }

    function setTab(name, cursel, n) {
        for (i = 1; i <= n; i++) {
            var menu = document.getElementById(name + i);
//            var con = document.getElementById("ul_" + name + "_" + i);
            menu.className = i == cursel ? "word_content Menubox_on" : "word_content";
//            con.style.display = i == cursel ? "block" : "none";
        }
    }
}

