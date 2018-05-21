<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:1000px">
            <Table border :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">     
            <row>
                <span>分部详情</span>
                <Button type="primary" v-show="btnaddFlag" @click="addFlag" icon="plus-round">添加</Button>
                <Button type="primary"v-show="btneditFlag" @click="editFlag" icon="edit">修改</Button>
                <Button type="error" v-show="btndelFlag" @click="deleteFlag" icon="trash-a">删除</Button>
                <Modal v-model="modifyTip" :closable="false">
                    <div class="modal-content"  style="margin: 40px 160px; font-size:16px;">
                        <span>请选择要操作的条目。</span>
                    </div>
                    <div slot="footer">
                        <Button type="warning" size="large" @click="tipConfirm">我知道了</Button>
                    </div>
                </Modal>
                <Modal v-model="modifyTip2" :closable="false">
                    <div class="modal-content"  style="margin: 40px 110px; font-size:16px;">
                        <span>该分部下面有理财师，不能删除。</span>
                    </div>
                    <div slot="footer">
                        <Button type="warning" size="large" @click="tipConfirm2">我知道了</Button>
                    </div>
                </Modal>
                <Modal v-model="addFlagShow">
                    <p slot="header">
                        <span>添加分部</span>
                    </p>
                    <div class="modal-content">
                        <span>机构名称：</span><span v-model="topOrganize">{{topOrganize}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>分部名称：</span><Input v-model="addnewName" style="width:200px;" placeholder=""></Input>
                    </div>
                    <div v-show="errorTip" style="margin-top:10px; margin-left:80px; color: #FF7F50">
                            <span>请输入分部名称</span>
                    </div>
                    <div v-show="errorTip2" style="margin-top:10px; margin-left:80px; color: #FF7F50">
                        <span>此分部名称已存在，请重新输入</span>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="addFlagClose">关闭</Button>
                        <Button type="success" @click="addSave">保存</Button>
                    </div>
                </Modal>
                <Modal v-model="editFlagShow">
                    <p slot="header">
                        <span>修改分部</span>
                    </p>
                    <div class="modal-content">
                        <span>机构名称：</span><span v-model="topmOrganize">{{topmOrganize}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>分部名称：</span><Input v-model="editnewName" style="width:200px;" placeholder=""></Input>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="editFlagClose">关闭</Button>
                        <Button type="success" @click="editSave">保存</Button>
                    </div>
                </Modal>
                <Modal v-model="deleteFlagShow" width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>提示</span>
                    </p>
                    <div style="text-align:center">
                        <p>是否确定删除该行信息？</p>
                    </div>
                    <div slot="footer">
                        <Button  type="primary" @click="modalCancel">取消</Button>
                        <Button style="margin-right: 100px;" type="error" :loading="modal_loading" @click="del">删除</Button>
                    </div>
                </Modal>
             </row>
             <div style="margin-top:10px;">
                <Table @on-selection-change	="selectTable" :columns="column8" :data="data8"></Table>
             </div>
              <div style="margin-top:10px;float:right">
      <Page :total="total" size="small" show-elevator  @on-change="changepage"></Page>
    </div>
        </div>
    </div>
</template>
<script>
import util from 'utils';
import Cookies from "js-cookie";
    export default {
        data () {
            return {
                // 选中状态
                selectionData:[],
                total: 0,
                pageNum: 0,
                pageSize: 10,
                detailtotal: 0,
                detailpageNum: 0,
                detailData: [],
                topOrganize: '',
                topmOrganize: '',
                addnewName: '',
                editnewName: '',
                btnaddFlag :false,
                btndelFlag :false,
                btneditFlag:false,
                modifyTip: false,
                modifyTip2: false,
                errorTip: false,
                errorTip2: false,
                addFlagShow: false,
                editFlagShow: false,
                deleteFlagShow: false,
                column1: [
                    {
                        title: '机构名称',
                        key: 'organize',
                        align: 'center'
                    },
                    {
                        title: '分部数量',
                        align: 'center',
                        key: 'organizeCount'
                    },
                    {
                        title: '子分部数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '理财师数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '客户数量',
                        align: 'center',
                        key: 'customerCount'
                    }
                ],
                data1: [],
                 column8: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "序号",
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分部名称',
                        align: 'center',
                        key: 'organize'
                    },
                    {
                        title: '子分部数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '理财师数量',
                        align: 'center',
                        key: 'authoriCount'
                    },
                    {
                        title: '客户数量',
                        align: 'center',
                        key: 'customerCount'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                data8: []
            }
        },
        mounted() {
             // 摁扭权限
            let curMeunList =JSON.parse(localStorage.menuList); 
            for (let a in curMeunList){
            if(curMeunList[a].id==11){
                this.btnaddFlag = true
            }
            if(curMeunList[a].id==13){
                this.btndelFlag = true
            }
            if(curMeunList[a].id==12){
                this.btneditFlag = true
            }
            }
            this.initOrganize();
        },
        methods:{
            initOrganize() {
                util.ajax({
                    url: '/SJWCRM/InitOrganizeManagerMess', 
                    method:'post',
                    params: {
                        
                    }
                }).then(res => {
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                    this.data8 = res.data.data.rows;

                    // 保存一份请求的总数据
                    this.detailtotal = res.data.data.total;
                    this.detailpageNum = res.data.data.pageNum;
                    // this.detailpageSize = res.data.data.pageSize;
                    this.detailData = res.data.data.rows;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    this.handleList();
                    
                }).catch(err => {

                });
            },
            handleList() {
                this.total = this.detailtotal;
                if (this.detailtotal < 10) {
                        this.data8 = this.detailData;
                } else {
                    this.data8 = this.detailData.slice(0, 10);
                }
            },
            changepage(index) {
                this.detailData = this.detailData;

                var _start = (index - 1) * 10;
                var _end = index * 10;
                this.data8 = this.detailData.slice(_start, _end);
            },
            addFlag () {
                this.topOrganize = Cookies.get("topOrganize");
                this.addFlagShow = true;
            },
            addFlagClose () {
                this.addFlagShow = false;
                this.errorTip=false;
                this.errorTip2=false;
            },
            editFlag () {
                if(this.selectionData.length){
                    this.topmOrganize = this.selectionData[0].organize;
                    this.editFlagShow = true;
                }else{
                    this.$Message.warning('请选择一项！');
                }
            },
            editFlagClose () {
                this.editFlagShow = false;
            },
            deleteFlag() {
                if(this.selectionData.length){
                    this.deleteFlagShow = true;
                }else{
                    this.$Message.warning('请至少选择一项！');
                }
            },
            tipConfirm () {
                this.modifyTip = false;
            },
            tipConfirm2 () {
                this.modifyTip2 = false;
            },
            addSave () {
                if (!this.addnewName) {
                    this.errorTip=true;
                } else if (this.addnewName == 2) {
                    
                } else {
                    util.ajax({
                        url: '/SJWCRM/addOrganize', 
                        method:'post',
                        params: {
                            organizeId: this.topOrganize,
                            newName: this.addnewName
                        }
                    }).then(res => {
                        this.addFlagShow = false;
                        this.errorTip = false;
                        this.initOrganize();
                        
                    }).catch(err => {

                    });
                    }
            },
            editSave () {
                if(this.editnewName) {
                    util.ajax({
                        url: '/SJWCRM/ModifyOrganizeName', 
                        method:'post',
                        params: {
                            organizeId: this.params.organizeId,
                            newName: this.editnewName
                        }
                    }).then(res => {
                        this.editFlagShow = false
                        this.initOrganize();
                        
                    }).catch(err => {

                    });
                } else {
                    this.$Message.warning('请填写分布名称');
                }
            },
            del () {
                util.ajax({
                    url: '/SJWCRM/deleteOrganize', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId
                    }
                }).then(res => {
                    this.initOrganize();
                    this.modal_loading = false;
                    this.deleteFlagShow = false;
                    this.$Message.success('删除成功');
                }).catch(err => {

                });
            },
            modalCancel () {
                this.deleteFlagShow = false;
            },
            selectTable(selection){
               this.selectionData = selection;
            }    
        },
        created(){
            
        }
    }
</script>
