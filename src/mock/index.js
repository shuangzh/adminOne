import Mock from 'mockjs'

const success = {
    code : 0,
    message: 'success'
}

Mock.mock("/login", 'post', success)

// 用户相关接口模拟

// 用户菜单
const user_menu = [
    {id:'1', title:'系统管理', level:'1', target:null},
    {id:'2', title:'用户管理', level:'1-1', target:'userman'},
    {id:'3', title:'角色管理', level:'1-2', target:'roleman'},
    {id:'4', title:'权限管理', level:'1-3', target:'permman'},
    {id:'5', title:'菜单管理', level:'1-4', target:'menuman'},
    {id:'6', title:'数据分析', level:'2', target:'dataanly'}
]
Mock.mock("/useradmin/getmenu",'get', user_menu)


export default Mock;
