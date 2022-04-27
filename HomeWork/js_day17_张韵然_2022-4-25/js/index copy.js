let pageSize = 4; //每一页现实的条数
let currentPage = 1; //当前页
let totalPage; //总页数
displayData();
addDelEvent();
addUserEvent();
bindPage();

//在网页显示用户信息
function displayData() { //显示信息
    $('#tbody').html('');
    let start = (currentPage-1)*pageSize;
    let end = currentPage*pageSize;
    for (let i = start; i < end; i++){
    $('#tbody').append(`
        <tr>
                <td><input type="checkbox" class="cbx" value=""></td>
                <td>${userArr[i].id}</td>
                <td>${userArr[i].idCard}</td>
                <td>${userArr[i].pwd}</td>
                <td>${userArr[i].money}</td>
                <td><button data-id='${userArr[i].id}' class="del">删除</button>
                <button data-id='${userArr[i].id}' class="updata">编辑</button></td>
            </tr>`)
    }
}
//分页显示
function bindPage() {
    totalPage = Math.ceil(userArr.length / pageSize);
    currentPage = (currentPage > totalPage) ? currentPage : totalPage;
}
$('#page').html('');
for (i = 1; i < pageSize; i++) {
    $('#page').append(`
        <button class="btnPage">${i}</button>
        `)
}
function addPageEvent() {
    $('#page').on('click', '.btnPage',function () {
        currentPage =parseInt($(userArr[i]).text());
    })
}
//添加
function addUserEvent() { //添加用户事件
    $('#submit').click(function () {
        let id = $('#userId').val();
        let idCard = $('#idCard').val();
        let pwd = $('#pwd').val();
        let money = $('#money').val();
        console.log(id, idCard, pwd, money);
        addUserData(id, idCard, pwd, money);
    })
}

function addUserData(id, idCard, pwd, money) { //执行添加用户信息
    $('#tbody').append(`
                <tr>
                    <td><input type="checkbox" class="cbx" value=""></td>
                    <td>${id}</td>
                    <td>${idCard}</td>
                    <td>${pwd}</td>
                    <td>${money}</td>
                    <td><button data-id='${id}' class="del">删除</button>
                    <button data-id='${id}' class="updata">编辑</button></td>
                </tr>`)

}
//删除
function addDelEvent() { //添加删除事件
    $('#tbody').on('click', '.del', function () {
        let id = $(userArr[i])[0].dataset.id;
        console.log(id);
        delUserData(id);
        displayData();
    })
}

function delUserData(id) { //执行删除用户数据
    let i = 0;
    userArr.forEach(function (item) {
        if (item.id == id) {
            userArr.splice(i, 1);
            console.log(i);
            return;
        }
        i++;
    })
}