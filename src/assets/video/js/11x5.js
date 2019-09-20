
var tryflag = !0, timer = null, audioType = "b", firth11Load = !0, ifopen = !0, animateId = {},sound={}, dataStr = {
    preDrawCode: [2, 4, 6, 4, 5],
    sumNum: 12,
    sumBigSmall: "小",
    sumSingleDouble: "单",
    drawIssue: "170517061",
    preDrawTime: "2017-05-17 18:40:00"
};
var trytime = [];
export function addTime(e) {
    var n = (e = e.split(" ")[1]).split(":"), a = n[0], t = n[1], i = n[2];
    return 3600 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a) + 60 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
}

export function init(){
    $(".eleAnimate").on("click", "#mnKai", function () {
        tryPlay()
    }), $(".drawInfo").on("click", "#spanbtn", function () {
        "soundsOn" == $("#spanbtn").attr("class") ? ($("#spanbtn").removeClass("soundsOn").addClass("soundsOff"), sound.stop("audioidB"), sound.stop("audioidR")) : ($("#spanbtn").removeClass("soundsOff").addClass("soundsOn"), "b" == audioType ? (sound.play("audioidB"), sound.stop("audioidR")) : (sound.play("audioidR"), sound.stop("audioidB")))
    }), btnStyle()
}



export function stopAll(){
    clearInterval(timer);
}

sound = {
    play: function (e) {
        "soundsOn" == $("#spanbtn").attr("class") && document.getElementById(e).play()
    }, stop: function (e) {
        document.getElementById(e).pause()
    }
}
export function startGame(e) {
    var n = this;
     e && codePlay(), $(".linelist").find("li").addClass("redli"), sound.stop("audioidB"), sound.play("audioidR"), audioType = "r", bressBG(10)
};

export function codePlay () {
    var e = $(".codeNum").find("li");
    run(-154, 6, "0", e);
    run(-1370, 4, "1", e);
    run(-762, 10, "2", e);
    run(-1522, 5, "3", e);
    run(-2, 7, "4", e);
}

export function run (e, n, a, t) {
    var i = setInterval(function () {
        $(t).eq(a).css("backgroundPositionY", e + "px"), (e += n) >= -2 && (e = -1522)
    }, n);
    animateId[a] = i
}
export function stopGame (e, n) {
    for (var a = 0; a < 5; a++) stop(a, 1 * e[a],n);
    audioType = "b", sound.play("audioidB"), sound.stop("audioidR")
};

export function stop (e, a,n) {
    if ("1" == n) setTimeout(function () {
        clearInterval(animateId[e]);
        var n = $(".codeNum").find("li");
        $(n).eq(e).removeAttr("style"), $(n).eq(e).removeClass().addClass("num" + a)
    }, 400 * e); else if ("2" == n) {
        clearInterval(animateId[e]);
        var t = $(".codeNum").find("li");
        $(t).eq(e).removeAttr("style"), $(t).eq(e).removeClass().addClass("num" + a)
    }
};

