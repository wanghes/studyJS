<?php
//header("cache-control: no-cache");
$seconds_to_cache = 30;
$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";
header("Expires: $ts"); header("Pragma: cache");
header("Cache-Control: max-age=$seconds_to_cache");
require'ImageResize.php';

foreach (glob("./tmp/*") as $source) {
    $file = pathinfo($source);
    if (!preg_match('#-100x100\.([a-z]+)$#i', $source)) { //在没有缓存的情况下每次从新生成
            $destination = $file['dirname'] . '/' . $file['filename'] . '-100x100.' . $file['extension'];
            ImageResize::image_scale_cropped($source, $destination, 100, 100);
            printf('<a href="%s"><img src="%s" widht="100" height="100" /></a>', $source, $destination);
    }

}