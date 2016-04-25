(function($) {
    $(document).unbind("DOMNodeInserted.mask");
    if (MapasCulturais.mode !== "development") {
        (function(i, s, o, g, r, a, m) {
            i["GoogleAnalyticsObject"] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments);
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
        ga("create", "UA-53455459-1", "auto");
        ga("send", "pageview");
    }
    $(document).ready(function() {
        var deviceAgent = navigator.userAgent.toLowerCase();
        var isTouchDevice = "ontouchstart" in document.documentElement || (deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i));
        window.isTouchDevice = isTouchDevice;
        $("body").addClass("touch-device");
        if (MapasCulturais.mode !== "development") $(".staging-hidden").remove();
        var lastScrollTop = 0;
        var $mainHeader = $("#main-header");
        var headerHeight = $mainHeader.outerHeight(true);
        var header_animation_status = 0;
        if ($("#editable-entity").length && $("#editable-entity").is(":visible")) {
            $("#main-section").css("margin-top", headerHeight + $("#editable-entity").outerHeight(true));
        }
        if ($(document.body).hasClass("action-single") && $(document.body).hasClass("entity")) {
            $(".js-gallery").magnificPopup({
                delegate: "a",
                type: "image",
                closeMarkup: '<span class="mfp-close icon icon-close"></span>',
                gallery: {
                    enabled: true,
                    arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><span class="icon icon-arrow-%dir% mfp-prevent-close"></span></button>',
                    tPrev: "Anterior",
                    tNext: "Próxima",
                    tCounter: "%curr% de %total%"
                }
            });
        }
        function adjustHeader() {
            var $mapa, $editableEntity, $busca, $mapa, buscaTop, headerDosResultadosHeight, scrollTop = $(this).scrollTop(), diffScrollTop = lastScrollTop - scrollTop, newHeaderTop = parseInt($mainHeader.css("top")) + diffScrollTop;
            if ($("#header-search-row").length) {
                $busca = $("#header-search-row");
                $mapa = $("#search-map-container");
                if (!$busca.parent().is($mainHeader)) {
                    $mainHeader.append($('<div id="header-nav-row" class="clearfix">').append($mainHeader.find(">*")));
                    $busca.appendTo($mainHeader);
                }
                headerDosResultadosHeight = $("#search-results-header").outerHeight(true);
                headerHeight = $mainHeader.outerHeight() - headerDosResultadosHeight;
                buscaTop = $mainHeader.outerHeight(true);
                if (buscaTop < 0) buscaTop = 0;
                $("#lista").css("margin-top", headerHeight + headerDosResultadosHeight);
                if ($mapa.is(":visible")) {
                    $busca.addClass("sombra");
                    $mapa.css("top", newHeaderTop + headerHeight + headerDosResultadosHeight);
                    if ($mapa.data("oldHeight") != $mapa.height() && window.leaflet) window.leaflet.map.invalidateSize();
                    if ($("#infobox")) $("#infobox").height($("#search-map-container").height() - 44);
                    $mapa.data("oldHeight", $mapa.height());
                } else if (scrollTop == 0 && !$mapa.is(":visible")) $busca.removeClass("sombra"); else $busca.addClass("sombra");
                $("body").css("min-height", $(window).height() + headerHeight - headerDosResultadosHeight - 30);
            }
            if (newHeaderTop <= -headerHeight) {
                newHeaderTop = -headerHeight;
            } else if (newHeaderTop >= 0) {
                newHeaderTop = 0;
            } else if (newHeaderTop < -$(window).scrollTop()) {
                newHeaderTop = -$(window).scrollTop();
            }
            if (parseInt($mainHeader.css("top")) <= -headerHeight + 3) $mainHeader.removeClass("sombra"); else $mainHeader.addClass("sombra");
            $mainHeader.css("top", newHeaderTop);
            if ($("#editable-entity:visible").length) {
                $editableEntity = $("#editable-entity");
                $editableEntity.css("top", newHeaderTop + headerHeight);
                if ($editableEntity.position().top == 0) {
                    $mainHeader.removeClass("sombra");
                    $editableEntity.addClass("sombra");
                    $("#small-brand").stop().fadeIn(100);
                } else {
                    $editableEntity.removeClass("sombra");
                    $("#small-brand").stop().fadeOut(100);
                }
            }
            lastScrollTop = scrollTop;
        }
        $(window).scroll(adjustHeader).resize(adjustHeader);
        adjustHeader();
        window.adjustHeader = adjustHeader;
        $("ul.abas").each(function() {
            var $active, $content, $links = $(this).find("a");
            $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
            $active.parent().addClass("active");
            $content = $($active.attr("href"));
            $links.not($active).each(function() {
                $($(this).attr("href")).hide();
            });
            $links.each(function() {
                $(this).attr("id", "tab-" + $(this).attr("href").replace("#", ""));
            });
            $(this).on("click", "a", function(e) {
                $active.parent().removeClass("active");
                $content.hide();
                $active = $(this);
                $content = $($(this).attr("href"));
                $active.parent().addClass("active");
                $content.show();
                e.preventDefault();
                location.hash = $(this).attr("id").replace("tab-", "tab=");
            });
            $links.each(function() {
                if (location.hash.toString().replace("#", "") === $(this).attr("id").replace("tab-", "tab=")) {
                    $(this).click();
                }
            });
        });
        $(".tag-box div").slimScroll({
            position: "right",
            distance: "0px",
            color: "#000",
            height: "148px",
            alwaysVisible: true,
            railVisible: true
        });
        $(".submenu-dropdown .filter-list").slimScroll({
            position: "right",
            distance: "3px",
            color: "#000",
            height: "222px",
            alwaysVisible: true,
            railVisible: true
        });
        $(".js-slimScroll").each(function() {
            $(this).slimScroll({
                position: "right",
                distance: "0px",
                color: "#000",
                height: "192px"
            });
            $(this).css({
                height: "initial",
                maxHeight: 192
            }).parents(".slimScrollDiv").css({
                height: "initial",
                maxHeight: 216
            });
        });
        $("#share-tools a.icon-share").click(function() {
            if ($("form#share-url").is(":hidden")) {
                $("form#share-url").show();
                var $input = $("form#share-url input");
                $input.on("focus click", function() {
                    window.setTimeout(function() {
                        $input.select();
                    }, 0);
                }).focus();
                event.stopPropagation();
            } else {
                $("form#share-url").hide();
            }
        });
        $("html").on("click", function(event) {
            if (!$(event.target).parents("#share-tools").length) {
                $("form#share-url").hide();
            }
        });
        if ($("#home-search-form").length) {
            $("#campo-de-busca").focus();
            $("#home-search-filter .submenu-dropdown li").click(function() {
                var url_template = $(this).data("searh-url-template") ? $(this).data("searh-url-template") : $("#home-search-filter").data("searh-url-template");
                var params = {
                    entity: $(this).data("entity"),
                    keyword: $("#campo-de-busca").val()
                };
                var search_url = Mustache.render(url_template, params);
                document.location = search_url;
            }).on("keydown", function(event) {
                if (event.keyCode === 13 || event.keyCode === 32) {
                    event.preventDefault();
                    $(this).click();
                } else if (event.keyCode === 27) {
                    $(this).attr("css", "");
                    $(this).blur();
                    $("#campo-de-busca").focus();
                    return false;
                } else if (event.keyCode === 38) {
                    if ($("#home-search-filter .submenu-dropdown li:focus").is($("#home-search-filter .submenu-dropdown li:first"))) {
                        $("#home-search-filter .submenu-dropdown li:last").focus();
                    } else {
                        $("#home-search-filter .submenu-dropdown li:focus").prev().focus();
                    }
                    event.preventDefault();
                } else if (event.keyCode === 40) {
                    if ($("#home-search-filter .submenu-dropdown li:focus").is($("#home-search-filter .submenu-dropdown li:last"))) {
                        $("#home-search-filter .submenu-dropdown li:first").focus();
                    } else {
                        $("#home-search-filter .submenu-dropdown li:focus").next().focus();
                    }
                    event.preventDefault();
                }
            });
            $("#home-search-form").on("submit", function() {
                $(".submenu-dropdown").css({
                    display: "block",
                    opacity: 1
                });
                $(".submenu-dropdown li:first").focus();
                return false;
            });
            $("#home-search-form #campo-de-busca").on("blur", function() {
                $(".submenu-dropdown").attr("style", "");
            });
            $("#home-search-form #campo-de-busca").on("keydown", function(event) {
                var kc = event.keyCode;
                if (event.keyCode === 9) {
                    $(".submenu-dropdown").css({
                        display: "block",
                        opacity: 1
                    });
                }
            });
            var tabindex = 1;
            $(".submenu-dropdown li").each(function() {
                tabindex++;
                $(this).attr("tabindex", tabindex);
                $(this).on("focus", function() {
                    $(".submenu-dropdown").css({
                        display: "block",
                        opacity: 1
                    });
                });
                $(this).on("blur", function() {
                    $(".submenu-dropdown").attr("style", "");
                });
            });
        }
        $("#home-intro div.view-more a").click(function() {
            $("nav#home-nav a.down").click();
            return false;
        });
        if ($(".js-page-menu-item").length) {
            var $items = $(".js-page-menu-item");
            var find_next_page_menu_item = function() {
                var $next_page_item = null;
                $items.each(function() {
                    if ($(this).offset().top - $(window).scrollTop() > $("#main-header").outerHeight(true) + 50) {
                        $next_page_item = $(this);
                        return false;
                    }
                });
                return $next_page_item;
            };
            var find_prev_page_menu_item = function() {
                var $next_page_item = null;
                $items.each(function() {
                    if ($(this).offset().top - $(window).scrollTop() < 0) {
                        $next_page_item = $(this);
                    } else {
                        return false;
                    }
                });
                return $next_page_item;
            };
            var show_hide_scrolls = function(skip_animation) {
                var speed = skip_animation ? 0 : 200;
                find_prev_page_menu_item() ? $("nav#home-nav a.up").animate({
                    opacity: 1
                }, speed) : $("nav#home-nav a.up").animate({
                    opacity: 0
                }, speed);
                if (find_next_page_menu_item()) {
                    $("nav#home-nav a.down").animate(speed);
                    $("nav#home-nav a.down").fadeIn(speed);
                } else {
                    $("nav#home-nav a.down").fadeOut(speed);
                }
            };
            var scroll_timeout = null;
            $(window).scroll(function() {
                clearTimeout(scroll_timeout);
                scroll_timeout = setTimeout(show_hide_scrolls, 100);
            });
            $("nav#home-nav a.down").click(function() {
                var __this = this;
                var $next_page_item = find_next_page_menu_item();
                var scrollto;
                if ($next_page_item) {
                    scrollto = $next_page_item.offset().top;
                    $("html, body").animate({
                        scrollTop: Math.ceil(scrollto)
                    }, 800, function() {
                        nav_mouseenter.apply(__this, [ true ]);
                    });
                }
                return false;
            });
            $("nav#home-nav a.up").click(function() {
                var __this = this;
                var $next_page_item = find_prev_page_menu_item();
                var scrollto;
                if ($next_page_item) {
                    scrollto = $next_page_item.offset().top;
                    $("html, body").animate({
                        scrollTop: Math.ceil(scrollto)
                    }, 800, function() {
                        nav_mouseenter.apply(__this, [ true ]);
                    });
                } else {
                    $("body").animate({
                        scrollTop: 0
                    }, 800, function() {
                        nav_mouseenter.apply(__this, [ true ]);
                    });
                }
                return false;
            });
            $("nav#home-nav a").not(".up").not(".down").click(function() {
                var $target = $($(this).attr("href"));
                scrollto = $target.offset().top - $("#main-header").outerHeight(true);
                if (scrollto > $("body").scrollTop()) scrollto += $("#main-header").outerHeight(true);
                $("html, body").animate({
                    scrollTop: Math.ceil(scrollto)
                });
                return false;
            });
            var nav_mouseenter = function(skip_show) {
                if ($("#page-menu").is(":visible")) return;
                var $page_item = $(this).hasClass("up") ? find_prev_page_menu_item() : find_next_page_menu_item();
                if ($page_item) {
                    if (skip_show !== true) $(this).find(".balao").show();
                    $(this).find(".balao").find(".balao-text").html($page_item.data("menu-label"));
                } else {
                    $(this).find(".balao").hide().find(".balao-text").html("");
                }
            };
            $("nav#home-nav a.up, nav#home-nav a.down").mouseenter(nav_mouseenter).mouseleave(function() {
                $(this).find(".balao").hide().find(".balao-text").html("");
            });
        } else {
            $("nav#home-nav").hide();
        }
        $("#home-nav ul span.nav-title").each(function() {
            $(this).css("margin-left", $(this).width() * -1 + "px");
        });
        $("#home-nav ul li a").hover(function() {
            $(this).siblings("span.nav-title").animate({
                marginLeft: "40px"
            }, "fast");
        }, function() {
            var $slider = $(this).siblings("span.nav-title");
            $slider.animate({
                marginLeft: $slider.width() * -1 + "px"
            }, "fast");
        });
    });
    $(document).ready(function() {
        hl.tip.init();
    });
    hl = {
        tip: {
            init: function() {
                if (window.isTouchDevice) return false;
                $(document.body).on("mouseenter click", ".hltip", function(e) {
                    var tip = $(this).data("tip");
                    var $this = $(this);
                    var _left = $(this).offset().left + $this.outerWidth(true) / 2 + $(document).scrollLeft();
                    var _top = $(this).offset().top;
                    var _height = $(this).height();
                    if (!tip || $(this).hasClass("hltip-auto-update")) {
                        var content = $(this).attr("title") ? $(this).attr("title") : $(this).attr("hltitle");
                        if (content.indexOf(":") > 0) {
                            content = '<div class="hltip-title">' + content.substr(0, content.indexOf(":")) + "</div>" + content.substr(content.indexOf(":") + 1);
                        }
                        tip = $('<div class="hltip-box"><div class="hltip-arrow-top"></div><div class="hltip-text">' + content + '</div><div class="hltip-arrow-bottom"></div></div><').hide();
                        tip.css({
                            position: "absolute",
                            zIndex: 9999
                        });
                        $(document.body).append(tip);
                        tip.css("width", tip.width());
                        $(this).data("tip", tip);
                        $(this).attr("hltitle", content);
                        $(this).attr("title", "");
                        if ($(this).data("hltip-classes")) tip.attr("class", $(this).data("hltip-classes") + " hltip-box");
                    }
                    _left -= tip.width() / 2;
                    if (_left + tip.width() - $(document).scrollLeft() > $(window).width() - 11) tip.css("left", $(window).width() - 11 - tip.width() + $(document).scrollLeft()); else if (_left - $(document).scrollLeft() < 6) tip.css("left", $(document).scrollLeft() + 6); else tip.css("left", _left);
                    var diff = $(this).offset().left + $this.outerWidth(true) / 2 + $(document).scrollLeft() - parseInt(tip.css("left"));
                    if (diff < 1) diff = 1; else if (diff > parseInt(tip.outerWidth()) - 11) diff = parseInt(tip.outerWidth()) - 11;
                    if ($(window).height() + $(document).scrollTop() - 11 < _top + _height + tip.height()) {
                        tip.find(".hltip-arrow-top").hide();
                        tip.find(".hltip-arrow-bottom").show();
                        tip.css("top", _top - tip.height() - 6);
                        tip.find(".hltip-arrow-bottom").css("margin-left", diff - tip.find(".hltip-arrow-bottom").outerWidth() / 2);
                    } else {
                        tip.find(".hltip-arrow-top").show();
                        tip.find(".hltip-arrow-bottom").hide();
                        tip.find(".hltip-arrow-top").css("margin-left", diff - tip.find(".hltip-arrow-top").outerWidth() / 2);
                        tip.css("top", _top + _height + 6);
                    }
                    if (!tip.is(":visible")) {
                        tip.fadeIn("fast");
                    }
                });
                $(document.body).on("mouseleave mouseup", ".hltip", function(e) {
                    if ($(this).data("tip")) $(this).data("tip").fadeOut("fast");
                });
            }
        }
    };
})(jQuery);

