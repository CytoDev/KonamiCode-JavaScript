# KonamiCode-JavaScript
A simple implementation of the Konami code in JavaScript. Easy to copy-pasta to your existing codebase to add a little nostalgia.

## Usage
To start using this small snippet you need to call `konami.init()` to attach the listeners. Since this is a web based JavaScript file, and since I have little knowledge of desktop JavaScript API's this file uses the `document.addEventListener` method to attach itself. If that doesn't work for you, you only need to change [line 96](https://github.com/CytoDev/KonamiCode-JavaScript/blob/master/src/konamicode.js#L96) to get it to attach.

## Note
This is a simple script that needs your input to become awesome. This code only listenes to the input and calls `passed` or `reset` based on the sequence the user inputs.

## License
This project is licensed under the MIT License. You can find a copy of the license [here](https://github.com/CytoDev/KonamiCode-JavaScript/blob/master/LICENSE).

## Contributing
You are more than welcome to submit issues as well as feature requests or just a 'how-ya-doin' in the [issue tracker](https://github.com/CytoDev/KonamiCode-JavaScript/issues/new). Contributing to the project can be done by forking it and submitting a pull request once it's all tested and tidy.
