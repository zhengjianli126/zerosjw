<style lang="less">
  
</style>

<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <i-button type="primary" @click="modal2 = true">显示对话框1</i-button>
    <Modal width="800px" v-model="modal2" title="公式编辑" :loading="loading">
      <Row>
        <Col span="8">
        <Menu :theme="theme2" accordion="true" style="min-height:100px;">
          <Submenu name="1">
            <template slot="title">
                                    系统变量
</template>
                            <MenuItem name="1-1">贷款本金</MenuItem>
                            <MenuItem name="1-2">贷款期数</MenuItem>
                            <MenuItem name="1-3">逾期天数</MenuItem>
                            <MenuItem name="1-4">当期应收本金</MenuItem>
                        </Submenu>
                        <Submenu name="2">
<template slot="title">
   系统函数
</template>
                            <MenuItem name="1-1">贷款本金</MenuItem>
                            <MenuItem name="1-2">贷款期数</MenuItem>
                            <MenuItem name="1-3">逾期天数</MenuItem>
                            <MenuItem name="1-4">当期应收本金</MenuItem>
                        </Submenu>
                          <Submenu name="2">
<template slot="title">
   系统函数
</template>
                            <MenuItem name="1-1">贷款本金</MenuItem>
                            <MenuItem name="1-2">贷款期数</MenuItem>
                            <MenuItem name="1-3">逾期天数</MenuItem>
                            <MenuItem name="1-4">当期应收本金</MenuItem>
                        </Submenu>
                          <Submenu name="2">
<template slot="title">
   系统函数