MapasCulturais = MapasCulturais || {};

$(function() {
    MapasCulturais.TemplateManager.init();
    MapasCulturais.Modal.initKeyboard(".js-dialog");
    MapasCulturais.Modal.initDialogs(".js-dialog");
    MapasCulturais.Modal.initButtons(".js-open-dialog");
    MapasCulturais.EditBox.initBoxes(".js-editbox");
    MapasCulturais.EditBox.initButtons(".js-open-editbox");
    MapasCulturais.Video.setupVideoGallery(".js-videogallery");
    MapasCulturais.Search.init(".js-search");
    $(".alert .close").click(function() {
        $(this).parent().slideUp("fast");
    }).css("cursor", "pointer");
    if (MapasCulturais.request.controller === "app") {
        MapasCulturais.App.init();
    }
    if (MapasCulturais.request.controller === "project") {
        var $els = $("#tab-inscricoes,#tab-inscritos").parent();
        if (!MapasCulturais.entity.useRegistrations) {
            $els.hide();
        }
        $("#editable-use-registrations").on("hidden", function(e, reason) {
            if ($(this).editable("getValue", true) == "1") {
                $els.fadeIn("fast");
            } else {
                $els.fadeOut("fast");
            }
        });
    }
    $("body").on("click", ".js-submenu-toggle", function() {
        var $self = $(this), $target = eval($self.data("submenu-target"));
        $("body").one("click", function(event) {
            if ($self.find(event.target).length == 0) {
                $target.fadeOut(0);
            }
        });
        $target.fadeToggle(100);
    });
    $("body").on("click", ".dropdown .placeholder", function() {
        var $dropdown = $(this).parents(".dropdown"), $submenu = $dropdown.find(".submenu-dropdown");
        if ($submenu.is(":visible")) {
            $submenu.hide();
        } else {
            $submenu.show();
        }
        if (!$dropdown.data("init")) {
            $dropdown.data("init", true);
            if ($dropdown.data("closeonclick")) {
                $submenu.click(function() {
                    $submenu.hide();
                });
            }
            $("body").on("click", function(event) {
                if ($submenu.find(event.target).length == 0 && $dropdown.find(event.target).length == 0) {
                    $submenu.hide();
                }
            });
        }
    });
    if ($("#funcao-do-agente").length) {
        $("#funcao-do-agente .js-options li").click(function() {
            var roleToRemove = $("#funcao-do-agente .js-selected span").data("role");
            var roleToAdd = $(this).data("role");
            var label = $(this).find("span").html();
            var change = function() {
                $("#funcao-do-agente .js-selected span").html(label);
                $("#funcao-do-agente .js-selected span").data("role", roleToAdd);
            };
            if (roleToRemove) $.post(MapasCulturais.baseURL + "agent/removeRole/" + MapasCulturais.entity.id, {
                role: roleToRemove
            }, function(r) {
                if (r && !r.error) change();
            });
            if (roleToAdd) $.post(MapasCulturais.baseURL + "agent/addRole/" + MapasCulturais.entity.id, {
                role: roleToAdd
            }, function(r) {
                if (r && !r.error) change();
            });
        });
    }
    MapasCulturais.spinnerURL = MapasCulturais.assetURL + "/img/spinner.gif";
    if (navigator.appName != "Microsoft Internet Explorer" && !(navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") !== -1)) {} else {
        $("body").addClass("ie");
        var ua = navigator.userAgent.toLowerCase();
        if (!isNaN(version = parseInt(ua.split("msie")[1]))) {
            $("body").addClass("ie" + version);
        } else if (parseInt(ua.split("rv:")[1]) === 11) {
            $("body").addClass("ie11");
        }
    }
    if (MapasCulturais.entity) {
        MapasCulturais.entity.getTypeName = function() {
            switch (MapasCulturais.request.controller) {
              case "agent":
                return "agente";
                break;

              case "space":
                return "espaço";
                break;

              case "event":
                return "evento";
                break;

              case "project":
                return "projeto";
                break;
            }
        };
    }
});

MapasCulturais.utils = {
    getObjectProperties: function(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    },
    sortOjectProperties: function(obj) {
        var newObj = {};
        this.getObjectProperties(obj).sort().forEach(function(e) {
            newObj[e] = obj[e];
        });
        return newObj;
    },
    isObjectEquals: function(obj1, obj2) {
        return JSON.stringify(this.sortOjectProperties(obj1)) === JSON.stringify(this.sortOjectProperties(obj2));
    },
    inArray: function(array, obj) {
        for (var i in array) {
            if (this.isObjectEquals(array[i], obj)) {
                return true;
            }
        }
        return false;
    },
    arraySearch: function(array, obj) {
        for (var i in array) {
            if (this.isObjectEquals(array[i], obj)) {
                return i;
            }
        }
        return false;
    }
};

MapasCulturais.createUrl = function(controller_id, action_name, args) {
    var shortcuts = this.routes.shortcuts, actions = this.routes.actions, controllers = this.routes.controllers, u = MapasCulturais.utils, route = "";
    action_name = action_name || this.routes.default_action_name;
    if (args) {
        args = u.sortOjectProperties(args);
    }
    if (args && u.inArray(shortcuts, [ controller_id, action_name, args ])) {
        route = u.arraySearch(shortcuts, [ controller_id, action_name, args ]) + "/";
        args = null;
    } else if (u.inArray(shortcuts, [ controller_id, action_name ])) {
        route = u.arraySearch(shortcuts, [ controller_id, action_name ]) + "/";
    } else {
        if (u.inArray(controllers, controller_id)) {
            route = u.arraySearch(controllers, controller_id) + "/";
        } else {
            route = controller_id + "/";
        }
        if (action_name !== this.routes.default_action_name) {
            if (u.inArray(actions, action_name)) {
                route += u.arraySearch(actions, action_name) + "/";
            } else {
                route += action_name + "/";
            }
        }
    }
    if (args) {
        for (var key in args) {
            var val = args[key];
            if (key == parseInt(key)) {
                route += val + "/";
            } else {
                route += key + ":" + val + "/";
            }
        }
    }
    return MapasCulturais.baseURL + route;
};

MapasCulturais.auth = {
    cb: null,
    require: function(cb) {
        MapasCulturais.auth.cb = cb;
        $("#require-authentication").attr("src", MapasCulturais.baseURL + "panel/requireAuth").fadeIn();
    },
    finish: function() {
        if (MapasCulturais.auth.cb) {
            MapasCulturais.auth.cb();
        }
        MapasCulturais.auth.cb = null;
        $("#require-authentication").fadeOut();
    }
};

MapasCulturais.TemplateManager = {
    templates: {},
    init: function() {
        var $templates = $(".js-mustache-template");
        var $this = this;
        $templates.each(function() {
            $this.templates[$(this).attr("id")] = $(this).text();
            $(this).remove();
        });
    },
    getTemplate: function(id) {
        if (this.templates[id]) return this.templates[id]; else return null;
    }
};

MapasCulturais.App = {
    init: function() {
        $(".js-select-on-click").on("click", function() {
            var selector = $(this).data("selectTarget");
            $(selector).trigger("doubleClick");
        });
        if ($(".js-input--app-key").length && $(".js-input--app-key--toggle").length) {
            $(".js-input--app-key--toggle").on("click", function() {
                if ($(".js-input--app-key").attr("type") === "password") {
                    $(".js-input--app-key").attr("type", "text");
                } else {
                    $(".js-input--app-key").attr("type", "password");
                }
                return false;
            });
        }
    }
};

MapasCulturais.defaultAvatarURL = MapasCulturais.assets.avatarAgent;

function editableEntityAddHash() {
    $("#editable-entity").find(".js-toggle-edit").each(function() {
        var href = $(this).attr("href"), cleanHref = href.indexOf("#") !== -1 ? href.split("#")[0] : href;
        $(this).attr("href", cleanHref + location.hash);
    });
}

jQuery(document).ready(function() {
    editableEntityAddHash();
    $(window).on("hashchange", function() {
        editableEntityAddHash();
    });
});

MapasCulturais.Messages = {
    delayToFadeOut: 5e3,
    fadeOutSpeed: "slow",
    showMessage: function(type, message) {
        var $container = $("#editable-entity");
        var $message = $('<div class="alert ' + type + '">"').html(message);
        var $mainSection = $("#main-section");
        var delayToFadeOut = this.delayToFadeOut;
        $container.append($message);
        if ($container.hasClass("js-not-editable")) {
            $container.slideDown("fast");
            $mainSection.animate({
                marginTop: parseInt($mainSection.css("margin-top")) + 42
            }, "fast", function() {
                $message.css("display", "inline-block").css("display", "inline-block").delay(delayToFadeOut).fadeOut(this.fadeOutSpeed, function() {
                    $(this).remove();
                    if ($container.find(">").length === 0) {
                        $container.slideUp("fast");
                        $mainSection.animate({
                            marginTop: parseInt($mainSection.css("margin-top")) - 42
                        }, "fast");
                    }
                });
            });
        } else {
            $message.css("display", "inline-block").css("display", "inline-block").delay(delayToFadeOut).fadeOut(this.fadeOutSpeed, function() {
                $(this).remove();
            });
        }
    },
    success: function(message) {
        this.showMessage("success", message);
    },
    error: function(message) {
        this.showMessage("danger", message);
    },
    help: function(message) {
        this.showMessage("info", message);
    },
    alert: function(message) {
        this.showMessage("warning", message);
    }
};

MapasCulturais.confirm = function(message, cb) {
    if (confirm(message)) cb();
};

MapasCulturais.Modal = {
    time: "fast",
    initKeyboard: function(selector) {
        $(document.body).keyup(function(e) {
            if (e.keyCode == 27) {
                $(selector).each(function() {
                    if ($(this).is(":visible")) {
                        $(this).find(".js-close").click();
                    }
                });
            }
        });
    },
    initDialogs: function(selector) {
        $(selector).each(function() {
            $("body").append($(this));
            if ($(this).find(".js-dialog-disabled").length) return;
            if ($(this).data("dialog-init")) return;
            var $dialog = $(this);
            $dialog.data("dialog-init", 1);
            $dialog.prepend("<h2>" + $(this).attr("title") + "</h2>");
            $dialog.prepend('<a href="#" class="js-close icon icon-close"></a>');
            $dialog.find(".js-close").click(function() {
                MapasCulturais.Modal.close(selector);
                return false;
            });
        });
    },
    initButtons: function(selector) {
        if ($(selector).data("button-initialized")) return false; else $(selector).data("button-initialized", true);
        $(selector).each(function() {
            var dialog_selector = $(this).data("dialog");
            var $dialog = $(dialog_selector);
            if ($dialog.find(".js-dialog-disabled").length) $(this).addClass("inactive").addClass("hltip").attr("title", $dialog.find(".js-dialog-disabled").data("message"));
        });
        $(selector).click(function() {
            if ($(this).hasClass("inactive")) return false;
            var dialog_selector = $(this).data("dialog");
            MapasCulturais.Modal.open(dialog_selector);
            if ($(this).data("dialog-callback")) eval($(this).data("dialog-callback"))($(this));
            return false;
        });
    },
    close: function(selector) {
        $("body").css("overflow", "auto");
        var $dialog = $(selector);
        $dialog.find(".editable").editable("hide");
        $dialog.hide();
        return;
    },
    open: function(selector) {
        var $dialog = $(selector);
        $dialog.find("div.alert.danger").html("").hide();
        $dialog.find(".js-ajax-upload-progress").hide();
        $dialog.css("opacity", 0).show();
        setTimeout(function() {
            var top = $dialog.height() + 100 > $(window).height() ? $(window).scrollTop() + 100 : $(window).scrollTop() + ($(window).height() - $dialog.height()) / 2 - 50;
            $dialog.css({
                top: top,
                left: "50%",
                marginLeft: -$dialog.width() / 2,
                opacity: 1
            });
        }, 25);
        return;
    }
};

MapasCulturais.EditBox = {
    time: "fast",
    setPosition: function($box, target) {
        if ($box.hasClass("mc-left")) {
            $box.position({
                my: "right-10 center",
                at: "left center",
                of: target
            });
        } else if ($box.hasClass("mc-right")) {
            $box.position({
                my: "left+10 center",
                at: "right center",
                of: target
            });
        } else if ($box.hasClass("mc-top")) {
            $box.position({
                my: "center bottom-10",
                at: "center top",
                of: target
            });
        } else if ($box.hasClass("mc-bottom")) {
            $box.position({
                my: "center top+10",
                at: "center bottom",
                of: target
            });
        }
    },
    initKeyboard: function(selector) {
        $(document.body).keyup(function(e) {
            if (e.keyCode == 27) {
                $(selector).each(function() {
                    if ($(this).is(":visible")) {
                        $(this).find(".js-close").click();
                    }
                });
            }
        });
    },
    initBoxes: function(selector) {
        $(selector).each(function() {
            var $dialog = $(this);
            if ($dialog.find(".js-dialog-disabled").length) return;
            if ($dialog.data("dialog-init")) return;
            if ($dialog.data("init")) return;
            $dialog.data("init", true);
            $dialog.addClass("edit-box");
            $dialog.data("dialog-init", 1);
            if ($dialog.attr("title")) {
                $dialog.prepend("<header><h1>" + $(this).attr("title") + "</h1></header>");
            }
            var submit_label = $dialog.data("submit-label") ? $dialog.data("submit-label") : "Enviar";
            var cancel_label = $dialog.data("cancel-label") ? $dialog.data("cancel-label") : "Cancelar";
            $dialog.append('<footer><button class="mc-cancel btn btn-default">' + cancel_label + '</button> <button type="submit" class="mc-submit">' + submit_label + '</button> </footer><div class="mc-arrow"></div>');
            $dialog.find(".mc-cancel").click(function() {
                MapasCulturais.EditBox.close($dialog);
                return false;
            });
            $dialog.find("footer button.mc-submit").click(function() {
                $dialog.find("form").submit();
            });
        });
    },
    initButtons: function(selector) {
        $(selector).each(function() {
            var $button = $(this);
            var dialog_selector = $(this).data("target");
            var $dialog = $(dialog_selector);
            if ($dialog.find(".js-dialog-disabled").length) $(this).addClass("inactive").addClass("hltip").attr("title", $dialog.find(".js-dialog-disabled").data("message"));
        });
        $(selector).click(function() {
            var $button = $(this);
            if ($button.hasClass("inactive")) return false;
            var dialog_selector = $button.data("target");
            MapasCulturais.EditBox.open(dialog_selector, $button);
            if ($button.data("dialog-title")) $(dialog_selector).find("header h1").html($button.data("dialog-title"));
            if ($button.data("dialog-callback")) eval($button.data("dialog-callback"))($button);
            return false;
        });
    },
    close: function(selector) {
        $("body").css("overflow", "auto");
        var $dialog = $(selector);
        $dialog.find(".editable").editable("hide");
        $dialog.hide();
        return;
    },
    open: function(selector, $button) {
        var $dialog = $(selector);
        $dialog.find("div.alert.danger").html("").hide();
        MapasCulturais.AjaxUploader.resetProgressBar(selector);
        $dialog.show();
        $dialog.find("input,textarea").not(":hidden").first().focus();
        $dialog.css("opacity", 0);
        MapasCulturais.EditBox.setPosition($dialog, $button);
        setTimeout(function() {
            MapasCulturais.EditBox.setPosition($dialog, $button);
            $dialog.css("opacity", 1);
        }, 25);
        return;
    }
};

MapasCulturais.Video = {
    collection: {},
    parseURL: function(url) {
        return purl(url);
    },
    isYoutube: function(parsedURL) {
        return parsedURL.attr("host").indexOf("youtube") != -1;
    },
    getYoutubeData: function(youtubeVideoID) {
        return {
            thumbnalURL: "http://img.youtube.com/vi/" + videoID + "/0.jpg",
            playerURL: "//www.youtube.com/embed/" + videoID + "?html5=1"
        };
    },
    getVideoBasicData: function(url) {
        var parsedURL = this.parseURL(url);
        var host = parsedURL.attr("host");
        var provider = "";
        var videoID = "";
        if (parsedURL.attr("host").indexOf("youtube") != -1) {
            provider = "youtube";
            videoID = parsedURL.param("v");
        } else if (parsedURL.attr("host").indexOf("vimeo") != -1) {
            provider = "vimeo";
            videoID = parsedURL.attr("path").split("/")[1];
        }
        return {
            parsedURL: parsedURL,
            provider: provider,
            videoID: videoID
        };
    },
    setupVideoGallery: function(gallerySelector) {
        if ($(gallerySelector).length == 0) return false;
        $(gallerySelector + " .js-metalist-item-display").each(function() {
            MapasCulturais.Video.getAndSetVideoData($(this).data("videolink"), $(this).parent(), MapasCulturais.Video.setupVideoGalleryItem);
        });
        var $firstItem = $(gallerySelector + " .js-metalist-item-display:first").parent();
        if (!$firstItem.length) {
            $("#video-player").hide();
            return false;
        }
        $("iframe#video_display").attr("src", $firstItem.data("player-url"));
        $firstItem.addClass("active");
    },
    setupVideoGalleryItem: function(videoData, $element) {
        $element.attr("href", "#video");
        $element.data("player-url", videoData.playerURL);
        $element.find("img").attr("src", videoData.thumbnailURL);
        var video_id = $element.attr("id");
        $element.on("click", function() {
            $("iframe#video_display").attr("src", videoData.playerURL);
            $("iframe#video_display").data("open-video", $(this).attr("id"));
            $(this).parent().find(".active").removeClass("active");
            $(this).addClass("active");
        });
        var $container = $element.parent();
        if ($element.find(".js-remove-item").length) {
            $element.find(".js-remove-item").data("remove-callback", function() {
                if ($("iframe#video_display").data("open-video") == video_id) $("iframe#video_display").attr("src", "");
                if ($container.find(">li").length == 0) $("#video-player").hide();
            });
        }
        if ($container.find(">li").length == 1) {
            $element.addClass("active");
            $("iframe#video_display").attr("src", videoData.playerURL);
        }
    },
    setTitle: function(videoData, $element) {
        $element.val(videoData.videoTitle);
    },
    getAndSetVideoData: function(videoURL, $element, callback) {
        videoURL = videoURL.trim();
        var videoData = {
            parsedURL: purl(videoURL),
            provider: "",
            videoID: "",
            thumbnailURL: "",
            playerURL: "",
            details: {}
        };
        if (videoData.parsedURL.attr("host").indexOf("youtube") != -1) {
            videoData.provider = "youtube";
            videoData.videoID = videoData.parsedURL.param("v");
            videoData.thumbnailURL = "http://img.youtube.com/vi/" + videoData.videoID + "/0.jpg";
            videoData.playerURL = "//www.youtube.com/embed/" + videoData.videoID + "?html5=1";
            callback(videoData, $element);
            $.getJSON("https://gdata.youtube.com/feeds/api/videos/" + videoData.videoID + "?v=2&alt=json", function(data) {
                videoData.details = data;
                videoData.videoTitle = data.entry.title.$t;
                MapasCulturais.Video.collection[videoURL] = videoData;
                callback(videoData, $element);
                return videoData;
            });
        } else if (videoData.parsedURL.attr("host").indexOf("vimeo") != -1) {
            videoData.provider = "vimeo";
            var tmpArray = videoData.parsedURL.attr("path").split("/");
            videoData.videoID = tmpArray[tmpArray.length - 1];
            $.getJSON("http://www.vimeo.com/api/v2/video/" + videoData.videoID + ".json?callback=?", {
                format: "json"
            }, function(data) {
                videoData.details = data[0];
                videoData.thumbnailURL = data[0].thumbnail_small;
                videoData.playerURL = "//player.vimeo.com/video/" + videoData.videoID + "";
                videoData.videoTitle = data[0].title;
                callback(videoData, $element);
                MapasCulturais.Video.collection[videoURL] = videoData;
                return videoData;
            });
        } else {
            videoData.thumbnailURL = "http://www.bizreport.com/images/shutterstock/2013/04/onlinevideo_135877229-thumb-380xauto-2057.jpg";
            callback(videoData, $element);
            return videoData;
        }
        var withDetails = function() {
            if (!videoData.details) {
                $.getJSON("https://gdata.youtube.com/feeds/api/videos/" + videoData.videoID + "?v=2&alt=json", {
                    format: "json"
                }, function(data) {
                    videoData.details = data;
                    functionName(videoData, $element);
                    return videoData;
                });
            }
        };
    }
};

MapasCulturais.Search = {
    limit: 10,
    init: function(selector) {
        if ($(selector).length === 0 || $(selector).hasClass("select2-offscreen")) return false;
        $(selector).each(function() {
            var $selector = $(this);
            $selector.editable({
                type: "select2",
                name: $selector.data("field-name") ? $selector.data("field-name") : null,
                select2: {
                    width: $selector.data("search-box-width"),
                    placeholder: $selector.data("search-box-placeholder"),
                    minimumInputLength: 0,
                    allowClear: $selector.data("allow-clear"),
                    initSelection: function(e, cb) {
                        cb({
                            id: $selector.data("value"),
                            name: $selector.data("editable").$element.html()
                        });
                    },
                    ajax: {
                        url: function() {
                            var format = $selector.data("selection-format");
                            var apiMethod = "find";
                            if (MapasCulturais.Search.formats[format] && MapasCulturais.Search.formats[format].apiMethod) apiMethod = MapasCulturais.Search.formats[format].apiMethod;
                            return MapasCulturais.baseURL + "api/" + $selector.data("entity-controller") + "/" + apiMethod;
                        },
                        dataType: "json",
                        quietMillis: 350,
                        data: function(term, page) {
                            var searchParams = MapasCulturais.Search.getEntityController(term, page, $selector);
                            var format = $selector.data("selection-format");
                            if (MapasCulturais.Search.formats[format] && MapasCulturais.Search.formats[format].ajaxData) searchParams = MapasCulturais.Search.formats[format].ajaxData(searchParams, $selector); else searchParams = MapasCulturais.Search.ajaxData(searchParams, $selector);
                            return searchParams;
                        },
                        results: function(data, page) {
                            var more = data.length == MapasCulturais.Search.limit;
                            return {
                                results: data,
                                more: more
                            };
                        }
                    },
                    formatResult: function(entity) {
                        var format = $selector.data("selection-format");
                        if (MapasCulturais.Search.formats[format] && MapasCulturais.Search.formats[format].result) return MapasCulturais.Search.formats[format].result(entity, $selector); else return MapasCulturais.Search.formatResult(entity, $selector);
                    },
                    formatSelection: function(entity) {
                        var format = $selector.data("selection-format");
                        return MapasCulturais.Search.formats[format].selection(entity, $selector);
                    },
                    formatNoMatches: function(term) {
                        var format = $selector.data("selection-format");
                        return MapasCulturais.Search.formats[format].noMatches(term, $selector);
                    },
                    escapeMarkup: function(m) {
                        return m;
                    }
                }
            });
            if ($selector.data("disable-buttons")) {
                $selector.on("shown", function(e, editable) {
                    var format = $selector.data("selection-format");
                    e.stopPropagation();
                    if (arguments.length == 2) {
                        setTimeout(function() {
                            editable.input.$input.parents(".control-group").addClass("editable-popup-botoes-escondidos");
                        }, 0);
                        setTimeout(function() {
                            editable.input.$input.select2("open");
                        }, 200);
                        editable.input.$input.on("select2-close", function() {
                            setTimeout(function() {
                                $selector.editable("hide");
                            }, 200);
                        });
                    }
                });
            }
            if ($selector.data("auto-open")) {
                $selector.on("shown", function(e, editable) {
                    setTimeout(function() {
                        editable.input.$input.select2("open");
                    }, 200);
                });
            }
            var format = $selector.data("selection-format");
            $selector.on("save", function() {
                try {
                    MapasCulturais.Search.formats[format].onSave($selector);
                } catch (e) {
                    console.log("EXECEPTION: ", e.message);
                }
            });
            $selector.on("hidden", function() {
                try {
                    MapasCulturais.Search.formats[format].onHidden($selector);
                } catch (e) {
                    console.log("EXECEPTION: ", e.message);
                }
            });
        });
    },
    getEntityController: function(term, page, $selector) {
        var entitiyControllers = {
            "default": {
                name: "ilike(*" + term.replace(" ", "*") + "*)",
                "@select": "id,name,terms,type",
                "@limit": MapasCulturais.Search.limit,
                "@page": page,
                "@order": "name ASC",
                "@files": "(avatar.avatarSmall):url"
            },
            agent: {
                name: "ilike(*" + term.replace(" ", "*") + "*)",
                "@select": "id,name,terms,type",
                "@limit": MapasCulturais.Search.limit,
                "@page": page,
                "@order": "name ASC",
                "@files": "(avatar.avatarSmall):url"
            }
        };
        if (entitiyControllers[$selector.data("entity-controller")]) {
            return entitiyControllers[$selector.data("entity-controller")];
        } else {
            return entitiyControllers["default"];
        }
    },
    processEntity: function(entity, $selector) {
        entity.areas = function() {
            if (this.terms && this.terms.area) return this.terms.area.join(", "); else return "";
        };
        entity.linguagens = function() {
            if (this.terms && this.terms.linguagem) return this.terms.linguagem.join(", "); else return "";
        };
        entity.tags = function() {
            if (this.terms && this.terms.tags) return this.terms.tags.join(", "); else return "";
        };
        entity.thumbnail = function() {
            var entityDefaultAvatar = MapasCulturais.assets["avatar" + $selector.data("entity-controller")[0].toUpperCase() + $selector.data("entity-controller").slice(1)];
            if (this["@files:avatar.avatarSmall"]) return this["@files:avatar.avatarSmall"].url; else return entityDefaultAvatar;
        };
    },
    renderTemplate: function(template, entity, $selector) {
        this.processEntity(entity, $selector);
        return Mustache.render(template, entity);
    },
    getEntityThumbnail: function(entity, thumbName) {
        if (!entity.files || entity.files.length == 0 || !entity.files[thumbName] || entity.files[thumbName].length == 0) return ""; else {
            if (entity.files[thumbName].files["avatarSmall"]) return entity.files[thumbName].files["avatarSmall"].url;
        }
    },
    formatResult: function(entity, $selector) {
        var searchResultTemplate = $($selector.data("search-result-template")).text();
        return this.renderTemplate(searchResultTemplate, entity, $selector);
    },
    ajaxData: function(searchParams, $selector) {
        var excludedIds = MapasCulturais.request.controller === $selector.data("entity-controller") && MapasCulturais.entity.id ? [ MapasCulturais.entity.id ] : [];
        if (excludedIds.length > 0) searchParams.id = "!in(" + excludedIds.toString() + ")";
        return searchParams;
    },
    formats: {
        chooseProject: {
            onSave: function($selector) {
                var entity = $selector.data("entity");
                $selector.data("value", entity.id);
                $selector.data("value-name", entity.name);
            },
            selection: function(entity, $selector) {
                $selector.data("entity", entity);
                return entity.name;
            },
            noMatches: function(term, $selector) {
                return "Nenhum projeto encontrado.";
            },
            onClear: function($selector) {},
            ajaxData: function(searchParams) {
                searchParams["@permissions"] = "requestEventRelation";
                return searchParams;
            }
        },
        chooseSpace: {
            onSave: function($selector) {
                var entity = $selector.data("entity"), avatarUrl = MapasCulturais.defaultAvatarURL, shortDescription = entity.shortDescription ? entity.shortDescription.replace("\n", "<br/>") : "";
                $selector.data("value", entity.id);
                try {
                    avatarUrl = entity.files.avatar.files.avatarSmall.url;
                } catch (e) {}
                $selector.parents(".js-space").find(".js-space-avatar").attr("src", avatarUrl);
                $selector.parents(".js-space").find(".js-space-description").html(shortDescription);
                $selector.parents("form").find('input[name="spaceId"]').val(entity.id);
            },
            onHidden: function($selector) {
                $selector.removeClass("editable-unsaved");
            },
            selection: function(entity, $selector) {
                $selector.data("entity", entity);
                return entity.name;
            },
            noMatches: function(term, $selector) {
                return "Nenhum espaço encontrado.";
            },
            onClear: function($selector) {},
            ajaxData: function(searchParams, $selector) {
                if ($selector.data("value")) {
                    searchParams.id = "!in(" + $selector.data("value") + ")";
                }
                searchParams["@select"] += ",shortDescription";
                return searchParams;
            }
        },
        createAgentRelation: {
            selection: function(entity, $selector) {
                var $selectionTarget = $($selector.data("selection-target"));
                var targetAction = $selector.data("target-action");
                var selectionTemplate = $($selector.data("selection-template")).text();
                var groupname = $selector.parents(".js-related-group").find(".js-related-group-name").text();
                $.post(MapasCulturais.baseURL + MapasCulturais.request.controller + "/createAgentRelation/id:" + MapasCulturais.entity.id, {
                    agentId: entity.id,
                    group: groupname,
                    has_control: "0"
                });
                if (targetAction == "append") {
                    MapasCulturais.RelatedAgents.addAgentToGroup(groupname, entity);
                    return $selector.data("search-box-placeholder");
                } else {
                    $selectionTarget.html(markup);
                    return entity.name;
                }
            },
            noMatches: function(term, $selector) {
                var noResultTemplate = $($selector.data("no-result-template")).text();
                $("#dialog-adicionar-integrante").data("group-element", $selector.parents(".js-related-group").find(".js-relatedAgentsContainer"));
                return noResultTemplate.replace("{{group}}", $selector.parents(".js-related-group").find(".js-related-group-name").text());
            },
            ajaxData: function(searchParams, $selector) {
                var group = $selector.parents(".js-related-group").find(".js-related-group-name").text();
                var excludedIds = MapasCulturais.request.controller === "agent" && MapasCulturais.entity.id ? [ MapasCulturais.entity.id ] : [];
                try {
                    if (MapasCulturais.agentRelationGroupExludeIds[group]) excludedIds = excludedIds.concat(MapasCulturais.agentRelationGroupExludeIds[group]);
                } catch (e) {}
                excludedIds = excludedIds.concat($selector.parents(".js-related-group").find(".agentes .avatar").map(function() {
                    return $(this).data("id");
                }).toArray());
                if (excludedIds.length > 0) searchParams.id = "!in(" + excludedIds.toString() + ")";
                return searchParams;
            }
        },
        parentSpace: {
            selection: function(entity, $selector) {
                return entity.name;
            },
            noMatches: function(term, $selector) {
                return "Nenhum espaço encontrado.";
            },
            onClear: function($selector) {},
            ajaxData: function(searchParams, $selector) {
                if (MapasCulturais.entity.id) {
                    var excludeIds = [ MapasCulturais.entity.id ].concat(MapasCulturais.entity.childrenIds);
                    if (excludeIds) {
                        searchParams["id"] = "!IN(" + excludeIds + ")";
                    }
                }
                return searchParams;
            }
        },
        parentProject: {
            selection: function(entity, $selector) {
                return entity.name;
            },
            noMatches: function(term, $selector) {
                return "Nenhum projeto encontrado.";
            },
            onClear: function($selector) {},
            ajaxData: function(searchParams, $selector) {
                if (MapasCulturais.entity.id) {
                    var excludeIds = [ MapasCulturais.entity.id ].concat(MapasCulturais.entity.childrenIds);
                    if (excludeIds) {
                        searchParams["id"] = "!IN(" + excludeIds + ")";
                    }
                }
                return searchParams;
            }
        },
        projectRegistration: {
            onSave: function($selector) {
                var entity = $selector.data("entity"), avatarUrl = MapasCulturais.defaultAvatarURL, shortDescription = entity.shortDescription.replace("\n", "<br/>");
                $("#registration-agent-id").val(entity.id);
            },
            onHidden: function($selector) {
                $selector.removeClass("editable-unsaved");
            },
            selection: function(entity, $selector) {
                $selector.data("entity", entity);
                return entity.name;
            },
            noMatches: function(term, $selector) {
                return "Nenhum agente encontrado.";
            },
            onClear: function($selector) {},
            ajaxData: function(searchParams, $selector) {
                var excludedIds = MapasCulturais.request.controller === "agent" && MapasCulturais.entity.id ? [ MapasCulturais.entity.id ] : [];
                excludedIds.push($selector.data("value"));
                if (excludedIds.length > 0) searchParams.id = "!in(" + excludedIds.toString() + ")";
                if (!MapasCulturais.cookies.get("mapasculturais.adm")) searchParams.user = "eq(@me)";
                if ($selector.data("profiles-only")) searchParams.isUserProfile = "eq(true)";
                searchParams["@select"] += ",shortDescription,";
                return searchParams;
            }
        },
        changeOwner: {
            onSave: function($selector) {
                var entity = $selector.data("entity"), avatarUrl = MapasCulturais.defaultAvatarURL, shortDescription = entity.shortDescription.replace("\n", "<br/>");
                $selector.data("value", entity.id);
                try {
                    avatarUrl = entity.files.avatar.files.avatarSmall.url;
                } catch (e) {}
                $selector.parents(".js-owner").find(".js-owner-avatar").attr("src", avatarUrl);
                $selector.parents(".js-owner").find(".js-owner-description").html(shortDescription);
            },
            selection: function(entity, $selector) {
                $selector.data("entity", entity);
                return entity.name;
            },
            noMatches: function(term, $selector) {
                return "Nenhum agente encontrado.";
            },
            onClear: function($selector) {},
            ajaxData: function(searchParams, $selector) {
                var excludedIds = [ $selector.editable("getValue").ownerId ];
                if (MapasCulturais.request.controller === "agent" && MapasCulturais.entity.id) {
                    excludedIds.push(MapasCulturais.entity.id);
                    if (MapasCulturais.entity.childrenIds) {
                        excludedIds = excludedIds.concat(MapasCulturais.entity.childrenIds);
                    }
                }
                if (excludedIds.length > 0) searchParams.id = "!in(" + excludedIds.toString() + ")";
                searchParams["@select"] += ",shortDescription";
                searchParams["@permissions"] = "@control";
                return searchParams;
            }
        }
    }
};

MapasCulturais.cookies = {
    get: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    set: function(key, value, options) {
        options = $.extend({}, options);
        if (value == null) {
            options.expires = -1;
        }
        if (typeof options.expires === "number") {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
            options.expires = options.expires.toUTCString();
        } else {
            options.expires = "Session";
        }
        value = String(value);
        return document.cookie = [ encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
    }
};

jQuery(document).ready(function() {
    if ($("body").hasClass("action-search")) {
        MapasCulturais.Map.initialize({
            mapSelector: ".js-map",
            locateMeControl: false,
            exportToGlobalScope: true,
            mapCenter: MapasCulturais.mapCenter
        });
    }
});

(function(angular) {
    var app = angular.module("ng-mapasculturais", []);
    app.config([ "$httpProvider", function($httpProvider) {
        $httpProvider.responseInterceptors.push([ "$q", "$rootScope", function($q, $rootScope) {
            return function(promise) {
                $rootScope.$broadcast("event:startProgress");
                return promise.then(function(response) {
                    $rootScope.$broadcast("event:endProgress");
                    return response;
                }, function(response) {
                    $rootScope.$broadcast("event:endProgress");
                    return $q.reject(response);
                });
            };
        } ]);
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("mc.module.notifications", []);
    module.factory("NotificationService", [ "$log", "$http", "$q", "$rootScope", function($log, $http, $q, $rootScope) {
        var service = {};
        service.url = MapasCulturais.baseURL + "notification/";
        service.get = function() {
            var deferred = $q.defer();
            $http.get(MapasCulturais.baseURL + "api/notification/find/?&@select=id,status,isRequest,createTimestamp,message,approveUrl,request.permissionTo.approve,request.permissionTo.reject,request.requesterUser.id&user=eq(@me)&@ORDER=createTimestamp%20DESC").success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("There was an error");
            });
            return deferred.promise;
        };
        service.updateOne = function(id, action) {
            var deferred = $q.defer();
            $http.get(service.url + action + "/" + id).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("There was an error");
            });
            return deferred.promise;
        };
        return service;
    } ]);
    module.controller("NotificationController", [ "$log", "$sce", "$scope", "$rootScope", "$interval", "NotificationService", function($log, $sce, $scope, $rootScope, $interval, NotificationService) {
        $scope.panelURI = MapasCulturais.baseURL + "panel";
        $scope.MapasCulturais = MapasCulturais;
        MapasCulturais.notifications.forEach(function(value, index) {
            MapasCulturais.notifications[index].message = $sce.trustAsHtml(value.message);
        });
        $scope.data = MapasCulturais.notifications;
        var getNotifications = function() {
            NotificationService.get().then(function(data) {
                if (data) {
                    data.forEach(function(value, index) {
                        data[index].message = $sce.trustAsHtml(value.message);
                    });
                    $scope.data = data;
                }
            });
        };
        $interval(function() {
            getNotifications();
        }, 60 * 1e3);
        $scope.approve = function(id) {
            NotificationService.updateOne(id, "approve").then(getNotifications);
        };
        $scope.reject = function(id) {
            NotificationService.updateOne(id, "reject").then(getNotifications);
        };
        $scope.delete = function(id) {
            NotificationService.updateOne(id, "delete").then(getNotifications);
        };
        $scope.adjustScroll = function() {
            jQuery(".notifications .submenu ul").slimScroll({
                position: "right",
                distance: "0px",
                color: "#000",
                height: "316px",
                alwaysVisible: true,
                railVisible: true
            });
        };
    } ]);
    module.directive("onLastRepeat", function() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                scope.$evalAsync(attrs.onLastRepeat);
            }
        };
    });
    angular.element(document).ready(function() {
        var app = null;
        [ "search.app", "entity.app" ].forEach(function(moduleName) {
            if (!app) {
                try {
                    app = angular.module(moduleName);
                } catch (e) {}
            }
        });
        if (!app) {
            var ctrl = document.querySelector("[ng-controller=NotificationController]");
            if (ctrl && !angular.element(ctrl.parentElement).scope()) {
                angular.bootstrap(ctrl.parentElement, [ "mc.module.notifications" ]);
            }
        }
        app = angular.module("mc.module.notifications");
    });
})(angular);

