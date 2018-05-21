<style lang="less" scoped>
.tradeVolumeSta {
  float: left;
  width: 100%;
  background: #fff;
  height: 100px;
  margin-top: 10px;
}
.tradeV_left {
  display: block;
  margin: 1%;
  width: 98%;
  height: 90px;
  border: 1px solid #cccccc;
  float: left;
}
.tradeV_left {
  div {
    display: block;
    float: left;
    width: 33.33%;
    height: 100px;
    line-height: 20px;
    text-align: center;
    margin-top: 25px;
  }
}
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>{{this.thisMonthCommition}}</span><br/><span>本月佣金（元）</span></div>
            <div><span>{{this.lastMonthCommition}}</span><br/><span>上月佣金（元）</span></div>
            <div><span>{{this.totalCommition}}</span><br/><span>累计佣金（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="8">
                选择月份 ：<Date-picker :options="options1" v-model="DateTime" type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
        </row>
        <row style="margin-top:10px">
            <Col span="6">
                分部名称 ：
                <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
                    <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
                </i-select>
            </Col>
            <Col span="6">
                子分部名称 ：
                <i-select @on-change="changeName2" :disabled="sonOrganizeDisabled" :model.sync="sonOrganize" span="6" style="width:200px">
                    <i-option v-for="item in name2" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
                </i-select>
            </Col>
            <Col span="6">
                理财师 ：
                <i-select @on-change="changeName3" :disabled="userNameDisabled" :model.sync="userName" span="6" style="width:200px">
                    <i-option v-for="item in name3" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
                </i-select>
            </Col>
            <Button @click="searchBtn" v-show="searchFlag" type="primary" icon="ios-search">搜索</Button>
        </row>
        <h2 style="margin-top:40px">总数据<Span v-show="noteFlag" style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
        <div style="width:600px;margin-top:10px;">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>

        <div style="margin-top:40px;">
            <Col span="5"><h2>订单详情<Span v-show="noteFlag" style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2></Col>
            <Col span="3"><Button v-show="exportFlag" type="primary" icon="ios-cloud-download" @click="exportData(3)">导出</Button></Col>
        </div>
        <div style="clear:both;padding-top:20px;">
            <Table border :columns="columns8" :data="data8" size="small" ref="table"></Table>
        </div>
        <div style="margin-top:10px;float:right">
            <Page :total="total" show-total show-elevator @on-change="changepage"></Page>
        </div>
    </div>
