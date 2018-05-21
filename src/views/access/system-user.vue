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
            <div style="height:32px;line-height:32px;font-size:14px;min-width:70px;margin-right:10px;">登陆名称:</div>
            </Col>
            <Col span="6">
            <Input v-model="loginName" placeholder="登陆名称"></Input>
            </Col>
            <Col span="2" align="center">
            <div style="height:32px;line-height:32px;font-size:14px;min-width:70px;margin-right:10px;">姓名:</div>
            </Col>
            <Col span="6">
            <Input v-model="loginUserName" placeholder="姓名"></Input>
            </Col>
            <Col span="2">
            <Button v-show="searchFlag" @click="searchClick" type="primary" style="margin-left:20px;">搜索</Button>
            </Col>
        </Row>
        <div class="zjl-table">
            <Button icon="android-create" @click="xgClick">修改</Button>
            <Button icon="android-add" @click="addTable">添加</Button>
            <Button icon="android-delete" @click="cxtableDelete">删除</Button>
    
            <Table style="margin-top:20px" :loading="isloading" @on-selection-change="selectTable" :border="true" :stripe="true" :show-header="true" :data="tableData3" :columns="tableColumns3"></Table>
            <Row style="margin-top:40px;padding:10px;line-height:20px;background:#f2f2f2;">
    
                <Col span="24" align="right">
                <Page @on-change="pageChange" :total="pageTotal" :loading="isloading" size="small" show-elevator></Page>
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
        <Modal v-model="modal1" :title="yhQh">
            <p slot="header">
                <span>{{yhQh}}</span>
            </p>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                <div>机构名称：</div>
                </Col>
                <Col>
                <div>{{topOrganize}}</div>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                <div>角色名称：</div>
                </Col>
                <Col span="">
                <Select v-model="model1" @on-change="getSelectData2" style="width:200px">
                                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                <div>分部名称：</div>
                </Col>
                <Col span="">
    
                <Select v-model="model2" @on-change="getSelectData" style="width:200px">
                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                <div>子分部名称：</div>
                </Col>
                <Col span="">
                <Select v-model="model3" @on-change="getSelectData1" style="width:200px">
                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                <div>登陆名称：</div>
                </Col>
                <Col span="">
                <Input v-model="dlName" style="width:200px;" placeholder=""></Input>
                </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                <div>姓名：</div>
                </Col>
                <Col span="">
                <Input v-model="ptName" style="width:200px;" placeholder=""></Input>
                </Col>
            </Row>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="modal1 = false">取消</Button>
                <Button type="success" @click="submiClick">提交</Button>
            </div>
        </Modal>
    
    </div>
</template>

