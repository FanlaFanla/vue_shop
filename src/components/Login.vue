<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" v-bind:model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //这是登录表单的数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            //这是表单验证规则对象
            loginFormRules: {
            //验证用户名是否合法
            username:[
                { required: true, message: '请输入用户名称', trigger: 'blur' },
                { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
            ],
            //验证密码是否合法
            password:[
                { required: true, message: '请输入密码', },
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
            ]
        }
        }
    },
    methods:{
        //点击重置按钮
        resetLoginForm() {
            //console.log(this)
            this.$refs.loginFormRef.resetFields();
        },
        //登录预验证
        login() {
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return; //如果不为真则直接return
                const { data:res } = await this.$http.post('login',this.loginForm);
                if(res.meta.status !== 200) return this.$message.error('登录失败！');
                this.$message.success('登录成功！！');
                //token保存到sessionStorage中
                window.sessionStorage.setItem('token',res.data.token);
                //通过编程式导航跳转到后台 /home
                this.$router.push('/home');
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container{
    height: 100%;
    background-color: #2b4b6b;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box {
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>