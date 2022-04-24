//定义全局变量
let divValleyofdeath = document.getElementById('divValleyofdeath'); //战场
let diPlaneImgArr = ['../images/BluePlane.png', '../images/BluePlane1.png', '../images/BluePlane2.png', '../images/BluePlane3.png'];
let diPlaneArr = []; //敌机库
let createDiPlaneTimer; //敌机产生 计时器
let diPlaneMoveTimer; //敌机移动计时器
let playerPlane; //玩家飞机
let createShootTimer; //射击 计时器
let shootMoveTimer; //弹药飞行计时器
let shootArr = []; //弹药库
let star = document.getElementById('star'); //开始按钮
let restar = document.getElementById('restar'); //重置按钮
let stop = document.getElementById('stop'); //暂停按钮
let conGame = document.getElementById('conGame')//继续游戏
let hitTimer;//子弹移动
let shoushiTimer;//收尸
let colliderTimer;//撞机计时器
let playerBlood = document.getElementById('infoBar');//玩家血量
let playerPoints = document.getElementById('points');//玩家积分
let guanqia = 1;
let guanqiaPoints = [0, 100, 200, 300,400]//关卡---积分
let guanQia = document.getElementById('guanQia');
let xMoveTimer;
let audio = document.getElementById('audio');

function guanqiaUp(pPI) {//关卡判定
    let wanjiaJifen = parseInt(pPI);
    playerPoints.style.width = wanjiaJifen - (guanqia - 1)*100 + 'px';
    for (let i = 0; i < guanqiaPoints.length; i++) {
        if (wanjiaJifen >= guanqiaPoints[i]) {
            guanqia = i + 1;
            continue;
        }
    }
    if (guanqia > 4) {
        guanQia.innerText = '无尽模式';
        // playerPoints.style.width = 1920 + 'px';
        return;
    } else {
        guanQia.innerText = '关卡' + guanqia;
    }
}
star.onclick = function () { //开始方法
    star.setAttribute('disabled', '');
    audio.play();
    StarGame();
}
restar.onclick = function () { //重置方法
    location.reload();
}
stop.onclick = function () { //暂停
audio.pause();
    pauseGame();
}
conGame.onclick = function () {//继续
    audio.play();
    continueGame();
}
//菜单快捷键
document.onkeydown = function (event) {
    let e = event || window.event;
    if (e.keyCode == 32) {
        pauseGame();
        return;
    }
    if (e.keyCode == 13) { //开始 bug 重复按键会多次调用函数
        continueGame() ;
        return;
    }
    if (e.keyCode == 8) { //重置
        location.reload();
        return;
    }
}

function pauseGame() {//暂停方法
    clearInterval(createDiPlaneTimer);
    clearInterval(diPlaneMoveTimer);
    clearInterval(createShootTimer);
    clearInterval(shootMoveTimer);
    clearInterval(hitTimer);
    clearInterval(shoushiTimer);
    document.onmousemove = null;
    conGame.removeAttribute('disabled');
}

function continueGame() {//继续方法
    createDiPlaneTimer = setInterval(createDiPlane, 300);
    diPlaneMoveTimer = setInterval(diPlaneMove, 15);
    createShootTimer = setInterval(playerShoot, 10);
    shootMoveTimer = setInterval(shootMove, 1);
    hitTimer = setInterval(hit, 100);
    shoushiTimer = setInterval(shoushi, 600);
    colliderTimer = setInterval(collider, 500);
    conGame.setAttribute('disabled','');
    document.onmousemove = function () {
        playerPlaneMove();
    }
}


function StarGame() {//开始游戏
    createDiPlaneTimer = setInterval(createDiPlane, 330);
    diPlaneMoveTimer = setInterval(diPlaneMove, 15);
    playerPlane = new playerPlanePrototype("../images/PaperPlane.png");
    playerBlood.innerText = playerPlane.blood;
    playerPoints.innerText = 0;
    createShootTimer = setInterval(playerShoot,150);
    shootMoveTimer = setInterval(shootMove, 5);
    hitTimer = setInterval(hit, 100);
    shoushiTimer = setInterval(shoushi, 500);
    colliderTimer = setInterval(collider, 500);
}

