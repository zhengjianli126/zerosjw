
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <row style="margin-top:10px">
      <Col span="6"> 分部名称 ：
      <i-select @on-change="changeName1" :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
        <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
      </i-select>
      </Col>
      <Col span="6"> 子分部名称 ：
      <i-select @on-change="changeName2" :disabled="sonOrganizeDisabled" :model.sync="sonOrganize" span="6" style="width:200px">
        <i-option v-for="item in name2" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
      </i-select>
      </Col>
      <Col span="6"> 理财师 ：
      <i-select @on-change="changeName3" :disabled="userNameDisabled" :model.sync="userName" span="6" style="width:200px">
        <i-option v-for="item in name3" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
      </i-select>
      </Col>
      <Button type="primary" v-show="searchFlag" icon="ios-search" @click="searchData()">搜索</Button>
    </row>
    <row>
      <Button type="primary" v-show="turnFlag" icon="arrow-swap" style="margin-top:10px;">转移</Button>
    </row>
    <div style="clear:both;padding-top:20px;">
      <Table border :columns="columns1" :data="data8"></Table>
    </div>
    <Modal v-model="bindFlagShow">
        <p slot="header">
            <span>绑定首金账户</span>
        </p>
        <div class="modal-content">
            绑定首金线上账号分享更便捷
        </div>
        <div style="margin-top:20px;">
            <span>首金线上账号：</span><Input v-model="onlineUser" style="width:200px;" placeholder=""></Input>
        </div>
        <div style="margin-top:20px;">
            <span style="margin-right: 24px;">登录密码：</span><Input v-model="onlinePassword" style="width:200px;" placeholder=""></Input>
        </div>
        <div slot="footer">
            <Button type="primary" @click="bindBt">绑定</Button>
        </div>
    </Modal>
    <div style="margin-top:10px;float:right">
      <Page :total="total" show-total show-elevator @on-change="changepage"></Page>
    </div>
  </div>
</template>

<script>
  import util from "utils";
  import Cookies from "js-cookie";
  export default {
    data() {
      return {
        turnFlag: false,
        searchFlag: false,
        bindFlagShow: false,
        total: 0,
        pageNum: 0,
        pageSize: 10,
        organize: "",
        sonOrganize: "",
        userName: "",
        onlineUser: '',
        onlinePassword: '',
        organizeDisabled: false,
        sonOrganizeDisabled: false,
        userNameDisabled: false,
        name1: [],
        name2: [],
        name3: [],
        organizeSelect1: "",
        organizeSelect2: "",
        organizeSelect3: "",
        detailtotal: "",
        detailpageNum: "",
        detailpageSize: "",
        detailData: "",
        paramId: '',
        columns1: [{
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "序号",
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "理财师",
            key: "authoriName",
            align: "center"
          },
          {
            title: "客户数量",
            key: "customerCount",
            align: "center"
          },
          {
            title: "子分部名称",
            align: "center",
            key: "sonOrganize"
          },
          {
            title: "分布名称",
            align: "center",
            key: "organize"
          },
          {
            title: "操作",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                          this.bindFlagShow = true;
                          this.paramId = params.index
                      }
                    }
                  },
                  "绑定"
                )
              ]);
            }
          }
        ],
        data8: []
      };
    },
    mounted() {
  
      // 摁扭权限
      let curMeunList = JSON.parse(localStorage.menuList);
      for (let a in curMeunList) {
        if (curMeunList[a].id == 19) {
          this.searchFlag = true
        }
        if (curMeunList[a].id == 20) {
          this.turnFlag = true
        }
  
      }
      var nowDate = util.formatDate(new Date());
      util
        .ajax({
          url: "/SJWCRM/InitAuthoriMess",
          method: "post",
          params: {
            
          }
        })
        .then(res => {
          this.total = res.data.data.total;
          this.pageNum = res.data.data.pageNum;
          this.pageSize = res.data.data.pageSize;
          this.data8 = res.data.data.rows;
  
          // 保存一份请求的总数据
          this.detailtotal = res.data.data.total;
          this.detailpageNum = res.data.data.pageNum;
          this.detailpageSize = res.data.data.pageSize;
          this.detailData = res.data.data.rows;
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          this.handleList();
        })
        .catch(err => {});
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
        util
            .ajax({
            url: "/SJWCRM/getAuthoriMess",
            method: "post",
            params: {
                "Campus.id": this.organizeSelect1.split("-")[0],
                "Campus.levelArent": this.organizeSelect1.split("-")[1],
                "CampusSon.id": this.organizeSelect2.split("-")[0],
                "CampusSon.levelArent": this.organizeSelect2.split("-")[1],
                "Accountant.id": this.organizeSelect3.split("-")[0],
                "Accountant.levelArent": this.organizeSelect3.split("-")[1]

            }
            })
            .then(res => {
            this.total = res.data.data.total;
            this.pageNum = res.data.data.pageNum;
            this.pageSize = res.data.data.pageSize;
            this.data8 = res.data.data.rows;
    
            // 保存一份请求的总数据
            this.detailtotal = res.data.data.total;
            this.detailData = res.data.data.rows;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            this.handleList();
            })
            .catch(err => {});
        },
        bindBt() {
            util.ajax({
                url: "/SJWCRM/BindOnLineAccount",
                method: "post",
                params: {
                    id: this.paramId,
                    userName: this.onlineUser,
                    password: this.onlinePassword
                }
                })
                .then(res => {
                    this.bindFlagShow = false;
                    
                })
                .catch(err => {});
        }
    }
  }
</script>
