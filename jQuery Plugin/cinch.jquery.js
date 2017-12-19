(function($) {
    $.fn.cinch = function(options) {
if($(this).length > 0){
    
      
        $form = $(this);
        console.log('%cCINCH 2.9.1: %cFound a form with the selector: "'+$(this).selector+'"',"color: #000; background: #14d992; font-size: 12px;padding:10px;line-height:50px;","color: #fff; background: #000; font-size: 12px;padding:10px;line-height:50px;");
        console.log('%cCINCH 2.9.1: %cWas loaded with the following options:',"color: #000; background: #14d992; font-size: 12px;padding:10px;line-height:50px;","color: #fff; background: #000; font-size: 12px;padding:10px;line-height:50px;");
        console.log(options);
        var jqversion = jQuery.fn.jquery
        cinch = 'You are using Cinch 2.81 , if you need help please refer to the documentation: https://www.liberty.edu/media/1414/cinch/documentation.txt You are using jQuery-'+jqversion;

        var error = function($this) {
            $this.css('border-color', 'red');
            if ($this.attr('type') == 'radio') {
                $this.css('outline', '1px solid red');
            }
        }
        var success = function($this) {
            $this.css('border-color', 'green');
            if ($this.attr('type') == 'radio') {
                $this.css('outline', '1px solid green');
            }
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
        function validateDate($d) {
            createDate = new Date(dateElem.val());
            var noerror = true;
            // console.log(dateElem.attr('name')+' = '+dateElem.val());
            if(dateElem.val() == '' && dateElem.hasClass('skipM')){
                // dateElem.removeClass('hasError');
                // $('.error.'+dateElem.attr('name')).removeClass('active');
            } else {
                if(createDate != 'Invalid Date'){
                    // dateElem.removeClass('hasError');
                    // $('.error.'+dateElem.attr('name')).removeClass('active');
                } else {
                    // dateElem.addClass('hasError');
                    // $('.error.'+dateElem.attr('name')).addClass('active');
                    noerror=false;
                }
            }
            return noerror;
        }
        var opts = $.extend({
            error: error, //CUSTOM ERROR FUNCTION
            success: success, //CUSTOM SUCCESS FUNCTION
            button: '.next', //BUTTON USED TO CALL CINCH (TYPICALLY USED FOR MULTI-STEP FORMS)
            pickAll: true, //THIS CONTROLS IF CINCH LOOKS AT ALL FORM ELEMENTS OR JUST THOSE MARKED WITH THE 'REQUIRED' CLASS
            mobile: false, //THIS CHANGES THE SUBMIT FUNCTION TO ONLY VALIDATE THE TO THE FIRST ERROR
            onlySubmit: false, //THIS SKIPS THE NEXT BUTTONS
            checkFirst: false //THIS TELLS CINCH IF IT SHOULD STOP AFTER THE FIRST ERROR FOUND OR SHOW ALL WHEN THE SUBMIT BUTTON IS PRESSED
        }, options);

        if (opts.pickAll == true) {
            findThisNew = 'input, select, textarea'
            findThis = 'input:visible:not(.next,[type=hidden],[type=button],.skipM), select:visible:not(.next,[type=hidden],[type=button],.skipM), textarea:visible:not(.next,[type=hidden],[type=button],.skipM)'
        } else {
            findThis = '.required:not(.next,[type=hidden],[type=button],.skipM)'
        }


        if(jqversion < '1.7'){
            if (opts.onlySubmit == true) {
            $form.find(findThis).bind('change blur', function() {
                console.log('bind change blur')
                if ($(this).hasClass('hasError')) {
                    normVal($(this));
                }
            });
            } else {
               $form.find(findThis).bind('change blur', function() {
                   console.log('bind change blur')
                    normVal($(this));
                });
            }
            $form.find(opts.button).bind('click', function() {

                $('.hasError:hidden').removeClass('hasError');
                $(this).parents('fieldset').find(findThis).each(function() {
                    console.log('bind change blur')
                    normVal($(this))
                    if (opts.checkFirst == true) {
                        return checkLength($(this));
                    }
                })
            });
        }else{
            if (opts.onlySubmit == true) {
                $form.find(findThis).on('change blur', function() {
                    console.log('change blur')
                    if ($(this).hasClass('hasError')) {
                        normVal($(this));
                    }
                });
            } else {
               $form.find(findThisNew).not('.next,[type=hidden],[type=button],.skipM').on('change blur', function() {
                   console.log('change blur')
                    normVal($(this));
                });
            }
            $form.find(opts.button).on('click', function() {
                console.log('change blur button')
                $('.hasError:hidden').removeClass('hasError');
                $(this).parents('fieldset').find(findThis).each(function() {
                    normVal($(this))
                    if (opts.checkFirst == true) {
                        return checkLength($(this));
                    }
                })
            });
        }
        $form.find('[type=submit]').click(function() {
            console.log('CINCH:submit clicked')
            $('.hasError:hidden').removeClass('hasError');
            $form.find(findThis).each(function() {
                normVal($(this))
                if (opts.mobile == true) {
                    return checkLength($(this));
                }
            });
            if ($('.hasError').length > 0) {
                return false;
            }
        });

        function checkLength($this) {
            if ($this.hasClass('hasError')) {
                return false;
            }
        }

        // ALL HAIL normVal THE GREATEST OF ALL VALIDATION FUNCTIONS
        function normVal($this, fSet) {
            var $thisName = $this.attr('name');
            $thisName = '[name=' + $thisName + ']:checked'

            function changeToError($this) {
                $this.removeClass('hasSuccess');
                $this.addClass('hasError');
                $this.attr("aria-invalid", "true");
                opts.error($this);
            }
            if ($this.attr('type') == 'email' && !validateEmail($this.val())) {
                changeToError($this)
            } else if ($this.attr('type') == 'tel' && !validatePhone($this.val())) {
                changeToError($this)
            } else if ($this.val() == '' || $this.val() == $this.attr('placeholder')) {
                changeToError($this)
            } else if ($this.hasClass('isNum') && !validateNumber($this.val())) {
                changeToError($this)
            } else if ($this.hasClass('isLetter') && !validateLetter($this.val())) {
                changeToError($this)
            } else if ($this.attr('type') == 'radio' && typeof $($thisName).val() == 'undefined') {
                changeToError($this)
            } else if ($this.attr('type') == 'checkbox' && $($thisName).length == 0) {
                changeToError($this)
            } else if ($this.attr('type') == 'date' && !validateDate($this.val())) {
                changeToError($this)
            }else {
                $this.removeClass('hasError');
                $this.addClass('hasSuccess');
                $this.attr("aria-invalid", "false");
                opts.success($this)
            }
        }
    }else{
        console.log('%cCINCH 2.9: %cThe form specified as: "'+$(this).selector+'" does not exsist',"color: #000; background: #14d992; font-size: 12px;padding:10px;line-height:50px;","color: #fff; background: #000; font-size: 12px;padding:10px;line-height:50px;");
    }
        
    }
})(jQuery);
// N4800