function gameOver() {//游戏结束
    clearInterval(createDiPlaneTimer);
    clearInterval(diPlaneMoveTimer);
    playerPlane = null;
    clearInterval(createShootTimer);
    clearInterval(shootMoveTimer);
    clearInterval(hitTimer);
    clearInterval(shoushiTimer);
    document.onmousemove = null;
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
    let x = parseInt(Math.random() * (398)); //出现的水平位置
    // let speed = guanqia * parseInt(Math.random() + Math.random() * 2 + Math.random() * 4 + 1); //敌机的速度
    let y = 0;
    if (guanqia > 2 && guanqia <= 4) {
        y = parseInt(Math.random()*150)
    } else if (guanqia > 4) {
        y = parseInt(Math.random()*250)
    }

    let imgSrcIndex = parseInt(Math.random() * 4); //敌机种类
    let plane = new diPlanePrototype(diPlaneImgArr[imgSrcIndex], x, y,guanqia); //传参
    diPlaneArr.push(plane);
}
//创建敌机的原型对象
/*
属性   图片  图片路径  x  y   blood speed
*/
function diPlanePrototype(imgSrc, x, y,guanqia) {
    this.imgNode = document.createElement('img')
    this.imgSrc = imgSrc;
    this.x = x
    this.y = y;
    this.isDead = false;
    this.speed = guanqia * 2 - 1;
    this.blood = guanqia*(3) - 3;

    this.move = function () { //向下移动
        let topDiPlane = parseInt(this.imgNode.style.top);
        if (topDiPlane > (divValleyofdeath.offsetHeight - 42)) { //飞出战场执行删除
            for (i = 0; i < diPlaneArr.length; i++) { //从敌机库移除
                if (diPlaneArr[i] == this) {
                    diPlaneArr.splice(i, 1);
                    break;
                }
            }
            divValleyofdeath.removeChild(this.imgNode); //删除图片节点
        }
        else {
            this.imgNode.style.top = topDiPlane + this.speed + 'px';
        }
        if (guanqia > 1 && guanqia < 4) {
            let letfDiPlane = parseInt(this.imgNode.style.left);
            let X = parseInt(Math.random() * 2)|| 0;
            if ((this.x > -50 && this.x < 80) || (this.x > 240 && this.x < 320)) {
                this.imgNode.style.left = letfDiPlane + X + 'px';
            } else if((this.x > 80 && this.x < 160) || (this.x > 320 && this.x < 500)){
                this.imgNode.style.left = letfDiPlane - X + 'px';
            }
        }
        if (guanqia >= 4) {
            let letfDiPlane = parseInt(this.imgNode.style.left);
            let X = parseInt(Math.random() * 5 + 1) || 0;
            if ((this.x > -50 && this.x < 80) || (this.x > 240 && this.x < 320)) {
                this.imgNode.style.left = letfDiPlane + X + 'px';
            } else if((this.x > 80 && this.x < 160) || (this.x > 320 && this.x < 500)){
                this.imgNode.style.left = letfDiPlane - X + 'px';
            }
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



//创建玩家
//创建玩家飞机的原型
function playerPlanePrototype(imgSrc) {
    this.imgNode = document.createElement('img')
    this.imgSrc = imgSrc;
    this.blood = 10;
    this.init = function () { //初始化玩家飞机
        this.imgNode.src = this.imgSrc;
        this.imgNode.setAttribute('id', 'playerPlane');
        divValleyofdeath.appendChild(this.imgNode);
    }

    this.init();

    document.onmousemove = function () {//玩家移动
        playerPlaneMove();
    }
}
function playerPlaneMove() {//飞机移动方法
        let playerPlane = document.getElementById('playerPlane'); //玩家飞机
        let e = arguments[0] || window.event; //鼠标移动事件
        let divValleyofdeathLeft = divValleyofdeath.offsetLeft;
        let divValleyofdeatHeight = parseInt(getStyle(divValleyofdeath).height);
        let divValleyofdeathWidth = parseInt(getStyle(divValleyofdeath).width);
        let ppmX = e.clientX; //鼠标相对于战场左边界的距离
        let ppmY = e.clientY; //鼠标相对于战场上边界的距离
        let playerPlaneWidth = playerPlane.offsetWidth;
        let playerPlaneHeight = playerPlane.offsetHeight;
        let width = parseInt(getStyle(playerPlane).width);
        if (ppmX < divValleyofdeathLeft) { //左边界限
            playerPlane.style.left = 0 - divValleyofdeathLeft - playerPlaneWidth / 2;
            playerPlane.style.top = ppmY - playerPlaneHeight * (1.5) + 'px';
        } else
        if (ppmX > (divValleyofdeathLeft + divValleyofdeathWidth)) { //右边界限  鼠标screenX大于 div左边距离+宽度
            playerPlane.style.left = divValleyofdeathWidth - playerPlaneWidth / 2 + 'px';
            playerPlane.style.top = ppmY - playerPlaneHeight * (1.5) + 'px';
        } else if (ppmY > (divValleyofdeatHeight + width/2)) {
            playerPlane.style.left = ppmX - divValleyofdeathLeft - playerPlaneWidth / 2 + 'px';
            playerPlane.style.top = divValleyofdeatHeight - width / 2 + 'px';
        } else {
            playerPlane.style.left = ppmX - divValleyofdeathLeft - playerPlaneWidth / 2 + 'px';
            playerPlane.style.top = ppmY - playerPlaneHeight  + 'px';
        }
    }


function shootMove() { //子弹移动
    let shootArr2 = Array.from(shootArr);
    shootArr2.forEach(function (item) {
        item.move();
    })
}

function playerShoot() { //子弹的方法
    let playerPlane = document.getElementById('playerPlane');
    let x = playerPlane.offsetLeft; //飞机左边距离
    let y = playerPlane.offsetTop; //飞机上方距离
    let shoot = new shootPrototype('../images/bullet_03.png', x, y,guanqia);
    shootArr.push(shoot);
}


//子弹原型
function shootPrototype(imgSrc, x, y,guanqia) {
    this.imgNode = document.createElement('img')
    this.imgSrc = imgSrc;
    this.x = x; //通过调用该函数传一个 x的实参
    this.y = y; //通过调用该函数传一个 y的实参
    this.speed = guanqia + 2;
    this.init = function () { //初始化子弹
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.position = 'absolute';
        this.imgNode.style.zIndex = '3';
        this.imgNode.style.left = this.x + 34 + 'px'; //子弹出现的x位置
        this.imgNode.style.top = this.y - 30 + 'px'; //子弹出现的y位置
        divValleyofdeath.appendChild(this.imgNode);
    }
    this.init();

    this.move = function () { //向上移动
        let topShoot = parseInt(this.imgNode.style.top);
        if (topShoot < 0) { //执行删除
            for (i = 0; i < shootArr.length; i++) { //从弹药库移除
                if (shootArr[i] == this) {
                    shootArr.splice(i, 1);
                    break;
                }
            }
            divValleyofdeath.removeChild(this.imgNode); //删除图片节点
        } else {
            this.imgNode.style.top = topShoot - this.speed + 'px';
        }
    }
}


function hit() { //击中判断
    for (let i = 0; i < shootArr.length; i++) { //子弹信息
        let shootLeft = parseInt(shootArr[i].imgNode.style.left);//子弹左侧距离左边界
        let shootTop = parseInt(shootArr[i].imgNode.style.top);//子弹距离上边界
        let shootWidth = shootArr[i].imgNode.width;//子弹宽度
        let shootHeight = shootArr[i].imgNode.height;//子弹高度
        for (let j = 0; j < diPlaneArr.length; j++) { //敌机信息
            if (diPlaneArr[j].isDead) {
                continue;
            }
            let diPlaneLeft = parseInt(diPlaneArr[j].imgNode.style.left);
            let diPlaneTop = parseInt(diPlaneArr[j].imgNode.style.top);
            let diPlaneWidth = diPlaneArr[j].imgNode.width;
            let diPlaneHeiht = diPlaneArr[j].imgNode.height;
            if (
                (shootLeft > diPlaneLeft - shootWidth &&
                    shootLeft < diPlaneLeft + diPlaneWidth) &&
                (shootTop > diPlaneTop - shootHeight &&
                    shootTop < diPlaneTop + diPlaneHeiht)
            ) {
                diPlaneArr[j].blood--;//敌机扣血

                divValleyofdeath.removeChild(shootArr[i].imgNode);
                shootArr.splice(i, 1);
                playerPoints.innerText =parseInt(playerPoints.innerText) + 1;//玩家积分增加

                guanqiaUp(playerPoints.innerText);//关卡up
                if (guanqia == 1 || guanqia == 2) {
                    K = 0;
                }
                if (diPlaneArr[j].blood <= 0) {
                    diPlaneArr[j].isDead = true;
                    diPlaneArr[j].imgNode.src = '../images/BeiJi_02.png';
                }
            }
        }
    }

}
//收尸
function shoushi() {
    for (let i = 0; i < diPlaneArr.length; i++){
        if (diPlaneArr[i].isDead) {
            divValleyofdeath.removeChild(diPlaneArr[i].imgNode);
            diPlaneArr.splice(i,1)
        }
    }
}

//撞机判断
function collider() {
    //获取玩家信息
    let playerPlaneLeft = parseInt(playerPlane.imgNode.style.left);
    let playerPlaneTop = parseInt(playerPlane.imgNode.style.top);
    let playerPlaneWidth = parseInt(playerPlane.imgNode.width);
    let playerPlaneHeight = parseInt(playerPlane.imgNode.height);
    for (let j = 0; j < diPlaneArr.length; j++) {
        if (diPlaneArr[j].isDead) {
            continue;
        }
        //获取敌机信息
        let diPlaneLeft = parseInt(diPlaneArr[j].imgNode.style.left);
        let diPlaneTop = parseInt(diPlaneArr[j].imgNode.style.top);
        let diPlaneWidth = diPlaneArr[j].imgNode.width;
        let diPlaneHeiht = diPlaneArr[j].imgNode.height;
        if (
            (diPlaneLeft > playerPlaneLeft - diPlaneWidth &&
                diPlaneLeft < playerPlaneLeft + playerPlaneWidth)
                &&
                (diPlaneTop > playerPlaneTop - diPlaneHeiht &&
                diPlaneTop < playerPlaneTop + playerPlaneHeight
            )
        ) {
             diPlaneArr[j].blood =diPlaneArr[j].blood - 100;//敌机扣血
                if (diPlaneArr[j].blood <= 0) {
                    diPlaneArr[j].isDead = true;
                    diPlaneArr[j].imgNode.src = '../images/BeiJi_02.png';
            }
            playerPlane.blood --;//玩家扣血
            playerBlood.innerText = playerPlane.blood;
            playerBlood.style.width = playerPlane.blood * 10 + 'px';

            if (playerPlane.blood == 6) {
                playerBlood.style.backgroundColor = 'yellow';
            }
            if (playerPlane.blood == 3) {
                playerBlood.style.backgroundColor = 'red';
            }
                if (playerPlane.blood <= 0) {
                    gameOver();//游戏结束
                    divValleyofdeath.innerText = 'G G';
                }
        }
    }
}
function getStyle(ele) { //样式函数
    if (ele.currentStyle) {
        return ele.currentStyle;
    } else {
        return document.defaultView.getComputedStyle(ele);
    }
}