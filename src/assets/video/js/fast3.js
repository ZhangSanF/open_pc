var tryflag = !0, timer = null, ifpaused = "", animateId = {},sound={},ifopen =!1;

export function init(){
    ifopen = 1;
    $(".animate").find(".loading").fadeOut(1e3, function () {
    }), $(".kuai3Animate").on("click", ".kaimodule", function () {
        tryPlay()
    }), $("#soundBtn").on("click", "#spanbtn", function () {
        document.getElementById("audio");
        "sounds" == $("#spanbtn").attr("class") ? ($("#soundBtn").children().removeClass("sounds").addClass("sounds2"), sound.stop("")) : ($("#soundBtn").children().removeClass("sounds2").addClass("sounds"), sound.play("all"))
    })
}

export function stopAll(){
    clearInterval(timer);
}

console.log('init k3v');
export function startGame(t) {
    var e = this;
    t && codePlay(), $(".linelist").find("li").addClass("redli"), ifpaused = "audioidB", ifopen && $("#spanbtn").hasClass("sounds") && sound.play("audioidR"), bressBG(10)
};

 export function codePlay() {
    var t = $("#code").find("li");
    run(2, "80", "0", t);
    run(5, "80", "1", t);
    run(8, "80", "2", t);
}

export function run (t, e, n, a) {
    var i = setInterval(function () {
        $(a).eq(n).attr("class", "k3v0" + t), ++t >= 8 && (t = 1)
    }, e);
    animateId[n] = i
}

export function stopGame(t) {
    var stop = function (t, e) {
        setTimeout(function () {
            clearInterval(animateId[t]);
            var n = $("#code").find("li");
            $(n).eq(t).attr("class", "k3v" + e)
        }, 800 * t)
    };
    for (var e = 0; e < 3; e++) stop(e, t[e])
};
var trytime = [];
export function tryPlay() {
    var t = [];
    if (tryflag) {
        $("#timetitle").text("模拟开奖"), $("#hourtxt").hide(), $("#opening").show(), tryflag = !1, startGame(!0);
        var e = setTimeout(function () {
            for (var n = 0; n < 3; n++) t.push(Math.round(5 * Math.random() + 1));
            stopGame(t);
            var a = setTimeout(function () {
                for (var t = $("#codetop").find("li"), e = [], n = 0, a = t.length; n < a; n++) e.push($(t).eq(n).text());
                stopGame(e), setTimeout(function () {
                    tryflag = !0
                }, 3e3)
            }, 8e3), i = setTimeout(function () {
                $("#timetitle").text("倒计时"), $("#hourtxt").show(), $("#opening").hide();
                var t = $("#hourtxt").text().split(":"), e = t[0], n = t[1], a = t[2],
                    i = 3600 * (e = e < 10 ? e.substring(e.length - 1, e.length) : e) + 60 * (n = n < 10 ? n.substring(n.length - 1, n.length) : n) + 1 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a);
                cutTime(i), ifpaused = "audioidB", ifopen && $("#spanbtn").hasClass("sounds") && sound.play("audioidB"), bressBG()
            }, 2e3);
            trytime.push(e), trytime.push(a), trytime.push(i)
        }, 5e3)
    } else $(".noinfor").fadeIn(200, "", function () {
        setTimeout(function () {
            $(".noinfor").fadeOut("300")
        }, 1e3)
    })
};
export function playGame() {
    startGame(!0)
};
export function updateData(t) {
    var e = t.preDrawCode;
    $("#nowDraw").text(t.drawIssue)
    $("#num1").text(e[0]), $("#num2").text(e[1]), $("#num3").text(e[2]), $("#sumNum").text(t.sumNum), $("#sumBigSmall").text(sumBigSmall(t.sumNum)), $("#drawIssue").text(t.drawNextIssue);
    if (void 0 != t.drawTime) n = t.drawTime.substr(t.drawTime.length - 8, 8); else var n = "";
    $("#drawTime").text(n)
};
export function cutTime(t) {
    null != timer && clearInterval(timer);
    var t = t;
    timer = setInterval(function () {
        if (t >= 1) {
            t -= 1;
            var e = Math.floor(t / 3600), n = Math.floor(t / 60 % 60), a = Math.floor(t % 60), i = "";
            if (i = (e < 10 ? "0" + e : e) + ":", i = i + "" + (n < 10 ? "0" + n : n) + ":" + (a < 10 ? "0" + a : a), $("#hourtxt").text(i), t < 10) {
                var s = $(".linelist").find("li");
                $(s).eq(t).addClass("redli")
            }
            t < 20 && (tryflag = !1, $(".noinfor").text("即将开奖，禁止模拟"))
        } else $(".noinfor").text("正在开奖，禁止模拟"), clearInterval(timer), playGame(), $("#timetitle").text("正在开奖"), $("#hourtxt").hide(), $("#opening").show()
    }, 1e3)
};
sound = {
    play: function (t) {
        "sounds" == $("#spanbtn").attr("class") && ifopen && ("all" == t ? document.getElementById(ifpaused).play() : (document.getElementById("audioidB").pause(), document.getElementById("audioidR").pause(), document.getElementById(t).play()))
    }, stop: function (t) {
        var e = document.getElementById("audioidB");
        ifpaused = e.paused ? "audioidR" : "audioidB", document.getElementById("audioidB").pause(), document.getElementById("audioidR").pause()
    }
};
export function stopVideo (t) {
    stopGame(t.preDrawCode), updateData(t), setTimeout(function () {
        $("#timetitle").text("倒计时"), $("#hourtxt").fadeIn(), $("#opening").hide(), $(".linelist").find("li").removeClass("redli"), cutTime(t.seconds), ifpaused = "audioidB", ifopen && $("#spanbtn").hasClass("sounds") && sound.play("audioidB"), bressBG(), tryflag = !0
    }, 2e3)
};
export function bressBG(t) {
    var e = 1, n = !1;
    void 0 != animateId.bressBG && clearInterval(animateId.bressBG), void 0 == t && (t = 80);
    var a = setInterval(function () {
        $("#bodybgK3").find("img").stop().animate({opacity: "0." + e}, t), n ? (e -= 1) < 1 && (n = !1) : (e += 1) > 8 && (n = !0)
    }, t);
    animateId.bressBG = a
};
export function sumBigSmall(t) {
    return t <= 10 ? "小" : "大"
};