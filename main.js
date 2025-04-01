const captchas = ["lIl1I1IlI", "QqOo0oO0", "rnrmnmrnm"];
const captchaFonts = ["monospace", "sans-serif", "cursive"]

let currentStep = 0;
let timeLeft = 120;
const input = $("#captchaInput");
const text = $("#captchaText");
const stepNum = $("#stepNum");
const countdown = $("#countdown");
const spinner = $("#spinner");
const button = $("#btn-verify");

$(function() {
    const lang = getLanguageCode();

    if (lang === 1) {
        title = "Authentifizierung";
        subtitle = "Sie müssen sich zuerst authentifizieren";
        step = "Schritt";
        captchaInput = "Geben Sie hier den Captcha ein";
        verify = "Überprüfen";
        time = "Verbleibende Zeit";
        seconds = "Sekunden";
    }
    else {
        title = "Authentication";
        subtitle = "You need to authenticate";
        step = "Step";
        captchaInput = "Enter captcha here";
        verify = "Verify";
        time = "Time left";
        seconds = "seconds";
    }

    $("#title").text(title);
    $("#subtitle").text(subtitle);
    $("#step").text(step);
    $("#captchaInput").attr("placeholder", captchaInput);
    $("#btn-verify").text(verify);
    $("#time").text(time);
    $("#seconds").text(seconds);

    // Start the timer
    const timer = setInterval(() => {
        timeLeft--;

        countdown.text(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log( "too slow" );
            input.disabled = true;
        }
    }, 1000);
});

function getLanguageCode() {
    const lang = navigator.language || navigator.userLanguage;
    const shortLang = lang.slice(0, 2).toLowerCase();

    if (shortLang === 'de') {
        return 1;
    } else {
        return 2;
    }
}

function checkCaptcha() {
    const value = input.val();

    if (value === captchas[currentStep]) {
        currentStep++;

        if (currentStep < captchas.length) {
            text.text(captchas[currentStep]);
            text.css("font-family", captchaFonts[currentStep]);
            stepNum.text(currentStep + 1);

            input.val("");
        } else {
            showLoadingThenRickroll();
        }
    } else {
        location.href = "fail/index.html"
    }
}

function showLoadingThenRickroll() {
    input.hide();
    button.hide();
    spinner.show();

    
    setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 4000);
}