<style lang="less">
</style>
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
  
  <i-button type="primary" @click="modal3 = true">显示对话框2</i-button>
   <Modal width="800px" v-model="modal3" title="费用列表":loading="loading">
    <row style="margin-top:10px">
        <span>费用：</span><i-input  placeholder="请输入..." style="width: 200px"></i-input>
            <span>费用大类：</span>
        <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
            <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
            </i-select>
            <i-button style="margin-left:20px;" type="primary" icon="ios-search" @click="searchData()">搜索</i-button>
        </row>
        <Table style="margin-top:10px;" border :columns="columns8" :data="data8" size="small" ref="table"></Table>
        <div slot="footer"></div>
    </Modal>  


    <i-button type="primary" @click="modal2 = true">显示对话框1</i-button>
        <Modal width="800px"  v-model="modal2" title="公式编辑":loading="loading">
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

        
    <i-button type="primary" @click="modal1 = true">显示对话框</i-button>
        <Modal width="800px" ok-text="保存" v-model="modal1" title="新增/查看/修改费用"
        :loading="loading">
          <Row>
            <Col span="12">
                <span>费用名称：</span><i-input  placeholder="请输入..." style="width: 200px"></i-input>
            </Col>
             <Col span="12">
                <span>类型：&nbsp;&nbsp;&nbsp;</span> <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
        <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
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
       <span>费用名称：</span><i-input  placeholder="请输入..." style="width: 300px"></i-input>
        <span>类型：</span>
       <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
        <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
        </i-select>
        <i-button style="margin-left:20px;" type="primary" icon="ios-search" @click="searchData()">搜索</i-button>
    </Row>
    <div style="clear:both;padding-top:20px;">
      <Table border :columns="columns8" :data="data8" size="small" ref="table"></Table>
    </div>
    <div style="margin-top:10px;float:right">
      <Page :total="total"  show-total show-elevator @on-change="changepage"></Page>
    </div>
  </div>
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
        // 线上线下
      sqxs:'1',
      // 收款方
      skf:'1',
      // 付款方
      fkf:'1',
      // 描述
      ms:'asd',
      //输入公式。
      srgs:'1',
      modal1: false,
      modal2: false,
      modal3: false,
      loading: true,
      total: 0,
      pageNum: 0,
      pageSize: 10,
      organizeDisabled: false,
      sonOrganizeDisabled: false,
      userNameDisabled: false,
      name1: [],
      name2: [],
      name3: [],
      organizeSelect1: "",
      organizeSelect2: "",
      organizeSelect3: "",
      detailtotal: 0,
      detailpageNum: 0,
    //detailpageSize: "10",
      detailData: [],
      noteFlag: true,
      options1: {
         
      },
      
      data1: [
        {
          totalOrder: "",
          totalTurnover: "",
          totalTurnover_year: ""
        }
      ],
      columns8: [
        {
          title: "序号",
          type: "index",
          fixed: "left",
          width: 100
        },
        {
          title: "费用名称",
          key: "customerName",
          width: 150
        },
        {
          title: "类型",
          key: "orderId",
          width: 150
          //    "sortable": true
        },
        {
          title: "收款方",
          key: "productName",
          width: 150
          //    "sortable": true
        },
        {
          title: "付款方",
          key: "productTime",
          width: 150
          //    "sortable": true
        },
        {
          title: "公式",
          key: "orderMoney",
          width: 150
          //    "sortable": true
        },
        {
          title: "描述",
          key: "annualinterestrate_money",
          width: 150
          //    "sortable": true
        },
        {
          title: "操作",
          key: "orderTime",
          width: 150,
          render: (h, params) => {
                      const orderDealTime = util.formatDate(params.row.orderDealTime);
                      return h('div', orderDealTime);
                  }         
          //    "sortable": true
        }
      ],
      data8: []
    };
  },
  mounted() {
    
    let curMeunList =JSON.parse(localStorage.menuList); 
    console.log(curMeunList)
    for (let a in curMeunList){
      if(curMeunList[a].id==3){
          this.searchFlag = true
      }
      if(curMeunList[a].id==4){
          this.importFlag = true
      }
    }
    
    var nowDate = util.formatDate(new Date());
    util
      .ajax({
        // url: '',
        url: "/SJWCRM/initOrderDetails",
        method: "post",
        params: {
          date: nowDate
        }
      })
      .then(res => {
        this.total = res.data.data.total;
        this.pageNum = res.data.data.pageNum;
        // this.pageSize = res.data.data.pageSize;
        this.data1[0].totalOrder = res.data.data.rows[0].totalData.totalOrder;
        this.data1[0].totalTurnover =
          res.data.data.rows[0].totalData.totalTurnover;
        this.data1[0].totalTurnover_year =
          res.data.data.rows[0].totalData.totalTurnover_year;
        this.data8 = res.data.data.rows;

        // 保存一份请求的总数据
        this.detailtotal = res.data.data.total;
        this.detailpageNum = res.data.data.pageNum;
        // this.detailpageSize = res.data.data.pageSize;
        this.detailData = res.data.data.rows;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        this.handleList();
      })
      .catch(error => {
        // alert('请求错误')
      });
  },
  created() {
    if (Cookies.get("levelArent") == 1) {
      util
        .ajax({
          url: "/SJWCRM/getAllSonOrganize",
          method: "post",
          params: {}
        })
        .then(res => {
          this.name1 = res.data.data;
        });
    }
    if (Cookies.get("levelArent") == 2) {
      this.organizeDisabled = true;
      util
        .ajax({
          url: "/SJWCRM/getAllSonOrganize",
          method: "post",
          params: {}
        })
        .then(res => {
          this.name2 = res.data.data;
        });
    }
    if (Cookies.get("levelArent") == 3) {
      this.organizeDisabled = true;
      this.sonOrganizeDisabled = true;
      util
        .ajax({
          url: "/SJWCRM/getAllSonOrganize",
          method: "post",
          params: {}
        })
        .then(res => {
          this.name3 = res.data.data;
        });
    }
    if (Cookies.get("levelArent") == 4) {
      this.organizeDisabled = true;
      this.sonOrganizeDisabled = true;
      this.userNameDisabled = true;
    }
  },
  methods: {
      submitAdd(){
          
      },
    // 禁止选择日期
    
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
    changeName1(value) {
      this.organizeSelect1 = value;
      var changeValue1 = value;
      util
        .ajax({
          url: "/SJWCRM/getAllSonOrganize",
          method: "post",
          params: {
            "Campus.organizeId": changeValue1.split("-")[0],
            "Campus.levelArent": changeValue1.split("-")[1]
          }
        })
        .then(res => {
          this.name2 = res.data.data;
        });
    },
    changeName2(value) {
      this.organizeSelect2 = value;
      var changeValue2 = value;
      util
        .ajax({
          url: "/SJWCRM/getAllSonOrganize",
          method: "post",
          params: {
            "CampusSon.organizeId": changeValue2.split("-")[0],
            "CampusSon.levelArent": changeValue2.split("-")[1]
          }
        })
        .then(res => {
          this.name3 = res.data.data;
        });
    },
    changeName3(value) {
      this.organizeSelect3 = value;
      var changeValue3 = value;
      util
        .ajax({
          url: "/SJWCRM/getAllSonOrganize",
          method: "post",
          params: {
            "Accountant.organizeId": changeValue3.split("-")[0],
            "Accountant.levelArent": changeValue3.split("-")[1]
          }
        })
        .then(res => {});
    },

    searchData() {
      util.ajax({
          url: "/SJWCRM/searchOrderDetails",
          method: "post",
          params: {
            StartTime: this.StartTime && util.formatDate(this.StartTime.getTime()),
            EndTime: this.EndTime && util.formatDate(this.EndTime.getTime()),
            "Campus.id": this.organizeSelect1.split("-")[0],
            "Campus.levelArent": this.organizeSelect1.split("-")[1],
            "CampusSon.id": this.organizeSelect2.split("-")[0],
            "CampusSon.levelArent": this.organizeSelect2.split("-")[1],
            "Accountant.id": this.organizeSelect3.split("-")[0],
            "Accountant.levelArent": this.organizeSelect3.split("-")[1]
          }
        }).then(res => {
          this.data1[0].totalOrder = (res.data.data.rows.length>0) ? res.data.data.rows[0].totalData.totalOrder : 0;
          this.data1[0].totalTurnover = (res.data.data.rows.length>0) ? res.data.data.rows[0].totalData.totalTurnover :0;
          this.data1[0].totalTurnover_year = (res.data.data.rows.length>0) ? res.data.data.rows[0].totalData.totalTurnover_year : 0;
        //   this.data8 = res.data.data.rows;

          this.detailtotal = res.data.data.total;
        //   this.detailpageNum = res.data.data.pageNum;
        //   this.detailpageSize = res.data.data.pageSize;
          this.detailData = res.data.data.rows;
          this.handleList();
          this.noteFlag = false;
        })
        .catch(error => {
            this.date8 = []
        });
    },
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "The original data"
        });
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: "Sorting and filtering data",
          original: false
        });
      } else if (type === 3) {
        this.$refs.table.exportCsv({
          filename: "订单详情",
          columns: this.columns8,
          data: this.detailData
        });
      }
    }
  }
};
</script>