export function btnStyle() {
    $(".animate").on("mousedown", "#mnKai", function () {
        $("#mnKai").addClass("mnKaiD")
    }), $(".animate").on("mouseup", "#mnKai", function () {
        $("#mnKai").removeClass("mnKaiD")
    })
};
export function tryPlay () {
    var e = [], n = $(".animate");
    if (tryflag) {
        $(n).find("#opening").text("模拟开奖中..."), $(".noinfor").text("模拟中..."), $("#hourtxt").hide(), $("#opening").show(), tryflag = !1, startGame(!0);
        var a = setTimeout(function () {
            for (var n = 0; n < 5; n++) e.push(Math.round(5 * Math.random() + 1));
            stopGame(e, "1");
            var t = null;
            $("#hourtxt").fadeIn(), $("#opening").hide(), void 0 != animateId.bressBG && (clearInterval(animateId.bressBG), $(".manPic").find("span").eq(0).removeClass().addClass("manll"), $(".manPic").find("span").eq(1).removeClass().addClass("manrl"));
            var i = setTimeout(function () {
                for (var e = $(".codeArr").find("li"), n = [], a = 0; a < 5; a++) n.push($(e).eq(a).attr("class").split("code")[1]);
                stopGame(n, "2"), t = setTimeout(function () {
                    tryflag = !0
                }, 2e3), trytime.push(t)
            }, 8e3);
            trytime.push(a), trytime.push(i)
        }, 5e3)
    } else $(".noinfor").fadeIn(200, "", function () {
        setTimeout(function () {
            $(".noinfor").fadeOut("300")
        }, 1e3)
    })
}
export function playGame() {
    $("#opening").text("正在开奖..."), $("#hourtxt").hide(), $("#opening").show(), startGame(!0)
}
export function updateData (e) {
    var n = "大" == e.sumBigSmall ? "大" : "小" == e.sumBigSmall ? "小" : "和",
        a =  "单" == e.sumSingleDouble ? "单" : "双" == e.sumSingleDouble ? "双" : "和";
    $("#drawIssue").text(e.drawIssue), $("#drawTime").text(e.drawTime.split(" ")[1]);
    var t = e.preDrawCode;
    $(t).each(function (e) {
        $(".codeArr").find("li").eq(e).removeClass().addClass("code" + 1 * this)
    }), $(".codeArr").find("li").eq(5).find("span").eq(0).text(e.sumNum), $(".codeArr").find("li").eq(5).find("span").eq(1).text(n), $(".codeArr").find("li").eq(5).find("span").eq(2).text(a)
}
export function cutTime (e, n) {
    null != timer && clearInterval(timer);
    var e = e;
    timer = setInterval(function () {
        if (e >= 1) {
            e -= 1;
            var a = Math.floor(e / 3600), t = Math.floor(e / 60 % 60), i = Math.floor(e % 60), s = "";
            if (s = (a < 10 ? "0" + a : a) + ":", s = s + "" + (t < 10 ? "0" + t : t) + ":" + (i < 10 ? "0" + i : i), $("#hourtxt").text(s), e < 10) {
                var o = $(".linelist").find("li");
                $(o).eq(e).addClass("redli")
            }
            e < 20 && (tryflag = !1, $(".noinfor").text("即将开奖，禁止模拟"))
        } else $(".noinfor").text("正在开奖，禁止模拟"), clearInterval(timer), playGame(), console.log(n), setTimeout(pubmethod.doAjax(n.issue, n.lotCode, n.type, !1), "500")
    }, 1e3)
}
export function clearTime () {
    clearInterval(timer)
}
export function startVideo(e, n) {
    sound.stop("audioidB"), audioType = "r", updateData(e), console.log(e.preDrawCode), stopGame(e.preDrawCode, "2"), cutTime(e.seconds, n), setTimeout(function () {
        $(".animate").find(".loading").fadeOut(), firth11Load = !1
    }, 1e3)
}
export function defStartVideo (e, n, a, t, i, s) {
    sound.stop("audioidB"), sound.play("audioidR"), $("#hourtxt").hide(), $("#opening").show(), audioType = "r", playGame(), $("#drawIssue").text(e), $("#drawTime").text(n), $(s).each(function (e) {
        $(".codeArr").find("li").eq(e).removeClass().addClass("code" + this)
    }), $(".codeArr").find("li").eq(5).find("span").eq(0).text(a), $(".codeArr").find("li").eq(5).find("span").eq(1).text(t), $(".codeArr").find("li").eq(5).find("span").eq(2).text(i), setTimeout(function () {
        $(".animate").find(".loading").fadeOut(), firth11Load = !1
    }, 1e3)
}

export function stopVideo (e, n) {
    stopGame(e.preDrawCode, 1), setTimeout(function () {
        cutTime(e.seconds, n), tryflag = !0
    }, 1e3), updateData(e), $("#hourtxt").fadeIn(), $("#opening").hide(), void 0 != animateId.bressBG && (clearInterval(animateId.bressBG), $(".manPic").find("span").eq(0).removeClass().addClass("manll"), $(".manPic").find("span").eq(1).removeClass().addClass("manrl"))
}
export function bressBG (e) {
    var n = 1, a = !1;
    void 0 != animateId.bressBG && clearInterval(animateId.bressBG);
    var t = setInterval(function () {
        $("#_11x5Bg").find("img").css({opacity: n}), a ? (n = 0, $(".manPic").find("span").eq(0).removeClass("manll").addClass("manlr"), $(".manPic").find("span").eq(1).removeClass("manrr").addClass("manrl"), a = !1) : (n = 1, $(".manPic").find("span").eq(1).removeClass("manrl").addClass("manrr"), $(".manPic").find("span").eq(0).removeClass("manlr").addClass("manll"), a = !0)
    }, 200);
    animateId.bressBG = t
};