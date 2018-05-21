<style lang="less">
    @import './orgons-branch.less';
</style>

<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:1000px">
            <Table border :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">
            <row>
                <span>分部详情</span>
                <Button type="primary" v-show='btnaddFlag' icon="plus-round" @click="addFlag">添加</Button>
                <Button type="primary" v-show="btneditFlag" icon="edit" @click="editFlag">修改</Button>
                <Button type="error" v-show="btndelFlag" icon="trash-a" @click="deleteFlag">删除</Button>
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
                        <span>该子分部下面有理财师，不能删除。</span>
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
                        <span>分部名称：</span><Input  v-model="addnewName" style="width:200px;" placeholder=""></Input>
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
                        <span>机构名称：</span><span v-model="topOrganize">{{topOrganize}}</span>
                    </div>
                    <!-- <div style="margin-top:20px;">
                        <span>分部名称：</span>
                        <i-select v-model="newName" span="6" style="width:200px">
                            <i-option v-for="item in cityList1" :value="item.value">{{ item.label }}</i-option>
                        </i-select>
                    </div> -->
                    <div style="margin-top:20px;">
                        <span>分部名称：</span><Input v-model="sonNewName" style="width:200px;" placeholder=""></Input>
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
            <Page :total="total" size="small" show-elevator  show-total @on-change="changepage"></Page>
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
                topOrganize: '',
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
                addnewName: '',
                column1: [
                    {
                        title: '分部名称',
                        key: 'newName',
                        align: 'center'
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
                cityList1: [
                    {
                        value: 'nanjing',
                        label: '链家'
                    },
                    {
                        value: 'woaiwojia',
                        label: '我爱我家'
                    }
                ],
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
            data8: []
            }
        },
        mounted() {
             // 摁扭权限
      let curMeunList =JSON.parse(localStorage.menuList); 
            for (let a in curMeunList){
            if(curMeunList[a].id==15){
                this.btnaddFlag = true
            }
            if(curMeunList[a].id==17){
                this.btndelFlag = true
            }
            if(curMeunList[a].id==16){
                this.btneditFlag = true
            }
            }
            this.initBranchOrganize();
        },
        methods:{
            initBranchOrganize() {
                util.ajax({
                    url: '/SJWCRM/InitOrganizeSonManagerMess', 
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
                this.topOrganize = Cookies.get('topOrganize');
                this.addFlagShow = true;
            },
            addFlagClose () {
                this.addFlagShow = false;
                this.errorTip=false;
                this.errorTip2=false;
            },
            editFlag () {
                this.topOrganize = Cookies.get('topOrganize');
                if(this.selectionData.length){
                    this.editFlagShow = true;
                }else{
                    this.$Message.warning('请选择一项！');
                }
            },
            editFlagClose () {
                this.editFlagShow = false;
            },
            deleteFlag () {
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
                } else {
                    util.ajax({
                        url: '/SJWCRM/addOrganizeSon', 
                        method:'post',
                        params: {
                            id: this.id,
                            newName: this.newName
                        }
                    }).then(res => {
                        this.addFlagShow = false
                        this.initBranchOrganize();
                    }).catch(err => {

                    });
                }
            },
            editSave () {
                if (this.sonNewName) {
                    util.ajax({
                        url: '/SJWCRM/ModifyOrganizeSonName', 
                        method:'post',
                        params: {
                            id: this.id,
                            newName: this.newName
                        }
                    }).then(res => {
                        this.editFlagShow = false;
                        this.errorTip = false;
                        this.initBranchOrganize();
                    }).catch(err => {

                    });
                } else  {
                    this.$Message.warning('请输入子分部名称！');
                }
                
            },
            del () {
                util.ajax({
                    url: '/SJWCRM/deleteOrganizeSon', 
                    method:'post',
                    params: {
                        id: this.id,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initBranchOrganize();
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
