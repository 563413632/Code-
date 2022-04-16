var phone = document.getElementById('phone');
phone.onmouseenter = function () {
    var navRight = document.getElementById('navRight');
    navRight.classList.add('active')
}
phone.onmouseout  = function () {
    var navRight = document.getElementById('navRight');
    navRight.classList.remove('active')
}