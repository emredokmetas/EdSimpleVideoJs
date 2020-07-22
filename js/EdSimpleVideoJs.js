/*
 * jQuery.fullscreen library v0.4.0
 * Copyright (c) 2013 Vladimir Zhuravlev
 *
 * @license https://github.com/private-face/jquery.fullscreen/blob/master/LICENSE
 *
 * Date: Wed Dec 11 22:45:17 ICT 2013
 **/
(function (e) {
    function t(e) {
        return e !== void 0
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
            for (var o = 0; s.length > o; ++o) if (l = s[o], l += 0 === o ? n : n.charAt(0).toUpperCase() + n.substr(1), t(e[l])) return e[l]
        }
        return void 0
    }

    var r = [["", ""], ["exit", "cancel"], ["screen", "Screen"]], s = ["", "o", "ms", "moz", "webkit", "webkitCurrent"],
        i = navigator.userAgent, o = l("fullscreenEnabled"),
        u = -1 !== i.indexOf("Android") && -1 !== i.indexOf("Chrome"),
        c = !u && t(l("fullscreenElement")) && (!t(o) || o === !0), _ = e.fn.jquery.split("."),
        h = 2 > parseInt(_[0]) && 7 > parseInt(_[1]), f = function () {
            this.__options = null, this._fullScreenElement = null, this.__savedStyles = {}
        };
    f.prototype = {
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
            this.__savedStyles = {};
            for (var n in this.__options.styles) this.__savedStyles[n] = this._fullScreenElement.style[n], this._fullScreenElement.style[n] = this.__options.styles[n];
            this.__options.toggleClass && t.addClass(this.__options.toggleClass)
        }, _revertStyles: function () {
            var t = e(this._fullScreenElement);
            for (var n in this.__options.styles) this._fullScreenElement.style[n] = this.__savedStyles[n];
            this.__options.toggleClass && t.removeClass(this.__options.toggleClass)
        }, open: function (t, n) {
            t !== this._fullScreenElement && (this.isFullScreen() && this.exit(), this._fullScreenElement = t, this.__options = e.extend(!0, {}, this._DEFAULT_OPTIONS, n), this._saveAndApplyStyles())
        }, exit: null, isFullScreen: null, isNativelySupported: function () {
            return c
        }
    };
    var p = function () {
        p._super.constructor.apply(this, arguments), this.exit = e.proxy(l("exitFullscreen"), document), this._DEFAULT_OPTIONS = e.extend(!0, {}, this._DEFAULT_OPTIONS, {
            styles: {
                width: "100%",
                height: "100%"
            }
        }), e(document).bind(this._prefixedString("fullscreenchange") + " MSFullscreenChange", e.proxy(this._fullScreenChange, this)).bind(this._prefixedString("fullscreenerror") + " MSFullscreenError", e.proxy(this._fullScreenError, this))
    };
    n(p, f, {
        VENDOR_PREFIXES: ["", "o", "moz", "webkit"], _prefixedString: function (t) {
            return e.map(this.VENDOR_PREFIXES, function (e) {
                return e + t
            }).join(" ")
        }, open: function (e) {
            p._super.open.apply(this, arguments);
            var t = l(e, "requestFullscreen");
            t.call(e)
        }, exit: e.noop, isFullScreen: function () {
            return null !== l("fullscreenElement")
        }, element: function () {
            return l("fullscreenElement")
        }
    });
    var a = function () {
        a._super.constructor.apply(this, arguments), this._DEFAULT_OPTIONS = e.extend({}, this._DEFAULT_OPTIONS, {
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
    n(a, f, {
        __isFullScreen: !1, __delegateKeydownHandler: function () {
            var t = e(document);
            t.delegate("*", "keydown.fullscreen", e.proxy(this.__keydownHandler, this));
            var n = h ? t.data("events") : e._data(document).events, l = n.keydown;
            h ? n.live.unshift(n.live.pop()) : l.splice(0, 0, l.splice(l.delegateCount - 1, 1)[0])
        }, __keydownHandler: function (e) {
            return this.isFullScreen() && 27 === e.which ? (this.exit(), !1) : !0
        }, _revertStyles: function () {
            a._super._revertStyles.apply(this, arguments), this._fullScreenElement.offsetHeight
        }, open: function () {
            a._super.open.apply(this, arguments), this.__isFullScreen = !0, this._fullScreenChange()
        }, exit: function () {
            this.__isFullScreen = !1, this._fullScreenChange()
        }, isFullScreen: function () {
            return this.__isFullScreen
        }, element: function () {
            return this.__isFullScreen ? this._fullScreenElement : null
        }
    }), e.fullscreen = c ? new p : new a, e.fn.fullscreen = function (t) {
        var n = this[0];
        return t = e.extend({
            toggleClass: null,
            overflow: "hidden"
        }, t), t.styles = {overflow: t.overflow}, delete t.overflow, n && e.fullscreen.open(n, t), this
    }
})(jQuery);

/*
 * jQuery.EdSimpleVideoJs library v1.0.0
 * Copyright (c) 2013 Emre Dökmetaş
 *
 * @license https://github.com/emredokmetas/EdSimpleVideoJs
 *
 * Date: 22 jul 2020, wed
 **/
jQuery.fn.EdSimpleVideoJs = function (settings = null) {

    // eklenti ayarları
    var config = jQuery.extend({
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
    }, settings);

    this.each(function () {
        var self = this,
            $this = $(self),
            played = false, controlsSetInterval = 0
        isActive = false;


        $this.wrap('<div class="ed-media" tabindex="0"></div>').wrap('<div class="ed-element"></div>');
        $this.closest(".ed-media").prepend('<div class="ed-big-button" role="button" aria-label="Play" aria-pressed="false">\n' +
            '                            <i class="fa fa-play"></i>\n' +
            '                        </div>').append('<div class="ed-controls">\n' +
            '                            <button type="button" class="ed-btn ed-play-btn" aria-controls="mep_0" title="Play" aria-label="Play" tabindex="0"><i class="fa fa-play"></i></button>\n' +
            '                            <div class="ed-current-time" role="timer" aria-live="off">\n' +
            '                                00:00\n' +
            '                            </div>\n' +
            '                            <div class="ed-time-rod">\n' +
            '                                <div class="ed-time-rod-slider" role="slider" tabindex="0" aria-label="Time Slider" aria-valuemin="0" aria-valuemax="35.889" aria-valuenow="15.775344" aria-valuetext="00:15">\n' +
            '                                    <div class="ed-time-buffering"></div>\n' +
            '                                    <div class="ed-time-loaded"></div>\n' +
            '                                    <div class="ed-time-hovered"></div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="ed-duration">00:00</div>\n' +
            '                            <div class="ed-volume">\n' +
            '                               <div class="ed-volume-slider" aria-label="Volume Slider" aria-valuemin="0" aria-valuemax="100" role="slider" aria-orientation="vertical" aria-valuenow="26" aria-valuetext="26%">\n' +
            '                                   <div class="ed-volume-content">\n' +
            '                                       <div class="ed-volume-total"></div>\n' +
            '                                       <div class="ed-volume-current"></div>\n' +
            '                                   </div>\n' +
            '                                </div>\n' +
            '                                <button type="button" class="ed-btn ed-mute-btn" aria-controls="mep_0" title="Mute" aria-label="Mute"><i class="fa fa-volume-up"></i></button>\n' +
            '                            </div>\n' +
            '                            <div class="ed-fullscreen-btn">\n' +
            '                                <button type="button" class="ed-btn" aria-controls="mep_0" title="Fullscreen" aria-label="Fullscreen" tabindex="0"><i class="fa fa-expand"></i></button>\n' +
            '                            </div>\n' +
            '                        </div>');

        $this.defaultSetting = function () {
            $this.closest(".ed-media").focus();

            if (config.startVolume >= 0 && config.startVolume <= 1)
                $this.setVolume(config.startVolume * 100);
            else
                $this.error("Unacceptable sound value.")
        }

        $this.converTime = function (number) {

            if (!number)
                return "00:00";
            var sec_num = parseInt(number, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (hours != "00")
                return hours + ':' + minutes + ':' + seconds;
            return minutes + ':' + seconds;
        }

        $this.getCurrentTime = function () {

            var currentTime = $this.closest(".ed-media").find("video").get(0).currentTime;
            $this.closest(".ed-media").find(".ed-current-time").text($this.converTime(currentTime));
            return currentTime;
        }

        $this.setCurrentTime = function (time) {
            if (time >= 0 || time <= $this.getCurrentTime())
                $this.closest(".ed-media").find("video").get(0).currentTime = time;
        }

        $this.getDuration = function () {
            var duration = $this.closest(".ed-media").find("video").get(0).duration;
            $this.closest(".ed-media").find(".ed-duration").text($this.converTime(duration));
            return duration;
        }

        $this.getUpdateTime = function () {

            $this.getDuration();
            $this.getCurrentTime();
            $this.getTimeRodLoaded();
        }

        $this.getTimeRodHover = function (offsetX) {

            var percent = 0;
            percent = (offsetX * 100) / $this.closest(".ed-media").find(".ed-time-rod").width();
            $this.closest(".ed-media").find(".ed-time-hovered").width(percent + "%");
            return percent;
        }


        $this.getTimeRodLoaded = function () {
            var percent = 0;
            percent = ($this.getCurrentTime() * 100) / $this.getDuration();
            $this.closest(".ed-media").find(".ed-time-loaded").width(percent + "%");
            return percent;
        }

        $this.getMuted = function () {
            return $this.closest(".ed-media").find("video").get(0).muted;
        }

        $this.setMuted = function () {

            if (!$this.getMuted()) {
                $this.closest(".ed-media").find(".ed-mute-btn").addClass("ed-unmute").attr({
                    "title": "Unmute",
                    "aria-label": "Unmute"
                }).find("i").removeClass("fa-volume-up").addClass("fa-volume-mute");
                $this.closest(".ed-media").find("video").get(0).muted = true;
            } else {
                $this.closest(".ed-media").find(".ed-mute-btn").removeClass("ed-unmute").attr({
                    "title": "Mute",
                    "aria-label": "Mute"
                }).find("i").removeClass("fa-volume-mute").addClass("fa-volume-up");
                $this.closest(".ed-media").find("video").get(0).muted = false;
            }
        }
        $this.getVolume = function () {
            var volume = $this.closest(".ed-media").find("video").get(0).volume;
            var number = volume * 100;
            $this.closest(".ed-media").find(".ed-volume-current").width(number + "%");
            $this.closest(".ed-media").find(".ed-volume-slider").attr("aria-valuenow", number).attr("aria-valuetext", number + "%");
            return volume;

        }
        $this.setVolume = function (number) {

            if (number >= 0 && number <= 100) {
                var volume = number / 100;
                $this.closest(".ed-media").find("video").get(0).volume = volume;
                $this.closest(".ed-media").find(".ed-volume-current").width(number + "%");
                $this.closest(".ed-media").find(".ed-volume-slider").attr("aria-valuenow", number).attr("aria-valuetext", number + "%");
            }
        }


        $this.play = function () {
            if ($this.closest(".ed-media").find("video").get(0).paused) {
                $this.closest(".ed-media").find("video").get(0).play();
                $this.closest(".ed-media").find(".ed-big-button").addClass("hide");
                $this.closest(".ed-media").find(".ed-replay-btn").removeClass("ed-replay-btn").addClass("ed-play-btn").attr({
                    "title": "Play",
                    "aria-label": "play"
                }).find("i").removeClass("fa-redo").addClass("fa-play");
                $this.closest(".ed-media").find(".ed-play-btn").removeClass("ed-play-btn").removeClass("ed-play-btn").addClass("ed-pause-btn").attr({
                    "title": "Pause",
                    "aria-label": "Pause"
                }).find("i").removeClass("fa-play").addClass("fa-pause");
                played = true;
            }
        }
        $this.pause = function () {
            if (!$this.closest(".ed-media").find("video").get(0).paused) {
                $this.controlsShow();
                $this.closest(".ed-media").find("video").get(0).pause();
                $this.closest(".ed-media").find(".ed-big-button").removeClass("hide");
                $this.closest(".ed-media").find(".ed-pause-btn").removeClass("ed-pause-btn").addClass("ed-play-btn").attr({
                    "title": "Play",
                    "aria-label": "play"
                }).find("i").removeClass("fa-pause").addClass("fa-play");
            }
        }
        $this.isPlayed = function () {
            return !$this.closest(".ed-media").find("video").get(0).paused;
        }

        $this.endMedia = function () {
            $this.closest(".ed-media").find(".ed-big-button").removeClass("hide");
            $this.closest(".ed-media").find(".ed-controls").show();
            $this.closest(".ed-media").find(".ed-pause-btn").removeClass("ed-pause-btn").addClass("ed-replay-btn").attr({
                "title": "Replay",
                "aria-label": "Replay"
            }).find("i").removeClass("fa-pause").addClass("fa-redo");
        }
        $this.mediaLoad = function (type = true) {
            if (type) {
                $this.closest(".ed-media").find(".ed-time-buffering").show();
            } else {
                $this.closest(".ed-media").find(".ed-time-buffering").hide();
            }
        }

        $this.fullscreen = function () {
            if ($.fullscreen.isFullScreen()) {
                $.fullscreen.exit();
                $this.closest(".ed-media").find(".ed-fullscreen-btn button i").removeClass("fa-compress").addClass("fa-expand");
            } else {
                $this.closest(".ed-media").fullscreen();
                $this.closest(".ed-media").find(".ed-fullscreen-btn button i").removeClass("fa-expand").addClass("fa-compress");
            }
        }

        $this.controlsHide = function () {
            controlsSetInterval = setInterval(function () {
                if ($this.isPlayed()) {

                    $this.closest(".ed-media").find(".ed-big-button").css("cursor", "none");
                    $this.closest(".ed-media").find(".ed-controls").hide();
                    clearInterval(controlsSetInterval);
                }
            }, 5000);
        }

        $this.controlsShow = function () {
            $this.closest(".ed-media").find(".ed-big-button").css("cursor", "pointer");
            $this.closest(".ed-media").find(".ed-controls").show();
            clearInterval(controlsSetInterval);

        }

        $this.error = function (errorText) {
            console.log(errorText);
        }

        $this.closest(".ed-media").find("video").on('timeupdate', function () {
            $this.getUpdateTime();
        });

        $this.closest(".ed-media").find("video").on('ended', function () {
            $this.endMedia();
            $this.controlsShow();
        });

        $this.closest(".ed-media").find("video").on('loadeddata', function () {

            $this.mediaLoad(false);
        })

        $this.closest(".ed-media").find("video").on('loadedmetadata', function () {
            $this.mediaLoad();
        });

        $this.closest(".ed-media").find("video").on('loadstart', function () {

        });

        $this.closest(".ed-media").find("video").on('progress', function () {
            $this.controlsHide();
        });

        $this.closest(".ed-media").find("video").on('emptied', function () {

        });

        $this.closest(".ed-media").find("video").on('play', function () {

        });

        $this.closest(".ed-media").find("video").on('unmute', function () {

        });

        $this.closest(".ed-media").find("video").on('playing', function () {
            $this.mediaLoad(false);
            $this.controlsHide();

        });

        $this.closest(".ed-media").find("video").on('stalled', function () {
            $this.error("media does not load.")
        });

        $this.closest(".ed-media").find(".ed-big-button, .ed-play-btn").click(function () {
            if ($this.closest(".ed-media").find("video").get(0).paused) {
                $this.play();
            } else
                $this.pause();
        });

        $this.closest(".ed-media").find(".ed-mute-btn").click(function () {
            $this.setMuted();
        });

        $this.closest(".ed-media").find(".ed-time-rod").click(function (e) {
            if (played) {
                var percent = 0, currentTime = 0;
                percent = (e.offsetX * 100) / $(this).width();
                currentTime = ($this.getDuration() * percent) / 100;
                $this.setCurrentTime(currentTime);
            }
        });

        $this.closest(".ed-media").find(".ed-time-rod").mousemove(function (e) {
            if (played)
                $this.getTimeRodHover(e.offsetX);
        });

        $this.closest(".ed-media").mousemove(function (e) {
            $this.controlsShow();
        });

        $this.closest(".ed-media").find(".ed-volume-content").click(function (e) {
            percent = (e.offsetX * 100) / $this.closest(".ed-media").find(".ed-volume-content").width();
            $this.setVolume(percent);
        });

        $this.closest(".ed-media").find(".ed-fullscreen-btn").click(function () {
            $this.fullscreen();
        });

        $this.closest(".ed-media").on("keydown", function (e) {
            switch (e.keyCode) {
                case 70: // f
                    $this.fullscreen();
                    e.preventDefault();
                    break;

                case 32: // space
                    if ($this.closest(".ed-media").find("video").get(0).paused) {
                        $this.play();
                    } else
                        $this.pause();
                    e.preventDefault();
                    break;

                case 38: // up
                    var volume = $this.getVolume() * 100;
                    var newVolume = volume + config.nextVolume;

                    if (newVolume >= 100)
                        newVolume = 100;
                    $this.setVolume(newVolume);
                    e.preventDefault();
                    break;

                case 40: // down
                    var volume = $this.getVolume() * 100;
                    var newVolume = volume - config.prevVolume;

                    if (newVolume < 0)
                        newVolume = 0;
                    $this.setVolume(newVolume);
                    e.preventDefault();
                    break;

                case 37: // left
                    if (played) {
                        var currentTime = $this.getCurrentTime();
                        var newTime = currentTime - config.prevTime;

                        if (newTime < 0)
                            newTime = 0;

                        $this.setCurrentTime(newTime);
                        e.preventDefault();
                    }
                    break;

                case 39: // right
                    if (played) {
                        var currentTime = $this.getCurrentTime();
                        var duration = $this.getDuration();
                        var newTime = currentTime + config.nextTime;

                        if (newTime >= duration)
                            newTime = duration;

                        $this.setCurrentTime(newTime);
                        e.preventDefault();
                    }
                    break;

                case 77: // m
                    $this.setMuted();
                    e.preventDefault();
                    break;

            }

        });


        $this.defaultSetting();
    });
}
