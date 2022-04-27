
let left=parseInt($('#bgImgDiv1').css('left'));//背景图div的左定位
let newLeft;
let bgImg1Width = $('#bgImg1').css('width');//背景图1的宽度
document.onkeydown = function (event) {
    let e = window.event || event;
    if (e.key == 'a') {
        left = left + 5 ;
        newLeft = left + 'px';
        console.log(newLeft);
       $('#bgImgDiv1').css('marginLeft',newLeft)
    }
    if (e.key == 'd') {
        left = left - 5 ;
        newLeft = left + 'px';
        console.log(newLeft);
       $('#bgImgDiv1').css('marginLeft',newLeft)
    }
    //写到背景图1循环
}






