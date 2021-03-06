var  isTry = !1, ifopen = !1, playa = "b", animateId = {}, timer = null, sound, audioType;
var runBall1 = null, runBall2 = null, runBall3 = null;
var curNumUlSetTime;
var test = true
export function stopAll(){
    test = false
    clearInterval(timer);
}

export function tryRecoverArr() {
    var n = [];
    $(".headCode").find("ul li").each(function () {
        n.push(parseInt($(this).text()))
    }), runKaiCode(n)
}

export function headKaiCode(n) {
    for (var e = "", a = "", t = "", i = 0; i < n.length; i++) 0 == i ? e = "<li id='oneCode'><span>" + n[i] + "</span></li>" : 1 == i ? a = "<li id='twoCode'><span>" + n[i] + "</span></li>" : t = "<li id='threeCode'><span>" + n[i] + "</span></li>";
    var l = e + a + t;
    $(".headCode").find("ul").append(l)
}

export function runKaiCode(n) {
    for (var e = "", a = "", t = "", i = 0; i < n.length; i++) 0 == i ? e = "<li class='firstBall'><span>" + n[i] + "</span></li>" : 1 == i ? a = "<li class='secondBall'><span>" + n[i] + "</span></li>" : t = "<li class='thirdBall'><span>" + n[i] + "</span></li>";
    var l = e + a + t;
    $("#curNumUl").append(l)
}

export function kaiCodeAnimate(n) {
    var e = 0;    
    $(".runCode").find("#curNumUl").empty();
    clearInterval(curNumUlSetTime);
    curNumUlSetTime = setInterval(function () {
        0 == e ? ($("#curNumUl").append("<li class='firstBall'><span>" + n[e] + "</span></li>"), clearInterval(runBall1), dropAgian(1)) : 1 == e ? ($("#curNumUl").append("<li class='secondBall'><span>" + n[e] + "</span></li>"), clearInterval(runBall2), dropAgian(2)) : 2 == e && ($("#curNumUl").append("<li class='thirdBall'><span>" + n[e] + "</span></li>"), clearInterval(runBall3), dropAgian(3)), ++e > 3 && (clearInterval(curNumUlSetTime), bgMusic())
    }, 1e3)
}

export function dropBall() {
    var n = $(".parLi").find("ul li"), e = 0;
    $(".runCode").find("#curNumUl").empty();
    for (e = 0; e < 30; e++) dropStart(e, e < 5 ? n.eq(e).position().top + 11 * (5 - e) : e >= 5 && e < 10 ? n.eq(e).position().top + 11 * (10 - e) : e >= 10 && e < 15 ? n.eq(e).position().top + 11 * (15 - e) : e >= 15 && e < 20 ? n.eq(e).position().top + 11 * (20 - e) : e >= 20 && e < 25 ? n.eq(e).position().top + 11 * (25 - e) : n.eq(e).position().top + 11 * (30 - e), n.eq(e).position().left)
}

export function dropAgian(n) {
    var e = $(".parLi").find("ul li");
    1 == n ? agianAnimate(e, 0, 10) : 2 == n ? agianAnimate(e, 10, 20) : agianAnimate(e, 20, 30)
}

export function agianAnimate(n, e, a) {
    if(test) {
        var topN, leftN;
        for (var t = e; t < a; t++) topN = createNum(50, 55), leftN = n.eq(t).position().left + createNum(-5, 5), $(".parLi").find("ul li").eq(t).animate({
            top: topN + "px",
            left: leftN + "px"
        }, 500)
    }
}

export function dropStart(n, e, a) {
    var t = "";
    t = n < 5 || n >= 10 && n < 15 || n >= 20 && n < 25 ? createNum(0, 25) + a : createNum(-25, 0) + a;
    var i = e + createNum(-5, 1);
    $(".parLi").find("ul li").eq(n).animate({ top: i + "px", left: t + "px" }, 500)
}

export function ballRunning1() {
    for (var n = $(".firstBallPip").find("ul li"), e = 0, a = 0, t = 0; t < 10; t++) a = createNum(0, 55), t < 5 ? (e = createNum(-5, 25), ballAnimate(n[t], a, e)) : (e = createNum(-25, 5), ballAnimate(n[t], a, e))
}

export function ballRunning2() {
    for (var n = $(".secondBallPip").find("ul li"), e = 0, a = 0, t = 0; t < 10; t++) a = createNum(0, 55), t < 5 ? (e = createNum(-5, 25), ballAnimate(n[t], a, e)) : (e = createNum(-25, 5), ballAnimate(n[t], a, e))
}

export function ballRunning3() {
    for (var n = $(".thirdBallPip").find("ul li"), e = 0, a = 0, t = 0; t < 10; t++) a = createNum(0, 55), t < 5 ? (e = createNum(-5, 25), ballAnimate(n[t], a, e)) : (e = createNum(-25, 5), ballAnimate(n[t], a, e))
}

export function ballAnimate(n, e, a) {
    var t = createNum(10, 50);
    $(n).animate({ top: e + "px", left: a + "px" }, t)
}

export function createNum(n, e) {
    var a = e - n, t = Math.random();
    return n + Math.round(t * a)
}

