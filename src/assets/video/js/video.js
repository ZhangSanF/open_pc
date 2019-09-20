require(null, function (app) {
    var iframeSelector = ".video iframe";
    // 是否是第一次加载数据
    var firstLoad;
    var iframeReady;
    var lotteryCode;
    var drawingCalled;

    function init() {
        console.log("init video");
        firstLoad = true;
        iframeReady = false;
        lotteryCode = $(iframeSelector).attr("lotteryCode");
        drawingCalled = false;
        if (app.video) {
            app.video.currentIssue = null;
            app.video.insertedIssue = null;
        }
    }

    init();

    var videos = {
        addVideo: function (lotteryCodes, videoConfig) {
            var arr = $.isArray(lotteryCodes) ? lotteryCodes : [lotteryCodes];
            for (var i = 0; i < arr.length; i++) {
                this[arr[i]] = $.extend({
                    insertData: function () {
                    }, drawing: function () {
                    }, startVideo: function () {
                    }, iframeReady: function () {
                        return iframe() && iframe().ifopen === false;
                    }
                }, videoConfig);
            }
        }
    };

    // 工具方法
    function convertDateFromString(dateString) {
        if (dateString) {
            var arr1 = dateString.split(" ");
            var sdate = arr1[0].split('-');
            var stime = arr1[1].split(":");
            return new Date(sdate[0], sdate[1] - 1, sdate[2], stime[0], stime[1], stime[2]);
        }
    }

    function parseObj(e) {
        var t = null;
        return "object" !== typeof e ? t = JSON.parse(e) : (t = JSON.stringify(e), t = JSON.parse(t)), t
    }

    function operatorTime(e, t) {
        var i = e.replace("-", "/"), t = t.replace("-", "/");
        return i = i.replace("-", "/"), t = t.replace("-", "/"), (new Date(i).getTime() - new Date(t).getTime()) / 1e3
    }

    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    function iframe() {
        return $(iframeSelector)[0].contentWindow;
    }

    function startVideo() {
						console.log('startVideo');

        try {
			console.log('startVideo try');
          if (videos[lotteryCode].iframeReady()) {
                iframe().ifopen = true;
                videos[lotteryCode].startVideo();
                iframeReady = true;
            }
            else {
                throw new Error();
            }
        }
        catch (e) {
            // 调用iframe有可能因为iframe未加载完成而调用失败
            console.log('s3');
            setTimeout(function () {
                startVideo();
            }, 500);
        }
    }

    // 广东快乐十分
    videos.addVideo("gdkl10", {
        insertData: function (data, drawing) {
            var time = data.currentTime.split(' ')[1];
            if (firstLoad) {
                if (drawing) {
                    console.log(("moveBall"))
                    iframe().fun.moveBall();
                }
                else {
                    iframe().fun.Trueresult(data.newest.array);
                    iframe().fun.fillHtml(data.newest.issue, data.current, time, data.ticking, data.newest.array);
                }
            }
            else {
                iframe().fun.Trueresult(data.newest.array);
                iframe().fun.fillHtml(data.newest.issue, data.current, time, data.ticking, data.newest.array);
            }
        },
        startVideo: function(){
            if(isSmallVideo()){
                $(iframeSelector).contents().find(".video_box").css("transform", "scale(0.34)");
                $(iframeSelector).contents().find("#qishu,#nexttime,#cuttime,#btnbox").hide();
                var bluefont = $(iframeSelector).contents().find(".bluefont").text();
                var size, left, top;
                if(bluefont.length > 5) {
                    size = "14px";
                    left = "0";
                } else {
                    size = "20px";
                    left = "3px";
                }
                $(iframeSelector).contents().find(".bluefont").css({
                    "font-size": size,
                    "left": left,
                    "top": "7px"
                });
                $(iframeSelector).contents().find(".bckj").css({
                    "margin-top": "7px"
                });
                $(iframeSelector).contents().find(".ml").css({
                    "font-size": "20px"
                });
            }
        }
    });

    // 幸运农场
    videos.addVideo("xync", {
        insertData: function (data) {
            if (firstLoad) {
                iframe().cqncVideo.statusFun(data.newest.issue + "", data.newest.array, data.ticking, true);
            }
            else {
                setTimeout(function () {
                    iframe().stopanimate(data.newest.array, data.ticking);
                }, 1000);
            }
        }, startVideo: function () {
            if (isSmallVideo()) {
                $(iframeSelector).contents().find(".content").css("transform", "scale(0.34)");
                $(iframeSelector).contents().find("#qishu,#nexttime,#cuttime,#btnbox").hide();
                var t, e;
                if ($(iframeSelector).contents().find(".bluefont").text().length > 5) {
                    t = "14px";
                    e = "0";
                } else {
                    t = "20px";
                    e = "3px";
                }
                $(".animate iframe").contents().find(".bluefont").css({
                    "font-size": t,
                    left: e,
                    top: "7px"
                });
                $(iframeSelector).contents().find(".bckj").css({"margin-top": "7px"});
                $(iframeSelector).contents().find(".ml").css({"font-size": "20px"});
            }
        }
    });

    // pk10、极速赛车、极速飞艇、幸运飞艇
    videos.addVideo(["pk10", "speed10", "jsft", "xyft","jspk10","mspk10","msft","sgft","klft","klpk10"], {
        insertData: function (data, drawing) {
            function insertData(countdown) {
                //切换到开奖
                iframe().startcountdown(countdown);
				console.log(data.newest.code);
                iframe().showcurrentresult(data.newest.code);
                // 已开奖期数
                $(iframeSelector).contents().find("#currentdrawid").text(data.current);
                // 开奖期号
                $(iframeSelector).contents().find("#nextdrawtime").text(data.newest.issue);
                // 冠亚和数据
                $(iframeSelector).contents().find("#stat1_1").text(data.summery[5]);
                $(iframeSelector).contents().find("#stat1_2").text(data.summery[6]);
                $(iframeSelector).contents().find("#stat1_3").text(data.summery[7]);
                // 龙虎
                for (var i = 0; i < 5; i++) {
                    $(iframeSelector).contents().find("#stat2_" + (i + 1)).text(data.summery[i]);
                }
            }

            var ticking = drawing ? 0 : data.ticking;
            if (firstLoad) {
                insertData(ticking);
            }
            else {
                iframe().finishgame(data.newest.code, ticking);
                setTimeout(function () {
                    insertData(ticking - 10 < 0 ? 0 : ticking - 10);
                }, 10000);
            }

        }, startVideo: function () {
            $(iframeSelector).contents().find(".container").hide();
            $(iframeSelector).contents().find("#preloader").hide();
            var W = $(iframeSelector).width();
            var H = $(iframeSelector).height();
            var zoomW = (W / 1310);
            $(iframeSelector).contents().find(".container").css("zoom", zoomW);
            $(iframeSelector).contents().find(".container").css({
                "-moz-transform": "scale(" + zoomW + ")",
                "-moz-transform-origin": "top left"
            });
            setTimeout(function () {
                $(iframeSelector).contents().find(".container").fadeIn('slow');
                $(iframeSelector).contents().find("body").delay(350).css({
                    'overflow': 'visible'
                });
            }, 500);
        },
        iframeReady: function () {
            switch (lotteryCode) {
                case "pk10":
                case "speed10":
                    return iframe() && $.isFunction(iframe().videoTools.ifsund);
                case "jsft":
                case "xyft":
                    return iframe() && iframe().obj;
                default:
                    return iframe() || false;
            }
        }
    });

    // 时时彩
    videos.addVideo(["cqssc", "speed5", "xjssc", "tjssc", "jsssc", "msssc", "klssc", "xyssc"], {
        insertData: function (data, drawing) {
            // 倒计时提前1秒，以留时间播放开奖动画
            var ticking = data.ticking - 1;
            ticking = ticking < 0 ? 0 : ticking;
            var result = {
                preDrawCode: data.newest.array,
                id: "#numBig",
                counttime: ticking,
                preDrawIssue: data.newest.issue,
                drawTime: data.currentTime.split(" ")[1],
                sumNum: data.summery[0],
                sumSingleDouble: data.summery[2],
                sumBigSmall: data.summery[1],
                dragonTiger: data.summery[3]
            };
            iframe().sscAnimateEnd(result);
        }, startVideo: function () {
            if (isSmallVideo()) {
                $(iframeSelector).contents().find("#qishu,#nexttime,#cuttime,#btnbox").hide();
                var bluefont = $(iframeSelector).contents().find(".bluefont").text();
                var size, left, top;
                if (bluefont.length > 5) {
                    size = "14px";
                    left = "0";
                } else {
                    size = "20px";
                    left = "3px";
                }
                $(iframeSelector).contents().find(".bluefont").css({
                    "font-size": size,
                    "left": left,
                    "top": "7px"
                });
                $(iframeSelector).contents().find(".bckj").css({
                    "margin-top": "7px"
                });
                $(iframeSelector).contents().find(".ml").css({
                    "font-size": "20px"
                });
            }
        }
    });

    // 江苏快三
    videos.addVideo(["jsk3"], {
        insertData: function (data, drawing) {
            for (var i = 0; i <= 2; i++) {
                $(iframeSelector).contents().find("#codetop").find("li").eq(i).text(data.newest.array[i]);
            }
            $(iframeSelector).contents().find(".nowDraw").text(data.newest.term);
            var d = {
                preDrawCode: data.newest.array,
                sumNum: data.newest.sum,
                sumBigSmall: data.newest.sum,
                drawIssue: data.current,
                drawTime: data.currentTime.split(" ")[1],
                seconds: drawing ? 0 : data.ticking
            }
            if(iframe().k3v){
                iframe().k3v.stopVideo(d);
            }
        },
        iframeReady: function () {
            return iframe() && iframe().k3v;
        },
        startVideo: function () {
            if (isSmallVideo()) {
                $(iframeSelector).contents().find(".content").css("transform", "scale(0.33)");
                $(iframeSelector).contents().find("#qishu,#nexttime,#cuttime,#btnbox").hide();
                var t, e;
                if ($(iframeSelector).contents().find(".bluefont").text().length > 5) {
                    t = "14px";
                    e = "0";
                } else {
                    t = "20px";
                    e = "3px";
                }
                $(iframeSelector).contents().find(".bluefont").css({
                    "font-size": t,
                    left: e,
                    top: "7px"
                });
                $(iframeSelector).contents().find(".bckj").css({"margin-top": "7px"});
                $(iframeSelector).contents().find(".ml").css({"font-size": "20px"});
            }
        }
    });

    function isSmallVideo() {
        return $(iframeSelector).width() < 600;
    }

    // 立即启动视频
    startVideo();

    function doInsertData(lotteryCode, data, drawing) {
        video.insertedIssue = data.newest.issue;
        videos[lotteryCode].insertData(data, drawing);
        if (firstLoad) {
            firstLoad = false;
        }
        drawingCalled = false;
    }

    return video = app.video = {
        // 当前要开奖的期号
        currentIssue: null,
        insertedIssue: null,
        // 已获取数据
        gotLotteryData: function (lotteryCode, data) {
			console.log(data);
            if (!data.newest)
                return;
            if (!videos[lotteryCode])
                return;
            if (iframeReady) {
                // 判断是否是开奖中，如果期数差超过3期，可能是没有新数据了，不当做开奖中处理
                var drawing = data.current - data.newest.issue >= 2 && data.current - data.newest.issue <= 3;
                if (firstLoad) {
                    // 首次加载，直接插入开奖数据
					        console.log("加载");

                    video.currentIssue = data.current;
                    doInsertData(lotteryCode, data, drawing);
                }
                else if (video.insertedIssue != data.newest.issue) {
                    video.currentIssue = data.current;
                    doInsertData(lotteryCode, data, drawing);
                }
            }
            else if ($(iframeSelector).attr("src")) { // 有可能没有加载有效的iframe，此时src为空
                // 如果iframe未加载完毕，推迟再调用一遍
                setTimeout(function () {
                    video.gotLotteryData(lotteryCode, data);
                }, 500);
            }
        },
        // 正在获取数据
        gettingLotteryData: function (lotteryCode) {
            // 避免一次等待开奖过程中重复调用drawing
            if (drawingCalled)
                return;
            videos[lotteryCode].drawing(lotteryCode);
            drawingCalled = true;
        },
        startVideo: startVideo,
        init: init
    }

})