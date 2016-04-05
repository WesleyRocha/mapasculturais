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
                    scrollto = $next_page_item.offset().top - $("#main-header").outerHeight(true);
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

MapasCulturais = MapasCulturais || {};

tabIndex = function() {
    window.tabEnabled = true;
};

jQuery(function() {
    $.fn.editableform.buttons = '<button type="button" class="editable-cancel btn btn-default">cancelar</button> <button type="submit" class="editable-submit">ok</button>';
    $.fn.select2.defaults.separator = "; ";
    $.fn.editabletypes.select2.defaults.viewseparator = "; ";
    MapasCulturais.Editables.init("#editable-entity");
    MapasCulturais.AjaxUploader.init();
    MapasCulturais.MetalistManager.init();
    MapasCulturais.Remove.init();
    $(".js-registration-action").click(function() {
        if ($(this).hasClass("selected")) return false;
        var href = $(this).data("href");
        var data = {
            agentId: $(this).data("agent-id")
        };
        var $this = $(this);
        $.post(href, data, function(response) {
            $this.parent().find(".js-registration-action").removeClass("selected");
            $this.addClass("selected");
        });
        return false;
    });
    $(".js-editable").on("shown", function(e, editable) {
        if ($(this).hasClass("js-mask-phone")) {
            var masks = [ "(00) 00000-0000", "(00) 0000-00009" ];
            editable.input.$input.mask(masks[1], {
                onKeyPress: function(val, e, field, options) {
                    field.mask(val.length > 14 ? masks[0] : masks[1], options);
                }
            });
        }
        if ($(this).hasClass("js-mask-cep")) {
            var masks = [ "00000-000" ];
            editable.input.$input.mask(masks[0], {
                onKeyPress: function(val, e, field, options) {
                    field.mask(masks[0], options);
                }
            });
        }
        if ($(this).hasClass("js-mask-time")) {
            var masks = [ "00:00" ];
            editable.input.$input.mask(masks[0], {
                onKeyPress: function(val, e, field, options) {
                    field.mask(masks[0], options);
                }
            });
        }
        var placeholder = editable.input.$input.attr("placeholder"), possibleSize = placeholder ? Math.max(placeholder.length, editable.value.length + 5) : 0;
        if (possibleSize > 20) {
            editable.input.$input.attr("size", possibleSize);
        }
    });
    $(".editable").on("shown", function(e, editable) {
        editable.container.$form.find(".editable-cancel").attr("title", "Cancelar Alteração (Esc)");
        switch (editable.input.type.trim()) {
          case "text|select":
            editable.container.$form.find(".editable-submit").attr("title", "Confirmar Alteração (Enter)");
            break;

          case "textarea":
            editable.container.$form.find(".editable-submit").attr("title", "Confirmar Alteração (Ctrl+Enter)");
            break;

          case "select2":
            editable.container.$form.find(".editable-submit").attr("title", "Confirmar Alteração (Ctrl+Enter)");
            setTimeout(function() {
                editable.container.$form.find(".select2-input").focus().on("keydown", function(e) {
                    if (e.which == 13 && e.ctrlKey) {
                        editable.container.$form.find(".editable-submit").click();
                    }
                });
            }, 100);
            break;
        }
        if (window.tabEnabled) {
            var $el = editable.$element;
            editable.input.$input.on("keydown", function(e) {
                if (e.which == 9) {
                    e.preventDefault();
                    if (e.shiftKey) {
                        $(this).blur();
                        $el.parents().prevAll(":has(.editable):first").find(".js-editable:last").editable("show");
                    } else {
                        $(this).blur();
                        $el.parents().nextAll(":has(.editable):first").find(".js-editable:first").editable("show");
                    }
                }
            });
            editable.$element.on("hidden", function(e, reason) {
                if (reason == "save" || reason == "nochange") $el.parents().nextAll(":has(.editable):first").find(".editable:first").editable("show");
            });
        }
    });
    if ($(".js-verified").length) {
        $(".js-verified").click(function() {
            var $this = $(this);
            if ($this.hasClass("active")) {
                $this.removeClass("active");
                $("#is-verified-input").editable("setValue", 0);
            } else {
                $this.addClass("active");
                $("#is-verified-input").editable("setValue", 1);
            }
            return false;
        });
    }
});

$(window).on("beforeunload", function() {
    if ($(".editable-unsaved").length) {
        return "Há alterações não salvas nesta página.";
    }
});

MapasCulturais.Remove = {
    init: function() {
        $("body").on("click", ".js-remove-item", function(e) {
            e.stopPropagation();
            var $this = $(this);
            MapasCulturais.confirm("Deseja remover este item?", function() {
                var $target = $($this.data("target"));
                var href = $this.data("href");
                $.getJSON(href, function(r) {
                    if (r.error) {
                        MapasCulturais.Messages.error(r.data);
                    } else {
                        var cb = function() {};
                        if ($this.data("remove-callback")) cb = $this.data("remove-callback");
                        $target.remove();
                        if (typeof cb === "string") eval(cb); else cb();
                    }
                });
            });
            return false;
        });
    }
};

MapasCulturais.Editables = {
    dataSelector: "edit",
    baseTarget: "",
    init: function(editableEntitySelector) {
        this.baseTarget = MapasCulturais.baseURL + $(editableEntitySelector).data("entity");
        this.createAll();
        if (MapasCulturais.isEditable) {
            this.setButton(editableEntitySelector);
            this.initTaxonomies();
            this.initTypes();
            if (MapasCulturais.request.controller === "registration") this.initRegistrationCategories();
            if (MapasCulturais.request.controller === "space") this.initSpacePublicEditable();
        }
    },
    initSpacePublicEditable: function() {
        $("#editable-space-status").on("hidden", function(e, reason) {
            if ($(this).editable("getValue", true) == "1") {
                $("#editable-space-status").html('<div class="venue-status"><div class="icon icon-publication-status-open"></div>Publicação livre</div><p class="venue-status-definition">Qualquer pessoa pode criar eventos.</p>');
            } else {
                $("#editable-space-status").html('<div class="venue-status"><div class="icon icon-publication-status-locked"></div>Publicação restrita</div><p class="venue-status-definition">Requer autorização para criar eventos.</p>');
            }
        });
    },
    initTaxonomies: function() {
        $(".js-editable-taxonomy").each(function() {
            var taxonomy = $(this).data("taxonomy");
            var select2_option = {
                tags: [],
                tokenSeparators: [ ";", ";" ],
                separator: "; "
            };
            if (MapasCulturais.taxonomyTerms[taxonomy]) select2_option.tags = MapasCulturais.taxonomyTerms[taxonomy];
            if ($(this).data("restrict")) select2_option.createSearchChoice = function() {
                return null;
            };
            var config = {
                name: "terms[" + taxonomy + "]",
                type: "select2",
                select2: select2_option
            };
            $.fn.poshytip.defaults.showAniDuration = 80;
            $.fn.poshytip.defaults.hideAniDuration = 40;
            $(this).editable(config);
        });
    },
    initRegistrationCategories: function() {
        $(".js-editable-registrationCategory").each(function() {
            var config = {
                name: "category",
                type: "select",
                source: MapasCulturais.entity.registrationCategories
            };
            $(this).editable(config);
        });
    },
    initTypes: function() {
        $(".js-editable-type").each(function() {
            var entity = $(this).data("entity");
            $.each(MapasCulturais.entityTypes[entity], function(i, obj) {
                obj.text = obj.name;
                obj.value = obj.id;
            });
            var config = {
                name: "type",
                type: "select",
                source: MapasCulturais.entityTypes[entity]
            };
            $(this).editable(config);
        });
    },
    getEditableElements: function() {
        if (MapasCulturais.isEditable) return $(".js-editable, .js-editable-taxonomy, .js-editable-type, .js-editable-registrationCategory"); else return $(".js-xedit");
    },
    createAll: function() {
        var entity = MapasCulturais.entity.definition;
        MapasCulturais.Editables.getEditableElements().each(function() {
            var field_name = $(this).data(MapasCulturais.Editables.dataSelector);
            var input_type;
            if (!entity[field_name]) return;
            var config = {
                name: field_name,
                type: "text",
                emptytext: entity[field_name].label,
                placeholder: entity[field_name].label
            };
            var select_value = null;
            switch (entity[field_name].type) {
              case "text":
                config.type = "textarea";
                break;

              case "select":
                config.type = "select";
                config.source = [];
                for (var k in entity[field_name].options) {
                    var obj = {
                        value: k,
                        text: entity[field_name].options[k]
                    };
                    config.source.push(obj);
                }
                break;

              case "date":
              case "datetime":
                config.type = "date";
                config.format = "yyyy-mm-dd";
                config.viewformat = "dd/mm/yyyy";
                config.datepicker = {
                    weekStart: 1,
                    yearRange: $(this).data("yearrange") ? $(this).data("yearrange") : "1900:+0"
                };
                delete config.placeholder;
                config.clear = "Limpar";
                break;

              case "boolean":
                config.type = "checklist";
                config.source = [ {
                    value: 0,
                    text: "false"
                }, {
                    value: 1,
                    text: "true"
                } ];
                config.emptytext = "Não";
            }
            if (config.type !== "date") {
                $(this).editable(config);
            }
            if (config.type === "select") {
                var $e = $(this);
                var v = $e.html();
                config.source.forEach(function(e) {
                    if (e.value === v) {
                        $e.editable("setValue", v);
                    }
                });
            }
            if ($(this).data("notext")) {
                $(this).text("");
                var that = this;
                $(this).on("hidden", function() {
                    $(that).text("");
                });
            }
            if (config.type === "date") {
                var $datepicker = $(this);
                if (!$(this).data("timepicker")) {
                    $datepicker.editable(config);
                    $datepicker.on("hidden", function(e, editable) {
                        if ($(this).editable("getValue", true) == null) {
                            $(this).editable("setValue", "");
                        }
                    });
                } else {
                    var $timepicker = $($datepicker.data("timepicker"));
                    var $hidden = $('<input class="js-include-editable" type="hidden">').insertAfter($timepicker);
                    $datepicker.attr("data-edit", $datepicker.data("edit") + "_datepicker");
                    $timepicker.editable();
                    $hidden.editable({
                        name: $datepicker.data("edit")
                    });
                    $datepicker.editable(config);
                    if ($timepicker.data("datetime-value")) $hidden.editable("setValue", $timepicker.data("datetime-value")); else $hidden.editable("setValue", "");
                    $timepicker.on("save", function(e, params) {
                        if (!params.newValue) {
                            params.newValue = "23:59";
                            $timepicker.editable("setValue", "23:59");
                        }
                        $hidden.editable("setValue", moment($datepicker.editable("getValue", true)).format("YYYY-M-D") + " " + params.newValue);
                    });
                    $datepicker.on("save", function(e, params) {
                        if (params.newValue) {
                            if (!$timepicker.editable("getValue", true)) {
                                $timepicker.editable("setValue", "23:59");
                            }
                            $hidden.editable("setValue", moment(params.newValue).format("YYYY-M-D") + " " + $timepicker.editable("getValue", true));
                        } else {
                            $hidden.editable("setValue", "");
                            $timepicker.editable("setValue", "");
                        }
                    });
                    $timepicker.on("shown", function(e, editable) {
                        var $input = editable.input.$input;
                        $input.mask("00:00", {
                            onComplete: function(time) {}
                        });
                    });
                }
            }
        });
    },
    setButton: function(editableEntitySelector) {
        var $submitButton = $(".js-submit-button");
        $(document.body).on("keydown", function(event) {
            if (event.ctrlKey && event.keyCode === 83) {
                event.preventDefault();
                event.stopPropagation();
                $submitButton.each(function() {
                    if ($(this).data("status") == MapasCulturais.entity.status) {
                        $(this).trigger("click");
                    }
                });
            }
        });
        $submitButton.click(function() {
            var target;
            var $button = $(this);
            var controller = MapasCulturais.request.controller;
            var action = $(editableEntitySelector).data("action");
            var $editables = MapasCulturais.Editables.getEditableElements().add(".js-include-editable");
            if (action === "create") {
                target = MapasCulturais.createUrl(controller, "index");
            } else {
                target = MapasCulturais.createUrl(controller, "single", [ $(editableEntitySelector).data("id") ]);
                if (MapasCulturais.entity.status == 0 && $button.data("status") == 1) {
                    var message = MapasCulturais.request.controller === "event" ? "Você tem certeza que deseja publicar este " + MapasCulturais.entity.getTypeName(MapasCulturais.request.controller) + "? " : "Você tem certeza que deseja publicar este " + MapasCulturais.entity.getTypeName(MapasCulturais.request.controller) + "? Isto não poderá ser desfeito.";
                    if (!confirm(message)) {
                        return;
                    }
                }
            }
            if ($submitButton.data("clicked")) return false;
            $submitButton.data("clicked", "sim");
            if ($editables.length === 1) {
                $("body").append('<input type="hidden" id="fixeditable"/>');
                $editables = $editables.add($("#fixeditable"));
            }
            $editables.editable("submit", {
                url: target,
                data: {
                    status: $button.data("status")
                },
                ajaxOptions: {
                    dataType: "json",
                    type: action === "create" ? "post" : "put",
                    statusCode: {
                        202: function(response, statusText, r) {
                            var createdRequests = JSON.parse(r.getResponseHeader("CreatedRequests")), typeName = MapasCulturais.entity.getTypeName(), name = "";
                            if (createdRequests && createdRequests.indexOf("ChildEntity") >= 0) {
                                name = $('[data-field-name="parentId"]').text();
                                $(".js-pending-parent").show();
                                MapasCulturais.Messages.alert("Sua requisição para fazer deste " + typeName + " filho de <strong>" + name + "</strong> foi enviada.");
                            }
                            if (createdRequests && createdRequests.indexOf("EventProject") >= 0) {
                                name = $('[data-field-name="projectId"]').text();
                                $(".js-pending-project").show();
                                MapasCulturais.Messages.alert("Sua requisição para associar este evento ao projeto <strong>" + name + "</strong> foi enviada.");
                            }
                        }
                    }
                },
                success: function(response) {
                    $(".js-pending-project, .js-pending-parent").hide();
                    $(".js-response-error").remove();
                    if (response.error) {
                        var $field = null;
                        var errors = "";
                        var unknow_errors = [];
                        var field_found = false;
                        var firstShown = false;
                        for (var p in response.data) {
                            if (MapasCulturais.request.controller === "event" && p === "project") {
                                $field = $('.editable[data-field-name="projectId"');
                            } else if (p.substr(0, 5) == "term-") {
                                $field = $("#" + p);
                            } else if (p == "type") {
                                $field = $(".js-editable-type");
                            } else if (MapasCulturais.request.controller === "registration" && p === "owner") {
                                firstShown = true;
                                $field = $("#registration-agent-owner").parent().find(".registration-label span");
                            } else {
                                $field = $('.js-editable[data-edit="' + p + '"]');
                            }
                            for (var k in response.data[p]) {
                                if ($field.length) {
                                    field_found = true;
                                    var errorHtml = '<span title="' + response.data[p][k] + '" class="danger hltip js-response-error" data-hltip-classes="hltip-danger"></span>';
                                    $field.parent().append(errorHtml);
                                } else {
                                    unknow_errors.push(response.data[p][k]);
                                }
                            }
                            if (!firstShown) {
                                firstShown = true;
                                $field.editable("show");
                            }
                            $field.on("save", function() {
                                $(this).parent().find(".danger.hltip").remove();
                            });
                        }
                        if (field_found) MapasCulturais.Messages.error("Corrija os erros indicados abaixo.");
                        if (unknow_errors) {
                            for (var i in unknow_errors) {
                                MapasCulturais.Messages.error(unknow_errors[i]);
                            }
                        }
                    } else {
                        $("body").trigger("entity-saved", response);
                        $(".js-geo-division-address").each(function() {
                            var r = response[$(this).data("metakey")];
                            $(this).html(r ? r : "");
                            $(this).parent().css("display", r ? "block" : "none");
                        });
                        MapasCulturais.Messages.success("Edições salvas.");
                        $(".editable-unsaved").css("background-color", "").removeClass("editable-unsaved").parent().removeClass("danger");
                        if (MapasCulturais.request.controller != "registration" && (action === "create" || response.status != MapasCulturais.entity.status)) {
                            document.location = MapasCulturais.createUrl(controller, "edit", [ response.id ]);
                        }
                    }
                    $submitButton.data("clicked", false);
                },
                error: function(response) {
                    $submitButton.data("clicked", false);
                    if (response.status === 401) MapasCulturais.auth.require(function() {
                        $submitButton.click();
                    }); else {
                        MapasCulturais.Messages.error("Um erro inesperado aconteceu.");
                    }
                }
            });
        });
    }
};