<script>
    import util from '@/libs/util';
    import Cookie from 'js-cookie'
    export default {
        mounted() {
            // 摁扭权限
            let curMeunList = JSON.parse(localStorage.menuList);
            for (let a in curMeunList) {
                if (curMeunList[a].id == 30) {
                    this.searchFlag = true
                }
    
            }
        },
        created() {
            // 请求数据
            this.getData()
        },
        watch:{
            modal1(val){
                if(!val){
                   this.zfbId =  this.fbid = this.model1 =this.model2 = this.model3 = this.dlName = this.ptName =  this.topOrganize = ''
                }
            }
        },
        data() {
            return {
                OrganizeSonId: '',
                //摁扭状态
                enStatus: '1',
                user_id: '',
                // 弹框title切换
                yhQh: '',
                // 子分部 Id
                zfbId: '',
                fbid:'',
                // 角色Id
                jsId: '',
                model1: '',
                model2: '',
                model3: '',
                cityList: [],
                cityList2: [],
                cityList3: [],
                topOrganize: '',
                selectionData: [],
                pageTotal: '1',
                searchFlag: false,
                dlName: '',
                ptName: '',
                //登录名称
                loginName: '',
                // 用户名称
                loginUserName: '',
                xzJsmc: '',
                xzbz: '',
                modal1: false, //新增
                modal2: false, //删除弹框
                tableData3: [],
                showCheckbox: true,
                showIndex: true,
                isloading: true
            }
        },
        methods: {
            selectTable(selection) {
                this.selectionData = selection;
            },
            //查询表格是否选中 
            /**@description
             * 如果没有选中，提示未选中，
             * 如果选中，打开删除弹框
             */
            // 获取角色ID
            getSelectData2(sss) {
                console.log(sss)
                for (let i in this.cityList) {
                    if (this.cityList[i].value == sss) {
    
                        this.jsId = this.cityList[i].id
                    }
                }
    
            },
            // 修改 
            xgClick() {
    
                if (this.selectionData.length == 1) {
                    this.yhQh = '修改用户'
                   
                    this.enStatus = 2
                    this.dlName = this.selectionData[0].userName;
                    this.ptName = this.selectionData[0].roleName;
                    this.user_id = this.selectionData[0].user_id;
                    this.jsId = this.selectionData[0].roleId;
                    this.model1 = this.selectionData[0].roleName;
                    util.ajax('/SJWCRM/returnSystenUserOrganizeMess',{
                        method:'post',
                        params:{
                            organizeId:this.selectionData[0].organizeId
                        }
                    }).then(res=>{
                          this.OrganizeSonId = res.data.organizeSonParentId;
                          this.getSelectDataD()
                          this.model2 =  res.data.organizeName;
                          this.model3 = res.data.organizeSonName;
                          this.topOrganize = res.data.topOrganizeName;

                          this.modal1 = true;
                    })
                    
                    // 获取角色
                    util.ajax('/SJWCRM/InitRoleMess', {
                        method: 'post',
    
                    }).then(res => {
    
                        let curList = [];
                        for (let i in res.data.data.rows) {
                            let obj = {};
                            obj.value = res.data.data.rows[i].roleName;
                            obj.label = res.data.data.rows[i].roleName;
                            obj.id = res.data.data.rows[i].id;
                            curList.push(obj);
                        }
                        this.cityList = curList;
                    })
                    // 获取分部信息
                    util.ajax('/SJWCRM/getOrganizeList', {
                        method: 'post',
                        params: {
                            OrganizeId: this.selectionData.organizeId
                        }
                    }).then(res => {
    
                        let curList = [];
                        for (let i in res.data.data) {
                            let obj = {};
                            obj.value = res.data.data[i].organizeName;
                            obj.label = res.data.data[i].organizeName;
                            obj.id = res.data.data[i].id;
                            curList.push(obj);
                            
                        }
                        this.cityList2 = curList;
                        this.fbid = curList[0].id;
    
                    })
                } else {
                    this.$Message.warning('请选择选择一项！');
                }
            },
            // 获取子分部ID
            getSelectData1(val) {
                for (let i in this.cityList3) {
                    if (this.cityList3[i].value == val) {
                        this.zfbId = this.cityList3[i].id
                    }
                }
    
            },
            // 获取子分部
            getSelectData(val) {
    
                for (let i in this.cityList2) {
                    if (this.cityList2[i].value == val) {
                        this.OrganizeSonId = this.cityList2[i].id
                    }
                }
                this.fbid = this.OrganizeSonId;
                this.getSelectDataD();
               
            },
            getSelectDataD(){
                 util.ajax('/SJWCRM/getOrganizeSonByParentId', {
                    method: 'post',
                    params: {
                        OrganizeParentId: this.OrganizeSonId
                    }
                }).then(res => {
    
                    let curList = [];
    
                    for (let i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].organizeName;
                        obj.label = res.data.data[i].organizeName;
                        obj.id = res.data.data[i].id;
                        curList.push(obj);
                    }
                    this.cityList3 = curList;
                })
            },
            // 搜索 
    
            searchClick() {
                this.isloading = true
                util.ajax('/SJWCRM/getSystemUserMess', {
                    method: 'post',
                    params: {
                        userName: this.loginName,
                        roleName: this.loginUserName
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.tableData3 = res.data.data.rows;
                        this.pageTotal = res.data.data.total;
                        this.isloading = false;
                    }
                })
            },
            // 分页
            pageChange(index) {
                this.getData(index);
            },
            // 获取数据
            getData(s) {
    
                let curIndex = s || '1'
                this.isloading = true
    
                util.ajax('/SJWCRM/InitSystemUserList', {
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
            //点击删除键
            cxtableDelete: function() {
                if (this.selectionData.length) {
    
                    this.modal2 = true;
                } else {
                    this.$Message.warning('请选择至少选择一项！');
    
                }
            },
            /**@description
                     * 删除 选中的表格行
                
                     */
            tableDelete: function() {
    
                if (this.selectionData.length > 1) {
                    this.$Message.warning('只能删除一项');
                    this.modal2 = false;
                    return;
                }
                util.ajax('/SJWCRM/deleteSystemUserMess', {
                    method: 'post',
                    params: {
                        userId: this.selectionData[0].user_id
                    }
                }).then(res => {
                    //  表格
                    if (res.data.code === 20000) {
                        this.getData();
                        this.$Message.success('删除成功');
                        this.selectionData = [];
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                    this.modal2 = false;
                })
    
            },
            // 提交 新增
            submiClick() {
                if (this.enStatus == 1) {
                    let a = this.zfbId||this.fbid;
                    util.ajax('/SJWCRM/addSystemUser', {
                        method: 'post',
                        params: {
    
                            organizeId: a,
                            roleId: this.jsId,
                            loginUserName: this.dlName,
                            userName: this.ptName
                        }
                    }).then(res => {
                        if (res.data.code == 20000) {
                            this.modal1 = false;
                             
                          
                            this.$Message.success('新增成功！')
                            this.getData();
                            this.selectionData = [];
                        } else {
                            this.$Message.error(res.data.msg)
                        }
                    })
                } else if (this.enStatus == 2) {
                    let a = this.zfbId||this.fbid;
                    util.ajax('/SJWCRM/modifySystemUserMess', {
                        method: 'post',
                        params: {
                            userId: this.user_id,
                            organizeId: a,
                            roleId: this.jsId,
                            loginUserName: this.dlName,
                            userName: this.ptName
                        }
                    }).then(res => {
                        if (res.data.code == 20000) {
                            this.modal1 = false;
                            this.$Message.success('修改成功');
                            this.getData();
                            this.selectionData = [];
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    })
                }
            },
            /**@description
             * 添加
             */
            addTable: function() {
                this.enStatus = 1;
                this.topOrganize = Cookie.get('topOrganize');
                this.yhQh = "新增用户";
                this.modal1 = true;
    
                util.ajax('/SJWCRM/InitRoleMess', {
                    method: 'post',
    
                }).then(res => {
    
                    let curList = [];
                    for (let i in res.data.data.rows) {
                        let obj = {};
                        obj.value = res.data.data.rows[i].roleName;
                        obj.label = res.data.data.rows[i].roleName;
                        obj.id = res.data.data.rows[i].id;
                        curList.push(obj);
                    }
                    this.cityList = curList;
                })
                // 获取分部信息
                util.ajax('/SJWCRM/getOrganizeList', {
                    method: 'post',
                    params: {
                        OrganizeId: Cookie.get('OrganizeId')
                    }
                }).then(res => {
    
                    let curList = [];
                    for (let i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].organizeName;
                        obj.label = res.data.data[i].organizeName;
                        obj.id = res.data.data[i].id;
                        curList.push(obj);
                    }
                    this.cityList2 = curList;
                    this.fbid = curList[0].id
    
                })
    
    
    
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
                        align: 'center'
                    })
                }
    
                columns.push({
                    title: '用户名称',
                    key: 'userName',
                    align: 'center'
                });
                columns.push({
                    title: '角色名称',
                    key: 'roleName',
                    align: 'center'
                });
                columns.push({
                    title: '创建时间',
                    align: 'center',
                    render: (h, params) => {
                        let a = params.row.createTime && util.formatDate(params.row.createTime);
                        return h('div', a)
                    }
    
                });
                columns.push({
                    title: '修改时间',
                    align: 'center',
                    render: (h, params) => {
                        let a = params.row.createTime && util.formatDate(params.row.updateTime);
                        return h('div', a)
                    }
                });
    
                this.isloading = false;
                return columns;
            }
        }
    }
</script>
