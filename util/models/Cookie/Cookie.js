/**
 * Cookie
 * @id Cookie
 */
const Cookie =  {
    write: function(name, value, exp, path, domain, secure) {
        if (!/^\w*$/.test(name)) alert("cookie格式不正确");
        if (/; /.test(value)) alert("cookie格式不正确");
        var cookieValue = name + "=" + value;
        if (exp) {
            var dt = new Date();
            dt.setTime(dt.getTime() + (exp * 1000));
            cookieValue += "; expires=" + dt.toGMTString();
        }
        if (path) {
            cookieValue += "; path=" + path;
        }
        if (domain) {
            cookieValue += "; domain=" + domain;
        }
        if (secure) {
            cookieValue += "; secure";
        }
        document.cookie = cookieValue;

    },
    rewriteKey: function(name, key, keyVal, exp, path, domain, secure) {
        var str = key;
        if (keyVal) {
            var cookie = this.read(name);
            var reg = new RegExp("\\b" + key + "=([^&]*)\\b", "g");
            str = cookie.replace(reg,
            function(m1, m2) {
                return m1.replace(m2, keyVal);
            })
        }
        if (/^\d+(s|m|h|d)$/i.test(exp)) {
            if (/^\d+s$/i.test(exp)) this.setSec(name, str, (exp.replace(/s$/i, "")), path, domain, secure);
            if (/^\d+m$/i.test(exp)) this.setMin(name, str, (exp.replace(/m$/i, "")), path, domain, secure);
            if (/^\d+h$/i.test(exp)) this.setHour(name, str, (exp.replace(/h$/i, "")), path, domain, secure);
            if (/^\d+d$/i.test(exp)) this.setDay(name, str, (exp.replace(/d$/i, "")), path, domain, secure);
        } else {
            this.write(name, str, exp, path, domain, secure);
        }
    },
    setDay: function(name, value, exp, path, domain, secure) {
        this.write(name, value, (exp * 24 * 60 * 60), path, domain, secure);
    },
    setHour: function(name, value, exp, path, domain, secure) {
        this.write(name, value, (exp * 60 * 60), path, domain, secure);
    },
    setMin: function(name, value, exp, path, domain, secure) {
        this.write(name, value, (exp * 60), path, domain, secure);
    },
    setSec: function(name, value, exp, path, domain, secure) {
        this.write(name, value, (exp), path, domain, secure);
    },
    read: function(name, key, isJSON) {
        var cookieValue = "";
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].match(/^(\w+)=(.+)$/);
            if (temp && temp.length > 1 && temp[1] == name) {
                cookieValue = temp[2];
                break;
            }
        }
        if (key) {
			if(!isJSON){
                var o = {},arr = cookieValue.split('&');
                for (var i in arr){
                	o[arr[i].split('=')[0]] = arr[i].split('=')[1];
                }
                return o[key]
			} else
				return JSON.parse('{' + cookieValue.replace(/\=/,':').replace(/([a-z0-9]+)/g,function(){return '"' + arguments[0] + '"'}) + '}');
        }
        return cookieValue;
    },
    remove: function(name, path, domain) {
        var cookie = name + "=";
        if (path) cookie += '; path=' + path;
        if (domain) cookie += ';domain=' + domain;
        cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
        document.cookie = cookie;
        
    }
}

module.exports = Cookie;