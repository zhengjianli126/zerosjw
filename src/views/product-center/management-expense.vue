<style lang="less">
  
</style>

<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <i-button type="primary" @click="modal2 = true">显示对话框1</i-button>
    <Modal styles="z-index:1000;" width="800px" v-model="modal2" title="公式编辑" :loading="loading">
      <Row>
        <Col span="8">
        <Menu @on-select="route" :theme="theme2" accordion="true" style="min-height:100px;">
          <Submenu name="1">
            <template slot="title">系统变量
</template>
              <MenuItem v-for="item in findAllSystemVariables" :name="item.label+'-'+item.value">{{item.label}}</MenuItem>
            </Submenu>
            <Submenu name="2">
<template slot="title">
  系统函数
</template>
                <MenuItem v-for="item in findAllSystemFunction" :name="item.label">{{item.label}}</MenuItem>
               
            </Submenu>
             <Submenu name="3">
<template slot="title">
  运算符号
</template>
                <MenuItem v-for="item in ysfhJs" :name="item.label">{{item.label}}</MenuItem>
               
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
                  <i-select  :disabled="digFlag" @on-change="digFeeTypeJs"   v-model="FeeInfo.feeType" span="6" style="width:200px">
                    <i-option v-for="item in findAllFeeTypeList" :value="item.value">{{ item.label }}</i-option>
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
                <FormItem label="计算公式：" >
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
      <Page :total="pageTotal"  show-elevator @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import util from "../../libs/util";
  export default {
    data() {
      return {
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
        findAllFeeTypeml: '1',
        findAllFeeTypeList: [],
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
          status: 1
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
        // 运算保存 标识，
        ysBcFlag: false,
        // 判断 是修改还是查看
        showFormula1: '',
        isLookOrRe: 'add',
        // 修改的code
        reCode: '',
        // 费用大类
        findAllCostCategory: [],
  
        data8: [],
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
          }],
  
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
                      if (params.row.status == 0) {
                        this.$Message.error('禁用状态，不可修改')
                      } else {
                        this.FeeInfo.status = params.row.status;
                        // 修改 
                        this.reCode = params.row.feeCode;
                        this.isLookOrRe = 're';
                        util.ajax('v1/feeInfo/getAllFeeInfoByFeeCode', {
                          method: 'get',
                          params: {
                            feeCode: this.reCode
                          }
                        }).then(res => {
                          this.FeeInfo = res.data.data;
                          this.FeeInfo.formula = res.data.data.feeFormulaVO.formula;
                          this.showFormula1 = res.data.data.feeFormulaVO.formula;
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
    watch: {
      modal1(val) {
        if (!val) {
          if (!this.modal2) {
            this.$refs["FeeInfo"].resetFields();
            this.srgs = '';
            this.srgs1 = '';
            this.showFormula1 = '';
          }
        }
      },
      modal2(val) {
        if (!val) {
          this.ysBcFlag = false;
          this.srgs = '';

        }
      }
    },
    methods: {
      //计算公式
      route(name) {
  
        this.srgs += name.split('-')[0];
        this.srgs1 += name.split('-')[1];
  
      },
  
      // 验证公式
      vildGs() {
        util.ajax({
            url: "v1/feeFormula/formulaBudget",
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
      // 保存公式
      submitGs() {
        if (this.ysBcFlag == true) {
          this.modal2 = false;
          this.modal1 = true;
          this.showFormula1 = this.srgs;
          this.FeeInfo.formula = this.srgs1;
        } else {
          this.$Message.error('请验证！')
        }
      },
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
            this.pageTotal = res.data.data.totalElements;
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
        if (this.isLookOrRe == 'add') {
          //新增
  
          util.ajax('v1/feeInfo/AddFee', {
            method: 'post',
            data: this.FeeInfo
  
          }).then(res => {
            console.log(res)
            if(res.data.code==20000){
                this.$Message.success(res.data.msg)
                this.modal1 = false;
                this.findAllFeeList();
            }else{
              this.$Message.error(res.data.msg)
            }
          
          })
        } else {
          // 修改
          this.FeeInfo.feeCode = this.reCode;
          this.FeeInfo.createTime = '';
         util.ajax('v1/feeInfo/modifyFeeInfo', {
            method: 'put',
            data: this.FeeInfo
  
          }).then(res => {
            console.log(res)
            if(res.data.code==20000){
                this.$Message.success(res.data.msg)
                this.modal1 = false;
                this.findAllFeeList();
            }else{
              this.$Message.error(res.data.msg)
            }
          
          })
        }
      },
      // 计算公式弹框
      feeFormuJs() {
  
        this.modal2 = true;
        this.modal1 = false;
        util.ajax('v1/feeInfo/findAllSystemVariables', {
          method: 'get'
  
        }).then(res => {
          this.findAllSystemVariables = res.data.data;
        })
        util.ajax('v1/feeInfo/findAllSystemFunction', {
          method: 'get'
        }).then(res => {
          this.findAllSystemFunction = res.data.data;
        })
        util.ajax('v1/feeInfo/findAllOperation', {
          method: 'get'
        }).then(res => {
          this.ysfhJs = res.data.data;
        })
  
  
      },
      // 查看弹框
      lookFindAllFee() {
        let flag = this.isSelectionData();
  
        if (flag) {
          util.ajax('v1/feeInfo/getAllFeeInfoByFeeCode', {
            method: 'get',
            params: {
              feeCode: this.selectionData[0].feeCode
            }
          }).then(res => {
  
            this.FeeInfo = res.data.data;
            this.showFormula1 = res.data.data.feeFormulaVO.formula;
            this.digFlag = true;
            this.titleDig = "查看费用";
            this.modal1 = true;
  
          })
  
        }
  
      },
      // 新增弹框
      addFindAllFee() {
        this.FeeInfo.status = 1;
        this.isLookOrRe = 'add';
        this.digFlag = false;
        this.titleDig = "新增费用";
        this.modal1 = true;
      },
    }
  };
</script>
