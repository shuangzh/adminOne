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
  data: function () {
        var that = this;
        return {
            tabledata: [],
            tablecolumn: [{label: '标题', prop: 'title'}, {label: '目标', prop: 'target'}, {
                label: '权限',
                prop: 'perm'
            }, {label: '层级', prop: 'level'}, {label: '说明', prop: 'description'}, {label: '状态', prop: 'status'}],
            upbuttons: [{
                label: '新菜单', icon: 'el-icon-plus', type: 'dialog',
                dial: {
                    title: '添加菜单',
                    form: [{label: '标题', prop: 'title'}, {label: '目标', prop: 'target'}, {label: '层级', prop: 'level'},
                        {label: '权限', prop: 'perm_id', type: 'select', options: []}, {
                            label: '说明',
                            prop: 'description'
                        }],
                    exec: that.postaddmenu
                }

            },],
            opbuttons: [{
                label: '编辑', type: 'dialog', dial: {
                    title: '修改菜单',
                    form: [{label: '标题', prop: 'title'}, {label: '目标', prop: 'target'}, {label: '层级', prop: 'level'},
                        {label: '权限', prop: 'perm_id', type: 'select', options: []}, {label: '说明', prop: 'description'},
                        {
                            label: '状态',
                            prop: 'disabled',
                            type: 'select',
                            options: [{label: '启用', value: 0}, {label: '禁用', value: 1}]
                        }],
                    exec: that.posteditmenu
                }
            }, {label: '删除', type: 'confirm', msg: '确认删除吗', exec: that.postdelmenu}],
        }
    },
    methods: {
        loaddata() {
            let that = this;
            axios.get('/useradmin/getallmenu').then(function (resp) {
                let d = resp.data;
                for (let i = 0; i < d.length; i++) {
                    d[i].perm_id = d[i].permission.id
                    d[i].perm = d[i].permission.perm
                    if (d[i].disabled == 1) {
                        d[i].status = '禁用'
                    } else {
                        d[i].status = '启用'
                    }
                }
                that.tabledata = d
            }).catch(function (error) {
                console.log(error)
            });

            axios.get('/useradmin/getperms').then(function (resp) {
                let d = resp.data;
                console.log(d)
                for (let i = 0; i < d.length; i++) {
                    d[i].label = d[i].perm;
                    d[i].value = d[i].id;
                }
                that.upbuttons[0].dial.form[3].options = d;
                that.opbuttons[0].dial.form[3].options = d;
            }).catch(function (err) {
                console.log(err)
            })
        },

        postaddmenu(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/addmenu", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '添加成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("添加失败")
            })
        },

        posteditmenu(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/editmenu", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '修改成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("修改失败")
            })
        },

        postdelmenu(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/delmenu", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '删除成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("删除失败")
            })
        }
    },
    created() {
        this.loaddata();
    }
}
</script>

<style>

</style>