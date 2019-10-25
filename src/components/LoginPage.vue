<template>
  <div class="login">
    <div class="login-con">
      <el-card class="box-card" size="mini">
        <div slot="header" class="clearfix">
          <span>欢迎登录</span>
        </div>
        <el-form id="loginform" action="/login" ref="LoginForm" method="post" :model="form">
          <el-form-item>
            <el-input placeholder="请输入账号" name="username" v-model="form.username">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="请输入密码" name="password" v-model="form.password" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" style="width:100%;background-color: #FFDB00">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form:{ username:"", password:""}
        }
    },
    methods:{
        login(){
            console.log(this.form)
            this.$axios.post('/login').then(resp=>{
               console.log(resp)  
            }).catch(err=>{
                console.log(err)
            })
            this.$router.push('/')
        }
    }
}
</script>


<style lang="less" scoped>
.login{
    &-con{
        position:absolute;
        width: 300px;
        right:50%;
        top:40%;
        transform: translate(150px, -70%)
    }
}
</style>