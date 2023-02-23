// ==UserScript==
// @name         RS-Auto-Log
// @namespace    https://github.com/Pixelbays/Repairshopr-Logout-TamperMonkey
// @version      0.3.0
// @description  Auto Logs out of RepairShopr After 10 minutes
// @author       HeruEdhel@Pixelbays
// @include      https://*.repairshopr.com/*
// @exclude      https://*.repairshopr.com/users/sign_in*
// @updateURL    https://raw.githubusercontent.com/Pixelbays/Repairshopr-Logout-TamperMonkey/main/RS-Auto-Log
// @downloadURL  https://raw.githubusercontent.com/Pixelbays/Repairshopr-Logout-TamperMonkey/main/RS-Auto-Log
// @icon         https://www.google.com/s2/favicons?sz=64&domain=repairshopr.com
// @supportURL   https://github.com/Pixelbays/Repairshopr-Logout-TamperMonkey/issues
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
(function() {
    // Set the time (in milliseconds) after which inactivity will be detected
    var inactivityTime = 600000; // 10 minutes
    // You can set the time to what ever you want, I have by default set 10 minutes. Below are examples.
    // 600000; // 10 minutes
    // 1000; // 1 sec
    // 10000; // 10 secs
    var executed = false
    // Set the function to be executed when inactivity is detected
    function inactivityDetected() {
        if (!executed){
            lockScreenAndPinSwitch();
            alert("Inactivity detected!");
            executed = true
        }
    }

    // Reset the timer whenever the user interacts with the page
    document.addEventListener("click", function() {
        // Store the current time in a variable
        var currentTime = new Date().getTime();
        // Set the current time as the last active time for this tab
        GM_setValue("lastActiveTime", currentTime);
        executed = false
    });

    // Set a timer to detect inactivity for each tab
    setInterval(function() {
        // Get the last active time for this tab
        var lastActiveTime = GM_getValue("lastActiveTime", 0);
        // Get the current time
        var currentTime = new Date().getTime();
        // Calculate the time difference between the last active time and the current time
        var timeDiff = currentTime - lastActiveTime;
        // If the time difference is greater than the inactivity time, call the inactivityDetected function
        if (timeDiff > inactivityTime) {
            inactivityDetected();
        }
    }, 1000);
})();
