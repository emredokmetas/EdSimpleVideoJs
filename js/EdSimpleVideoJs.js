/*
 * jQuery.fullscreen library v0.4.0
 * Copyright (c) 2013 Vladimir Zhuravlev
 *
 * @license https://github.com/private-face/jquery.fullscreen/blob/master/LICENSE
 *
 * Date: Wed Dec 11 22:45:17 ICT 2013
 **/
!function (e) {
    function t(e) {
        return void 0 !== e
    }

    function n(t, n, l) {
        var r = function () {
        };
        r.prototype = n.prototype, t.prototype = new r, t.prototype.constructor = t, n.prototype.constructor = n, t._super = n.prototype, l && e.extend(t.prototype, l)
    }

    function l(e, n) {
        var l;
        "string" == typeof e && (n = e, e = document);
        for (var i = 0; r.length > i; ++i) {
            n = n.replace(r[i][0], r[i][1]);
            for (var o = 0; s.length > o; ++o) if (l = s[o], t(e[l += 0 === o ? n : n.charAt(0).toUpperCase() + n.substr(1)])) return e[l]
        }
    }

    var r = [["", ""], ["exit", "cancel"], ["screen", "Screen"]], s = ["", "o", "ms", "moz", "webkit", "webkitCurrent"],
        i = navigator.userAgent, o = l("fullscreenEnabled"),
        u = !(-1 !== i.indexOf("Android") && -1 !== i.indexOf("Chrome")) && t(l("fullscreenElement")) && (!t(o) || !0 === o),
        c = e.fn.jquery.split("."), _ = 2 > parseInt(c[0]) && 7 > parseInt(c[1]), h = function () {
            this.__options = null, this._fullScreenElement = null, this.__savedStyles = {}
        };
    h.prototype = {
        _DEFAULT_OPTIONS: {
            styles: {boxSizing: "border-box", MozBoxSizing: "border-box", WebkitBoxSizing: "border-box"},
            toggleClass: null
        }, __documentOverflow: "", __htmlOverflow: "", _preventDocumentScroll: function () {
            this.__documentOverflow = e("body")[0].style.overflow, this.__htmlOverflow = e("html")[0].style.overflow, e("body, html").css("overflow", "hidden")
        }, _allowDocumentScroll: function () {
            e("body")[0].style.overflow = this.__documentOverflow, e("html")[0].style.overflow = this.__htmlOverflow
        }, _fullScreenChange: function () {
            this.isFullScreen() ? (this._preventDocumentScroll(), this._triggerEvents()) : (this._allowDocumentScroll(), this._revertStyles(), this._triggerEvents(), this._fullScreenElement = null)
        }, _fullScreenError: function (t) {
            this._revertStyles(), this._fullScreenElement = null, t && e(document).trigger("fscreenerror", [t])
        }, _triggerEvents: function () {
            e(this._fullScreenElement).trigger(this.isFullScreen() ? "fscreenopen" : "fscreenclose"), e(document).trigger("fscreenchange", [this.isFullScreen(), this._fullScreenElement])
        }, _saveAndApplyStyles: function () {
            var t = e(this._fullScreenElement);
            for (var n in this.__savedStyles = {}, this.__options.styles) this.__savedStyles[n] = this._fullScreenElement.style[n], this._fullScreenElement.style[n] = this.__options.styles[n];
            this.__options.toggleClass && t.addClass(this.__options.toggleClass)
        }, _revertStyles: function () {
            var t = e(this._fullScreenElement);
            for (var n in this.__options.styles) this._fullScreenElement.style[n] = this.__savedStyles[n];
            this.__options.toggleClass && t.removeClass(this.__options.toggleClass)
        }, open: function (t, n) {
            t !== this._fullScreenElement && (this.isFullScreen() && this.exit(), this._fullScreenElement = t, this.__options = e.extend(!0, {}, this._DEFAULT_OPTIONS, n), this._saveAndApplyStyles())
        }, exit: null, isFullScreen: null, isNativelySupported: function () {
            return u
        }
    };
    var f = function () {
        f._super.constructor.apply(this, arguments), this.exit = e.proxy(l("exitFullscreen"), document), this._DEFAULT_OPTIONS = e.extend(!0, {}, this._DEFAULT_OPTIONS, {
            styles: {
                width: "100%",
                height: "100%"
            }
        }), e(document).bind(this._prefixedString("fullscreenchange") + " MSFullscreenChange", e.proxy(this._fullScreenChange, this)).bind(this._prefixedString("fullscreenerror") + " MSFullscreenError", e.proxy(this._fullScreenError, this))
    };
    n(f, h, {
        VENDOR_PREFIXES: ["", "o", "moz", "webkit"], _prefixedString: function (t) {
            return e.map(this.VENDOR_PREFIXES, function (e) {
                return e + t
            }).join(" ")
        }, open: function (e) {
            f._super.open.apply(this, arguments), l(e, "requestFullscreen").call(e)
        }, exit: e.noop, isFullScreen: function () {
            return null !== l("fullscreenElement")
        }, element: function () {
            return l("fullscreenElement")
        }
    });
    var p = function () {
        p._super.constructor.apply(this, arguments), this._DEFAULT_OPTIONS = e.extend({}, this._DEFAULT_OPTIONS, {
            styles: {
                position: "fixed",
                zIndex: "2147483647",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            }
        }), this.__delegateKeydownHandler()
    };
    n(p, h, {
        __isFullScreen: !1, __delegateKeydownHandler: function () {
            var t = e(document);
            t.delegate("*", "keydown.fullscreen", e.proxy(this.__keydownHandler, this));
            var n = _ ? t.data("events") : e._data(document).events, l = n.keydown;
            _ ? n.live.unshift(n.live.pop()) : l.splice(0, 0, l.splice(l.delegateCount - 1, 1)[0])
        }, __keydownHandler: function (e) {
            return !this.isFullScreen() || 27 !== e.which || (this.exit(), !1)
        }, _revertStyles: function () {
            p._super._revertStyles.apply(this, arguments), this._fullScreenElement.offsetHeight
        }, open: function () {
            p._super.open.apply(this, arguments), this.__isFullScreen = !0, this._fullScreenChange()
        }, exit: function () {
            this.__isFullScreen = !1, this._fullScreenChange()
        }, isFullScreen: function () {
            return this.__isFullScreen
        }, element: function () {
            return this.__isFullScreen ? this._fullScreenElement : null
        }
    }), e.fullscreen = u ? new f : new p, e.fn.fullscreen = function (t) {
        var n = this[0];
        return (t = e.extend({
            toggleClass: null,
            overflow: "hidden"
        }, t)).styles = {overflow: t.overflow}, delete t.overflow, n && e.fullscreen.open(n, t), this
    }
}(jQuery);

