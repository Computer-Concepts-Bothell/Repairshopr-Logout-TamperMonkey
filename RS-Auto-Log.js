// ==UserScript==
// @name         RS-Auto-Log
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto Logs out of RepairShopr After 10 minutes
// @author       HeruEdhel@Pixelbays
// @include      https://*.repairshopr.com/*
// @exclude      https://*.repairshopr.com/users/sign_in?*
// @updateURL    https://raw.githubusercontent.com/Pixelbays/Repairshopr-Logout-TamperMonkey/main/RS-Auto-Log
// @downloadURL  https://raw.githubusercontent.com/Pixelbays/Repairshopr-Logout-TamperMonkey/main/RS-Auto-Log
// @icon         https://www.google.com/s2/favicons?sz=64&domain=repairshopr.com
// @supportURL   https://github.com/Pixelbays/Repairshopr-Logout-TamperMonkey/issues
// @grant        none
// ==/UserScript==

(function() {
    // Set the time (in milliseconds) after which inactivity will be detected
    var inactivityTime = 600000; // 10 minutes
    // You can set the time to what ever you want, I have by default set 10 minutes. Below are examples.
    // 600000; // 10 minutes
    // 1000; // 1 sec
    // 10000; // 10 secs
    // Set the function to be executed when inactivity is detected
    function inactivityDetected() {
      lockScreenAndPinSwitch()
      alert("Inactivity detected!");
    }

    // Set a timer to detect inactivity
    var inactivityTimer = setTimeout(inactivityDetected, inactivityTime);

    // Reset the timer whenever the user interacts with the page
    document.addEventListener("click", function() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(inactivityDetected, inactivityTime);
    });

})();
