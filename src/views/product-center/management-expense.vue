<style lang="less">
  
</style>

<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <Modal  @on-cancel="jsgsCancel" :mask-closable="false" styles="z-index:1000;" width="800px" v-model="modal2" title="公式编辑" :loading="loading">
      <Row>
        <Col span="8">
        <Menu @on-select="route" :theme="theme2" accordion="true" style="min-height:100px;">
          <Submenu name="1">
            <template slot="title">系统变量
</template>
              <MenuItem v-for="item in findAllSystemVariables" :name="item.label+'&'+item.value+'&1'">{{item.label}}</MenuItem>
            </Submenu>
            <Submenu name="2">
<template slot="title">
  系统函数
</template>
                <MenuItem v-for="item in findAllSystemFunction" :name="item.label+'&'+item.value">{{item.label}}</MenuItem>
               
            </Submenu>
             <Submenu name="3">
<template slot="title">
  运算符号
</template>
                <MenuItem v-for="item in ysfhJs" :name="item.label+'&'+item.value">{{item.label}}</MenuItem>
               
            </Submenu>
          </Menu>
        </Col>        .
               <Col span="12">
                   <span>输入公式：</span>
                   
                    <Input style="margin-top:10px;" v-model="srgs" type="textarea" placeholder="Enter something..."></Input>
                   <Button style="margin-top:20px;" type="primary" size='small' @click='resetVarJs()'>重置</Button>
                     <Card style="margin-top:10px;background:#f1f1f1" dis-hover="true">
                        <div style="text-align:center;">
                            <h5>变量和函数的说明</h5>
                        </div>
                    </Card>
                     <span style="margin-top:20px;display:block;">公式试算：</span>
                     <ul>
                        <li style="margin-top:10px;" v-for="item in gsSsList">
                          <span>{{item.a}}:</span>
                          <Input v-model="item.jsgs"  placeholder="请输入..." style="width: 200px"/>
                        </li> 
                     </ul>
                     <div>
                        结果：<span style="word-break:break-all">{{gsjg}}</span></br>
                         <Button size='small' type="primary" @click="operationJs()">运算</Button>
                     </div>
               </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="vildGs()">验证</Button>
                <Button type="primary"@click="submitGs()">保存</Button>
            </div>
        </Modal>

        
    <i-button type="primary" small @click="lookFindAllFee">查看费用</i-button>
    <i-button type="primary" small @click="addFindAllFee">新增费用</i-button>
    <!-- 费用弹框 -->
        <Modal  width="800px" v-model="modal1" :title="titleDig"
        :loading="loading">
        <Form ref="FeeInfo" :model="FeeInfo" :label-width="100"  :rules="digValidate">
          <Row>
            <Col span="12">
                <FormItem label="费用名称："  prop="feeName">
                <i-input :disabled="digFlag" v-model="FeeInfo.feeName" placeholder="请输入..." style="width: 200px"></i-input>
                </FormItem>
            </Col>
             
             <Col span="12">
                <FormItem label="费用类型：" prop="feeType">
                  <i-select :disabled="digFlag" @on-change="digFeeTypeJs"   v-model="FeeInfo.feeType" span="6" style="width:200px">
                    <i-option v-for="item in findAllFeeTypeList1" :value="item.value">{{ item.label }}</i-option>
                </i-select>
              </FormItem>
            </Col>
          </Row>
           <Row style="margin-top:10px;">
             <Col span="12">
                <FormItem label="费用大类：" prop="feeCategory">
                <i-select v-model="FeeInfo.feeCategory" :disabled="digFlag"   span="6" style="width:200px">
                <i-option v-for="item in findAllCostCategory" :value="item.value">{{ item.label }}</i-option>
                </i-select>
                </FormItem>
            </Col>
              <Col span="12">
                 <FormItem label="费用项：" prop="feeTag">
                    <i-input v-model="FeeInfo.feeTag"  :disabled="digFlag" placeholder="请输入..." style="width: 200px"></i-input>
                </FormItem> 
            </Col>
          </Row>
          <Row style="margin-top:10px;">
                <FormItem label="计算公式：">
                  <i-input :disabled="digFlag" @on-focus="feeFormuJs" v-model="showFormula1" placeholder="请输入..." style="width: 400px"></i-input>
                </FormItem> 
          </Row>
          <Row style="margin-top:10px;">
              <Col span="12">
                   <FormItem label="收取形式：" prop="feeWay">
                      <Radio-group :disabled="digFlag" v-model="FeeInfo.feeWay">
                          <Radio v-for="item in findAllReceivingForm" :disabled="digFlag" :label="item.value"><span>{{item.label}}</span></Radio>
                          </Radio>
                      </Radio-group>
                    </FormItem>
              </Col>
          </Row>
        <Row style="margin-top:10px;">
            <Col span="24">
                <FormItem label="收款方：" prop="recCode">
                 <Radio-group v-model="FeeInfo.recCode">
                    <Radio  v-for="item in findAllRecipientParty" :disabled="digFlag" :label="item.value">
                        <span>{{item.label}}</span>
                    </Radio>
                </Radio-group>
                 </FormItem>
              </Col>
            </Col>
        </Row>
        <Row style="margin-top:10px;">
            <Col span="24">
                <FormItem label="付款方：" prop="payCode">
                  <Radio-group :disabled="digFlag" v-model="FeeInfo.payCode">
                      <Radio v-for="item in findAllPayer"  :disabled="digFlag" :label="item.value">
                          <span>{{item.label}}</span>
                      </Radio>
                  </Radio-group>
                </FormItem>
              </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="18">
                   <FormItem  label="描述：" prop="feeDesc">
                    <i-input :disabled="digFlag" v-model="FeeInfo.feeDesc" type="textarea" placeholder="Enter something..."></i-input>
                    </FormItem>
                </Col>
            </Row>
            </Form>
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
      <Page ref="pager"  :total="pageTotal"  show-elevator @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import util from "../../libs/util";
  export default {
    data() {
      return {
        // 开发
      //  urlBase:'',
      // 生产
       urlBase:'fee-master-web/',
        // 系统函数
        findAllSystemFunction: [],
        // 系统变量
        findAllSystemVariables: [],
        // 线上线下
        sqxs: '1',
       
        // 收款方
        skf: '1',
        // 付款方
        fkf: '1',
        // 描述
        ms: 'asd',
        //输入公式。
        srgs: '',
        // 传值
        srgs1: '',
        //查看修改新增
        modal1: false,
        titleDig: '',
        modal2: false,
        // 表格loading
        loading: false,
        //分页总数
        pageTotal: 0,
        // 模糊查询字段
        feeName: '',
        feeType: '',
        //费用类型
        findAllFeeTypeml: '-1',
        findAllFeeTypeList: [],
        findAllFeeTypeList1:[],
        //表单选中项
        selectionData: [],
        // 弹框费用名称
        digFeeName: '',
        digFeeType: '',
        // 新增 
        FeeInfo: {
          feeName: [],
          feeType: [],
          feeCategory: [],
          feeTag: [],
          feeWay: [],
          recCode: [],
          payCode: [],
          feeDesc: [],
          formula: '',
          status: 2 
        },
        // 控制弹框 可选
        digFlag: false,
        // 查询所有的付款方
        findAllPayer: [],
        //查询所有的收款方 
        findAllRecipientParty: [],
        // 查询所有的收取方式
        findAllReceivingForm: [],
        // 运算符号
        ysfhJs: [],
        //公式试算列表
        gsSsList:[],
        gsjg:'',
        // 运算保存 标识，
        ysBcFlag: false,
        // 判断 是修改还是查看
        showFormula1: '',
        isLookOrRe: 'add',
        // 修改的code
        reCode: '',
        // 费用大类
        findAllCostCategory: [],
        // 分页索引
        pageFIndex:'1',
        data8: [],
        // 表格的状态
        tableStatus:'',
        // 校验
        digValidate: {
          feeName: [
  
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
  
          ],
          feeType: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          feeCategory: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          feeTag: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          feeWay: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          recCode: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          payCode: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          feeDesc: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }]
         
        }
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
            title: "创建状态",
            key: "status",
            width: 150,
            align: 'center',
            //    "sortable": true
            render: (h, params) => {
               if (params.row.status == 2) {
                return h('div', '创建中');
              } else if(params.row.status == 1 ) {
                return h('div','启用')
              }else{
                return h('div', '禁用');
              }
            }
          },
          {
            title: "操作",
            key: "status",
            width: 150,
            align: 'center',
            render: (h, params) => {
              let curData = [];
              let dataList = [
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
                      if (params.row.status == 0) {
                        this.$Message.error('禁用状态，不可修改')
                      } else {
                        this.FeeInfo.status = params.row.status;
                        // 修改 
                        this.reCode = params.row.feeCode;
                        this.isLookOrRe = 're';
                        util.ajax(this.urlBase+'v1/feeInfo/getAllFeeInfoByFeeCode', {
                          method: 'get',
                          params: {
                            feeCode: this.reCode
                          }
                        }).then(res => {
                          this.FeeInfo = res.data.data;
                          this.FeeInfo.eformula = res.data.data.feeFormulaVO.eformula;
                           this.FeeInfo.cformula = res.data.data.feeFormulaVO.cformula;
                          this.showFormula1 = res.data.data.feeFormulaVO.cformula;
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
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                        this.FeeInfo.status = params.row.status;
                        // 修改 
                        this.reCode = params.row.feeCode;
                        this.isLookOrRe = 'look';
                        util.ajax(this.urlBase+'v1/feeInfo/getAllFeeInfoByFeeCode', {
                          method: 'get',
                          params: {
                            feeCode: this.reCode
                          }
                        }).then(res => {
                          this.FeeInfo = res.data.data;
                          this.showFormula1 = res.data.data.feeFormulaVO.cformula;
                          this.digFlag = true;
                          this.titleDig = "查看费用";
                          this.modal1 = true;
                        })
                      
                    }
                  }
                }, '查看'),
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
                          url: this.urlBase+"v1/feeInfo/updateFeeStatusToEnable",
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
                         
                          this.findAllFeeList(this.pageFIndex);
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
                          url: this.urlBase+"v1/feeInfo/updateFeeStatusToOff",
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
                           this.findAllFeeList(this.pageFIndex);
                        })
                    }
                  }
                }, '禁用')
              ];
              
              // 判断 status 来进行判断 摁扭展示
              if (params.row.status == 2) {
                curData.push(dataList[0],dataList[2])
              } else if(params.row.status == 1) {
                 curData.push(dataList[1],dataList[3])
              }else{
                 curData.push(dataList[1])
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
      this.findAllFeeType1();
      this.feeInfoDig();
    },
    created() {
  
    },
    watch: {
      modal1(val) {
        if (!val) {
          if (!this.modal2) {
            this.$refs["FeeInfo"].resetFields();
            this.srgs = '';
            this.srgs1 = '';
            this.showFormula1 = '';
            this.eformula = null;
            this.cformula = null;
          }
        }
      },
      modal2(val) {
        if (!val) {
          this.ysBcFlag = false;
          this.srgs = '';
          this.srgs1 = '';
          this.gsjg = '';
          this.gsSsList = [];
        }
      }
    },
    methods: {
      //计算公式
      route(name) {
        this.srgs += name.split('&')[0]
        this.srgs1 += name.split('&')[1];
        if(name.split('&')[2]==1){
          if(this.gsSsList.length>0){
            let tempArr = [];
            let tempNameB = name.split('&')[1];
            for(let i=0;i<this.gsSsList.length;i++) {
              tempArr.push(this.gsSsList[i].b)
            }
            if(!tempArr.includes(tempNameB)){
              this.gsSsList.push({
                    a:name.split('&')[0],
                    b:name.split('&')[1],
                    jsgs:''
                  })
            }
          }else{
             this.gsSsList.push({
                    a:name.split('&')[0],
                    b:name.split('&')[1],
                    jsgs:''
                  })
          }
        }
        // 去重
        //console.log(this.gsSsList)
      },
      operationJs(){
          let curObj= {};
          this.gsSsList.forEach(function(item,index){
            curObj[item.b] = item.jsgs;
          })
          curObj.formula = this.srgs;
          util.ajax({
            url: this.urlBase+"v1/feeFormula/trialCalculation",
            method: "post",
            data: curObj
            
          })
          .then(res => {
              if(res.data.code==20000){
                this.gsjg = res.data.data
              }else{
                this.$Message.error(res.data.msg)
              }
          })
      },
      // 验证公式
      vildGs() {
        util.ajax({
            url: this.urlBase+"v1/feeFormula/formulaBudget",
            method: "get",
            params: {
              formula: this.srgs
            }
          })
          .then(res => {
            console.log(res)
            if (res.data.code == 20000) {
              this.$Message.success(res.data.msg)
              this.ysBcFlag = true;
            } else {
              this.$Message.error(res.data.msg)
              this.ysBcFlag = false;
            }
          })
      },
      // 关闭公式弹框
      jsgsCancel(){
          this.modal2 = false;
          this.modal1 = true;
      },
      // 保存公式
      submitGs() {
        if (this.ysBcFlag == true) {
          this.modal2 = false;
          this.modal1 = true;
          this.showFormula1 = this.srgs;
          this.FeeInfo.eformula = this.srgs1;
          this.FeeInfo.cformula = this.srgs;

        } else {
          this.$Message.error('请验证！')
        }
      },
      resetVarJs(){
        this.srgs = '';
        this.srgs1 = '';
        this.gsSsList = [];
        this.gsjg = '';
      },
      // 表格数据
      findAllFeeList(index,flag) {
        index = index || 1;
        this.loading = true;
        let b = 'findAllFeeList';
        let a = {
            pageNumber: index,
            pageSize: 10
        }
        if(flag){
          a = {
            feeName: this.feeName,
            feeType: this.findAllFeeTypeml,
            pageNumber: index,
            pageSize: 10,
          }
          b = 'findFeeListByNameAndType'
        }
      
       
        util.ajax({
            url: this.urlBase+"v1/feeInfo/"+b,
            method: "get",
            params: a
          })
          .then(res => {
            this.data8 = res.data.data.content;
            this.pageTotal = res.data.data.totalElements;
            this.loading = false;
          })
      },
      // 分页
      pageChange(index) {
        this.pageFIndex = index;
        this.findAllFeeList(index,true)
      },
      // 搜索
      searchClick() {
        this.loading = true;
        this.$refs.pager.currentPage = 1;
        util.ajax(this.urlBase+'v1/feeInfo/findFeeListByNameAndType', {
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
            this.pageTotal = res.data.data.totalElements;
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
      digFeeTypeJs(s) {
        console.log(s);
        this.digFeeType = s;
         util.ajax(this.urlBase+'v1/feeInfo/findAllCategoryByType', {
          method: 'get',
          params	:{
            feeType:s
          },
        }).then(res => {
          console.log(res.data.data)
          this.findAllCostCategory = res.data.data;
        })
      },
      // 费用类型获取
      findAllFeeType() {
        util.ajax(this.urlBase+'v1/feeInfo/findAllFeeType', {
          method: 'get',
        }).then(res => {
          this.findAllFeeTypeList = res.data.data;
        })
      },
       findAllFeeType1() {
        util.ajax(this.urlBase+'v1/feeInfo/findAddFeeType', {
          method: 'get',
        }).then(res => {
          this.findAllFeeTypeList1 = res.data.data;
        })
      },
      changeFindSec(selection) {
        this.selectionData = selection;
      },
      //判断表格选项
      isSelectionData() {
        let flag = false;
        if (this.selectionData.length > 1) {
          this.$Message.error('只能选择一项');
          flag = false;
        } else if (this.selectionData.length == 1) {
          flag = true;
        } else {
          this.$Message.error('请选择一项');
          flag = false;
        }
        return flag;
      },
      // 表单中，单选信息
      feeInfoDig() {
        util.ajax(this.urlBase+'v1/feeInfo/findAllPayer', {
          method: 'get',
        }).then(res => {
          this.findAllPayer = res.data.data;
        })
        util.ajax(this.urlBase+'v1/feeInfo/findAllRecipientParty', {
          method: 'get',
        }).then(res => {
          this.findAllRecipientParty = res.data.data;
        })
        util.ajax(this.urlBase+'v1/feeInfo/findAllReceivingForm', {
          method: 'get',
        }).then(res => {
          this.findAllReceivingForm = res.data.data;
        })
       
  
      },
      // 关闭弹框
      cancelDig() {
        this.modal1 = false;
  
      },
      // 保存 
      submitDig() {
        console.log(this.FeeInfo)
        // 保存逻辑
        delete this.FeeInfo['feeFormulaVO'];
          this.$refs["FeeInfo"].validate((valid) => {
                  if (valid) {
                        if (this.isLookOrRe == 'add') {
          //新增
         
          util.ajax(this.urlBase+'v1/feeInfo/AddFee', {
            method: 'post',
            data: this.FeeInfo
  
          }).then(res => {
            console.log(res)
            if(res.data.code==20000){
                this.$Message.success(res.data.msg)
                this.modal1 = false;
                this.findAllFeeList();
            }else if(res.data.code==10008||res.data.code==10005){
              
              this.$Message.error(res.data.details[0]||res.data.msg)
            }
            
            else{
              this.$Message.error(res.data.msg)
            }
          
          })
        } else {
          // 修改
          this.FeeInfo.feeCode = this.reCode;
          this.FeeInfo.createTime = '';
         util.ajax(this.urlBase+'v1/feeInfo/modifyFeeInfo', {
            method: 'put',
            data: this.FeeInfo
  
          }).then(res => {
            console.log(res)
            if(res.data.code==20000){
                this.$Message.success(res.data.msg)
                this.modal1 = false;
                this.findAllFeeList();
            }else if(res.data.code==10008||res.data.code===10005){
                this.$Message.error(res.data.details[0]||res.data.msg)
            }else{
              this.$Message.error(res.data.msg)
            }
          
          })
        }
                    }
           })
        
      },
      // 计算公式弹框
      feeFormuJs() {
        this.srgs = this.showFormula1;
        this.modal2 = true;
        this.modal1 = false;
        util.ajax(this.urlBase+'v1/feeInfo/findAllSystemVariables', {
          method: 'get'
  
        }).then(res => {
          this.findAllSystemVariables = res.data.data;
        })
        util.ajax(this.urlBase+'v1/feeInfo/findAllSystemFunction', {
          method: 'get'
        }).then(res => {
          this.findAllSystemFunction = res.data.data;
        })
        util.ajax(this.urlBase+'v1/feeInfo/findAllOperation', {
          method: 'get'
        }).then(res => {
          this.ysfhJs = res.data.data;
        })
      util.ajax(this.urlBase+'v1/feeFormula/findFactorMapByCFormula', {
          method: 'get',
          params:{
            cFormula:this.showFormula1
          }
        }).then(res => {
          console.log(res.data.data)
          if(res.data.data){
            let curObj = res.data.data;
            for(let k in curObj){
              this.gsSsList.push({
                a:k,
                b:curObj[k],
                jsgs:''
              })
            }
          }
        })
  
      },
      // 查看弹框
      lookFindAllFee() {
        let flag = this.isSelectionData();
  
        if (flag) {
          util.ajax(this.urlBase+'v1/feeInfo/getAllFeeInfoByFeeCode', {
            method: 'get',
            params: {
              feeCode: this.selectionData[0].feeCode
            }
          }).then(res => {
  
            this.FeeInfo = res.data.data;
            this.showFormula1 = res.data.data.feeFormulaVO.cformula;
             this.FeeInfo.eformula = res.data.data.feeFormulaVO.cformula;
            this.digFlag = true;
            this.titleDig = "查看费用";
            this.modal1 = true;
  
          })
  
        }
  
      },
      // 新增弹框
      addFindAllFee() {
        this.FeeInfo.status = 2;
        this.isLookOrRe = 'add';
        this.digFlag = false;
        this.titleDig = "新增费用";
        this.modal1 = true;
      },
    }
  };
</script>
