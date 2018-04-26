var util = {
	/*
	 * 获取Url参数
	 */
	getUrlData : function(s){
		var a = s.split('?')[1].split("&"),o = {};
		for (var i = 0;i < a.length; i++){
			var k = a[i].split("=");
            o[k[0]] = k[1];
		}
		return o;
	},
	/*
	 *	获取location.search参数
	 */
	getSearchData : function(){
		var a = location.search.replace("?","").split("&"),o = {};
		for (var i = 0;i < a.length; i++){
			var k = a[i].split("=");
            o[k[0]] = k[1];
		}
		return o;
	},
	/**
	 * 冒泡算法
	 * @id bubbleSort
	 * @param {Array} 需排列数组
	 * @param {String} 按key值排序 -- 可选
	 * @param {Boolean} 排序方式，true为降序，false为升序 -- 可选,默认升序
	 */
    bubbleSort: function(arr, key, desc) {
        var arr = [].concat(arr);
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (key) {
                    if (parseInt(arr[i][key]) > parseInt(arr[j][key])) break;
                } else {
                    if (arr[i] > arr[j]) break;
                }
                if (j == arr.length - 1) {
                    arr1.push(arr[i]);
                    arr.splice(i, 1);
                    i = -1;
                }
            }
            if (i == arr.length - 1) {
                arr1.push(arr[i]);
                arr.splice(i, 1);
                i = -1;
            }
        }

        if (desc) return arr1.reverse();
        else return arr1;
    },
    /**
	 * Cookie
	 * @id Cookie
	 */
    Cookie: {
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
				if(!isJSON)
	                return cookieValue.split('=')[1];
				else
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
}
