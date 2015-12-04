function priceSet() {
    this.key   = new Array();
    this.price = new Array();
    this.styleKey = new Array();
    this.styleRegPrice = new Array();
    this.styleHighCurPrice = new Array();
    this.styleAllMarkedDown = new Array();
    this.ensembleId = null;
    this.loaded = false;
    this.isValid = function(value) {
        if (value == undefined || value == null || value.length == 0 || value == "null")
            return false;
        else
            return true;
    };

    this.init = function () {
        this.key   = new Array();
        this.price = new Array();
        this.styleKey = new Array();
        this.styleRegPrice = new Array();
        this.styleHighCurPrice = new Array();
        this.styleAllMarkedDown = new Array();
        this.ensembleId = null;
        this.loaded = false;
    };

    this.findStylePriceIndex = function(searchKey) {
        if (!this.isValid(searchKey)) return -1;

        for (var i = 0; i < this.styleKey.length; i++) {
            if (this.styleKey[i] == searchKey) {
                return i;
            }
        }
        return -1;
    };

    this.findStyleInsertPlace = function(searchKey) {
		 var hole = -1;

		 if (!this.isValid(searchKey)) return -1;
		 for (var i = 0; i < this.styleKey.length; i++) {
			 if (this.styleKey[i] == searchKey) {
				 return i;
			 } else if (this.styleKey[i] == null) {
				 hole = i;
			 }
		 }

		 if (hole == -1)
			 return this.styleKey.length;
		 else
			 return hole;
	 };

    this.addStylePrice = function(newKey, newRegPrice, newHighCurPrice, newAllMarkedDown) {
        var oldIndex = this.findStyleInsertPlace(newKey);
        if (oldIndex != -1) {
            this.styleKey[oldIndex] = newKey;
            this.styleRegPrice[oldIndex] = newRegPrice;
            this.styleHighCurPrice[oldIndex] = newHighCurPrice;
            this.styleAllMarkedDown[oldIndex] = newAllMarkedDown;
        }
    };

    this.getStylePrice = function(searchKey) {
        var priceIndex = this.findStylePriceIndex(searchKey);
        var resultPrice = "";
        if (priceIndex > -1)
            resultPrice = this.styleRegPrice[priceIndex];
        return resultPrice;
    };

    this.getStyleHighCurPrice = function(searchKey) {
        var priceIndex = this.findStylePriceIndex(searchKey);
        var resultPrice = "";
        if (priceIndex > -1)
            resultPrice = this.styleHighCurPrice[priceIndex];
        return resultPrice;
    };


    this.getStyleAllMarkedDown = function(searchKey) {
        var priceIndex = this.findStylePriceIndex(searchKey);
        var resultPrice = "";
        if (priceIndex > -1)
            resultPrice = this.styleAllMarkedDown[priceIndex];
        return resultPrice;
    };

    this.findPriceIndex = function(searchKey) {
        if (!this.isValid(searchKey)) return -1;

        for (var i = 0; i < this.key.length; i++) {
            if (this.key[i] == searchKey) {
                return i;
            }
        }
        return -1;
    };

    this.findInsertPlace = function(searchKey) {
		 var hole = -1;

		 if (!this.isValid(searchKey)) return -1;

		 for (var i = 0; i < this.key.length; i++) {
			 if (this.key[i] == searchKey) {
				 return i;
			 } else if (this.key[i] == null) {
				 hole = i;
			 }
		 }

		 if (hole == -1)
			 return this.key.length;
		 else
			 return hole;
	 };

    this.findPrice = function(searchKey) {
        var index = this.findPriceIndex(searchKey);
        if (index > -1)
            return this.price[index];
        else
            return "";
    };

    this.addPrice = function(newKey, newPrice) {
        var oldIndex = this.findInsertPlace(newKey);
        if (oldIndex != -1) {
            this.key[oldIndex] = newKey;
            this.price[oldIndex] = newPrice;
        }
    };

    this.removePrice= function(oldKey) {
        var oldIndex = this.findPriceIndex(oldKey);
        if (oldIndex != -1) {
            this.key[oldIndex]  = null;
            this.price[oldIndex] = null;
        }
    };

    this.dump = function(me, idx) {
        for (var j = 0; j < me.key.length; j++) {
        }
        for (var j = 0; j < me.styleKey.length; j++) {
        }
    };

    this.getRegPriceFromPrice = function(price) {
        if (!this.isValid(price)) return "";
        var parsed = price.split(":");
        if (parsed.length > 0)
            return parsed[0];
        else
            return "";
    };

    this.getCurPriceFromPrice = function(price) {
    if (!this.isValid(price)) return "";
        var parsed = price.split(":");
        if (parsed.length > 1)
            return parsed[1];
        else
            return "";
    };

    this.setPriceInfo = function(style, color, regPrice, curPrice) {
        if (!this.isValid(style)) return ;
        if (!this.isValid(color)) return ;
        if (!this.isValid(regPrice)) return ;
        if (!this.isValid(curPrice)) return ;
        this.addPrice(style + "-" + color, regPrice + ":" + curPrice);
    };

    this.clearPriceInfo = function(style, color) {
        if (!this.isValid(style)) return ;
        if (!this.isValid(color)) return ;
        this.removePrice(style + "-" + color);
    };

    this.getCurPriceInfo = function(style, color) {
        if (!this.isValid(style)) return "";
        if (!this.isValid(color)) return "";
        var workPriceInfo = this.findPrice(style + "-" + color);
        return this.getCurPriceFromPrice(workPriceInfo);
    };

    this.getRegPriceInfo = function(style, color) {
        if (!this.isValid(style)) return "";
        if (!this.isValid(color)) return "";
        var workPriceInfo = this.findPrice(style + "-" + color);
        return this.getRegPriceFromPrice(workPriceInfo);
    };

    this.getColorPrices = function(ensembleId, eobFlag, clearanceFlag, displayClearanceVariants, pageType, idx) {
		 var queryStr = getBaseURL() + "/ajax/get_ensemble_prices.jsp?ensembleId=" + ensembleId ;
		 if (eobFlag == 'true') {
			 queryStr = queryStr + '&eob=true' + '&pageType=' + pageType;

		 }

		 if (clearanceFlag != undefined && clearanceFlag != null)
			 queryStr = queryStr + "&clearanceFlag=" + clearanceFlag;
		 if (displayClearanceVariants != undefined && displayClearanceVariants != null)
			 queryStr = queryStr + "&displayClearaceVariants=" + displayClearanceVariants;
		 if (idx != undefined)
			 queryStr = queryStr + "&idx=" + idx;
		 var connectionObject = YAHOO.ebauer.utilities.asyncRequest('GET', queryStr, calbackEnsemblePrices);
	 };

    this.setStyleInfo = function(styleInfo) {
        this.addStylePrice(styleInfo.styleId, styleInfo.regPrice, styleInfo.highestCurrentPrice, styleInfo.allMarkedDown);
        if (styleInfo.prices != undefined) {
            var length = styleInfo.prices.length;
            for (var i = 0; i < length; i++) {
                var priceInfo = styleInfo.prices[i];
                this.setPriceInfo(priceInfo.styleId, priceInfo.colorId, priceInfo.regPrice, priceInfo.curPrice);
            }
        }

    };

    this.processColorPrices = function (o, me, us){
        var x = eval('(' + o.responseText + ')');
        if (x.ensembleId != undefined) {
            var idx = x.idx;
            if (idx != undefined) {
                me = us[idx];
            } else {
                idx = null;
            }
            if (me != undefined && me != null) {
                me.init();
                me.ensembleId = x.ensembleId;
                if (x.styles != undefined) {
                    var length = x.styles.length;
                    for (var i = 0; i < length; i++) {
                        var styleInfo = x.styles[i];
                        me.setStyleInfo(styleInfo);
                    }
                }
                me.loaded = true;
                return idx;
            }
        }
   };
}