let menu = [
    [
        {
            firstTitle:'线索查询',
            id:'tab_4',
            url:'./modules/clue.html',
            icon:'browser'
        },
        {
            firstTitle:'采集配置',
            id:'tab_5',
            url:'./modules/collectionSet.html',
            icon:'sign in'
        },
        {
            firstTitle:'转发配置',
            id:'tab_6',
            url:'./modules/sendConfig.html',
            icon:'share alternate'
        },
        {
            firstTitle:'模板配置',
            id:'tab_7',
            url:'./modules/templateService.html',
            icon:'copy'
        },
        {
            firstTitle:'系统配置',
            id:'tab_1',
            url:'',
            icon:'setting',
            content:[
                {secondTitle:'系统日志', id:'tab_2',url:'./modules/systemLog.html',icon:'translate '},
                {secondTitle:'用户管理', id:'tab_3',url:'./modules/userManage.html',icon:'student'},
                {secondTitle:'资源管理', id:'tab_9',url:'./modules/resourcesManage.html',icon:'sitemap'},
                {secondTitle:'角色管理', id:'tab_10',url:'./modules/roleManage.html',icon:'users'}
            ]
        }
    ]
];

export {menu};
