/**
 * author : wxc
 * 2017-01-19
 */


var fanxingAdT = null;
var play = {

    /*全局参数*/
    globalParam: {
        globalID: 0, //保存当前 调用逐帧渲染返回的值
        isAudioStop: false,
        isStop: true, //当前 逐帧渲染是否停止
        isPlayDrop: false, //判断当前用户是否拖动播放进度条
        beginClientX: 0, //用于水平拖动播放进度条时，初始保存鼠标X坐标值
        begingPlayHeadX: 0, //用于水平拖动播放进度条时，初始保存播放头X坐标值
        isVolumeDrop: false, //判断当前用户是否拖动音量控制条
        beginClientY: 0, //用于竖直拖动音量控制条时，初始保存鼠标Y坐标值
        begingVolumeHeadY: 0, //用于竖直拖动音量控制条时，初始保存音量控制头Y坐标值
        myAudio: null, //audio元素
        volumeMode: "icon icon-playbar-maxvox", //保存当前声音模式
        volumeNum: "0.6", //保存当前声音设置条 音量值
        songDuration: 0, //当前歌曲的总时长，毫秒为单位
        duration: "", //当前播放歌曲的时长，字符串形式，如：04：23
        songName: "", //存储当前播放歌曲的歌曲名
        songIndex: 0,
        songW: 0, //存储当前歌曲名的宽度值
        doubEx: 0, //
        songNameEle1: null,
        songNameEle2: null,
        songNameEle1Left: null,
        songNameEle2Left: null,
        isFirstPlay: true, //第一次播放
        wordArr: null,
        wordArrLen: 0,
        wordArrHTML: null,
        ind: -2,
        currentPlayStatus: false, //当时播放状态
        fristFlag: true, // 第一次设置播放状态
        showPlayFlag: false
    },
    init: function() {
    	console.log(1111)
        var _this = this,
            locationFrom = location.href,
            reg = /\d+/g,
            ua = navigator.userAgent.toLowerCase(),
            ipad = /ipad/gi.test(ua),
            android = /android|Adr/gi.test(ua),
            iphone = /iphone/gi.test(ua),
            frwrap = /fr=wrap/gi.test(locationFrom),
            $songWordContent = $("#songWordContent");

       
        var loadBefor = "",
            reffer = document.referrer,
            // 获取登录信息
            kugouC = utility.read("KuGoo"),
            kuLogin = $(".kuLogin"),
            user_name = kugouC.NickName,
            user;
            window.downloadUrl = "http://download.kugou.com/download/kugou_pc";
       
        if (locationFrom.indexOf("baidu") != -1 || reffer.indexOf("baidu.com") != -1) {
            loadBefor = "百度";
            window.downloadUrl = "http://xiazai.kugou.com/Corp/kugou7_3762.exe";
        } else if (locationFrom.indexOf("sogou") != -1 || reffer.indexOf("sogou") != -1) {
            loadBefor = "搜狗";
            window.downloadUrl = "http://xiazai.kugou.com/Corp/kugou7_3814.exe";
        } else if (locationFrom.indexOf("360") != -1 || reffer.indexOf("so.com") != -1) {
            loadBefor = "360";
            window.downloadUrl = "http://xiazai.kugou.com/Corp/kugou7_3500.exe";
        } else if (reffer.indexOf("360.cn") != -1) {
            loadBefor = "360导航页";
        } else if (reffer.indexOf("google.com") != -1) {
            loadBefor = "谷歌";
        } else if (reffer == "" || reffer.indexOf("kugou.com") != -1 || reffer.indexOf("download.com") != -1) {
            loadBefor = "直接访问";
        } else if (reffer != "") {
            loadBefor = "其他访问";
        }
        if(utility.detectOS()=="Mac"){
            window.downloadUrl = "http://download.kugou.com/download/kugou_mac";
        }
        window.kugou_id = kugouC.KugooID;
       
        var pageLoadedData = _this.commonConfig();
            pageLoadedData["action"] = "index";
            pageLoadedData["b"] = "播放页访问";
            pageLoadedData["a"] = 2;
            pageLoadedData["o"] = loadBefor;
        var Loaded = [30032, pageLoadedData];
        apmCollectData.push(Loaded);

        try {
            newLogCount();
        } catch (ex) {}

       
        // content init
        if(location.href.indexOf("song-36")==-1){
            $(".mainPage").height($(window).height());
            _this.resizeUI();
        }
        $(window).resize(function() {
            var resizeUIt = setTimeout(function() {
                clearTimeout(resizeUIt)
                _this.resizeUI();
            }, 800)
        });
        // 播放列表
        var playList = $('.songjsAction').jScrollPane({
            hijackInternalLinks: true,
            animateScroll: true,
            autoReinitialise: true
        });
        _this.playListApi = playList.data("jsp")
            // 设置播放器存在标识localStorage
        $.jStorage.set("playFlag", "true");
        // 初始化 添加歌曲localStorage 
        $.jStorage.set("newsong", null);
        _this.playInit();
        _this.playList();
        _this.playListbindUI();
        _this.setActive(0);

        if (location.hash != "") {
            var urlHash = utility.QueryString("hash");
            var album_id = utility.QueryString("album_id");
        }
        console.log(typeof urlHash != "undefined" && urlHash != "" && urlHash != null)
        if (typeof urlHash != "undefined" && urlHash != "" && urlHash != null) {
            _this.getdatabyhash({
                Hash: urlHash,
                album_id: album_id,
                callback: function(res) {
                	console.log(222)
                    if (res["status"] != 0 && res["data"].length != 0) {
                        var songs = [],
                            authors ="",
                            songData = {};
                        songData["Hash"] = res["data"]["hash"];
                        $(res["data"].authors).each(function(i){
                            authors += res["data"].authors[i]["author_name"]+" ";
                        })
                        songData["author_name"] = authors;
                        songData["audio_name"] = res["data"]["song_name"];
                        songData["timelength"] = res["data"]["timelength"];
                        songData["album_id"] = res["data"]["album_id"];
                        songs.push(songData)
                        var resSong = JSON.stringify(songs);
                        $.jStorage.set("newsong", resSong);
                    } else {
                        var datafail = dialog({
                            id:"datafail",
                            width: 300,
                            height: 100,
                            title: '获取数据失败',
                            skin: 'getdatafail',
                            content: "获取数据失败，稍后重试"
                        }).show();

                        if (_this.globalParam.length > 1) {
                            _this.playSong(_this.globalParam.songIndex += 1)
                        }
                    }
                }
            },"link hash")
        } else {
            var data = JSON.parse($.jStorage.get("k_play_list")) || [];
            if (data.length != 0) {
                _this.playSong(_this.globalParam.songIndex);
            } else {
                _this.warnAddSong();
                return
            }
        }
        //初始化 36 信息流
        if(location.href.indexOf("song-36")!=-1){
            
        }


    },
    commonConfig :function(){
        var _this = this,
            kugouC = utility.read("KuGoo"),
            kugou_id = kugouC.KugooID;
        return {
            lvt: utility.formatDateTime(new Date()),
            os: utility.detectOS(),
            browser: utility.getBrowser()["type"] || "",
            uid: kugou_id || "",
            fo: "播放页",
            ivar1: location.href.indexOf("song-36") != -1 ? "360定制版":"普通版"
        }
    }, 
    warnAddSong: function() {
        var _this = this;
        var empty = { "hash": "", "timelength": 0, "filesize": 0, "audio_name": "", "have_album": 0, "album_name": "", "album_id": 0, "img": "", "have_mv": 0, "video_id": 0, "author_name": "", "song_name": "", "lyrics": "", "author_id": 0, "privilege": 0, "privilege2": 0, "play_url": "", "newlyrics": "", "Hash": "" };
        _this.updateUI(empty, function() {
            $(".btnArea2").hide()
                // 歌词区域
            $('.songWordContent .jspPane').html('<div class="no_song"><p class="nosong_tilte">暂无播放歌曲</p><p class="nosong_tip">你可以去酷狗网页添加歌曲</p><a class="goIndex" target="_blank" href="http://www.kugou.com/">去首页逛逛</a></div>');
            // 播放列表
            $(".songjsAction .jspPane").html('<div class="noSongList"><p class="noSongListTip">队列中还没有歌曲</p><p class="addSongLink">去<a target="_blank"  href="http://www.kugou.com/" class="gotoIndex">首页</a>添加歌曲</p></div>');
        });
        // 清除广告定时器
        clearInterval(fanxingAdT)
            // 切换歌曲是 暂时隐藏真唱
        $(".fangxinAd").hide();
    },
    updateUI: function(option, callback) {
        var _this = this;
        audioName = $(".audioName"),
            $content = $(".content"),
            $blurBg = $("#blurBg"),
            defaultImg = "http://www.kugou.com/yy/static/images/play/default.jpg";
        $(".btnArea2").show();

        if (typeof option.img == "undefined" || option.img == "" || option.img == null) {
            option.img = defaultImg;
        }
        if(location.href.indexOf("song-36")==-1){
            // 毛玻璃
            if (utility.getBrowser()["type"] == "ie") {
                $content[0].style.cssText = $content[0].style.cssText + "background-image: url('http://www.kugou.com/yy/static/images/iebg.jpg');";
                $blurBg.hide()
                _this.resizeUI();
            } else {
                $blurBg[0].style.cssText = "background-image: url('" + option.img + "');";
            }
        }

        // 专辑
        if (option.have_album) {
            var albumName_a = $('.albumName a');
            var albumImg_a = $('.albumImg a');
            var barAlbumImg_a = $(".bar-albumImg a");
            var albumLink = "http://www.kugou.com/album/" + option.album_id + ".html";
            $(".albumName").show();
            // 专辑link
            if (albumName_a.length > 0) {

                albumName_a.text(option.album_name).attr("title", option.album_name).attr("href", albumLink)
            } else {
                $('.albumName').html('<span class="fl fontColor">专辑：</span><a class="fl" href="' + albumLink + '" title="' + option.album_name + '">' + option.album_name + '</a>')
            }

            // 大专辑更新
            if (albumImg_a.length > 0) {
                albumImg_a.attr("title", option.album_name).attr("href", albumLink)
                albumImg_a.find("img").attr("src", option.img)
            } else {
                $('.albumImg').html('<a class="fl" target="_blank" href="' + albumLink + '"title="' + option.album_name + '"><img onerror="this.onerror=null;this.src=' + option.img + '"  src=' + option.img + '></a>')
            }
            // bar专辑更新
            if (barAlbumImg_a.length > 0) {
                barAlbumImg_a.attr("title", option.album_name).attr("href", albumLink)
                barAlbumImg_a.find("img").attr("src", option.img)
            } else {
                $('.bar-albumImg').html('<a target="_blank" href="' + albumLink + '"title="' + option.album_name + '"><img onerror="this.onerror=null;this.src=' + option.img + '" src=' + option.img + '></a>')
            }

        } else {
            $(".albumName").hide();
            $('.albumImg,.bar-albumImg').html('<img src="' + option.img + '">')
        }
        // mv 按钮
        if (option.have_mv) {
            $('.btnMv').attr("href", "http://www.kugou.com/mvweb/html/mv_" + option.video_id + ".html").show();
        } else {
            $('.btnMv').hide();
        }
        // 歌名这里直接显示 传过来的信息 去播放列表直接获取歌曲名字显示 ，不用接口返回的信息  避免接口获取数据名字不一样的问题 
        option.audio_name = $(".musiclist li.active").find(".musiclist-songname-txt").text();
        if (typeof option.audio_name == "undefined" || option.audio_name == "" || option.audio_name == null) {
            option.audio_name = "酷狗音乐 - 就是歌多";
        }

        $("#songName,.audioName").html(option.audio_name).attr("title", option.audio_name);
        $("#songNameTemp:hidden").html(utility.playEncode(option.audio_name)).attr("title", option.audio_name);;
        // 繁星广告
        clearInterval(fanxingAdT)
        fanxingAdT = setInterval(function() {
            _this.fanxingAjax(option.audio_name)
        }, 20000)
        _this.fanxingAjax(option.audio_name)

        // 歌词歌手
        var $singerName = $(".singerName"),
            singerHtml = "<span class=\"fontColor\">歌手：</span>",
            authors = "",
            authorsTitle = "";

        $(option.authors).each(function(index) {
            if ($(this)[0].is_publish == "1" && $(this)[0].author_id != "0") {
                singerHtml += "<a target=\"_blank\" href=\"http://www.kugou.com/singer/" + $(this)[0].author_id + ".html\" title=\"" + $(this)[0].author_name + "\">" + $(this)[0].author_name + "</a>"
            } else {
                singerHtml += $(this)[0].author_name;
            }
            authors += $(this)[0].author_name + "_";
            authorsTitle += $(this)[0].author_name + "、";
        })
        if (singerHtml == "<span class=\"fontColor\">歌手：</span>") {
            $singerName.hide()
        } else {
            $singerName.show().html(singerHtml).attr("title", authorsTitle);
        }

        // title 滚动
        if (option.audio_name != "" && option.audio_name != null && option.audio_name != "undefined") {
            document.title = option.audio_name + "_" + authors + "_高音质在线试听_" + option.audio_name + "歌词|歌曲下载_酷狗音乐 ";
            clearInterval(_this.globalParam.tilteSCroll);
            _this.globalParam.tilteSCroll = setInterval(function() {
                _this.titlescroll();
            }, 700);
        } else {
            document.title = "酷狗音乐";
            clearInterval(_this.globalParam.tilteSCroll);
        }

        if (option.audio_name) {
            _this.globalParam.songName = utility.htmlEncode2(option.audio_name);
        }
        //如果 歌曲名太长限制长度
        if (audioName.width() > 430) {
            audioName.css({
                width: "430" + "px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                float: "left",
                textOverflow: "ellipsis"
            })
        }

        $(".no_song").remove();
        // 歌
        var word = option["lyrics"].replace(/%/g, "\\"),
            songword = word.replace(/\[(.*)\]/g, '</p><p class="ie8FontColor">').replace(/<\/p>/, "") + "</p>"; //方案二 有滚动条
        _this.globalParam.word = word;
        if ($('.songWordContentM .jspPane').length > 0) {
            $('.songWordContentM .jspPane').html(songword);
        } else {
            $('.songWordContentM').html(songword);
            $('.songWordContent').jScrollPane({
                hijackInternalLinks: true,
                animateScroll: true,
                autoReinitialise: true
            });
        }

        // audio 播放
        if (typeof myAudio == "undefined" && myAudio == null) {
            myAudio = document.getElementById("myAudio");
        }
        if (option.play_url == "") {
            myAudio.src = option.play_url;
            var flag1 = option.hash && option.hash != "" && option.play_url == "";
            var wranText = "这首歌曲无版权暂不支持播放";
            if (option["privilege2"]) {
                var privilege2 = option["privilege2"].split("").pop() == "0";
                if (privilege2) {
                    wranText = "这首歌是付费歌曲请下载客户端播放";
                }
            }
            if (flag1) {
                var wrandialog = dialog({
                    id:"wrandialog",
                    title: '提示',
                    width: 370,
                    height: 133,
                    content: [
                        '<div class="dialogContent clearfix" id="forbidPlay">',
                        '<div class="contetText">' + wranText + '</div>',
                        '<div class="dialogFooter clearfix">',
                        '<a class="btnDl" id="iKown">我知道了</a>',
                        '</div>',
                        '</div>',
                    ].join(""),
                    onshow: function() {
                        $(".btnDl").off("click").on("click", function(e) {
                            e.preventDefault();
                            $(".ui-dialog-close").trigger("click");
                            _this.playSong(_this.globalParam.songIndex += 1)
                        });
                    },
                    onclose:function(){
                        
                        _this.playSong(_this.globalParam.songIndex += 1)
                    }
                }).show();
                // $("#next").trigger("click");
            }


        } else {
            myAudio.src = option.play_url;
            myAudio.load();
        }

        callback && callback();
    },
    titlescroll: function() {
        var _this = this;
        var dir = "left";
        var title = document.title;
        if (dir == "left" && title != "酷狗音乐") {
            var firstch = title.charAt(0);
            var leftstr = title.substring(1, title.length);
            document.title = leftstr + firstch;
        } else {
            clearInterval(_this.globalParam.tilteSCroll);
        }
    },
    fanxingAjax: function(songName) {
        var _this = this;
        if (songName != "" && songName != "undefined" && songName != null) {
            $.ajax({
                type: "GET",
                url: "http://ad.fanxing.kugou.com/part/pclrc?jsonCallBack&songName=" + encodeURIComponent(songName.toString().split("-").pop().trim()),
                dataType: "jsonp",
                success: function(res) {
                    if (res["roomUrl"] != "") {
                        var Str =  utility.QueryString(decodeURIComponent(res.roomUrl), "url");
                        var roomid = Str.replace(/[^\d]/g,'');
                        $(".fangxinAd").show();
                        $(".fangxinAd .singerImg").attr("src", res.imagePath);
                        $(".fangxinAd .singerName").html("【" + res.nickName + "】正在直播");
                        $(".fangxinAd .singingName").html(songName);
                        if(/ipad/gi.test(navigator.userAgent.toLowerCase())){
                            $(".fangxinAd .goto a").attr("href", "http://mfanxing.kugou.com/staticPub/mobile/sharePage/normalRoom/views/index.html?roomId="+roomid);
                        }else{
                            $(".fangxinAd .goto a").attr("href", res.roomUrl);
                        }
                        $(".fangxinAd .goto a").off("click").on("click", function(e) { e.preventDefault(); })
                        $(".fangxinAd").off("click").on("click", function(e) {
                            try {
                                (new Image()).src = "http://channel.fanxing.kugou.com/room/newkugouweb?room=" + roomid + "&t=" + Math.random();
                            } catch (ex) {}
                            var clickObj = _this.commonConfig();
                                clickObj["action"] = "click";
                                clickObj["b"] = "点击歌词直播浮层";
                                clickObj["a"] = 210;
                                var Clickdata = [30032, clickObj, null, 0];
                                apmCollectData.push(Clickdata);
                            try {
                                newLogCount();
                            } catch (ex) {}
                            window.open($(this).find("a").attr("href"));
                        })

                    var fanxinObj = _this.commonConfig();
                        fanxinObj["action"] = "other";
                        fanxinObj["b"] = "歌词页直播浮层出现";
                        fanxinObj["a"] = 209;
                        var fanxindata = [30032, fanxinObj, null, 0];
                            apmCollectData.push(fanxindata);
                        try {
                            newLogCount();
                        } catch (ex) {}
                    } else {
                        $(".fangxinAd").hide();
                    }

                },
                error: function(res) {
                    clearInterval(fanxingAdT)
                    $(".fangxinAd").hide();
                }
            })
        } else {
            clearInterval(fanxingAdT)
        }
    },
    //通知播放(此前处于暂停状态)
    playSong: function(P_index) {
        var _this = this;
        if (_this.globalParam.songLength == 0) {
            return
        }
        var play_index = (typeof P_index != "undefined") ? P_index : _this.globalParam.songIndex += 1,
            PlayList = _this.getPlayList();
            Hash = (typeof PlayList[play_index] != "undefined" && typeof PlayList[play_index]["Hash"] != "undefined" && PlayList[play_index]["Hash"] != null && PlayList[play_index]["Hash"] != "") ? PlayList[play_index]["Hash"] : "",
            album_id = (typeof PlayList[play_index] != "undefined" && typeof PlayList[play_index]["album_id"] != "undefined" && PlayList[play_index]["album_id"] != null && PlayList[play_index]["album_id"].toString() != "") ? PlayList[play_index]["album_id"] : "",
            playfrom = (typeof PlayList[play_index] != "undefined" && typeof PlayList[play_index]["from"] != "undefined" && PlayList[play_index]["from"] != null && PlayList[play_index]["from"].toString() != "") ? PlayList[play_index]["from"] : "",
            audio_name = (typeof PlayList[play_index] != "undefined" && typeof PlayList[play_index]["audio_name"] != "undefined" && PlayList[play_index]["audio_name"] != null && PlayList[play_index]["audio_name"].toString() != "") ? PlayList[play_index]["audio_name"] : "",
            bi_fo = "";
        if (playfrom == "精选歌单") {
            bi_fo = "首页/精选歌单";
        } else if (playfrom.indexOf("热门榜单") != -1) {
            bi_fo = "首页/"+playfrom;
        }else if (playfrom == "新歌首发") {
            bi_fo = "首页/新歌首发";
        }  else if (playfrom == "search") {
            bi_fo = "搜索页";
        } else if (playfrom != "") {
            bi_fo = "榜单页/" + playfrom;
        } else {
            bi_fo = "其他";
        }
      
        $.jStorage.set('playdata', true);
        _this.playListApi.scrollToY(play_index * 40);
        $("#musicbox li").eq(play_index).addClass("active").siblings("li").removeClass("active");

        if (Hash != "" && album_id.toString() != "") {
            location.hash = "hash=" + Hash + "&album_id=" + album_id;
        } else if (Hash != "") {
            location.hash = "hash=" + Hash;
        } else if (Hash == "") {
            return
        }
          // 播放时延迟统计
          var interfaceBI={};
          try{
              interfaceBI["ua"]= JSON.stringify(utility.getBrowser())||"低版本浏览器";
              interfaceBI["typeid"]= 10005;
              interfaceBI["Hash"]= Hash;
          }catch(ex){}
        // 切换歌曲是 暂时隐藏真唱
        $(".fangxinAd").hide();
        var interfaceT1 = new Date();
        _this.getdatabyhash({
            Hash: Hash,
            album_id: album_id,
            callback: function(res) {
                var interfaceT2 = new Date();
                if (res["status"] != 0 && res["data"] != 0) {
					interfaceBI["state"]= 1;
					interfaceBI["timelength"]= interfaceT2 - interfaceT1;
                    interfaceBI["transaction"]= {songname:res["data"]["audio_name"],playsource:res["data"]["album_name"]||""};
                    _this.updateUI(res["data"]);
                    _this.globalParam.lyricsheight = $(".jspPane").height();
                    _this.globalParam.lyricsOverflowheight = $(".songWordContent").height();
                    $.ajax({
                        type: 'GET',
                        url: 'http://ip.kugou.com/check/iscn?&format=jsonp',
                        dataType: "jsonp",
                        timeout: 3000,
                        success: function(res) {
                            if (res["status"]) {
                                if (res["flag"] == 0) {
                                    var servicefail = dialog({
                                        id:"servicefail",
                                        width: 310,
                                        height: 50,
                                        title: '提示',
                                        skin: 'unshare',
                                        cancel: false,
                                        content: "抱歉，您所在的国家或地区暂无法提供此歌曲服务"
                                    }).showModal();
                                    setTimeout(function() {
                                        _this.globalParam.myAudio.pause();
                                        //通知播放(此前处于暂停状态)
                                        $("#myAudio").remove();
                                        _this.audioStop();
                                    }, 1000)
                                    return;
                                }
                            }
                        },
                        error: function(xhr, type) {}
                    });

                    if (_this.globalParam.fristFlag) {
                        
                        _this.callExe({
                            "song_info": res["data"],
                            "link": location.href,
                            "type": "play"
                        })
                        _this.globalParam.fristFlag = false;
                    }
                    if (res["data"].play_url != ""){
                        playOpen();
                        _this.audioStart();
                        _this.playOnStart();
                        // 播放量统计
                        var playbiObj = _this.commonConfig();
                        playbiObj["action"] = "index";
                        playbiObj["a"] = 6;
                        playbiObj["b"] = "播放";
                        playbiObj["fo"] = bi_fo;
                        playbiObj["ivar1"] = "音频";
                        playbiObj["ivar2"] = Hash;
                        playbiObj["ivar3"] = audio_name;
                        var bidata = [30032, playbiObj, null, 0];
                        apmCollectData.push(bidata);
                        var interfacedata = [12, interfaceBI, null, 1];
                        apmCollectData.push(interfacedata);
                        try {
                            newLogCount();
                        } catch (ex) {}


                    } else {
                       
                        interfaceBI["state"]= 0;
                        interfaceBI["te"]= "E5";
                        interfaceBI["position"]= 01;
                        interfaceBI["fs"]=  "1";
                        var interfacedata = [12, interfaceBI, null, 1];
                        apmCollectData.push(interfacedata);
                        try {
                            newLogCount();
                        } catch (ex) {}
                        _this.audioStop();
                        _this.setStatus()
                    }

                }else {
					interfaceBI["timelength"]= interfaceT2 - interfaceT1;
                    interfaceBI["state"]= 0;
                    interfaceBI["te"]= "E3";
                    interfaceBI["position"]= 01;
                    interfaceBI["fs"]=  res.info.status;
                    var interfacedata = [12, interfaceBI, null, 1];
                    apmCollectData.push(interfacedata);
                    try {
                        newLogCount();
                    } catch (ex) {}

                    clearInterval(fanxingAdT);
                    $(".fangxinAd").hide();
                    _this.audioStop();
                    
                    var datafail = dialog({
                        id:"datafail",
                        width: 300,
                        height: 100,
                        title: '获取数据失败',
                        skin: 'getdatafail',
                        content: "获取数据失败"
                    }).show();

                }
            }
        });

    },
    playListbindUI: function() {
        var _this = this;

        // 下收藏按钮事件绑定
        $(".btnDownloadClient").off("click").on("click", function(e) {
            e.preventDefault();
            _this.downloadError({ type: "current" });
            var data = _this.commonConfig();
                data["action"] = "click";
                data["b"] = "下载btn";
                data["a"] = 200;
                data["ivar4"] = "歌词";
            var Loaded = [30032, data];
            apmCollectData.push(Loaded);
            try {
                newLogCount();
            } catch (ex) {}
        });
        // 清空列表 本地缓存
        $(".clear").off("click").on("click", function() {
                _this.audioStop();
                $(".musiclist").remove();
                $.jStorage.set("k_play_list", null);
            })
            // 关闭播放列表
        $(".closePlayList").off("click").on("click", function() {

            $("#list").trigger("click");
        });

        $(document).on("mousedown", function() {
                var $mode_panel = $("#mode_panel");
                if (_this.globalParam.showPlayFlag) {
                    _this.showPlaylist(false)
                }
                if ($mode_panel.css("display") == "block") {
                    $mode_panel.hide();
                }
            })
            // 列表下载歌曲
        $("#musicbox .list-action-down").off("click").on("click", function(e) {
                e.stopPropagation()
                var clickIndex = $(this).closest("li").index(),
                    clickdata = _this.getPlayList()[clickIndex],
                    Hash = clickdata["Hash"],
                    albumId = clickdata["album_id"];

                _this.downloadError({ type: "list", Hash: Hash, albumId: albumId, clickIndex: clickIndex });

                var data = _this.commonConfig();
                    data["action"] = "click";
                    data["a"] = 200;
                    data["b"] = "下载btn";
                    data["ivar4"] = "播放队列";
 
                var Loaded = [30032, data];
                apmCollectData.push(Loaded);
                try {
                    newLogCount();
                } catch (ex) {}
            })
            // 列表分享歌曲
        $("#musicbox .list-action-share").off("click").on("click", function(e) {
                e.stopPropagation()
                var data = _this.getPlayList()[$(this).closest("li").index()],
                    Hash = data["Hash"],
                    albumId = data["album_id"];
                //解决 单独拿歌曲信息 跟 歌单名字不一样的问题 以播放列表为准
                var listSongName = $(this).closest("li").find(".musiclist-songname-txt").text().trim(),
                    listSingerName = $(this).closest("li").find(".musiclist-artist").text().trim();
                _this.getdatabyhash({
                    Hash: Hash,
                    album_id: albumId,
                    callback: function(res) {

                        if (res["status"] != 0 && res["data"].length != 0) {
                            //解决 单独拿歌曲信息 跟 歌单名字不一样的问题 以播放列表为准
                            var shareData = $.extend(res["data"], { "audio_name": listSingerName + "-" + listSongName })
                            _this.share(shareData);

                        } else {
                            var sharefail = dialog({
                                id:"sharefail",
                                width: 200,
                                height: 50,
                                title: '分享失败',
                                skin: 'unshare',
                                content: "分享失败，稍后重试"
                            }).show();
                            setTimeout(function() {
                                sharefail.close().remove();
                            }, 3000);
                        }
                    }
                })
                var data = _this.commonConfig();
                    data["action"] = "click";
                    data["b"] = "分享btn";
                    data["ivar4"] = "ivar4";
                    data["a"] = 203;

                var Loaded = [30032, data];
                apmCollectData.push(Loaded);
                try {
                    newLogCount();
                } catch (ex) {}
            })
            // 列表删除歌曲
        $("#musicbox .list-action-del").off("click").on("click", function(e) {
            e.stopPropagation()
            var index = $(this).closest("li").index();
            var k_play_list = _this.getPlayList();
            k_play_list.splice(index, 1)
                // 更新本地缓存
            $.jStorage.set("k_play_list", JSON.stringify(k_play_list));
            _this.playListApi.scrollToY(_this.globalParam.songIndex * 40);
            if (index < _this.globalParam.songIndex) {
                _this.globalParam.songIndex--;
                _this.setActive(_this.globalParam.songIndex);
            } else if (index == _this.globalParam.songIndex) {
                if (_this.globalParam.songIndex >= _this.globalParam.songLength - 1) {
                    _this.globalParam.songIndex = 0;
                }
                _this.playSong(_this.globalParam.songIndex)

            } else {
                _this.setActive(_this.globalParam.songIndex)
            }

        })

        // 列表播放
        $("#musicbox .musiclist-item").off("click").on("click", function() {
            var Hash = $(this).attr("data-h");
            var index = $(this).parent().index();
            $(this).parent().addClass("active")
            $(this).parent().siblings("li").removeClass("active");
            _this.globalParam.songIndex = index;
            _this.playSong(index)
        })


    },
    showPlaylist: function(type) {
        var _this = this;
        var $playlist = $("#mod-playlist");
        if (type == true) {
            $playlist.css({
                bottom: "80px"
            });
            _this.globalParam.showPlayFlag = true;
        } else {
            $playlist.css({
                bottom: (0 - $playlist.height()) + "px"
            });
            _this.globalParam.showPlayFlag = false;
        }
    },
    setActive: function(index) {
        $("#musicbox li").eq(index).addClass("active");
    },
    getdatabyhash: function(option) {
        var _this = this;
        var callbackF = 0;
        var retry = null;
        $.ajax({
            type: "GET",
            url: "http://www.kugou.com/yy/index.php?r=play/getdata",
            cache: false,
            timeout: 5000,
            data: {
                "hash": option.Hash,
                "album_id": option.album_id
            },
            "dataType": "json",
            "success": function(res) {
                $.jStorage.set("playdata", "true");
                clearTimeout(_this.retry);
                if(!callbackF){
                    option.callback&&option.callback(res)
                }
                callbackF = 1;
            }
           
        })
        retry =  setTimeout(function(){
            $.ajax({
                type: "GET",
                url: "http://wwwretry.kugou.com/yy/index.php?r=play/getdata",
                cache: false,
                timeout: 10000,
                data: {
                    "hash": option.Hash,
                    "album_id": option.album_id
                },
                "dataType": "jsonp",
                "success": function(res) {
                    // console.log("retry")
                    $.jStorage.set("playdata", "true");
                    if(!callbackF){
                        option.callback&&option.callback(res)
                        callbackF = 1;
                    }
                },
                "error": function(XMLHttpRequest, textStatus, errorThrown) {
                    $.jStorage.set("playdata", "true");
                    option.callback({ status: 0,info:XMLHttpRequest})
                    _this.globalParam.isAudioStop = true;
                }
            })
        },3000)
    },
    playList: function() {
        var _this = this;
        var k_play_list = [];
        var playExist = new Date().getTime();
        $.jStorage.set("playExist", playExist);
        $.jStorage.set("playFlag", "true");
        // 监听有没有新的页面打开
        $.jStorage.listenKeyChange("playExist", function(key, action) {
            if ($.jStorage.get("playExist") > playExist) {
                playExist = $.jStorage.get("playExist");
                _this.audioStop()
            }

        });
        // 读取storage里的添加到最后
        if ($.jStorage.get("k_play_list")) {
            k_play_list = JSON.parse($.jStorage.get("k_play_list")) || [];
        } else {
            k_play_list = [];
        }
        
        if (dataFromSmarty != null && typeof dataFromSmarty != "undefined" && dataFromSmarty.length != 0 && dataFromSmarty.length != "") {
            // 如果新打开的歌曲 在老缓存存在把他提到最前
            var reverseData = dataFromSmarty.reverse();
            // dataFromSmarty
            for (var i = 0, len = reverseData.length; i < len; i++) {
                reverseData[i]["Hash"] = reverseData[i]["hash"];
                reverseData[i]["audio_name"] = reverseData[i]["song_name"];
                if (reverseData[i]["Hash"] != null && reverseData[i]["Hash"] != "" && typeof reverseData[i]["Hash"] != "undefined") {
                    k_play_list.unshift(reverseData[i]);
                }
            }
        }
        // 去重
        k_play_list = _.uniq(k_play_list, 'Hash');

        // 总数
        _this.globalParam.songLength = k_play_list.length;
        // 更新数量
        $("#list_count").html(k_play_list.length);

        $(".box-header span").eq(0).html(k_play_list.length);

        _this.renderPlayList(k_play_list);

        if (k_play_list.length != 0) {

            _this.showTip()
        }

        // 更新本地缓存
        $.jStorage.set("k_play_list", JSON.stringify(k_play_list));
        //  监听有没有新的歌曲添加进来
        $.jStorage.listenKeyChange("newsong", function(key, action) {
            $.jStorage.set('playdata', true);
            //新增进来的歌曲
            var newSong = JSON.parse($.jStorage.get("newsong"));
            if (_.isArray(newSong)) {
                //把新歌添加到最前面   
                k_play_list = JSON.parse($.jStorage.get("k_play_list")) || [];
                k_play_list = utility.insertArrayAt(k_play_list, 0, newSong);
                // 去重
                k_play_list = _.uniq(k_play_list, 'Hash');
                // 更新本地缓存
                $.jStorage.set("k_play_list", JSON.stringify(k_play_list));

                _this.globalParam.songIndex = 0;
                // 插播 从第一首歌曲
                _this.playSong(_this.globalParam.songIndex)

                _this.showTip()
                $("#musicbox li").eq(_this.globalParam.songIndex).addClass("active");
            }

        });
        //  监听播放列表
        $.jStorage.listenKeyChange("k_play_list", function(key, action) {
            //播放列表变化重新渲染播放列表
            var newPlaySong = JSON.parse($.jStorage.get("k_play_list")) || [];
            // 更新数量
            if (_.isArray(newPlaySong)) {
                k_play_list = newPlaySong;
                $("#list_count").text(newPlaySong.length);
                $(".box-header span").eq(0).html(newPlaySong.length);
                _this.globalParam.songLength = newPlaySong.length;
                _this.renderPlayList(newPlaySong);
                _this.playListbindUI();
            }
            if (newPlaySong.length == 0) {
                _this.warnAddSong()
            }
        });
    },
    showTip: function() {
        $(".play_tips:hidden").show().animate({
            "opacity": 1
        });
        var play_tipsT = setTimeout(function() {
            $(".play_tips").animate({
                "opacity": 0
            });
        }, 1000)
    },
    getPlayList: function() {
        var PlayList = JSON.parse($.jStorage.get("k_play_list")) || [];
        if (_.isArray(PlayList)) {
            return PlayList;
        }
    },
    renderPlayList: function(data) {
        var _this = this,
            PlayListStr = '<div class="musiclist">',
            actionDom = $("#musicbox .jspPane"),
            tempString = "345"; // 分鐘長度 三
        if (data.length != 0) {
            $(".noSongList").remove();
            for (var i = 0, len = data.length; i < len; i++) {
                if (typeof data[i]["Hash"] == "undefined" && data[i]["Hash"] == null && data[i]["Hash"] == "") {
                    continue
                }
                var tempLen = data[i]["timelength"].toString().length,
                    restime = tempLen == tempString.length ? data[i]["timelength"] * 1000 : data[i]["timelength"],
                    time = utility.getMS(restime),
                    hash = data[i]["Hash"],
                    album_id = data[i]["album_id"],
                    authorNames,
                    songname;

                if(data[i]["author_name"] != ""){
                    songname = data[i]["audio_name"];
                    authorNames = data[i]["author_name"];
                }else{
                    var splitIndex = data[i]["audio_name"].indexOf("-");
                        songname = data[i]["audio_name"].substring(splitIndex + 1);
                        authorNames = data[i]["audio_name"].substring(0, splitIndex);
                }

                PlayListStr += '<li><div class="musiclist-item clearfix">' +
                    '<span class="musiclist-number">' + (i + 1) + '</span>' +
                    '<div class="musiclist-name">' +
                    '<span class="musiclist-songname-txt" title="' + songname + '">' + songname + '</span>' +
                    '<div class="mod-list-menu">' +
                    '<a href="javascript:;" class="icon list-menu-item icon-playbar-download list-action-down" title="下载">' +
                    '<i class="icon list-menu-icon-down"></i>' +
                    '<span class="icon_txt">下载</span>' +
                    '</a>' +
                    '<a href="javascript:;" class="icon list-menu-item icon-playbar-share list-action-share" title="分享">' +
                    '<i class="icon list-menn-icon-share"></i>' +
                    '<span class="icon_txt">分享</span>' +
                    '</a>' +
                    '<a href="javascript:;" class="icon list-menu-item list-menu-icon-del list-action-del" title="删除歌曲">' +
                    '<i class="icon list-menu-icon-add"></i>' +
                    '<span class="icon_txt">删除</span>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="musiclist-artist" title="' + authorNames + '">' + authorNames + '</div>' +
                    '<div class="musiclist-time">' + time + '</div>' +
                    '</div></li>';
            }
            PlayListStr += "</div>";
            _this.height = actionDom.height();
            actionDom.height(_this.height);
            actionDom.empty().append(PlayListStr).attr("style", "");
        } else {
            $(".musiclist").remove();
            _this.setStatus();
        }
    },
    callExe: function(option) {
        var _this = this,
            type = option.type,
            comeFrom = option.link
            controlData="";
            if(!$.isEmptyObject(option.song_info)){
                songData = option.song_info,
                privilege2 = songData["privilege2"] ? songData["privilege2"].split("").pop() == "0" : "1",
                songWord = songData["audio_name"].length > 58 ? songData["audio_name"].substring(0, 58) + "..." : songData["audio_name"],
                controlData = '{"Files":[{"filename":"' + songWord + '.mp3","hash":"' + songData["hash"] + '","size":"' + songData["filesize"] + '","duration":"' + songData["timelength"] + '","bitrate":"128","isfilehead":"100","privilege":"' + songData["privilege"] + '","album_id":"' + songData["album_id"] + '"}]}';
            }

        var callT = setTimeout(function() {
                $.ajax({
                    url: "http://www.kugou.com/yy/static/js/jslib/base.js?" + Math.round(new Date().getTime() / 1000),
                    dataType: "script",
                    success: function(){
                        if(type == "download"){
                            var url = 'kugou://'+type+'?p=' + Base64.encode(controlData);
                            if(utility.detectOS()=="Mac"){
                                url = 'mackugou://'+type+'?p=' + Base64.encode(controlData);
                            }
                            if (utility.getBrowser()["v"]== 6 || utility.getBrowser()["v"]== 7 || utility.getBrowser()["v"]== 8) {
                                window.open(url)
                            } else {
                                $("#apply:hidden").attr("src", url);
                            }
                        }else if(type == "play"){
                            if (comeFrom.indexOf("frombaidu") != -1 || comeFrom.indexOf("from_360") != -1 || comeFrom.indexOf("from_sogou") != -1) {
                                var url = 'kugou://'+type+'?p=' + Base64.encode(controlData);
                                if (utility.getBrowser()["v"]== 6 || utility.getBrowser()["v"]== 7 || utility.getBrowser()["v"]== 8) {
                                    window.open(url)
                                } else {
                                    $("#apply:hidden").attr("src", url);
                                }
                              }
                        }
                        clearTimeout(callT);
                    },
                    error:function(){
                        clearTimeout(callT);
                    }
                });
            }, 1000)

    },
    resizeUI: function() {
        if(location.href.indexOf("song-36")!=-1){
            return;
        }
        var _this = this,
            winWidth = $(window).width(),
            winHeight = $(window).height(),
            headerH = $(".header").height(),
            navWrapH = $(".navWrap").height(),
            contentHeight = winHeight - headerH - navWrapH,
            bgBlur = $(".bg-blur"),
            singerContent = $(".singerContent"),
            songWordContent = $(".songWordContent");
        $("#blurBg").height(contentHeight);
        $(".content").height(contentHeight);
        $(".mainPage").height(winHeight);
        if (winHeight <= 895) {
            singerContent.css({
                marginTop: (100 - (895 - winHeight) / 2 <= 10) ? 10 : 100 - (895 - winHeight) / 2
            });
        } else {
            singerContent.css({
                marginTop: 100
            });
        }
        if (winHeight <= 780) {
            songWordContent.css({
                height: (410 - (780 - winHeight) <= 235) ? 235 : 410 - (780 - winHeight)
            });
        } else {
            songWordContent.css({
                height: 410
            });
        }
    },
    /**
     * 错误弹窗
     */
    downloadError: function(option) {
        var _this = this;
        var option = option;
        if (_this.downloadd) {
            return
        }
        _this.downloadd = dialog({
            id:"downloadd",
            title: '提示',
            width: 380,
            height: 170,
            skin: "playsong",
            fixed:true,
            content: [
                ' <div class="dialogContent clearfix" id="download">',
                '<div class="contetText">',
                '<p><span class="warn_icon"><img src="http://www.kugou.com/yy/static/images/play/warn.png"></span>下载歌曲需要在酷狗音乐客户端操作</p></div>',
                '<div class="dialogFooter clearfix">',
                '<a href="#" class="callClient">打开客户端</a>',
                '<a href="#" class="btnDl" onclick="_hmt.push([\'_trackEvent\', \'song3software\', \'song3download\', \'song3kugou\']);" >下载新版客户端</a>',
                '</div>',
                ' </div>',
            ].join(""),
            onshow: function() {
                $(".ui-dialog").mousedown(function() {
                    if ($("#mod-playlist").css("bottom") == "80px") {
                        _this.showPlaylist(true)
                    }
                })
                $(".btnDl").off("click").on("click", function(e) {
                    e.preventDefault();
                    if(/ipad/i.test(navigator.userAgent)){
                          _this.ipadJumpLink();
                    }else{
                        var win = window.open(window.downloadUrl);
                        var data = _this.commonConfig();
                            data["action"] = "click";
                            data["b"] = "歌曲下载弹窗-下载新版客户端btn";
                            data["a"] = 202;

                        var Loaded = [30032, data];
                        apmCollectData.push(Loaded);
                        try {
                            newLogCount();
                        } catch (ex) {}
                        _this.downloadd.close().remove();
                    }
                })

                $(".callClient").off("click").on("click", function(e) {
                    e.preventDefault();
                    if(/ipad/i.test(navigator.userAgent)){
                          _this.ipadJumpLink();
                    }else{
                        var currentHash = null;
                        if (option.type == "current") {
                            var currentHash = "",
                                currentAlbumId="",
                                currentIndex = $(".musiclist .active").index();
                                listSongName = $(".musiclist li.active").find(".musiclist-songname-txt").text().trim(),
                                listSingerName = $(".musiclist li.active").find(".musiclist-artist").text().trim();

                            if(_this.getPlayList().length){
                                currentHash = _this.getPlayList()[currentIndex]["Hash"],
                                currentAlbumId = _this.getPlayList()[currentIndex]["album_id"];
                            }
                            
                        } else if (option.type = "list") {
                            var currentHash = option.Hash;
                            currentAlbumId = option.album_id;
                            listSongName = $(".musiclist li").eq(option.clickIndex).find(".musiclist-songname-txt").text().trim(),
                                listSingerName = $(".musiclist li").eq(option.clickIndex).find(".musiclist-artist").text().trim();
                        }
                        if(currentHash == ""){
                            _this.callExe({
                                type: "download",
                                song_info: {},
                                link: location.href,
                            })
                        }else{
                            _this.getdatabyhash({
                                Hash: currentHash,
                                album_id: currentAlbumId||0,
                                callback: function(res) {
                                    if (res["status"] != 0 && res["data"].length != 0) {
                                        var downloadData = $.extend(res["data"], { "audio_name": listSingerName + "-" + listSongName })
                                        _this.callExe({
                                            type: "download",
                                            song_info: downloadData,
                                            link: location.href,
                                        })
                                    }
                                }
                            })
                        }
                        var data =  _this.commonConfig();
                            data["action"] = "click";
                            data["b"] = "歌曲下载弹窗-打开客户端btn";
                            data["a"] = 201;
                        var Loaded = [30032, data];
                        apmCollectData.push(Loaded);
                        try {
                            newLogCount();
                        } catch (ex) {}
                        _this.downloadd.close().remove();
                    }
                })
            },
            onclose: function() {
                _this.downloadd = null;

            }
        });
        _this.downloadd.show();
    },
    downLoad: function(a, b, callback) {
        var _this = this;
        var c, d, e, f,
            downloadUrl = window.downloadUrl || " http://xiazai.kugou.com/Corp/kugou7_3762.exe";
        a = unescape(a);
        if (0 == b) return alert("请先选择歌曲！"), !1;
        try {
            if (c = null, c = window.kugouAX ? window.kugouAX : new ActiveXObject("KuGoo3DownXControl.KuGoo3Down"), a = JSON.parse(a), d = "", b > 1)
                for (e = 0; e < a.length; e++) d += a[e].FileName + "|" + a[e].FileSize + "|" + a[e].Hash + "\\\\";
            else d = a[0].FileName + "|" + a[0].FileSize + "|" + a[0].Hash + "\\\\";
            f = d,
                c.SendString(12, b, f);
        } catch (g) {
            callback && callback();
        }
    },

    /*播放模块 初始化*/
    playInit: function() {
        var _this = this;
        _this.globalParam.$playhead = $("#playhead");
        _this.globalParam.$progress = $("#progress");
        //初始化requestAnimationFrame API
        try {
            var lastTime = 0;
            var vendors = ['webkit', 'moz', 'ms', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)

                window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };

        } catch (ex) {

        }
        //执行播放进度条，时间变化
        window.audioPlayerAnimloop = function() {
            if (!_this.globalParam.isAudioStop) {
                _this.audioRender();
                if (_this.globalParam.songW > 290) {
                    _this.render();
                }
                _this.globalParam.globalID = requestAnimationFrame(audioPlayerAnimloop);
            }
        };

        _this.bindUI();
    },
    /*初始化 自适应UI界面*/
    bindUI: function() {
        var _this = this;
        if (typeof myAudio == "undefined" && myAudio == null) {
            myAudio = document.getElementById("myAudio");
        }
        _this.globalParam.myAudio = myAudio;
        myAudio.controls = false; //不显示默认的控件
        myAudio.autobuffer = true; //自动缓冲 若使用了autoplay，此属性便忽略
        myAudio.preload = "auto"; //指示一旦页面加载，则开始加载音频
        /*0 = NETWORK_EMPTY - 音频/视频尚未初始化
        1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
        2 = NETWORK_LOADING - 浏览器正在下载数据
        3 = NETWORK_NO_SOURCE - 未找到音频/视频来源*/
        /*开始加载音频*/
        myAudio.addEventListener("loadstart", function(e) {
            // console.log(e);
        });
        /*音频和视频的duration属性（时长）发生变化时触发，即已经知道媒体文件的长度。如果没有指定音频和视频文件，duration属性等于NaN。如果播放流媒体文件，没有明确的结束时间，duration属性等于Inf（Infinity）。*/
        myAudio.addEventListener("durationchange", function(e) {
            var t = Math.floor(myAudio.duration);
            _this.getDuration(t);
        });
        myAudio.addEventListener("loadedmetadata", function(e) {
            if (myAudio.duration) {
                var t = Math.floor(myAudio.duration);
                _this.getDuration(t);
            }
        });
        /*媒体文件的第一帧加载完毕时触发，此时整个文件还没有加载完*/
        myAudio.addEventListener("loadeddata", function(e) {});
        /*浏览器正在下载媒体文件，周期性触发。下载信息保存在元素的buffered属性中*/
        myAudio.addEventListener("progress", function(e) {});
        /*浏览器准备好播放，即使只有几帧，readyState属性变为CAN_PLAY
        console.log(myAudio.readyState); //返回音频的当前就绪状态
        0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息
        1 = HAVE_METADATA - 关于音频/视频就绪的元数据
        2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
        3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
        4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
        */
        myAudio.addEventListener("canplay", function(e) {
            if (!_this.globalParam.isFirstPlay) {
                if (myAudio.paused) {
                    _this.toggleSound();
                }
            }
        });
        /*浏览器认为可以不缓冲（buffering）播放时触发，即当前下载速度保持不低于播放速度，readyState属性变为CAN_PLAY_THROUGH。*/
        myAudio.addEventListener("canplaythrough", function(e) {});
        /*播放中断*/
        myAudio.addEventListener("abort", function(e) {});
        /*媒体文件加载后又被清空，比如加载后又调用load方法重新加载*/
        myAudio.addEventListener("emptied", function(e) {});
        /*播放结束*/

        myAudio.addEventListener("ended", function(e) {

            if (_this.globalParam.wordArrHTML) {
                _this.globalParam.ind = -2;
                _this.globalParam.wordArrHTML.removeClass("playOver");
                _this.globalParam.wordArrHTML = null;
            }
            var toggle = $("#toggle");
            toggle.addClass("icon icon-playbar-play");

            _this.globalParam.isAudioStop = true;
            // 关闭音频
            _this.audioStop();
            if ($("#mode").hasClass("icon-playbar-cycle")) {
                //循环播放
                if (_this.globalParam.songIndex == _this.globalParam.songLength - 1) {
                    _this.globalParam.songIndex = 0;
                } else {
                    _this.globalParam.songIndex++;
                }
            } else if ($("#mode").hasClass("icon-playbar-singlecycle")) {
                // 单曲
                playOver();
                playOpen();
                
            } else if ($("#mode").hasClass("icon-playbar-randomcycle")) {
                //随机
                _this.globalParam.songIndex = Math.floor(_this.globalParam.songLength * Math.random());
            };
            _this.playSong(_this.globalParam.songIndex);
        });

        /*发生错误。该元素的error属性包含更多信息。
        console.log(myAudio.error.code); //MediaError 对象的 code 属性包含了音频的错误状态
        1 = MEDIA_ERR_ABORTED - 取回过程被用户中止
        2 = MEDIA_ERR_NETWORK - 当下载时发生错误
        3 = MEDIA_ERR_DECODE - 当解码时发生错误
        4 = MEDIA_ERR_SRC_NOT_SUPPORTED - 不支持音频/视频
        */
        myAudio.addEventListener("error", function(e, f) {

            var errorCode = myAudio.error.code;
            if (errorCode == 2 || errorCode == 3|| errorCode == 4) {
                var playError = dialog({
                    id:"unsupportshare",
                    width: 300,
                    height: 180,
                    title: "提示",
                    skin: 'playsong',
                    content: [
                        '<div class="addsong clearfix" id="addsong">',
                        '<div class="contetText">该音频不支持网页播放请下载客户端播放</div>',
                        '</div>'
                    ].join(""),
                }).show();
                setTimeout(function() {
                    playError.close().remove();
                }, 3000);
                
            }
        });
        /*播放暂停*/
        myAudio.addEventListener("pause", function() {
            if ($("#toggle").hasClass("icon-playbar-pause")) {
                var toggle = document.getElementById("toggle");
                toggle.className = "icon icon-playbar-play";
            }
            if (!_this.globalParam.isAudioStop) {
                _this.audioStop();
            }
        });
        /*暂停后重新开始播放*/
        myAudio.addEventListener("play", function() {
            if ($("#toggle").hasClass("icon-playbar-play")) {
                var toggle = document.getElementById("toggle");
                toggle.className = "icon icon-playbar-pause";
            }
            if (_this.globalParam.isAudioStop) {
                _this.audioStart();
            }
        });
        /*开始播放，包括第一次播放、暂停后播放、结束后重新播放。*/
        myAudio.addEventListener("playing", function(e) { /* console.log("playing")*/ });
        /*播放速率改变*/
        myAudio.addEventListener("ratechange", function() { /* console.log("ratechange")*/ });
        /*搜索操作结束 当用户已移动/跳跃到音频/视频中的新位置时*/
        myAudio.addEventListener("seeked", function() { /* console.log("seeked")*/ });
        /*搜索操作开始 当用户开始移动/跳跃到音频/视频中的新位置时*/
        myAudio.addEventListener("seeking", function() { /* console.log("seeking")*/ });
        /*浏览器开始尝试读取媒体文件，但是没有如预期那样获取数据*/
        myAudio.addEventListener("stalled", function() { /* console.log("stalled")*/ });
        /*加载文件停止，有可能是播放结束，也有可能是其他原因的暂停*/
        myAudio.addEventListener("suspend", function() { /* console.log("suspend")*/ });
        /*网页元素的currentTime属性改变时触发。*/
        myAudio.addEventListener("timeupdate", function() { /* console.log("timeupdate")*/ });
        /*音量改变时触发（包括静音）*/
        myAudio.addEventListener("volumechange", function() { /* console.log("volumechange")*/ });
        /*由于另一个操作（比如搜索）还没有结束，导致当前操作（比如播放）不得不等待*/
        myAudio.addEventListener("waiting", function() { /* console.log("waiting")*/ });

        /*播放或暂停 控制*/
        $("#toggle").off("click").on("click", function() {
            if (_this.globalParam.isFirstPlay) {
                _this.globalParam.isFirstPlay = false;
            }
            _this.toggleSound();
        });
        /*播放上一首歌曲*/
        $("#prev").off("click").on("click", function() {
            _this.globalParam.songLength > 0 ? _this.playPrevSong() : "";

        });
        /*播放下一首歌曲*/
        $("#next").off("click").on("click", function() {
            _this.globalParam.songLength > 0 ? _this.playNextSong() : "";
        });

        //初始化状态
        //$("#playhead").hide();
        //$("#progress_bar").hide();

        $("#bar").off("click").on("click", function(e) {
            if (_this.globalParam.isAudioStop) {
                return;
            }
            if (e.target != document.getElementById("playhead")) {
                var pre = e.offsetX / $("#progress_middle").width();
                pre = pre > 1 ? 1 : pre;
                var msec = myAudio.duration * pre;
                _this.setPositioningPlay(msec); //表示定位播放
            }
        });
        var $playhead = $("#playhead"),
            $progress = $("#progress"),
            $drag_playhead = $("#drag_playhead");
       $playhead.mousedown(function(e) {
            e.stopPropagation();
            _this.globalParam.isPlayDrop = true;
            _this.globalParam.beginClientX = e.clientX;
            var str = $playhead.css("margin-left");
            _this.globalParam.begingPlayHeadX = Number(str.replace("px", ""));
        });
        $(document).on("mousemove", function(e) {
            if (_this.globalParam.isPlayDrop) {
                if (_this.globalParam.begingPlayHeadX + (e.clientX - _this.globalParam.beginClientX) <= 0) {
                    $progress.css("width", "0");
                    $playhead.css("margin-left", "0");
                } else if (_this.globalParam.begingPlayHeadX + (e.clientX - _this.globalParam.beginClientX) >= $drag_playhead.width()) {
                    $progress.css("width", "100%");
                    $playhead.css("margin-left", "100%");
                } else {
                    var pre = (_this.globalParam.begingPlayHeadX + (e.clientX - _this.globalParam.beginClientX)) / $drag_playhead.width();
                    pre = pre.toFixed(4);
                    _this.setProgress(pre);

                }
            }
        });
        $(document).on("mouseup", function(e) {
            if (_this.globalParam.isPlayDrop) {
                _this.globalParam.isPlayDrop = false;
                if (_this.globalParam.begingPlayHeadX + (e.clientX - _this.globalParam.beginClientX) <= 0) {
                    $progress.css("width", "0");
                    $playhead.css("margin-left", "0");
                    _this.setPositioningPlay(0); //表示定位播放
                } else if (_this.globalParam.begingPlayHeadX + (e.clientX - _this.globalParam.beginClientX) >= $drag_playhead.width()) {
                    $progress.css("width", "100%");
                    $playhead.css("margin-left", "100%");
                    _this.setPositioningPlay(myAudio.duration); //表示定位播放
                } else {
                    var pre = (_this.globalParam.begingPlayHeadX + (e.clientX - _this.globalParam.beginClientX)) / $drag_playhead.width();
                    pre = pre.toFixed(4);
                    _this.setProgress(pre);
                    var msec = myAudio.duration * pre;
                    _this.setPositioningPlay(msec); //表示定位播放
                }
            }
        });

        var panelT = null,
            volume_panel = $("#volume_panel"),
            volume_icon = $("#volume_icon");
        $("#volume").mouseenter(function() {
            if (volume_icon.hasClass("disabled")) return;
            volume_panel.show();
        }).mouseleave(function(e) {
            if (volume_icon.hasClass("disabled")) return;
             panelT = setTimeout(function(){
                volume_panel.hide();
            },300)
        }).on("click", function() {
           
            if (volume_icon.hasClass("icon-playbar-silence")) {
                volume_icon.removeClass("icon-playbar-silence").addClass("icon-playbar-minvox");
                //表示还原音量条值
                _this.setMute(false);
                if(_this.globalParam.volumeNum == 0){
                    _this.globalParam.volumeNum="0.6";
                    _this.setVolumeProgress(1-_this.globalParam.volumeNum);
                }
                _this.setVolume(_this.globalParam.volumeNum)
            } else {
                volume_icon.removeClass("icon-playbar-minvox").addClass("icon-playbar-silence")
                    //表示静音 音量条为0
                _this.setMute(true);
            }
        });

       

        $("#volume_control").off("click").on("click", function(e) {
            if (volume_icon.hasClass("disabled")) return;
            var _screenH = Math.floor($("body").height());
            if (e.target != document.getElementById("volumehead")) {
                var pre = (e.clientY - (_screenH - 175)) / 80; //
                pre = pre > 1 ? 1 : pre;
                _this.setVolumeProgress(pre);
                var vol = 1 - pre;
                _this.setVolume(vol); //表示定位设置音量值
            }
        });
        $("#volumehead").off("mousedown").mousedown(function(e) {
            if (volume_icon.hasClass("disabled")) return;
            _this.globalParam.isVolumeDrop = true;
            _this.globalParam.beginClientY = e.clientY;
            var str = $("#volumehead").css("top");
            _this.globalParam.begingVolumeHeadY = Number(str.replace("px", ""));
        });

        volume_panel.mouseenter(function() {
            $(this).show();
             clearTimeout(panelT)
        }).mouseleave(function(e) {
            $(this).hide();
        }).mousemove(function(e) {
            if (volume_icon.hasClass("disabled")) return;
            if (_this.globalParam.isVolumeDrop) {
                if (_this.globalParam.begingVolumeHeadY + (e.clientY - _this.globalParam.beginClientY) <= 0) {
                    $("#volume_progress").css("top", "0");
                    $("#volumehead").css("top", "0");
                    _this.setVolume(1); //表示定位设置音量值
                } else if (_this.globalParam.begingVolumeHeadY + (e.clientY - _this.globalParam.beginClientY) >= 80) {
                    $("#volume_progress").css("top", "83px");
                    $("#volumehead").css("top", "80px");
                    _this.setVolume(0); //表示定位设置音量值
                } else {
                    var pre = (_this.globalParam.begingVolumeHeadY + (e.clientY - _this.globalParam.beginClientY)) / 80;
                    pre = pre.toFixed(4);
                    _this.setVolumeProgress(pre);
                    var vol = 1 - pre;
                    _this.setVolume(vol); //表示定位设置音量值
                }
            }
        }).mouseup(function(e) {
            if (volume_icon.hasClass("disabled")) return;
            if (_this.globalParam.isVolumeDrop) {
                _this.globalParam.isVolumeDrop = false;
                if (_this.globalParam.begingVolumeHeadY + (e.clientY - _this.globalParam.beginClientY) <= 0) {
                    $("#volume_progress").css("top", "0");
                    $("#volumehead").css("top", "0");
                    _this.setVolume(1); //表示定位设置音量值
                    // _this.setVolume(false, 1, false);
                } else if (_this.globalParam.begingVolumeHeadY + (e.clientY - _this.globalParam.beginClientY) >= 80) {
                    $("#volume_progress").css("top", "83px");
                    $("#volumehead").css("top", "80px");
                    _this.setVolume(0); //表示定位设置音量值
                    // _this.setVolume(true, 0, false);
                } else {
                    var pre = (_this.globalParam.begingVolumeHeadY + (e.clientY - _this.globalParam.beginClientY)) / 80;
                    pre = pre.toFixed(4);
                    _this.setVolumeProgress(pre);
                    var vol = 1 - pre;
                    _this.setVolume(vol); //表示定位设置音量值
                    // _this.setVolume(false, vol, false);
                }
            }
        });

        $("#mode").off("click").on("click", function(e) {
            e.stopPropagation()
            if ($("#mode_panel").is(":hidden")) {
                $("#mode_panel").show();
            } else {
                $("#mode_panel").hide();
            }

        });

        //分享按钮事件绑定
        $("#pb_share").off("click").on("click", function() {
            var currentHash = _this.getPlayList()[_this.globalParam.songIndex]["Hash"],
                currentAlbumId = _this.getPlayList()[_this.globalParam.songIndex]["album_id"];
            //解决 单独拿歌曲信息 跟 歌单名字不一样的问题 以播放列表为准
            var currentDom = $("#musicbox .active"),
                listSongName = currentDom.find(".musiclist-songname-txt").text().trim(),
                listSingerName = currentDom.find(".musiclist-artist").text().trim();
            _this.getdatabyhash({
                Hash: currentHash,
                album_id: currentAlbumId,
                callback: function(res) {
                    if (res["status"] != 0 && res["data"].length != 0) {
                        //解决 单独拿歌曲信息 跟 歌单名字不一样的问题 以播放列表为准
                        var shareData = $.extend(res["data"], { "audio_name": listSingerName + "-" + listSongName })
                        _this.share(shareData);
                    } else {
                        var shareFail = dialog({
                            id:"shareFail",
                            width: 200,
                            height: 50,
                            title: '分享失败',
                            skin: 'unshare',
                            content: "分享失败，稍后重试"
                        }).show();
                        setTimeout(function() {
                            shareFail.close().remove();
                        }, 3000);
                    }
                }
            })

            var data = _this.commonConfig();
                data["action"] =  "click";
                data["b"] =  "分享btn";
                data["ivar4"] =  "ivar4";
                data["a"] =  203;
            var Loaded = [30032, data];
            apmCollectData.push(Loaded);
            try {
                newLogCount();
            } catch (ex) {}
        });

        $("#pb_download").off("click").on("click", function() {
            _this.downloadError({ type: "current" })
            var data = _this.commonConfig();
                data["action"] = "click";
                data["b"] = "下载btn";
                data["ivar4"] = "播放条";
                data["a"] = 200;
            var Loaded = [30032, data];
            apmCollectData.push(Loaded);
            try {
                newLogCount();
            } catch (ex) {}
        });

        $("#mode_panel li").off("click").on("click", function(e) {
            e.stopPropagation()
            var clickIndex = $(this).index(),
                oldMode = "",
                newMode = "";
            if ($("#mode").hasClass("icon-playbar-singlecycle")) {
                oldMode = "单曲循环"
            } else if ($("#mode").hasClass("icon-playbar-cycle")) {
                oldMode = "列表循环"
            } else if ($("#mode").hasClass("icon-playbar-randomcycle")) {
                oldMode = "随机播放"
            }
            $(this).find("a").addClass("mode-selected")
            $(this).siblings("li").find("a").removeClass("mode-selected")
            $(this).find(".icon").addClass("active")
            $(this).siblings("li").find(".icon").removeClass("active");
            if (clickIndex == 1) {
                $("#mode").attr("class", "icon icon-playbar-singlecycle");
                newMode = "单曲循环";
            } else if (clickIndex == 0) {
                $("#mode").attr("class", "icon icon-playbar-cycle");
                newMode = "列表循环";
            } else if (clickIndex == 2) {
                $("#mode").attr("class", "icon icon-playbar-randomcycle");
                newMode = "随机播放";
            }
            var data =  _this.commonConfig();
                data["action"]= "click";
                data["b"]= "播放条-切换播放模式";
                data["ivar4"]= oldMode;
                data["ivar5"]= newMode;
                data["a"]= 205;

            var Loaded = [30032, data];
            apmCollectData.push(Loaded);
            try {
                newLogCount();
            } catch (ex) {}
            $("#mode_panel").hide();
        })

        $("#showHide_playbar").off("click").click(function(e) {
            if ($(this).hasClass("show-playbar-btn")) {
                $(this).attr("class", "icon hide-playbar-btn");
                $("#audioModule").animate({
                    bottom: "-80px"
                });
            } else {
                $(this).attr("class", "icon show-playbar-btn");
                $("#audioModule").animate({
                    bottom: "0px"
                });
            }
        });
        $("#list").off("click").on("click", function(e) {
            e.stopPropagation();
            if (!_this.globalParam.showPlayFlag) {
                _this.showPlaylist(true);
            } else {
                _this.showPlaylist(false);
            }
        });

        var filterEle = "#list,#toggle,#mode_panel,#prev,#next,#volume_icon,#mode,#pb_download,#playhead,#mod-playlist";
        $(filterEle).on("mousedown", function(e) {
            e.stopPropagation();
        })


        $(".songDetail .singerName").off("click").on("click", "a", function(e) {
            e.preventDefault()
            if ($(this).length != 0) {
                window.open($(this).attr("href"))
                var data = _this.commonConfig()
                    data["action"]="click";
                    data["b"]="歌词-歌手名txt";
                    data["a"]=206;
                var Loaded = [30032, data];
                apmCollectData.push(Loaded);
                try {
                    newLogCount();
                } catch (ex) {}
            }
        })

        $(".songDetail .albumName").off("click").on("click", function(e) {
            e.preventDefault()
            if ($(this).find("a").length != 0) {
                var data = _this.commonConfig();
                    data["action"] = "click";
                    data["b"] = "歌词-专辑名txt";
                    data["a"] = 207;
                var Loaded = [30032, data];
                apmCollectData.push(Loaded);
                try {
                    newLogCount();
                } catch (ex) {}
                window.open($(this).find("a").attr("href"))
            }
        })
        $(".btnMv").off("click").on("click", function(e) {
            e.preventDefault()
            var data = _this.commonConfig();
                data["action"] =  "click";
                data["b"] =  "歌词-歌名右侧mvbtn";
                data["a"] =  208;
            var Loaded = [30032, data];
            apmCollectData.push(Loaded);
            try {
                newLogCount();
            } catch (ex) {}
            window.open(this.href)
        })

    },

    //歌词播放  msec: 毫秒
    lyricsPlay: function(msec) {
        var _this = this;
        var _len = _this.globalParam.wordArrLen;
        var _arr = _this.globalParam.wordArr;
        var i = 0,
            _t = -1;
        for (i = 0; i < _len; i++) {
            if (_arr[i] <= msec) {
                _t = i;
            } else {
                break;
            }
        }
        _arr = null;
        if (_t != _this.globalParam.ind && _this.globalParam.wordArrHTML) {
            _this.globalParam.ind = _t;
            var tempObj = $(".songWordContent .jspPane p");
            var _end = 0;
            if (_t == -1) {
                $(".playOver").removeClass("playOver");
                _end = 0;
            } else {
                tempObj.each(function(ind) {
                    // 优化dom操作
                    if (ind == _t) {
                        $(this).addClass("playOver")
                    } else {
                        if ($(this).hasClass("playOver")) {
                            $(this).removeClass("playOver")
                        }
                    }
                });
                if (_t <= 2) {
                    _end = 0;
                } else {
                    _end = 102 - _t * 34;
                }
                var lyricsOverflowHeight = _this.globalParam.lyricsOverflowheight;
                var lyricsHeight = _this.globalParam.lyricsheight;

                if (Math.abs(_end) + lyricsOverflowHeight > lyricsHeight) {
                    _end = (0 - lyricsHeight) + lyricsOverflowHeight;
                }
            }
            try {
                var _wordArrObj = $(".songWordContent .jspPane"); //方案二 有滚动条
                var str = _wordArrObj.css("top");
                var _top = Number(str.replace("px", ""));

                _wordArrObj.animate({
                    top: _end
                });
            } catch (ex) {

            }
        }
    },
    //通知开始播放：（onStart）
    playOnStart: function() {
        var _this = this;
        if (!_this.globalParam.isAudioStop) {
            _this.stop();
        }

        var songName = $(".controls-songName");

        var songNameTemp = $("#songNameTemp");

        _this.globalParam.songW = Math.floor(songNameTemp.width());
        var str = "";
        if (290 >= _this.globalParam.songW) {
            str += '<span class="songName" id="songName">' + _this.globalParam.songName + '</span>';
            songName.html(str); 
        } else {
            str += '<span class="songName" id="songName">' + _this.globalParam.songName + '</span>';
            str += '<span class="songName" id="songName2">' + _this.globalParam.songName + '</span>';
            if (songName.html(str)) {
                _this.globalParam.songNameEle1 = $("#songName");
                _this.globalParam.songNameEle2 = $("#songName2");
            }
            _this.globalParam.songNameEle1Left = 0;
            setTimeout(function() {
                _this.globalParam.songNameEle2Left = _this.globalParam.songW + 30;
                _this.globalParam.songNameEle2[0].style.marginLeft = _this.globalParam.songNameEle2Left + "px";
                if (_this.globalParam.isAudioStop) {
                    _this.start();
                }
            }, 500);
        }
        var vol =$.jStorage.get("kVolume");
        if(vol != null && typeof vol != "undefined"){
             _this.globalParam.volumeNum=vol;
            if(vol==0){
                _this.setMute(true);
                _this.setVolume(vol);
            }else{
                //  设置音量
                _this.setVolumeProgress(1-vol);
                //表示定位设置音量值
                _this.setVolume(vol);
            }
        }else {
            //  设置音量
            _this.setVolumeProgress(0.4);
            //表示定位设置音量值
            _this.setVolume(0.6);
        }
    },
    toggleSound: function() {

        var _this = this;
        var myAudio = document.getElementById("myAudio");
        if (myAudio == null || myAudio.src == "" || myAudio.src == "http://www.kugou.com/song/") {
            return;
        }
        var toggle = document.getElementById("toggle");
        if (myAudio.paused) {
            myAudio.play();
            //通知暂停(此前处于播放状态)
            toggle.className = "icon icon-playbar-pause";
            this.audioStart();
        } else {
            myAudio.pause();
            //通知播放(此前处于暂停状态)
            toggle.className = "icon icon-playbar-play";
            this.audioStop();
        }
    },
    /*播放上一首歌曲*/
    playPrevSong: function() {
        var _this = this;
        if ($("#mode").hasClass("icon-playbar-randomcycle")) {
            _this.globalParam.songIndex = Math.floor(_this.globalParam.songLength * Math.random());
        } else {
            if (this.globalParam.songIndex == 0) {
                this.globalParam.songIndex = this.globalParam.songLength;
            }
            _this.globalParam.songIndex--;
        }
        _this.playSong(this.globalParam.songIndex);
    },
    /*播放下一首歌曲*/
    playNextSong: function() {
        var _this = this;
        if ($("#mode").hasClass("icon-playbar-randomcycle")) {
            _this.globalParam.songIndex = Math.floor(_this.globalParam.songLength * Math.random());
        } else {
            _this.globalParam.songIndex++;
            _this.globalParam.songIndex = this.globalParam.songIndex % this.globalParam.songLength;
        }
        _this.playSong(this.globalParam.songIndex);
    },
    //通知播放失败
    playError: function() {
        this.setStatus();
    },
    //通知当前歌曲播放结束
    playStop: function() {
        this.toggleSound();
    },
    setStatus: function() {
        if (!this.globalParam.isStop) {
            this.stop();
        }
        var toggle = document.getElementById("toggle");
        toggle.className = "icon icon-playbar-play";
        this.globalParam.songW = 0;
        this.globalParam.songName = "";
        $("#playhead").hide();
        $("#progress_bar").hide();
        var songName = $(".controls-songName");
        songName.attr("title", "");
        songName.html('<span class="songName" id="songName">酷狗音乐</span>');
        $(".change-time,.all-time").text("00:00")
        this.setProgress(0);
    },
    audioStart: function() {
        var myAudio = document.getElementById("myAudio");
        if (myAudio == null || myAudio.src == "" || myAudio.src == "http://www.kugou.com/song/") {
            return;
        }
        $("#playhead").show();
        $("#progress_bar").show();
        myAudio.play();
        this.globalParam.isAudioStop = false;
        this.globalParam.globalID = requestAnimationFrame(audioPlayerAnimloop);
        _this.globalParam.globalID = requestAnimationFrame(audioPlayerAnimloop);
    },
    audioStop: function() {
        var myAudio = document.getElementById("myAudio");
        if (myAudio == null || myAudio.src == "" || myAudio.src == "http://www.kugou.com/song/") {
            return;
        }
        myAudio.pause();
        this.globalParam.isAudioStop = true;
        cancelAnimationFrame(this.globalParam.globalID);
    },
    audioRender: function() {
        var myAudio = this.globalParam.myAudio;
        if (myAudio.readyState > 0) {
            if (!this.globalParam.isPlayDrop) {
                var pre = myAudio.currentTime / myAudio.duration;
                pre = pre.toFixed(4);
                JSPositioningPlay(pre, Math.floor(myAudio.currentTime * 1000))
            }
        }
    },
    start: function() {
        this.globalParam.isAudioStop = false;
        this.globalParam.globalID = requestAnimationFrame(audioPlayerAnimloop);
    },
    stop: function() {
        this.globalParam.isAudioStop = true;
        cancelAnimationFrame(this.globalParam.globalID);
    },
    render: function() {
        var _this = this;
        _this.globalParam.doubEx++;
        if (_this.globalParam.doubEx % 2 == 1) return;
        //歌曲名滚动效果
        var sn1 = _this.globalParam.songNameEle1;
        var sn2 = _this.globalParam.songNameEle2;
        if (_this.globalParam.songNameEle1Left < -this.globalParam.songW) {
            _this.globalParam.songNameEle1Left = _this.globalParam.songNameEle2Left + this.globalParam.songW + 30;
        } else {
            _this.globalParam.songNameEle1Left--;
        }
        //sn1[0].style.webkitTransform = "translateX(" + _this.globalParam.songNameEle1Left + "px)";
        sn1[0].style.marginLeft = _this.globalParam.songNameEle1Left + "px";
        if (_this.globalParam.songNameEle2Left < -this.globalParam.songW) {
            _this.globalParam.songNameEle2Left = _this.globalParam.songNameEle1Left + this.globalParam.songW + 30;
        } else {
            _this.globalParam.songNameEle2Left--;
        }
        //sn2[0].style.webkitTransform = "translateX(" + _this.globalParam.songNameEle2Left + "px)";
        sn2[0].style.marginLeft = _this.globalParam.songNameEle2Left + "px";
    },
    /*设置歌曲播放进度时间/时长*/
    setPlayDuration: function(msec) {
        var ms = utility.getMS(msec);
        $("#duration .change-time").text(ms);
    },
    /*获取当前播放歌曲的总时长*/
    getDuration: function(msec) {
        var t = this;
        t.globalParam.songDuration = msec;
        var ms = utility.getMS(msec * 1000);
        t.globalParam.duration = ms;
        $("#duration .all-time").text(ms);
    },
    /*设置播放进度条值 百分比,如：0.2456*/
    setProgress: function(pro) {
        var _this = this;
        pro = pro * 100;
        _this.globalParam.$progress.css("width", "" + pro + "%");
        _this.globalParam.$playhead.css("margin-left", "" + pro + "%");
    },
    /*定位播放 以毫秒为单位*/
    setPositioningPlay: function(msec) {
        var myAudio = this.globalParam.myAudio;
        myAudio.currentTime = msec;
    },
    /* 设置是否静音 false: 还原音量条值; true: 设置静音 */
    setMute: function(b) {
        var myAudio = this.globalParam.myAudio;
        if (b) {
            myAudio.muted = true;
            $.jStorage.set("kVolume",0);
            $("#volume_progress").css("top", "83px");
            $("#volumehead").css("top", "80px");
        } else {
            myAudio.muted = false;
            this.setVolumeProgress(1 - this.globalParam.volumeNum);
            $.jStorage.set("kVolume",this.globalParam.volumeNum);
            
            this.setVolume
        }
    },
    /*设置音量控制条值 百分比,如：0.2456*/
    setVolumeProgress: function(pro) {
        var prog = Number(pro) * 80;
        var head = Number(pro) * 83;
        $("#volume_progress").css("top", "" + prog + "px");
        $("#volumehead").css("top", "" + head + "px");
    },
    /*设置 播放音量值*/
    setVolume: function(vol) {
        var myAudio = this.globalParam.myAudio;
        myAudio.volume = vol;
        $.jStorage.set("kVolume",vol);
        var t = this;
        if (vol > 0) {
            myAudio.muted = false;
            t.globalParam.volumeNum = vol;
            if (vol > 0.33) {
                t.globalParam.volumeMode = "icon icon-playbar-maxvox";
                $("#volume_icon").attr("class", "icon icon-playbar-maxvox");
            } else {
                t.globalParam.volumeMode = "icon icon-playbar-minvox";
                $("#volume_icon").attr("class", "icon icon-playbar-minvox");
            }
        } else {
            $("#volume_icon").attr("class", "icon icon-playbar-silence");
        }
        
    },
    /* 
     * 设置音量控制图标是否置灰，不可交互
     * hover : true:可交互，false:不可交互
     */
    setVolumeInteraction: function(hover) {
        hover ? $("#volume_icon").removeClass("disabled") : $("#volume_icon").addClass("disabled");
    },
    shared: null,
    downloadd: null,
    /*单曲二维码*/
    hashQueryShortUrl: function(option, callback) {
        var _this = this;
        /*读取客户端获取的参数*/
        var filename = option.audio_name,
            hash = option.hash,
            album_id = option.album_id || 0,
            md5Str = Md5.md5(hash + 'kgclientshare'),
            from = option.chl == "weixin" ? 'webCode' :"";

        var dataObj = {
            cmid: 1,
            filename: filename,
            hash: hash,
            album_id: album_id,
            is_short: 1,
            md5: md5Str,
            chl: option.chl||'weixin',
            codes: 1,
            from: from
        };
        $.ajax({
            type: 'get',
            url: 'http://t.service.kugou.com/app/',
            timeout: 5000,
            dataType: 'jsonp',
            jsonp: 'callback',
            data: dataObj,
            success: function(res) {
                if (res) {
                    if (res.status) {
                        /*将二维码添加到页面上*/
                        $('.qrcode').find('img').attr('src', res.codes_url);
                        callback && callback(res)
                    } else if (res.err_code == 31001) {
                        /*no storage file 错误处理*/
                        setTimeout(function() {
                            _this.shareIsCanClick = true;
                        }, 1000);
                        $('.qrcode').find('img').attr('src', 'http://www.kugou.com/yy/static/images/share_false.jpg');
                        callback && callback("")
                    }
                }
            },
            error: function(xhr, type) {
                callback && callback("")
            }

        });
    },
    share: function(data) {
        var _this = this,
            sharePic = "http://www.kugou.com/yy/static/images/share-cover.png";
            authors = "";
            $(data.authors).each(function(i){
                authors += data.authors[i]["author_name"]+" ";
            })
            var shareTitle = authors +"-"+data["song_name"];
            var shareIntro =   '我在酷狗常听的《' + shareTitle + '》，你也来听听吧！（来自 web 酷狗音乐）';
            if(_this.shared){
                return
            }
        _this.shared = dialog({
            id:"share",
            title: '分享歌曲',
            skin: 'share_popup',
            fixed:true,
            content: [
                "<div id='share_list'>",
                " <dl>",
                "<dt class='share_weixin'></dt>",
                "<dd class='qrcode'><img src='' /></dd>",
                "<dd>微信</dd>",
                "</dl>",
                "<dl>",
                "<dt class='share_friend'></dt>",
                "<dd>QQ好友</dd>",
                "</dl>",
                "<dl>",
                "<dt class='share_qzone'></dt>",
                "<dd>QQ空间</dd>",
                "</dl>",
                "<dl>",
                "<dt class='share_weibo'></dt>",
                "<dd>新浪微博</dd>",
                "</dl>",
                "</div>"
            ].join(""),
            onshow: function() {
                $(".ui-dialog").mousedown(function() {
                    if ($("#mod-playlist").css("bottom") == "80px") {
                        _this.showPlaylist(true)
                    }
                    return false;
                })
                data["chl"]="weixin";
                _this.hashQueryShortUrl(data, function(res) {
                    /*用哈希去获取 分享所需的图片*/
                    var shareShortUrl = res.data;
                    $(".share_weixin").mouseover(function() {
                        $(".qrcode").show()
                    }).mouseout(function() {
                        $(".qrcode").hide()
                    })
                    if (shareShortUrl == ""|| res.err_code ==31001) {
                        _this.upSupportShare("微信")
                    }
                });
                // 默认获取分享图片
                $.ajax({
                    type     : 'get',
                    url      : 'http://www.kugou.com/root/getSongCover?hash='+data["hash"],
                    timeout  : 3000,
                    cache    : false,
                    success  : function(res){ 
                        if(res["status"]==1 && $.isArray(res["data"]) && res["data"][0]&&res["data"][0]["sizable_cover"]!=""){
                            sharePic = res["data"][0]["sizable_cover"].replace(/{size}/,135);
                        }
                    },
                    error:function(xhr, type){
                    }
                });
                $(".share_friend").on("click", function() {
                    var newWin = window.open('');
                        data["chl"] = "qq";
                    _this.hashQueryShortUrl(data,function(res){
                        var shareShortUrl = res.data;
                        /*用哈希去获取 分享所需的图片*/
                        if(shareShortUrl == ""|| res.err_code ==31001){
                            _this.upSupportShare("QQ")
                        }else{
                            if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
                                window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareShortUrl) + '&desc=&title=' + encodeURIComponent(shareTitle) + '&summary=' + encodeURIComponent(shareIntro) + '&pics=' + sharePic + '&flash=&site=www.kugou.com')
                            }else{
                                newWin.location = 'http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareShortUrl) + '&desc=&title=' + encodeURIComponent(shareTitle) + '&summary=' + encodeURIComponent(shareIntro) + '&pics=' + sharePic + '&flash=&site=www.kugou.com';
                            }
                        }
                    });
                    var collectdata =  _this.commonConfig();
                        collectdata["action"] = "click";
                        collectdata["b"] = "分享弹窗-分享渠道btn";
                        collectdata["ivar4"] = "QQ好友";
                        collectdata["ivar5"] = data["hash"];
                        collectdata["ivar6"] = shareTitle;
                        collectdata["a"] = 204;

                    var Loaded = [30032, collectdata];
                    apmCollectData.push(Loaded);
                    try {
                        newLogCount();
                    } catch (ex) {}
                    _this.shared.close().remove();
                })
                $(".share_qzone").on("click", function() {
                    var newWin = window.open('');
                        data["chl"] = "qzone";
                    _this.hashQueryShortUrl(data,function(res){
                        var shareShortUrl = res.data;
                        /*用哈希去获取 分享所需的图片*/
                        if(shareShortUrl == ""|| res.err_code ==31001){
                             _this.upSupportShare("QQ空间")
                        }else{
                            if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
                                window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareShortUrl) + '&title=' + shareTitle + '&pics=' + sharePic + '&summary=' + shareIntro)
                            }else{

                                newWin.location = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareShortUrl) + '&title=' + shareTitle + '&pics=' + sharePic + '&summary=' + shareIntro;
                            }
                        }
                    });
                    var collectdata =  _this.commonConfig();
                        collectdata["action"] = "click";
                        collectdata["b"] = "分享弹窗-分享渠道btn";
                        collectdata["ivar4"] = "QQ空间";
                        collectdata["ivar5"] = data["hash"];
                        collectdata["ivar6"] = shareTitle;
                        collectdata["a"] = 204;

                    var Loaded = [30032, collectdata];
                    
                    apmCollectData.push(Loaded);
                    try {
                        newLogCount();
                    } catch (ex) {}
                    _this.shared.close().remove();
                })
                $(".share_weibo").on("click", function() {
                    var weiboShareIntro;
                    weiboShareIntro = shareIntro.replace('#', '%23'); // 微博特殊处理 # 字符
                    weiboShareIntro = weiboShareIntro.replace('（来自 PC 酷狗音乐）', '（ 来自 @酷狗音乐 web版 ）');
                    weiboShareIntro = encodeURIComponent(weiboShareIntro);
                    var newWin = window.open('');
                        data["chl"] = "weibo";
                    _this.hashQueryShortUrl(data,function(res){
                        var shareShortUrl = res.data;
                        /*用哈希去获取 分享所需的图片*/
                        if(shareShortUrl == ""|| res.err_code ==31001){
                            _this.upSupportShare("微博")
                        }else{
                            if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
                                window.open('http://v.t.sina.com.cn/share/share.php?appkey=340086183&pic=' + sharePic + '&url=' + encodeURIComponent(shareShortUrl) + '&title=' + weiboShareIntro)
                            }else{

                                newWin.location = 'http://v.t.sina.com.cn/share/share.php?appkey=340086183&pic=' + sharePic + '&url=' + encodeURIComponent(shareShortUrl) + '&title=' + weiboShareIntro;
                            }
                        }
                    });
                    var collectdata =  _this.commonConfig();
                        collectdata["action"] = "click";
                        collectdata["b"] = "分享弹窗-分享渠道btn";
                        collectdata["ivar4"] = "微博";
                        collectdata["ivar5"] = data["hash"];
                        collectdata["ivar6"] = shareTitle;
                        collectdata["a"] = 204;
                    var Loaded = [30032, collectdata];
                    
                    apmCollectData.push(Loaded);
                    try {
                        newLogCount();
                    } catch (ex) {}
                    _this.shared.close().remove();
                })
               
            },
            onclose: function() {
                _this.shared = null;
            }

        });
        _this.shared.show();
    },
     upSupportShare:function(msg){
		var unsupportshare = dialog({
                id:"unsupportshare",
				width:200,
				height:50,
				title: '不支持分享',
				skin: 'unshare',
				content: "该歌曲不支持"+msg+"分享"
			}).show();
		setTimeout(function () {
			unsupportshare.close().remove();
		}, 2000);
	}
};
$(document).ready(function() {
    common_header.init();
    play.init();
})
    //播放开始
