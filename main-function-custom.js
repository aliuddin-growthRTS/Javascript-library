/**
 * Here are some functionality that always used
 * please include lodash.js
 * */

class mainFunctionCustom {

    /**to check if string
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
                                data[propArr[0]] = mainFunctionCustom.__stringToDateParser((data[propArr[0]]));
                            }
                            else if (Object.prototype.toString.call(dataVal) === "[object Array]") {
                                if (typeof dataVal[0] !== "undefined") {
                                    let newArr = [];
                                    for (let i in dataVal) {
                                        newArr.push(mainFunctionCustom.__stringToDateParser(dataVal[i]));
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
                                data[propArr[0]] = mainFunctionCustom.__objectDateMaker(dataVal, [propArr[1]]);
                            }
                            else if (Object.prototype.toString.call(dataVal) === "[object Array]") {
                                let newArr = [];
                                for (let i in dataVal) {
                                    newArr.push(mainFunctionCustom.__objectDateMaker(dataVal[i], [propArr[1]]));
                                }
                                data[propArr[0]] = newArr;
                            }
                        }
                    }
                }
            }
        }
        catch (e) { console.errror(e); }
        return data;
    }
    /**
     * To delay.
     * @param {Number} ms millisecond
     */
    static __sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}