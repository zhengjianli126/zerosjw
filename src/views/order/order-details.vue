<style lang="less">
@import "./order-details.less";
</style>
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <row style="margin-top:10px">
        <i-col span="7">
            查询日期 ：
            <Date-picker v-model="StartTime" type="date" :options="options1"  placeholder="选择日期" style="width: 200px; "></Date-picker>
        </i-col>
        <i-col span="5">
          至： <Date-picker type="date" :options="options1" v-model="EndTime" placeholder="选择日期" style="width: 200px"></Date-picker>
        </i-col>
    </row>
    <row style="margin-top:10px">
      <i-col span="6">
        分部名称 ：
        <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
          <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
        </i-select>
      </i-col>
      <i-col span="6">
        子分部名称 ：
        <i-select @on-change="changeName2" :disabled="sonOrganizeDisabled" :model.sync="sonOrganize" span="6" style="width:200px">
          <i-option v-for="item in name2" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
        </i-select>
      </i-col>
      <i-col span="6">
        理财师 ：
        <i-select @on-change="changeName3" :disabled="userNameDisabled" :model.sync="userName" span="6" style="width:200px">
            <i-option v-for="item in name3" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
        </i-select>
      </i-col>
      <i-button v-show="searchFlag==true" type="primary" icon="ios-search" @click="searchData()">搜索</i-button>
    </row>
    <h2 style="margin-top:40px">总数据<Span v-show="noteFlag" style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
    <div style="width:600px;margin-top:10px;">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div  style="margin-top:40px;">
      <Col span="5"><h2>订单详情<Span v-show="noteFlag" style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2></Col>
      <Col span="3"><Button v-show="importFlag==true" type="primary" icon="ios-cloud-download" @click="exportData(3)">导出</Button></Col>
    </div>
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
import Cookies from "js-cookie";
export default {
  data() {
    return {
      // 摁扭权限
      searchFlag:false,
      importFlag:false,
      StartTime: "",
      EndTime: "",
      organize: "",
      sonOrganize: "",
      userName: "",
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
          disabledDate (date) {
            // 24*60*60*1000 = 86400000 代表的是一天二十四小时的毫秒数
              return date && (date.valueOf() > Date.now() || date.valueOf() < Cookies.get("firstOrderTime")/1000);
          }
      },
      columns1: [
        {
          title: "订单笔数",
          key: "totalOrder"
        },
        {
          title: "交易额（元）",
          key: "totalTurnover"
        },
        {
          title: "年华交易总额（元）",
          key: "totalTurnover_year"
        }
      ],
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
          title: "用户名称",
          key: "customerName",
          width: 150
        },
        {
          title: "订单号",
          key: "orderId",
          width: 150
          //    "sortable": true
        },
        {
          title: "产品名称",
          key: "productName",
          width: 150
          //    "sortable": true
        },
        {
          title: "产品期限",
          key: "productTime",
          width: 150
          //    "sortable": true
        },
        {
          title: "交易金额",
          key: "orderMoney",
          width: 150
          //    "sortable": true
        },
        {
          title: "投资年华金额",
          key: "annualinterestrate_money",
          width: 150
          //    "sortable": true
        },
        {
          title: "投资时间",
          key: "orderTime",
          width: 150,
          render: (h, params) => {
                      const orderDealTime = util.formatDate(params.row.orderDealTime);
                      return h('div', orderDealTime);
                  }         
          //    "sortable": true
        },
        {
          title: "理财师",
          key: "userName",
          width: 150
          //    "sortable": true
        },
        {
          title: "子分部名称",
          key: "sonOrganize",
          width: 150
          //      "sortable": true
        },
        {
          title: "分部名称",
          key: "organize",
          width: 150
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
