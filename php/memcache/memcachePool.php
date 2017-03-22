<?php
class memcachePool{
    private static $instance;
    private $memcacheList = array();
    private function __construct(){

    }
     public static function getInstance(){
         if(self::$instance != null)
             return self::$instance;
         self::$instance = new memcachePool();
         return self::$instance;
     }
    /**
     * get memcache object from pool
     * @param  [type] $host 服务器
     * @param  [type] $port 端口
     * @param  [type] $flag 控制是否使用持久化连接。默认TRUE
     * @return [type]
     */
     public function getMemcache($host,$port,$flag){
         if(isset($this->memcacheList[$host.$port]))
             return $this->memcacheList[$host.$port];

        $memcache = new Memcache();
        // 向连接池中添加一个memcache服务器
        $memcache->addServer($host,$port,$flag);
        //开启大值自动压缩,第一个参数表示处理数据大小的临界点，第二个参数表示压缩的比例，默认为0.2
        $memcache->setCompressThreshold(2000,0.2);
        $this->memcacheList[$host.$port] = $memcache;
        return $memcache;
     }
 }


?>