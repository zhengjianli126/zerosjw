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
        <Modal width="800px" ok-text="保存" v-model="modal1" :title="titleDig"
        :loading="loading">
          <Row>
            <Col span="12">
                <span>费用名称：</span><i-input v-model="digFeeName" placeholder="请输入..." style="width: 200px"></i-input>
            </Col>
             <Col span="12">
                <span>费用类型：&nbsp;&nbsp;&nbsp;</span><i-select  @on-change="digFeeTypeJs"   v-model="digFeeType" span="6" style="width:200px">
          <i-option v-for="item in findAllFeeTypeList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
            </Col>
          </Row>
           <Row style="margin-top:10px;">
             <Col span="12">
                <span>费用大类：</span> <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
        <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
        </i-select>
            </Col>
              <Col span="12">
                <span>费用项：</span><i-input  placeholder="请输入..." style="width: 200px"></i-input>
            </Col>
          </Row>
          <Row style="margin-top:10px;">
               <span>计算公式：</span><i-input  placeholder="请输入..." style="width: 400px"></i-input>
          </Row>
          <Row style="margin-top:10px;">
              <Col span="12">
                  <span>收取形式：</span>
                 <Radio-group v-model="sqxs">
                    <Radio label="0">
                        <span>线上</span>
                    </Radio>
                    <Radio label="1">
                        <span>线下</span>
                    </Radio>
                </Radio-group>
              </Col>
          </Row>
        <Row style="margin-top:10px;">
            <Col span="24">
                <span>收款方：&nbsp;&nbsp;&nbsp;</span>
                 <Radio-group v-model="skf">
                    <Radio label="0">
                        <span>借款人</span>
                    </Radio>
                    <Radio label="1">
                        <span>担保人</span>
                    </Radio>
                    <Radio label="2">
                        <span>代偿人</span>
                    </Radio>
                    <Radio label="3">
                        <span>渠道方</span>
                    </Radio>
                    <Radio label="4">
                        <span>供应商</span>
                    </Radio>
                    <Radio label="5">
                        <span>出借人</span>
                    </Radio>
                    <Radio label="6">
                        <span>其他</span>
                    </Radio>
                </Radio-group>
              </Col>
            </Col>
        </Row>
        <Row style="margin-top:10px;">
            <Col span="24">
                <span>付款方：&nbsp;&nbsp;&nbsp;</span>
                 <Radio-group v-model="fkf">
                    <Radio label="0">
                        <span>借款人</span>
                    </Radio>
                    <Radio label="1">
                        <span>担保人</span>
                    </Radio>
                    <Radio label="2">
                        <span>代偿人</span>
                    </Radio>
                    <Radio label="3">
                        <span>渠道方</span>
                    </Radio>
                    <Radio label="4">
                        <span>供应商</span>
                    </Radio>
                    <Radio label="5">
                        <span>出借人</span>
                    </Radio>
                    <Radio label="6">
                        <span>其他</span>
                    </Radio>
                </Radio-group>
              </Col>
            </Row>
            <Row style="margin-top:10px;">
                <Col span="2">
                    <span>描述：</span>
                </Col>
                <Col span="16">
                    <i-input v-model="ms" type="textarea" placeholder="Enter something..."></i-input>
                </Col>
            </Row>
        </Modal>
    <Row style="margin-top:10px">
       <span>费用名称：</span><i-input v-model="feeName" placeholder="请输入..." style="width: 300px"></i-input>
        <span>类型：</span>
       <i-select  @on-change="findAllFeeTypeJs"   v-model="findAllFeeTypeml" span="6" style="width:200px">
          <i-option v-for="item in findAllFeeTypeList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
        <i-button style="margin-left:20px;" type="primary" icon="ios-search" @click="searchClick()">搜索</i-button>
    </Row>
    <div style="clear:both;padding-top:20px;">
      <Table @on-selection-change="changeFindSec" :loading="loading" border :columns="tableColumns3" :data="data8" size="small" ref="table"></Table>
    </div>
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
       
        data8: []
      };
    },
    computed: {
      tableColumns3() {
        let columns = [{
            title: "序号",
            type: "index",
            fixed: "left",
            width: 100
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
            width: 200,
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
                      this.findAllFeeList();
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
  
    },
    created() {
  
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
      lookFindAllFee(){
        let flag = this.isSelectionData();
          if(flag){
         console.log(this.selectionData);
            
           util.ajax('v1/feeInfo/getAllFeeInfoByFeeCode', {
              method: 'get',
              params:{
                feeCode:this.selectionData[0].feeCode
              }
            }).then(res => {
                let curData = res.data.data;
                this.digFeeName = curData.feeName;
                this.digFeeType = curData.feeType;

            })
            this.titleDig = "查看费用"
            this.modal1 = true;
          }
          
      },
      addFindAllFee(){
        let flag = this.isSelectionData();
        if(flag){
          this.titleDig = "新增费用"
          this.modal1 = true;
        }  
          
      },
    }
  };
</script>
