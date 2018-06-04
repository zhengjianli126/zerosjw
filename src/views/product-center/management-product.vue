<style lang="less" scoped>
// @author xiaoguanghua
// @time 2018/05/30
.handleBtn {
  margin-top: 20px;
  border-top: 1px solid rgba(131, 129, 129, 0.808);
  padding-top: 10px;
}
</style>
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <i-button type="primary" @click="modal2 = true">参数配置</i-button>

    <!-- 新增产品 -->
    <Modal width="1080px" ok-text="保存" v-model="productModel" :mask-closable="false" title="新增/查看/修改产品" :loading="modalLoading">
      <i-form ref=productInfo :model="productInfo" :rules="prodRuleValidate" :label-width="100">
        <Row>
          <div style="font-size: 20px; margin-bottom: 10px;">基础信息：</div>
        </Row>
        <Row>
          <i-input v-model="productInfo.productCode" type="hidden"></i-input>
          <Col span="8">
            <Form-item label="名称：" prop="productName">
              <i-input  :disabled="checkBaseFlag" v-model="productInfo.productName" placeholder="请输入名称" style="width: 200px"></i-input>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="类型：" prop="productType">
              <i-select :disabled="checkBaseFlag" @on-change="changeProdType"  v-model="productInfo.productType" placeholder="请选择" style="width: 150px">
                  <i-option v-for="item in prodTypeList" :value="item.value">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </Col>
        </Row>
        <Row>
            <Form-item label="资金方：" prop="fundType">
              <Radio-group :disabled="checkBaseFlag" v-model="productInfo.fundType">
                  <Radio :disabled="checkBaseFlag" label="1">首金</Radio>
                  <Radio :disabled="checkBaseFlag" label="2">银行</Radio>
              </Radio-group>
            </Form-item>
        </Row>
        <Row>
          <Col span="5">
            <Form-item label="期限：" prop="deadlineType">
              <Radio-group :disabled="checkBaseFlag" v-model="productInfo.deadlineType">
                  <Radio :disabled="checkBaseFlag" label="1">月</Radio>
                  <Radio :disabled="checkBaseFlag" label="0">日</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="" prop="minDeadline">
              <i-input :disabled="checkBaseFlag" size="small" v-model="productInfo.minDeadline" placeholder="" style="width: 50px;"></i-input> 月/日 --
              <!-- <Input-number :disabled="checkBaseFlag" size="small"  style="width: 60px" v-model="productInfo.minDeadline" :max="100" :min="1" :stype="1"></Input-number> 月/日 -- -->
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="" prop="maxDeadline">
              <i-input :disabled="checkBaseFlag" size="small" v-model="productInfo.maxDeadline" placeholder="" style="width: 50px;"></i-input> 月/日 
              <!-- <Input-number :disabled="checkBaseFlag" size="small"  style="width: 60px" v-model="productInfo.maxDeadline" :max="100" :min="1" :stype="1"></Input-number> 月/日 -->
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="5">
            <Form-item label="期限间隔："  prop="fronInterval">
              <Radio-group :disabled="true" v-model="productInfo.deadlineType">
                  <Radio :disabled="true" label="1">月</Radio>
                  <Radio :disabled="true" label="0">日</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="" prop="intervalTime">
              <i-input :disabled="true" size="small" v-model="productInfo.intervalTime" placeholder="" style="width: 50px;"></i-input> 月/日
              <!-- <Input-number :disabled="checkBaseFlag" size="small"  style="width: 60px" v-model="productInfo.intervalTime" :max="100" :min="1" :stype="1"></Input-number> 月/日 -->
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Form-item label="还款方式：" prop="payType">
              <i-select :disabled="checkBaseFlag" @on-change="changePayType" v-model="productInfo.payType" placeholder="请选择" style="width: 200px">
                  <i-option v-for="item in payTypeList" :value="item.value">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </Col>
          <Col span="16">
            <Form-item label="利息费用公式："  :label-width="120" prop="costFormula">
              <i-input @on-focus="feeFormuJs" :disabled="checkBaseFlag" v-model="productInfo.costFormula" placeholder="请输入公式" style="width: 400px;"></i-input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Form-item label="起息日：" prop="startInterestType">
              <!-- <Radio-group :disabled="checkBaseFlag" v-model="productInfo.startInterestType">
                <Radio :disabled="checkBaseFlag" label="0">审核通过后 + <Input-number :disabled="checkBaseFlag" size="small"  style="width: 50px" v-model="startInterestDay" :max="100" :min="1" :stype="1"></Input-number></Radio> 日
                <Radio :disabled="checkBaseFlag" style="margin-left: 20px;" label="1">放款成功后 + <Input-number :disabled="checkBaseFlag" size="small"  style="width: 50px" v-model="startInterestDay" :max="100" :min="1" :stype="1"></Input-number></Radio> 日
                <Radio :disabled="checkBaseFlag" style="margin-left: 20px;" label="2">固定每月 + <Input-number :disabled="checkBaseFlag" size="small"  style="width: 50px" v-model="startInterestDay" :max="100" :min="1" :stype="1"></Input-number></Radio> 日
              </Radio-group> -->
              <Radio-group :disabled="true" v-model="productInfo.startInterestType">
                <Radio :disabled="true" label="0">审核通过后 + <i-input :disabled="true" size="small" v-model="productInfo.startInterestDay" placeholder="" style="width: 50px;"></i-input></Radio> 日
                <Radio :disabled="true" style="margin-left: 20px;" label="1">放款成功后 + <i-input :disabled="true" size="small" v-model="productInfo.startInterestDay" placeholder="" style="width: 50px;"></i-input></Radio> 日
                <Radio :disabled="true" style="margin-left: 20px;" label="2">固定每月 + <i-input :disabled="true" size="small" v-model="productInfo.startInterestDay" placeholder="" style="width: 50px;"></i-input></Radio> 日
              </Radio-group>
          </Form-item>
        </Row>
        <Row>
          <Form-item label="首期还款日：" :label-width="100" prop="specificRepayDate">
              <Radio-group :disabled="true" v-model="productInfo.specificRepayDate">
                <Radio :disabled="true" label="0">起息日后1期</Radio>
                <Radio :disabled="true" style="margin-left: 95px;" label="1">固定每月 <Input-number :disabled="true" size="small"  style="width: 50px" v-model="fixAddTime" :max="31" :min="1" :stype="1"></Input-number>日</Radio>
              </Radio-group>
          </Form-item>
        </Row>
        <Row>
          <Form-item label="月还取整：" prop="toInt">
              <Radio-group :disabled="true" v-model="productInfo.toInt">
                <Radio :disabled="true" label="1">是</Radio>
                <Radio :disabled="true" style="margin-left: 40px" label="0">否</Radio>
              </Radio-group>
          </Form-item>
        </Row>
        <Row>
          <Form-item label="分配顺序：" prop="allocationOrder">
              <Radio-group :disabled="checkBaseFlag" v-model="productInfo.allocationOrder">
                <Radio :disabled="checkBaseFlag" label="1">费息本</Radio>
                <Radio :disabled="checkBaseFlag" style="margin-left: 15px" label="2">本息费</Radio>
              </Radio-group>
          </Form-item>
        </Row>
        <Row>
          <Form-item label="支持债转：" prop="isTransfer">
              <Radio-group :disabled="checkBaseFlag" v-model="productInfo.isTransfer">
                <Radio :disabled="checkBaseFlag" label="1">支持</Radio>
                <Radio :disabled="checkBaseFlag" style="margin-left: 28px" label="0">不支持</Radio>
              </Radio-group>
          </Form-item>
        </Row>
        <Row>
          <Form-item label="产品描述：" prop="prdDesc">
              <i-input :disabled="checkBaseFlag" type="textarea" v-model="productInfo.prdDesc" placeholder="请描述..." style="width: 650px;"></i-input>
          </Form-item>
        </Row>
        <Row type="flex" v-show="modifyShow" justify="end">
          <i-button type="success" @click="saveBaseInfo">保存</i-button>
        </Row>
      </i-form>
        
        <!-- 合同模板 -->
        <Row style="padding-top:20px; border-top: 1px solid #C2C2C2; margin-top:20px">
            <span style="font-size: 20px;">合同模板：</span>
            <i-button :disabled="checkBaseFlag" style="float:right;" type="primary">添加</i-button>
            <Table style="margin-top: 30px;" border :columns="contractColumns" :data="contractData" size="small" ref="table"></Table>
        </Row>
        <!-- <Row type="flex" v-show="modifyShow" justify="end"  style="margin-top:20px;">
          <i-button type="success" @click="saveContractInfo">保存</i-button>
        </Row> -->

        <!-- 费用设置 -->
        <Row style="padding-top:20px; margin-top:20px; border-top: 1px solid #C2C2C2;">
            <span style="font-size: 20px;">费用设置：</span>
            <i-button :disabled="checkBaseFlag" style="float:right;" @click="addFeeBtn" type="primary">添加</i-button>
            <Table style="margin-top: 30px;" border :columns="costColumns" :data="costData" size="small" ref="table"></Table>
        </Row>
        <!-- <Row type="flex" v-show="modifyShow" justify="end"  style="margin-top:20px;">
          <i-button type="success" @click="saveFeeInfo">保存</i-button>
        </Row> -->

        <!-- 保障模型设置 -->
            <Row style="padding-top:20px; margin-top:20px; border-top: 1px solid #C2C2C2;">
              <i-form ref=guaranteeModelList :model="guaranteeModelList" :rules="guaRuleValidate" :label-width="100">
                <span style="font-size: 20px;">保障模型设置：</span>
                <i-button :disabled="checkGuaranteeFlag" @click="addGuarantee" style="float:right;" type="primary">添加</i-button>
                <ul ref="guaranteeUl">
                  <li ref=guaranteeInfo v-for="(guaranteeInfo,index) in guaranteeModelList">
                    <Row style="margin-top:10px;">
                        <Row style="margin-bottom: 15px; border-top: 1px solid #C2C2C2; padding-top: 20px;">
                          <span>偿付顺序{{index+1}}</span>
                          <span v-show="!checkGuaranteeFlag" @click="deleteGuarantee(index)" style="float: right; width:20px; height: 20px; border: 1px solid #000;  border-radius: 20px;" ><span style="display:inline-block; border: 1px solid #000; width: 12px; height: 1px; margin-bottom: 3px; margin-left: 3px;"></span></span>
                        </Row>
                        <Row>
                          <Form-item label="类型：" prop="typeCode">
                            <Radio-group @on-change="changeTypeCode(index,$event)" :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.typeCode">
                              <Radio :disabled="checkGuaranteeFlag" label="0">借款人</Radio>
                              <Radio :disabled="checkGuaranteeFlag" label="1">保险</Radio>
                              <Radio :disabled="checkGuaranteeFlag" label="2">担保机构</Radio>
                            </Radio-group>
                          </Form-item>
                        </Row>
                        <Row>
                          <Col span="8">
                            <Form-item label="机构名称：" prop="orgCode">
                              <i-select :disabled="checkGuaranteeFlag" @on-change="changeorgCode" v-model="guaranteeInfo.orgCode" placeholder="请选择" style="width: 200px">
                                  <i-option v-for="item in orgCodeList" :value="item.value">{{ item.label }}</i-option>
                              </i-select>
                            </Form-item>
                          </Col>
                          <Col span="8">
                            <Form-item label="提单关联机构：" prop="isLading">
                              <Radio-group :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.isLading">
                                <Radio :disabled="checkGuaranteeFlag" label="1">是</Radio>
                                <Radio :disabled="checkGuaranteeFlag" label="0">否</Radio>
                              </Radio-group>
                            </Form-item>
                          </Col>
                        </Row>
                        <Row>
                          <Form-item label="担保费用项：" prop="guaranteeFeeList">
                            <Checkbox-group :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.guaranteeFeeList">
                              <Checkbox  disabled label="0">本金</Checkbox>
                              <Checkbox :disabled="interestFlag" label="1">利息</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="2">首金服务费</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="3">引流费</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="4">保险费</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="5">担保费</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="6">资管费</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="7">返佣</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="8">贴息</Checkbox>
                              <Checkbox :disabled="checkGuaranteeFlag" label="9">罚滞</Checkbox>
                            </Checkbox-group>
                          </Form-item>
                        </Row>
                        <Row>
                          <Col span="8">
                            <Form-item :label-width="120" label="代偿后债权归属：" prop="belongCode">
                              <i-select :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.belongCode" placeholder="请选择" style="width: 150px">
                                  <i-option v-for="item in belongCodeList" :value="item.value">{{ item.label }}</i-option>
                              </i-select>
                            </Form-item>
                          </Col>
                          <Col span="8">
                            <Form-item label="代偿收款方：" prop="recComps">
                              <i-select :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.recComps" placeholder="请选择" style="width: 150px">
                                  <i-option v-for="item in recCompsList" :value="item.value">{{ item.label }}</i-option>
                              </i-select>
                            </Form-item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span="6">
                            <Form-item :label-width="120" label="代偿触发时间：" prop="guaDay">
                              T + <Input-number :disabled="checkGuaranteeFlag" size="small"  style="width: 50px" v-model="guaranteeInfo.guaDay" :max="100" :min="1" :stype="1"></Input-number> 天
                            </Form-item>
                          </Col>
                          <Col span="8">
                            <Form-item :label-width="120" label="" prop="guaTime">
                              <Time-picker :disabled="checkGuaranteeFlag" format="HH:mm" placeholder="选择时间" v-model="guaTime" style="width: 112px"></Time-picker>
                            </Form-item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span="8">
                            <Form-item label="是否回购：" prop="isBuyBack">
                              <Radio-group @on-change="changeIsBuyBack(index,$event)" :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.isBuyBack">
                                <Radio :disabled="checkGuaranteeFlag" label="0">否</Radio>
                                <Radio :disabled="checkGuaranteeFlag" label="1">是</Radio>
                              </Radio-group>
                            </Form-item>
                          </Col>
                          
                          <Col span="8">
                            <Form-item :label-width="120" label="条件：连续逾期" prop="buyBackPeriod">
                              <Input-number :disabled="checkGuaranteeFlag" size="small"  style="width: 50px" v-model="guaranteeInfo.buyBackPeriod" :max="100" :min="1" :stype="1"></Input-number> 期
                            </Form-item>
                          </Col>
                        </Row>
                        
                    </Row>
                  </li>
                </ul>
              </i-form> 
            </Row>
        <Row type="flex" v-show="modifyShow" justify="end"  style="margin-top:10px;">
          <i-button  type="success" @click="saveSafeModel">保存</i-button>
        </Row>
           
        <!-- 审核记录 -->
        <Row style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #C2C2C2;">
          <span style="font-size: 20px;" >审核记录：</span>
          <Table style="margin-top: 20px;" border :columns="columns4" :data="data4" size="small" ref="table"></Table>
        </Row>

        <Row v-show="reviewFlag" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #C2C2C2;">
          <Row><span style="font-size: 20px;" >审核备注：</span></Row>
          <i-input type="textarea" v-model="reviewNote" placeholder="请描述..." style="width: 950px; margin-top:20px;"></i-input>
        </Row>
      
      <div slot="footer">
          <Button :disabled="checkBaseFlag" type="success" @click="holdBtn('productInfo','guaranteeModelList')">暂存</Button>
          <Button :disabled="checkBaseFlag" v-show="true" @click="submitBtn" type="primary">提交</Button>
          <Button :disabled="checkBaseFlag" v-show="true" @click="cancelBtn">取消</Button>
      </div>
    </Modal>

    <!-- 费用列表 -->
    <Modal width="1000px" :mask-closable="false"  v-model="feeListModal" title="费用列表" :loading="loading">
      <Row>
        <Col span="8">
            <span>名称：</span>
            <i-input v-model="feeName" placeholder="请输入名称" style="width: 200px"></i-input>
        </Col>
        <Col span="8">
            <span>费用大类：</span>
            <i-select v-model="feeCategory" placeholder="请选择" style="width: 150px">
                <i-option v-for="item in feeTypeList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </Col>
        <Col span="8">
            <i-button style="float:right;" @click="searchFeeList" type="primary">查询</i-button>
        </Col>
      </Row>
      <Row>
        <Table style="margin-top: 30px;" border :columns="feeColumns" :data="feeData" size="small" ref="table"></Table>
      </Row>
      <Row>
        <div style="margin-top:10px;float:right">
          <Page :total="pageTotal1"  show-elevator @on-change="pageChange"></Page>
        </div>
      </Row>
      
      <div slot="footer">
      </div>
    </Modal>

    <!-- 参数配置 -->
    <Modal width="800px" :mask-closable="false" v-model="modal2" title="参数配置" :loading="loading">
        <Row>
          <span>公式：</span>
          <i-input type="textarea" disabled v-model="value" :rows="4" placeholder="费用公式" style="width: 600px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top: 20px;">
          <Col span="12">
            <span>收款方：</span>
            <i-select  @on-change="changeRecCode" v-model="recCode" span="6" style="width:150px">
                <i-option v-for="item in recCodeList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
          </Col>
          <Col span="12">
            <span>付款方：</span>
            <i-select  @on-change="changePayCode" v-model="payCode" span="6" style="width:150px">
                <i-option v-for="item in payCodeList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
          </Col>
        </Row>
        <Row style="margin-top: 20px;">
          <span>顺序：</span>
          <i-input v-model="value" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top: 20px;">
          <Col span="12">
            <span>参数1：</span>
            <i-input v-model="value" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
          </Col>
          <Col span="12">
            <span>参数2：</span>
            <i-input v-model="value" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
          </Col>
        </Row>
        <div slot="footer">
            <Button @click="updateFeeInfo" type="primary">确定</Button>
            <Button default>取消</Button>
        </div>
    </Modal>
    
    <!-- 产品管理 -->
    <Row style="margin-top:10px" :loading="prodLoading">
      <row>
        <span>产品名称：</span>
        <i-input v-model="productName"  placeholder="请输入..." style="width: 200px"></i-input>
        <span style="margin-left:20px;">状态：</span>
        <i-select  @on-change="changeStatus" v-model="prodStatusChange" span="6" style="width:200px">
          <i-option v-for="item in prodStatusList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
        <div class="handleBtn">
          <i-button @click="getProductList(1)" type="primary">查询</i-button>
          <i-button @click="increaseProduct" type="primary">新增</i-button>
        </div>
      </row>
      <div style="clear:both;padding-top:20px;">
        <Table border :columns="productList" :data="productData" size="small" ref="table"></Table>
      </div>
      <div style="margin-top:10px;float:right">
        <Page :total="pageTotal"  show-elevator @on-change="pageChange1"></Page>
      </div>
    </Row>
  </div>
 
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      // 点击编辑时暂存费用信息
      holdFeeInfo: {
        // 费用名称
        feeName: '',
        // 费用大类
        feeCategory: '',
        // 费用项
        feeTag: '',
        // 付方
        payCode: '',
        // 收方
        recCode: '',
        // 公式
        formualId: '',
        // 顺序
        feeOrder: '',
        // 描述
        feeDesc: ''
      },
      // 编辑时index标识
      indexFlag: '',
      // 审核备注展示
      reviewFlag: false,
      // 参数配置收款方
      recCode: "",
      // 参数配置付款方
      payCode: "",
      // 付款方列表
      payCodeList: [],
      // 收款方列表
      recCodeList: [],
      // 参数配置模板
      modal2: false,
      // 费用列表模板
      feeListModal: false,
      // 拷贝时的保存按钮
      modifyShow: false,
      // 分页总数
      pageTotal: "",
      pageTotal1: "",
      // 加载
      prodLoading: true,
      // 弹窗加载
      modalLoading: false,
      // 产品管理字段
      productName: "",
      // 产品状态
      prodStatusList: [],
      // 产品信息页模板显示
      productModel: false,
      // 产品类型选择项
      prodTypeList: [],
      // 还款方式选择
      payTypeList: [],
      // 费用大类列表
      feeTypeList: [],
      // 费用大类
      feeCategory: "",
      // 费用名称
      feeName: "",

      // 新增产品页面
      
      // 首期还款日固定日
      fixAddTime: "",
      
      // 代偿后债权归属
      belongCodeList: [],
      belongCode1List: [],
      // 产品基础信息禁用标识
      checkBaseFlag: false,
      // 产品保障模型金庸标识
      checkGuaranteeFlag: false,

      productStatusFlag: false,
      // 基础信息表单数据
      productInfo: {
        productName: "",
        productType: "",
        productCode: "",
        fundType: "1",
        deadlineType: "",
        minDeadline: 0,
        maxDeadline: 0,
        fronInterval: 0,
        intervalTime: "",
        payType: "",
        costFormula: "",
        startInterestType: "",
        specificRepayDate: 0,
        // 起息日增加日期
        startInterestDay: 0,
        toInt: "",
        allocationOrder: "",
        isTransfer: "",
        productStatus: "",
        prdDesc: "",
        productPrice: 0,
        prdCondition: 0
      },
      // 表单验证规则
      prodRuleValidate: {
        productName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        productType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        fundType: [
          { required: true, message: "请选择资金方", trigger: "change" }
        ],
        deadlineType: [
          { required: true, message: "请选择期限", trigger: "change" }
        ],
        minDeadline: [
          { required: true, message: "期限不能为空", trigger: "blur" }
        ],
        maxDeadline: [
          { required: true, message: "期限不能为空", trigger: "blur" }
        ],
        fronInterval: [
          // { required: false, message: "请选择期限间隔", trigger: "change" }
        ],
        intervalTime: [
          // { required: false, message: "期限间隔不能为空", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "请选择还款方式", trigger: "change" }
        ],
        costFormula: [
          { required: true, message: "利息费用公式不能为空", trigger: "blur" }
        ],
        startInterestType: [
          // { required: true, message: "起息日不能为空", trigger: "change" }
        ],
        startInterestDay: [
          // { required: true, message: "不能为空", trigger: "blur" }
        ],
        specificRepayDate: [
          // { required: false, message: "首期还款日不能为空", trigger: "change" }
        ],
        toInt: [
          // { required: true, message: "月还取整不能为空", trigger: "change" }
        ],
        allocationOrder: [
          { required: true, message: "分配顺序不能为空", trigger: "change" }
        ],
        isTransfer: [
          { required: true, message: "支持债转不能为空", trigger: "change" }
        ],
        productStatus: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        prdDesc: [{ required: false, message: "不能为空", trigger: "blur" }]
      },
      // 保障模型设置信息
      guaranteeModelList:[
         {
           // 利息是否默认
          interestFlag: false,
          typeCode: "",
          orgCode: "",
          isLading: "",
          guaranteeFeeList: ["0"],
          belongCode: "",
          recComps: "",
          guaDay: "",
          // 代偿触发增加时间
          guaTime: "",
          isBuyBack: "",
          buyBackPeriod: ""
        }
      ],
      // 保障模型设置验证
      guaRuleValidate: {
        typeCode: [
          { required: false, message: "类型不能为空", trigger: "change" }
        ],
        orgCode: [
          { required: false, message: "机构名称不能为空", trigger: "change" }
        ],
        isLading: [
          { required: false, message: "不能为空", trigger: "change" }
        ],
        // guaranteeFeeList: [
        //   { required: false, message: "担保费用项不能为空", trigger: "change" }
        // ],
        belongCode: [
          { required: false, message: "债权归属不能为空", trigger: "change" }
        ],
        recComps: [
          { required: false, message: "债权收款方不能为空", trigger: "change" }
        ],
        // guaTime: [
        //   { required: false, message: "代偿触发时间不能为空", trigger: "change" }
        // ],
        isBuyBack: [
          { required: false, message: "是否回购不能为空", trigger: "change" }
        ],
        buyBackPeriod: [
          { required: false, message: "逾期不能为空", trigger: "blur" }
        ]
      },
      // 合同模板表头
      contractColumns: [
        {
          title: "合同名称",
          key: "contTemplateCode",
          width: 332,
          align: "center"
        },
        {
          title: "合同类型",
          key: "contTemplateType",
          width: 332,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 382,
          align: "center",
          render: (h, params) => {
            let curData = [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: true == !this.modifyShow ? "disabled" : false
                    
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.saveContractInfo(params);
                    }
                  }
                },
                "保存"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: true == !this.modifyShow ? "disabled" : false
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.deleteContract(params);
                    }
                  }
                },
                "删除"
              )
            ];
            return h("div", curData);
          }
        }
      ],
      // 合同模板内容
      contractData: [],
      // 费用设置表头
      costColumns: [
        {
          title: "名称",
          key: "feeName",
          width: 80,
          align: "center"
        },
        {
          title: "费用大类",
          key: "feeCategory",
          width: 100,
          align: "center"
        },
        {
          title: "费用项",
          key: "feeTag",
          width: 80,
          align: "center"
        },
        {
          title: "付方",
          key: "payCode",
          width: 100,
          align: "center"
        },
        {
          title: "收方",
          key: "recCode",
          width: 100,
          align: "center"
        },
        {
          title: "公式",
          key: "formualId",
          width: 160,
          align: "center"
        },
        {
          title: "顺序",
          key: "feeOrder",
          width: 65,
          align: "center"
        },
        {
          title: "描述",
          key: "feeDesc",
          width: 160,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            let curData = [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: true == !this.modifyShow ? "disabled" : false
                  },
                  style: {
                    marginLeft: "10px",
                    // display: true == !this.modifyShow ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.saveFeeInfo(params);
                    }
                  }
                },
                "保存"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    disabled: true == !this.modifyShow ? "disabled" : false
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: (index) => {
                      this.getRecCode(params);
                      this.getPayCode(params);
                      this.holdFeeInfo.feeName = params.row.feeName,
                      this.holdFeeInfo.feeCategory = params.row.feeCategory,
                      this.holdFeeInfo.feeTag = params.row.feeTag,
                      this.holdFeeInfo.payCode = params.row.payCode,
                      this.holdFeeInfo.recCode = params.row.recCode,
                      this.holdFeeInfo.formualId = params.row.formualId,
                      this.holdFeeInfo.feeOrder = params.row.feeOrder,
                      this.holdFeeInfo.feeDesc = params.row.feeDesc,
                      this.payCode = params.row.payCode,
                      this.modal2 = true;
                      this.indexFlag = index;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: true == !this.modifyShow ? "disabled" : false
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.deleteFee(params);
                    }
                  }
                },
                "删除"
              )
            ];
            return h("div", curData);
          }
        }
      ],
      // 费用设置内容
      costData: [],
      columns4: [
        {
          title: "审核结果",
          key: "customerName2",
          width: 180,
          align: "center"
        },
        {
          title: "审核时间",
          key: "orderId2",
          width: 283,
          align: "center"
        },
        {
          title: "审核人",
          key: "customerName3",
          width: 182,
          align: "center"
        },
        {
          title: "审核备注",
          key: "orderId4",
          width: 400,
          align: "center"
        }
      ],
      data4: [],
      // 产品列表
      productList: [
        {
          title: "序号",
          fixed: "left",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "产品ID",
          key: "id",
          width: 180,
          align: "center"
        },
        {
          title: "产品名称",
          key: "productName",
          width: 180,
          align: "center"
        },
        {
          title: "状态",
          key: "productStatus",
          width: 180,
          align: "center"
        },
        {
          title: "描述",
          key: "prdDesc",
          width: 340,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 397,
          align: "center",
          render: (h, params) => {
            let curData = [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.clearHistory();
                      this.productDefaultList();
                      this.checkBaseFlag = true;
                      this.checkGuaranteeFlag = true;
                      this.modifyShow = false;
                      this.productBaseInfo(params);
                      this.checkGuaranteeInfo(params);
                      this.checkContractInfo(params);
                      this.checkFeeInfo(params);
                      this.productModel = true;
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.clearHistory();
                      this.productDefaultList();
                      this.checkBaseFlag = false;
                      this.checkGuaranteeFlag = false;
                      this.modifyShow = true;
                      this.productBaseInfo(params);
                      this.checkGuaranteeInfo(params);
                      this.checkContractInfo(params);
                      this.checkFeeInfo(params);
                      this.productModel = true;
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.clearHistory();
                      this.productDefaultList();
                      this.checkBaseFlag = false;
                      this.checkGuaranteeFlag = false;
                      this.modifyShow = false;
                      this.productBaseInfo(params);
                      this.checkGuaranteeInfo(params);
                      this.checkContractInfo(params);
                      this.checkFeeInfo(params);
                      this.productModel = true;
                    }
                  }
                },
                "拷贝"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.deleteProduct(params);
                    }
                  }
                },
                "删除"
              )
            ];
            return h("div", curData);
          }
        }
      ],
      productData: [],
      // 费用列表
      feeColumns: [
        {
          title: "名称",
          key: "feeName",
          width: 120,
          align: "center"
        },
        {
          title: "费用大类",
          key: "feeCategory",
          width: 100,
          align: "center"
        },
        {
          title: "费用项",
          key: "feeTag",
          width: 100,
          align: "center"
        },
        {
          title: "付方",
          key: "payCode",
          width: 100,
          align: "center"
        },
        {
          title: "收方",
          key: "recCode",
          width: 100,
          align: "center"
        },
        {
          title: "公式",
          key: "formual",
          width: 165,
          align: "center"
        },
        {
          title: "描述",
          key: "feeDesc",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            let curData = [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.addFeeInfo(params);
                    }
                  }
                },
                "添加"
              )
            ];
            return h("div", curData);
          }
        }
      ],
      // 费用数据内容
      feeData: []
    };
  },
  mounted() {
    // this.getRecCode();
    // this.getPayCode();

    this.getProdStatus();
    this.getProductList();
  },
  watch: {
    productModel(val) {
      if (!val) {
        if (!this.modal2) {
          this.clearHistory();
          this.checkBaseFlag = false;
          this.checkGuaranteeFlag = false;
        }
      }
    }
    // modal2(val) {
    //   if(!val) {

    //   }
    // }
  },
  methods: {
    // 分页
      pageChange(index) {
        this.getProductList(index)
      },
      // 分页
      // pageChange1(index) {
      //   this.findAllFeeList(index)
      // },
    // 获取产品管理列表
    getProductList(index) {
      index = index || 1;
      this.prodLoading = true;
      util
        .ajax({
          url: "product-web/v1/product/getPageQuery",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            pageNum: index,
            pageSize: 10,
            productStyle: "asset",
            name: (this.productName = this.productName || ""),
            status: (this.prodStatusChange = this.prodStatusChange || "")
          }
        })
        .then(res => {
          this.productData = res.data.data.content;
          this.pageTotal = res.data.data.totalPages;
          this.prodLoading = false;
        });
    },
    // 产品状态切换
    changeStatus(s) {
      this.prodStatusChange = s;
    },
    // 获取产品状态
    getProdStatus() {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/get/productStatus",
          method: "get"
        })
        .then(res => {
          this.prodStatusList = res.data.data;
        });
    },
    // 新增产品
    increaseProduct() {
      this.clearHistory();
      this.getProductType();
      this.getPayType();
      this.getOrgCode();
      this.getBelongCode();
      this.getRecComps();
      this.modifyShow = false;
      this.productModel = true;
    },
    // 打开产品信息页面默认请求的列表接口
    productDefaultList() {
      this.getProductType();
      this.getPayType();
      this.getOrgCode();
      this.getBelongCode();
      this.getRecComps();
    },
    // 产品管理删除按钮
    deleteProduct(params) {
      util.ajax({
        url: "product-web/v1/product/delete/asset/"+ params.row.productCode + "/" + params.row.productStatus,
        method: "delete"
      }).then(res => {
        if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.getProductList(1);
          } else {
            this.$Message.error(res.data.msg);
          }
      })
    },
    // 获取产品基础信息类型
    getProductType() {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/get/productType",
          method: "get"
        })
        .then(res => {
          this.prodTypeList = res.data.data;
        });
    },
    // 保存类型选择项
    changeProdType(s) {
      this.productType = s;
    },
    // 保存还款方式
    changePayType(s) {
      this.payType = s;
    },
    // 获取还款方式
    getPayType() {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/get/payType",
          method: "get"
        })
        .then(res => {
          this.payTypeList = res.data.data;
        });
    },
    // 点击费用设置添加时获取费用大类
    getFeeCategory() {
      util
        .ajax({
          url: "fee-web/v1/feeInfo/findAllCostCategory",
          // url: 'fee-web/v1/prdFeeRelation/findAllCostCategory',
          method: "get"
        })
        .then(res => {
          this.feeTypeList = res.data.data;
        });
    },
    // 费用添加按钮 获取费用表格
    addFeeBtn() {
      util
        .ajax({
          url: "fee-web/v1/feeInfo/findAllFeeList",
          // url: 'fee-web/v1/prdFeeRelation/getFeeList',
          method: "get",
          params: {
            pageNumber: 1,
            pageSize: 10
          }
        })
        .then(res => {
          this.feeData = res.data.data.content;
          this.pageTotal1 = res.data.data.totalPages;
        });
      this.getFeeCategory();
      this.feeListModal = true;
    },
    // 查询费用表格按钮
    searchFeeList() {
      util
        .ajax({
          url: "fee-web/v1/feeInfo/findFeeListByNameAndType",
          // url: 'v1/prdFeeRelation/getFeeList',
          method: "get",
          params: {
            pageNumber: 1,
            pageSize: 10,
            feeName: (this.feeName = this.feeName || ""),
            feeCategory: (this.feeCategory = this.feeCategory || "")
          }
        })
        .then(res => {
          this.feeData = res.data.data.content;
          this.pageTotal1 = res.data.data.totalPages;
        });
    },
    // 费用列表里的添加
    addFeeInfo(params) {
      this.costData.push({
        feeName: this.holdFeeInfo.feeName,
        feeCategory: this.holdFeeInfo.feeCategory,
        feeTag: this.holdFeeInfo.feeTag,
        payCode: this.holdFeeInfo.payCode,
        recCode: this.holdFeeInfo.recCode,
        formualId: this.holdFeeInfo.formualId,
        feeOrder: this.holdFeeInfo.feeOrder,
        feeDesc: this.holdFeeInfo.feeDesc
       });

    },
    // 获取保障模型机构名称
    getOrgCode() {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/getDeparts",
          method: "get"
        })
        .then(res => {
          this.orgCodeList = res.data.data;
        });
    },
    changeorgCode(s) {
      this.orgCode = s;
    },
    // 获取代偿后债权归属
    getBelongCode() {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/getBelongs",
          method: "get"
        })
        .then(res => {
          this.belongCodeList = res.data.data;
        });
    },
    changeBelongCode(s) {
      this.belongCode = s;
    },
    // 获取代偿收款方
    getRecComps() {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/getRecComps",
          method: "get"
        })
        .then(res => {
          this.recCompsList = res.data.data;
        });
    },
    changeRecComps(s) {
      this.recComps = s;
    },
    // 获取参数配置收款方
    getRecCode(params) {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/getFeeRecs",
          method: "get",
          params: {
            feeCode: params.row.feeCode
          }
        })
        .then(res => {
          this.recCodeList = res.data.data;
        });
    },
    changeRecCode(s) {
      this.recCode = s;
    },
    // 获取参数配置付款方
    getPayCode(params) {
      util
        .ajax({
          url: "product-web/v1/prdDictionary/getFeePays",
          method: "get",
          params: {
            feeCode: params.row.feeCode
          }
        })
        .then(res => {
          this.payCodeList = res.data.data;
        });
    },
    changePayCode(s) {
      this.payCode = s;
    },
    // 查询产品基础信息接口
    productBaseInfo(params) {
      util
        .ajax({
          url: "product-web/v1/product/getByCode/asset/" + params.row.productCode,
          method: "get"
        })
        .then(res => {
          this.productInfo.productName = res.data.data.productName;
          this.productInfo.productType = res.data.data.productType;
          this.productInfo.fundType = res.data.data.fundType;
          this.productInfo.deadlineType = res.data.data.deadlineType;
          this.productInfo.minDeadline = res.data.data.minDeadline;
          this.productInfo.maxDeadline = res.data.data.maxDeadline;
          this.productInfo.fronInterval = res.data.data.deadlineType;
          this.productInfo.intervalTime = res.data.data.intervalTime;
          this.productInfo.payType = res.data.data.payType;
          this.productInfo.costFormula = res.data.data.costFormula;
          this.productInfo.startInterestType = res.data.data.startInterestType;
          this.productInfo.specificRepayDate = res.data.data.specificRepayDate;
          this.productInfo.toInt = res.data.data.toInt;
          this.productInfo.allocationOrder = res.data.data.allocationOrder;
          this.productInfo.isTransfer = res.data.data.isTransfer;
          this.productInfo.productStatus = res.data.data.productStatus;
          this.productInfo.prdDesc = res.data.data.prdDesc;
        });
    },
    // 查看保障设置信息接口
    checkGuaranteeInfo(params) {
      util
        .ajax({
          url: "product-web/v1/prdGuaranteeModel/getGuaranteeMods/" + params.row.productCode,
          method: "get"
        })
        .then(res => {
          console.log(222,res);
          this.guaranteeModelList = res.data.data;
        });
    },
    // 查看产品合同信息接口
    checkContractInfo(params) {
      util
        .ajax({
          url: "product-web/v1/prdContractRelation/getContractRels/" + params.row.productCode,
          method: "get"
        })
        .then(res => {
          console.log(44,res);
          this.contractData = res.data.data;
        });
    },
    // 查看产品费用设置信息接口
    checkFeeInfo(params) {
      util
        .ajax({
          url: "product-web/v1/prdFeeRelation/getFeeRels/" + params.row.productCode,
          method: "get"
        })
        .then(res => {
          console.log(333,res)
          this.costData = res.data.data;
        });
    },
    // 添加保障模型
    addGuarantee() {
        this.guaranteeModelList.push({
          // 利息是否默认
            interestFlag: false,
            typeCode: "",
            orgCode: "",
            isLading: "",
            guaranteeFeeList: ["0"],
            belongCode: "",
            recComps: "",
            guaDay: "",
            guaTime: "",
            isBuyBack: "",
            buyBackPeriod: ""
        })
    },

    // 暂存按钮
    holdBtn(productInfo, guaranteeModelList) {
      var collectData = {
                  asset: this.productInfo,
                  feeRelList: this.costData,
                  guaranteeModelList: this.guaranteeModelList
                };

      if(this.productInfo.specificRepayDate == 1) {
        this.productInfo.specificRepayDate = this.fixAddTime;
      };
      this.$refs["productInfo"].validate((valid) => {
          if (valid) {
            util
              .ajax({
                url: "product-web/v1/product/save",
                method: "post",
                headers: {
                  "Content-Type": "application/json"
                },
                data: {
                  param: JSON.stringify(collectData),
                  productStyle: "asset"
                }
              })
              .then(res => {
                if (res.data.code == 20000) {
                  this.$Message.success(res.data.msg);
                  this.productModel = false;
                  this.getProductList(1);
                } else {
                  this.$Message.error(res.data.msg);
                }
              });
          } else {
              this.$Message.error('Fail!');
          }
      });
      

    },
    // 取消按钮
    cancelBtn() {
      this.productModel = false;
      this.clearHistory();
    },
    // 清除表单中得历史数据
    clearHistory() {
      this.$refs["productInfo"].resetFields();
      this.guaranteeModelList.splice(0);
    },

    // 修改时基础信息保存按钮
    saveBaseInfo() {
      this.productInfo.fronInterval = Number(this.productInfo.fronInterval);
      this.productInfo.startInterestDay = Number(this.productInfo.startInterestDay)
      util.ajax({
          url: "product-web/v1/product/update",
          method: "put",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            param: JSON.stringify(this.productInfo),
            productStyle: "asset"
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 合同保存
    saveContractInfo(params) {
      util.ajax({
          url: "product-web/v1/prdContractRelation/save",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            id: '',
            productCode: params.row.productCode,
            contTemplateCode: params.row.contTemplateCode,
            contTemplateType: params.row.contTemplateType
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 保存费用信息
    saveFeeInfo(params) {
      util.ajax({
          url: "product-web/v1/prdFeeRelation/save",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            id: '',
            productCode: params.row.productCode,
            feeCode: params.row.feeCode,
            feeOrder: params.row.feeOrder,
            feeTime: params.row.feeTime,
            payCode: params.row.payCode,
            recCode: params.row.recCode
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 费用编辑确定按钮
    updateFeeInfo() {
      this.costData[this.indexFlag].push({
        payCode: this.holdFeeInfo.payCode,
        recCode: this.holdFeeInfo.recCode,
      });
    },
    // 保存保障模型信息
    saveSafeModel() {
      util.ajax({
          url: "product-web/v1/prdGuaranteeModel/save",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: this.guaranteeModelList
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 删除保障模型模块
    deleteGuarantee(index) {
      util.ajax({
          url: "product-web/v1/prdGuaranteeModel/delete/"+ index.id,
          method: "delete",
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.guaranteeModelList.splice(index,1);
            util
            .ajax({
              url: "product-web/v1/prdGuaranteeModel/getGuaranteeMods/" + index.productCode,
              method: "get"
            })
            .then(res => {
              this.guaranteeModelList = this.guaranteeModelList;
            });
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 删除合同
    deleteContract(params) {
      util.ajax({
          url: "product-web/v1/prdContractRelation/delete/"+ params.row.id,
          method: "delete",
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 删除费用
    deleteFee(params) {
      util.ajax({
          url: "product-web/v1/prdFeeRelation/delete/"+ params.row.id,
          method: "delete",
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 改变类型
    changeTypeCode(index, $event) {
      if($event == 0 || $event == 2) {
        this.guaranteeModelList[index].guaranteeFeeList.push("1");
        this.guaranteeModelList[index].interestFlag = true;
      } else if ($event == 1){
        this.guaranteeModelList[index].interestFlag = false;
        // this.guaranteeModelList[index].guaranteeFeeList.$remove("1");
      }
    },
    // 改变回购
    changeIsBuyBack(index, $event) {
      if($event == 1) {
        // this.prodRuleValidate.prdDesc
      }
    }
  }
};
</script>
