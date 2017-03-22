<?php
    header("Content-Type: text/html; charset=UTF-8");
    error_reporting(3);
    /**
     * 登陆
     * $user 163用户名
     * $pass 密码
    **/
    function login($user,$pass){
        //登陆
        $url = 'http://reg.163.com/logins.jsp?type=1&url=http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight%3D1%26verifycookie%3D1%26language%3D-1%26style%3D-1';      
        $cookie = tempnam('./cache/','~');//创建一个用于存放cookie信息的临时文件  
        $fields_post = array(
            'username'      => $user,
            'password'      => $pass,
            'verifycookie'  => 1,
            'style'         => -1,
            'product'       => 'mail163',
            'selType'       => -1,
            'secure'        => 'on'
        ); 
        $fields_string = '';    
        foreach($fields_post as $key => $value){
            $fields_string .= $key . '=' . $value . '&';
        }    
        $fields_string = rtrim($fields_string , '&');
        $headers = array(
            'User-Agent' => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9) Gecko/2008052906 Firefox/3.0',
            'Referer'    => 'http://www.163.com'
        );
        $ch = curl_init($url);  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//返回结果存放在变量中，而不是默认的直接输出
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);//关闭连接时，将服务器端返回的cookie保存在以下文件中 
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);       
        $result= curl_exec($ch);
        curl_close($ch);
        preg_match_all('/<div class="info" id="eHint">(.*?) <\/div>/i', $result,$infos,PREG_SET_ORDER);
        if(!empty($infos['0']['1'])){
            unlink($cookie);
            exit('<script type="text/javascript">alert("'.$infos['0']['1'].'");history.go(-1);</script>');
        }else{      
            $G_ROOT = dirname(__FILE__);
            file_put_contents($G_ROOT.'/cache/cookie', $cookie);
            return $cookie;
        }
    }
    /**
     * 
     * $data['url'] 请求地址
     * $data['data_post'] post数据
     * $data['cookie']
     *
    **/
    function curl($data){
        $url = $data['url'];
        $data_post= $data['data_post']? $data['data_post']: false;
        $cookie = $data['cookie'];      
        $headers = array(
            'User-Agent'        => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9) Gecko/2008052906 Firefox/3.0',
            'Referer'    => 'http://www.163.com'
        );
        $ch = curl_init($url);   
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);      
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);  //cookie文件 登陆之后 
        //POST 提交
        if($data_post){
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_post);
        }
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

login('niaorense@163.com','yinrenlei00');