</template>
                            <MenuItem name="1-1">贷款本金</MenuItem>
                            <MenuItem name="1-2">贷款期数</MenuItem>
                            <MenuItem name="1-3">逾期天数</MenuItem>
                            <MenuItem name="1-4">当期应收本金</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
               <Col span="12">
                   <span>输入公式：</span>
                    <Input style="margin-top:10px;" v-model="srgs" type="textarea" placeholder="Enter something..."></Input>
                     <Card style="margin-top:10px;background:#f1f1f1" dis-hover="true">
                        <div style="text-align:center;">
                            <h5>变量和函数的说明</h5>
                        </div>
                    </Card>
               </Col>
            </Row>
            <div slot="footer">
                <Button type="primary">验证</Button>
                <Button type="primary">保存</Button>
            </div>
        </Modal>

        
    <i-button type="primary" small @click="lookFindAllFee">查看费用</i-button>
    <i-button type="primary" small @click="addFindAllFee">新增费用</i-button>
    <!-- 费用弹框 -->
        <Modal width="800px" v-model="modal1" :title="titleDig"
        :loading="loading">

          <Row>
            <Col span="12">
                <span>费用名称：</span><i-input :disabled="digFlag" v-model="FeeInfo.feeName" placeholder="请输入..." style="width: 200px"></i-input>
            </Col>
             <Col span="12">
                <span>费用类型：&nbsp;&nbsp;&nbsp;</span><i-select  :disabled="digFlag" @on-change="digFeeTypeJs"   v-model="FeeInfo.feeType" span="6" style="width:200px">
          <i-option v-for="item in findAllFeeTypeList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
            </Col>
          </Row>
           <Row style="margin-top:10px;">
             <Col span="12">
                <span>费用大类：</span> <i-select v-model="FeeInfo.feeCategory" :disabled="digFlag"   span="6" style="width:200px">
        <i-option v-for="item in findAllCostCategory" :value="item.value">{{ item.label }}</i-option>
        </i-select>
            </Col>
              <Col span="12">
                <span>费用项：</span><i-input v-model="FeeInfo.feeTag"  :disabled="digFlag" placeholder="请输入..." style="width: 200px"></i-input>
            </Col>
          </Row>
          <Row style="margin-top:10px;">
               <span>计算公式：</span><i-input :disabled="digFlag" placeholder="请输入..." style="width: 400px"></i-input>
          </Row>
          <Row style="margin-top:10px;">
              <Col span="12">
                  <span>收取形式：</span>
                 <Radio-group :disabled="digFlag" v-model="FeeInfo.feeWay">
                    <Radio v-for="item in findAllReceivingForm" :disabled="digFlag" :label="item.value"><span>{{item.label}}</span></Radio>
                    </Radio>
                </Radio-group>
              </Col>
          </Row>
        <Row style="margin-top:10px;">
            <Col span="24">
                <span>收款方：&nbsp;&nbsp;&nbsp;</span>
                 <Radio-group v-model="FeeInfo.recCode">
                    <Radio  v-for="item in findAllRecipientParty" :disabled="digFlag" :label="item.value">
                        <span>{{item.label}}</span>
                    </Radio>
                </Radio-group>
              </Col>
            </Col>
        </Row>
        <Row style="margin-top:10px;">
            <Col span="24">
                <span>付款方：&nbsp;&nbsp;&nbsp;</span>
                 <Radio-group :disabled="digFlag" v-model="FeeInfo.payCode">
                    <Radio v-for="item in findAllPayer"  :disabled="digFlag" :label="item.value">
                        <span>{{item.label}}</span>
                    </Radio>
                </Radio-group>
              </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="2">
                    <span>描述：</span>
                </Col>
                <Col span="16">
                    <i-input :disabled="digFlag" v-model="FeeInfo.feeDesc" type="textarea" placeholder="Enter something..."></i-input>
                </Col>
            </Row>
             <div slot="footer">
                <Button type="ghost" @click="cancelDig">取消</Button>
                <Button v-show="!digFlag" @click="submitDig" type="primary">保存</Button>
            </div>
        </Modal>
    <!-- 搜索 -->
    <Row style="margin-top:10px">
       <span>费用名称：</span><i-input v-model="feeName" placeholder="请输入..." style="width: 300px"></i-input>
        <span>类型：</span>
       <i-select  @on-change="findAllFeeTypeJs"   v-model="findAllFeeTypeml" span="6" style="width:200px">
          <i-option v-for="item in findAllFeeTypeList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
        <i-button style="margin-left:20px;" type="primary" icon="ios-search" @click="searchClick()">搜索</i-button>
    </Row>
    <!-- 表格 -->
    <div style="clear:both;padding-top:20px;">
      <Table @on-selection-change="changeFindSec" :loading="loading" border :columns="tableColumns3" :data="data8" size="small" ref="table"></Table>
    </div>
    <!-- 分页 -->
    <div style="margin-top:10px;float:right">
      <Page :total="pageTotal"  show-elevator @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import util from "../../libs/util";
  export default {
    data() {
      return {
        // 线上线下
        sqxs: '1',
        // 收款方
        skf: '1',
        // 付款方
        fkf: '1',
        // 描述
        ms: 'asd',
        //输入公式。
        srgs: '1',
        //查看修改新增
        modal1: false,
        titleDig:'',
        modal2: false,
        // 表格loading
        loading: false,
        //分页总数
        pageTotal: 0,
        // 模糊查询字段
        feeName: '',
        feeType: '',
        //费用类型
        findAllFeeTypeml: '1',
        findAllFeeTypeList: [],
        //表单选中项
        selectionData:[],
        // 弹框费用名称
        digFeeName:'',
        digFeeType:'',
        // 新增 
        FeeInfo:[],
        // 控制弹框 可选
        digFlag:false,
        // 查询所有的付款方
        findAllPayer:[],
        //查询所有的收款方 
        findAllRecipientParty:[],
        // 查询所有的收取方式
        findAllReceivingForm:[],
        // 判断 是修改还是查看
        isLookOrRe:'add',
        // 修改的code
        reCode:'',
        // 费用大类
        findAllCostCategory:[],
        
        data8: []
      };
    },
    computed: {
      tableColumns3() {
        let columns = [{
            title: "序号",
            type: "index",
            width: 80
          },
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: "费用名称",
            key: "feeName",
            width: 150,
            align: 'center'
          },
          {
            title: "类型",
            key: "feeType",
            width: 150,
            align: 'center'
          },
          {
            title: "收款方",
            key: "recCode",
            width: 150,
            align: 'center'
            //    "sortable": true
          },
          {
            title: "付款方",
            key: "payCode",
            width: 150,
            align: 'center'
            //    "sortable": true
          },
          {
            title: "公式",
            key: "formula",
            width: 150,
            align: 'center'
            //    "sortable": true
          },
          {
            title: "描述",
            key: "feeDesc",
            width: 150,
            align: 'center'
            //    "sortable": true
          },
          {
            title: "操作",
            key: "status",
            width: 150,
            align: 'center',
            render: (h, params) => {
              let curData = [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                        if(params.row.status==0){
                            this.$Message.error('禁用状态，不可修改')
                        }else{
                            // 修改 
                            this.reCode = params.row.feeCode;
                            this.isLookOrRe ='re';
                            util.ajax('v1/feeInfo/getAllFeeInfoByFeeCode', {
                              method: 'get',
                              params:{
                                feeCode:this.reCode
                              }
                            }).then(res => {
                                this.FeeInfo = res.data.data;
                                this.digFlag = false;
                                this.titleDig = "修改费用";
                                this.modal1 = true;
                            })
                        }
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.loading = true;
                      util.ajax({
                          url: "v1/feeInfo/updateFeeStatusToEnable",
                          method: "put",
                          params: {
                            feeCode: params.row.feeCode
                          }
                        })
                        .then(res => {
                          if (res.data.msg == 20000) {
                            this.$Message.success(res.data.msg);
                          } else {
                            this.$Message.success(res.data.msg);
                          }
                          this.findAllFeeList();
                        })
                    }
                  }
                }, '启用'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.loading = true;
                      util.ajax({
                          url: "v1/feeInfo/updateFeeStatusToOff",
                          method: "put",
                          params: {
                            feeCode: params.row.feeCode
                          }
                        })
                        .then(res => {
                          if (res.data.msg == 20000) {
                            this.$Message.success(res.data.msg);
                          } else {
                            this.$Message.success(res.data.msg);
                          }
                          this.findAllFeeList();
                        })
                    }
                  }
                }, '停用')
              ];
              // 判断 status 来进行判断 摁扭展示
              if (params.row.status == 0) {
                curData.splice(2, 1);
              } else {
                curData.splice(1, 1);
              }
              return h('div', curData);
            }
          }
        ];
        return columns;
      }
     
    },
    mounted() {
      this.findAllFeeList();
      this.findAllFeeType();
      this.feeInfoDig();
    },
    created() {
  
    },
    watch:{
        modal1(val){
          if(!val){
             // 清除弹框数据
          }
        }
    },
    methods: {
      // 表格数据
      findAllFeeList(index) {
        index = index || 1;
        this.loading = true;
        util.ajax({
            url: "v1/feeInfo/findAllFeeList",
            method: "get",
            params: {
              pageNumber: index,
              pageSize: 10
            }
          })
          .then(res => {
            this.data8 = res.data.data.content;
            this.pageTotal = res.data.data.totalPages;
            this.loading = false;
          })
      },
      // 分页
      pageChange(index) {
        this.findAllFeeList(index)
      },
      // 搜索
      searchClick() {
        this.loading = true;
        util.ajax('v1/feeInfo/findFeeListByNameAndType', {
          method: 'get',
          params: {
            feeName: this.feeName,
            feeType: this.findAllFeeTypeml,
            pageNumber: 1,
            pageSize: 10,
          }
        }).then(res => {
          if (res.data.code == 20000) {
            this.data8 = res.data.data.content;
            this.pageTotal = res.data.data.totalPages;
            this.loading = false;
          } else {
            this.$Message.error(res.data.msg);
            this.loading = false;
          }
        })
      },
      // 费用类型切换
      findAllFeeTypeJs(s) {
        this.findAllFeeTypeml = s;
      },
      digFeeTypeJs(s){
        this.digFeeType = s;
      },
      // 费用类型获取
      findAllFeeType() {
        util.ajax('v1/feeInfo/findAllFeeType', {
          method: 'get',
        }).then(res => {
          this.findAllFeeTypeList = res.data.data;
        })
      },
      changeFindSec(selection){
        this.selectionData = selection;
      },
      //判断表格选项
      isSelectionData(){
        let flag = false ;
        if(this.selectionData.length>1){
          this.$Message.error('只能选择一项');
          flag = false;
        }else if(this.selectionData.length==1){
            flag = true;
        }else{
          this.$Message.error('请选择一项');
          flag = false;
        }
        return flag ;
      },
      // 表单中，单选信息
      feeInfoDig(){
           util.ajax('v1/feeInfo/findAllPayer', {
              method: 'get',
            }).then(res => {
               this.findAllPayer = res.data.data;
            })
            util.ajax('v1/feeInfo/findAllRecipientParty', {
              method: 'get',
            }).then(res => {
               this.findAllRecipientParty = res.data.data;
            })
            util.ajax('v1/feeInfo/findAllReceivingForm', {
              method: 'get',
            }).then(res => {
               this.findAllReceivingForm = res.data.data;
            })
            util.ajax('v1/feeInfo/findAllCostCategory', {
              method: 'get',
            }).then(res => {
               this.findAllCostCategory = res.data.data;
            })

      } ,
      // 关闭弹框
      cancelDig(){
          this.modal1 = false;
          
      },
      // 保存 
      submitDig(){
        console.log(this.FeeInfo)
        // 保存逻辑
        if(this.isLookOrRe=='add'){
            //新增
        }else{
          // 修改
        
      }
      },
      // 查看弹框
      lookFindAllFee(){
        let flag = this.isSelectionData();
        
          if(flag){
           util.ajax('v1/feeInfo/getAllFeeInfoByFeeCode', {
              method: 'get',
              params:{
                feeCode:this.selectionData[0].feeCode
              }
            }).then(res => {
                
                this.FeeInfo = res.data.data;
                this.digFlag = true;
                this.titleDig = "查看费用";
                this.modal1 = true;
            })
           
          }
          
      },
      // 新增弹框
      addFindAllFee(){
        
              this.isLookOrRe = 'add';
              this.digFlag = false;
              this.titleDig = "新增费用";
              this.modal1 = true;
      },
    }
  };
</script>
