<template>
    <el-container class="home-container">
        <!-- 头部区 -->
        <el-header>
        <div>
            <img src="../assets/logo.jpg" alt="" width="60">
            <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="loginOut">退出</el-button>
        </el-header>
    <!-- 页面主体区 -->
    <el-container>
        <!-- 侧边栏 :width根据菜单是否折叠自动设置宽度 -->
        <el-aside :width="isCollapse ? '64px': '200px'">
            <div class="toggle-button" @click="toggleCollaps">|||</div>
            <!-- 侧边栏菜单区域 -->
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
                <!-- 一级菜单 -->
                <!-- :index内容只能是字符串，所以item.id后面加一个' '转为字符串类型 -->
                <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                    <!-- 一级菜单模板区域 -->
                    <template slot="title">
                        <!-- 图标 -->
                        <i :class="iconsObj[item.id]"></i>
                        <!-- 文本 -->
                        <span>{{item.authName}}</span>
                    </template>

                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/' + subItem.path+''" v-for="subItem in item.children" :key="subItem.id" @click="savaNavState('/' + subItem.path)">
                        <template slot="title">
                        <!-- 图标 -->
                        <i class="el-icon-menu"></i>
                        <!-- 文本 -->
                        <span>{{subItem.authName}}</span>
                    </template>
                    </el-menu-item>
                    </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧主体区 -->
    <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
    </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            //左侧菜单数据
            menulist: [],
            //控制菜单栏图标
            iconsObj:{
                '125':'el-icon-user',
                '103':'el-icon-box',
                '101':'el-icon-goods',
                '102':'el-icon-notebook-2',
                '145':'el-icon-data-analysis'
            },
            //折叠菜单栏控制 默认false不折叠
            isCollapse: false,
            //被激活的链接地址
            activePath: ''
        }
    },
    //created（）页面加载后就执行里面的代码
    created(){ 
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        loginOut() {
            //清空token
            window.sessionStorage.clear()
            //重定向login登录页
            this.$router.push('/login')
        },
        // 获取所有的菜单
        async getMenuList(){
            const {data: res} = await this.$http.get('menus')
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            console.log(res)
        },
        //点击按钮，菜单栏折叠与展开
        toggleCollaps(){
            //!取反
            this.isCollapse = ! this.isCollapse;
        },
        //保存链接的激活状态，使当前选中的选项高亮显示
        savaNavState(activePath) {
            //设置sessionStorage
            window.sessionStorage.setItem('activePath',activePath)
            //重新赋值activePath
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        color: #ffffff;
        font-size: 20px;
        align-items: center;
        > div {
            display: flex;
            align-items: center;
            img {
                border-radius: 50%;
            }
            span {
                margin-left: 15px;
            }
        }
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border-right: 0;
        }
    }
    .el-main{
        background-color: #eaedf1;
    }
    .toggle-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor:pointer;
    }
</style>