MapasCulturais.AjaxUploader = {
    resetProgressBar: function(containerSelector, acivate) {
        var bar = $(containerSelector).find(".js-ajax-upload-progress .bar");
        var percent = $(containerSelector).find(".js-ajax-upload-progress .percent");
        var percentVal = "0%";
        bar.stop().width(percentVal);
        percent.html(percentVal);
        if (!acivate) $(containerSelector).find(".js-ajax-upload-progress .progress").addClass("inactive"); else $(containerSelector).find(".js-ajax-upload-progress .progress").removeClass("inactive");
    },
    animationTime: 100,
    init: function(selector) {
        selector = selector || ".js-ajax-upload";
        $(selector).each(function() {
            if ($(this).data("initialized")) return;
            $(this).show();
            $(this).data("initialized", true);
            var bar = $(this).parent().find(".js-ajax-upload-progress .bar");
            var percent = $(this).parent().find(".js-ajax-upload-progress .percent");
            MapasCulturais.AjaxUploader.resetProgressBar($(this).parent(), false);
            var $this = $(this);
            $(this).ajaxForm({
                beforeSend: function(xhr) {
                    $this.data("xhr", xhr);
                },
                beforeSubmit: function(arr, $form, options) {
                    MapasCulturais.AjaxUploader.resetProgressBar($form.parent(), true);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + "%";
                    bar.animate({
                        width: percentVal
                    });
                    percent.html(percentVal);
                },
                success: function(response, statusText, xhr, $form) {
                    var percentVal = "100%";
                    bar.width(percentVal);
                    percent.html(percentVal);
                    if (response.error) {
                        MapasCulturais.AjaxUploader.resetProgressBar($form.parent(), false);
                        var group = $form.data("group");
                        var error_message = typeof response.data == "string" ? response.data : response.data[group];
                        $form.find("div.alert.danger").html(error_message).fadeIn(this.animationTime).delay(5e3).fadeOut(this.animationTime);
                        return;
                    }
                    var $target = $($form.data("target"));
                    var group = $form.find("input:file").attr("name");
                    var template = $form.find("script").text();
                    if ($form.data("action")) {
                        switch ($form.data("action").toString()) {
                          case "replace":
                            var html = Mustache.render(template, response[group]);
                            $target.replaceWith($(html));
                            break;

                          case "set-content":
                            var html = Mustache.render(template, response[group]);
                            $target.html(html);
                            break;

                          case "a-href":
                            try {
                                $target.attr("href", response[group].url);
                            } catch (e) {}
                            break;

                          case "image-src":
                            try {
                                if ($form.data("transform")) $target.attr("src", response[group].files[$form.data("transform")].url); else $target.attr("src", response[group].url);
                            } catch (e) {}
                            break;

                          case "background-image":
                            $target.each(function() {
                                try {
                                    if ($form.data("transform")) $(this).css("background-image", "url(" + response[group].files[$form.data("transform")].url + ")"); else $(this).css("background-image", "url(" + response[group].url + ")");
                                } catch (e) {}
                            });
                            break;

                          case "append":
                            for (var i in response[group]) {
                                if (!response[group][i].description) response[group][i].description = response[group][i].name;
                                var html = Mustache.render(template, response[group][i]);
                                $target.append(html);
                            }
                            break;
                        }
                    }
                    $form.trigger("ajaxForm.success", [ response ]);
                    $form.get(0).reset();
                    if ($form.parents(".js-editbox").data("success-callback")) eval($form.parents(".js-editbox").data("success-callback"));
                    $form.parents(".js-editbox").find(".mc-cancel").click();
                },
                dataType: "json"
            });
        });
    }
};

MapasCulturais.MetalistManager = {
    init: function() {
        $(".js-metalist-form").ajaxForm({
            beforeSubmit: function(arr, $form, options) {
                var group = $form.parents(".js-editbox").data("metalist-group");
                var $linkField = $form.find("input.js-metalist-value");
                var $errorTag = $form.find(".alert.danger");
                $errorTag.html("");
                if (group === "videos") {
                    if ($.trim($form.find("input.js-metalist-title").val()) === "") {
                        $errorTag.html("Insira um título para seu vídeo.").show();
                        return false;
                    }
                    var parsedURL = purl($linkField.val());
                    if (parsedURL.attr("host").indexOf("youtube") === -1 && parsedURL.attr("host").indexOf("vimeo") === -1) {
                        $errorTag.html("Insira uma url de um vídeo do YouTube ou do Vimeo.").show();
                        return false;
                    }
                } else if (group === "links") {
                    if ($.trim($form.find("input.js-metalist-title").val()) === "") {
                        $errorTag.html("Insira um título para seu link.").show();
                        return false;
                    }
                    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    if (!pattern.test($linkField.val())) {
                        $errorTag.html("A url do link é inválida, insira uma url completa como http://www.google.com/.").show();
                        return false;
                    }
                }
            },
            success: function(response, statusText, xhr, $form) {
                if (response.error) {
                    return;
                }
                var $target = $($form.data("response-target"));
                var group = $form.data("metalist-group");
                var action = $form.data("metalist-action");
                var template = $form.find("script.js-response-template").text();
                var $editBtn;
                var $html = $(Mustache.render(template, response));
                $editBtn = $html.find(".js-open-editbox");
                $editBtn.data("item", response);
                switch (action) {
                  case "edit":
                    $target.replaceWith($html);
                    $target = $html;
                    MapasCulturais.EditBox.initButtons($editBtn);
                    if (group === "videos") {
                        MapasCulturais.Video.getAndSetVideoData(response.value, $target.find(".js-metalist-item-display"), MapasCulturais.Video.setupVideoGalleryItem);
                    }
                    break;

                  default:
                    $target.append($html);
                    MapasCulturais.EditBox.initButtons($editBtn);
                    if (group === "videos") {
                        MapasCulturais.Video.getAndSetVideoData(response.value, $("#video-" + response.id), MapasCulturais.Video.setupVideoGalleryItem);
                        $("#video-player:hidden").show();
                    }
                }
                $form.parents(".js-editbox").find(".mc-cancel").click();
            },
            dataType: "json"
        });
        $(".js-metalist-form .js-metalist-item-delete").on("click", function() {
            if (confirm("Tem Certeza de que deseja excluir este item?")) {
                $form = $(this).parent();
                $form.find('input:hidden[name="metalist_action"]').val("delete");
                $form.find("input:submit").click();
                $form.parent().hide();
            }
        });
    },
    updateDialog: function($caller) {
        var $dialog = $($caller.data("target"));
        var $form = $dialog.find(".js-metalist-form");
        var group = $dialog.data("metalist-group");
        var item = $caller.data("item") || {};
        if (typeof item === "string") item = JSON.parse(item);
        $form.data("metalist-action", $caller.data("metalist-action"));
        $form.data("metalist-group", group);
        if ($caller.data("metalist-action") === "edit") {
            if (group === "videos") $dialog.removeClass("mc-top").addClass("mc-bottom");
            $form.find("input.js-metalist-group").attr("name", "").val("");
            $form.attr("action", MapasCulturais.baseURL + "metalist/single/" + item.id);
        } else {
            if (group === "videos") $dialog.removeClass("mc-bottom").addClass("mc-top");
            $form.find("input.js-metalist-group").attr("name", "group").val(group);
            $form.attr("action", $dialog.data("action-url"));
        }
        $form.data("response-target", $caller.data("response-target"));
        $form.find("input.js-metalist-title").attr("placeholder", $dialog.data("metalist-title-label"));
        $form.find("input.js-metalist-value").attr("placeholder", $dialog.data("metalist-value-label"));
        $form.find("input.js-metalist-title").val(item.title);
        $form.find("input.js-metalist-value").val(item.value);
        var responseTemplate = "";
        if ($caller.data("metalist-action") === "edit") {
            responseTemplate = $dialog.data("response-template");
        } else {
            $dialog.find("h2").html($caller.data("dialog-title"));
            responseTemplate = $caller.data("response-template");
        }
        $form.find("script.js-response-template").text(responseTemplate);
        if (group === "videos") {
            $form.find("input.js-metalist-value").on("change", function() {
                MapasCulturais.Video.getAndSetVideoData($(this).val(), $form.find("input.js-metalist-title"), MapasCulturais.Video.setTitle);
            });
        }
    }
};

