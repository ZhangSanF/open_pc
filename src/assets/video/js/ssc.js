var datestr = "", timerInterval = "", ifopen = !1, preDrawCode = "", animateID = [],sounds={};


export function stopAll (){
    clearInterval(timerInterval);
    ifopen = !1;
}
 
export function sscAnimateEnd(o) {
    if (ifopen) {
        sscAnimateEndFunc(o.preDrawCode, o.id, o.counttime, !1);
        inseartData(o);
        datestr = o.counttime;
        preDrawCode = o.preDrawCode;
    }
}

export function stopSound(o) {
    sounds.soundsT.stop(o)
}


export function init(){
    ifopen = 1;
    sounds = {
        soundsT: {
            play: function (o) {
                if(ifsund() && ifopen){
                    (require("../sound/sscOver.mp3") == $("#" + o).attr("src") ? $("#" + o).removeAttr("loop", "loop") : $("#" + o).attr("loop", "loop"))
                    document.getElementById(o).play()
                }
            }, stop: function (o) {
                document.getElementById(o).pause()
            }
        }
    };
    createNum();
    setTimeout(function () {
        setTimeout(function () {
            $(".loading").fadeOut(600)
        }, 100)
    }, 200);
    $(".menubox").on("click", ".tyrbtn", function () {
        $(this).attr("id") || ($(this).attr("id", "true"), sscAnimate("#numBig"), testOpen())
    });
    $(".menubox").on("click", ".soundbtn", function () {
        if ($(this).hasClass("closesoundbtn")) {
            $(this).removeClass("closesoundbtn");
            $("audio");
            $(".oping ").is(":hidden") ? ifsund() && ifopen && ($("#bgsound").attr("src", require("../sound/sscBg.mp3")), sounds.soundsT.play("bgsound")) : ifsund() && ifopen && ($("#bgsound").attr("src", "sound/opening.mp3"), sounds.soundsT.play("bgsound"))
        } else $(this).addClass("closesoundbtn"), $("#bgsound").attr("src", "")
    });
    $(".djs").show();
    $(".codeboxl .perspectiveView")
}

export function sscAnimate(o) {
    clearInterval(animateID[o]), ifsund() && ifopen && ($("#bgsound").attr("src", require("../sound/sscOpening.mp3")), sounds.soundsT.play("bgsound"));
    var e = setInterval(function () {
        for (var e = $(o).find(".box"), n = $(e).find("span").length, s = 0; s < n; s++) {
            $(e).find("span").eq(s).removeClass().addClass("num" + $(e).find("span").eq(s).text()), $(e).find("span").eq(s).css({
                backgroundPositionY: "0",
                backgroundPositionX: "0",
                backgroundSize: "100%"
            });
            var i = excutenum();
            $(e).find("span").eq(s).stop().animate({
                backgroundPositionY: "-30",
                backgroundPositionX: "67px",
                backgroundSize: "50%"
            }, 50 * i == "0" ? "100" : 50 * i), $(e).find("span").eq(s).text(excutenum())
        }
    }, 100), n = $(".codeboxl .perspectiveView");
    $(n).each(function (o) {
        xz3D(n[o], !1)
    }), $(".oping").show(), $(".djs").hide(), animateID[o] = e
};

export function sscAnimateEndFunc(o, e, n, s) {
    if (ifopen) {
        ifsund() && ifopen && ($("#bgsound").attr("src", require("../sound/sscOver.mp3")), sounds.soundsT.play("bgsound")), clearInterval(animateID[e]);
        var i = $(e).find(".box");
        $(".oping").hide(), $(".djs").show();
        var t = [];
        $(i).each(function (e) {
            $(this).find("span").text(""), $(this).find("span").removeClass().addClass("num" + o[e]), t.push($(this).find("span"))
        }), showNUM(t, o), s || cutTime(n)
    }
};
export function excutenum() {
    return Math.floor(10 * Math.random())
};
export function xz3D(o, e) {
    var o = $(o);
    e ? ($(o).children(".flip").eq(0).addClass("out").removeClass("in"), setTimeout(function () {
        $(o).find(".flip").show().eq(1).addClass("in").removeClass("out"), $(o).children(".flip").eq(0).hide()
    }, 225)) : ($(o).children(".flip").eq(1).addClass("out").removeClass("in"), setTimeout(function () {
        $(o).find(".flip").show().eq(0).addClass("in").removeClass("out"), $(o).children(".flip").eq(1).hide()
    }, 225))
};