function playStart(hash) {}
//播放结束
function playOver(hash) {
    if ($(".jspPane p")) {
        play.globalParam.ind = -2;
        $(".jspPane p").removeClass("playOver");
        var _wordArrObj = $(".jspPane"); //方案二 有滚动条
        var str = _wordArrObj.css("top");
        var _top = Number(str.replace("px", ""));
        _wordArrObj.animate({
            top: 0 + "px"
        });
    }
}
//加载开始
function playOpen() {
    try {
        var word = play.globalParam.word;
        var _wordArr = word.match(/\[(.*)\]/g);
        var _s, _t, _sum;
        play.globalParam.wordArr = [];
        play.globalParam.wordArrLen = _wordArr ? _wordArr.length : 0;
        for (var i = 0; i < play.globalParam.wordArrLen; i++) {
            _s = _wordArr[i];
            _t = _s.substr(1, 2);
            _sum = Math.floor(_t) * 60 * 1000;
            _t = _s.substr(4, 2);
            _sum += Math.floor(_t) * 1000;
            _t = _s.substr(7, 2);
            _sum += Math.floor(_t) * 10;
            play.globalParam.wordArr.push(_sum);
        }
        _wordArr = null;
        play.globalParam.wordArrHTML = $(".jspPane p"); //方案二 有滚动条
    } catch (ex) {

    }
}

