/**
 * Here are vue filter
 * please include main-function-custom lodash.js, momment.js, and also numbro.js
 * */

class vueFilterCustom {
    /**
     * fitler to format the date text display
     *  @param {String | Date} value the value that need to be parsed
* @param {String} format foramat
     * **/
    static __dateTextFilter = (value, format = "DD-MMM-yyyy") =>{ //
        if (Object.prototype.toString.call(value) === '[object Date]') {
            return moment(value).format(format);
        }
        else if (Object.prototype.toString.call(value) === '[object String]') {
            let n = Date.parse(value);
            if (!isNaN(n)) {
                return moment(value).format(format);
            }
            else {
                return '';
            }
        }
        else
            return '';
    }
/**
*custom number filter based on numbro.js
* @param {String | Number} value the value that need to be parsed
* @param {Boolean} showNA show N/A number not valid
* @param {String} format foramat
 **/
    static __numberFilter  =(value, showNA = true, format = "0,0.00")=> {
        let result = ""; let converted = false;
        if (_.isNumber(value)) {
            if (_.isFinite(value)) {
                result = numbro(value).format(format);
                converted = true;
            }
        }
        else if (_.isString(value)) {
            if (mainFunctionCustom.__notOnlywhiteSpace(value)) {
                let toNumber = Number(value);
                if (_.isFinite(toNumber)) {
                    result = numbro(value).format(format);
                    converted = true;
                }
            }
        }
        if (!converted && showNA) {
            result = "N/A";
        }
        return result;
    }
}