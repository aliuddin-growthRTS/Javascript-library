/**
 * to use this, please has element-ui for vue2 installed. also install lodash.
 * also include the mainFunction.js
 * */


class VueCustomComponent {

    /**
    *component using element - ui el - tooltip.only will show tooltip if text is overflowed
    **/
    static __elTooltipCustom = {
        mounted() { //bind mouseenter and mouseleave event to the slot element
            if (this.$children.length > 0) {
                this.$children[0].$el.addEventListener('mouseenter', this.onHover);
                this.$children[0].$el.addEventListener('mouseleave', this.onLeave);
            }
            // console.log(this.$slots.cContent);
        },
        beforeDestroy() {
            if (this.$children.length > 0) {
                this.$children[0].$el.removeEventListener('mouseenter', this.onHover);
                this.$children[0].$el.removeEventListener('mouseleave', this.onLeave);
            }
        },
        props: {
            "cEffect": {
                "type": String,
                "default": "dark"
            },
            "cContent": {
                "type": String,
                "default": ""
            },
            "cPlacement": {
                "type": String,
                "default": "bottom"
            },
            "cOffset": {
                "type": Number,
                "default": 0
            },
            "cTransition": {
                "type": String,
                "default": "el-fade-in-linear"
            },
            "cVisibleArrow": {
                "type": Boolean,
                "default": true
            },
            "cPopperOptions": {
                "type": Object,
                "default"() {
                    return { boundariesElement: 'body', gpuAcceleration: false }
                }
            },
            "cOpenDelay": {
                "type": Number,
                "default": 0
            },
            "cDisabled": {
                "type": Boolean,
                "default": false
            },
            "cPopperClass": {
                "type": String,
                "default": ""
            },
            "cEnterable": {
                "type": Boolean,
                "default": true
            },
            "cHide-after": {
                "type": Number,
                "default": 0
            },
            "cTabindex": {
                "type": Number,
                "default": 0
            },
        },
        data() {
            return {
                "show": false,
                "onHover": (evt) => {
                    if (evt.target.offsetWidth < evt.target.scrollWidth) {
                        // if (evt.target.firstElementChild.offsetWidth < evt.target.firstElementChild.scrollWidth) {
                        this.show = true;
                    }
                    else {
                        this.show = false;
                    }
                    //console.log(this.show);
                },
                "onLeave": () => {
                    this.show = false;
                    // this.$emit("is-show", this.show);
                    //   console.log(this.show);
                }
            }
        },
        methods: {

        },
        template: `
 <el-tooltip :effect='cEffect' :content='cContent' :placement='cPlacement' :disabled='cDisabled' :offset='cOffset' :transition='cTransition' :visible-arrow='cVisibleArrow' :popper-options='cPopperOptions'
 :open-delay='cOpenDelay' :popper-class='cPopperClass' :enterable='cEnterable' :hide-after='cHideAfter' :tabindex='cTabindex'
 :value='show' :manual='true'>
    <slot></slot>
<template v-if='$slots.cContent'>
    <div slot='content'>
    <slot name='cContent'></slot>
</div>
</template>
 </el-tooltip>
`
    };
    /**
     * component that will using div as pre edit element. when double clicked or tabbed, it will change to input. support input type text and number. also support textarea.
     * */
    static __inputDiv = {
        props: {
            "className": {
                'type': String,
                "default": ''
            },
            'classDiv': {
                'type': String,
                'default': '',
            },
            'classInput': {
                'type': String,
                'default': ''
            },
            'inputType': {
                'type': String,
                'default': 'text',
            },
            'tabindex': {
                'type': Number,
                'default': 0
            },
            'debounceTime': {
                'type': Number,
                'default': 100,
            },
            'isSingleClick': {
                'type': Boolean,
                'default': false
            },
            "value": {

            },
            //input part
            "disabled": {
                'type': Boolean,
                'default': false,
            },
            'name': {
                'type': String,
                'default': null
            },
            'placeholder': {
                'type': String,
                'default': ''
            },
            'readonly': {
                'type': Boolean,
                'default': false,
            },
            'required': {
                'type': Boolean,
                'default': false,
            },
            'autofocus': {
                'type': Boolean,
                'default': false,
            },
            'maxlength': {
                'type': Number,
                'default': -1, // Infinity
            },
            //input type number part
            'max': {
                'type': Number,
                'default': null,
            },
            'min': {
                'type': Number,
                'default': null,
            },
            'step': {
                'type': Number,
                'default': 1,
            }

        },
        data() {
            return {
                'inputNow': { 'value': null, 'ele': '', 'isMouse': false },
            }
        },
        methods: {
            "insertElement"(isInsert = true) {
                if (isInsert) {
                    this.inputNow.value = null;
                    try {
                        if (!this.inputNow.isMouse) { //check if current click released on the div
                            if (this.inputType.toLowerCase() === 'textarea') {
                                this.inputNow.ele = document.createElement('textarea');
                            }
                            else {
                                this.inputNow.ele = document.createElement('input');
                                this.inputNow.ele.type = this.inputType; //insert type
                            }
                            this.inputNow.ele.className = this.className + " " + this.classInput; //insert class
                            this.inputNow.ele.value = this.value; //bind value to input
                            //bind some input property
                            this.inputNow.ele.disabled = this.disabled;
                            this.inputNow.ele.name = this.name;
                            this.inputNow.ele.placeholder = this.placeholder;
                            this.inputNow.ele.readonly = this.readonly;
                            this.inputNow.ele.required = this.required;
                            this.inputNow.ele.autofocus = this.autofocus;
                            this.inputNow.ele.maxlength = this.maxlength;
                            //bind for input type number
                            if (this.inputNow.ele.type.toLowerCase() === 'number') {
                                this.inputNow.ele.max = this.max;
                                this.inputNow.ele.max = this.max;
                                this.inputNow.ele.step = this.step;
                            }

                            this.inputNow.ele.addEventListener("change", (evt) => { //add on change event
                                if (MainFunctionCustom.__notOnlywhiteSpace(evt.target.value)) {
                                    if (this.inputNow.ele.type.toLowerCase() === 'number') {
                                        if (_.isFinite(Number(evt.target.value))) {
                                            this.inputNow.value = Number(evt.target.value);
                                        }
                                    }
                                    else {
                                        this.inputNow.value = evt.target.value;
                                    }
                                }
                                else {
                                    this.inputNow.value = null;
                                }
                                this.$emit('input', this.inputNow.value);
                            });
                            this.inputNow.ele.addEventListener("blur", (evt) => {
                                this.removeElement();
                            });
                            this.$el.parentElement.appendChild(this.inputNow.ele); //append as sibling to the div
                            this.$el.style = "display : none !important"; //hide current div
                            this.inputNow.ele.focus();
                        }
                    }
                    catch (e) {
                        console.error(e);
                        if (this.inputNow.ele !== null) {
                            this.inputNow.ele.remove();
                        }
                        this.inputNow.ele = null;
                    }
                }
            },
            "removeElement"() {
                if (this.inputNow.ele !== null) {
                    this.inputNow.value = this.inputNow.ele.value; //get current input value
                    this.inputNow.ele.remove();
                    this.inputNow.ele = null; //set tu null after remove
                    this.$el.style.removeProperty("display");
                    setTimeout(() => {
                        this.$emit('on-switch');
                        this.inputNow.value = null;
                    }, this.debounceTime);
                }
            }
        },
        template: `
   <div :tabindex='tabindex' :class="className +' '+classDiv" @mouseup="inputNow.isMouse=false"
@mousedown="inputNow.isMouse=true" @focus="insertElement()" @dblclick="insertElement()" @click="insertElement(isSingleClick)">
<slot name='text'></slot>
<template v-if='!$slots.text'>
{{value}}
</template>
</div>
`
    }

