var phone = document.getElementById('phone');
var a = document.getElementById('a');
phone.onmouseenter = function () {
    var navRight = document.getElementById('navRight');
    navRight.classList.add('active')
}
a.onmouseenter = function () {
    var navRight = document.getElementById('navRight');
    navRight.classList.add('active')
}
phone.onmouseout  = function () {
    var navRight = document.getElementById('navRight');
    navRight.classList.remove('active')
}