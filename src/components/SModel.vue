<template>
    <div>
        <p>
            <el-button v-for="(bt, index) in upbuttons" type="primary" :icon="bt.icon" :key="index" round size='mini'
                       @click="UpClick(bt)">{{bt.label}}
            </el-button>
        </p>
        <el-table :data="tabledata" border style="width:100%">
            <el-table-column type='index' width='50'>
            </el-table-column>
            <el-table-column v-for="(field, index) in tablecolumn" :key="index" :prop="field.prop"
                             :label="field.label"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-for="(bt, index) in opbuttons" :key="index" type="text" size="small"
                               @click="OpClick(bt, scope.row)">{{bt.label}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-loading="ed_loading" :title="dialogTitle" :visible.sync="dialogFormVisible" label-width='60px'>
            <el-form :model="opdata">
                <el-form-item v-for="(field, index) in dialogForm" :key="index" :label="field.label"  label-width="80px">
                    <el-input v-if="field.type=='input' || field.type == undefined " v-model="opdata[field.prop]"
                              auto-complete="off"></el-input>
                    <el-select v-else-if="field.type=='select'"  :multiple="field.multi" v-model="opdata[field.prop]">
                        <el-option v-for="item in field.options" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['upbuttons', 'tabledata', 'tablecolumn', 'opbuttons'],
    data() {
        return {
            dialogForm: [{
                label: '用户名',
                prop: 'name'
            }, {
                label: 'id',
                prop: 'id'
            }],
            opdata: {},
            dialogFormVisible: false,
            ed_loading: false,
            dialogTitle: 'title',
            dailogBtn: ""
        }
    },
    methods: {
        UpClick(bt) {
            if (bt.type == 'dialog') {
                this.dialogForm = bt.dial.form;
                this.dialogTitle = bt.dial.title;
                this.dailogBtn = bt;
                this.opdata = {}
                this.ed_loading = false;
                this.dialogFormVisible = true;
                if (bt.dial.before) {
                    bt.dial.before(bt.dial)
                }
            }
        },
        OpClick(bt, row) {
            this.opdata = row;
            var smod = this
            if (bt.type == "confirm") {
                if (confirm(bt.msg)) {
                    if (bt.exec) {
                        bt.exec(smod, this.opdata)
                    }
                }
            } else if (bt.type == 'dialog') {
                this.dialogForm = bt.dial.form;
                this.dialogTitle = bt.dial.title;
                this.dailogBtn = bt;
                this.ed_loading = false;
                this.dialogFormVisible = true;
                if (bt.dial.before) {
                    bt.dial.before(bt.dial)
                }
            }
        },
        dialConfirm() {
            var smod = this;
            if (this.dailogBtn.dial.exec) {
                this.dailogBtn.dial.exec(smod, this.opdata)
            } else {
                this.dialogFormVisible = false;
            }
        }
    }
}
</script>

<style>

</style>