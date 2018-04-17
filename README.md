# What is Cinch?
Cinch is a tiny client-side validation script written in jQuery.

## Why should I use Cinch?
Cinch was written with forms in mind. It was created to be light-weight and customizable. When compared to something like jQuery validate or validity, Cinch is much smaller in size and needs relatively little setup.



## Where can Cinch be used?

Cinch can be used with almost any form. It validates inputs selectboxes and checkboxes. It will automatically validate email and phone numbers if the correct type is used([type=email] for email and [type=tel] for phone numbers). It will also validate for numeric only fields. Everything else it validates to see if it is empty.



## Before using Cinch
Cinch is written with the assumption that most form fields are required by default, this can be changed using the pickAll option. Cinch also assumes your error messages will be related to the form field with the error, so having a box above the form with errors generally won't work. Cinch is made to use the best usablity standards when validating a form. Refer to the setting a custom error/success function section below to see error handling in action. If you have any issues refer to the troubleshooting section at the bottom of this page.

## Adding Cinch to a page
Add it to the header:
Include jQuery here.

<script src="LINK TO CINCH"></script>

Cinch requires jQuery and is made to work with most versions. If you can't tell if cinch has loaded then open up your developer console (F12). Type cinch and if cinch is loaded you should see a message.

Then below the form add this:
<script>

$('FORM ID or NAME or CLASS').cinch();
</script>



## Configuring Cinch

### Form setup
Make sure all fields are defined using their HTML5 types, for example: email is [type=email], telephone is [type=tel].

To define a field for numeric only validation add the class isNum

*To skip a field add the class skipM

Note: Cinch automatically skips hidden inputs and button.

* There is currently an issue when skipM is added using javascript. The workaround is to set PICKALL to false and specify your form fields with the required class.

### Cinch Options

#### Setting a custom error/success function
Create your error/success function:
var errorMess = function($this){
//$this is the form field that was just validated 

//what your error function does
 

}

var successMess = function($this){

//$this is the form field that was just validated 

//what your success function does

}

#### Use your function in cinch:
$('form').cinch({error:errorMess,success:successMess});

 
#### Custom next button to call cinch (Multi-step forms)
$('form').cinch({button:'.nextBtn'})
 
#### Tell cinch if it should validate all form elements or just the ones you specify with the REQUIRED class
$('form').cinch({pickAll:true}) this validates all
$('form').cinch({pickAll:false}) this validates only REQUIRED class


#### Cinch can be set for mobile validation
$('form').cinch({mobile:true}) if true this will validate one item at a time.


#### Cinch can skip validation on next buttons
$('form').cinch({onlySubmit:true})


#### Cinch can stop after the first error (similar to mobile but for desktop)
$('form').cinch({checkFirst:true})
         

## Troubleshooting
To make sure cinch is running on a page open up the developer tools (normally this is done using the F12 key) then type cinch in the console and run that. If cinch was included and run without any problems you should get an output saying the cinch version your using.

If you are having trouble with dynamically adding skipM to a form field try setting pickAll to false then adding and removing the required class from form fields.

If cinch isn't loading make sure jQuery is included on the page and is included higher or before cinch.

If cinch still isn't loading make sure your running cinch and that you are running it after your form.

If that still doesn't work make sure your running cinch on your form by using either the name, class, or id of the form.
