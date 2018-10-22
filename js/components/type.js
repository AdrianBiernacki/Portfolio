'use strict';

function Type(array, hand, speed, freeze, stopAt) {
    this.hand = document.getElementById(hand);
    this.array = array;
    this.speed = speed;
    this.freeze = freeze;
    this.itteration = 0;
    this.currentObject = 0;
    this.stopAt = stopAt;
    let _this = this;
    setTimeout(function () {
        _this.controller();
    },2000);

}


Type.prototype.controller = function () {
    this.arrayString = this.array[this.itteration];
    if (this.itteration === this.currentObject) {
        this.itteration++;
        this.startType();
    }
};

Type.prototype.toggleClass = function () {
    var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'stopAnimate';
    flag === true ? this.hand.nextSibling.classList.add(className) : this.hand.nextSibling.classList.remove(className);
};

Type.prototype.endAnimation = function (nameInterval) {
    clearInterval(nameInterval);
    this.toggleClass(false);
};

Type.prototype.stopAtString = function (string) {
    for (var x = 0; x < this.stopAt.length; x++) {
        if (string.indexOf(this.stopAt[x][0]) !== -1) {
            this.pos = x;
            return string.indexOf(this.stopAt[x][0]) + 1;
        }
    }
};

Type.prototype.findElement = function () {
    var elem = document.querySelectorAll('.skills > div');
    for (var i = 0; i < elem.length; i++) {
        if (this.arrayString.toUpperCase().indexOf(elem[i].dataset.skill.toUpperCase()) !== -1) {
            this.skillTech = elem[i].parentElement.className.split(' ')[1];
            this.skill = elem[i].dataset.skill;
            return true;
        }
    }
    return false;
};

Type.prototype.startType = function () {
    var _this = this;
    var interval = void 0;
    var i = 0;
    interval = setInterval(function () {
        _this.toggleClass();
        if (_this.arrayString[i] === ' ') {
            if (i > 14 && i < 18) {
                _this.hand.innerHTML += '<br/ >';
            }
            _this.hand.innerHTML += _this.arrayString[i] + _this.arrayString[i + 1];
            i++;
        } else {
            _this.hand.innerHTML += _this.arrayString[i];
        }
        i++;
        if (_this.arrayString.length < i + 1) {
            _this.findElement();

            if (_this.findElement()) {
                new showInElem(_this.skillTech, _this.skill);
            }

            clearInterval(interval);
            _this.toggleClass(false);
            if (_this.itteration === _this.array.length) {
                _this.toggleClass(false, 'active');
                return true;
            }
            setTimeout(function () {
                _this.clearText();
            }, _this.freeze);
        }
    }, this.speed);
};

Type.prototype.clearText = function () {
    var _this = this;

    var string = this.hand.innerHTML;
    var interval = void 0;
    var i = 1;
    this.arrayString = string;

    interval = setInterval(function () {
        _this.toggleClass();
        if (_this.stopAtString(_this.arrayString) === string.length) {

            clearInterval(interval);
            _this.arrayString = _this.stopAt[_this.pos][1];
            _this.stopAt[_this.pos][0] = 'done';
            setTimeout(function () {
                _this.startType();
            }, _this.freeze / 4);
        } else {
        }
        string.lastIndexOf(' ') === string.length - 1 ? i = 2 : i = 1;
        string = string.slice(0, -i);
        _this.hand.innerHTML = string;
        if (string.length === 0) {
            clearInterval(interval);
            _this.toggleClass(false);
            _this.currentObject++;

            setTimeout(function () {
                _this.controller();
            }, _this.freeze / 4);
        }
    }, this.speed);
};

Type.prototype.startType = function () {
    var _this = this;

    var interval = void 0;
    var i = 0;
    interval = setInterval(function () {
        _this.toggleClass();
        if (_this.arrayString[i] === ' ') {
            if (i > 14 && i < 18) {
                _this.hand.innerHTML += '<br/ >';
            }
            _this.hand.innerHTML += _this.arrayString[i] + _this.arrayString[i + 1];
            i++;
        } else {
            _this.hand.innerHTML += _this.arrayString[i];
        }
        i++;
        if (_this.arrayString.length < i + 1) {
            _this.findElement();

            if (_this.findElement()) {
                new showInElem(_this.skillTech, _this.skill);
            }

            clearInterval(interval);
            _this.toggleClass(false);
            if (_this.itteration === _this.array.length) {
                setTimeout(function () {
                    _this.toggleClass(false, 'active');
                }, 2000);
                return true;
            }
            setTimeout(function () {
                _this.clearText();
            }, _this.freeze);
        }
    }, this.speed);
};
