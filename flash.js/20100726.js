/* Flash replacement API
 * DEPENDS: jQuery, swfobject
 * Author: Keith Childers
 */

if ( !YAHOO.ebauer ) { YAHOO.namespace('ebauer'); }

YAHOO.ebauer.flash = function () {

    var count = 0; /* for generating unique embed id(s) */

    var replaceFlash = function (els) {
    	if (!swfobject)
            $j(els).css('visibility', 'visible');
        else
            $j(els).each(function () {
                insertFlash(this);
            });
    };

    var insertFlash = function (ele) {
        var el = $j(ele);
        var json = el.children('var').text();
        var vars = {};
        var attr = {};
        var flashvars = {};
        var params = {};
        var ver = '9.0.115';

        if (!ele.id) {
            count++;
            ele.id = 'movie' + count;
        }

        params.allowScriptAccess = 'always';
        params.allowFullScreen = 'true';
        flashvars.policy = escape('http://s7d2.scene7.com/crossdomain.xml');

        if (json)
            vars = eval('({' + json + '})');

        for (var p in vars) {
            switch (p) {
                case 'version':
                    ver = vars[p].toString();
                    break;
                case 'bgcolor': case 'quality': case 'wmode': case 'menu': case 'allowFullScreen': case 'version':
                    params[p] = vars[p];
                    break;
                case 'flashvars':
                    for (var n in vars[p]) {
                        flashvars[n] = vars[p][n];
                    }
                    break;
                case 'id': case 'swf': case 'width': case 'height':
                    attr[p] = vars[p];
                    break;
                default:
                    break;
            }
        }

        if (attr.swf && attr.height && attr.width) {
            swfobject.embedSWF(attr.swf, ele.id, attr.width, attr.height, ver, "/expressInstall.swf", flashvars, params, attr, success);
        } else {
            el.css('visibility', 'visible');
        }

    };

    var success = function (e) {
        if (e.success)
            $j('#' + e.id).removeClass('nonflash').addClass('flash');
        else
            $j('#' + e.id).css('visibility', 'visible');
    }

    /*	PUBLIC */
    return {
        init: function () {
            replaceFlash($j('#canvas div.nonflash'));
        },
        generic: function () {
            replaceFlash($j('#content_wrapper div.nonflash')) || 
            replaceFlash($j('#diary .sizeModule .tabs #tabs-4 .content #billboard_wrapper .nonflash'));
        }
    };

} ();