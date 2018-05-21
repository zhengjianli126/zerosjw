<style lang="less">
@import "./turnover.less";
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>{{todayTurnovalCount}}</span><br/><span>今日交易额（元）</span></div>
            <div><span>{{yestodayTurnovalCount}}</span><br/><span>昨日交易额（元）</span></div>
            <div><span>{{thisMonthTurnovalCount}}</span><br/><span>本月交易额（元）</span></div>
            <div><span>{{lastMonthTurnovalCount}}</span><br/><span>上月交易额（元）</span></div>
        </div>
        <div class="tradeV_right">
            <div><span>{{totalTurnovalCount}}</span><br/><span>累计交易额（元）</span></div>
            <div><span>{{totalYearTuranovalCount}}</span><br/><span>累计年化交易额（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="12">
                查询日期 ：<Date-picker :options="options1" type="date" v-model="StartTime"  placeholder="选择日期" style="width: 200px; margin-right: 118px;"></Date-picker>
                至：&nbsp;<Date-picker :options="options1" v-model="EndTime" type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
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
            <Button type="primary" v-show="searchFlag" @click="searchBtn" icon="ios-search">搜索</Button>
        </row>
        <h2 style="margin-top:40px">总数据<Span v-show="noteFlag" style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
        <div style="width:100%;margin-top:10px;">
            <Table border :columns="columns1" :data="totalData"></Table>
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
      // 摁扭权限
      searchFlag:false,
      StartTime: "",
      EndTime: "",
      organize: "",
      sonOrganize: "",
      userName: "",
      noteFlag: true,
      todayTurnovalCount: "",
      organizeDisabled: false,
      sonOrganizeDisabled: false,
      userNameDisabled: false,
      name1: [],
      name2: [],
      name3: [],
      organizeSelect1: "",
      organizeSelect2: "",
      organizeSelect3: "",
      options1: {
          disabledDate (date) {
            // 24*60*60*1000 = 86400000 代表的是一天二十四小时的毫秒数
              return date && (date.valueOf() > Date.now() || date.valueOf() < Cookies.get("firstOrderTime")/1000);
          }
      },
      columns1: [
        { title: " ", key: "totalOrder" },
        { title: "总交易额（元）", key: "totalTurnover" },
        { title: "总年化交易额（元）", key: "totalTurnover_year" }
      ],
      totalData: [
        { totalOrder: "总计", totalTurnover: "", totalTurnover_year: "" }
      ]
    };
  },
  mounted() {
      let curMeunList =JSON.parse(localStorage.menuList); 
    console.log(curMeunList)
    for (let a in curMeunList){
      if(curMeunList[a].id==6){
          this.searchFlag = true
      }
    }
    var nowDate = util.formatDate(new Date());
    util
      .ajax({
        // url: '/SJWCRM/initTurnovalCount',
        url: "/SJWCRM/initTurnovalCount",
        method: "post",
        params: {
          date: nowDate
        }
      })
      .then(res => {
        this.todayTurnovalCount = res.data.data.todayTurnovalCount;
        this.yestodayTurnovalCount = res.data.data.yestodayTurnovalCount;
        this.thisMonthTurnovalCount = res.data.data.thisMonthTurnovalCount;
        this.lastMonthTurnovalCount = res.data.data.lastMonthTurnovalCount;
        this.totalTurnovalCount = res.data.data.totalTurnovalCount;
        this.totalYearTuranovalCount = res.data.data.totalYearTuranovalCount;
        this.totalData[0].totalTurnover = res.data.data.totalData.totalTurnover;
        this.totalData[0].totalTurnover_year =
          res.data.data.totalData.totalTurnover_year;
      })
      .catch(error => {});
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
          url: "/SJWCRM/getTuranovalCount",
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
        })
        .then(res => {this.noteFlag = false;
          this.todayTurnovalCount = res.data.data.todayTurnovalCount;
          this.yestodayTurnovalCount = res.data.data.yestodayTurnovalCount;
          this.thisMonthTurnovalCount = res.data.data.thisMonthTurnovalCount;
          this.lastMonthTurnovalCount = res.data.data.lastMonthTurnovalCount;
          this.totalTurnovalCount = res.data.data.totalTurnovalCount;
          this.totalYearTuranovalCount = res.data.data.totalYearTuranovalCount;
          this.totalData[0].totalTurnover =
            res.data.data.rows[0].totalData.totalTurnover;
          this.totalData[0].totalTurnover_year =
            res.data.data.rows[0].totalData.totalTurnover_year;
            
        })
        .catch(error => {});
    }
  }
};
</script>