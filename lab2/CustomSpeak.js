(function (window) {
    var speakWord = "Bonjour";
    var customSpeaker = {};

    customSpeaker.speak = function (name) {
        console.log("Last letter must be a vowels: " + speakWord + " " + name);
    };

    window.customSpeaker = customSpeaker;
})(window);