/*
 * jQuery.EdSimpleVideoJs library v1.0.0
 * Copyright (c) 2013 Emre Dökmetaş
 *
 * @license https://github.com/emredokmetas/EdSimpleVideoJs
 *
 * Date: 22 jul 2020, wed
 **/
jQuery.fn.EdSimpleVideoJs = function (e = null) {
    var d = jQuery.extend({
        startVolume: 1,
        nextTime: 5,
        prevTime: 5,
        nextVolume: 10,
        prevVolume: 10,
        callback: function () {
        },
        callbackStart: function () {
        },
        callbackEnd: function () {
        }
    }, e);
    this.each(function () {
        var e = $(this), t = !1;
        e.wrap('<div class="ed-media" tabindex="0"></div>').wrap('<div class="ed-element"></div>'), e.closest(".ed-media").prepend('<div class="ed-big-button" role="button" aria-label="Play" aria-pressed="false">\n                            <i class="fa fa-play"></i>\n                        </div>').append('<div class="ed-controls">\n                            <button type="button" class="ed-btn ed-play-btn" aria-controls="mep_0" title="Play" aria-label="Play" tabindex="0"><i class="fa fa-play"></i></button>\n                            <div class="ed-current-time" role="timer" aria-live="off">\n                                00:00\n                            </div>\n                            <div class="ed-time-rod">\n                                <div class="ed-time-rod-slider" role="slider" tabindex="0" aria-label="Time Slider" aria-valuemin="0" aria-valuemax="35.889" aria-valuenow="15.775344" aria-valuetext="00:15">\n                                    <div class="ed-time-buffering"></div>\n                                    <div class="ed-time-loaded"></div>\n                                    <div class="ed-time-hovered"></div>\n                                </div>\n                            </div>\n                            <div class="ed-duration">00:00</div>\n                            <div class="ed-volume">\n                               <div class="ed-volume-slider" aria-label="Volume Slider" aria-valuemin="0" aria-valuemax="100" role="slider" aria-orientation="vertical" aria-valuenow="26" aria-valuetext="26%">\n                                   <div class="ed-volume-content">\n                                       <div class="ed-volume-total"></div>\n                                       <div class="ed-volume-current"></div>\n                                   </div>\n                                </div>\n                                <button type="button" class="ed-btn ed-mute-btn" aria-controls="mep_0" title="Mute" aria-label="Mute"><i class="fa fa-volume-up"></i></button>\n                            </div>\n                            <div class="ed-fullscreen-btn">\n                                <button type="button" class="ed-btn" aria-controls="mep_0" title="Fullscreen" aria-label="Fullscreen" tabindex="0"><i class="fa fa-expand"></i></button>\n                            </div>\n                        </div>'), e.defaultSetting = function () {
            d.startVolume >= 0 && d.startVolume <= 1 ? e.setVolume(100 * d.startVolume) : e.error("Unacceptable sound value.")
        }, e.converTime = function (e) {
            if (!e) return "00:00";
            var d = parseInt(e, 10), t = Math.floor(d / 3600), a = Math.floor((d - 3600 * t) / 60),
                i = d - 3600 * t - 60 * a;
            return t < 10 && (t = "0" + t), a < 10 && (a = "0" + a), i < 10 && (i = "0" + i), "00" != t ? t + ":" + a + ":" + i : a + ":" + i
        }, e.getCurrentTime = function () {
            var d = e.closest(".ed-media").find("video").get(0).currentTime;
            return e.closest(".ed-media").find(".ed-current-time").text(e.converTime(d)), d
        }, e.setCurrentTime = function (d) {
            (d >= 0 || d <= e.getCurrentTime()) && (e.closest(".ed-media").find("video").get(0).currentTime = d)
        }, e.getDuration = function () {
            var d = e.closest(".ed-media").find("video").get(0).duration;
            return e.closest(".ed-media").find(".ed-duration").text(e.converTime(d)), d
        }, e.getUpdateTime = function () {
            e.getDuration(), e.getCurrentTime(), e.getTimeRodLoaded()
        }, e.getTimeRodHover = function (d) {
            var t;
            return t = 100 * d / e.closest(".ed-media").find(".ed-time-rod").width(), e.closest(".ed-media").find(".ed-time-hovered").width(t + "%"), t
        }, e.getTimeRodLoaded = function () {
            var d;
            return d = 100 * e.getCurrentTime() / e.getDuration(), e.closest(".ed-media").find(".ed-time-loaded").width(d + "%"), d
        }, e.getMuted = function () {
            return e.closest(".ed-media").find("video").get(0).muted
        }, e.setMuted = function () {
            e.getMuted() ? (e.closest(".ed-media").find(".ed-mute-btn").removeClass("ed-unmute").attr({
                title: "Mute",
                "aria-label": "Mute"
            }).find("i").removeClass("fa-volume-mute").addClass("fa-volume-up"), e.closest(".ed-media").find("video").get(0).muted = !1) : (e.closest(".ed-media").find(".ed-mute-btn").addClass("ed-unmute").attr({
                title: "Unmute",
                "aria-label": "Unmute"
            }).find("i").removeClass("fa-volume-up").addClass("fa-volume-mute"), e.closest(".ed-media").find("video").get(0).muted = !0)
        }, e.getVolume = function () {
            var d = e.closest(".ed-media").find("video").get(0).volume, t = 100 * d;
            return e.closest(".ed-media").find(".ed-volume-current").width(t + "%"), e.closest(".ed-media").find(".ed-volume-slider").attr("aria-valuenow", t).attr("aria-valuetext", t + "%"), d
        }, e.setVolume = function (d) {
            if (d >= 0 && d <= 100) {
                var t = d / 100;
                e.closest(".ed-media").find("video").get(0).volume = t, e.closest(".ed-media").find(".ed-volume-current").width(d + "%"), e.closest(".ed-media").find(".ed-volume-slider").attr("aria-valuenow", d).attr("aria-valuetext", d + "%")
            }
        }, e.play = function () {
            e.closest(".ed-media").find("video").get(0).paused && (e.closest(".ed-media").find("video").get(0).play(), e.closest(".ed-media").find(".ed-big-button").addClass("hide"), e.closest(".ed-media").find(".ed-replay-btn").removeClass("ed-replay-btn").addClass("ed-play-btn").attr({
                title: "Play",
                "aria-label": "play"
            }).find("i").removeClass("fa-redo").addClass("fa-play"), e.closest(".ed-media").find(".ed-play-btn").removeClass("ed-play-btn").removeClass("ed-play-btn").addClass("ed-pause-btn").attr({
                title: "Pause",
                "aria-label": "Pause"
            }).find("i").removeClass("fa-play").addClass("fa-pause"), t = !0)
        }, e.pause = function () {
            e.closest(".ed-media").find("video").get(0).paused || (e.closest(".ed-media").find("video").get(0).pause(), e.closest(".ed-media").find(".ed-big-button").removeClass("hide"), e.closest(".ed-media").find(".ed-pause-btn").removeClass("ed-pause-btn").addClass("ed-play-btn").attr({
                title: "Play",
                "aria-label": "play"
            }).find("i").removeClass("fa-pause").addClass("fa-play"))
        }, e.endMedia = function () {
            e.closest(".ed-media").find(".ed-big-button").removeClass("hide"), e.closest(".ed-media").find(".ed-pause-btn").removeClass("ed-pause-btn").addClass("ed-replay-btn").attr({
                title: "Replay",
                "aria-label": "Replay"
            }).find("i").removeClass("fa-pause").addClass("fa-redo")
        }, e.mediaLoad = function (d = !0) {
            d ? e.closest(".ed-media").find(".ed-time-buffering").show() : e.closest(".ed-media").find(".ed-time-buffering").hide()
        }, e.fullscreen = function () {
            $.fullscreen.isFullScreen() ? ($.fullscreen.exit(), e.closest(".ed-media").find(".ed-fullscreen-btn button i").removeClass("fa-compress").addClass("fa-expand")) : (e.closest(".ed-media").fullscreen(), e.closest(".ed-media").find(".ed-fullscreen-btn button i").removeClass("fa-expand").addClass("fa-compress"))
        }, e.error = function (e) {
            console.log(e)
        }, e.closest(".ed-media").find("video").on("timeupdate", function () {
            e.getUpdateTime()
        }), e.closest(".ed-media").find("video").on("ended", function () {
            e.endMedia()
        }), e.closest(".ed-media").find("video").on("loadeddata", function () {
            e.mediaLoad(!1)
        }), e.closest(".ed-media").find("video").on("loadedmetadata", function () {
            e.mediaLoad()
        }), e.closest(".ed-media").find("video").on("loadstart", function () {
        }), e.closest(".ed-media").find("video").on("progress", function () {
        }), e.closest(".ed-media").find("video").on("emptied", function () {
        }), e.closest(".ed-media").find("video").on("play", function () {
        }), e.closest(".ed-media").find("video").on("unmute", function () {
        }), e.closest(".ed-media").find("video").on("playing", function () {
            e.mediaLoad(!1)
        }), e.closest(".ed-media").find("video").on("stalled", function () {
            e.error("media does not load.")
        }), e.closest(".ed-media").find(".ed-big-button, .ed-play-btn").click(function () {
            e.closest(".ed-media").find("video").get(0).paused ? e.play() : e.pause()
        }), e.closest(".ed-media").find(".ed-mute-btn").click(function () {
            e.setMuted()
        }), e.closest(".ed-media").find(".ed-time-rod").click(function (d) {
            if (t) {
                var a, i;
                a = 100 * d.offsetX / $(this).width(), i = e.getDuration() * a / 100, e.setCurrentTime(i)
            }
        }), e.closest(".ed-media").find(".ed-time-rod").mousemove(function (d) {
            t && e.getTimeRodHover(d.offsetX)
        }), e.closest(".ed-media").find(".ed-volume-content").click(function (d) {
            percent = 100 * d.offsetX / e.closest(".ed-media").find(".ed-volume-content").width(), e.setVolume(percent)
        }), e.closest(".ed-media").find(".ed-fullscreen-btn").click(function () {
            e.fullscreen()
        }), $("html").on("keydown", function (a) {
            switch (a.keyCode) {
                case 70:
                    e.fullscreen();
                    break;
                case 32:
                    e.closest(".ed-media").find("video").get(0).paused ? e.play() : e.pause();
                    break;
                case 38:
                    (i = 100 * e.getVolume() + d.nextVolume) >= 100 && (i = 100), e.setVolume(i);
                    break;
                case 40:
                    var i;
                    (i = 100 * e.getVolume() - d.prevVolume) < 0 && (i = 0), e.setVolume(i);
                    break;
                case 37:
                    if (t) (n = (s = e.getCurrentTime()) - d.prevTime) < 0 && (n = 0), e.setCurrentTime(n);
                    break;
                case 39:
                    if (t) {
                        var n, s = e.getCurrentTime(), l = e.getDuration();
                        (n = s + d.nextTime) >= l && (n = l), console.log(n), e.setCurrentTime(n)
                    }
                    break;
                case 77:
                    e.setMuted()
            }
        }), e.defaultSetting()
    })
};
