<template>
  <smodel
    :upbuttons="upbuttons"
    :tabledata="tabledata"
    :tablecolumn="tablecolumn"
    :opbuttons="opbuttons"
  ></smodel>
</template>

<script>

import axios from '@/axios'
import smodel from './SModel'

export default {
  components: {
      smodel
  },
  data: function() {
    var that = this;
    return {
      tabledata: [],
      tablecolumn: [
        {
          prop: "account",
          label: "账号"
        },
        {
          prop: "name",
          label: "名字"
        },
        {
          prop: "role_name",
          label: "角色"
        },
        {
          prop: "status",
          label: "状态"
        }
      ],
      upbuttons: [
        {
          label: "新账号",
          type: "dialog",
          icon: "el-icon-plus",
          dial: {
            title: "添加新账号",
            form: [
              {
                label: "账号",
                prop: "account"
              },
              {
                label: "名字",
                prop: "name"
              },
              {
                label: "角色",
                prop: "role_id",
                type: "select",
                options: [
                  {
                    label: "admin",
                    value: 1
                  },
                  {
                    label: "tester",
                    value: 2
                  }
                ]
              }
            ],
            exec: that.postadduser
          }
        }
      ],
      opbuttons: [
        {
          label: "编辑",
          type: "dialog",
          dial: {
            title: "编辑",
            form: [
              {
                label: "账号",
                prop: "account"
              },
              {
                label: "名字",
                prop: "name"
              },
              {
                label: "角色",
                prop: "role_id",
                type: "select",
                options: []
              },
              {
                label: "状态",
                prop: "disabled",
                type: "select",
                options: [
                  { label: "启用", value: 0 },
                  { label: "禁用", value: 1 }
                ]
              }
            ],
            exec: that.postedituser
          }
        },
        {
          label: "删除",
          type: "confirm",
          msg: "确认删除",
          exec: that.postdeluser
        },
        {
          label: "重置",
          type: "confirm",
          msg: "确认重置密码",
          exec: that.postresetuser
        }
      ]
    };
  },
  methods: {
    loaddata() {
      let that = this;
      axios
        .get("/useradmin/getusers")
        .then(function(response) {
          var d = response.data;
          for (var i = 0; i < d.length; i++) {
            var d1 = d[i];
            d1.role_name = d1.role.name;
            d1.role_id = d1.role.id;
            if (d1.disabled == 1) d1.status = "禁用";
            else d1.status = "启用";
          }
          that.tabledata = d;
        })
        .catch(function(err) {
          console.log(err);
          that.$message.error("load usertablesdata failed");
        });

      axios
        .get("/useradmin/getroles")
        .then(function(response) {
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            var it = data[i];
            it.value = it.id;
            it.label = it.name;
          }
          that.upbuttons[0].dial.form[2].options = data;
          that.opbuttons[0].dial.form[2].options = data;
        })
        .catch(function(err) {
          console.log(err);
          that.$message.error("loading sys_roles failed");
        });
    },

    postadduser(smod, data) {
      smod.ed_loading = true;
      let that = this;
      axios
        .post("/useradmin/addnewuser", Qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(resp) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          if (resp.data.code == 0) {
            that.$message({
              message: "添加用户成功",
              type: "success"
            });
          } else {
            that.$message({
              message: "添加用户出现异常",
              type: "warning"
            });
          }
          that.loaddata();
        })
        .catch(function(err) {
          console.log(err);
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.$message.error("添加用户失败");
        });
    },

    postedituser(smod, data) {
      smod.ed_loading = true;
      var that = this;
      axios
        .post("/useradmin/edituser", Qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(resp) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.loaddata();
          that.$message("已修改账户信息");
        })
        .catch(function(err) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.$message.error("修改账户信息失败");
        });
    },

    postdeluser(smod, data) {
      var that = this;
      axios
        .post("/useradmin/deluser", Qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(resp) {
          console.log(resp);
          that.$message(data.account + "已删除");
          that.loaddata();
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    postresetuser(smod, data) {
      var that = this;
      axios
        .post("/useradmin/resetuser", Qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(resp) {
          console.log(resp);
          that.$message(data.account + "已重置密码");
        })
        .catch(function(err) {
          that.$message.error("重置密码失败");
          console.log(err);
        });
    }
  },
  created() {
    this.loaddata();
  }
};
</script>

<style lang="less" scoped>
</style>