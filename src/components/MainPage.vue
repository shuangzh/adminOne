<template>
  <el-container class="allbox">
    <el-header style="height:auto">
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>
      <div class="right-con">
        <el-button icon="el-icon-s-tools" size="mini" round @click="logout">Logout</el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <LeftMenu @mclick-event="menuclick"></LeftMenu>
      </el-aside>
      <el-main>
        <MainTabs ref="maintabs"></MainTabs>
      </el-main>
    </el-container>
    <el-footer>
      <div class="copy">© 2017 Greenlight Planet. All Rights Reserved</div>
    </el-footer>
  </el-container>
</template>

<script>
import LeftMenu from "./LeftMenu";
import MainTabs from "./MainTabs";

export default {
  components: {
    LeftMenu,
    MainTabs
  },
  data(){
    return {
      // currentpath:''
    }
  },
  methods: {
    menuclick(index, title, mpath) {
      if (title) {
        if (mpath) {
          this.$refs.maintabs.addtab(title, mpath);

          // if(this.currentpath != mpath){
          //      let l = this.$router.resolve({name:mpath})
          //      if(l.resolved.matched.length > 0){
          //      this.$router.push({name:mpath}),
          //      this.currentpath = mpath
          //      }else{
          //         this.$router.push({name:'404'})
          //         this.currentpath = '404'
          //      }

          // }

        }
      }
    },
    logout() {
      if (confirm("退出登陆状态？ 是－退出， 否-取消")) {
        window.location.href = "/logout";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
   background-color: #FFDB00;
  .logo {
    padding: 11px 20px;
    float: left;
    img {
      width: 60px;
      max-width: 100%;
    }
  }
  .right-con{
        float:right;
        padding: 29px 20px;
    }
}

.el-aside{
    height: 100%;
    background-color:#808285;
    min-height: 600px;
}

.el-main{
    min-height: 600px;
}

.el-footer{
  background-color: #272727;
  text-align: center;
  color:#808285 ;
  padding-top: 20px;
}

</style>