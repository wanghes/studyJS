
<?php
/**
 * 在PHP中，有一些简单的图像函数是可以直接使用的，但大多数要处理的图像，都需要在编译PHP时加上GD库。除了安装GD库之外，在PHP中还可能需要其他的库，这可以根据需要支持哪些图像格式而定。GD库可以在http://www.boutell.com/gd/免费下载，不同的GD版本支持的图像格式不完全一样，最新的GD库版本支持GIF、JPEG、PNG、WBMP、XBM等格式的图像文件，此外还支持一些如FreeType、Type 1等字体库。通过GD库中的函数，可以完成各种点、线、几何图形、文本及颜色的操作处理，也可以创建或读取多种格式的图像文件。
　　在PHP中，通过GD库处理图像的操作都是先在内存中处理，操作完成以后再以文件流的方式输出到浏览器或保存在服务器的磁盘中。创建一个图像应该完成如下所示4个基本步骤。
　　①创建画布：所有的绘图设计都需要在一个背景图片上完成，而画布实际上就是在内存中开辟的一块临时区域，用于存储图像的信息。以后的图像操作都将基于这个背景画布，该画布的管理就类似于我们在画画时使用的画布。
　　②绘制图像：画布创建完成以后，就可以通过这个画布资源，使用各种画像函数设置图像的颜色、填充画布、画点、线段、各种几何图形，以及向图像中添加文本等。
　　③输出图像：完成整个图像的绘制以后，需要将图像以某种格式保存到服务器指定的文件中，或将图像直接输出到浏览器上显示给客户。但在图像输出之前，一定要使用header()函数发送Content-type通知浏览器，这次发送的是图片不是文本。
　　④释放资源：图像被输出以后，画布中的内容也不再有用。出于节约系统资源的考虑，需要及时清楚画布占用的所有内存资源。
　　我们先来了解一下一个非常简单的创建图像脚本。在下面的脚本文件image.php中，按前面介绍的绘制图像的四个步骤，使用GD库动态输出一个扇形统计图。代码如下所示：
*/
//创建画布，返回一个资源类型的变量$image，并在内存中开辟一个临时区域
$image = imagecreatetruecolor(100, 100);                //创建画布大小为100x100

//设置图像中所需的颜色，相当于在画画时准备的染料盒
$white = imagecolorallocate($image, 0xFF, 0xFF, 0xFF);          //为图像分配颜色为白色
$gray = imagecolorallocate($image, 0xC0, 0xC0, 0xC0);           //为图像分配颜色为灰色
$darkgray = imagecolorallocate($image, 0x90, 0x90, 0x90);       //为图像分配颜色为暗灰色
$navy = imagecolorallocate($image, 0x00, 0x00, 0x80);           //为图像分配颜色为深蓝色
$darknavy = imagecolorallocate($image, 0x00, 0x00, 0x50);       //为图像分配颜色为暗深蓝色
$red = imagecolorallocate($image, 0xFF, 0x00, 0x00);           //为图像分配颜色为红色
$darkred = imagecolorallocate($image, 0x90, 0x00, 0x00);       //为图像分配颜色为暗红色

imagefill($image, 0, 0, $white);            //为画布背景填充背景颜色
//动态制作3D效果
for ($i = 60; $i >50; $i--){                //循环10次画出立体效果
    imagefilledarc($image, 50, $i, 100, 50, -160, 40, $darknavy, IMG_ARC_PIE);
    imagefilledarc($image, 50, $i, 100, 50, 40, 75, $darkgray, IMG_ARC_PIE);
    imagefilledarc($image, 50, $i, 100, 50, 75, 200, $darkred, IMG_ARC_PIE);
}

imagefilledarc($image, 50, 50, 100, 50, -160, 40, $navy, IMG_ARC_PIE);      //画一椭圆弧且填充
imagefilledarc($image, 50, 50, 100, 50, 40 , 75, $gray, IMG_ARC_PIE);      //画一椭圆弧且填充
imagefilledarc($image, 50, 50, 100, 50, 75, 200, $red, IMG_ARC_PIE);      //画一椭圆弧且填充

imagestring($image, 1, 15, 55, '34.7%', $white);                //水平地画一行字符串
imagestring($image, 1, 45, 35, '55.5%', $white);                //水平地画一行字符串

//向浏览器中输出一个GIF格式的图片
header('Content-type:image/png');               //使用头函数告诉浏览器以图像方式处理以下输出

imagepng($image);                       //向浏览器输出
imagedestroy($image);                   //销毁图像释放资源


?>