//百分比进度 pro,  毫秒进度 msec
function JSPositioningPlay(pro, msec) {
    if (!play.globalParam.isPlayDrop) {
        play.setProgress(Number(pro));
        play.setPlayDuration(Math.floor(msec));
        play.lyricsPlay(Math.floor(msec));
    }
}
$(window).unload(function() {
    $.jStorage.set("playFlag", "false");
    $.jStorage.set("playdata", null);
})
window.onload=function(){
    if(utility.detectOS()=="Mac"){
        $(".macDownload-left").on("click", function() {
            window.open("https://itunes.apple.com/cn/app/%E9%85%B7%E7%8B%97%E9%9F%B3%E4%B9%90-%E5%B0%B1%E6%98%AF%E6%AD%8C%E5%A4%9A/id658741592?l=en&mt=12", "_blank");
        })

        var notTransform = !('transform' in document.documentElement.style); // true时表示不支持transform属性
        var $macDownload = $("#macDownload");
        showT= null;
        hideT= null;
        showT = setTimeout(function(){
            //方式二
            $macDownload.addClass("actived");
        },1000)

        hideT = setTimeout(function(){
            //方式二 
            if(notTransform){
                $macDownload.attr("class", "macDownload notTransform");
            }else{
                $macDownload.removeClass("actived");
            }
        },16000)
    }
}
