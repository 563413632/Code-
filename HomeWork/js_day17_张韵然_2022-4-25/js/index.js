/* 1展示	创建展示信息fun   displayData
获取表格body  清空原数据    增加数据

2添加	添加删除事件fun  addDelEvent  添加  删除事件时  相对应的行为fun
delUserDataById  删除之后重新绑定展示

3分页	pageSize  每一页条数    currentPage    当前页 	tolalPage 总页数
计算页码fun   bindPage			在html显示页码
添加点击页码事件fun addPageEvent   分页，每个页面显示的是哪几条？

4		删除后重新生成页码 */
let pageSize = 4; //每页显示条数
let currentPage = 1; //当前页
let tolalPage;
displayData(currentPage);
addDelEvent();
bindPage();


function bindPage() { //计算总页数
    //总页数tolalPage=总条数/显示条数
    tolalPage = Math.ceil(userArr.length / pageSize);
    currentPage = (currentPage > tolalPage) ? currentPage : tolalPage;
    pageButton(tolalPage);
    addPageEvent(currentPage);
}

function pageButton(tolalPage) { //显示分页按钮
    $('#page').html('');
    for (i = 1; i <= tolalPage; i++) {
        $('#page').append(`
        <button class="btnPage">${i}</button>
        `);
    }
}


function addPageEvent(currentPage) { //绑定页面按钮事件
    $('#page').on('click', '.btnPage', function () {
        currentPage = parseInt($(this).text());
        displayData();
    });
}

function addDelEvent() { //删除按钮绑定事件
    $('#table').on('click', '.del', function () {
        let id = $(this)[0].dataset.id;
        currentPage = parseInt($('.btnPage').text());
        delUserData(id);
        bindPage();
        displayData(); //重新加载用户数据
    });
}

function delUserData(id) { //点击删除按钮时删除用户数据
    for (i = 0; i < userArr.length; i++) {
        if (userArr[i].id == id) {
            userArr.splice(i, 1);
            return;
        }
    }
}

function displayData() { //在网页显示用户信息
    $('#tbody').html('');
    let start = (currentPage - 1) * pageSize;
    let end = currentPage * pageSize;
    for (i = start; i < end && i < userArr.length; i++) {
        $('#tbody').append(`
            <tr>
            <td><input type="checkbox" class="ckb"></td>
            <td>${userArr[i].id}</td>
            <td>${userArr[i].idCard}</td>
            <td>${userArr[i].pwd}</td>
            <td>${userArr[i].money}</td>
            <td><button class="del" data-id='${userArr[i].id}'>删除</button>
            <button class="updata" >编辑</button></td>
            </tr>
            `);
    }
}