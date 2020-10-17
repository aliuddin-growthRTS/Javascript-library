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
}