(function($) {
    MapasCulturais.Map = {};
    L.Icon.Default.imagePath = MapasCulturais.assetURL + "img/";
    MapasCulturais.Map.initialize = function(initializerOptions) {
        var config = MapasCulturais.mapsDefaults, mapSelector = initializerOptions.mapSelector, defaultIconOptions = {
            shadowUrl: MapasCulturais.assets.pinShadow,
            iconSize: [ 35, 43 ],
            shadowSize: [ 40, 16 ],
            iconAnchor: [ 20, 30 ],
            shadowAnchor: [ 6, 3 ],
            popupAnchor: [ -3, -76 ]
        }, iconTypeMapping = {
            agent: MapasCulturais.assets.pinAgent,
            coletivo: MapasCulturais.assets.pinAgent,
            space: MapasCulturais.assets.pinSpace,
            event: MapasCulturais.assets.pinEvent,
            location: MapasCulturais.assets.pinMarker
        };
        MapasCulturais.Map.iconOptions = {};
        for (var iconType in iconTypeMapping) {
            var opts = JSON.parse(JSON.stringify(defaultIconOptions));
            opts.iconUrl = iconTypeMapping[iconType];
            MapasCulturais.Map.iconOptions[iconType] = {
                icon: L.icon(opts)
            };
        }
        if (initializerOptions.exportToGlobalScope) {
            window.leaflet = {};
            window.leaflet.iconOptions = MapasCulturais.Map.iconOptions;
        }
        $(mapSelector).each(function() {
            if ($(this).data("init")) {
                return;
            }
            $(this).data("init", true);
            var id = $(this).attr("id");
            var isEditable = initializerOptions.isMapEditable === false ? false : MapasCulturais.isEditable;
            if (!isEditable) $("#" + id + ":active").css({
                cursor: "default"
            });
            var $dataTarget = $("#map-target");
            var isPositionDefined = $(this).data("lat") ? true : false;
            var defaultZoom = isPositionDefined ? config.zoomPrecise : config.zoomDefault;
            var defaultLocateMaxZoom = config.zoomPrecise;
            var defaultAproximatePrecisionZoom = config.zoomApproximate;
            var defaultMaxCircleRadius = 1e3;
            var mapCenter = isPositionDefined ? new L.LatLng($(this).data("lat"), $(this).data("lng")) : new L.LatLng(config.latitude, config.longitude);
            var options = $(this).data("options") ? $(this).data("options") : {
                dragging: true,
                zoomControl: true,
                doubleClickZoom: true,
                scrollWheelZoom: true
            };
            var locateMeControl = initializerOptions.locateMeControl ? true : false;
            if (initializerOptions.mapCenter) {
                options.center = new L.LatLng(initializerOptions.mapCenter.lat, initializerOptions.mapCenter.lng);
            } else {
                options.center = mapCenter;
            }
            options.zoom = defaultZoom;
            options.zoomControl = false;
            options.minZoom = config.zoomMin;
            var openStreetMap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                attribution: 'Dados e Imagens &copy; <a href="http://www.openstreetmap.org/copyright">Contrib. OpenStreetMap</a>, ',
                maxZoom: config.zoomMax
            });
            var map = new L.Map(id, options).addLayer(openStreetMap);
            $(this).data("leaflet-map", map);
            var timeout;
            $(window).scroll(function() {
                map.scrollWheelZoom.disable();
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    if (!MapasCulturais.reenableScrollWheelZoom) map.scrollWheelZoom.enable();
                }, 400);
            });
            var marker = new L.marker(map.getCenter(), {
                draggable: isEditable && MapasCulturais.request.controller !== "event"
            });
            var markerIcon = {};
            if (MapasCulturais.request.controller == "agent" || MapasCulturais.request.controller == "space") markerIcon = MapasCulturais.Map.iconOptions[MapasCulturais.request.controller].icon; else if (MapasCulturais.request.controller == "event") markerIcon = MapasCulturais.Map.iconOptions["space"].icon;
            if (Object.keys(markerIcon).length) {
                marker.setIcon(markerIcon);
                map.addLayer(marker);
            }
            if (isPositionDefined) {
                marker.setLatLng(mapCenter).addTo(map);
            }
            marker.on("move", function(e) {
                if (isEditable) {
                    $dataTarget.editable("setValue", [ e.latlng.lng, e.latlng.lat ]);
                }
            });
            map.on("locationfound", function(e) {
                var radius = e.accuracy / 2;
                if (true || radius > defaultMaxCircleRadius) radius = defaultMaxCircleRadius;
                marker.setLatLng(e.latlng);
            });
            map.on("locationerror", function(e) {});
            map.on("click", function(e) {
                if (isEditable && MapasCulturais.request.controller !== "event") marker.setLatLng(e.latlng);
            });
            $("#locate-me").click(function() {
                map.locate({
                    setView: true,
                    maxZoom: defaultLocateMaxZoom
                });
            });
            L.Polygon.prototype.getCenter = function() {
                var pts = this._latlngs;
                var off = pts[0];
                var twicearea = 0;
                var x = 0;
                var y = 0;
                var nPts = pts.length;
                var p1, p2;
                var f;
                for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
                    p1 = pts[i];
                    p2 = pts[j];
                    f = (p1.lat - off.lat) * (p2.lng - off.lng) - (p2.lat - off.lat) * (p1.lng - off.lng);
                    twicearea += f;
                    x += (p1.lat + p2.lat - 2 * off.lat) * f;
                    y += (p1.lng + p2.lng - 2 * off.lng) * f;
                }
                f = twicearea * 3;
                return new L.LatLng(x / f + off.lat, y / f + off.lng);
            };
            var geocoder = null;
            if (typeof google !== "undefined") geocoder = new google.maps.Geocoder();
            function geocode_callback(results, status) {
                if (typeof google === "undefined") {
                    return false;
                }
                if (status == google.maps.GeocoderStatus.OK) {
                    var location = results[0].geometry.location;
                    var foundLocation = new L.latLng(location.lat(), location.lng());
                    map.setView(foundLocation, config.zoomPrecise);
                    marker.setLatLng(foundLocation);
                }
            }
            $(".js-editable").on("save", function(e, params) {
                if ($(this).data("edit") == "endereco") {
                    $(this).trigger("changeAddress", params.newValue);
                }
            });
            $('.js-editable[data-edit="endereco"]').on("changeAddress", function(event, strAddress) {
                geocoder.geocode({
                    address: strAddress + ", Brasil"
                }, geocode_callback);
            });
            if (isEditable) {
                var locateMeControl = L.Control.extend({
                    options: {
                        position: "topright"
                    },
                    onAdd: function(map) {
                        var controlDiv = L.DomUtil.create("div", "leaflet-control-command");
                        L.DomEvent.addListener(controlDiv, "click", L.DomEvent.stopPropagation).addListener(controlDiv, "click", L.DomEvent.preventDefault).addListener(controlDiv, "click", function() {
                            map.locate({
                                setView: true,
                                maxZoom: defaultLocateMaxZoom
                            });
                        });
                        var controlUI = L.DomUtil.create("div", "leaflet-control-command-interior", controlDiv);
                        controlUI.title = "Localizar sua posição através do navegador";
                        controlUI.innerHTML = '<span class="icon icon-show-map"></span> Localize-me';
                        return controlDiv;
                    }
                });
                if (initializerOptions.locateMeControl) map.addControl(new locateMeControl({}));
            }
            var camadasBase = {};
            camadasBase["OpenStreetMap"] = openStreetMap;
            if (config.includeGoogleLayers && typeof google !== "undefined") {
                var googleSatelite = new L.Google();
                var googleMapa = new L.Google();
                googleMapa._type = "ROADMAP";
                googleMapa.options.maxZoom = 23;
                var googleHibrido = new L.Google();
                googleHibrido._type = "HYBRID";
                var googleRelevo = new L.Google();
                googleRelevo._type = "TERRAIN";
                googleRelevo.options.maxZoom = 15;
                var camadasGoogle = {
                    "Google Satélite": googleHibrido,
                    "Google Mapa": googleMapa,
                    "Google Satélite Puro": googleSatelite,
                    "Google Relevo": googleRelevo
                };
                for (var key in camadasGoogle) {
                    camadasBase[key] = camadasGoogle[key];
                }
            }
            var geoDivisions = new lvector.PRWSF({
                url: MapasCulturais.vectorLayersURL,
                geotable: '"geo_division"',
                fields: "id,name",
                geomFieldName: MapasCulturais.mapGeometryFieldQuery,
                uniqueField: "id",
                srid: 4326,
                showAll: true,
                mouseoverEvent: function(feature, event) {
                    var labelText = feature.properties.name;
                    var vector = event.target;
                    vector.bindLabel('<b style="text-transform: capitalize;">' + labelText.toLowerCase() + "</b>");
                    map.showLabel(vector.label.setLatLng(vector.getCenter()));
                },
                singlePopup: true,
                symbology: {
                    type: "single",
                    vectorOptions: {
                        className: "vetorial-sp"
                    }
                }
            });
            new L.Control.FullScreen({
                position: "bottomright",
                title: "Tela Cheia"
            }).addTo(map);
            new L.Control.Zoom({
                position: "bottomright"
            }).addTo(map);
            var geoDivisionsObj = {};
            for (var div_id in MapasCulturais.geoDivisionsHierarchy) {
                var div_label = MapasCulturais.geoDivisionsHierarchy[div_id];
                geoDivisionsObj['<span class="js-geo-division" data-type="' + div_id + '">' + div_label + "</span>"] = {
                    onAdd: function(map) {
                        return;
                    },
                    onRemove: function(map) {
                        return;
                    }
                };
            }
            var layersControl = new L.Control.Layers(camadasBase, geoDivisionsObj);
            layersControl.addTo(map);
            function setGeoChecboxes(type) {
                $(".js-geo-division").each(function() {
                    if ($(this).data("type") != type) $(this).parents("label").find("input:checkbox").prop("checked", false);
                });
            }
            $(".js-geo-division").each(function() {
                var $checkbox = $(this).parents("label").find("input:checkbox");
                var type = $(this).data("type");
                $checkbox.on("click", function(event) {
                    geoDivisions.setMap(null);
                    if ($(this).prop("checked") === true) {
                        setGeoChecboxes(type);
                        geoDivisions.options.where = "type='" + type.toLowerCase() + "'";
                        geoDivisions.options.geoDivisionType = type;
                        geoDivisions.setMap(map);
                    } else {
                        geoDivisions.setMap(null);
                    }
                });
            });
            geoDivisions._makeJsonpRequest = function(url) {
                $('#resultados span[ng-if="!spinnerCount"]').hide();
                $('#resultados span[ng-show="spinnerCount > 0"]').removeClass("ng-hide");
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    cache: true,
                    success: function(data) {
                        geoDivisions._processFeatures(data);
                        $('#resultados span[ng-if="!spinnerCount"]').show();
                        $('#resultados span[ng-show="spinnerCount > 0"]').addClass("ng-hide");
                        setGeoChecboxes(geoDivisions.options.geoDivisionType);
                    }
                });
            };
            if (initializerOptions.exportToGlobalScope) {
                window.leaflet.map = map;
                window.leaflet.marker = marker;
            }
        });
        $(".js-leaflet-control").each(function() {
            var $control = $(this);
            $control.addClass("leaflet-control");
            $(".leaflet-control-container").each(function() {
                $(this).find($control.data("leaflet-target")).append($control);
            });
        });
        $(".js-leaflet-control").on("click dblclick mousedown startdrag", function(e) {
            e.stopPropagation();
        });
    };
    $(function() {
        if ($("body").hasClass("controller-agent")) {
            if (MapasCulturais.isEditable) {
                var publicLocation = $('[data-edit="publicLocation"]').editable("getValue").publicLocation;
                var empty = publicLocation === undefined;
                if (!empty) {
                    MapasCulturais.Map.initialize({
                        mapSelector: ".js-map",
                        locateMeControl: false,
                        exportToGlobalScope: true,
                        mapCenter: MapasCulturais.mapCenter
                    });
                } else {
                    $(".js-map").parent().hide();
                }
                $('[data-edit="publicLocation"]').on("hidden", function() {
                    var publicLocation = $(this).data("editable").value;
                    var empty = publicLocation === "null";
                    if (!empty) {
                        $(".js-map-container").show();
                        MapasCulturais.Map.initialize({
                            mapSelector: ".js-map",
                            locateMeControl: false,
                            exportToGlobalScope: true,
                            mapCenter: MapasCulturais.mapCenter
                        });
                    } else {
                        $("#map-target").editable("setValue", [ 0, 0 ]);
                        $(".js-map-container").hide();
                    }
                });
            } else {
                MapasCulturais.Map.initialize({
                    mapSelector: ".js-map",
                    locateMeControl: false,
                    exportToGlobalScope: true,
                    mapCenter: MapasCulturais.mapCenter
                });
            }
        }
        if ($("body").hasClass("controller-space") || $("body").hasClass("controller-event")) {
            MapasCulturais.Map.initialize({
                mapSelector: ".js-map",
                locateMeControl: false,
                exportToGlobalScope: true,
                mapCenter: MapasCulturais.mapCenter
            });
        }
        var timeout;
        $(window).scroll(function() {
            try {
                leaflet.map.scrollWheelZoom.disable();
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    leaflet.map.scrollWheelZoom.enable();
                }, 400);
            } catch (e) {}
        });
    });
    (function() {
        window.fullScreenApi.requestFullScreen = function(el) {
            if (MapasCulturais.request.controller === "site") {
                el = document.querySelector("html");
            }
            return this.prefix === "" ? el.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : el[this.prefix + "RequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT);
        };
    })();
})(jQuery);