$(function() {
    function concatena_enderco() {
        var nome_logradouro = $("#En_Nome_Logradouro").editable("getValue", true);
        var cep = $("#En_CEP").editable("getValue", true);
        var numero = $("#En_Num").editable("getValue", true);
        var complemento = $("#En_Complemento").editable("getValue", true);
        var bairro = $("#En_Bairro").editable("getValue", true);
        var municipio = $("#En_Municipio").editable("getValue", true);
        var estado = $("#En_Estado").editable("getValue", true);
        if (cep && nome_logradouro && numero && bairro && municipio && estado) {
            var endereco = nome_logradouro + ", " + numero + (complemento ? ", " + complemento : " ") + ", " + bairro + ", " + cep + ", " + municipio + ", " + estado;
            $("#endereco").editable("setValue", endereco);
            $("#endereco").trigger("changeAddress", endereco);
            $(".js-endereco").html(endereco);
        }
    }
    $("#En_Nome_Logradouro, #En_CEP, #En_Num, #En_Complemento, #En_Bairro, #En_Municipio,  #En_Estado").on("hidden", function(e, params) {
        concatena_enderco();
    });
    $("#En_CEP").on("hidden", function(e, params) {
        var cep = $("#En_CEP").editable("getValue", true);
        cep = cep.replace("-", "");
        $.getJSON("http://cep.correiocontrol.com.br/" + cep + ".json", function(r) {
            $("#En_Nome_Logradouro").editable("setValue", r.logradouro);
            $("#En_Bairro").editable("setValue", r.bairro);
            $("#En_Municipio").editable("setValue", r.localidade);
            $("#En_Estado").editable("setValue", r.uf);
            concatena_enderco();
        });
    });
});

$(function() {
    MapasCulturais.EventOccurrenceManager.initMapTogglers(".toggle-mapa");
});

MapasCulturais.eventOccurrenceUpdateDialog = function($caller) {
    var $dialog = $($caller.data("dialog"));
    $dialog.find("h2").html($caller.data("dialog-title"));
    var template = MapasCulturais.TemplateManager.getTemplate("event-occurrence-form");
    var item = $caller.data("item") || {};
    if ($caller.data("form-action") == "edit") {
        item.formAction = item.editUrl;
        item.rule["freq_" + item.rule.frequency] = true;
        item.rule["monthly_" + item.rule.monthly] = true;
    } else {
        item.formAction = MapasCulturais.baseURL + "eventOccurrence/create";
    }
    $dialog.find(".js-dialog-content").html(Mustache.render(template, item));
    MapasCulturais.EventOccurrenceManager.init($dialog.find("form"));
    MapasCulturais.EventHumanReadableManager.init($dialog.find("form"));
    $dialog.find("form").data("action", $caller.data("form-action"));
    MapasCulturais.Search.init(".js-search-occurrence-space");
    MapasCulturais.EventDates.init(".js-event-dates");
    var $startsAt = $dialog.find("form").find(".js-event-time");
    var $duration = $dialog.find("form").find(".js-event-duration");
    var $endsAt = $dialog.find("form").find(".js-event-end-time");
    $startsAt.mask("00:00", {
        onComplete: function(time) {
            var mtime = moment(time, "HH:mm");
            var duration = $duration.val();
            if (mtime.isValid() && $.isNumeric(duration)) {
                $endsAt.val(mtime.add(duration, "minutes").format("HH:mm"));
            }
        }
    });
    $duration.mask("99999999");
    $duration.change(function(event) {
        var mtime = moment($startsAt.val(), "HH:mm");
        var duration = $(this).val();
        if (mtime.isValid() && $.isNumeric(duration)) {
            $endsAt.val(mtime.add(duration, "minutes").format("HH:mm"));
        }
    });
    $endsAt.mask("00:00", {
        onComplete: function(time) {
            var mendtime = moment(time, "HH:mm");
            var mtime = moment($startsAt.val(), "HH:mm");
            if (mtime.isValid() && mendtime.isValid()) {
                $duration.val(Math.abs(mendtime.diff(mtime, "minutes")));
            }
        }
    });
};

MapasCulturais.EventOccurrenceManager = {
    localeDateOptions: {
        locale: "pt-BR",
        dateOptions: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    },
    formatDate: function(value) {
        if (!value) return ""; else return new Date(value + " 12:00:00 GMT").toLocaleDateString(this.localeDateOptions.locale, this.localeDateOptions.dateOptions);
    },
    init: function(selector) {
        $(selector).ajaxForm({
            success: function(response, statusText, xhr, $form) {
                $form.find(".danger").not(".alert").remove();
                if (response.error) {
                    var $element = null, message;
                    for (i in response.data) {
                        message = response.data[i].join(", ").toLowerCase();
                        if (i == "space") $element = $form.find(".js-space"); else $element = $form.find('[name="' + i + '"]').parents(".grupo-de-campos").find("label");
                        $element.append('<span class="danger hltip" data-hltip-classes="hltip-danger" title="Erro:' + message + '"/>');
                    }
                    $form.parent().scrollTop(0);
                    $form.find("div.alert.danger").html("Corrija os erros indicados abaixo.").fadeIn(MapasCulturais.Messages.fadeOutSpeed).delay(MapasCulturais.Messages.delayToFadeOut).fadeOut(MapasCulturais.Messages.fadeOutSpeed);
                    return;
                }
                response.pending = xhr.status === 202;
                var isEditing = $form.data("action") == "edit";
                var template = MapasCulturais.TemplateManager.getTemplate("event-occurrence-item");
                response.rule.screen_startsOn = MapasCulturais.EventOccurrenceManager.formatDate(response.rule.startsOn);
                response.rule.screen_until = MapasCulturais.EventOccurrenceManager.formatDate(response.rule.until);
                response.rule.screen_frequency = MapasCulturais.frequencies[response.rule.frequency];
                var $renderedData = $(Mustache.render(template, response));
                var $editBtn = $renderedData.find(".js-open-dialog");
                $editBtn.data("item", response);
                if (isEditing) {
                    $("#event-occurrence-" + response.id).replaceWith($renderedData);
                } else {
                    $(".js-event-occurrence").append($renderedData);
                }
                MapasCulturais.Modal.initButtons($editBtn);
                $form.parents(".js-dialog").find(".js-close").click();
                MapasCulturais.Map.initialize({
                    mapSelector: "#occurrence-map-" + response.id,
                    locateMeControl: false
                });
                MapasCulturais.EventOccurrenceManager.initMapTogglers($("#event-occurrence-" + response.id).find(".toggle-mapa"));
                if (xhr.status === 202) {
                    MapasCulturais.Messages.alert("Sua requisição para criar a ocorrência do evento no espaço <strong>" + response.space.name + "</strong> foi enviada.");
                }
            },
            error: function(xhr, textStatus, errorThrown, $form) {
                $form.parent().scrollTop(0);
                if (xhr.status === 403) {
                    $form.find("div.alert.danger").html("Você não tem permissão para criar eventos nesse espaço.").fadeIn(MapasCulturais.Messages.fadeOutSpeed).delay(MapasCulturais.Messages.delayToFadeOut).fadeOut(MapasCulturais.Messages.fadeOutSpeed);
                } else {
                    $form.find("div.alert.danger").html("Erro inesperado.").fadeIn(MapasCulturais.Messages.fadeOutSpeed).delay(MapasCulturais.Messages.delayToFadeOut).fadeOut(MapasCulturais.Messages.fadeOutSpeed);
                }
            },
            dataType: "json",
            beforeSubmit: function(arr, $form, options) {
                if ($form.find('input[name="description"]').data("synced") != 1) return confirm("As datas foram alteradas mas a descrição não. Tem certeza que deseja salvar?");
                return true;
            }
        });
        $(selector).find(".js-select-frequency").change(function() {
            $(selector).find(".js-freq-hide").not(".js-" + $(this).val()).hide().find("input").not("[type=checkbox]").val("");
            $(selector).find(".js-freq-hide.js-" + $(this).val()).show();
            $(selector).find(".js-freq-hide").not(".js-" + $(this).val()).find("input[type=checkbox]").attr("checked", false);
        });
        $(selector).find(".js-select-frequency").change();
    },
    initMapTogglers: function(selector) {
        $(selector).click(function() {
            var $map = $(this).closest(".regra").find(".mapa");
            MapasCulturais.reenableScrollWheelZoom = false;
            if ($map.is(":visible")) {
                $map.slideUp("fast");
                $(this).parent().find(".ver-mapa").show();
                $(this).parent().find(".ocultar-mapa").hide();
            } else {
                $map.slideDown("fast", function() {
                    $map.data("leaflet-map").invalidateSize();
                    $map.data("leaflet-map").scrollWheelZoom.disable();
                });
                $(this).parent().find(".ver-mapa").hide();
                $(this).parent().find(".ocultar-mapa").show();
            }
            return false;
        });
    }
};

MapasCulturais.EventDates = {
    init: function(selector) {
        $(selector).each(function() {
            var fieldSelector = "#" + $(this).attr("id");
            var altFieldSelector = $(this).data("alt-field") ? $(this).data("alt-field") : fieldSelector.replace("-visible", "");
            if ($(altFieldSelector).length == 0) {
                return;
            }
            $(this).datepicker({
                dateFormat: $(this).data("date-format") ? $(this).data("date-format") : "dd/mm/yy",
                altFormat: $(this).data("alt-format") ? $(this).data("alt-format") : "yy-mm-dd",
                altField: altFieldSelector
            });
        });
    }
};

