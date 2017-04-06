//import login from "./pages/login";
//import testDetail from './pages/testDetail'; //预留测试底部详细页面
import dashboard from "./pages/dashboard";
import systemLog from './pages/systemLog';
import userManage from './pages/userManage'; //用户管理
import resourcesManage from './pages/resourcesManage'; //资源管理
import rolesManage from './pages/rolesManage'; //角色管理
import collectionSet from './pages/collectionSet';
import templateService from './pages/templateService';
import clue from './pages/clue';
import sendConfig from './pages/sendConfig';
import logout from './pages/logout';
import name2Ctrl from './pages/name2Ctrl';
import name2Ctrl from './pages/name2Ctrl';
import name2Ctrl from './pages/name2Ctrl';
import naem222Ctrl from './pages/naem222Ctrl';
import wogeCtrl from './pages/wogeCtrl';
import wocengCtrl from './pages/wocengCtrl';
import sdsaCtrl from './pages/sdsaCtrl';
import dsaasaadCtrl from './pages/dsaasaadCtrl';
import fbCtrl from './pages/fbCtrl';
import localhostCtrl from './pages/localhostCtrl';
import ewewCtrl from './pages/ewewCtrl';
import dfgCtrl from './pages/dfgCtrl';
import wangCtrl from './pages/wangCtrl';
//#import
//注意上面是自动化文件插入位置

(function() {
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
    name2Ctrl();
    name2Ctrl();
    name2Ctrl();
    naem222Ctrl();
    wogeCtrl();
    wocengCtrl();
    sdsaCtrl();
    dsaasaadCtrl();
    fbCtrl();
    localhostCtrl();
ewewCtrl();
dfgCtrl();
wangCtrl();
//#insert
//注意上面是自动化文件插入位置

})();
