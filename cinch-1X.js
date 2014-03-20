(function($){
    $.fn.cinch = function(options){
        cinch = 'Your form is happily using Cinch "1.3 Habergeon"';
        var error = function($this){
            $this.css('border-color','red');
            if($this.attr('type') == 'radio'){
               $this.css('outline','1px solid red'); 
            }
        }
        var success = function($this){
            $this.css('border-color','green');
            if($this.attr('type') == 'radio'){
               $this.css('outline','1px solid green'); 
            }
        }
        function validateEmail($e) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test($e);   
        }
        function validatePhone($p) { 
            var re =  /^(?:\+?[0-9]?[0-9]?[0-9][-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return re.test($p);
        }
        function validateNumber($n) { 
            var re =  /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
            return re.test($n);
        }
        var opts = $.extend({ 
            error: error, 
            success: success, 
            button:'.next',
            pickAll: true,
            mobile: false
        },options );

        if(opts.pickAll == true){
            var findThis = 'input:visible:not(.next,[type=hidden],[type=button],.skipM),select:visible:not(.next,[type=hidden],[type=button],.skipM)'
        }else{
            var findThis = '.dome:not(.next,[type=hidden],[type=button],.skipM)'
        }

        $(this).find(findThis).live('change blur', function () {

            normVal($(this));
        });
        $(this).find(opts.button).live('click',function(){
            $(this).parents('fieldset').find(findThis).each(function(){
                normVal($(this))
                return checkLength($(this));
            })
        });
        $('input[type=submit]').click(function(){
            $(this).parents('form').find(findThis).each(function(){
                normVal($(this))
                if(opts.mobile == true){
                    return checkLength($(this));
                }  
            });
                if($('.hasError').length >0){
                    return false;
                }
         });
        function checkLength($this){
            if($this.hasClass('hasError')){
                return false;
            }
        }
        function normVal($this, fSet) {
            function changeToError($this){
                $this.removeClass('hasSuccess');
                $this.addClass('hasError');
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
            } else if($this.attr('type') == 'radio' && $this.is(':not(:checked)')){
                changeToError($this)
            }else {
                $this.removeClass('hasError');
                $this.addClass('hasSuccess');
                opts.success($this)
            }
        }
    }
})(jQuery);