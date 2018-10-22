'use strict';

function showInElem(tech, skill) {
    this.tech = tech;
    this.skill = skill;
    this.elem = document.querySelectorAll('[data-skill = "' + this.skill + '"]')[0];
    this.lookForClass();
    this.addAnimation();
    this.addRange();
}
showInElem.prototype.lookForClass = function () {
    if (this.tech === "front-end") {
        this.class = "animationFront";
    } else {
        this.class = "animationBack";
    }
};

showInElem.prototype.showInElem = function () {
    if (this.tech === "front-end") {
        this.class = "animationFront";
    } else {
        this.class = "animationBack";
    }
};

showInElem.prototype.addAnimation = function () {
    if (this.class === 'animationFront') {
        this.elem.classList.add('animationFront');
    } else {
        this.elem.classList.add('animationBack');
    }
};

showInElem.prototype.addRange = function () {
    var _this = this;
    this.elem.addEventListener("animationend", function () {
        var items = _this.elem.children[1].children;
        for (var i = 0; i < items.length; i++) {
            setTimeout(function (i) {

                _this.elem.children[1].children[i].classList.add('opacity-1');
            }, i * 250, i);
        }
    });
};