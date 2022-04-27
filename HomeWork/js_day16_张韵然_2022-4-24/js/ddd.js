(function jQuery($) {
    //动态发表时间
    {
        let date = new Date;
        let Month = date.getMonth();
        let Day = date.getDate();
        let Hours = date.getHours();
        let Minutes = date.getMinutes();
        $('#time').append(Month + 1, '-', Day, ' ', Hours, ':', Minutes).css('color',
            'gainsboro');
        $('#zan').css('cursor', 'pointer');
    }
    //删除动态
    {
        $("ul").delegate('#x', 'click', function () {
            $(this).parents('.main').remove();
        })
    }
    //动态的赞
    {
        let sym = false;
        let zan = 0;
        $("ul").delegate('#zan', 'click', function () {
            if (sym == false) {
                sym = true;
                $(this).html('已赞');
                zan++;
                $(this).parent('li').next().html('我和' + zan + '个人觉得很赞');
            } else {
                sym = false;
                $(this).html('赞')
                zan--;
                $(this).parent('li').next().html(zan + '个人觉得很赞');
                if (zan == 0) {
                    $(this).parent('li').next().html('');
                }
            }
        })
    }
    //评论和评论的赞
    {
        let sym = false;
        let pzan = 0;
        $("ul").delegate('#pzan', 'click', function () {
            if (sym == false) {
                pzan++;
                sym = true;
                $(this).html(pzan + '赞');
            } else {
                sym = false;
                pzan--;
                $(this).html(pzan + '赞');
                if (pzan == 0) {
                    sym = false;
                    $(this).html('赞');
                }
            }
        })
        //删除评论
        $('ul').delegate('.del', 'click', function () {
            // 有没有直接删除最上层或指定层级的祖先元素的方法-_-
            this.parentNode.parentNode.parentNode.remove();
        })
    }


    //回复
    {
        $("ul").delegate('#btnReply', 'click', function () {
            let newPLK = this.parentNode.previousElementSibling;
            let length = newPLK.innerText.length;
            if (length == 0) {
                // $('#btnReply').prop('disabled', 'true');
                confirm('内容为空')
            } else {
                let newPL = $('.plkClass').text();
                let date = new Date;
                let Year = date.getFullYear();
                let Month = date.getMonth();
                let Day = date.getDate();
                let Hours = date.getHours();
                let Minutes = date.getMinutes();
                $(newPLK).before($(` <li class="pinglun">
                <div class="" id=""><img src="../images/tx2.jpg" alt=""></div>
                <div class="" id="">
                    <div class="" id="">我：` +
                    newPL +
                    `</div>
                    <div class="">
                        <p>` + Year + '-' + (Month + 1) + '-' + Day + ' ' + Hours + ':' + Minutes + `</p>
                        <p id="pzan">赞</p>
                        <span class="del">删除</span>
                    </div>
                </div>
            </li>")`));
                $('.plkClass').addClass('plk').removeClass('plk2').html('');
            }
            $(this).css('display', 'none')
            $(this).parent('li').children().eq(0).html('');
        })
    }
    //评论框
    {
        $("ul").delegate('.plkClass', 'click', function () {
            $(this).click(function () {
                $(this).addClass('plk2').removeClass('plk'); //修改输入框样式
                $(this).parent('li').next().children().eq(1).css('display', 'inline-block'); //回复按钮
            })
            this.onblur = function () {
                setTimeout(huifu, 500);
            }
            function huifu() {
                $('.plkClass').addClass('plk').removeClass('plk2').html('');
            }
        })
    }
       $('.plkClass').keydown(function () {//只能获取前一次的长度
        let length = this.innerText.length;
        $(this).parent('li').next().children().eq(0).html(length + '/140'); //字符限制
    })

})(jQuery)