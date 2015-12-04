function createNamedElement(type, name) {
   var element = null;
   // Try the IE way; this fails on standards-compliant browsers
   try {
      element = document.createElement('<'+type+' name="'+name+'">');
   } catch (e) {
   }
   if (!element || element.nodeName != type.toUpperCase()) {
      // Non-IE browser; use canonical method to create named element
      element = document.createElement(type);
      element.name = name;
   }
   return element;
}

function createDOM(tagName, jsonProps)
{
	var newElement;
	newElement = document.createElement(tagName);
	if (jsonProps == null) {
		return newElement;
	}
	else
	{
		if(jsonProps.name != undefined) {
			newElement = createNamedElement(tagName, jsonProps.name);
		}
		for (var key in jsonProps)
			{
				var value = jsonProps[key];
				if (key == 'class')
					newElement.className = value;
				else if (key == 'style')
					newElement.style.cssText = value;
				else
					newElement.setAttribute(key, value);
			}
		return newElement;
	}
}

function createTag(tagName, id, classStyleName, childElement) {
    var newElement ;
	if (id != null && classStyleName != null)
	{
		newElement = document.createElement(tagName);
		newElement.setAttribute('id', id);
		newElement.className = classStyleName;
	}
	else if (classStyleName != null)
	{
		newElement = document.createElement(tagName);
		newElement.className = classStyleName;
	}
	else if (id != null)
	{
		newElement = document.createElement(tagName);
		newElement.setAttribute('id', id);
	}
	else
	{
		newElement = document.createElement(tagName);
	}
	if (childElement != undefined)
	{
		newElement.appendChild(childElement);
	}
	return newElement;
}

//Monogram only allows the [a-z],[A-Z],[Tab-space] and [spaces].
function containsValidChars(text){
	var objRegExp = /^[a-zA-Z][a-zA-Z\t\v\n\r ]*$/;
	if(!objRegExp.test(text)){
		resetPreviewBox();
		return false;
	}
	return true;
}

function trim(text){
	// Remove all white spaces in the value
    if (text) {
        while (text.substring(0, 1) == ' ') {
            text = text.substring(1, text.length);
        }
    }
   return text;
}


/*
	USAGE:
	var jsObj = JSON.parse(jsonStr);
	var jsonStr = JSON.stringify(jsObj);
*/
var json = (function () {
    var m = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' },
        s = {
            array: function (x) {
                var a = ['['], b, f, i, l = x.length, v;
                for (i = 0; i < l; i += 1) {
                    v = x[i];
                    f = s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                            }
                            a[a.length] = v;
                            b = true;
                        }
                    }
                }
                a[a.length] = ']';
                return a.join('');
            },
            'boolean': function (x) {
                return String(x);
            },
            'null': function (x) {
                return "null";
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            object: function (x) {
                if (x) {
                    if (x instanceof Array) {
                        return s.array(x);
                    }
                    var a = ['{'], b, f, i, v;
                    for (i in x) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a.push(s.string(i), ':', v);
                                b = true;
                            }
                        }
                    }
                    a[a.length] = '}';
                    return a.join('');
                }
                return 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            }
        };
	return {
		parse: function(s) {
			try {
				return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
					s.replace(/"(\\.|[^"\\])*"/g, ''))) &&
					eval('(' + s + ')');
			} catch (e) {
				return false;
			}
		},
		stringify: s.object
	};
})();

function addObjEle(obj, key, value){
    var jsonStr = json.stringify(obj);
    jsonStr = jsonStr.substring(0,jsonStr.length - 1);
    jsonStr = jsonStr + ",\"" +  key + "\":\"" + value + "\"}";
    return json.parse(jsonStr);
}


function isNumeric(testStr) {
	var isValid = true;
   var validChars = "0123456789";
   var character;

	if ( typeof(testStr) != "undefined" && testStr != null && testStr != "" ) {
		for (i = 0; i < testStr.length && isValid; i++) {
			character = testStr.charAt(i);
			if (validChars.indexOf(character) == -1) {
				isValid = false;
			}
		}
	}
	else {
		isValid = false;
	}

	return isValid;
}

function isAlpha(testStr){
	var isValid = true;
	var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var character;

	if ( typeof(testStr) != "undefined" && testStr != null && testStr != "" ) {
		testStr = testStr.toUpperCase();
		for (i = 0; i < testStr.length && isValid; i++) {
			character = testStr.charAt(i);
			if (validChars.indexOf(character) == -1) {
				isValid = false;
			}
		}
	}
	else {
		isValid = false;
	}
	return isValid;
}

function checkIfSubscribed(eventName) {
	var hasSubscribers = false;
	if (eventName.subscribers.length > 0)
		hasSubscribers = true;
	return hasSubscribers;
}