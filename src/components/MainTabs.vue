<template>
  <div>
    <el-tabs
      v-model="tabvalue"
      type="border-card"
      closable
      @tab-click="handleClick"
      @tab-remove="removeTab"
    >
      <el-tab-pane v-for="item in tabsdata" :key="item.name" :label="item.title" :name="item.name">
           <component :is="item.content" :key="item.name"></component>
      </el-tab-pane>
      
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->

    </el-tabs>
  </div>
</template>

<script>

import roleman from './RoleMan'
import userman from './UserMan'

export default {
  components:{
    roleman,
    userman
  },

  data() {
    return {
      tabvalue: "1",
      tabsdata: [],
      tabindex: 1
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      // let l = this.$router.resolve({ name: tab.content });
      // if (l.resolved.matched.length > 0) {
      //   this.$router.push({ name: tab.content });
      // } else {
      //   this.$router.push({ name: "404" });
      // }
    },
    addtab(label, cont) {
      let newname = ++this.tabindex + "";
      let opened = undefined;
      for (let i = 0; i < this.tabsdata.length; i++) {
        if (
          this.tabsdata[i].title == label &&
          this.tabsdata[i].content == cont
        ) {
          opened = this.tabsdata[i];
          this.tabvalue = opened.name;
          break;
        }
      }
      if (opened == undefined) {
        this.tabsdata.push({
          title: label,
          name: newname,
          content: cont
        });
        this.tabvalue = newname;
      }
    },
    removeTab(targertName) {
      console.log("remove tab " + targertName);
      let tabs = this.tabsdata;
      let activeName = this.tabvalue;
      let changed = false;
      if (activeName == targertName) {
        changed = true;
        tabs.forEach((tab, index) => {
          if (tab.name == targertName) {
            let nexttab = tabs[index + 1] || tabs[index - 1];
            if (nexttab) {
              activeName = nexttab.name;
            }
          }
        });
      }
      this.tabvalue = activeName;
      this.tabsdata = tabs.filter(tab => tab.name != targertName);
      if (this.tabsdata.length <= 0) {
        this.addtab("欢迎使用", "welcome");
      }
      // let mpath = undefined;
      // this.tabsdata.forEach((tab, index) => {
      //   if (tab.name == this.tabvalue) {
      //     mpath = tab.content;
      //   }
      // });
      // console.log("mpath = " + mpath + "  chaneged =" + changed);
      // if (mpath && changed) {
      //   let l = this.$router.resolve({ name: mpath });
      //   if (l.resolved.matched.length > 0) {
      //     this.$router.push({ name: mpath });
      //   } else {
      //     this.$router.push({ name: "404" });
      //   }
      // }
    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log("to:--" + to.path);
  //     console.log("from:--" + from.path);
  //     this.addtab(to.meta.title, to.name);
  //   }
  // },

  // beforeRouteEnter(to, from, next) {
  //   console.log("hello")
  //   next(vm => {
  //     // 通过 `vm` 访问组件实例

  //     console.log("main tabs -- to "+ to.path)

  //   });
  // }

};
</script>

<style lang="less" scoped>
</style>