(function(angular) {
    var app = angular.module("search.controller.spatial", [ "ng-mapasculturais" ]);
    app.controller("SearchSpatialController", [ "$window", "$scope", "$location", "$rootScope", "$timeout", function($window, $scope, $location, $rootScope, $timeout) {
        var map = null;
        angular.element(document).ready(function() {
            map = $window.leaflet.map;
            if (!map) return;
            map.invalidateSize();
            var drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);
            $window.leaflet.map.drawnItems = drawnItems;
            if ($scope.data.global.locationFilters.enabled) {
                var lf = $scope.data.global.locationFilters;
                new L.Circle(new L.LatLng(lf[lf.enabled].center.lat, lf[lf.enabled].center.lng), lf[lf.enabled].radius, {
                    className: "vetorial-padrao"
                }).addTo(map.drawnItems);
                if ($scope.data.global.locationFilters.enabled == "address") {
                    filterAddress();
                }
            }
            L.drawLocal.draw.handlers.circle.tooltip.start = "Clique e arraste para desenhar o círculo";
            L.drawLocal.draw.handlers.circle.tooltip.end = "Solte o mouse para finalizar o desenho";
            L.drawLocal.draw.toolbar.actions.title = "Cancelar desenho";
            L.drawLocal.draw.toolbar.actions.text = "Cancelar";
            L.drawLocal.draw.toolbar.buttons.circle = "Desenhar um círculo";
            L.Draw.Circle = L.Draw.Circle.extend({
                _onMouseMove: function(e) {
                    var latlng = e.latlng, showRadius = this.options.showRadius, useMetric = this.options.metric, radius;
                    this._tooltip.updatePosition(latlng);
                    if (this._isDrawing) {
                        this._drawShape(latlng);
                        radius = this._shape.getRadius().toFixed(1);
                        this._tooltip.updateContent({
                            text: L.drawLocal.draw.handlers.circle.tooltip.end,
                            subtext: showRadius ? "Raio: " + L.GeometryUtil.readableDistance(radius, useMetric).replace(".", ",") : ""
                        });
                    }
                }
            });
            var drawControl = new L.Control.Draw({
                draw: {
                    position: "topleft",
                    polygon: false,
                    rectangle: false,
                    marker: false,
                    polyline: false,
                    circle: {
                        shapeOptions: {
                            className: "vetorial-padrao"
                        }
                    }
                },
                edit: false
            });
            map.addControl(drawControl);
            map.on("draw:created", function(e) {
                var type = e.layerType, layer = e.layer;
                if (type === "circle") {
                    $scope.data.global.locationFilters = {
                        enabled: "circle",
                        circle: {
                            center: {
                                lat: layer._latlng.lat,
                                lng: layer._latlng.lng
                            },
                            radius: parseInt(layer._mRadius)
                        }
                    };
                    $scope.$apply();
                }
                if (type === "marker") {
                    layer.bindPopup("A popup!");
                }
                if ($window.leaflet.locationMarker) $window.leaflet.map.removeLayer($window.leaflet.locationMarker);
                drawnItems.addLayer(layer);
            });
            map.on("locationfound", function(e) {
                $window.$timout.cancel($window.dataTimeout);
                var radius = e.accuracy / 2, neighborhoodRadius = $scope.defaultLocationRadius;
                var marker = L.marker(e.latlng, $window.leaflet.iconOptions["location"]).addTo(map).bindPopup("Segundo seu navegador, você está aproximadamente neste ponto com margem de erro de " + radius.toString().replace(".", ",") + " metros. Buscando resultados dentro de um raio de " + neighborhoodRadius / 1e3 + "KM deste ponto. <a onclick='document.querySelector(\".leaflet-draw-draw-circle\").click()'>Modificar</a>").openPopup();
                var circle = L.circle(e.latlng, $scope.defaultLocationRadius, {
                    className: "vetorial-padrao"
                }).addTo(map.drawnItems);
                $scope.data.global.locationFilters = {
                    enabled: "neighborhood",
                    neighborhood: {
                        center: {
                            lat: map.getCenter().lat,
                            lng: map.getCenter().lng
                        },
                        radius: $scope.defaultLocationRadius
                    }
                };
                $scope.$apply();
                if ($window.leaflet.locationMarker) {
                    $window.leaflet.map.removeLayer($window.leaflet.locationMarker);
                    $window.leaflet.map.removeLayer($window.leaflet.locationCircle);
                }
                $window.leaflet.locationMarker = marker;
                $window.leaflet.locationCircle = circle;
            });
            map.on("locationerror", function(e) {});
            $("#endereco").on("click dblclick", function() {
                var $self = $(this);
                $self.focus();
                $self.stopPropagation();
                $("body").one("click", function(event) {
                    if ($self.parent().find(event.target).length == 0) {
                        $self.blur();
                    }
                });
            });
        });
        $scope.filterNeighborhood = function() {
            $window.leaflet.map.locate({
                setView: true,
                maxZoom: 13
            });
        };
        var geocoder = null;
        if (typeof google !== "undefined") geocoder = new google.maps.Geocoder();
        function geocode_callback(results, status) {
            if (typeof google === "undefined") {
                return false;
            }
            if (status == google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                var foundLocation = new L.latLng(location.lat(), location.lng());
                map.setView(foundLocation, 15);
                marker.setLatLng(foundLocation);
            }
        }
        function filterAddress() {
            var geocoder = null;
            var addressString = $scope.data.global.locationFilters.address.text + ", Brasil";
            if (!google) {
                return;
            } else {
                geocoder = new google.maps.Geocoder();
            }
            geocoder.geocode({
                address: addressString
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $window.$timout.cancel($window.dataTimeout);
                    var location = results[0].geometry.location;
                    var foundLocation = new L.latLng(location.lat(), location.lng());
                    $window.leaflet.map.setView(foundLocation, 13);
                    if ($window.leaflet.locationMarker) {
                        $window.leaflet.map.removeLayer($window.leaflet.locationMarker);
                        $window.leaflet.map.removeLayer($window.leaflet.locationCircle);
                    }
                    $window.leaflet.locationMarker = new L.marker(foundLocation, $window.leaflet.iconOptions["location"]).addTo($window.leaflet.map);
                    $window.leaflet.locationCircle = L.circle(foundLocation, $scope.defaultLocationRadius, {
                        className: "vetorial-padrao"
                    }).addTo($window.leaflet.map.drawnItems);
                    $scope.data.global.locationFilters = {
                        enabled: "address",
                        address: {
                            text: $scope.data.global.locationFilters.address.text,
                            center: {
                                lat: location.lat(),
                                lng: location.lng()
                            },
                            radius: $scope.defaultLocationRadius
                        }
                    };
                    $scope.$apply();
                }
            });
        }
        $scope.$watch("data.global.locationFilters.address.text", function(newValue, oldValue) {
            if (!newValue && !oldValue || newValue == oldValue) {
                return;
            }
            if (!newValue || !newValue.trim()) {
                $scope.data.global.locationFilters.enabled = null;
                if ($rootScope.resultLayer.getBounds()._northEast) map.fitBounds($rootScope.resultLayer.getBounds());
                return;
            }
            $timeout.cancel($scope.timer2);
            $scope.timer2 = $timeout(function() {
                filterAddress();
            }, 1e3);
        });
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var app = angular.module("search.service.find", []);
    app.factory("searchService", [ "$http", "$rootScope", "$q", function($http, $rootScope, $q) {
        $rootScope.lastResult = $rootScope.lastResult || {
            agent: null,
            space: null,
            event: null
        };
        var activeRequests = 0, canceler = null, lastEmitedResult = "null", lastEmitedCountResult = "null", lastQueries = {
            enabledEntities: null,
            space: null,
            agent: null,
            event: null,
            project: null,
            listedEntity: null,
            list: null,
            page: null
        };
        $rootScope.spinnerCount = $rootScope.spinnerCount || 0;
        $rootScope.$on("searchDataChange", search);
        $rootScope.$on("resultPagination", search);
        $rootScope.searchArgs = {
            list: {},
            map: {}
        };
        function search(ev, data) {
            var results = {}, numRequests = 0, numSuccessRequests = 0, numCountRequests = 0, numCountSuccessRequests = 0, countResults = {}, paginating = ev.name === "resultPagination";
            if (!paginating) $rootScope.resetPagination();
            if (data.global.viewMode === "map") {
                var compareEnabledEntities = angular.equals(lastQueries.enabledEntities, data.global.enabled);
                if (data.global.enabled.agent) {
                    var agentQueryData = data2searchData(data.agent);
                    if (!angular.equals(agentQueryData, lastQueries.agent) || !compareEnabledEntities) {
                        lastQueries.agent = angular.copy(agentQueryData);
                        callApi("agent", agentQueryData);
                    } else {
                        results.agent = $rootScope.lastResult.agent;
                    }
                }
                if (data.global.enabled.event) {
                    var eventQueryData = data2searchData(data.event);
                    if (!angular.equals(eventQueryData, lastQueries.event) || !compareEnabledEntities) {
                        lastQueries.event = angular.copy(eventQueryData);
                        callApi("event", eventQueryData);
                    } else {
                        results.event = $rootScope.lastResult.event;
                    }
                }
                if (data.global.enabled.space) {
                    var spaceQueryData = data2searchData(data.space);
                    if (!angular.equals(spaceQueryData, lastQueries.space) || !compareEnabledEntities) {
                        lastQueries.space = angular.copy(spaceQueryData);
                        callApi("space", spaceQueryData);
                    } else {
                        results.space = $rootScope.lastResult.space;
                    }
                }
                lastQueries.enabledEntities = angular.copy(data.global.enabled);
            } else {
                var activeEntity = data.global.filterEntity;
                var listQueryData = data2searchData(data[activeEntity]);
                if (activeEntity !== lastQueries.listedEntity) $rootScope.pagination[activeEntity] = 1;
                var isDiff = paginating && $rootScope.pagination[activeEntity] !== lastQueries.page || (!angular.equals(listQueryData, lastQueries.list) || lastQueries.listedEntity !== activeEntity);
                if (isDiff) {
                    $rootScope.isPaginating = true;
                    lastQueries.listedEntity = activeEntity;
                    lastQueries.list = angular.copy(listQueryData);
                    callApi(activeEntity, angular.copy(listQueryData));
                } else {
                    $rootScope.isPaginating = false;
                }
            }
            endCountRequest();
            endRequest();
            function callApi(entity, sData) {
                var requestEntity = entity, requestAction = "find";
                if (entity === "event") {
                    if (data.global.viewMode === "list") {
                        requestAction = "findByLocation";
                    } else {
                        requestEntity = "space";
                        requestAction = "findByEvents";
                    }
                }
                $rootScope.searchArgs[data.global.viewMode][entity] = sData;
                if (requestEntity === "space" && requestAction === "findByEvents") {
                    var otherRequestEntity = "event";
                    var otherRequestAction = "findByLocation";
                    numCountRequests++;
                    activeRequests++;
                    $rootScope.spinnerCount++;
                    countResults["event"] = {};
                    apiCount(otherRequestEntity, sData, otherRequestAction).success(function(rs) {
                        numCountSuccessRequests++;
                        activeRequests--;
                        $rootScope.spinnerCount--;
                        countResults["event"].events = rs;
                        endCountRequest();
                    });
                }
                numRequests++;
                activeRequests++;
                $rootScope.spinnerCount++;
                apiFind(requestEntity, sData, $rootScope.pagination[entity], requestAction).success(function(rs, status, header) {
                    var metadata = JSON.parse(header("API-Metadata"));
                    numSuccessRequests++;
                    activeRequests--;
                    $rootScope.spinnerCount--;
                    results[entity] = rs;
                    endRequest();
                    if (requestEntity === "space" && requestAction === "findByEvents") countResults[entity].spaces = metadata.count; else countResults[entity] = metadata.count;
                    numCountSuccessRequests++;
                    numCountRequests++;
                    endCountRequest();
                });
            }
            function countAndRemoveResultsNotInMap(entity, results) {
                results[entity].forEach(function(item, index) {
                    if (!item.location || item.location.latitude == 0 && item.location.longitude == 0) {
                        $rootScope.resultsNotInMap[entity]++;
                    }
                });
            }
            function endRequest() {
                if (numRequests > 0 && numSuccessRequests === numRequests && lastEmitedResult !== JSON.stringify(results)) {
                    if (data.global.viewMode === "map") {
                        $rootScope.resultsNotInMap = {
                            agent: 0,
                            space: 0,
                            event: 0
                        };
                        if (results.agent) {
                            countAndRemoveResultsNotInMap("agent", results);
                        }
                        if (results.space) {
                            countAndRemoveResultsNotInMap("space", results);
                        }
                        if (results.event) {
                            countAndRemoveResultsNotInMap("event", results);
                        }
                    }
                    lastEmitedResult = JSON.stringify(results);
                    results.paginating = paginating;
                    $rootScope.lastResult = results;
                    $rootScope.$emit("searchResultsReady", results);
                }
            }
            function endCountRequest() {
                if (numCountRequests > 0 && numCountSuccessRequests === numCountRequests && lastEmitedCountResult !== JSON.stringify(countResults)) {
                    $rootScope.$emit("searchCountResultsReady", countResults);
                }
            }
            function data2searchData(entityData) {
                var searchData = {};
                if (entityData.keyword) {
                    searchData["@keyword"] = entityData.keyword.replace(/ /g, "%25");
                }
                if (entityData.areas && entityData.areas.length) {
                    var selectedAreas = entityData.areas.map(function(e) {
                        return MapasCulturais.taxonomyTerms.area[e];
                    });
                    selectedAreas = selectedAreas.map(function(e) {
                        return e.replace(",", ",");
                    });
                    searchData["term:area"] = "IN(" + selectedAreas + ")";
                }
                if (entityData.linguagens && entityData.linguagens.length) {
                    var selectedLinguagens = entityData.linguagens.map(function(e) {
                        return MapasCulturais.taxonomyTerms.linguagem[e];
                    });
                    selectedLinguagens = selectedLinguagens.map(function(e) {
                        return e.replace(",", "\\,");
                    });
                    searchData["term:linguagem"] = "IN(" + selectedLinguagens + ")";
                }
                if (entityData.type) {
                    searchData.type = "EQ(" + entityData.type + ")";
                }
                if (entityData.types && entityData.types.length) {
                    searchData.type = "IN(" + entityData.types + ")";
                }
                if (entityData.classificacaoEtaria && entityData.classificacaoEtaria.length) {
                    var selectedClassificacoesEtarias = entityData.classificacaoEtaria.map(function(e) {
                        return MapasCulturais.classificacoesEtarias[e];
                    });
                    searchData.classificacaoEtaria = "IN(" + selectedClassificacoesEtarias + ")";
                }
                if (entityData.acessibilidade) {
                    searchData.acessibilidade = "EQ(Sim)";
                }
                if (entityData.isVerified) {
                    searchData.isVerified = "EQ(true)";
                }
                if (data.global.locationFilters.enabled !== null) {
                    var type = data.global.locationFilters.enabled;
                    var center = data.global.locationFilters[type].center;
                    var radius = data.global.locationFilters[type].radius;
                    searchData._geoLocation = "GEONEAR(" + center.lng + "," + center.lat + "," + radius + ")";
                }
                if (entityData.from) searchData["@from"] = entityData.from;
                if (entityData.to) searchData["@to"] = entityData.to;
                if (entityData.ropen) {
                    var today = moment().format("YYYY-MM-DD");
                    searchData.registrationFrom = "LTE(" + today + ")";
                    searchData.registrationTo = "GTE(" + today + ")";
                }
                return searchData;
            }
            function apiFind(entity, searchData, page, action) {
                if (MapasCulturais.searchFilters && MapasCulturais.searchFilters[entity]) {
                    angular.extend(searchData, MapasCulturais.searchFilters[entity]);
                    console.log(entity, searchData, MapasCulturais.searchFilters);
                }
                var selectData = "id,singleUrl,name,type,shortDescription,terms";
                var apiExportURL = MapasCulturais.baseURL + "api/";
                if (entity === "space") {
                    if (action === "find") {
                        selectData += ",endereco,acessibilidade";
                    } else {
                        selectData += ",classificacaoEtaria,project.name,project.singleUrl,occurrences";
                        apiExportURL += "event/findByLocation/?";
                    }
                } else if (entity === "project") {
                    selectData += ",registrationFrom,registrationTo";
                } else if (entity === "event") {
                    selectData += ",classificacaoEtaria,project.name,project.singleUrl,occurrences";
                }
                if (data.global.viewMode === "list") {
                    searchData["@select"] = selectData;
                    searchData["@files"] = "(avatar.avatarMedium):url";
                    if (page) {
                        searchData["@page"] = page;
                        searchData["@limit"] = "10";
                    }
                } else {
                    searchData["@select"] = "id,name,location";
                }
                action = action || "find";
                searchData["@order"] = "name ASC";
                delete searchData["@count"];
                var querystring = "";
                var queryString_apiExport = "@select=" + selectData;
                if (apiExportURL.indexOf("event/findByLocation") !== -1) queryString_apiExport = queryString_apiExport.replace(",type", ""); else apiExportURL += entity + "/" + action + "/?";
                for (var att in searchData) {
                    querystring += "&" + att + "=" + searchData[att];
                    if (att != "@select" && att != "@page" && att != "@limit") queryString_apiExport += "&" + att + "=" + searchData[att];
                }
                $rootScope.apiURL = apiExportURL + queryString_apiExport;
                return $http({
                    method: "GET",
                    cache: true,
                    url: MapasCulturais.baseURL + "api/" + entity + "/" + action + "/?" + querystring,
                    data: searchData
                });
            }
            function apiCount(entity, searchData, action) {
                action = action || "find";
                var querystring = "";
                for (var att in searchData) {
                    querystring += "&" + att + "=" + searchData[att];
                }
                return $http({
                    method: "GET",
                    cache: true,
                    url: MapasCulturais.baseURL + "api/" + entity + "/" + action + "/?@count=1&" + querystring,
                    data: searchData
                });
            }
        }
        return "done";
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var app = angular.module("search.service.findOne", []);
    app.factory("FindOneService", [ "$http", "$rootScope", function($http, $rootScope) {
        return function(data) {
            if (data.global.viewMode === "list") return;
            var select = "id,singleUrl,name,subTitle,type,shortDescription,terms,project.name,project.singleUrl", requestAction = "findOne", page = null, result = {}, sData = {}, entity, numRequests = 1;
            $rootScope.spinnerCount++;
            entity = data.global.openEntity.type;
            sData.id = "EQ(" + data.global.openEntity.id + ")";
            if (entity === "event") {
                result[entity] = {
                    space: {},
                    events: {}
                };
                if (data.global.enabled.event) {
                    $rootScope.spinnerCount++;
                    numRequests++;
                    select += ",endereco";
                    apiFindOne("space", select, sData, page, requestAction).success(function(rs) {
                        result[entity].space = rs;
                        endRequest();
                    });
                    apiSpaceEvents(data.global.openEntity.id, $rootScope.searchArgs.map.event).success(function(rs) {
                        result[entity].events = rs;
                        endRequest();
                    });
                } else {
                    endRequest();
                }
            } else {
                apiFindOne(entity, select, sData, page, requestAction).success(function(rs) {
                    result[entity] = rs;
                    endRequest();
                });
            }
            function endRequest() {
                numRequests--;
                $rootScope.spinnerCount--;
                if (numRequests === 0) {
                    $rootScope.$emit("findOneResultReady", result);
                }
            }
            function apiFindOne(entity, select, searchData, page, action) {
                action = action || "find";
                if (entity === "space") select += ",endereco,acessibilidade";
                searchData["@select"] = select;
                searchData["@files"] = "(avatar.avatarSmall):url";
                var querystring = "";
                for (var att in searchData) {
                    querystring += "&" + att + "=" + searchData[att];
                }
                return $http({
                    method: "GET",
                    url: MapasCulturais.baseURL + "api/" + entity + "/" + action + "/?" + querystring,
                    data: searchData
                });
            }
            function apiSpaceEvents(spaceId, searchData) {
                var action = "findBySpace";
                searchData["spaceId"] = spaceId;
                searchData["@select"] = select + ",classificacaoEtaria";
                searchData["@files"] = "(avatar.avatarSmall):url";
                var querystring = "";
                for (var att in searchData) {
                    querystring += "&" + att + "=" + searchData[att];
                }
                return $http({
                    method: "GET",
                    url: MapasCulturais.baseURL + "api/" + entity + "/" + action + "/?" + querystring,
                    data: searchData
                });
            }
        };
    } ]);
})(angular);

(function(angular) {
    var app = angular.module("search.controller.map", [ "ng-mapasculturais", "search.service.findOne" ]);
    app.controller("SearchMapController", [ "$window", "$scope", "$rootScope", "FindOneService", function($window, $scope, $rootScope, FindOneService) {
        $scope.init = function() {
            if ($scope.data.global.map && $scope.data.global.map.zoom) {
                MapasCulturais.mapCenter = $scope.data.global.map.center;
            } else {
                MapasCulturais.mapCenter = null;
            }
            $scope.map = null;
            $scope.resultLayer = null;
            $scope.markers = [];
            angular.element(document).ready(function() {
                $scope.map = $window.leaflet.map;
                $scope.map.removeLayer($window.leaflet.marker);
                $scope.map.on("load", function() {
                    $scope.setMapView();
                });
                $scope.map.on("drag zoomstart", function() {
                    $window.$timout.cancel($window.dataTimeout);
                });
                $scope.map.on("zoomend moveend", function() {
                    if ($scope.data.global.viewMode === "list") return;
                    $scope.data.global.map = {
                        center: $window.leaflet.map.getCenter(),
                        zoom: $window.leaflet.map.getZoom()
                    };
                    $scope.$apply();
                });
                $scope.updateMap();
                $scope.setMapView();
            });
            $rootScope.$on("searchCountResultsReady", function(ev, results) {
                if ($window.leaflet.map.drawnItems) {
                    if (!$scope.data.global.locationFilters.enabled) {
                        $window.leaflet.map.drawnItems.clearLayers();
                        if ($window.leaflet.locationMarker) {
                            $window.leaflet.map.removeLayer($window.leaflet.locationMarker);
                        }
                    } else if (Object.keys($window.leaflet.map.drawnItems._layers).length > 1) {
                        var lastLayer = $scope.map.drawnItems.getLayers().pop();
                        $window.leaflet.map.drawnItems.clearLayers();
                        $window.leaflet.map.drawnItems.addLayer(lastLayer);
                    }
                }
            });
            $rootScope.$on("searchResultsReady", function(ev, results) {
                if ($scope.data.global.viewMode === "list") return;
                delete $scope.markers;
                $scope.markers = [];
                if (results.agent) $scope.createMarkers("agent", results.agent);
                if (results.event) $scope.createMarkers("event", results.event);
                if (results.space) $scope.createMarkers("space", results.space);
                $scope.updateMap();
                if ($scope.data.global.openEntity && $scope.data.global.openEntity.id) {
                    FindOneService($scope.data);
                }
            });
            $rootScope.$on("searchDataChange", function(ev, data) {
                if (!$scope.map) return;
                $scope.map.invalidateSize();
                $scope.setMapView();
            });
        };
        $scope.setMapView = function() {
            if ($scope.map && $scope.data.global.map && $scope.data.global.map.zoom) {
                $scope.map.setZoom($scope.data.global.map.zoom);
                $scope.map.panTo($scope.data.global.map.center);
            }
        };
        $scope.createMarkers = function(entity, results) {
            results.forEach(function(item) {
                var marker;
                if (!item.location || item.location.latitude == 0 && item.location.longitude == 0) {
                    return;
                }
                marker = new L.marker(new L.LatLng(item.location.latitude, item.location.longitude), $window.leaflet.iconOptions[entity]).bindLabel(entity === "event" ? "<center>Eventos encontrados no espaço <br> <strong>" + item.name + "</strong></center>" : item.name).on("click", function() {
                    var infobox = document.querySelector("#infobox");
                    var infoboxContent = infobox.querySelector("article");
                    $scope.data.global.openEntity = {
                        id: item.id,
                        type: entity
                    };
                    $scope.openEntity = {};
                    $scope.openEntity[entity] = {
                        name: item.name
                    };
                    $scope.$parent.collapsedFilters = true;
                    $scope.$apply();
                    FindOneService($scope.data);
                });
                marker.entityType = entity;
                $scope.markers.push(marker);
            });
        };
        $scope.updateMap = function() {
            if ($scope.resultLayer) {
                $scope.resultLayer.clearLayers();
            }
            $scope.resultLayer = new L.markerClusterGroup({
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: false,
                spiderfyDistanceMultiplier: MapasCulturais.mapSpiderfyDistanceMultiplier,
                maxClusterRadius: MapasCulturais.mapMaxClusterRadius,
                iconCreateFunction: function(cluster) {
                    var iconClass = "leaflet-cluster", markers = getChildMarkers(cluster), hasAgent = false, hasEvent = false, hasSpace = false;
                    function getChildMarkers(cluster) {
                        var markers = cluster._markers.slice();
                        cluster._childClusters.forEach(function(child_cluster) {
                            markers = markers.concat(getChildMarkers(child_cluster));
                        });
                        return markers;
                    }
                    for (var i in markers) {
                        if (markers[i].entityType === "agent") hasAgent = true;
                        if (markers[i].entityType === "event") hasEvent = true;
                        if (markers[i].entityType === "space") hasSpace = true;
                        if (hasAgent && hasEvent && hasSpace) break;
                    }
                    if (hasAgent) iconClass += " cluster-agent";
                    if (hasEvent) iconClass += " cluster-event";
                    if (hasSpace) iconClass += " cluster-space";
                    return L.divIcon({
                        html: cluster.getChildCount(),
                        className: iconClass,
                        iconSize: L.point(40, 40)
                    });
                }
            });
            $scope.resultLayer.addLayers($scope.markers);
            var __c = 0;
            var _addLayer = $scope.resultLayer._addLayer;
            $scope.resultLayer._addLayer = function(layer, zoom) {
                var r = _addLayer.apply(this, [ layer, zoom ]);
                var p = layer.__parent;
                while (p) {
                    p.hasEntityType = p.hasEntityType || {};
                    p.hasEntityType[layer.entityType] = true;
                    p = p.__parent;
                }
                return r;
            };
            angular.element(document).ready(function() {
                $scope.resultLayer.addTo($scope.map);
                $rootScope.resultLayer = $scope.resultLayer;
            });
            $scope.resultLayer.on("clusterclick", function(a) {
                if (a.layer._childCount <= MapasCulturais.mapMaxClusterElements) a.layer.spiderfy(); else {
                    a.layer.zoomToBounds();
                }
            });
        };
        $scope.init();
    } ]);
})(angular);

(function(angular) {
    "use strict";
    window.apply = null;
    var timeoutTime = 300;
    var defaultLocationRadius = 2e3;
    var skeletonData = {
        global: {
            isVerified: false,
            isCombined: false,
            viewMode: "map",
            filterEntity: null,
            openEntity: {
                id: null,
                type: null
            },
            locationFilters: {
                enabled: null,
                circle: {
                    center: {
                        lat: null,
                        lng: null
                    },
                    radius: null
                },
                neighborhood: {
                    center: {
                        lat: null,
                        lng: null
                    },
                    radius: defaultLocationRadius
                },
                address: {
                    text: "",
                    center: {
                        lat: null,
                        lng: null
                    },
                    radius: defaultLocationRadius
                }
            },
            map: {
                zoom: null,
                center: {
                    lat: null,
                    lng: null
                }
            },
            enabled: {
                agent: false,
                space: false,
                event: false
            }
        },
        agent: {
            keyword: "",
            areas: [],
            type: null,
            isVerified: false
        },
        space: {
            keyword: "",
            areas: [],
            types: [],
            acessibilidade: false,
            isVerified: false
        },
        event: {
            keyword: "",
            linguagens: [],
            from: moment().format("YYYY-MM-DD"),
            to: moment().add(1, "month").format("YYYY-MM-DD"),
            classificacaoEtaria: [],
            isVerified: false
        },
        project: {
            keyword: "",
            linguagens: [],
            types: [],
            isVerified: false,
            ropen: false
        }
    };
    var diffFilter = function(input) {
        return _diffFilter(input, skeletonData);
    };
    var isEmpty = function(value) {
        if (typeof value === "undefined" || value === null) return true;
        if (angular.isObject(value)) {
            if (angular.equals(value, {}) || angular.equals(value, [])) return true;
        }
        return false;
    };
    var _diffFilter = function(input, skeleton) {
        if (typeof input === "undefined" || typeof skeleton === "undefined" || input === skeleton) return;
        if (!angular.isObject(input) || angular.isArray(skeleton)) {
            return input;
        }
        var output = {};
        angular.forEach(input, function(value, key) {
            var currVal = _diffFilter(value, skeleton[key]);
            if (isEmpty(currVal)) return;
            this[key] = currVal;
        }, output);
        return output;
    };
    var deepExtend = function(skeleton, extension) {
        angular.forEach(extension, function(value, key) {
            if (angular.isObject(value) && !angular.isArray(value)) {
                deepExtend(skeleton[key], value);
                delete extension[key];
            }
        });
        angular.extend(skeleton, extension);
        return skeleton;
    };
    var app = angular.module("search.app", [ "ng-mapasculturais", "rison", "infinite-scroll", "ui.date", "search.service.find", "search.service.findOne", "search.controller.map", "search.controller.spatial", "mc.module.notifications" ]);
    app.controller("SearchController", [ "$scope", "$rootScope", "$location", "$log", "$rison", "$window", "$timeout", "searchService", "FindOneService", function($scope, $rootScope, $location, $log, $rison, $window, $timeout, searchService, FindOneService) {
        $scope.defaultLocationRadius = defaultLocationRadius;
        $rootScope.resetPagination = function() {
            $rootScope.pagination = {
                agent: 1,
                space: 1,
                event: 1,
                project: 1
            };
        };
        $rootScope.resetPagination();
        $scope.assetsUrl = MapasCulturais.assets;
        $scope.getName = function(valores, id) {
            return valores.filter(function(e) {
                if (e.id === id) return true;
            })[0].name;
        };
        $scope.getId = function(valores, name) {
            return valores.filter(function(e) {
                if (e.name === name) return true;
            })[0].id;
        };
        $scope.isSelected = function(array, id) {
            return array.indexOf(id) !== -1;
        };
        $scope.toggleSelection = function(array, id) {
            var index = array.indexOf(id);
            if (index !== -1) {
                array.splice(index, 1);
            } else {
                array.push(id);
            }
        };
        $scope.toggleVerified = function(entity) {
            $scope.data[entity].isVerified = !$scope.data[entity].isVerified;
        };
        $scope.showInfobox = function() {
            return $scope.collapsedFilters && $scope.data.global.openEntity.id > 0 && $scope.data.global.viewMode === "map" && $scope.data.global.enabled[$scope.data.global.openEntity.type];
        };
        $scope.showFilters = function(entity) {
            if ($scope.data.global.viewMode === "map") return $scope.data.global.enabled[entity]; else return $scope.data.global.filterEntity === entity;
        };
        $scope.hasFilter = function() {
            var ctx = {
                has: false
            };
            angular.forEach($scope.data, function(value, key) {
                if (key === "global") return;
                this.has = this.has || !angular.equals(_diffFilter($scope.data[key], skeletonData[key]), {});
            }, ctx);
            return ctx.has || $scope.data.global.isVerified || $scope.data.global.locationFilters.enabled !== null;
        };
        $scope.cleanAllFilters = function() {
            angular.forEach($scope.data, function(value, key) {
                if (key === "global") return;
                $scope.data[key] = angular.copy(skeletonData[key]);
            });
            $scope.data.global.isVerified = false;
            $scope.data.global.locationFilters = angular.copy(skeletonData.global.locationFilters);
        };
        $scope.cleanLocationFilters = function() {
            $scope.data.global.locationFilters = angular.copy(skeletonData.global.locationFilters);
        };
        $scope.tabClick = function(entity) {
            var g = $scope.data.global;
            g.filterEntity = entity;
            if (entity === "project") g.viewMode = "list";
            if (g.viewMode === "map") {
                var n = 0;
                for (var e in g.enabled) if (g.enabled[e]) n++;
                if (n === 0 || n === 1 && !g.enabled[entity]) {
                    for (var e in g.enabled) if (e === entity) g.enabled[e] = true; else g.enabled[e] = false;
                } else if (n > 1 && !g.enabled[entity]) {
                    g.enabled[entity] = true;
                }
            }
        };
        $scope.parseHash = function() {
            var newValue = $location.hash();
            if (newValue === "") {
                $scope.tabClick("agent");
                return;
            }
            if (newValue !== $rison.stringify(diffFilter($scope.data))) {
                $scope.data = deepExtend(angular.copy(skeletonData), $rison.parse(newValue));
                $timeout.cancel($scope.timer);
                $scope.timer = $timeout(function() {
                    $rootScope.$emit("searchDataChange", $scope.data);
                }, timeoutTime);
            }
        };
        $scope.dataChange = function(newValue, oldValue) {
            if (newValue === undefined) return;
            if (newValue.global.viewMode === "map") {
                var filterEntity = newValue.global.filterEntity;
                if (!newValue.global.enabled[filterEntity]) {
                    var enabledEntities = 0;
                    angular.forEach(newValue.global.enabled, function(v, k) {
                        if (v) enabledEntities++;
                    });
                    if (enabledEntities === 1) {
                        var obj = {
                            space: false,
                            agent: false,
                            event: false
                        };
                        obj[filterEntity] = true;
                        newValue.global.enabled = obj;
                    } else {
                        newValue.global.enabled[filterEntity] = true;
                    }
                    return;
                }
            }
            var serialized = $rison.stringify(diffFilter(newValue));
            $window.$timout = $timeout;
            if ($location.hash() !== serialized) {
                $timeout.cancel($scope.timer);
                if (oldValue && !angular.equals(oldValue.global.enabled, newValue.global.enabled)) {
                    $location.hash(serialized);
                    $scope.timer = $timeout(function() {
                        $rootScope.$emit("searchDataChange", $scope.data);
                    }, timeoutTime);
                } else {
                    $scope.timer = $timeout(function() {
                        $location.hash(serialized);
                        $rootScope.$emit("searchDataChange", $scope.data);
                    }, timeoutTime);
                    $window.dataTimeout = $scope.timer;
                }
            }
            $window.scrollTo(0, $window.scrollY + 1);
            $window.scrollTo(0, $window.scrollY - 1);
        };
        $scope.data = angular.copy(skeletonData);
        $scope.areas = MapasCulturais.taxonomyTerms.area.map(function(el, i) {
            return {
                id: i,
                name: el
            };
        });
        $scope.linguagens = MapasCulturais.taxonomyTerms.linguagem.map(function(el, i) {
            return {
                id: i,
                name: el
            };
        });
        $scope.classificacoes = MapasCulturais.classificacoesEtarias.map(function(el, i) {
            return {
                id: i,
                name: el
            };
        });
        MapasCulturais.entityTypes.agent.unshift({
            id: null,
            name: "Todos"
        });
        $scope.types = MapasCulturais.entityTypes;
        $scope.location = $location;
        $rootScope.$on("$locationChangeSuccess", $scope.parseHash);
        if ($location.hash() === "") {
            $scope.tabClick("agent");
        } else {
            $scope.parseHash();
        }
        $scope.$watch("data", $scope.dataChange, true);
        $scope.agents = [];
        $scope.spaces = [];
        $scope.events = [];
        $scope.projects = [];
        $rootScope.$on("searchResultsReady", function(ev, results) {
            if ($scope.data.global.viewMode !== "list") return;
            $rootScope.isPaginating = false;
            if (results.paginating) {
                $scope.agents = $scope.agents.concat(results.agent ? results.agent : []);
                $scope.events = $scope.events.concat(results.event ? results.event : []);
                $scope.spaces = $scope.spaces.concat(results.space ? results.space : []);
                $scope.projects = $scope.projects.concat(results.project ? results.project : []);
            } else {
                $scope.agents = results.agent ? results.agent : [];
                $scope.events = results.event ? results.event : [];
                $scope.spaces = results.space ? results.space : [];
                $scope.projects = results.project ? results.project : [];
            }
        });
        var infiniteScrollTimeout = null;
        $scope.addMore = function(entity) {
            if ($scope.data.global.viewMode !== "list") return;
            if (entity !== $scope.data.global.filterEntity) return;
            if ($rootScope.isPaginating) return;
            if ($scope[entity + "s"].length === 0 || $scope[entity + "s"].length < 10) return;
            $rootScope.pagination[entity]++;
            if ($rootScope.pagination[entity] > 1) $rootScope.$emit("resultPagination", $scope.data);
        };
        $scope.numResults = function(num, entity) {
            if ($scope.data.global.viewMode === "map" && $scope.resultsNotInMap && $scope.resultsNotInMap[entity]) {
                return num - $scope.resultsNotInMap[entity];
            } else {
                return num;
            }
        };
        $scope.numAgents = 0;
        $scope.numSpaces = 0;
        $scope.numEvents = {
            events: 0,
            spaces: 0
        };
        $scope.numEventsInList = 0;
        $scope.numProjects = 0;
        $rootScope.$on("searchCountResultsReady", function(ev, results) {
            $scope.numAgents = parseInt(results.agent);
            $scope.numSpaces = parseInt(results.space);
            if ($scope.data.global.viewMode === "list") {
                $scope.numEventsInList = results.event;
            } else {
                if (results.event) {
                    $scope.numEvents = {
                        events: parseInt(results.event.events),
                        spaces: parseInt(results.event.spaces)
                    };
                } else {
                    $scope.numEvents = {
                        events: 0,
                        spaces: 0
                    };
                }
            }
            $scope.numProjects = parseInt(results.project);
        });
        $rootScope.$on("findOneResultReady", function(ev, result) {
            $scope.openEntity = result;
        });
        var formatDate = function(date) {
            return moment(date).format("DD/MM/YYYY");
        };
        $scope.dateOptions = {
            dateFormat: "dd/mm/yy"
        };
        $scope.$watch("data.event.from", function() {
            if (new Date($scope.data.event.from) > new Date($scope.data.event.to)) $scope.data.event.to = $scope.data.event.from;
        });
        $scope.$watch("data.event.to", function(newValue, oldValue) {
            if (new Date($scope.data.event.to) < new Date($scope.data.event.from)) $scope.data.event.from = $scope.data.event.to;
        });
        $scope.showEventDateFilter = function() {
            var from = $scope.data.event.from, to = $scope.data.event.to;
            return from !== skeletonData.event.from || to !== skeletonData.event.to;
        };
        $scope.eventDateFilter = function() {
            var from = $scope.data.event.from, to = $scope.data.event.to;
            if (from === to) return formatDate(from); else return "de " + formatDate(from) + " a " + formatDate(to);
        };
        $scope.cleanEventDateFilters = function() {
            $scope.data.event.from = skeletonData.event.from;
            $scope.data.event.to = skeletonData.event.to;
        };
        $scope.readableProjectRegistrationDates = function(project) {
            if (!project.registrationFrom) return false;
            var from = moment(project.registrationFrom.date).format("DD/MM/YYYY");
            var to = moment(project.registrationTo.date).format("DD/MM/YYYY");
            return from !== to ? "de " + from + " a " + to : from;
        };
        $scope.collapsedFilters = true;
        $scope.toggleAdvancedFilters = function() {
            $scope.collapsedFilters = !$scope.collapsedFilters;
            setTimeout(function() {
                window.adjustHeader();
            }, 10);
        };
    } ]);
})(angular);
//# sourceMappingURL=/assets/js/app-32090deda3d7c2b0a6baba8b64f07b94.js.map