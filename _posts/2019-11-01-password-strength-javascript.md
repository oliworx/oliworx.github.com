---
layout: post
title: "Check password strength with vanilla JavaScript and HTML5"
tags: javascript password html5 security
---
Weak passwords are bad and a real danger.
So we should encourage our users to use stronger passwords
for their online accounts.

Therefore nowadays it is state of the art to give the user
instant feedback about the password quality,
e.g. on a registration form or a change-password form.

There are great out-of-the-box solutions to tackle this task, like
 * [zxcvbn](https://github.com/dropbox/zxcvbn) or [zxcvbn-german](https://github.com/devatrox/zxcvbn-german)
 * [password-strength-meter](https://www.npmjs.com/package/password-strength-meter) plugin for jQuery
 * [pwstrength-bootstrap](https://www.npmjs.com/package/pwstrength-bootstrap) for Bootstrap

These packages can even check against known password lists and dictionaries.
But on the downside they will add some additional 100kB to the javascript code or even require frameworks
like jQuery or Bootstrap.

For my use case this would be too much.
I don't want to bother users with restrictive and complicated password rules.
I just want to give a quick feedback about the password strength, based on a few simple rules.
So I implemented my own very basic password strength indicator.

Given, we have an html form with a password input:
```html
<input type="password" id="pwd" placeholder="enter password">
```

We now add a HTML5 progress bar to be used as a password strength indicator:
```html
<progress id="strength" value="0" max="5"></progress>
```
Each of these elements have an id, so we can easily address it later via JavaScript.

Of course, now we also need a JavaScript function to evaluate the password,
it should get the password string as a parameter and return a numeric value
as a measure for the password strength.

```javascript
function passwordStrength(pw) {
  return /.{8,}/.test(pw) * (  /* at least 8 characters */
    /.{12,}/.test(pw)          /* bonus if longer */
    + /[a-z]/.test(pw)         /* a lower letter */
    + /[A-Z]/.test(pw)         /* a upper letter */
    + /\d/.test(pw)            /* a digit */
    + /[^A-Za-z0-9]/.test(pw)  /* a special character */
   )
}
```
In this function we check the password input against some regular expressions using the `test()`
method and then treating the boolean return value as a number (0 or 1).

To get the top score of 5 a password must be at least 12 characters long and must have numbers,
upper and lower letters and other special characters. Passwords shorter than 8 characters are
considered insecure and will get a rating of 0.

Finally we just need some magic glue to connect all the bits and pieces properly.
We want to evaluate the password whenever a key is pressed in the password input field
and update the password strength indicator immediately:

```javascript
let pwInput = document.getElementById("pwd")

pwInput.addEventListener('keyup', function() { 
 document.getElementById("strength").value = passwordStrength(pwInput.value)
})
```

Just [have a try](https://output.jsbin.com/malopev/) or
[see and edit the full source code](https://jsbin.com/malopev/edit?html,js,output) at jsbin.com.

Feel free to modify the password rules to your needs, add your own rules or some textual output to the user interface.
