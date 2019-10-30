<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="menu in menudata.menus">
        <el-submenu v-if="menu.smenus.length>0" :index="menu.index" :key="menu.index">
          <template slot="title">{{menu.title}}</template>
          <el-menu-item
            v-for="(sub, index) in menu.smenus"
            :key="index"
            :index="sub.index"
            @click="mclick(sub.index)"
          >{{sub.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="menu.index"
          :key="menu.index"
          @click="mclick(menu.index)"
        >{{menu.title}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menudata: {
        menus: [
          {
            index: "1",
            title: "系统管理",
            smenus: [
              {
                index: "1-1",
                title: "用户管理",
                mpath: "userman"
              },
              {
                index: "1-2",
                title: "角色管理",
                mpath: "roleman"
              },
              {
                index: "1-3",
                title: "权限管理",
                mpath: "permman"
              },
              {
                index: "1-4",
                title: "菜单管理",
                mpath: "menuman"
              }
            ]
          },
          {
            index: "2",
            title: "数据分析",
            mpath: "dataanly",
            smenus: []
          }
        ]
      }
    };
  },
  methods: {
    mclick(index) {
      let menus = this.menudata.menus;
      let title = undefined,
        mpath = undefined;
      menus.forEach((menu, it) => {
        if (menu.index == index) {
          if (menu.mpath) {
            title = menu.title;
            mpath = menu.mpath;
          }
        }
        if (menu.smenus) {
          let smenus = menu.smenus;
          smenus.forEach((m, it) => {
            if (m.index == index) {
              if (m.mpath) {
                title = m.title;
                mpath = m.mpath;
              }
            }
          });
        }
      });
      this.$emit("mclick-event", index, title, mpath);
    },
    handleOpen(key, keypath) {
      console.log(key, keypath);
    },
    handleClose(key, keypath) {
      console.log(key, keypath);
    },
    loadmenus() {
      var that = this;
      this.$axios
        .get("/useradmin/getmenu")
        .then(function(response) {
          var data = response.data,
            mdata = new Array(),
            ct = null;
          for (var i = 0; i < data.length; i++) {
            var it = data[i];
            it.index = it.level;
            it.mpath = it.target;
            var ls = it.level.split("-");
            if (ls.length == 1) {
              ct = it;
              ct.smenus = [];
              mdata.push(it);
            } else {
              ct.smenus.push(it);
            }
          }
          that.menudata = {
            menus: mdata
          };
        })
        .catch(function(err) {
          console.log(err);
        //   that.menudata = that.menudata_example;
        });
    }
  },
  created: function() {
    this.loadmenus();
  }
};
</script>


<style lang="less" scoped>
</style>