MapasCulturais.EventHumanReadableManager = {
    init: function(selector) {
        var $form = $(selector);
        $(selector).find('input[type="checkbox"], select[name="frequency"], #horario-de-inicio, .js-start-date, .js-end-date').change(function() {
            MapasCulturais.EventHumanReadableManager.updateSuggestion($form);
        });
        var date_s = $(selector).find(".js-start-date").val();
        var hour = $(selector).find("#horario-de-inicio").val();
        if (date_s && hour) MapasCulturais.EventHumanReadableManager.updateSuggestion($form);
        $(selector).find(".grupo-descricao-automatica > a").click(function() {
            $(selector).find('input[name="description"]').val($(selector).find("#descricao-automatica").html()).data("synced", 1);
        });
        $(selector).find('input[name="description"]').data("synced", 1);
    },
    updateSuggestion: function(selector) {
        var human = MapasCulturais.EventHumanReadableManager.getSuggestion(selector);
        $(selector).find("#descricao-automatica").html(human);
        if (human == $(selector).find('input[name="description"]').val()) $(selector).find('input[name="description"]').data("synced", 1); else $(selector).find('input[name="description"]').data("synced", 0);
    },
    getSuggestion: function(selector) {
        var human = "";
        var date_s = $(selector).find(".js-start-date").val();
        var hour = $(selector).find("#horario-de-inicio").val();
        var frequency = $(selector).find('select[name="frequency"]').val();
        var date_e = $(selector).find(".js-end-date").val();
        var weekDays = [];
        $(selector).find('input[type="checkbox"]:checked').each(function() {
            if ($(this).is(":checked")) weekDays.push($(this).attr("name").replace(/[^\d]/g, ""));
        });
        var mdate_s = false;
        var mdate_e = false;
        if (date_s) mdate_s = moment(date_s, "DD/MM/YYYY");
        if (date_e) mdate_e = moment(date_e, "DD/MM/YYYY");
        if (frequency == "once") {
            if (!mdate_s) return "...";
            human += "Dia " + mdate_s.format("D [de] MMMM [de] YYYY");
        } else {
            if (!mdate_s || !mdate_e) return "...";
            if (frequency == "daily") {
                human += "Diariamente";
            } else if (frequency == "weekly") {
                if (weekDays.length > 0) {
                    if (weekDays[0] == "0" || weekDays[0] == "6") {
                        human += "Todo ";
                    } else {
                        human += "Toda ";
                    }
                    var count = 1;
                    $.each(weekDays, function(i, v) {
                        var wformat = weekDays.length > 1 ? "ddd" : "dddd";
                        human += moment().day(v).format(wformat);
                        count++;
                        if (count == weekDays.length) human += " e "; else if (count < weekDays.length) human += ", ";
                    });
                }
            }
            if (mdate_s.year() != mdate_e.year()) {
                human += " de " + mdate_s.format("D [de] MMMM [de] YYYY") + " a " + mdate_e.format("D [de] MMMM [de] YYYY");
            } else {
                if (mdate_s.month() != mdate_e.month()) {
                    human += " de " + mdate_s.format("D [de] MMMM") + " a " + mdate_e.format("D [de] MMMM [de] YYYY");
                } else {
                    human += " de " + mdate_s.format("D") + " a " + mdate_e.format("D [de] MMMM [de] YYYY");
                }
            }
        }
        if (hour) {
            if (hour.substring(0, 2) == "01") human += " à " + hour; else human += " às " + hour;
        }
        return human;
    }
};

(function(angular) {
    "use strict";
    angular.module("mc.directive.multiselect", []).directive("multiselect", function() {
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.multiselect,
            scope: {
                allowOther: "@",
                allowOtherText: "@",
                terms: "=",
                values: "="
            },
            link: function($scope, element, attribute) {
                $scope.cfg = {
                    show: false,
                    allowOtherText: $scope.allowOtherText,
                    outros: ""
                };
                function sanitize(term) {
                    return term;
                }
                var terms = $scope.terms.map(function(term) {
                    return sanitize(term);
                });
                function setOutros(virgula) {
                    var _outros = [];
                    $scope.values.forEach(function(term) {
                        var has = true;
                        terms.forEach(function(t) {
                            if (t.value === term) {
                                has = false;
                            }
                        });
                        if (has) {
                            _outros.push(term);
                        }
                    });
                    $scope.cfg.outros = _outros.join("; ");
                    if (virgula && $scope.cfg.outros.trim().length > 0) {
                        $scope.cfg.outros += ";";
                    }
                }
                $scope.checked = function(term) {
                    term = sanitize(term);
                    return $scope.values.indexOf(term) >= 0;
                };
                $scope.toggleTerm = function(term) {
                    term = sanitize(term);
                    if (!angular.isArray($scope.values)) {
                        $scope.values = [ term ];
                    } else {
                        var idx = $scope.values.indexOf(term);
                        if (idx < 0) {
                            $scope.values.push(term);
                        } else {
                            $scope.values.splice(idx, 1);
                        }
                    }
                };
                $scope.update = function(e) {
                    if (!e || e && e.keyCode === 191 && !e.shiftKey) {
                        var _outros = $scope.cfg.outros.split(";").map(function(term) {
                            return term.trim();
                        });
                        _outros.forEach(function(term, i) {
                            term = _outros[i] = term.trim();
                            if (term.length && $scope.values.indexOf(term) === -1) {
                                $scope.values.push(term);
                            }
                        });
                        $scope.values.forEach(function(term, i) {
                            if (terms.indexOf(term) === -1 && _outros.indexOf(term) === -1) {
                                $scope.values.splice(i, 1);
                            }
                        });
                        setOutros(e && e.keyCode === 191);
                    }
                };
                setOutros();
                $scope.cfg.show = $scope.cfg.outros.length > 0;
            }
        };
    });
})(angular);

(function(angular) {
    "use strict";
    angular.module("mc.directive.singleselect", []).directive("singleselect", function() {
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.singleselect,
            scope: {
                name: "@",
                value: "=",
                terms: "=",
                allowOther: "@",
                allowOtherText: "@"
            },
            link: function($scope, element, attribute) {
                function sanitize(term) {
                    if (!term) {
                        term = "";
                    }
                    return term.trim();
                }
                $scope.data = {
                    name: $scope.name,
                    value: $scope.value,
                    terms: $scope.terms,
                    allowOther: $scope.allowOther,
                    allowOtherText: $scope.allowOtherText
                };
                $scope.clickOther = function() {
                    if (sanitize($scope.data.value) === "" || $scope.terms[sanitize($scope.data.value)]) {
                        $scope.data.value = "";
                        $scope.data.showOther = true;
                    }
                };
                if ($scope.data.value && !$scope.terms[sanitize($scope.data.value)]) {
                    $scope.data.showOther = true;
                }
                $scope.notOther = function() {
                    $scope.data.showOther = false;
                };
                $scope.$watch("data.value", function(a, b) {
                    $scope.value = $scope.data.value;
                });
            }
        };
    });
})(angular);