export function bgMusic() {
    audioType = "b", sound.play("audioidBg"), sound.stop("audioidKai")
}

export function kaiMusic() {
    audioType = "r", sound.play("audioidKai"), sound.stop("audioidBg")
}
export function init() {
        ifopen =1;
        sound = {
            play: function (n) {
                "soundsOn" == $("#soundBth").attr("class") && document.getElementById(n).play()
            }, 
            stop: function (n) {
                if(document.getElementById(n) != null) {
                    document.getElementById(n).pause()
                }                  
            }
        }       
        $(".loading").fadeOut(1e3, function () {
        }), $("#soundBth").on("click", function () {
            "soundsOn" == $("#soundBth").attr("class") ? ($("#soundBth").removeClass("soundsOn").addClass("soundsOff"), sound.stop("audioidKai"), sound.stop("audioidBg")) : ($("#soundBth").removeClass("soundsOff").addClass("soundsOn"), "b" == audioType ? (sound.play("audioidBg"), sound.stop("audioidKai")) : (audioType, sound.play("audioidKai"), sound.stop("audioidBg")))
        }), $("#tryBtn").on("click", function () {
            if (isTry) return $(".jzCheck").show(), setTimeout(function () {
                $(".jzCheck").hide()
            }, 1e3), !1;
            isTry = !0, startGame(1)
        })
}
export function startGame(n) {
    kaiMusic();
    var e = [];
    startAnimate(), setTimeout(function () {
        1 == n && (e = createArr(), stopAnimate(1, e))
    }, 4e3)
};
export function recoverBall() {
    $(".parLi").find("ul").empty();
    $(".parLi").find("ul li");
    var n = "<li></li><li></li><li></li><li></li><li></li>";
    $(".leftUl").append(n), $(".rightUl").append(n)
}


export function startVid(n) {
    $("#hourtxt").show(), $("#opening").hide(), bgMusic(), Data(1, n)
}
export function defStartVid(n) {
    $("#hourtxt").hide(), $("#opening").show(), bgMusic(), $(".headCode").find("ul").empty(), $("#issue").text(data.drawIssue), $("#kaiTime").text(data.drawTime), $(".runCode").find("#curNumUl").empty(), startAnimate(), headKaiCode(data.preDrawCode)
}
export function stopVid(n, e) {
    $("#hourtxt").show(), $("#opening").hide(), stopAnimate(2, n.preDrawCode), Data(2, n)
}
export function Data(n, e) {
    $(".headCode").find("ul").empty(), $("#issue").text(e.preDrawIssue), $("#kaiTime").text(e.drawTime.split(" ")[1]), $(".runCode").find("#curNumUl").empty(), cutTime(e.seconds), headKaiCode(e.preDrawCode), 2 == n || runKaiCode(e.preDrawCode)
}
export function stopAnimate(n, e) {
    $(".runCode").find("#curNumUl").empty(), kaiCodeAnimate(e), setTimeout(function () {
        recoverBall(), $(".runCode").find("#curNumUl").empty(), 1 == n ? tryRecoverArr() : runKaiCode(e), isTry = !1
    }, 5e3)
};
export function startAnimate() {
    dropBall(), setTimeout(function () {
        runBall1 = setInterval(function () {
            ballRunning1()
        }, 50), runBall2 = setInterval(function () {
            ballRunning2()
        }, 50), runBall3 = setInterval(function () {
            ballRunning3()
        }, 50)
    }, 500)
}

export function getSecond(n) {
    var e = n.split(" ")[1].split(":"), a = e[0], t = e[1], i = e[2];
    return 3600 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a) + 60 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
}
export function nextopenTime(n, e) {
    var a = new Date(n).getTime() - new Date(e).getTime(), t = parseInt(a / 36e5 / 24), i = parseInt(a / 36e5 - 24 * t),
        l = parseInt(60 * (a / 36e5 - 24 * t - i)), o = parseInt(60 * (60 * (a / 36e5 - 24 * t - i) - l));
    return 3600 * (t > 0 ? 24 * t + i : i) + 60 * l + 1 * o
}
export function cutTime(n) {
    null != timer && clearInterval(timer);
    var n = n;
    timer = setInterval(function () {
        if (n >= 1) {
            n -= 1;
            var a = Math.floor(n / 3600), t = Math.floor(n / 60 % 60), i = Math.floor(n % 60), l = "";
            if (l = (a < 10 ? "0" + a : a) + " : ", l = l + "" + (t < 10 ? "0" + t : t) + " : " + (i < 10 ? "0" + i : i), $("#hourtxt").text(l), n < 10) {
                var o = $(".linelist").find("li");
                $(o).eq(n).addClass("redli")
            }
        } else clearInterval(timer), $("#hourtxt").hide(), $("#opening").css("display", "block"), kaiMusic(), startAnimate()
    }, 1e3)
}

export function clearTime() {
    clearInterval(timer)
}
export function createArr() {
    for (var n = [], e = 0; e < 3; e++) {
        var a = createNum(0, 9);
        if (0 != e) for (var t = 0, i = n.length - 1; t < n.length; t++) {
            if (a == n[t]) {
                e--;
                break
            }
            if (t == i) {
                n.push(a);
                break
            }
        } else n.push(a)
    }
    return n
};