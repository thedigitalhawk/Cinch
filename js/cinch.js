(function () { 
    this.Cinch = function () {

        var defaults = {
            trigger: '.next',
            form: "",
            errorFunction: Error,
            validFunction: Valid,
            debug: true
        }
        errorCount=0;

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        ops = this.options
        theForm = ops.form

        this.reinit = function () {
            //Set this up as an array so we can use filter
            theInputs = [].slice.call(theForm.querySelectorAll('*:not(.skipM):not([type=button]):not([type=submit])'));
            theInputs = theInputs.filter(function (element) {
                return element.offsetWidth > 0 &&
                    element.offsetHeight > 0 &&
                    element.tagName == 'INPUT' ||
                    element.tagName == 'SELECT' ||
                    element.tagName == 'TEXTAREA'
            })

            if (ops.debug == true) {
                console.groupCollapsed('%cCINCH %c(Expand for more details)', "background: #27ae60; font-size: 12px;padding:3px;line-height:36px;color:#fff;", "background: #000; font-size: 12px;padding:3px;line-height:36px;color:#fff;")
                console.log('Version 3.0.1')
                console.log('Developed by thedigitalhawk')
                console.log('Documentation/Change Log: https://github.com/thedigitalhawk/Cinch')
                console.groupCollapsed('Form Found')
                console.log(ops.form)
                console.groupEnd();
                console.groupCollapsed('Elements Found')
                console.log(theInputs)
                console.groupEnd();
                console.groupCollapsed('Options Loaded')
                console.log(ops)
                console.groupEnd();
                console.groupEnd();
            }

            for (var i = 0; i < theInputs.length; i++) {
                theInputs[i].removeEventListener('blur', function () {
                    theValidator(this)
                });
                theInputs[i].addEventListener('blur', function () {
                    theValidator(this)
                });
            }

        }
        this.reinit()

        var triggerButton = document.querySelector(this.options.trigger);
        if(triggerButton != null){
            triggerButton.addEventListener('click', function () {
                Cinch.validate();
            });
        }

        var submitButton = document.querySelector('[type=submit]');
        theForm.onsubmit=function()
            { 
                Cinch.validate();
          if(errorCount > 0){
            return false;
          }
             
            }
        // submitButton.addEventListener('click', function () {
        //     return false;
        // });

    }
    Cinch.prototype.validate = function (defaults) {
        errorCount=0
        for (var i = 0; i < theInputs.length; i++) {
            theValidator(theInputs[i])
        }
      
    }

    function theValidator(el) {
        if (el.type == "email" && !validateEmail(el.value)) {
            preError(el)
        } else if (el.type == "tel" && !validatePhone(el.value)) {
            preError(el)
        } else if (el.classList.contains('validateNumber') && !validateNumber(el.value)) {
            preError(el)
        } else if (el.classList.contains('validateLetter') && !validateLetter(el.value)) {
            preError(el)
        } else if (el.value == "") {
            preError(el)
        } else {
            preValid(el)
        }
    }

    function preError(el) {
        el.setAttribute("aria-invalid", "true")
        ops.errorFunction(el)
        errorCount++;
    }

    function preValid(el) {
        el.setAttribute("aria-invalid", "false")
        ops.validFunction(el)
    }

    function Error(el) {
        el.style.border = "1px solid red"
    }

    function Valid(el) {
        el.style.border = "1px solid green"
    }

    function validateEmail($e) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test($e);
    }

    function validatePhone($p) {
        var re = /^(?:\+?[0-9]?[0-9]?[0-9][-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return re.test($p);
    }

    function validateNumber($n) {
        var re = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
        return re.test($n);
    }

    function validateLetter($l) {
        var re = /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/;
        return re.test($l);
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());