<?php
/*
1.链接数据库

2.数据操作
  *读取数据库

*/

//before在创建链接前，可申明赋值
$servernam = 'localhost';//服务器
$username = 'root';//默认根地址
$password = '';//密码默认为空
$dbname = 'liuyanban';//数据库名


//1.创建与msql数据库链接
$conn = new mysqli($servernam,$username,$password,$dbname);

//2.检测链接是否成功
if($conn->connect_error){
    die("连接失败: " . $conn->connect_error);
};
//3.查询前设置编码，防止乱码
$conn->set_charset('utf8');

//4接收前端传过来的参数
$id = isset($_GET['id'])?$_GET['id'] : '';//参数id
$statu =isset($_GET['statu'])?$_GET['statu']:''; 
$idx =isset($_GET['idx'])?$_GET['idx']:'';

//在购物车删除对应的商品-用更新方法
$sql_delete="update goodslist set goodsnum = 0 where id = '$idx'";
$conn->query($sql_delete);


//点击按钮，对应商品数量自动+1；
if($statu=='1'){

  $sql1="update goodslist set goodsnum = goodsnum+1 where id = '$id'";
  $conn->query($sql1);
  // var_dump($a);
}



//5获取查询结果集
$result = $conn->query("select * from goodslist where id = '$id'");
$result2 = $conn->query("select * from goodslist where goodsnum >0");

$rows = [];
while($row = $result->fetch_array(MYSQLI_ASSOC)){
  $rows[] = $row;
};
$rows2 = [];
while($row2 = $result2->fetch_array(MYSQLI_ASSOC)){
  $rows2[] = $row2;
};


$res = array(
    'row' => $rows,
    'row2' => $rows2
);


//8.把结果输出到前端
echo json_encode($res,JSON_UNESCAPED_UNICODE);   //-->输出到前端页面

?>