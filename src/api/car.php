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


$id = isset($_GET['id'])?$_GET['id'] : '';//参数id
$a = isset($_GET['a'])?$_GET['a'] : '';//参数a
//在购物车删除对应的商品-用更新方法
$sql_delete="update goodslist set goodsnum = 0 where id = '$id'";
$conn->query($sql_delete);

//购物车删除所有的商品
if($a=='1'){
    $sql_delete="update goodslist set goodsnum = 0 where goodsnum>0";
    $conn->query($sql_delete);

}
//4获取查询结果集合

$result = $conn->query("select * from goodslist where goodsnum>0");

//5从集合中获取数据
$rows = [];
while($row = $result->fetch_array(MYSQLI_ASSOC)){
  $rows[] = $row;
};

$res = array(
    'row' => $rows
);

//释放查询结果集合，避免浪费资源
$result->close();

//.关闭数据库，避免占用资源
$conn->close();       

//把结果输出到前端
echo json_encode($res,JSON_UNESCAPED_UNICODE);   
?>