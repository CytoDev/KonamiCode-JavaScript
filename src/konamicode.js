"use strict";

var konami = {
    code: [38, 40, 37, 39, 66, 65],
    sequence: {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        a: 0,
        b: 0
    },
    goal: {
        up: 2,
        down: 2,
        left: 2,
        right: 2,
        a: 1,
        b: 1
    },
    passed: function() {
        // reward the user for knowing the Konami code.
    },
    clear: function() {
        this.sequence = {up: 0, down: 0, left: 0, right: 0, a: 0, b: 0};
    },
    reset: function() {
        this.clear();
        // play a sound or do something to alert the user that we accept Konami codes...
    },
    parse: function(keyCode) {
        window.console.log(keyCode);

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

        if(JSON.stringify(this.sequence) === JSON.stringify(this.goal)) {
            this.passed();
            this.clear();
        }
    },
    listen: function(e) {
        if(this.code.indexOf(e.keyCode) >= 0) {
            this.parse(e.keyCode);
        } else {
            this.clear();
        }
    },
    init: function() {
        document.addEventListener("keydown", this.listen.bind(this), false);
    }
};
