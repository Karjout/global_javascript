/* Product module */
global.jquery.utils.products = function() {
	// private
	var rpp = 10; // rows per page
	var page = 1; // starting page
	var all = false; // default setting for pagination on/off
	var pages, rows, count, loading, wrap, container, paginator, cells, breakers, hash, subcat, billboard_19, billboard_34;

	var initLoading = function() {
		$j("body").append(loading);
	};

	var processHash = function() {
		hash = global.jquery.utils.common.parseHash();
		if (hash.show && hash.show == "all") {
			all = true;
		} else if (hash.show && hash.show == 1) {
			all = false;
			page = 1;
		} else if (hash.pg && Number(hash.pg) > 0) {
			all = false;
			page = Number(hash.pg);
		} else {
			page = 1;
		}
		if (all || pages.length == 1)
			showAll();
		else {
			/*
			 * var ie7 = (navigator.appVersion.indexOf("MSIE 7.")==-1) ? false :
			 * true; if ( ie7 == true){ showAll(); } else {
			 */
			paginate(page);
			// }
		}
	};

	var initPaginator = function() {
		// if (subcat.width() == 0) {
		// container.css("width","auto"); // set back to 5 across if subcat nav
		// is hidden in SiteManager
		// rpp = 8; // change back to 8 rows per page if subcat is suppressed
		// }

		container.find("script").remove();
		container.before(billboard_19).before(paginator.filter(".top")).before(
				subcat).after(billboard_34).after(paginator.filter(".bottom"));
	};

	var addShowAllButton = function() {
		var a = $j('<a class="page-off" href="#show:1">View Fewer</a>');
		a.click(function() {
			all = false;
		});
		paginator.append(a);
		var b = $j('<a class="page-all" href="#show:all">View All</a>');
		b.click(function() {
			all = true;
		});
		paginator.append(b);
	};

	var addShowingAllLabel = function() {
		paginator.append("<span class='page-mode'>Viewing All</span>");
	};

	var addProductCount = function() {
		paginator.append("<span class='page-count'> (" + getNumItems()
				+ " items)</span>");
	}

	var getNumItems = function() {
		var c = $j('#subcat li.hot span.count, #subcat div.hot').text();
		c = $j.trim(c.replace(/.*\(([0-9]+)\)/, "$1"));
		if (c < 1)
			c = count;
		return c;
	}

	var addPrevNextButtons = function() {
		var prev = $j('<a class="page-prev" href="#pg:' + (page - 1) + '"><span class="page-prev-arrow"> </span><span class="page-prev-label">Previous</span></a>');
		prev.click(function() {
			if ($j(this).hasClass("disabled"))
				return false;
			loading.css("display", "block");
			page--;
		});
		var next = $j('<a class="page-next" href="#pg:' + (page + 1) + '"><span class="page-next-label">Next</span><span class="page-next-arrow"> </span></a>');
		next.click(function() {
			if ($j(this).hasClass("disabled"))
				return false;
			loading.css("display", "block");
			page++;
		});
		var first = $j('<a class="page-first" href="#pg:1"><span class="double_arrow"></span></a>');
		first.click(function() {
			if ($j(this).hasClass("disabled"))
				return false;
			loading.css("display", "block");
			page = 1;
		});
		var last = $j('<a class="page-last" href="#pg:' + pages.length + '"><span class="double_arrow"></span></a>');
		last.click(function() {
			if ($j(this).hasClass("disabled"))
				return false;
			loading.css("display", "block");
			page = pages.length;
		});
		paginator.prepend(prev);
		paginator.prepend(first);
		paginator.append(next);
		paginator.append(last);
		adjustPrevNextButtons();
	};

	var addBottomJumpListeners = function() {
		paginator.filter(".bottom").children("a").click(function() {
			$j(window).scrollTop(0);
		});
	};

	// row stacker
	var rowStack = function() {
		var offset = ($j(window).width() - wrap.width()) / 2; // hack for
																// margin 0 auto
		var containerWidth = container.width();
		cells.each(function() {
			var el = $j(this);
			// this is the base calculation based on current EB styling of
			// content wrapper
				var pos = (290 - offset) + el.position().left;
				// this is a hack for the FA site which doesn't size its content
				// wrapper the same as EB
				if ($j("body").hasClass("FA"))
					pos = el.position().left - 180;
				var wid = el.width();
				// el.append("offset:"+offset+" pos: "+pos+" wid:"+wid+" next:
				// "+el.next().width()+" container: "+containerWidth);
				if (pos + wid + el.next().width() > containerWidth
						|| el.next().length == 0) {
					el.prevUntil("div.row").andSelf().wrapAll(
							"<div class='row'></div>");
				}
			});
		rows = container.children("div.row");
		var pc = Math.ceil(rows.length / rpp); // page count = number of rows /
												// rows per page
		var bb = rows.eq(0).children(".billboard_1000").length; // adjust
																// threshold by
																// 1 if
																// billboard_1000
																// exists
		rpp = rpp + bb;
		for ( var i = 0; i < pc; i++) {
			var start = (i == 0) ? 0 : (i * rpp);
			var end = start + rpp;
			var pg = rows.slice(start, end);
			if (pg.children("div.cell").length)
				pg.wrapAll("<div class='page' rel='" + i + "'></div>");
		}
		pages = container.children("div.page");
		pages.each(function() {
			var pg = $j(this);
			var num = pages.index(pg);
			var a = $j("<a class='page-button' rel='" + num + "' href='#pg:"
					+ (num + 1) + "'>" + (num + 1) + "</a>");
			a.click(function() {
				console.log('in click function');
				if ($j(this).hasClass("selected"))
					return false;
				loading.css("display", "block");
				page = num + 1;
			});
			paginator.append(a);
			// if the first item in the first row is not a breaker
				if (!pg.children("div.row").first().children().first().is(
						breakers)) {
					// get the previous page's last breaker
					var breaker = pg.prev().children("div.row").children(
							breakers).last();
					// if there is a breaker in the previous page that is
					// related to the first element, prepend it
					if (breaker.length) {
						breaker = breaker.clone().addClass("cloned");
						pg.children("div.row").first().prepend(breaker);
					}
				}
			});
		if (pages.length > 1) {
			addPrevNextButtons();
			/*
			 * var ie7 = (navigator.appVersion.indexOf("MSIE 7.")==-1) ? false :
			 * true; if (ie7 == false) {
			 */
			addShowAllButton();
			// }

			addShowingAllLabel();
			addProductCount();
			addBottomJumpListeners();
		} else {
			paginator.removeClass("paginate").addClass("showall");
			addShowingAllLabel();
			addProductCount();
		}
	};

	var setSelectedButton = function(a) {
		paginator.children("a").removeClass("selected");
		if (a) {
			paginator.children("a.page-all").addClass("selected");
		} else {
			paginator.children("a.page-button[rel=" + (page - 1) + "]")
					.addClass("selected");
		}
	};

	var jumpToPreviousProduct = function() {
		if (hash.pid) {
			var y = $j("#cell_" + hash.pid).offset().top;
			$j(window).scrollTop(y);
		}
	};

	var adjustPrevNextButtons = function() {
		if (page == 1) {
			paginator.children("a.page-first, a.page-prev")
					.addClass("disabled");
			paginator.children("a.page-prev")
					.attr("href", "javascript:void(0)");
		} else {
			paginator.children("a.page-first, a.page-prev").removeClass(
					"disabled");
			paginator.children("a.page-prev").attr("href", "#pg:" + (page - 1));
		}
		if (page == pages.length) {
			paginator.children("a.page-last, a.page-next").addClass("disabled");
			paginator.children("a.page-next")
					.attr("href", "javascript:void(0)");
		} else {
			paginator.children("a.page-last, a.page-next").removeClass(
					"disabled");
			paginator.children("a.page-next").attr("href", "#pg:" + (page + 1));
		}
	};

	var postProcess = function() {
		adjustPrevNextButtons();
		jumpToPreviousProduct();
		loading.css("display", "none");
		if (page != 1 && billboard_19.length) {
			billboard_19.hide();
			$j(window).scrollTop(0);
		} else if (page == 1 && billboard_19.length) {
			billboard_19.show();
		}
		document.getElementById("page_button_selected").value = page;
		$j.cookie("preferences.pagination.showAll", all, {
			path : "/"
		});
	};

	var paginate = function(pg) {
		container.removeClass("showall").addClass("paginate");
		paginator.removeClass("showall").addClass("paginate");
		page = pg;
		pages.hide();
		pages.eq(pg - 1).fadeIn();
		setSelectedButton(false);
		postProcess();
	};

	var showAll = function() {
		container.removeClass("paginate").addClass("showall");
		paginator.removeClass("paginate").addClass("showall");
		page = 1;
		pages.hide().fadeIn();
		setSelectedButton(true);
		postProcess();
	};

	// public
	return {
		init : function() {
			loading = $j("<div class='pagination-loading'></div>");
			billboard_19 = $j(".billboard_19");
			billboard_34 = $j(".billboard_34");
			subcat = $j("#subcat");
			wrap = $j("#contentWrap");
			container = $j("#billboard_wrapper");
			paginator = $j(".paginator");
			breakers = "div.first_subcategory,div.subcategory_banner";
			initLoading();
			initPaginator();
			cells = container.children().not(breakers);
			count = cells.filter("div.cell,div.billboard").length;
			if ($j.cookie("preferences.pagination.showAll")
					&& $j.cookie("preferences.pagination.showAll") == "true")
				all = true;
			if (cells.filter("div.cell").length) {
				rowStack();
				processHash();
                // only apply processHash if pagination is necessary
                var n = jQuery("span.page-mode:visible").length;
                if(n == 0){
				    $j(window).hashchange(processHash);
                }
			} else {
				paginator.hide();
			}
		}
	}

}();