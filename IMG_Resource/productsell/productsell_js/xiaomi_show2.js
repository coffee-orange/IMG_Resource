
//xiaomi_show2≤Àµ•¿∏¡–±Ì«–ªª
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("ul_" + name + "_" + i);
        menu.className = i == cursel ? "Menubox_on color" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}