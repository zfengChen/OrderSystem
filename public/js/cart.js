$(function () {
    $(".increment").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        var productNum = $(this).siblings(".itxt").val();
        var productId = $(this).siblings(".pId").val();
        // console.log(productNum);
        // console.log(productId);
        edit(productId, productNum);

        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p  
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        var price = (p * n).toFixed(2);
        // 小计模块 
        // toFixed(2) 可以让我们保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();

    });

    $(".decrement").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        // console.log($(this).siblings(".itxt").val());
        var productNum = $(this).siblings(".itxt").val();
        var productId = $(this).siblings(".pId").val();
        // console.log(productNum);
        // console.log(productId);
        edit(productId, productNum);


        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        // 小计模块 
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function () {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        var productNum = $(this).val();
        // console.log(productNum);
        var productId = $(this).siblings(".pId").val();
        edit(productId, productNum);
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text(money.toFixed(2));
        $("#totalPrice").val(money.toFixed(2));

    }
    // 6. 删除商品模块
    // 单个删除
    $(".p-action").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();

    })

    // 清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
    })



    var datas = {
        cartList:[]
    }

    function edit(productId, productNum) {
        // console.log(productId);
        // console.log(productNum);
        $.ajax({
            type: "post",
            url: "/cart/edit",
            data: {
                productId: productId,
                productNum: productNum,

            },
            dataType: "json",
            success: function (data) {
                var err_code = data.err_code
                if (err_code === 0) {
                    console.log(data.message);
                    datas.cartList = data.message;
                    var html = template("tpl", datas);
                    $("#tbody").html(html);
                } else if (err_code === 500) {
                    window.alert('服务器忙，请稍后重试！')
                }
            }
        });
    }



    // console.log($('#totalPrice').val())


})