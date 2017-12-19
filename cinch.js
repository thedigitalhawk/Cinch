(function () {

    // Define our constructor 
    this.Cinch = function () {

        // Define option defaults 
        var defaults = {
            trigger: '.next',
            form: "",
            errorFunction: Error,
            validFunction: Valid
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        ops = this.options
        theForm = ops.form
        //set this up as an array so we can use filter
        theInputs = [].slice.call(theForm.children);
        //filter out hidden elements
        theInputs = theInputs.filter(function (element) {
            return element.offsetWidth > 0 &&
                element.offsetHeight > 0 &&
                element.tagName == 'INPUT' ||
                element.tagName == 'SELECT' ||
                element.tagName == 'TEXTAREA'
        })

        for (var i = 0; i < theInputs.length; i++) {
            theInputs[i].addEventListener('blur', function () {
                theValidator(this)
            });
        }

        var triggerButton = document.querySelector(this.options.trigger);
        triggerButton.addEventListener('click', function () {
            Cinch.validate();
        });

    }

    Cinch.prototype.validate = function (defaults) {
        
                for (var i = 0; i < theInputs.length; i++) {
                    theValidator(theInputs[i])
                }
            }

    // Public

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


    function preError(el){
        el.setAttribute("aria-invalid", "true")
        ops.errorFunction(el)
    }
    function preValid(el){
        el.setAttribute("aria-invalid", "false")
        ops.validFunction(el)
    }

    function Error(el) {
        input.style.border = "1px solid red"
    }

    function Valid(el) {
        input.style.border = "1px solid green"
    }

    //Validators
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