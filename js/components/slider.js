'use strict';

function slider(elem) {
    this.elem = document.getElementsByClassName(elem)[0];
    this.currentItem = 1;


    this.content = this.elem.children[0].children[0];
    this.items = this.content.children.length + 1;

    this.content.style.height = window.getComputedStyle(this.elem.children[0]).height;
    this.getElements();
    this.addelements(this.items - 2, 0);
    this.addelements(1, this.items);
    this.animation = false;
    this.events();
    let _this = this;

    this.setIntervalSlider();


}

slider.prototype.getElements = function () {

    this.content.style.height = window.getComputedStyle(this.elem.children[0]).maxHeight;
    this.widthContent = parseInt(window.getComputedStyle(this.elem.children[0]).maxWidth) * this.currentItem;
    this.content.style.marginLeft = -this.widthContent + 'px';
    this.itteration = -(parseInt(this.content.style.marginLeft));
    this.buttons = this.elem.children[1].children;
    this.singleItem = parseInt(window.getComputedStyle(this.elem.children[0]).maxWidth);
    this.content.style.width = this.widthContent * (this.items + 1) + 'px';
    this.setItemWidth();
    this.speed = window.innerWidth < 700 ? 2 : 1;


};

slider.prototype.setIntervalSlider = function () {
    let _this = this;
    clearInterval(_this.mainInterval);
    _this.mainInterval = setInterval(function () {
        _this.slideRight();
    }, 3000);
};

slider.prototype.events = function () {
    let _this = this;
    document.querySelectorAll('.slider .arrow-right')[0].addEventListener('click', function () {
        _this.slideRight();
        _this.setIntervalSlider();
    });

    document.querySelectorAll('.slider .arrow-left')[0].addEventListener('click', function () {
        _this.slideLeft();
        _this.setIntervalSlider();
    });

    document.querySelectorAll("." + this.content.classList)[0].addEventListener('mouseover', function () {
        clearInterval(_this.mainInterval);
    })
    document.querySelectorAll("." + this.content.classList)[0].addEventListener('mouseleave', function () {
        _this.setIntervalSlider();

    })
    window.onresize = function () {
        _this.getElements();
    };
};

slider.prototype.setItemWidth = function () {
    let items = this.content.children;
    for (var i = 0; i < items.length; i++) {
        items[i].style.width = (this.singleItem) + 'px';
    }
};
slider.prototype.addelements = function (posClone, posAdd) {
    let cloneElem = this.content.children[posClone].innerHTML;
    let createElem = document.createElement('div');
    let classes = this.content.children[posClone].classList;
    for (var i = 0; i < classes.length; i++) {
        createElem.classList.add(classes[i]);
    }
    createElem.style.width = this.widthContent + 'px';
    this.content.insertBefore(createElem, this.content.children[posAdd]);
    this.content.children[posAdd].innerHTML = cloneElem;
};

slider.prototype.slideRight = function () {
    if (this.animation) {
        return false;
    }
    let _this = this;
    this.currentItem += 1;
    let interval = setInterval(function () {
        _this.animation = true;
        _this.content.style.marginLeft = -_this.itteration + "px";
        _this.itteration += 10;
        if (-_this.itteration < -_this.singleItem * _this.currentItem && _this.currentItem <= _this.items) {
            if (_this.currentItem === _this.items) {
                _this.slideToItem(1);
            }
            _this.animation = false;
            clearInterval(interval);
        }
    }, 5 * this.speed);
};

slider.prototype.slideLeft = function () {
    if (this.animation) {
        return true;
    }
    let _this = this;
    this.currentItem -= 1;
    let interval = setInterval(function () {
        _this.animation = true;
        _this.content.style.marginLeft = -_this.itteration + "px";
        _this.itteration -= 10;
        if (-_this.itteration > -_this.singleItem * _this.currentItem && _this.currentItem <= _this.items) {
            if (_this.currentItem === 0) {
                _this.slideToItem(_this.items - 1);
            }
            _this.animation = false;
            clearInterval(interval);
        }
    }, 5 * this.speed);
};

slider.prototype.slideToItem = function (itemsOff) {
    this.content.style.marginLeft = -this.singleItem * itemsOff + 'px';
    this.itteration = -parseInt(this.content.style.marginLeft);
    this.currentItem = itemsOff;
};