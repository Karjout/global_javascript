function ebBookmark() {
    this.createXMLHttp = function () {
        if (typeof XMLHttpRequest != 'undefined')
            return new XMLHttpRequest();
        else if (window.ActiveXObject) {
            var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp",
            "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.5.0"];
            for (var i = avers.length -1; i >= 0; i--) {
                try {
                    httpObj = new ActiveXObject(avers[i]);
                    return httpObj;
                } catch(e) {}
            }
        }
        throw new Error('XMLHttp (AJAX) not supported');
    };


    this.isValid = function(value) {
        if (value == undefined || value == null || value.length == 0 || value == "null")
            return false;
        else
            return true;
    };

    this.goBookmark = function(name) {
        if (!this.isValid(name))
            return;

        this.name = name;
        var requestNumber = Math.random();
        var queryStr = getBaseURL() + "/ajax/get_session_bookmark.jsp?name=" + name + "&rn=" + requestNumber ;
        var self = this;
        var ajaxObj = this.createXMLHttp();
        ajaxObj.open("GET", queryStr, true);
        ajaxObj.onreadystatechange = function() {
            if (ajaxObj.readyState == 4) {
                if (ajaxObj.status == 200) {
                    var x = eval('(' + ajaxObj.responseText + ')');
                    if (x.url != undefined) {
                        window.location.href = getBaseURL() + x.url;
                    }
                }
            }
        };

        ajaxObj.send(null);
    };

    this.setBookmark = function(name, url) {
        if (!isValid(name))
            return;
        if (!isValid(url))
            return;
        this.name = name;
        this.url = url;

        var queryStr = getBaseURL() + "/ajax/set_session_bookmark.jsp?name=" + name + "&url=" + url;
        var self = this;
        var ajaxObj = this.createXMLHttp();

        ajaxObj.open("GET", queryStr, true);
        ajaxObj.onreadystatechange = function() {
            if (ajaxObj.readyState == 4) {
                // Nothing to do
                if (ajaxObj.status == 200) {
                    self.isSet = true;
                }
            }
        };

        ajaxObj.send(null);
    };
}