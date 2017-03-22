<?php
require('memcachePool.php');
class dlufMemcache{
     private $memcache = null;
     function __construct($host,$port){

       $this->memcache = memcachepool::getInstance()->getMemcache($host,$port,true);
     }
    /**
     * memcache set value
     * @param [type]  $key 键
     * @param [type]  $value 值
     * @param integer $expire  到期的时间,如果此值设置为0表明此数据永不过期
     * @param integer $flag 标志位 使用MEMCACHE_COMPRESSED指定对值进行压缩(使用zlib)
     * @param [type]  $serializetype
     */
     public function set($key,$value,$expire=0,$flag=0,$serializetype=null){
        if($serializetype == 'json' && is_array($value)){
            $value = json_encode($value);
        }
         $this->memcache->set($key,$value,$flag,$expire);
     }
    /**
     * 从服务端查找元素
     * @param  [type] $key
     * @return [type]
     */
     public function get($key){
         return $this->memcache->get($key);
     }
    /**
     * 增加一个条目到缓存服务器
     * @param [type]  $key
     * @param [type]  $value
     * @param integer $expire
     * @param integer $flag
     * @param [type]  $serializetype
     */
    public function add($key,$value,$expire=0,$flag=0,$serializetype=null){
        if($serializetype == 'json' && is_array($value)){
            $value = json_encode($value);
        }
        $ret = $this->memcache->add($key,$value,$flag,$expire);
        return $ret;
    }
    /**
     * 清洗（删除）已经存储的所有的元素
     * @return [type]
     */
    public function flush(){
        return $this->memcache->flush();
    }
    /**
     *  从服务端删除一个元素
     * @param  [type] delete 参数：key要删除的元素的key 删除该元素的执行时间 timeout如果值为0,则该元素立即删除。
     * @return [type]
     */
    public function delete($key){
        $ret = $this->memcache->delete($key,0);
        return $ret;
    }
 }


 ?>