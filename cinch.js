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

    function theValidator(input) {
        if (input.type == "email" && !validateEmail(input.value)) {
            ops.errorFunction(input)
        } else if (input.type == "tel" && !validatePhone(input.value)) {
            ops.errorFunction(input)
        } else if (input.classList.contains('validateNumber') && !validateNumber(input.value)) {
            ops.errorFunction(input)
        } else if (input.classList.contains('validateLetter') && !validateLetter(input.value)) {
            ops.errorFunction(input)
        } else if (input.value == "") {
            ops.errorFunction(input)
        } else {
            Valid(input)
        }
    }

    function Error(input) {
        input.style.border = "1px solid red"
    }

    function Valid(input) {
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