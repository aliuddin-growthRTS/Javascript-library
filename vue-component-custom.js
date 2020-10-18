/**
 * to use this, please has element-ui for vue2 installed. also install lodash.
 * also include the mainFunction.js
 * */


class vueCustomComponent {

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
            "insertElement"() {
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
                            if (mainFunctionCustom.__notOnlywhiteSpace(evt.target.value)) {
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
@mousedown="inputNow.isMouse=true" @focus="insertElement()" @dblclick="insertElement()" v-text='value'>
</div>
`
    }
    /**
     * component that will generate the functionallity for the table like filter, sort and so on.
     * */
    static __tableFunction = {
        mounted() {
            this.runOnMount();
        },
        props: {
            'tableData': { // the data to show in table
                'type': Array,
                'default'() { return []; }
            },
            'defaulSorter': { //the key that will be the default sorter when the table first time load
                'type': String,
                'default': ""
            },
            'filterTextKeys': { //key name list that will have filter text functionallity
                'type': Array,
                'default'() { return []; }
            },
            'filterDateKeys': { //key name list that will have filter date functionallity 
                'type': Array,
                'default'() { return []; }
            },
            'filterCheckboxKeys': {//key name list that will have filter checkbox functionallity
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
            }
        },
        methods: {
            'runOnMount'() {
                let filterTextProp = {}; let textFilterProp = {};
                this.filterTextKeys.forEach(function (val, index) {
                    filterTextProp[val] = { 'filterText': '' };
                    textFilterProp[val] = { 'filterText': '' };
                });
                let filterDateProp = {};
                this.filterDateKeys.forEach(function (val, index) {
                    filterDateProp[val] = {};
                });
                let filterCheckBoxProp = {}; let filterCheckBoxProp2 = {};
                this.filterCheckBoxKeys.forEach(function (val, index) {
                    filterCheckBoxProp[val] = {};
                    filterCheckBoxProp2[val] = { "isCheckAll": true, "checkList": [] };
                });
                let sorterProp = { "key": sorterKeys, "sort": [] };
                this.sorterKeys.forEach(function (val, index) {
                    sorterProp["sort"].push("asc");
                });
                this.tableFilterProp = {
                    'totalRootChange': 0 /* total change of the root*/, 'totalChange': 0/*how many times filter is used*/, "prop": this.defaultSorter,
                    "limitDown": 0/*the index row start to show in the table*/, "itemPerPage": this.rowPerPage, "currentPage": 1/*the current page*/, 'filterText': _.cloneDeep(filterTextProp)/*stored the previous filter text details*/,
                    "filterDate": _.cloneDeep(filterDateProp)/*stored the previous filter date details*/, "filterCheckBox": _.cloneDeep(filterCheckBoxProp)/*stored the previous filter checkbox details*/,
                    "sorter": _.cloneDeep(filterSorterProp)/*stored the previous filter sort details*/
                };
                this.oldTableFilterProp = {
                    'totalRootChange': 0, 'totalChange': 0, "prop": null,
                    "limitDown": 0, "itemPerPage": this.rowPerPage, "currentPage": 1, 'filterText': _.cloneDeep(filterTextProp),
                    "filterDate": _.cloneDeep(filterDateProp), "filterCheckBox": _.cloneDeep(filterCheckBoxProp),
                    "sorter": _.cloneDeep(filterSorterProp)
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
                    this.totalChange++;
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
                    inData = _.clone(this.tableDataLocal);
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
                                        return o[prop] === textN;
                                    });
                                }
                                //differentiate with the tableDataLocal that have only id, where only different data will be taken
                                let outData = _.differenceBy(this.tableDataLocalOnlyId, inData, this.uniqueColumn);
                                //stored the id for unselected row
                                this.tableFilterProp.filterText[prop].filteredData = outData;
                                // then take the real needed rows
                                //for filterText
                                for (let inKey in local[uniqueKey + 'tableFilterProp']["filterText"]) {
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
                            maxDate = this.dateFilter[key].endDate;
                            maxDate.setDate(maxDate.getDate() + 1); //add 1day, because we will user '<' operator. so the maxdate must be included
                        }
                        //return only data that will satisfy the condition
                        inData = _.filter(this.tableDataLocal, (o) => {
                            let yes = false;
                            try {
                                if (o[key] >= minDate && o[key] < maxDate) {
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
            'testMethod'(x) { alert(x); }
        },
        computed: {
            'sortedItem'() {
                let returner = [];
                returner = this.tableData;
                return returner;
            }
        },
        template: `
<div>
<slot :sortedItem = "sortedItem"></slot>
</div>
`
    }
}

