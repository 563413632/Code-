//定义全局变量
let divValleyofdeath = document.getElementById('divValleyofdeath'); //战场
let diPlaneImgArr= ['../images/BluePlane.png', '../images/BluePlane1.png','../images/BluePlane2.png','../images/BluePlane3.png']
let diPlaneArr = [];    //敌机库
let createDiPlaneTimer;//敌机产生 计时器
let diPlaneMoveTimer; //敌机移动计时器
let playerPlane = document.getElementById('playerPlane');//玩家飞机
// let playerPlaneMoveTimer;
let star = document.getElementById('star');//开始按钮
let restar = document.getElementById('restar');//重置按钮
let stop = document.getElementById('stop');//暂停按钮


star.onclick = function () {//开始方法
    playerPlane.classList.remove('playerPlane');
    star.setAttribute('disabled', 'true');
    StarGame();
}
restar.onclick =function  () {//重置方法
    location.reload();
}
stop.onclick = function () {//暂停方法(bug不能停止函数)
    alert('暂停');
}
//菜单快捷键
document.onkeydown = function (event) {
    let e = event || window.event;
    if (e.keyCode == 32) {
        alert('暂停');
        return;
    }
    if (e.keyCode == 13) {//开始 bug 重复按键会多次调用函数
        playerPlane.classList.remove('playerPlane');
        star.setAttribute('disabled', 'true');
        StarGame();
        return;
    }
    if (e.keyCode == 8) {//重置
        location.reload();
        return;
    }
}

function StarGame() {//开始游戏
    createDiPlaneTimer = setInterval(createDiPlane, 1000);
    diPlaneMoveTimer = setInterval(diPlaneMove, 20);
    playerPlaneMove();


}
//敌机移动
function diPlaneMove() {
    let diPlaneArr2 = Array.from(diPlaneArr);
    diPlaneArr2.forEach(function (item) {
        item.move();
    })
}
//创建敌机的方法
function createDiPlane() {
    let x = parseInt(Math.random() * (398));//出现的水平位置
    let speed = parseInt(Math.random()*1+Math.random()*2+Math.random()*2+0.5);//敌机的速度
    let imgSrcIndex = parseInt(Math.random() * 4);//敌机种类
    let plane = new diPlanePrototype(diPlaneImgArr[imgSrcIndex], x, 0,speed);
    diPlaneArr.push(plane)
}
//创建敌机的原型对象
/*
属性   图片  图片路径  x  y   blood speed
*/
function diPlanePrototype(imgSrc, x, y,speed) {
    this.imgNode = document.createElement('img')
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = 1;
    this.speed = speed;
    this.blood = parseInt(Math.random() * 4);

    this.move = function () { //向下移动
        var topDiPlane = parseInt(this.imgNode.style.top);
        if (topDiPlane > (divValleyofdeath.offsetHeight - 42)) {//飞出战场执行删除
            for (i = 0; i < diPlaneArr.length; i++){//从敌机库移除
                if (diPlaneArr[i] == this) {
                    diPlaneArr.splice(i, 1);
                    break;
                }
            }
            divValleyofdeath.removeChild(this.imgNode);//删除图片节点
        } else {
            this.imgNode.style.top = topDiPlane + this.speed + 'px';
        }
    }
    this.init = function () { //初始化敌机
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = this.x + 'px';
        this.imgNode.style.top = this.y + 'px';
        divValleyofdeath.appendChild(this.imgNode);
    }
    this.init();

}

//创建玩家飞机的原型
function playerPlanePrototype(imgSrc, x, y) {
    let playerPlane = document.getElementById('playerPlane')
    playerPlane.style.display
    this.imgNode = document.createElement('img')
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = 10;

}
//玩家移动
document.onmousemove = function playerPlaneMove() {
    let e = arguments[0] || window.event;//鼠标移动事件
    let divValleyofdeathLeft = divValleyofdeath.offsetLeft;
    let divValleyofdeatHeight = parseInt(getStyle(divValleyofdeath).height);
    let divValleyofdeathWidth = parseInt(getStyle(divValleyofdeath).width);
    let ppmX = e.screenX;//鼠标相对于战场左边界的距离
    let ppmY = e.screenY;//鼠标相对于战场上边界的距离
    let playerPlaneWidth = playerPlane.offsetWidth;
    let playerPlaneHeight = playerPlane.offsetHeight;
    let width = parseInt(getStyle(playerPlane).width);
    // console.log(divValleyofdeathLeft + divValleyofdeathWidth);
    if (ppmX < divValleyofdeathLeft ) {//左边界限
        playerPlane.style.left = 0 - divValleyofdeathLeft-playerPlaneWidth/2 ;
    }else
    if (ppmX > (divValleyofdeathLeft + divValleyofdeathWidth)) {//右边界限  鼠标screenX大于 div左边距离+宽度
        playerPlane.style.left =divValleyofdeathWidth - playerPlaneWidth/2 +'px' ;
    }
    else if (ppmY > (divValleyofdeatHeight + width) ){
        playerPlane.style.top = divValleyofdeatHeight- width/2 +'px';
    } else
    {
        playerPlane.style.left = ppmX - divValleyofdeathLeft-playerPlaneWidth/2 + 'px';
        playerPlane.style.top = ppmY - playerPlaneHeight*(1.5) +'px';
    }
}

function getStyle(ele) {
    if (ele.currentStyle) {
     return ele.currentStyle;
    } else {
        return document.defaultView.getComputedStyle(ele);
    }
}