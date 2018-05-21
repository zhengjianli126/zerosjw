<style lang="less" scoped>
    .zjl-content {
        padding: 20px 10px;
        background: #fff;
    }
    
    .zjl-table {
        margin-top: 20px;
        button {
            margin-right: 10px;
        }
    }
    
    .modal-content {
        text-align: center;
    }
</style>

<template>
    <div class="zjl-content">
        <Row>
            <Col span="2" align="center">
            <div style="height:32px;line-height:32px;font-size:14px;min-width:70px;margin-right:10px;">角色名称:</div>
            </Col>
            <Col span="6">
            <Input v-model="ssJsmc" placeholder="角色名称"></Input>
            </Col>
            <Col span="2">
            <Button v-show="searchFlag" @click="searchClick" type="primary" style="margin-left:20px;">搜索</Button>
            </Col>
        </Row>
        <div class="zjl-table">
            <Button icon="android-create" @click="reviseTable">修改</Button>
            <Button icon="android-add" @click="addTable">添加</Button>
            <Button icon="android-delete" @click="cxtableDelete">删除</Button>
            <Table style="margin-top:20px" @on-selection-change="selectTable" :loading="isloading" :border="true" :stripe="true" :show-header="true" :data="tableData3" :columns="tableColumns3"></Table>
            <Row style="margin-top:40px;padding:10px;line-height:20px;background:#f2f2f2;">
    
                <Col span="24" align="right">
                <Page :total="pageTotal" @on-change="pageChange" size="small" show-elevator></Page>
                </Col>
            </Row>
    
        </div>
        <!-- 删除弹框 -->
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center;">
                <p>是否确定删除该行信息？</p>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modal2 = false">取消</Button>
                <Button type="error" @click="tableDelete">删除</Button>
            </div>
        </Modal>
        <!-- 新增 -->
        <Modal v-model="modal1" :title="xzjsTitl">
            <p slot="header">
                <span>{{xzjsTitl}}</span>
            </p>
            <div class="modal-content">
                <span>角色名称：</span>
                <Input v-model="xzJsmc" style="width:200px;" placeholder=""></Input>
            </div>
            <div style="margin-left:135px;margin-top:20px;">
                <span>备注：</span>
                <Input v-model="xzbz" placeholder="" type="textarea" style="width:200px;"></Input>
            </div>
            <div style="margin-left:112px;margin-top:20px;">
                <span>功能权限：</span>
                <Tree ref="tree" style="width:300px;" :data="treeData" show-checkbox></Tree>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modal1 = false">取消</Button>
                <Button type="success" @click="submitAdd(tkStatus)">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '@/libs/util';
    export default {
        mounted() {
            // 摁扭权限
            let curMeunList = JSON.parse(localStorage.menuList);
            for (let a in curMeunList) {
                if (curMeunList[a].id == 25) {
                    this.searchFlag = true
                }
    
            }
        },
        created: function() {
            // 请求数据
            this.getData()
        },
        watch: {
            // 关闭弹框清除信息
            modal1(val) {
                if (!val) {
                    this.xzJsmc = this.xzbz = '';
                    this.menuIds = [];
                }
            }
        },
        data() {
            return {
                // title
                xzjsTitl: '',
                // 修改弹框 2  新增1
                tkStatus: 1,
    
                // 选中状态
                menuIds: [],
                selectionData: [],
                pageTotal: '1',
                searchFlag: false,
                ssJsmc: '',
                xzJsmc: '',
                xzbz: '',
                modal1: false, //新增
                modal2: false, //删除弹框
                tableData3: [],
                treeData: [],
                showCheckbox: true,
                showIndex: true,
                isloading: true
            }
        },
        methods: {
            //新增用户
            submitAdd(status) {
                // 新增
                if (status === 1) {
                    // 获取id
                    let a = this.$refs.tree.getCheckedNodes();
                    for (let i in a) {
                        this.menuIds.push(a[i].id)
                    }
                    util.ajax('/SJWCRM/addRole', {
                        method: 'post',
                        params: {
                            roleName: this.xzJsmc,
                            roleDescribe: this.xzbz,
                            menuIds: this.menuIds
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.code == 20000) {
                            this.modal1 = false;
                            this.$Message.success('新增成功');
                            //刷新表格
                            this.getData();
                        } else {
                            this.$Message.error(res.data.msg);
                        }
    
                    })
                } else if (status == 2) {
                    // 修改角色管理
                    let a = this.$refs.tree.getCheckedNodes();
                    for (let i in a) {
                        this.menuIds.push(a[i].id)
                    }
                    console.log(this.selectionData)
                    util.ajax('/SJWCRM/ModifyRoleMess', {
                        method: 'post',
                        params: {
                            id: this.selectionData[0].id,
                            roleName: this.xzJsmc,
                            roleDescribe: this.xzbz,
                            menuIds: this.menuIds
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.code == 20000) {
    
                            this.modal1 = false;
                            this.$Message.success('修改成功');
                            //刷新表格
                            this.getData();
                        } else {
                            this.$Message.error(res.data.msg);
                        }
    
                    })
                }
    
            },
            // 搜索
            searchClick() {
                this.isloading = true
                util.ajax('/SJWCRM/getRoleMessByRoleName', {
                    method: 'post',
                    params: {
                        roleName: this.ssJsmc
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.tableData3 = res.data.data.rows;
                        this.pageTotal = res.data.data.total;
                        this.isloading = false;
                    }
                })
            },
            //查询表格是否选中 
            /**@description
             * 如果没有选中，提示未选中，
             * 如果选中，打开删除弹框
             */
            cxtableDelete() {
                if (this.selectionData.length) {
    
                    this.modal2 = true;
                } else {
                    this.$Message.warning('请选择至少选择一项！');
    
                }
    
            },
    
            // 获取树数据
            getMenuList() {
                util.ajax('/SJWCRM/getMenuList', {
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.treeData = res.data.data;
                    }
                })
            },
            // 获取修改树结构
            getMenuList1() {
                util.ajax('/SJWCRM/getRoleMessByRoleId', {
                    method: 'post',
                    params: {
                        id: this.selectionData[0].id,
                        //roleName:this.selectionData[0].roleName
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        // console.log(res.data.data.menuList)
                        let a = res.data.data;
                        this.treeData = a.menuList;
                        this.xzJsmc = a.roleName;
                        this.xzbz = a.remarks;
    
                    }
                })
            },
    
            /**@description
             * 删除 选中的表格行
             */
            tableDelete() {
                console.log(this.selectionData)
                if (this.selectionData.length > 1) {
                    this.$Message.warning('只能删除一项');
                    this.modal2 = false;
                    return;
                }
                util.ajax('/SJWCRM/deleteRoleMess', {
                    method: 'post',
                    params: {
                        RoleId: this.selectionData[0].id
                    }
                }).then(res => {
                    //  表格
                    if (res.data.code === 20000) {
                        this.getData();
                        this.$Message.success('删除成功');
                    } else {
                        this.$Message.error(res.data.msg);
                    }
    
                    this.modal2 = false;
    
                })
    
    
    
            },
    
            addTable() {
                this.tkStatus = 1;
    
                this.xzjsTitl = "新增角色";
                this.getMenuList();
                this.modal1 = true;
    
            },
            reviseTable() {
                console.log(this.selectionData)
                if (this.selectionData.length && this.selectionData.length == 1) {
                    this.tkStatus = 2;
                    this.xzjsTitl = "修改角色";
                    this.getMenuList1();
                    this.modal1 = true;
                } else {
                    this.$Message.error('请选择一条进行修改！');
                }
    
            },
            // 分页
            pageChange(index) {
                this.getData(index);
            },
            // 获取数据
            getData(s) {
                let curIndex = s || '1'
                this.isloading = true
    
                util.ajax('/SJWCRM/InitRoleMess', {
                        method: 'post',
                        params: {
                            pageNum: curIndex,
                        }
                    })
                    .then(res => {
                        this.tableData3 = res.data.data.rows;
                        this.pageTotal = res.data.data.total;
                        this.isloading = false;
    
                    })
                    .catch(function(error) {
                        console.log(error);
    
                    });
            },
            selectTable(selection) {
                this.selectionData = selection;
            }
    
        },
        computed: {
    
            tableColumns3() {
                let columns = [];
                if (this.showIndex) {
                    columns.push({
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    })
                }
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center',
    
                    })
                }
                columns.push({
                    title: '角色名称',
                    key: 'roleName',
                    align: 'center'
                });
                columns.push({
                    title: '创建时间',
    
                    align: 'center',
                    render: (h, params) => {
                        let a = util.formatDate(params.row.updateTime);
                        return h('div', a)
                    }
                });
                columns.push({
                    title: '修改时间',
                    align: 'center',
                    render: (h, params) => {
                        let a = util.formatDate(params.row.updateTime);
    
                        return h('div', a)
                    }
                });
                columns.push({
                    title: '备注',
                    key: 'remarks',
                    align: 'center'
                });
                this.isloading = false;
                return columns;
            }
        }
    }
</script>
