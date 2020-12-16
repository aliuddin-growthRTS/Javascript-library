/**
 * Here are some functionality that always used
 * please include lodash.js
 * */

class MainFunctionCustom {

    /**to check if string is consist of only whitespace, null or undefiend,
     * 
     * @param {String} val the string
     */
    static __notOnlywhiteSpace = (val) => {
        if (typeof val === 'undefined') {
            return false;
        }
        else if (val === null) {
            return false;
        }
        else if (val.length === 0) {
            return false;
        }
        else if (val.replace(/\s/g, '').length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * ommiting a prop
     * @param {{}} originalObject the object
     * @param {[String]}  keysToOmit array of object keys in string that need to be ommited. eg :['aaa','bbbb.cccc']
     * */
    static __omitProp = (originalObject = {}, keysToOmit = []) => {
        for (const path of keysToOmit) {
            _.unset(originalObject, path)
        }

      //  return clonedObject;
    }
    //
    /**
     *  parse string to date, which always used for json where it used iso format to stored date
     * @param {String} val string in iso format
     */
    static __stringToDateParser = (val) => {
        let result = undefined;
        let minDate = new Date('0002-01-01T00:00:00Z');
        try {
            if (val !== null && typeof val !== "undefined") {
                let d = new Date(val);
                if (d > minDate && !isNaN(d.getDate())) {
                    result = d;
                }
            }
        }
        catch (e) { }
        return result;
    }


    //
    /**
     * change string prop to date prop
     * @param {{}} alterData the data that need to be altered
     * @param {[String]} config the array of property name that need to be altered. eg ['date', 'bod.date']
     */
    static __objectDateMaker = (alterData, config) => {
        let data = alterData;
        try {
            if (Object.prototype.toString.call(config) === "[object Array]") {
                for (let index in config) {
                    let propName = config[index];
                    let propArr = propName.split(/\.(.+)/);
                    if (propArr.length === 1) {
                        if (data.hasOwnProperty(propArr[0])) {
                            let dataVal = data[propArr[0]];
                            if (Object.prototype.toString.call(dataVal) === "[object String]") {
                                data[propArr[0]] = MainFunctionCustom.__stringToDateParser((data[propArr[0]]));
                            }
                            else if (Object.prototype.toString.call(dataVal) === "[object Array]") {
                                if (typeof dataVal[0] !== "undefined") {
                                    let newArr = [];
                                    for (let i in dataVal) {
                                        newArr.push(MainFunctionCustom.__stringToDateParser(dataVal[i]));
                                    }
                                    data[propArr[0]] = newArr;
                                }
                            }
                        }
                    }
                    else if (propArr.length > 1) {
                        if (data.hasOwnProperty(propArr[0])) {
                            let dataVal = data[propArr[0]];
                            if (Object.prototype.toString.call(dataVal) === "[object Object]") {
                                data[propArr[0]] = MainFunctionCustom.__objectDateMaker(dataVal, [propArr[1]]);
                            }
                            else if (Object.prototype.toString.call(dataVal) === "[object Array]") {
                                let newArr = [];
                                for (let i in dataVal) {
                                    newArr.push(MainFunctionCustom.__objectDateMaker(dataVal[i], [propArr[1]]));
                                }
                                data[propArr[0]] = newArr;
                            }
                        }
                    }
                }
            }
        }
        catch (e) { console.error(e); }
        return data;
    }
    /**
     * To delay.
     * @param {Number} ms millisecond
     */
    static __sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     *  zoom div function
     * @param {String} eleId
     * @param {Number} type
     * @param {Number} zoomIndex
     * @param {Number} vPercent
     * @param {Number} hPercent
     */
    static __zoomDiv = (eleId, type = 0, zoomIndex = 0.1, vPercent = 50, hPercent = 0) => {
        let p = ["webkit", "moz", "ms", "o"];
        let n = 1;
        try {
            let ele = document.getElementById(eleId);
            if (type !== 0) {
                let txt = ele.style["transform"];
                if (typeof txt !== "undefined") {
                    let text = txt.toLowerCase();
                    let index = text.indexOf("scale(");
                    if (index >= 0) {
                        let endDex = text.indexOf(")", index);
                        if (endDex >= 0) {
                            n = Number(text.substring(index + 6, endDex));
                            if (!_.isFinite(n)) {
                                n = 1;
                            }
                        }
                    }
                }
            }
            if (type === 1) {
                n += zoomIndex;
            }
            else {
                n -= zoomIndex;
            }
            let transformText = "scale(" + n + ")", transformOriginText = vPercent + "% " + hPercent + "%";
            for (var i = 0; i < p.length; i++) {
                ele.style[p[i] + "Transform"] = transformText;
                ele.style[p[i] + "TransformOrigin"] = transformOriginText;
            }

            ele.style["transform"] = transformText;
            ele.style["transformOrigin"] = transformOriginText;
        }
        catch (e) { console.error(e); }
        return n;
    }
    /**
     * function use for zooming the element using css transform property
     * @param {String} eleId the idd for the element that need to be zoommed
     * @param {Number|String} scale the scale for the zoom, 1 is default size
     * @param {Number|String} vPercent value first in transform origin property
     * @param {Number|String} hPercent value second in transform origin property
     */
    static __zoomDiv2 = (eleId, scale, vPercent = 0, hPercent = 0) => {
        let p = ["webkit", "moz", "ms", "o"];
        let success = false;
        try {
            let ele = document.getElementById(eleId);
            let transformText = "scale(" + scale + ")", transformOriginText = vPercent + "% " + hPercent + "%";
            for (var i = 0; i < p.length; i++) {
                ele.style[p[i] + "Transform"] = transformText;
                ele.style[p[i] + "TransformOrigin"] = transformOriginText;
            }

            ele.style["transform"] = transformText;
            ele.style["transformOrigin"] = transformOriginText;
            ele.style["transition"] = "transform .5s";
            success = true;
        }
        catch (e) { console.error(e); }
        return success;
    }
    /**
     * function that will always return string, if the object is not a string, number, boolean or date, it will return empty string. date will be return in iso format string
     * @param {any} objToString object to become string
     */
    static __alwayReturnString(objToString) {
        if (_.isString(objToString)) {
            return objToString;
        }
        else if (_.isNumber(objToString) || _.isBoolean(objToString)) {
            return "" + objToString;
        }
        else if (_.isDate(objToString)) {
            return objToString.toISOString();
        }
        else {
            return "";
        }
    }
    /**
     * use to convert property name. will return new obj (shallow copy) of the altered property object
     * @param {Object} obj the object to be convert
     * @param {Boolean} jsToC if its from js to c or not. if js to c, the first letter will be uppercase, if not, the first letter will be lowercase
     */
    static __jsToC_CToJs(obj, jsToC = true) {
        let type = "upperFirst";
        if (!jsToC) {
            type = "lowerFirst";
        }
        let newobj = {};
        newobj = _.mapKeys(obj, (value, key, inObj) => {
            if (_.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    inObj[key][i] = this.__jsToC_CToJs(value[i], jsToC);
                }
            }
            else if (Object.prototype.toString.call(value) === "[object Object]") {
                let newer = this.__jsToC_CToJs(value, jsToC);
                for (let propname in inObj[key]) {
                    delete inObj[key][propname];
                }
                _.assign(inObj[key], newer);
            }
            return _[type](key);
        });
        //console.log(newobj);
        return newobj;
    }
    /**
     * function that will set date to the earliest time of the day
     * @param {Date} date the date object
     * @param {Boolean} addDay either to add 1 day or not to the date
     * @param {Boolean} isMutate either to mutate the current date object or return new date object
     */
    static __toExactMidnight(date, addDay, isMutate) {
        if (isMutate) {
            date.setHours(0); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0);
            if (addDay) {
                date.setDate(date.getDate() + 1);
            }
        }
        else {
            let newDate = date;
            newDate.setHours(0); newDate.setMinutes(0); newDate.setSeconds(0); newDate.setMilliseconds(0);
            if (addDay) {
                newDate.setDate(date.getDate() + 1);
            }
            return newDate;
        }
    }
    /**
     * convert total duration in seconds to string readable duration  (day, hour and minute). eg '2 days 1 hour 34 minutes.'
     * @param {Number|String} duration total duration in seconds 
     */
    static __durationStrMaker(duration) {
         let day = 0, hour = 0, minute = 0;
        let dayS = ' day, ', hourS = ' hour, ', minuteS = ' minute';
        try {
            if (isFinite(duration)) {
                let time = Number(duration);
                if (time > 0) {
                    day = Math.trunc(time / 86400);
                    time %= 86400;
                    hour = Math.trunc(time / 3600);
                    time %= 3600;
                    minute = Math.trunc(time / 60);
                }
            }
            else {
                return '';
            }
            if (day > 1) {
                dayS = ' days, ';
            }
            if (hour > 1) {
                hourS = ' hours, ';
            }
            if (minute > 1) {
                minuteS = ' minutes';
            }
        }
        catch (e) {
            console.error(e);
            return "";
        }
        return day + dayS + hour + hourS + minute + minuteS;
    }
    /**
     * check if element is visible in the viewport or not
     * @param {Element} ele the element
     */
    static __isInViewPort(ele) {
        const rect = ele.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    /**
     * check if element is currently on parent element vieport,
     * @param {Element} ele the element
     * @param {Element} eleParent the parent element
     */
    static __isInParentViewPort(ele, eleParent, offsetHeight = 0.5, offsetWidth = 0.5) {
        const rect = ele.getBoundingClientRect();
        const rectParent = eleParent.getBoundingClientRect();
        return (
            (rect.top + rect.height * offsetHeight) <= rectParent.bottom &&
            (rect.left + rect.width * offsetWidth) <= rectParent.right &&
            (rect.bottom - rect.height * offsetHeight) >= (rectParent.top) &&
            (rect.right - rect.width * offsetWidth) >= (rectParent.left)
        )
    }

}
