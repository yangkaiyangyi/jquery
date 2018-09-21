document.addEventListener('DOMContentLoaded',()=>{

    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    }  

    let id = GetQueryString('id');
    console.log(id);

    //获取页面元素
    let goodx = document.querySelector('.main_goods_contents');
    let addshopingcar = document.querySelector('.addshopingcar');
    let carbox = document.querySelector('.carbox');
    let navH2 = document.querySelector('.navH2');
    let cart_go_btn = document.querySelector('.cart_go_btn');
    //1
    let xhr = new XMLHttpRequest();

    let statusCode = [200,304];
    //4
    xhr.onload = ()=>{
        if(statusCode.indexOf(xhr.status)>=0){
            let goodsAll = JSON.parse(xhr.responseText);
            // console.log(goodsAll);
            console.log(goodsAll.row)
            navH2.innerHTML = goodsAll.row.map((good)=>{
                return`
                ${good.title}
                `
            })
         let ul = document.createElement('ul')
           ul.innerHTML = goodsAll.row.map((goods)=>{

                return`
                <div class="${goods.id}">
                <div class="main_goods_left">
                                <div class="box">
                                <div class="tb-booth tb-pic tb-s310">
                                    <a href="../${goods.imgurl}"><img src="../${goods.imgurl}" alt="美女" rel="../${goods.imgurl}" class="jqzoom" /></a>
                                </div>
                                 </div>
                                <ul class="tb-thumb" id="thumblist">
                                    <li class="tb-selected"><div class="tb-pic tb-s40"><a href="#"><img src="../${goods.imgurl}" mid="../${goods.imgurl}" big="../${goods.imgurl}"></a></div></li>

                                    
                                </ul>
       
                    <div class="mainlogol">
                        <span>分享:</span>
                        <a href="#"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                    </div>
                </div>
                <div class="main_goods_center">
                    <h1 class="goods_h1"><strong >${goods.title}</strong></h1>
                    <h2 class="goods_h2">Nestle Nido Milk Powder (${goods.weight})</h2>
                    <div class="goods_country">
                        <span>英国</span> <span>|</span><span>Nestlé/雀巢</span>
                    </div>
                    <p class="goods_p1">口味纯正，鲜奶的味道，主要是安全，没有国内传闻中那么多负面新闻。
                        含有26%乳脂，具有丰富的蛋白质；含有丰富的维生素A和维生素D。这些能够很多的保证骨骼健康和视力健康；
                        提供优质的钙营养补充，为骨骼及牙齿健康提供强大保障。
                        每天只需2杯雀巢奶粉就能够提供您和您的孩子一天所需要的32%蛋质和50%钙。
                       <br> 温馨提示：本品为膳食补充剂（营养素补充剂），不能替代药物。
                    </p>
                    <div class="goods_prices">
                        <p><label style="letter-spacing:27px;">价格</label><span class="goods_monery" style="margin-left:0;" >￥${goods.prices}</span></p>
                        <p><label>海外原价</label><span >£${goods.yuanjia}</span></p>
                        <p><label> 进口关税</label><span>￥${goods.duty}(由商家承担 )</span>  </p>
                    </div>

                    <div class="ygzy"><label>服务</label><span>英国直邮</span> </div>
                    <div class="goods_num"><label>数量</label>
                        <span class="spanf"></span>
                        <input type="text" name="qty" id="qty" value="1" title="数量" class="input-text qty">
                        <span class="spant"></span>
                    </div>
                    <p class="jrgwc">
                        <button class="addshopingcar">
                            加入购物车
                        </button>
                    </p>
                    <p class="goods_fuwu"><label>服务承若</label><span >海外正品直邮</span><span >海外正品直邮</span></p>
                    <p class="zffs"><label>支付方式</label><span >支付宝</span><span >支付宝</span></p>
                </div>
                <div class="main_goods_right">
                    <div class="main_logol">
                        <img src="../img/30.jpg" alt="" srcset="">
                    </div>
                    <div class="main_right_2">
                        <h2>英国精品馆</h2>
                        <p>海豚村全球精品，源自世界优质大牌直供。并以建立海外专属直邮物流渠道，为您提供全新便捷的海外购物体验。</p>
                        <a>进入店铺</a>
                    </div>
                    <p class="klk"></p>
                    <div class="hk">
                        <img src="../img/g19.jpg" alt="">
                    </div>
                </div>
                </div>
                `

            })
            console.log(goodx)
            goodx.appendChild(ul);

            let ul2 = document.createElement('ul');
                   
            ul2.innerHTML = goodsAll.row2.map(function(goods){
                return`
       
             <li class="cart_item" guid ="${goods.id}">
             <div class="goods_delete">X</div>
             <div class="cart_item_pic">
                 <a href="#">
                     <img src="../${goods.imgurl}" />
                 </a>
             </div>
                  <div class="cart_item_desc">
                     <a href="#" class="cart_item_name">
                     ${goods.title}</a>
                     <div class="cart_item_sku">
                         <span>数量：${goods.goodsnum}件</span>
                     </div>
                     <div class="cart_item_price">
                     <span class="cart_price">￥${goods.prices}</span>
                     </div>
                 </div>	
              </li>
         

                `
            }).join('');

            carbox.innerHTML = '';
            carbox.appendChild(ul2);
            
        }
    }

    //2
    xhr.open('get','../api/goods.php?id='+id,true);

    //发送请求
    xhr.send();



//点击添加到购物车
goodx.onclick = e=>{
    let statusCode = [200,304];
    if(e.target.className=='addshopingcar'){
            
            xhr.onload = ()=>{
                if(statusCode.indexOf(xhr.status)>=0){
                    console.log(xhr.responseText);
                    let goodsAll = JSON.parse(xhr.responseText);

                    let ul = document.createElement('ul');
                   
                    ul.innerHTML = goodsAll.row2.map(function(goods){
                        return`
               
                     <li class="cart_item" guid ="${goods.id}">
                     <div class="goods_delete">X</div>
                     <div class="cart_item_pic">
                         <a href="#">
                             <img src="../${goods.imgurl}" />
                         </a>
                     </div>
                          <div class="cart_item_desc">
                             <a href="#" class="cart_item_name">
                             ${goods.title}</a>
                             <div class="cart_item_sku">
                                 <span>数量：${goods.goodsnum}件</span>
                             </div>
                             <div class="cart_item_price">
                             <span class="cart_price">￥${goods.prices}</span>
                             </div>
                         </div>	
                      </li>
                 

                        `
                    }).join('');
                    carbox.innerHTML = '';
                    carbox.appendChild(ul);
                }
            }

            xhr.open('get','../api/goods.php?statu=1&id='+id,true);

            //发送请求
            xhr.send();



    }
    

}


//在右边购物车点击删除对应的商品（通过update）
carbox.onclick = e =>{
    
    if(e.target.className === "goods_delete"){

        let idx = e.target.parentNode.getAttribute('guid');

        console.log(idx);

        xhr.open('get','../api/goods.php?idx='+idx,true);            
        //3发送请求
        xhr.send();
    }

}

//点击右边购物车结算按钮到结算页面
cart_go_btn.onclick = ()=>{
   location.href="../html/car.html";

}









    //以下是飞入购物车

    var eleFlyElement = document.querySelector(".fly_item"), eleShopCart = document.querySelector(".message_list");
    var main = document.querySelector('.main')
    var numberItem = 0;
    // 抛物线运动
    var myParabola = funParabola(eleFlyElement, eleShopCart, {
        speed: 400, //抛物线速度
        curvature: 0.0008, //控制抛物线弧度
        complete: function() {
            eleFlyElement.style.visibility = "hidden";
            // eleShopCart.querySelector("span").innerHTML = ++numberItem;
        }
    });


    // 绑定点击事件
    main.onclick = function(e){
        
                if(e.target.className =='fly_item'|| e.target.className=='addshopingcar'){
                // 滚动大小
                console.log(666)
                var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
                eleFlyElement.style.left = event.clientX + scrollLeft + "px";
                eleFlyElement.style.top = event.clientY + scrollTop + "px";
                eleFlyElement.style.visibility = "visible";
                }
                // 需要重定位
                myParabola.position().move();
    }


});   


