<template>
  <smodel
    :upbuttons="upbuttons"
    :tabledata="tabledata"
    :tablecolumn="tablecolumn"
    :opbuttons="opbuttons"
  ></smodel>
</template>

<script>
import axios from "@/axios";
import smodel from "./SModel";

export default {
  components: {
    smodel
  },
  data: function() {
    var that = this;
    return {
      tabledata: [],
      tablecolumn: [
        { label: "角色", prop: "name" },
        { label: "说明", prop: "description" },
        {
          label: "权限",
          prop: "perms"
        },
        { label: "状态", prop: "status" }
      ],
      upbuttons: [
        {
          label: "新角色",
          icon: "el-icon-plus",
          type: "dialog",
          dial: {
            title: "添加新角色",
            form: [
              { label: "角色", prop: "name" },
              { label: "说明", prop: "description" },
              {
                label: "权限",
                prop: "perms_id",
                type: "select",
                multi: true,
                options: [
                  { label: "user:admin", value: 1 },
                  { label: "data:look", value: 2 }
                ]
              }
            ],
            exec: that.postaddrole
          }
        }
      ],
      opbuttons: [
        {
          label: "编辑",
          type: "dialog",
          dial: {
            title: "修改角色",
            form: [
              { label: "角色", prop: "name" },
              { label: "说明", prop: "description" },
              {
                label: "权限",
                prop: "perms_id",
                type: "select",
                multi: true,
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
            exec: that.posteditrole
          }
        },
        {
          label: "删除",
          type: "confirm",
          msg: "确认删除吗",
          exec: that.postdelrole
        }
      ]
    };
  },
  methods: {
    loaddata() {
      let that = this;
      axios
        .get("/useradmin/getroles")
        .then(function(resp) {
          let d = resp.data;
          for (let i = 0; i < d.length; i++) {
            let perms_id = new Array();
            let perms = "";
            for (let j = 0; j < d[i].permissions.length; j++) {
              perms = perms + " " + d[i].permissions[j].perm;
              perms_id.push(d[i].permissions[j].id);
            }
            d[i].perms = perms.trim();
            d[i].perms_id = perms_id;
            console.log("ddff  == ", d[i]);
            if (d[i].disabled == 1) {
              console.log("d is disabled");
              console.log(d);
              d[i].status = "禁用";
            } else {
              d[i].status = "启用";
            }
          }
          that.tabledata = d;
        })
        .catch(function(error) {
          console.log(error);
        });

      axios
        .get("/useradmin/getperms")
        .then(function(resp) {
          let d = resp.data;
          console.log(d);
          for (let i = 0; i < d.length; i++) {
            d[i].label = d[i].perm;
            d[i].value = d[i].id;
          }
          that.upbuttons[0].dial.form[2].options = d;
          that.opbuttons[0].dial.form[2].options = d;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    postaddrole(smod, data) {
      let that = this;
      console.log("here is postaddrole");
      smod.ed_loading = true;
      axios
        .post("/useradmin/addrole", Qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(resp) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.loaddata();
          that.$message({ type: "success", message: "角色添加成功" });
        })
        .catch(function(err) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.$message.error("添加角色失败");
        });
    },

    posteditrole(smod, data) {
      let that = this;
      console.log("here is postaddrole");
      smod.ed_loading = true;
      axios
        .post("/useradmin/editrole", Qs.stringify(data))
        .then(function(resp) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.loaddata();
          that.$message({ type: "success", message: "修改成功" });
        })
        .catch(function(err) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.$message.error("修改角色失败");
        });
    },

    postdelrole(smod, data) {
      let that = this;
      console.log("here is postaddrole");
      smod.ed_loading = true;
      axios
        .post("/useradmin/delrole", Qs.stringify(data))
        .then(function(resp) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.loaddata();
          that.$message({ type: "success", message: "删除角色成功" });
        })
        .catch(function(err) {
          smod.ed_loading = false;
          smod.dialogFormVisible = false;
          that.$message.error("删除角色失败");
        });
    }
  },
  created() {
    this.loaddata();
  }
};
</script>

<style>


</style>