(function(angular) {
    "use strict";
    angular.module("mc.directive.editBox", []).factory("EditBox", function() {
        function setPosition($box, target) {
            if ($box.hasClass("mc-left")) {
                $box.position({
                    my: "right-20 center",
                    at: "left center",
                    of: target
                });
            } else if ($box.hasClass("mc-right")) {
                $box.position({
                    my: "left+20 center",
                    at: "right center",
                    of: target
                });
            } else if ($box.hasClass("mc-top")) {
                $box.position({
                    my: "center bottom-20",
                    at: "center top",
                    of: target
                });
            } else if ($box.hasClass("mc-bottom")) {
                $box.position({
                    my: "center top+20",
                    at: "center bottom",
                    of: target
                });
            }
        }
        var editBox = {
            openEditboxes: {},
            register: function(editboxId) {
                if (this.openEditboxes[editboxId] && document.getElementById(editboxId)) throw new Error("EditBox with id " + editboxId + " already exists");
                this.openEditboxes[editboxId] = false;
                var $box = jQuery("#" + editboxId);
                var $submitInput = $box.find("input:text");
                $submitInput.on("keyup", function(event) {
                    if (event.keyCode === 13) {
                        $box.find('button[type="submit"]').click();
                    }
                });
            },
            open: function(editboxId, $event) {
                if (typeof this.openEditboxes[editboxId] === "undefined") throw new Error("EditBox with id " + editboxId + " does not exists");
                for (var id in this.openEditboxes) {
                    this.close(id);
                }
                this.openEditboxes[editboxId] = true;
                var $box = jQuery("#" + editboxId).find(">div.edit-box");
                $box.show();
                jQuery("#" + editboxId).trigger("open");
                var $firstInput = $($box.find("input,select,textarea").get(0));
                $firstInput.focus();
                setTimeout(function() {
                    setPosition($box, $event.target);
                });
            },
            close: function(editboxId) {
                if (typeof this.openEditboxes[editboxId] === "undefined") throw new Error("EditBox with id " + editboxId + " does not exists");
                this.openEditboxes[editboxId] = false;
                var $box = jQuery("#" + editboxId).find(">div.edit-box");
                $box.hide();
                jQuery("#" + editboxId).trigger("close");
            }
        };
        jQuery("body").on("keyup", "edit-box", function(event) {
            if (event.keyCode === 27) {
                editBox.close(this.id);
            }
        });
        return editBox;
    }).directive("editBox", [ "EditBox", function(EditBox) {
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.editBox,
            transclude: true,
            scope: {
                spinnerCondition: "=",
                onOpen: "=",
                onSubmit: "=",
                onCancel: "="
            },
            link: function($scope, el, attrs) {
                if (!attrs.id) throw new Error("EditBox id is required");
                $scope.editbox = EditBox;
                $scope.cancelLabel = attrs.cancelLabel;
                EditBox.register(attrs.id);
                $scope.args = attrs;
                $scope.spinnerUrl = MapasCulturais.spinnerUrl;
                $scope.classes = {
                    "mc-bottom": attrs.position === "bottom" || !attrs.position,
                    "mc-top": attrs.position === "top",
                    "mc-left": attrs.position === "left",
                    "mc-right": attrs.position === "right"
                };
                $scope.submit = function() {
                    if (angular.isFunction($scope.onSubmit)) {
                        $scope.onSubmit(attrs);
                    }
                };
                $scope.cancel = function() {
                    if (attrs.closeOnCancel) EditBox.close(attrs.id);
                    if (angular.isFunction($scope.onCancel)) {
                        $scope.onCancel(attrs);
                    }
                    jQuery("#" + attrs.id).trigger("cancel");
                };
                if (angular.isFunction($scope.onOpen)) {
                    jQuery("#" + attrs.id).on("open", function() {
                        $scope.onOpen();
                    });
                }
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    angular.module("mc.directive.mcSelect", []).directive("mcSelect", [ function() {
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.MCSelect,
            transclude: true,
            scope: {
                data: "=",
                model: "=",
                placeholder: "@",
                setter: "=",
                getter: "="
            },
            link: function($scope, el, attrs) {
                $scope.classes = attrs.classes;
                $scope.selectItem = function(item, $event) {
                    if (angular.isFunction($scope.setter)) {
                        $scope.setter($scope.model, item);
                    } else {
                        $scope.model = item.value;
                    }
                }, $scope.getSelectedValue = function() {
                    if ($scope.model && angular.isFunction($scope.getter)) {
                        return $scope.getter($scope.model);
                    } else {
                        return $scope.model;
                    }
                };
                $scope.getSelectedItem = function() {
                    var item = null, selectedValue = $scope.getSelectedValue();
                    $scope.data.forEach(function(e) {
                        if (e.value == selectedValue) item = e;
                    });
                    return item;
                };
                $scope.getSelectedLabel = function() {
                    var item = $scope.getSelectedItem();
                    if (item) {
                        return item.label;
                    } else {
                        return $scope.placeholder;
                    }
                };
                $scope.isSelected = function(item) {
                    return item.value == $scope.getSelectedValue();
                };
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    angular.module("mc.module.findEntity", []).factory("FindService", [ "$rootScope", "$http", "$q", function($rootScope, $http, $q) {
        var baseUrl = MapasCulturais.baseURL + "/api/";
        var canceller;
        function extend(query) {
            return angular.extend(query, {
                "@select": "id,name,type,shortDescription,terms",
                "@files": "(avatar.avatarSmall):url",
                "@order": "name"
            });
        }
        function request(url, query, success_cb, error_cb) {
            cancelRequest();
            query = extend(query);
            canceller = $q.defer();
            var p = $http({
                url: url,
                method: "GET",
                timeout: canceller.promise,
                cache: true,
                params: query
            });
            if (angular.isFunction(success_cb)) {
                p.success(success_cb);
            }
            if (angular.isFunction(error_cb)) {
                p.error(error_cb);
            }
        }
        function cancelRequest() {
            if (canceller) {
                canceller.resolve();
            }
        }
        return {
            cancel: function() {
                cancelRequest();
            },
            find: function(entity, query, success_cb, error_cb) {
                var url = baseUrl + entity + "/find";
                request(url, query, success_cb, error_cb);
            },
            findOne: function(entity, query, success_cb, error_cb) {
                var url = baseUrl + entity + "/find";
                request(url, query, success_cb, error_cb);
            },
            pagination: function(entity, resultsPerPage, query, success_cb, error_cb) {
                var url = baseUrl + entity + "/find", page = 0, executing = false;
                var pagination = this;
                function success() {
                    success_cb.call(pagination, arguments);
                    executing = false;
                }
                function error() {
                    error_cb.call(pagination, arguments);
                    executing = false;
                }
                return {
                    reset: function() {
                        page = 0;
                    },
                    nextPage: function() {
                        if (!executing) {
                            executing = true;
                            page++;
                            query["@page"] = page;
                            query["@limit"] = resultsPerPage;
                            request(url, query, success, error);
                        }
                    },
                    currentPage: function() {
                        if (this._page > 0 && !executing) {
                            executing = true;
                            query["@page"] = page;
                            query["@limit"] = resultsPerPage;
                            request(url, query, success, error);
                        }
                    },
                    previousPage: function() {
                        if (this._page > 0 && !executing) {
                            executing = true;
                            page--;
                            query["@page"] = page;
                            query["@limit"] = resultsPerPage;
                            request(url, query, success, error);
                        }
                    }
                };
            }
        };
    } ]).directive("findEntity", [ "$timeout", "FindService", function($timeout, FindService) {
        var timeouts = {};
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.findEntity,
            scope: {
                spinnerCondition: "=",
                entity: "@",
                noResultsText: "@",
                filter: "=",
                select: "=",
                onRepeatDone: "=",
                apiQuery: "="
            },
            link: function($scope, el, attrs) {
                $scope.attrs = attrs;
                $scope.result = [];
                $scope.searchText = "";
                $scope.noEntityFound = false;
                $scope.noMoreResults = false;
                var $el = jQuery(el[0]);
                var $container = $el.find(".result-container");
                $container.scroll(function() {
                    var containerInnerHeight = this.scrollHeight;
                    var containerScroll = jQuery(this).scrollTop();
                    var containerHeight = jQuery(this).height();
                    var bottomY = containerInnerHeight - containerHeight - containerScroll;
                    if (bottomY < containerHeight && !$scope.noMoreResults && !$scope.paginating) {
                        $scope.paginating = true;
                        $scope.find(10);
                    }
                }).bind("mousewheel DOMMouseScroll", function(e) {
                    var e0 = e.originalEvent, delta = e0.wheelDelta || -e0.detail;
                    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                    e.preventDefault();
                });
                $scope.avatarUrl = function(entity) {
                    if (entity["@files:avatar.avatarSmall"]) return entity["@files:avatar.avatarSmall"].url; else return MapasCulturais.defaultAvatarURL;
                };
                $scope.find = function(time) {
                    if (timeouts.find) $timeout.cancel(timeouts.find);
                    time = time || 1e3;
                    FindService.cancel();
                    var s = $scope.searchText.trim().replace(" ", "*");
                    if (parseInt(s) != s && s.length < 2) {
                        return;
                    }
                    var query = angular.isObject($scope.apiQuery) ? $scope.apiQuery : {};
                    if ($scope.lastS != s) {
                        $scope.lastS = s;
                        $scope.result = [];
                        $scope.noMoreResults = false;
                        $scope.pagination = FindService.pagination($scope.entity, 20, query, function(data, status) {
                            $scope.processResult(data, status);
                            $scope.spinnerCondition = false;
                            $scope.paginating = false;
                        });
                    }
                    query.name = "ILIKE(*" + s + "*)";
                    timeouts.find = $timeout(function() {
                        $scope.spinnerCondition = true;
                        $scope.pagination.nextPage();
                    }, time);
                };
                $scope.processResult = function(data, status) {
                    data = data[0];
                    if (angular.isFunction($scope.filter)) data = $scope.filter(data, status);
                    if (data.length > 0) {
                        $scope.result = $scope.result.concat(data);
                    } else if ($scope.result.length === 0) {
                        $scope.noEntityFound = true;
                        $timeout(function() {
                            $scope.noEntityFound = false;
                        }, 3e3);
                    } else {
                        $scope.noMoreResults = true;
                    }
                };
                jQuery(el).on("find", function() {
                    $scope.find();
                });
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("entity.module.relatedAgents", [ "ngSanitize" ]);
    module.config([ "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
        $httpProvider.defaults.transformRequest = function(data) {
            var result = angular.isObject(data) && String(data) !== "[object File]" ? $.param(data) : data;
            return result;
        };
    } ]);
    module.factory("RelatedAgentsService", [ "$http", "$rootScope", function($http, $rootScope) {
        var controllerId = null, entityId = null, baseUrl = MapasCulturais.baseURL.substr(-1) === "/" ? MapasCulturais.baseURL : MapasCulturais.baseURL + "/";
        try {
            controllerId = MapasCulturais.request.controller;
        } catch (e) {}
        try {
            entityId = MapasCulturais.entity.id;
        } catch (e) {}
        return {
            controllerId: controllerId,
            entityId: entityId,
            getUrl: function(action) {
                return baseUrl + controllerId + "/" + action + "/" + entityId;
            },
            create: function(group, agentId) {
                return $http.post(this.getUrl("createAgentRelation"), {
                    group: group,
                    agentId: agentId
                }).success(function(data, status) {
                    if (status === 202) {
                        MapasCulturais.Messages.alert("Sua requisição para relacionar o agente <strong>" + data.agent.name + "</strong> foi enviada.");
                    }
                    $rootScope.$emit("relatedAgent.created", data);
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot create related agent",
                        data: data,
                        status: status
                    });
                });
            },
            remove: function(group, agentId) {
                return $http.post(this.getUrl("removeAgentRelation"), {
                    group: group,
                    agentId: agentId
                }).success(function(data, status) {
                    $rootScope.$emit("relatedAgent.removed", data);
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot remove related agent",
                        data: data,
                        status: status
                    });
                });
            },
            giveControl: function(agentId) {
                return this.setControl(agentId, true);
            },
            removeControl: function(agentId) {
                return this.setControl(agentId, false);
            },
            setControl: function(agentId, hasControl) {
                return $http({
                    method: "POST",
                    url: this.getUrl("setRelatedAgentControl"),
                    data: {
                        agentId: agentId,
                        hasControl: hasControl
                    }
                }).success(function(data, status) {
                    $rootScope.$emit(hasControl ? "relatedAgent.controlGiven" : "relatedAgent.controlRemoved", data);
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: hasControl ? "Cannot give control to related agent" : "Cannot remove control of related agent",
                        data: data,
                        status: status
                    });
                });
            }
        };
    } ]);
    module.controller("RelatedAgentsController", [ "$scope", "$rootScope", "RelatedAgentsService", "EditBox", function($scope, $rootScope, RelatedAgentsService, EditBox) {
        $scope.editbox = EditBox;
        $scope.groups = [];
        for (var i in MapasCulturais.entity.agentRelations) $scope.groups.push({
            name: i,
            relations: MapasCulturais.entity.agentRelations[i]
        });
        $scope.showCreateDialog = {};
        $scope.spinners = {};
        $scope.isEditable = MapasCulturais.isEditable;
        $scope.canChangeControl = MapasCulturais.entity.canUserCreateRelatedAgentsWithControl;
        $scope.data = {};
        $scope.agentRelationDisabledCD = MapasCulturais.agentRelationDisabledCD || [];
        $scope.disabledCD = function(groupName) {
            return $scope.agentRelationDisabledCD.indexOf(groupName) >= 0;
        };
        function getGroup(groupName) {
            var result = null;
            $scope.groups.forEach(function(group) {
                if (group.name === groupName) result = group;
            });
            return result;
        }
        function groupExists(groupName) {
            if (getGroup(groupName)) return true; else return false;
        }
        $scope.avatarUrl = function(entity) {
            if (entity.avatar.avatarSmall) return entity.avatar.avatarSmall.url; else return MapasCulturais.defaultAvatarURL;
        };
        $scope.closeNewGroupEditBox = function() {
            EditBox.close("new-related-agent-group");
        };
        $scope.data.newGroupName = "";
        $scope.getCreateAgentRelationEditBoxId = function(groupName) {
            return "add-related-agent-" + groupName.replace(/[^a-z0-9_]/gi, "");
        };
        $scope.createGroup = function() {
            if ($scope.data.newGroupName.trim() && !groupExists($scope.data.newGroupName && $scope.data.newGroupName.toLowerCase().trim() !== "registration")) {
                var newGroup = {
                    name: $scope.data.newGroupName,
                    relations: []
                };
                $scope.groups = [ newGroup ].concat($scope.groups);
                $scope.data.newGroupName = "";
                EditBox.close("new-related-agent-group");
            }
        };
        $scope.createRelation = function(entity) {
            var _scope = this.$parent;
            var groupName = _scope.attrs.group;
            RelatedAgentsService.create(groupName, entity.id).success(function(data) {
                var group = getGroup(groupName);
                group.relations.push(data);
                $scope.showCreateDialog[groupName] = false;
                _scope.$parent.searchText = "";
                _scope.$parent.result = [];
                EditBox.close($scope.getCreateAgentRelationEditBoxId(groupName));
            });
        };
        $scope.deleteRelation = function(relation) {
            var group = getGroup(relation.group);
            var oldRelations = group.relations.slice();
            var i = group.relations.indexOf(relation);
            group.relations.splice(i, 1);
            RelatedAgentsService.remove(relation.group, relation.agent.id).error(function() {
                group.relations = oldRelations;
            });
        };
        $scope.toggleControl = function(relation) {
            relation.hasControl = !relation.hasControl;
            if (relation.hasControl) {
                RelatedAgentsService.giveControl(relation.agent.id).error(function() {
                    relation.hasControl = false;
                });
            } else {
                RelatedAgentsService.removeControl(relation.agent.id).error(function() {
                    relation.hasControl = true;
                });
            }
        };
        $scope.filterResult = function(data, status) {
            var group = getGroup(this.attrs.group);
            if (group && group.relations.length > 0) {
                var ids = group.relations.map(function(el) {
                    return el.agent.id;
                });
                data = data.filter(function(e) {
                    if (ids.indexOf(e.id) === -1) return e;
                });
            }
            return data;
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("entity.module.changeOwner", [ "ngSanitize" ]);
    module.config([ "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
        $httpProvider.defaults.transformRequest = function(data) {
            var result = angular.isObject(data) && String(data) !== "[object File]" ? $.param(data) : data;
            return result;
        };
    } ]);
    module.factory("ChangeOwnerService", [ "$http", "$rootScope", function($http, $rootScope) {
        var controllerId = null, entityId = null, baseUrl = MapasCulturais.baseURL.substr(-1) === "/" ? MapasCulturais.baseURL : MapasCulturais.baseURL + "/";
        try {
            controllerId = MapasCulturais.request.controller;
        } catch (e) {}
        try {
            entityId = MapasCulturais.entity.id;
        } catch (e) {}
        return {
            controllerId: controllerId,
            entityId: entityId,
            getUrl: function() {
                return baseUrl + controllerId + "/changeOwner/" + entityId;
            },
            setOwnerTo: function(agentId) {
                return $http.post(this.getUrl(), {
                    ownerId: agentId
                }).success(function(data, status) {
                    $rootScope.$emit("changedOwner", {
                        message: "The entity owner was changed",
                        data: data,
                        status: status
                    });
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot change the owner",
                        data: data,
                        status: status
                    });
                });
            }
        };
    } ]);
    module.controller("ChangeOwnerController", [ "$scope", "$rootScope", "$timeout", "ChangeOwnerService", "EditBox", function($scope, $rootScope, $timeout, ChangeOwnerService, EditBox) {
        var adjustingBoxPosition = false;
        $scope.editbox = EditBox;
        $scope.data = {
            spinner: false,
            apiQuery: {}
        };
        if (!MapasCulturais.entity.userHasControl) {
            $scope.data.apiQuery["@permissions"] = "@control";
        }
        var adjustBoxPosition = function() {
            setTimeout(function() {
                adjustingBoxPosition = true;
                $("#change-owner-button").click();
                adjustingBoxPosition = false;
            });
        };
        $rootScope.$on("repeatDone:findEntity:find-entity-change-owner", adjustBoxPosition);
        $scope.$watch("data.spinner", function(ov, nv) {
            if (ov && !nv) adjustBoxPosition();
        });
        $scope.requestEntity = function(e) {
            ChangeOwnerService.setOwnerTo(e.id).success(function(data, status) {
                if (status === 202) {
                    MapasCulturais.Messages.alert("Sua requisição foi para mudança de propriedade deste " + MapasCulturais.entity.getTypeName() + " para o agente <strong>" + e.name + "</strong> foi enviada.");
                } else {
                    $(".js-owner-name").html('<a href="' + e.singleUrl + '">' + e.name + "</a>");
                    $(".js-owner-description").html(e.shortDescription);
                    try {
                        $(".js-owner-avatar").attr("src", e["@files:avatar.avatarSmall"].url);
                    } catch (e) {
                        $(".js-owner-avatar").attr("src", MapasCulturais.defaultAvatarURL);
                    }
                }
            });
            EditBox.close("editbox-change-owner");
        };
        $("#editbox-change-owner").on("open", function() {
            if (!adjustingBoxPosition) $("#find-entity-change-owner").trigger("find");
        });
    } ]);
})(angular);

(function(angular) {
    "use strict";
    angular.module("entity.directive.editableMultiselect", []).directive("editableMultiselect", [ "EditBox", "$log", function(EditBox, $log) {
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.editableMultiselect,
            scope: {
                entityProperty: "@",
                emptyLabel: "@",
                boxTitle: "@",
                helpText: "@"
            },
            link: function($scope, el, attrs) {
                var def = MapasCulturais.entity.definition[attrs.entityProperty];
                var entity = MapasCulturais.entity.object;
                var originalValue = MapasCulturais.entity.object;
                function resetValues() {
                    if (entity[$scope.entityProperty]) {
                        $scope.values = entity[$scope.entityProperty].split(";");
                    } else {
                        entity[$scope.entityProperty] = "";
                        $scope.values = [];
                    }
                }
                $scope.inputVal = entity[$scope.entityProperty];
                $scope.editBox = EditBox;
                $scope.terms = [];
                def.optionsOrder.forEach(function(e) {
                    $scope.terms.push({
                        label: def.options[e],
                        value: e
                    });
                });
                $scope.allowOther = def.allowOther;
                $scope.allowOtherText = def.allowOtherText;
                $log.log($scope.title);
                $scope.editBoxId = "editable-multiselect-" + $scope.entityProperty;
                $scope.cfg = {
                    isEditable: MapasCulturais.isEditable
                };
                $scope.openEditBox = function($event) {
                    if (MapasCulturais.isEditable) {
                        EditBox.open($scope.editBoxId, $event);
                    }
                };
                resetValues();
                $scope.submit = function() {
                    entity[$scope.entityProperty] = $scope.values.join(";");
                    $scope.inputVal = entity[$scope.entityProperty];
                    var $input = jQuery("#" + $scope.entityProperty);
                    $input.editable("setValue", $scope.inputVal);
                    EditBox.close($scope.editBoxId);
                };
                $scope.cancel = function() {
                    resetValues();
                };
                $scope.valuesText = function() {
                    if (entity[$scope.entityProperty]) {
                        return entity[$scope.entityProperty].split(";").join("; ");
                    } else {
                        return $scope.emptyLabel;
                    }
                };
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    angular.module("entity.directive.editableSingleselect", []).directive("editableSingleselect", [ "EditBox", "$log", function(EditBox, $log) {
        return {
            restrict: "E",
            templateUrl: MapasCulturais.templateUrl.editableSingleselect,
            scope: {
                entityProperty: "@",
                emptyLabel: "@",
                boxTitle: "@",
                helpText: "@"
            },
            link: function($scope, el, attrs) {
                var def = MapasCulturais.entity.definition[attrs.entityProperty];
                var entity = MapasCulturais.entity.object;
                $scope.editBox = EditBox;
                $scope.terms = [];
                def.optionsOrder.forEach(function(e) {
                    $scope.terms.push({
                        label: def.options[e],
                        value: e
                    });
                });
                $scope.data = {
                    inputVal: entity[$scope.entityProperty],
                    isEditable: MapasCulturais.isEditable,
                    allowOther: def.allowOther,
                    allowOtherText: def.allowOtherText,
                    editBoxId: "editable-singleselect-" + $scope.entityProperty,
                    value: entity[$scope.entityProperty],
                    boxTitle: $scope.boxTitle
                };
                function resetValue() {
                    if (entity[$scope.entityProperty]) {
                        $scope.data.value = entity[$scope.entityProperty];
                        $scope.data.displayValue = entity[$scope.entityProperty];
                        $scope.data.inputValue = entity[$scope.entityProperty];
                    } else {
                        entity[$scope.entityProperty] = "";
                        $scope.data.value = "";
                        $scope.data.displayValue = $scope.emptyLabel;
                    }
                }
                resetValue();
                $scope.displayValue = function() {
                    if ($scope.terms[$scope.data.inputVal]) {
                        return $scope.terms[$scope.data.inputVal];
                    } else {
                        return $scope.data.inputVal || $scope.emptyLabel;
                    }
                };
                $scope.openEditBox = function($event) {
                    if (MapasCulturais.isEditable) {
                        EditBox.open($scope.data.editBoxId, $event);
                    }
                };
                $scope.submit = function() {
                    var $input = jQuery("#" + $scope.entityProperty);
                    entity[$scope.entityProperty] = $scope.data.value;
                    $scope.data.inputVal = entity[$scope.entityProperty];
                    $scope.data.displayValue = $scope.inputVal ? $scope.inputVal : $scope.emptyLabel;
                    $input.editable("setValue", $scope.data.inputVal);
                    EditBox.close($scope.data.editBoxId);
                };
                $scope.cancel = function() {
                    resetValue();
                };
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var app = angular.module("entity.app", MapasCulturais.angularAppDependencies);
    app.factory("UrlService", [ function() {
        return function(controller) {
            this.create = function(action, params) {
                if (params == parseInt(params)) {
                    return MapasCulturais.createUrl(controller, action, [ params ]);
                } else {
                    return MapasCulturais.createUrl(controller, action, params);
                }
            };
        };
    } ]);
    app.controller("EntityController", [ "$scope", "$timeout", function($scope, $timeout) {
        $scope.data = {
            teste: "ALALALALALALA"
        };
    } ]);
    app.directive("onRepeatDone", [ "$rootScope", function($rootScope) {
        return function($scope, element, attrs) {
            if ($scope.$last) {
                $rootScope.$emit("repeatDone:" + attrs.onRepeatDone);
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("entity.module.project", [ "ngSanitize" ]);
    module.config([ "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        $httpProvider.defaults.transformRequest = function(data) {
            var result = angular.isObject(data) && String(data) !== "[object File]" ? $.param(data) : data;
            return result;
        };
    } ]);
    module.factory("ProjectEventsService", [ "$http", "$rootScope", "UrlService", function($http, $rootScope, UrlService) {
        var url = new UrlService("project");
        return {
            getUrl: function(action) {
                return url.create(action, MapasCulturais.entity.id);
            },
            publish: function(ids) {
                var url = this.getUrl("publishEvents");
                return $http.post(url, {
                    ids: ids
                }).success(function(data, status) {
                    $rootScope.$emit("project.publishEvents", {
                        message: "Project events was published",
                        data: data,
                        status: status
                    });
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot publish project events",
                        data: data,
                        status: status
                    });
                });
            },
            unpublish: function(ids) {
                var url = this.getUrl("unpublishEvents");
                return $http.post(url, {
                    ids: ids
                }).success(function(data, status) {
                    $rootScope.$emit("project.unpublishEvents", {
                        message: "Project events was unpublished",
                        data: data,
                        status: status
                    });
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot unpublish project events",
                        data: data,
                        status: status
                    });
                });
            }
        };
    } ]);
    module.factory("RegistrationService", [ "$http", "$rootScope", "UrlService", function($http, $rootScope, UrlService) {
        var url = new UrlService("registration");
        return {
            getUrl: function(action, registrationId) {
                return url.create(action, registrationId);
            },
            register: function(params) {
                var data = {
                    projectId: MapasCulturais.entity.id,
                    ownerId: params.owner.id,
                    category: params.category
                };
                return $http.post(this.getUrl(), data).success(function(data, status) {
                    $rootScope.$emit("registration.create", {
                        message: "Project registration was created",
                        data: data,
                        status: status
                    });
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot create project registration",
                        data: data,
                        status: status
                    });
                });
            },
            setStatusTo: function(registration, registrationStatus) {
                return $http.post(this.getUrl("setStatusTo", registration.id), {
                    status: registrationStatus
                }).success(function(data, status) {
                    registration.status = data.status;
                    $rootScope.$emit("registration." + registrationStatus, {
                        message: "Project registration status was setted to " + registrationStatus,
                        data: data,
                        status: status
                    });
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot " + registrationStatus + " project registration",
                        data: data,
                        status: status
                    });
                });
            },
            send: function(registrationId) {
                return $http.post(this.getUrl("send", registrationId)).success(function(data, status) {
                    $rootScope.$emit("registration.send", {
                        message: "Project registration was send ",
                        data: data,
                        status: status
                    });
                }).error(function(data, status) {
                    $rootScope.$emit("error", {
                        message: "Cannot send project registration",
                        data: data,
                        status: status
                    });
                });
            }
        };
    } ]);
    module.factory("RegistrationFileConfigurationService", [ "$rootScope", "$q", "$http", "$log", "UrlService", function($rootScope, $q, $http, $log, UrlService) {
        var url = new UrlService("registrationfileconfiguration");
        return {
            getUrl: function(action, id) {
                return url.create(action, id);
            },
            create: function(data) {
                var deferred = $q.defer();
                $http.post(this.getUrl(), data).success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            edit: function(data) {
                var deferred = $q.defer();
                $http.post(url.create("single", data.id), data).success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            "delete": function(id) {
                var deferred = $q.defer();
                $http.get(url.create("delete", id)).success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            }
        };
    } ]);
    module.controller("RegistrationFileConfigurationsController", [ "$scope", "$rootScope", "$timeout", "RegistrationFileConfigurationService", "EditBox", "$http", function($scope, $rootScope, $timeout, RegistrationFileConfigurationService, EditBox, $http) {
        $scope.isEditable = MapasCulturais.isEditable;
        $scope.maxUploadSize = MapasCulturais.maxUploadSize;
        $scope.maxUploadSizeFormatted = MapasCulturais.maxUploadSizeFormatted;
        $scope.uploadFileGroup = "registrationFileTemplate";
        $scope.getUploadUrl = function(ownerId) {
            return RegistrationFileConfigurationService.getUrl("upload", ownerId);
        };
        var fileConfigurationSkeleton = {
            ownerId: MapasCulturais.entity.id,
            title: null,
            description: null,
            required: false
        };
        $scope.data = {
            fileConfigurations: MapasCulturais.entity.registrationFileConfigurations,
            newFileConfiguration: angular.copy(fileConfigurationSkeleton),
            entity: $scope.$parent.data.entity
        };
        function sortFiles() {
            $scope.data.fileConfigurations.sort(function(a, b) {
                if (a.title > b.title) {
                    return 1;
                } else if (a.title < b.title) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
        $scope.fileConfigurationBackups = [];
        $scope.createFileConfiguration = function() {
            RegistrationFileConfigurationService.create($scope.data.newFileConfiguration).then(function(response) {
                if (!response.error) {
                    $scope.data.fileConfigurations.push(response);
                    sortFiles();
                    EditBox.close("editbox-registration-files");
                    $scope.data.newFileConfiguration = angular.copy(fileConfigurationSkeleton);
                    MapasCulturais.Messages.success("Anexo criado.");
                }
            });
        };
        $scope.removeFileConfiguration = function(id, $index) {
            if (confirm("Deseja remover este anexo?")) {
                RegistrationFileConfigurationService.delete(id).then(function(response) {
                    if (!response.error) {
                        $scope.data.fileConfigurations.splice($index, 1);
                        MapasCulturais.Messages.alert("Anexo removido.");
                    }
                });
            }
        };
        $scope.editFileConfiguration = function(attrs) {
            var model = $scope.data.fileConfigurations[attrs.index], data = {
                id: model.id,
                title: model.title,
                description: model.description,
                required: model.required,
                template: model.template
            };
            RegistrationFileConfigurationService.edit(data).then(function(response) {
                if (!response.error) {
                    sortFiles();
                    EditBox.close("editbox-registration-files-" + data.id);
                    MapasCulturais.Messages.success("Alterações Salvas.");
                }
            });
        };
        $scope.sendFile = function(attrs) {
            $("#" + attrs.id + " form").submit();
        };
        $scope.cancelFileConfigurationEditBox = function(attrs) {
            $scope.data.fileConfigurations[attrs.index] = $scope.fileConfigurationBackups[attrs.index];
            delete $scope.fileConfigurationBackups[attrs.index];
        };
        $scope.openFileConfigurationEditBox = function(id, index, event) {
            $scope.fileConfigurationBackups[index] = angular.copy($scope.data.fileConfigurations[index]);
            EditBox.open("editbox-registration-files-" + id, event);
        };
        $scope.openFileConfigurationTemplateEditBox = function(id, index, event) {
            EditBox.open("editbox-registration-files-template-" + id, event);
            initAjaxUploader(id, index);
        };
        $scope.removeFileConfigurationTemplate = function(id, $index) {
            if (confirm("Deseja remover este modelo?")) {
                $http.get($scope.data.fileConfigurations[$index].template.deleteUrl).success(function(response) {
                    delete $scope.data.fileConfigurations[$index].template;
                    MapasCulturais.Messages.alert("Modelo removido.");
                });
            }
        };
        var initAjaxUploader = function(id, index) {
            var $form = $("#editbox-registration-files-template-" + id + " form");
            MapasCulturais.AjaxUploader.resetProgressBar($form);
            if ($form.data("initialized")) return;
            MapasCulturais.AjaxUploader.init($form);
            $("#editbox-registration-files-template-" + id).on("cancel", function() {
                if ($form.data("xhr")) $form.data("xhr").abort();
                $form.get(0).reset();
                MapasCulturais.AjaxUploader.resetProgressBar($form);
            });
            $form.on("ajaxForm.success", function(evt, response) {
                $scope.data.fileConfigurations[index].template = response[$scope.uploadFileGroup];
                $scope.$apply();
                setTimeout(function() {
                    EditBox.close("editbox-registration-files-template-" + id, event);
                }, 700);
            });
        };
    } ]);
    module.controller("ProjectEventsController", [ "$scope", "$rootScope", "$timeout", "ProjectEventsService", "EditBox", "$http", "UrlService", function($scope, $rootScope, $timeout, ProjectEventsService, EditBox, $http, UrlService) {
        $scope.events = $scope.data.entity.events.slice();
        $scope.numSelectedEvents = 0;
        $scope.events.forEach(function(evt) {
            evt.statusText = "";
            if (evt.status == 1) {
                evt.statusText = "publicado";
            } else if (evt.status == 0) {
                evt.statusText = "rascunho";
            }
        });
        $scope.$watch("events", function() {
            var num = 0;
            $scope.events.forEach(function(e) {
                if (e.selected) {
                    num++;
                }
            });
            $scope.numSelectedEvents = num;
        }, true);
        $scope.selectAll = function() {
            $scope.events.forEach(function(e) {
                if (!e.hidden) {
                    e.selected = true;
                }
            });
        };
        $scope.deselectAll = function() {
            $scope.events.forEach(function(e) {
                if (!e.hidden) {
                    e.selected = false;
                }
            });
        };
        $scope.eventFilterTimeout = null;
        $scope.filterEvents = function() {
            $timeout.cancel($scope.eventFilterTimeout);
            $scope.eventFilterTimeout = $timeout(function() {
                var keywords = $scope.data.eventFilter.toLowerCase().split(" ");
                $scope.events.forEach(function(evt, i) {
                    var show = true;
                    keywords.forEach(function(keyword) {
                        keyword = keyword.trim();
                        var match = false;
                        if (evt.name.toLowerCase().indexOf(keyword) >= 0) {
                            match = true;
                        } else if (evt.owner.name.toLowerCase().indexOf($scope.data.eventFilter.toLowerCase()) >= 0) {
                            match = true;
                        } else if (evt.statusText.indexOf(keyword) >= 0) {
                            match = true;
                        } else if (evt.classificacaoEtaria.toLowerCase().indexOf(keyword) >= 0) {
                            match = true;
                        } else {
                            evt.occurrences.forEach(function(o) {
                                if (o.space.name.toLowerCase().indexOf($scope.data.eventFilter.toLowerCase()) >= 0) {
                                    match = true;
                                }
                            });
                            evt.terms.linguagem.forEach(function(term) {
                                if (term.toLowerCase().indexOf(keyword) >= 0) {
                                    match = true;
                                }
                            });
                        }
                        show = show && match;
                    });
                    evt.hidden = !show;
                });
            }, 500);
        };
        $scope.processing = false;
        $scope.publishSelectedEvents = function() {
            var ids = [], events = [];
            if ($scope.data.processing) {
                return;
            }
            $scope.events.forEach(function(e, i) {
                if (e.selected) {
                    ids.push(e.id);
                    events.push(e);
                }
            });
            if (!ids.length) {
                return;
            }
            $scope.data.processingText = "Publicando...";
            $scope.data.processing = true;
            ProjectEventsService.publish(ids.toString()).success(function() {
                MapasCulturais.Messages.success("Eventos publicados.");
                events.forEach(function(e) {
                    e.status = 1;
                    e.statusText = "publicado";
                });
                $scope.data.processing = false;
            });
        };
        $scope.unpublishSelectedEvents = function() {
            var ids = [], events = [];
            if ($scope.data.processing) {
                return;
            }
            $scope.events.forEach(function(e, i) {
                if (e.selected) {
                    ids.push(e.id);
                    events.push(e);
                }
            });
            if (!ids.length) {
                return;
            }
            $scope.data.processingText = "Tornando rascunho...";
            $scope.data.processing = true;
            ProjectEventsService.unpublish(ids.toString()).success(function() {
                MapasCulturais.Messages.success("Eventos transformados em rascunho.");
                events.forEach(function(e) {
                    e.status = 0;
                    e.statusText = "rascunho";
                });
                $scope.data.processing = false;
            });
        };
        $scope.toggle = false;
    } ]);
    module.controller("RegistrationFilesController", [ "$scope", "$rootScope", "$timeout", "RegistrationFileConfigurationService", "EditBox", "$http", "UrlService", function($scope, $rootScope, $timeout, RegistrationFileConfigurationService, EditBox, $http, UrlService) {
        var registrationsUrl = new UrlService("registration");
        $scope.uploadUrl = registrationsUrl.create("upload", MapasCulturais.entity.id);
        $scope.maxUploadSizeFormatted = MapasCulturais.maxUploadSizeFormatted;
        $scope.data = {
            fileConfigurations: MapasCulturais.entity.registrationFileConfigurations
        };
        $scope.data.fileConfigurations.forEach(function(item) {
            item.file = MapasCulturais.entity.registrationFiles[item.groupName];
        });
        $scope.sendFile = function(attrs) {
            var $form = $("#" + attrs.id + " form");
            $form.submit();
            if (!$form.data("onSuccess")) {
                $form.data("onSuccess", true);
                $form.on("ajaxForm.success", function() {
                    MapasCulturais.Messages.success("Alterações salvas.");
                });
            }
        };
        $scope.openFileEditBox = function(id, index, event) {
            EditBox.open("editbox-file-" + id, event);
            initAjaxUploader(id, index);
        };
        $scope.removeFile = function(id, $index) {
            if (confirm("Deseja remover este anexo?")) {
                $http.get($scope.data.fileConfigurations[$index].file.deleteUrl).success(function(response) {
                    delete $scope.data.fileConfigurations[$index].file;
                });
            }
        };
        var initAjaxUploader = function(id, index) {
            var $form = $("#editbox-file-" + id + " form");
            if ($form.data("initialized")) return;
            MapasCulturais.AjaxUploader.init($form);
            $("#editbox-file-" + id).on("cancel", function() {
                if ($form.data("xhr")) $form.data("xhr").abort();
                $form.get(0).reset();
                MapasCulturais.AjaxUploader.resetProgressBar($form);
            });
            $form.on("ajaxForm.success", function(evt, response) {
                $scope.data.fileConfigurations[index].file = response[$scope.data.fileConfigurations[index].groupName];
                $scope.$apply();
                setTimeout(function() {
                    EditBox.close("editbox-file-" + id, event);
                }, 700);
            });
        };
    } ]);
    module.controller("ProjectController", [ "$scope", "$rootScope", "$timeout", "RegistrationService", "EditBox", "RelatedAgentsService", "$http", "UrlService", function($scope, $rootScope, $timeout, RegistrationService, EditBox, RelatedAgentsService, $http, UrlService) {
        var adjustingBoxPosition = false, categories = MapasCulturais.entity.registrationCategories.length ? MapasCulturais.entity.registrationCategories.map(function(e) {
            return {
                value: e,
                label: e
            };
        }) : [];
        $scope.editbox = EditBox;
        $scope.data = angular.extend({
            uploadSpinner: false,
            spinner: false,
            registrationCategories: categories,
            registrationCategoriesToFilter: [ {
                value: null,
                label: "Todas opções"
            } ].concat(categories),
            registration: {
                owner: null,
                category: null
            },
            registrationStatuses: [ {
                value: null,
                label: "Todas"
            }, {
                value: 1,
                label: "Pendente"
            }, {
                value: 2,
                label: "Inválida"
            }, {
                value: 3,
                label: "Não selecionada"
            }, {
                value: 8,
                label: "Suplente"
            }, {
                value: 10,
                label: "Selecionada"
            } ],
            registrationStatusesNames: [ {
                value: 1,
                label: "Pendente"
            }, {
                value: 2,
                label: "Inválida"
            }, {
                value: 3,
                label: "Não selecionada"
            }, {
                value: 8,
                label: "Suplente"
            }, {
                value: 10,
                label: "Selecionada"
            }, {
                value: 0,
                label: "Rascunho"
            } ],
            publishedRegistrationStatuses: [ {
                value: null,
                label: "Todas"
            }, {
                value: 8,
                label: "Suplente"
            }, {
                value: 10,
                label: "Selecionada"
            } ],
            publishedRegistrationStatusesNames: [ {
                value: 8,
                label: "Suplente"
            }, {
                value: 10,
                label: "Selecionada"
            } ],
            publishedRegistrationStatus: 10,
            propLabels: [],
            relationApiQuery: {}
        }, MapasCulturais);
        for (var name in MapasCulturais.labels.agent) {
            var label = MapasCulturais.labels.agent[name];
            $scope.data.propLabels.push({
                name: name,
                label: label
            });
        }
        if (MapasCulturais.entity.registrationAgents) {
            MapasCulturais.entity.registrationAgents.forEach(function(e) {
                $scope.data.relationApiQuery[e.agentRelationGroupName] = {
                    type: "EQ(" + e.type + ")"
                };
                if (e.agentRelationGroupName === "owner") {
                    $scope.data.relationApiQuery[e.agentRelationGroupName]["@permissions"] = "@control";
                }
            });
        } else {
            $scope.data.relationApiQuery.owner = {
                "@permissions": "@control",
                type: "EQ(1)"
            };
        }
        $scope.fns = {};
        $scope.hideStatusInfo = function() {
            jQuery("#status-info").slideUp("fast");
        };
        $scope.openEditBox = function(id, e) {
            EditBox.open(id, e);
        };
        $scope.getStatusSlug = function(status) {
            switch (status) {
              case 0:
                return "draft";
                break;

              case 1:
                return "sent";
                break;

              case 2:
                return "invalid";
                break;

              case 3:
                return "notapproved";
                break;

              case 8:
                return "waitlist";
                break;

              case 10:
                return "approved";
                break;
            }
        };
        $scope.getStatusNameById = function(id) {
            var statuses = $scope.data.registrationStatusesNames;
            for (var s in statuses) {
                if (statuses[s].value == id) return statuses[s].label;
            }
        };
        $scope.setRegistrationStatus = function(registration, status) {
            if (MapasCulturais.entity.userHasControl && (status.value !== 0 || confirm("Você tem certeza que deseja reabrir este formulário para edição? Ao fazer isso, ele sairá dessa lista."))) {
                RegistrationService.setStatusTo(registration, $scope.getStatusSlug(status.value)).success(function(entity) {
                    if (registration.status === 0) {
                        $scope.data.entity.registrations.splice($scope.data.entity.registrations.indexOf(registration), 1);
                    }
                });
            }
        };
        $scope.getRegistrationStatus = function(registration) {
            return registration.status;
        };
        $scope.getReadableLocation = function(location) {
            if (angular.isString(location) && location) {
                location = JSON.parse(location);
            }
            if (location) {
                return location.latitude + "," + location.longitude;
            }
        };
        $scope.showRegistration = function(registration) {
            var status = !$scope.data.registrationStatus || $scope.data.registrationStatus === registration.status;
            var category = !$scope.data.registrationCategory || $scope.data.registrationCategory === registration.category;
            return status && category;
        };
        $scope.getFilteredRegistrations = function() {
            return $scope.data.entity.registrations.filter(function(e) {
                return $scope.showRegistration(e);
            });
        };
        $scope.usingFilters = function() {
            return $scope.data.registrationStatus || $scope.data.registrationCategory;
        };
        var adjustBoxPosition = function() {
            setTimeout(function() {
                adjustingBoxPosition = true;
                $("#select-registration-owner-button").click();
                adjustingBoxPosition = false;
            });
        };
        $rootScope.$on("repeatDone:findEntity:find-entity-registration-owner", adjustBoxPosition);
        $scope.$watch("data.spinner", function(ov, nv) {
            if (ov && !nv) adjustBoxPosition();
        });
        function replaceRegistrationAgentBy(groupName, agent, relationStatus) {
            for (var i in $scope.data.entity.registrationAgents) {
                var def = $scope.data.entity.registrationAgents[i];
                if (def.agentRelationGroupName === groupName) {
                    def.agent = agent;
                    if (typeof relationStatus !== "undefined") {
                        def.relationStatus = relationStatus;
                    }
                }
            }
        }
        $scope.setRegistrationOwner = function(agent) {
            $scope.data.registration.owner = agent;
            replaceRegistrationAgentBy("owner", agent);
            jQuery("#ownerId").editable("setValue", agent.id);
            setTimeout(function() {
                $("#submitButton").trigger("click");
            });
            EditBox.close("editbox-select-registration-owner");
        };
        $scope.setRegistrationAgent = function(entity, attrs) {
            if (attrs.name === "owner") {
                $scope.setRegistrationOwner(entity);
                return;
            }
            var editBoxId = "editbox-select-registration-" + attrs.name;
            RelatedAgentsService.create(attrs.name, entity.id).success(function(response) {
                if (response.agent.avatar && response.agent.avatar.avatarSmall) {
                    response.agent.avatarUrl = response.agent.avatar.avatarSmall.url;
                }
                replaceRegistrationAgentBy(attrs.name, response.agent, response.status);
                EditBox.close(editBoxId);
                if (response.status > 0) MapasCulturais.Messages.success("Alterações salvas.");
            });
        };
        $scope.unsetRegistrationAgent = function(entityId, groupName) {
            if (groupName === "owner") return null;
            var editBoxId = "editbox-select-registration-" + groupName;
            RelatedAgentsService.remove(groupName, entityId).success(function() {
                for (var i in $scope.data.entity.registrationAgents) {
                    var def = $scope.data.entity.registrationAgents[i];
                    if (def.agentRelationGroupName === groupName) delete def.agent;
                }
                EditBox.close(editBoxId);
            });
        };
        $("#editbox-select-registration-owner").on("open", function() {
            if (!adjustingBoxPosition) $("#find-entity-registration-owner").trigger("find");
        });
        $scope.register = function() {
            var registration = $scope.data.registration;
            if (registration.owner) {
                RegistrationService.register(registration).success(function(rs) {
                    document.location = rs.editUrl;
                });
            } else {
                MapasCulturais.Messages.error("Para se inscrever neste projeto você deve selecionar um agente responsável.");
            }
        };
        $scope.sendRegistrationRulesFile = function() {
            $("#edibox-upload-rules form").submit();
        };
        $scope.openRulesUploadEditbox = function(event) {
            EditBox.open("edibox-upload-rules", event);
            initAjaxUploader("edibox-upload-rules");
        };
        $scope.removeRegistrationRulesFile = function(id, $index) {
            if (confirm("Deseja remover este anexo?")) {
                $http.get($scope.data.entity.registrationRulesFile.deleteUrl).success(function(response) {
                    $scope.data.entity.registrationRulesFile = null;
                });
            }
        };
        var initAjaxUploader = function(id) {
            var $form = $("#" + id + " form");
            if ($form.data("initialized")) return;
            MapasCulturais.AjaxUploader.init($form);
            $("#" + id).on("cancel", function() {
                if ($form.data("xhr")) $form.data("xhr").abort();
                $form.get(0).reset();
                MapasCulturais.AjaxUploader.resetProgressBar($form);
            });
            $form.on("ajaxForm.success", function(evt, response) {
                $scope.data.entity.registrationRulesFile = response["rules"];
                $scope.$apply();
                setTimeout(function() {
                    EditBox.close(id);
                }, 700);
            });
        };
        if (MapasCulturais.request.controller === "registration") {
            $("#submitButton").hide();
            $(".js-editable-registrationCategory").on("save", function() {
                setTimeout(function() {
                    $("#submitButton").trigger("click");
                });
            });
        }
        $scope.sendRegistration = function() {
            RegistrationService.send($scope.data.entity.id).success(function(response) {
                $(".js-response-error").remove();
                if (response.error) {
                    var focused = false;
                    Object.keys(response.data).forEach(function(field, index) {
                        var $el;
                        if (field === "category") {
                            $el = $(".js-editable-registrationCategory").parent();
                        } else if (field.indexOf("agent") !== -1) {
                            $el = $("#" + field).parent().find(".registration-label");
                        } else {
                            $el = $("#" + field).find("div:first");
                        }
                        var message = response.data[field] instanceof Array ? response.data[field].join(" ") : response.data[field];
                        message = message.replace(/"/g, "&quot;");
                        $scope.data.propLabels.forEach(function(prop) {
                            message = message.replace("{{" + prop.name + "}}", prop.label);
                        });
                        $el.append('<span title="' + message + '" class="danger hltip js-response-error" data-hltip-classes="hltip-danger"></span>');
                        if (!focused) {
                            $("html,body").animate({
                                scrollTop: $el.parents("li").get(0).offsetTop - 10
                            }, 300);
                            focused = true;
                        }
                    });
                    MapasCulturais.Messages.error("Corrija os erros indicados abaixo.");
                } else {
                    MapasCulturais.Messages.success("Inscrição enviada. Aguarde tela de sumário.");
                    document.location = response.singleUrl;
                }
            });
        };
        var url = new UrlService("project");
        $scope.publish = function() {
            $http.post(url.create("publish", $scope.data.entity.id)).success(function(r) {
                alert("publicado");
            }).error(function(r) {
                alert("erro");
            });
        };
    } ]);
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
//# sourceMappingURL=/assets/js/app-43ff713a6d33adc1a4b9ca96e502a886.js.map