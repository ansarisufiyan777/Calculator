"use strict";
document.addEventListener("DOMContentLoaded", function (event) {
    // Your code to run since DOM is loaded and ready


    var ex = document.getElementById('ex'), // input
        result = document.getElementById('res'), // output`
        number = document.getElementsByClassName('number'), // number buttons
        operator = document.getElementsByClassName('operators'), // operator buttons
        result = document.getElementById('result'), // equal button
        clear = document.getElementById('clear'), // clear button
        history = document.getElementById('history'), // history button
        deletebtn = document.getElementById('delete'), // delete button
        theme = document.getElementById('theme'), // theme button
        info = document.getElementById('info'), // info button
        calc_screen = document.getElementById('calc_screen'), // info button
        history_screen = document.getElementById('calc_history'), // histor button
        hideDialog = document.getElementById('hideDialog'), // histor button
        resultDisplayed = false, // flag to keep an eye on what output is displayed
        isBlack = false, // flag to keep an eye on theme
        isHistoryEnabled = false, // flag to keep an eye on history
        backgroundImages = [
            "http://sfwallpaper.com/images/black-background-hd-wallpapers-9.jpg",
            "https://w-dog.net/wallpapers/10/19/346843697827766.jpg",
            "https://www.pixelstalk.net/wp-content/uploads/2015/12/Cool-wodden-wall-graffiti-hd-wallpaper.jpg"
        ]; // flag to keep an eye on history

    // adding click handlers to number buttons
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function (e) {

            // storing current input string and its last character in variables - used later
            var currentString = ex.innerHTML;
            var lastChar = currentString[currentString.length - 1];

            // if result is not diplayed, just keep adding
            if (resultDisplayed === false) {
                ex.innerHTML += e.target.innerHTML.trim();
            } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                // if result is currently displayed and user pressed an operator
                // we need to keep on adding to the string for next operation
                resultDisplayed = false;
                ex.innerHTML += e.target.innerHTML;
            } else {
                // if result is currently displayed and user pressed a number
                // we need clear the input string and add the new input to start the new opration
                resultDisplayed = false;
                ex.innerHTML = "";
                res.innerHTML = "";
                ex.innerHTML += e.target.innerHTML;
            }

        });
    }

    // adding click handlers to number buttons
    for (var i = 0; i < operator.length; i++) {
        operator[i].addEventListener("click", function (e) {

            // storing current input string and its last character in variables - used later
            var currentString = ex.innerHTML;
            var lastChar = currentString[currentString.length - 1];

            // if last character entered is an operator, replace it with the currently pressed one
            if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
                ex.innerHTML = newString;
            } else if (currentString.length == 0) {
                // if first key pressed is an opearator, don't do anything
                showInfo("enter a number first");
            } else {
                // else just add the operator pressed to the input
                ex.innerHTML += e.target.innerHTML.trim();
            }
        });
    }

    // on click of 'history' button
    history.addEventListener("click", function () {
        if (localStorage && Object.keys(localStorage).length) {
            isHistoryEnabled = false;
            let data = "";
            if (!isHistoryEnabled) {
                data += `<div class='back_to_main' id='back_to_main'>
                <i
                class="fa fa-arrow-circle-left"
                aria-hidden="true"
                ></i>
                </div><div class="history_data">`
                for (let key of Object.keys(localStorage)) {

                    data += `
                    <div class="">
                        <div class="expression">
                            ${key}
                        </div>
                        <div class="result">
                            ${localStorage[key]}
                        </div>
                    </div>
                    `
                }
                data += "</div>"
                history_screen.style.display = "block";
                calc_screen.style.display = "none";
                history_screen.innerHTML = data;
                document.getElementById('back_to_main').addEventListener("click", () => {
                    calc_screen.style.display = "block";
                    history_screen.style.display = "none";
                })
            } else {
                calc_screen.style.display = "block";
                history_screen.style.display = "none";
            }
        }

    });
    // on click of 'theme' button
    theme.addEventListener("click", function () {
        if (isBlack) {
            showInfo("Theme changed to light")

            document.body.style.setProperty("--bg-color", "#5E8DEC");
            document.body.style.setProperty("--text-color", "#1b2b34");
            document.body.style.setProperty("--calc-header", "#EEF3FD");
            document.body.style.setProperty("--calc-bg", "#ffffff");
        } else {
            showInfo("Theme changed to dark")
            document.body.style.setProperty("--bg-color", "grey");
            document.body.style.setProperty("--text-color", "#FDFDFD");
            document.body.style.setProperty("--calc-header", "#71747a");
            document.body.style.setProperty("--calc-bg", "#a9a9a9");
        }
        isBlack = !isBlack;

    });
    // on click of 'info' button
    info.addEventListener("click", function () {
        document.getElementById("myDialog").showModal();
    });
    // on click of 'info' button
    hideDialog.addEventListener("click", function () {
        document.getElementById("myDialog").close();
    });

    // on click of 'delete' button
    deletebtn.addEventListener("click", function () {

        // We will slice 0ne last charecter from the string
        var inputString = ex.innerHTML;
        console.log(inputString);
        ex.innerHTML = inputString.slice(0, -1)
    });


    // on click of 'equal' button
    result.addEventListener("click", function () {

        try {
            // this is the string that we will be processing eg. -10+26+33-56*34/23
            var inputString = ex.innerHTML.trim().replace(/(?:\r\n|\r|\n)/g, '');;
            console.log(inputString);
            var result = eval(inputString);
            if (result) {
                if (result.toString().length > 12) {
                    showInfo("Out of memery error")
                } else {
                    res.innerHTML = result.toLocaleString();  // displaying the output
                    localStorage.setItem(inputString, result);
                    resultDisplayed = true; // turning flag if result is displayed
                }

            } else {
                showInfo("Please eneter an expression")
            }

        } catch (e) {
            showInfo(e)
        }
    });

    // clearing the input on press of clear
    clear.addEventListener("click", function () {
        ex.innerHTML = "";
        res.innerHTML = "";
    })

    function showInfo(message) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = message;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    setInterval(()=>{
        document.body.style.backgroundImage =`url(${backgroundImages[Math.floor(Math.random() * 3)]})`
    },10*1000)
});