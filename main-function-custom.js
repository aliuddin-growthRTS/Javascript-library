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

        return clonedObject;
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

}