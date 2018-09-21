    
    //.获取页面元素
    let order_content = document.querySelector('.order_content');
    let dialog = document.querySelector('.dialog-sure');
    let barshoping = document.querySelector('.barshoping');
    console.log(order_content);

    //1.创建请求对象
    let xhr = new XMLHttpRequest();
    //4.处理服务器返回的信息
    let statusCode = [200,304];

    xhr.onload = ()=>{
        if(statusCode.indexOf(xhr.status)>=0){
            console.log(xhr.responseText);

            let goodsAll = JSON.parse(xhr.responseText);
            

            order_content.innerHTML = goodsAll.row.map(goods =>{

   
                return `

                <ul class="order_lists" index="${goods.id}">                     
                    <li class="list_chk">
                    
                    

                        <label for="checkbox_2">  <input type="checkbox" id="checkbox_2" class="son_check" name="good"> </label>
                    </li>
                    <li class="list_con">
                        <div class="list_img"><a href="#" style="border:1px solid #ccc;"><img src="../${goods.imgurl}" alt=""></a></div>
                        <div class="list_text"><a href="#">${goods.title}</a></div>
                    </li>
                    <li class="list_info">
                        
                        <p>${goods.weight}</p>
                    </li>
                    <li class="list_price">
                        <p class="price">￥${goods.prices}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="#" class="reduce reSty">-</a>
                            <input type="text" value="${goods.goodsnum}" class="sum">
                            <a href="#" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${goods.prices*goods.goodsnum}</p>
                    </li>
                    <li class="list_op">
                        <p class="del"><a href="#" class="delBtn">移除商品</a></p>
                    </li>
                </ul>
                
                    `
            }).join('');

        }
    }

    //2与服务器建立链接，传递信息
    xhr.open('get' ,'../api/car.php',true);

    //3发送请求
    xhr.send();



    //点击删除单一商品;(服务器删除)
    order_content.onclick = e =>{
        if(e.target.className === 'delBtn'){
            var idx = e.target.parentNode.parentNode.parentNode.getAttribute('index');
          
            dialog.onclick = ()=>{
        

                 //2与服务器建立链接，传递信息
                    xhr.open('get' ,'../api/car.php?id='+idx,true);

                    //3发送请求
                    xhr.send();

                
            }
        }
    }

    //点击删除所有产品
    barshoping.onclick = ()=>{
         
          //2与服务器建立链接，传递信息
          xhr.open('get' ,'../api/car.php?a='+1,true);

          //3发送请求
          xhr.send();
    }







