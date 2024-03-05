function mainFoo() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var firstLetter = name.charAt(0).toLowerCase();
    var lastLetter = name.charAt(name.length - 1).toLowerCase();

    var vowels = ["a", "e", "i", "o", "u"];

    if (firstLetter === "j") {
      byeSpeaker.speak(name);
    } else if (vowels.includes(lastLetter)) {
      customSpeaker.speak(name);
    }
    else {
      helloSpeaker.speak(name);
    }

  }
};
mainFoo();