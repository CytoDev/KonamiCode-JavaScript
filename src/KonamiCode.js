/**
 * KonamiCode.js
 *
 * A simple implementation of the Konami code in JavaScript. Easy to copy-pasta
 * into your existing codebase to add a little nostalgia.
 *
 * Usage:
 *   Simply add KonamiCode.js to your project - or use a fancy module loader to
 *   include it - and initialise the script with an options object. The options
 *   object must contain at least an "element" key in order for the event
 *   listener to be attached. The callback functions are entirely optional,
 *   although the script would be useless without them.
 *
 *   Callback functions are limited to onSuccess, and onError. The names are
 *   pretty self-explanatory, and the content of those functions is entirely up
 *   to you. I suggest to include both callbacks so that you can also notify the
 *   user of incorrect inputs when they have started (and incorrectly finished)
 *   the Konami code sequence.
 *
 * @author Roel Walraven <mail@cytodev.io>
 *
 * This file is licensed under The MIT License (MIT)
 *
 *   Copyright (c) 2016 Roel Walraven <mail@cytodev.io>
 *
 *   Permission  is hereby  granted, free  of  charge, to any person obtaining a
 *   copy of this software and associated documentation files  (the "Software"),
 *   to  deal in the Software without  restriction, including without limitation
 *   the  rights to use,  copy, modify,  merge, publish, distribute, sublicense,
 *   and/or  sell copies  of  the Software, and  to  permit  persons to whom the
 *   Software is furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included  in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY  KIND, EXPRESS OR
 *   IMPLIED,  INCLUDING BUT  NOT LIMITED TO THE  WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS  OR COPYRIGHT  HOLDERS BE  LIABLE FOR ANY  CLAIM, DAMAGES OR  OTHER
 *   LIABILITY, WHETHER  IN AN  ACTION OF  CONTRACT, TORT OR OTHERWISE,  ARISING
 *   FROM, OUT  OF  OR IN CONNECTION  WITH  THE  SOFTWARE  OR THE  USE  OR OTHER
 *   DEALINGS IN THE SOFTWARE.
 */

"use strict";

function KonamiCode() {
    this.code      = [38, 40, 37, 39, 66, 65];
    this.callbacks = {};
    this.sequence  = {
        up    : 0,
        down  : 0,
        left  : 0,
        right : 0,
        a     : 0,
        b     : 0
    };
    this.goal = {
        up    : 2,
        down  : 2,
        left  : 2,
        right : 2,
        a     : 1,
        b     : 1
    };

    /**
     * clear
     *   Resets the sequence variable to the initial values.
     */
    this.clear = function() {
        this.sequence = {up: 0, down: 0, left: 0, right: 0, a: 0, b: 0};
    };

    /**
     * passed
     *   Clears the sequence and calls the onSuccess callback.
     *
     *   Use the onSuccess callback to reward the user knowing the Konami code.
     */
    this.passed = function() {
        this.clear();
        this.callbacks.onSuccess();
    };

    /**
     * reset
     *   Clears the sequence and calls the onError callback.
     *
     *   Use the onError function to play a sound or do something to alert the
     *   user that you accept input of the Konami code.
     */
    this.reset = function() {
        this.clear();
        this.callbacks.onError();
    };

    /**
     * parse
     *   Evaluates the currently pressed key and its relation to the Konami
     *   sequence. If the current key is the correct key the sequence will
     *   continue along its path to onSuccess, else it will reset the sequence
     *   and call onError.
     *
     * @param {int} keyCode [Key code of the current key]
     */
    this.parse = function(keyCode) {
        switch(keyCode) {
            case 38:
                if(this.sequence.up < 2) {
                    this.sequence.up += 1;
                } else {
                    this.reset();
                }
                break;
            case 40:
                if(this.sequence.down < 2) {
                    this.sequence.down += 1;
                } else {
                    this.reset();
                }
                break;
            case 37:
                if(this.sequence.left === 0 && this.sequence.right === 0) {
                    this.sequence.left += 1;
                } else if(this.sequence.right == 1 && this.sequence.left == 1) {
                    this.sequence.left += 1;
                } else {
                    this.reset();
                }
                break;
            case 39:
                if(this.sequence.right === 0 && this.sequence.left === 1) {
                    this.sequence.right += 1;
                } else if(this.sequence.left === 2 && this.sequence.right === 1) {
                    this.sequence.right += 1;
                } else {
                    this.reset();
                }
                break;
            case 66:
                if(this.sequence.a === 0) {
                    this.sequence.a += 1;
                } else {
                    this.reset();
                }
                break;
            case 65:
                if(this.sequence.b === 0) {
                    this.sequence.b += 1;
                } else {
                    this.reset();
                }
                break;
        }

        if(JSON.stringify(this.sequence) === JSON.stringify(this.goal))
            this.passed();
    };

    /**
     * listen
     *   Passes the event's key code to parse if it's in the code array, else it
     *   clears the sequence.
     *
     * @param {object} event [keydown event]
     */
    this.listen = function(event) {
        if(this.code.indexOf(event.keyCode) >= 0) {
            this.parse(event.keyCode);
        } else {
            this.clear();
        }
    };

}

/**
 * initialise
 *   Initialises the script.
 *
 * @param {object} options [User defined options. This object must contain at
 *                          least an "element" key in order for the event
 *                          listener to be attached. The callback functions are
 *                          entirely optional, although the script would be
 *                          useless without them.]
 */
KonamiCode.prototype.init = function(options) {
    if(options === undefined || typeof options !== "object" || !(options.element && options.element.addEventListener))
        throw "KonamiCode.js requires an options object containing at least an element to attach to.";

    this.callbacks.onError   = "onError"   in options ? options.onError   : function() {};
    this.callbacks.onSuccess = "onSuccess" in options ? options.onSuccess : function() {};

    options.element.addEventListener("keydown", this.listen.bind(this), false);
};

/* jshint node : true  */

if(typeof module !== "undefined" && module.exports)
    module.exports = KonamiCode;

/* jshint node : false  */