</div>
</template>
<script>
import util from "../../libs/util";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      searchFlag:false,
      importFlag:false,
      exportFlag:false,
      organize: "",
      sonOrganize: "",
      userName: "",
      pageSize: 10,
      pageNum: 0,
      total: 0,
      DateTime: "",
      noteFlag: true,
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
      detailData: "",
      options1: {
          disabledDate (date) {
            // 24*60*60*1000 = 86400000 代表的是一天二十四小时的毫秒数
              return date && (date.valueOf() > Date.now() || date.valueOf() < Cookies.get("firstOrderTime")/1000);
          }
      },
      columns1: [
        { title: "交易总额（元）", key: "totalTurnover" },
        { title: "年化交易总额（元）", key: "totalTurnover_year" },
        { title: "佣金总额（元）", key: "totalCommition" }
      ],
      data1: [
        { totalTurnover: "", totalTurnover_year: "", totalCommition: "" }
      ],
      columns8: [
        { title: "序号", type: "index", fixed: "left", width: 100 },
        { title: "佣金月份", key: "commitionMonth", width: 150 },
        { title: "交易额（元）", key: "totalTurnover", width: 150 },
        { title: "年化交易额（元）", key: "totalTurnover_year", width: 150 },
        { title: "佣金（元）", key: "commition", width: 150 },
        { title: "理财师", key: "userName", width: 150 },
        { title: "子分部名称", key: "sonOrganize", width: 150 },
        { title: "分部名称", key: "organize", width: 150 }
      ],
      data8: []
    };
  },
  mounted() {
    // 摁扭权限
      let curMeunList =JSON.parse(localStorage.menuList); 
    console.log(curMeunList)
    for (let a in curMeunList){
      if(curMeunList[a].id==8){
          this.searchFlag = true
      }
      if(curMeunList[a].id==6){
          this.importFlag = true
      }
      if(curMeunList[a].id==9){
          this.exportFlag = true
      }
    }



    var nowDate = util.formatDate(new Date());
    util
      .ajax({
        url: "/SJWCRM/initCheckMonthAccount",
        method: "post",
        params: {
          date: nowDate
        }
      })
      .then(res => {
        this.total = res.data.data.total;
        this.pageNum = res.data.data.pageNum;
        this.thisMonthCommition = res.data.data.rows[0].thisMonthCommition;
        this.lastMonthCommition = res.data.data.rows[0].lastMonthCommition;
        this.totalCommition = res.data.data.rows[0].totalCommition;
        this.commition = res.data.data.rows[0].commition;
        this.data1[0].totalCommition = res.data.data.rows[0].totalCommition;
        this.data1[0].totalTurnover = res.data.data.rows[0].totalTurnover;
        this.data1[0].totalTurnover_year =
          res.data.data.rows[0].totalTurnover_year;
        this.data8 = res.data.data.rows;

        // 保存一份请求的总数据
        this.detailtotal = res.data.data.total;
        this.detailpageNum = res.data.data.pageNum;
        this.detailData = res.data.data.rows;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        this.handleList();
      })
      .catch(err => {
          this.$Modal.error({
                title: "提示",
                content: err.data.msg
            });
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
    handleList() {
        this.total = this.detailtotal;
      if (this.detailtotal < 10) {
        this.data8 = this.detailData;
      } else {
        this.data8 = this.detailData.slice(0, 10);
      }
    },
    changepage(index) {
      this.detailtotal = this.detailtotal;
      this.detailpageNum = this.detailpageNum;
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
    searchBtn() {
      util
        .ajax({
          url: "/SJWCRM/getCheckMonthAccount",
          method: "post",
          params: {
            DateTime: this.DateTime && util.formatDate(this.DateTime.getTime()),
            "Campus.id": this.organizeSelect1.split("-")[0],
            "Campus.levelArent": this.organizeSelect1.split("-")[1],
            "CampusSon.id": this.organizeSelect2.split("-")[0],
            "CampusSon.levelArent": this.organizeSelect2.split("-")[1],
            "Accountant.id": this.organizeSelect3.split("-")[0],
            "Accountant.levelArent": this.organizeSelect3.split("-")[1]
          }
        })
        .then(res => {
          this.thisMonthCommition = (res.data.data.rows.length>0) ? res.data.data.rows[0].thisMonthCommition : 0;
          this.lastMonthCommition = (res.data.data.rows.length>0) ? res.data.data.rows[0].lastMonthCommition : 0;
          this.totalCommition = (res.data.data.rows.length>0) ?  res.data.data.rows[0].totalCommition :0;
          this.commition = (res.data.data.rows.length>0) ? res.data.data.rows[0].commition : 0;
        //   this.pageNum = res.data.data.pageNum;
          this.data1[0].totalCommition = (res.data.data.rows.length>0) ? res.data.data.rows[0].totalCommition : 0;
          this.data1[0].totalTurnover = (res.data.data.rows.length>0) ? res.data.data.rows[0].totalTurnover : 0;
          this.data1[0].totalTurnover_year = (res.data.data.rows.length>0) ? res.data.data.rows[0].totalTurnover_year : 0;

          this.detailtotal = res.data.data.total;
          this.detailData = res.data.data.rows;
          this.handleList();
          this.noteFlag = false;
        })
        .catch(err => {
            this.date8 = []
        })
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
          filename: "每月对账订单详情",
          columns: this.columns8,
          data: this.detailData
        });
      }
    }
  }
};
</script>