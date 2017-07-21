# KonamiCode-JavaScript
A simple implementation of the Konami code in JavaScript. Easy to copy-pasta to your existing codebase to add a little nostalgia.

## Usage
Simply add KonamiCode.js to your project - or use a fancy module loader to include it - and initialise the script with an options object. The options object must contain at least an "element" key in order for the event listener to be attached. The callback functions are entirely optional, although the script would be useless without them.  
  
Callback functions are limited to `onSuccess`, and `onError`. The names are pretty self-explanatory, and the content of those functions is entirely up to you. I suggest to include both callbacks so that you can also notify the user of incorrect inputs when they have started (and incorrectly finished) the Konami code sequence.

## License
This project is licensed under the MIT License. You can find a copy of the license [here](https://github.com/CytoDev/KonamiCode-JavaScript/blob/master/LICENSE).

## Contributing
You are more than welcome to submit issues as well as feature requests or just a 'how-ya-doin' in the [issue tracker](https://github.com/CytoDev/KonamiCode-JavaScript/issues/new). Contributing to the project can be done by forking it and submitting a pull request once it's all tested and tidy.