    /**
     * component that will generate the functionallity for the table like filter, sort and so on.
     * */
    static __tableFunction = {
        created() {
            this.runOnCreated();
            this.runOnUpdate(this.tableData);
        },
        beforeUpdate() {
            //this.runOnUpdate();
        },
        props: {
            'tableData': { // the data to show in table
                'type': Array,
                'default'() { return []; }
            },
            'defaultSorter': { //the key that will be the default sorter when the table first time load
                'type': String,
                'default': ""
            },
            'defaultOrder': {//string weither asc or desc will be default
                'type': String,
                'default': "asc"
            },
            'filterTextKeys': { //key name list that will have filter text functionallity
                'type': Array,
                'default'() { return []; }
            },
            'filterDateKeys': { //key name list that will have filter date functionallity 
                'type': Array,
                'default'() { return []; }
            },
            'filterCheckBoxKeys': {//key name list that will have filter checkbox functionallity
                'type': Array,
                'default'() { return []; }
            },
            'sorterKeys': {//key name list that will have sorter functionallity
                'type': Array,
                'default'() { return []; }
            },
            'rowPerPage': { // number of row perpage
                'type': Number,
                'default': 100
            },
            'useLocalCopy': { //either to deep copy the props data or not.
                'type': Boolean,
                'default': true
            },
            'uniqueColumn': {
                'type': String,
                'default': "__uniqueId__"
            }
        },
        data() {
            return {
                'tableFilterProp': {}, //properties of table
                'oldTableFilterProp': {}, //old properties, to compare with.
                'isInProg': false, //either process is running. useful to use to show some loading indicator
                'orderedItems': [], // to store data that already ordered
                'textFilter': {}, // to use as modal object for the text filter input in view also the data related to it
                'tableDataLocal': [],// to stored local table. can be either deeped copy or just some reference from prop data
                'tableDataChange': [],// to store the change of tabledata, can be either cloned or just some reference from the tableDataLocal.
                'tableDataLocalOnlyId': [], // to stored table data, but only for its created Id
                'dateFilter': {},//to use as modal object for the date filter input in view also the data related to it
                'checkBoxFilter': {},//to use as modal object for the checkbox filter input in view also the data related to it
                'triggerDateInput': true, //will change from true to false and otherwise, this to resolve bug while using element-ui datepicker
            }
        },
        methods: {
            'runOnCreated'() {
                let filterTextProp = {}; let textFilterProp = {};
                this.filterTextKeys.forEach((val, index) => {
                    filterTextProp[val] = { 'filterText': '' };
                    textFilterProp[val] = { 'filterText': '' };
                });
                let filterDateProp = {};
                this.filterDateKeys.forEach(function (val, index) {
                    filterDateProp[val] = {};
                });
                let filterCheckBoxProp = {}; let filterCheckBoxProp2 = {};
                this.filterCheckBoxKeys.forEach((val, index) => {
                    filterCheckBoxProp[val] = {};
                    filterCheckBoxProp2[val] = { "isCheckAll": true, "checkList": [] };
                });
                let sorterProp = { "key": this.sorterKeys, "sort": [] };
                this.sorterKeys.forEach((val, index) => {
                    sorterProp["sort"].push('asc');
                });
                this.tableFilterProp = {
                    'totalRootChange': 0 /* total change of the root*/, 'totalChange': 0/*how many times filter is used*/, "prop": this.defaultSorter,
                    "limitDown": 0/*the index row start to show in the table*/, "itemPerPage": this.rowPerPage, "currentPage": 1/*the current page*/, 'filterText': _.cloneDeep(filterTextProp)/*stored the previous filter text details*/,
                    "filterDate": _.cloneDeep(filterDateProp)/*stored the previous filter date details*/, "filterCheckBox": _.cloneDeep(filterCheckBoxProp)/*stored the previous filter checkbox details*/,
                    "sorter": _.cloneDeep(sorterProp)/*stored the previous filter sort details*/
                };
                this.oldTableFilterProp = {
                    'totalRootChange': 0, 'totalChange': 0, "prop": null,
                    "limitDown": 0, "itemPerPage": this.rowPerPage, "currentPage": 1, 'filterText': _.cloneDeep(filterTextProp),
                    "filterDate": _.cloneDeep(filterDateProp), "filterCheckBox": _.cloneDeep(filterCheckBoxProp),
                    "sorter": _.cloneDeep(sorterProp)
                };
                this.textFilter = _.cloneDeep(textFilterProp);
                this.checkBoxFilter = _.cloneDeep(filterCheckBoxProp2);
                //create property for datefilter, which have  start and end date.
                this.filterDateKeys.forEach((head, index) => {
                    this.dateFilter[head] = {
                        "startDate": undefined,
                        "endDate": undefined,
                        "startDateOpt": {
                            disabledDate: (time) => {
                                if (this.dateFilter[head].endDate !== undefined && this.dateFilter[head].endDate !== null) {
                                    return time.getTime() > this.dateFilter[head].endDate.getTime();
                                }
                                else {
                                }
                            },
                        },
                        "endDateOpt": {
                            disabledDate: (time) => {
                                if (this.dateFilter[head].startDate !== undefined && this.dateFilter[head].startDate !== null) {
                                    return time.getTime() <= this.dateFilter[head].startDate.getTime();
                                }
                            },
                        }
                    }
                });
                //creaete checkbox filter Prop
                this.filterCheckBoxKeys.forEach((key, index) => {
                    if (this.checkBoxFilter[key] === undefined) {
                        this.checkBoxFilter[key] = [];
                    }
                });
            },
            /**
             *updating the limitdown of the tableFilterProp
             * @param {Number} val current page
             */
            'handlePageChange'(val) {
                if (val === 1) {
                    this.tableFilterProp.limitDown = 0;
                }
                else {
                    let newVal = (val - 1) * this.tableFilterProp.itemPerPage;
                    this.tableFilterProp.limitDown = newVal;
                }
            },
            /**
             *function to use for sorting the table
             * @param {String} colName the key of the table column that need to sort
             */
            'sortItem'(colName) {
                try {
                    this.isInProg = true;
                    const isSame = (element) => element === colName; //create function to be used in .findIndex
                    let df = "asc";
                    let index = this.tableFilterProp.sorter.key.findIndex(isSame); //check if colName exist
                    if (index >= 0) {//if exist
                        if (this.tableFilterProp.sorter.sort[index] === 'asc') { //if asc, change to desc
                            df = 'desc';
                        }
                        else {
                            //since df default is asc
                        }
                        //remove the old object for sort, then insert new one to the begining of array. this to make sure that the column name choosed to sort will be prioritize by the _.orderBy function.
                        this.tableFilterProp.sorter.key.splice(index, 1);
                        this.tableFilterProp.sorter.sort.splice(index, 1);
                        this.tableFilterProp.sorter.key.unshift(colName);
                        this.tableFilterProp.sorter.sort.unshift(df);
                    }
                    this.tableFilterProp.totalChange++;
                }
                finally { this.isInProg = false; }
            },
            /**
             * function to  use in filter by text in table
             * @param {String} prop the col name or key of the column that need to be filter
             * @param {any} forceRun either to force it run or not, because if the the prop previous text is same with current, it will not run the filter.
             */
            'filterTextFunc'(prop, forceRun = false) {
                try {
                    this.isInProg = true;
                    let inData = _.clone(this.tableDataLocal);
                    if (prop === '') {
                        this.tableDataChange = inData;
                        this.tableFilterProp.totalChange++;
                    }
                    else {
                        if (this.tableFilterProp.filterText[prop].filterText !== this.textFilter[prop].filterText || forceRun) { //if prev not same as current or force run
                            this.tableFilterProp.filterText[prop].filterText = this.textFilter[prop].filterText;
                            if (this.tableFilterProp.totalRootChange > 0) { //if data root not change
                                let textN = this.tableFilterProp.filterText[prop].filterText;

                                if (/\S/.test(textN) && textN !== null) {
                                    inData = _.filter(this.tableDataLocal, (o) => {
                                        let isTrue = false;
                                        try {
                                            let innerObj = _.get(o, prop, null);
                                            let innerString = _.toString(innerObj).toLowerCase();
                                            if (innerString.includes(textN.toLowerCase())) {
                                                isTrue = true;
                                            }
                                        }
                                        catch (e) { console.log(e); }
                                        return isTrue;
                                    });
                                }
                                //differentiate with the tableDataLocal that have only id, where only different data will be taken
                                let outData = _.differenceBy(this.tableDataLocalOnlyId, inData, this.uniqueColumn);
                                //stored the id for unselected row
                                this.tableFilterProp.filterText[prop].filteredData = outData;
                                // then take the real needed rows
                                //for filterText
                                for (let inKey in this.tableFilterProp.filterText) {
                                    if (inKey !== prop) {
                                        inData = _.differenceBy(inData, this.tableFilterProp.filterText[inKey].filteredData, this.uniqueColumn);
                                    }
                                }
                                //for filterDate
                                for (let inKey in this.tableFilterProp.filterDate) {
                                    inData = _.differenceBy(inData, this.tableFilterProp.filterDate[inKey].filteredData, this.uniqueColumn);
                                }
                                //for filterCheckbox
                                for (let inKey in this.tableFilterProp.filterCheckBox) {
                                    inData = _.differenceBy(inData, this.tableFilterProp.filterCheckBox[inKey].filteredData, this.uniqueColumn);
                                }
                            }
                            // store final result
                            this.tableDataChange = inData;
                            this.tableFilterProp.totalChange++;
                        }
                    }
                }
                finally { this.isInProg = false; }
            },
            /**
             * function use for date filter
             * @param {String} key the column name of the date column
             */
            'filterDateFunc'(key) {
                try {
                    this.isInProg = true;
                    let inData = _.clone(this.tableDataLocal);
                    //create default max and min date
                    let maxDate = new Date(8640000000000000);
                    let minDate = new Date(-8640000000000000);
                    try {
                        if (_.isDate(this.dateFilter[key].startDate)) {
                            minDate = this.dateFilter[key].startDate;
                        }
                        if (_.isDate(this.dateFilter[key].endDate)) {
                            maxDate = _.clone(this.dateFilter[key].endDate);
                            maxDate.setDate(maxDate.getDate() + 1); //add 1day, because we will user '<' operator. so the maxdate must be included
                        }
                        //return only data that will satisfy the condition
                        inData = _.filter(this.tableDataLocal, (o) => {
                            let yes = false;
                            try {
                                let theDate = _.get(o, key, null);
                                if (theDate >= minDate && theDate <= maxDate) {
                                    yes = true;
                                }
                            }
                            catch (e) { }
                            return yes;
                        });
                        //this part same as text filter, but start with date first
                        let outData = _.differenceBy(this.tableDataLocalOnlyId, inData, this.uniqueColumn);
                        this.tableFilterProp.filterDate[key].filteredData = outData;
                        for (let inKey in this.tableFilterProp.filterDate) {
                            if (inKey !== key) {
                                inData = _.differenceBy(inData, this.tableFilterProp.filterDate[inKey].filteredData, this.uniqueColumn);
                            }
                        }
                        for (let inKey in this.tableFilterProp.filterText) {
                            inData = _.differenceBy(inData, this.tableFilterProp.filterText[inKey].filteredData, this.uniqueColumn);
                        }
                        for (let inKey in this.tableFilterProp.filterCheckBox) {
                            inData = _.differenceBy(inData, this.tableFilterProp.filterCheckBox[inKey].filteredData, this.uniqueColumn);
                        }
                        this.tableDataChange = inData;
                    } catch (e) { console.log(e); }
                    this.tableFilterProp.totalChange++;
                }
                finally { this.isInProg = false; }
            },
            /**
             * use to catch input event on element-ui datepicker sice there's bug where the view not updated
             * */
            'filterDateInput'() {
                this.triggerDateInput = !this.triggerDateInput;
            },
            /**
             * function to create unique filter. will be called whenever data refreshed.
             * */
            'createUniqueFilter'() {
                try {
                    this.isInProg = true;
                    this.filterCheckBoxKeys.forEach(function (key, index) {
                        let newArr = _.uniqBy(this.tableDataLocal, key); //get only unique value, repeated value will only return once
                        let toCheckU = [];
                        newArr.forEach(function (val, ind) {
                            toCheckU.push({ "text": val[key], "isSelected": true }); //create object, default is checked
                        });
                        let toAdd = _.differenceBy(toCheckU, this.checkBoxFilter[key].checkList, "text"); //get list of unique value that needed to be added after data refresh
                        let toRemove = _.differenceBy(this.checkBoxFilter[key].checkList, toCheckU, "text"); // data to remove after refresh
                        let afterRemove = _.differenceBy(this.checkBoxFilter[key].checkList, toRemove, "text"); //after removed data
                        this.checkBoxFilter[key].checkList = _.orderBy(afterRemove.concat(toAdd), "text", "asc"); //oredered the final list in ascending order
                    });
                }
                finally { this.isInProg = false; }
            },
            /**
             * function that will be used for checkbox filter
             * @param {String} key the column name that need to be filtered
             */
            'filterCheckBoxFunc'(key) {
                try {
                    this.isInProg = true;
                    if (key !== null) {
                        MainFunctionCustom.__sleep(100).then(() => {
                            let inData = _.clone(this.tableDataLocal);
                            try {
                                let newArr = [];
                                //get current selected checkbox
                                let arrSelects = this.checkBoxFilter[key].checkList.map((o) => {
                                    if (o['isSelected']) {
                                        return o.text;
                                    }
                                });
                                //get only checkedbox
                                newArr = _.filter(inData, function (o) {
                                    let isTrue = false;
                                    try {
                                        let innerObj = _.get(o, key, null);
                                        let innerString = _.toString(innerObj);
                                        isTrue = arrSelects.includes(innerString);
                                    }
                                    catch (e) { console.log(e); }
                                    return isTrue;
                                });
                                //if checklist for that key exist
                                if (this.checkBoxFilter[key].checkList.length > 0) {
                                    inData = newArr;
                                }
                                //this part same as text filter, but start with checkbox first
                                let outData = _.differenceBy(this.tableDataLocalOnlyId, inData, this.uniqueColumn);
                                this.tableFilterProp.checkBoxFilter[key].filteredData = outData;
                                for (let inKey in this.tableFilterProp.filterCheckBox) {
                                    if (inKey !== key) {
                                        inData = _.differenceBy(inData, this.tableFilterProp.filterCheckBox[inKey].filteredData, this.uniqueColumn);
                                    }
                                }
                                for (let inKey in this.tableFilterProp.filterText) {
                                    inData = _.differenceBy(inData, this.tableFilterProp.filterText[inKey].filteredData, this.uniqueColumn);
                                }
                                for (let inKey in this.tableFilterProp.filterDate) {
                                    inData = _.differenceBy(inData, this.tableFilterProp.filterDate[inKey].filteredData, this.uniqueColumn);
                                }
                                this.tableDataChange = inData;
                            } catch (e) { console.log(e); }
                        });
                    }
                    else {// if key is null, then get all
                        let inData = _.clone(this.tableDataLocal);
                        this.tableDataChange = inData;
                    }
                    this.tableFilterProp.totalChange++;
                }
                finally { this.isInProg = false; }
            },
            /**
             * function for check all checkbox
             * @param {String} key Property/column name that need to be cheked all
             */
            'filterCheckBoxCheckAllFunc'(key) {
                this.checkBoxFilter[key].isCheckAll = !this.checkBoxFilter[key].isCheckAll;
                this.checkBoxFilter[key].checkList.forEach(function (val, index) {
                    this.checkBoxFilter[key].checkList[index].isSelected = this.checkBoxFilter[key].isCheckAll;
                });
            },
            /**
             * functiton that used to uncheck checked all all checkbox when one of the checkbox list is unchecked
             * @param {String} key
             * @param {Boolean} isCheck
             */
            'filtercheckBoxAlterCheckAll'(key, isCheck) {
                if (!isCheck && this.checkBoxFilter[key].isCheckAll) {
                    this.checkBoxFilter[key].isCheckAll = false;
                }
            },
            'getLocalTableData'() {
                let data = this.tableDataLocal;
                if (this.useLocalCopy) {
                    return _.cloneDeep(data);
                }
                else {
                    return data;
                }
            },
            'getChangeTableData'() {
                let data = this.tableDataChange;
                if (this.useLocalCopy) {
                    return _.cloneDeep(data);
                }
                else {
                    return data;
                }
            },
            'getCurrentShowedData'() {
                let data = this.sortedItem;
                if (this.useLocalCopy) {
                    return _.cloneDeep(data);
                }
                else {
                    return data;
                }
            },
            /**
             * function that will run on tabledata props change.
             * */
            'runOnUpdate'(newVal) {
                try {
                    this.isInProg = true;
                    let data = newVal;
                    // if use local copy, deep copy the tabledata prop
                    if (this.useLocalCopy) {
                        data = _.cloneDeep(data);
                    }
                    //if user not specify unique key, create custom unique key
                    if (this.uniqueColumn === '__uniqueId__') {
                        data.forEach((val, index) => {
                            Object.defineProperty(data[index], this.uniqueColumn, {
                                enumerable: false,
                                writable: false,
                                value: index
                            });
                        });
                    }
                    this.tableDataLocal = data;
                    this.tableDataChange = data;
                    this.tableFilterProp.totalRootChange++;
                    // this.tableFilterProp.totalChange++;
                    //create a tabledatalocalonlyid array
                    let objArr = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].hasOwnProperty(this.uniqueColumn)) {
                            let newObj = {};
                            Object.defineProperty(newObj, this.uniqueColumn, {
                                enumerable: false,
                                writable: false,
                                value: data[i][this.uniqueColumn]
                            });
                            objArr.push(newObj);
                        }
                        else {
                            console.warn("no property '" + this.uniqueColumn + "' for tableData at row number " + (i + 1) + ". this may result unexpected behaviour of the functioning table.");
                        }
                    }
                    data.forEach((val, index) => {
                        let newObj = {};
                        Object.defineProperty(newObj, this.uniqueColumn, {
                            enumerable: false,
                            writable: false,
                            value: val[this.uniqueColumn]
                        });
                        objArr.push(newObj);
                    });
                    this.tableDataLocalOnlyId = _.clone(objArr);
                    // here some initializing
                    for (let prop in this.tableFilterProp.filterText) {
                        this.tableFilterProp.filterText[prop].filteredData = [];
                    }
                    for (let prop in this.tableFilterProp.filterDate) {
                        this.tableFilterProp.filterDate[prop].filteredData = [];
                    }
                    //create first uniquefilter
                    this.createUniqueFilter();

                    if (_.isEmpty(this.tableFilterProp.filterText)) {
                        this.filterTextFunc('', true);
                    }
                    else {
                        for (let o in this.tableFilterProp.filterText) {
                            this.filterTextFunc(o, true);
                        }
                    }
                    if (_.isEmpty(this.tableFilterProp.filterDate)) {
                        // local[uniqueKey + 'filterDateFunc']('');
                    }
                    else {
                        for (let o in this.tableFilterProp.filterDate) {
                            this.filterDateFunc(o);
                        }
                    }
                    if (_.isEmpty(this.tableFilterProp.filterCheckBox)) {
                        //local[uniqueKey + 'filterCheckBoxFunc'](null);
                    }
                    else {
                        for (let o in this.tableFilterProp.filterCheckBox) {
                            this.filterCheckBoxFunc(o);
                        }
                    }
                }
                catch (e) { console.error(e) }
                finally {
                    this.isInProg = false;
                }
            },
            'testMethod'(x) { alert(x); }
        },
        watch: {
            'tableData': {
                'handler': function (newVal, oldVal) {
                    //if (!_.isEqual(newVal, oldVal)) {
                    this.runOnUpdate(newVal);
                    //   }
                },
                'deep': true,
                //'immediate':true
            }
        },
        computed: {
            'sortedItem'() {
                let returner = [];
                try {
                    this.isInProg = true;
                    if (this.tableFilterProp.totalChange !== this.oldTableFilterProp.totalChange) {
                        if (this.tableFilterProp.totalChange === 1) {
                            this.orderedItems = _.orderBy(this.tableDataChange, [this.defaultSorter].concat(this.tableFilterProp.sorter.key), [this.defaultOrder].concat(this.tableFilterProp.sorter.sort));
                            //  this.orderedItems = _.orderBy(this.orderedItems, this.tableFilterProp.sorter.key, this.tableFilterProp.sorter.sort);
                        }
                        else {
                            this.orderedItems = _.orderBy(this.tableDataChange, this.tableFilterProp.sorter.key, this.tableFilterProp.sorter.sort);
                        }
                        this.oldTableFilterProp.totalChange = this.tableFilterProp.totalChange;
                        this.oldTableFilterProp.totalRootChange = this.tableFilterProp.totalRootChange;
                    }
                    returner = _.filter(this.orderedItems, (o, index) => {
                        if (index >= this.limitDown && index < (this.limitDown + this.tableFilterProp.itemPerPage)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    // returner = local.limitBy(local[uniqueKey + 'orderedItems'], local[uniqueKey + 'tableFilterProp'].itemPerPage, local[uniqueKey + 'limitDown']);
                }
                finally { this.isInProg = false; }
                return returner;
            },
            'limitDown'() {
                let newVal;
                try {
                    this.isInProg = true;
                    if (this.tableFilterProp.currentPage === 1) {
                        newVal = 0;
                    }
                    else {
                        newVal = (this.tableFilterProp.currentPage - 1) * this.tableFilterProp.itemPerPage;
                        //local[uniqueKey + 'tableFilterProp']['limitDown'] = newVal;
                    }
                }
                finally { this.isInProg = false; }
                return newVal;
            },
        },
        template: `
<div>
<slot :filterDateInput='filterDateInput'  :triggerDateInput='triggerDateInput' :tableDataChange = "tableDataChange" :tableFilterProp='tableFilterProp' :sortItem='sortItem' :textFilter='textFilter' :filterTextFunc='filterTextFunc' :dateFilter='dateFilter' :filterDateFunc='filterDateFunc'
 :filterCheckBoxFunc='filterCheckBoxFunc' :filterCheckBoxCheckAllFunc='filterCheckBoxCheckAllFunc' :filtercheckBoxAlterCheckAll='filtercheckBoxAlterCheckAll' :checkBoxFilter='checkBoxFilter' :sortedItem = 'sortedItem'></slot>
</div>
`
    }
    /**
     * custom component for select2
     * */
    static __select2 = {
        props: {
            "multiple": {
                "type": Boolean,
                "default": false
            },
            "data": {
                "type": Array,
                "default"() {
                    return [];
                }
            },
            "options": {
                "type": Object,
                "default"() {
                    return {};
                }
            },
            "value": {
            },
        },
        data() {
            return {
                "innerData": {},
            }
        },
        mounted: function () {
            let opt = {};
            opt = _.cloneDeep(this.options);
            opt["data"] = this.data;
            var vm = this;
            $(this.$el)
                // init select2
                .select2(opt)
                .val(this.value.id)
                .trigger("change")
                // emit event on change.
                .on("change", function () {
                    //first get the id selected, the get the object with the id.
                    let id = this.value;
                    let currentData = _.find(vm.data, function (o) { return o.id == id });
                    vm.$emit("input", currentData);
                });
        },
        computed: {
            "localOptions": function () {
                let option = {};
                option = _.cloneDeep(this.options);
                option["data"] = this.data;
                return option;
            }
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el).val(value.id).trigger("change");
                this.$emit("on-change-select");
            },
            data: function (data) {
                // update data
                let opt = {};
                opt = _.cloneDeep(this.options);
                opt["data"] = data;
                $(this.$el).empty().select2(opt);
            },
            options: function (options) {
                // update data
                let opt = {};
                opt = _.cloneDeep(options);
                opt["data"] = this.data;
                $(this.$el).empty().select2(opt);
            }
        },
        destroyed: function () {
            $(this.$el).off().select2("destroy");
        },
        template: `
<select :multiple="multiple">
            <slot></slot>
        </select>
`,
    }

}