export function showNUM(o, e) {
    for (var n = $(".tl .perspectiveView"), s = $(".bl .perspectiveView"), i = function (o) {
        $(o).css({
            backgroundPositionY: "28px",
            backgroundPositionX: "26px",
            backgroundSize: "10%"
        }), $(o).stop().animate({
            backgroundPositionY: "-18px",
            backgroundPositionX: "-16px",
            backgroundSize: "150%"
        }, 200, function () {
            $(o).stop().animate({backgroundPositionY: "0", backgroundPositionX: "0", backgroundSize: "100%"}, 200)
        })
    }, t = 0, a = 0; t < 5; t++) {
        if (a += 150, t >= 4) var d = 0;
        setTimeout(function () {
            i(o[d]), xz3D(n[d], !0), xz3D(s[d], !0), d++
        }, a)
    }
    setTimeout(function () {
        ifsund() && ifopen && ($("#bgsound").attr("src", require("../sound/sscBg.mp3")), setTimeout(sounds.soundsT.play("bgsound"), 1e3))
    }, 2800), $(".tl").find(".box").each(function (o) {
        var n = "", s = $(this).find("span").eq(1).attr("class");
        e[o] >= 5 ? (n = "bigbg", -1 != s.indexOf(n) || (s = s.replace("smallbg", n))) : (n = "smallbg", -1 != s.indexOf(n) || (s = s.replace("bigbg", n))), $(this).find("span").eq(1).removeAttr("class").attr("class", s)
    }), $(".bl").find(".box").each(function (o) {
        var n = "", s = $(this).find("span").eq(1).attr("class");
        e[o] % 2 == 0 ? (n = "doublebg", -1 != s.indexOf(n) || (s = s.replace("singlebg", n))) : (n = "singlebg", -1 != s.indexOf(n) || (s = s.replace("doublebg", n))), $(this).find("span").eq(1).removeAttr("class").attr("class", s)
    })
}



export function cutTime(o) {
    var e = o;
    clearInterval(animateID.timer), timerInterval = setInterval(function () {
        if (e >= 1) {
            e -= 1;
            var o = Math.floor(e / 3600), n = Math.floor(e / 60 % 60), s = Math.floor(e % 60), i = "";
            i = (i = o <= 0 ? "" : (o < 10 ? "0" + o : o) + ":") + "" + (n < 10 ? "0" + n : n) + ":" + (s < 10 ? "0" + s : s), $(".bluefont").text(i)
        } else clearInterval(timerInterval), ifopen && sscAnimate("#numBig")
    }, 1e3), animateID.timer = timerInterval
};
export function inseartData(o) {
    $("#preDrawIssue").text(o.preDrawIssue), $("#drawTime").text(o.drawTime), $("#sumNum").text(o.sumNum), $("#sumSingleDouble").text(o.sumSingleDouble), $("#sumBigSmall").text(o.sumBigSmall), $("#dragonTiger").text(o.dragonTiger), $("#litNum").find(".box").each(function (e) {
        $(this).find("span").removeClass().addClass("num" + o.preDrawCode[e])
    })
};
export function createNum() {
    for (var o = [], e = 0; e < 5; e++) o.push((9 * Math.random() + "").split(".")[0]);
    return o
};

export function testOpen() {
    var o = 0, e = setInterval(function () {
        ++o >= 8 && (clearInterval(e), sscAnimateEndFunc(createNum(), "#numBig", datestr, !0), setTimeout(function () {
            setTimeout(function () {
                sscAnimateEndFunc(preDrawCode, "#numBig", datestr, !0), $(".menubox .tyrbtn").removeAttr("id")
            }, 100)
        }, 8e3))
    }, 1e3)
};
export function clearIntervalFunc() {
    clearInterval(timerInterval)
};
export function ifsund() {
    return !$("#soundbtn").hasClass("closesoundbtn")
};