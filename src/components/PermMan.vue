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
            tablecolumn: [{label: '权限', prop: 'perm'}, {label: '说明', prop: 'description'}, {
                label: '状态',
                prop: 'status'
            }],
            upbuttons: [{
                label: '新权限', icon: 'el-icon-plus', type: 'dialog',
                dial: {
                    title: '添加权限', form: [{label: '权限', prop: 'perm'}, {label: '说明', prop: 'description'}],
                    exec: that.postaddperm
                }

            },],
            opbuttons: [{
                label: '编辑', type: 'dialog', dial: {
                    title: '修改权限', form: [{label: '权限', prop: 'perm'}, {label: '说明', prop: 'description'},
                        {
                            label: '状态',
                            prop: 'disabled',
                            type: 'select',
                            options: [{label: '启用', value: 0}, {label: '禁用', value: 1}]
                        }],
                    exec: that.posteditperm
                }
            }, {label: '删除', type: 'confirm', msg: '确认删除吗', exec: that.postdelperm}],
        }
    },
    methods: {
        loaddata() {
            let that = this;
            axios.get('/useradmin/getperms').then(function (resp) {
                let d = resp.data;
                for (let i = 0; i < d.length; i++) {
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
        },

        postaddperm(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/addperm", Qs.stringify(data)).then(function (resp) {
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

        posteditperm(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/editperm", Qs.stringify(data)).then(function (resp) {
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

        postdelperm(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/delperm", Qs.stringify(data)).then(function (resp) {
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