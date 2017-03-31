//import login from "./pages/login";
//import testDetail from './pages/testDetail'; //预留测试底部详细页面
import dashboard from "./pages/dashboard";
import systemLog from './pages/systemLog';
import userManage from './pages/userManage'; //用户管理
import resourcesManage from './pages/resourcesManage';//资源管理
import rolesManage from './pages/rolesManage'; //角色管理
import collectionSet from './pages/collectionSet';
import templateService from './pages/templateService';
import clue from './pages/clue';
import sendConfig from './pages/sendConfig';
import logout from './pages/logout';
//注意下面是自动化文件插入位置
//#import


(function(){
    $('body').append(`<div class="ui active inverted dimmer" id="loadingBox">
        <div class="ui medium text loader">正在加载数据...</div>
    </div>`);
    logout();
    dashboard();
    systemLog();
    userManage();
    resourcesManage();
    rolesManage();
    collectionSet();
    templateService();
    clue();
    sendConfig();
    aaaaCtrl();
    //注意下面是自动化文件插入位置
    //#insert
})();
