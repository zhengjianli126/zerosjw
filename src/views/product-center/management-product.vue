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
    <!-- 新增产品 -->
    <Modal width="1080px" ok-text="保存" v-model="productModel" :mask-closable="false" title="新增/查看/修改产品">
      <i-form ref=productInfo :model="productInfo" :rules="prodRuleValidate" :label-width="100">
        <Row>
          <div style="font-size: 20px; margin-bottom: 10px;">基础信息：</div>
        </Row>
        <Row>
          <i-input v-model="productInfo.productCode" type="hidden"></i-input>
          <i-input v-model="productInfo.id" type="hidden"></i-input>
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
          <Col span="8">
            <Form-item label="提单机构" prop="ladingCompName">
              <!-- <i-select :disabled="checkBaseFlag" @on-change="changeLadingComp"  v-model="productInfo.ladingComp" placeholder="请选择" style="width: 180px">
                  <i-option v-for="item in ladingCompList" :value="item.CUSTID">{{ item.CUSTNAME }}</i-option>
              </i-select> -->
              <i-input @on-focus="orderProduct" :disabled="checkBaseFlag" v-model="productInfo.ladingCompName" placeholder="请输入" style="width: 230px;"></i-input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Form-item label="资金方：" prop="fundType">
              <Radio-group :disabled="checkBaseFlag" v-model="productInfo.fundType">
                  <Radio :disabled="checkBaseFlag" label="1">首金</Radio>
                  <Radio :disabled="checkBaseFlag" label="2">银行</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="预授信流程:" prop="preCredit">
              <i-select :disabled="checkBaseFlag" @on-change="changePreCredit"  v-model="productInfo.preCredit" placeholder="请选择" style="width: 180px">
                  <i-option v-for="item in preCreditList" :value="item.value">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </Col>
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
            <Form-item label="" prop="productName">
              <Input :disabled="checkBaseFlag" type="text" size="small" v-model="productInfo.minDeadline" placeholder="" style="width: 50px;"></Input> 月/日 --
              <!-- <Input-number :disabled="checkBaseFlag" size="small"  style="width: 60px" v-model="productInfo.minDeadline" :max="100" :min="1" :stype="1"></Input-number> 月/日 -- -->
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="" prop="productName">
              <Input :disabled="checkBaseFlag" type="text" size="small" v-model="productInfo.maxDeadline" placeholder="" style="width: 50px;"></Input> 月/日 
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
            <Form-item label="年利率配置公式："  :label-width="120" prop="rateFormual">
              <i-input @on-focus="feeFormuJs" :disabled="checkBaseFlag" v-model="productInfo.rateFormual" placeholder="请输入公式" style="width: 400px;"></i-input>
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
            <i-button :disabled="checkBaseFlag" @click="addContract(1)" style="float:right;" type="primary">添加</i-button>
            <Table style="margin-top: 30px;" border :columns="contractColumns" :data="contractData" size="small" ref="table"></Table>
        </Row>
        <!-- <Row type="flex" v-show="modifyShow" justify="end"  style="margin-top:20px;">
          <i-button type="success" @click="saveContractInfo">保存</i-button>
        </Row> -->

        <!-- 费用设置 -->
        <Row style="padding-top:20px; margin-top:20px; border-top: 1px solid #C2C2C2;">
            <span style="font-size: 20px;">费用设置：</span>
            <i-button :disabled="checkBaseFlag" style="float:right;" @click="addFeeBtn(1)" type="primary">添加</i-button>
            <Table style="margin-top: 30px;" border :columns="costColumns" :data="costData" size="small" ref="table" :loading="feeSetLoading"></Table>
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
                          <Col span="10">
                            <Form-item label="机构名称：" prop="orgCodeAndType">
                              <!-- <Select :disabled="checkGuaranteeFlag" @on-change="changeorgCode(index)" v-model="guaranteeInfo.orgCodeAndType" placeholder="请选择" style="width: 200px">
                                  <Option v-for="item in orgCodeList"  :value="item.CUSTID+'$'+item.CUSTNAME+'$'+item.CUSTTYPE+'$'+item.TYPENAME" :key="item.CUSTID+'$'+item.CUSTNAME+'$'+item.CUSTTYPE+'$'+item.TYPENAME">{{ item.CUSTNAME }}</Option>
                              </Select> -->
                              <i-input @on-focus="orderProductChange(index)" :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.orgCodeAndType" placeholder="请选择" style="width: 230px;"></i-input>
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
                            <!-- <Form-item :label-width="120" label="代偿后债权归属：" prop="belongCode">
                              <Select :disabled="checkGuaranteeFlag" @on-change="changeBelongCode" v-model="guaranteeInfo.belongCode" placeholder="请选择" style="width: 150px">
                                  <Option v-for="item in belongCodeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                            </Form-item> -->
                            <Form-item :label-width="120" label="代偿后债权归属：" prop="belongCode">
                              <Radio-group :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.belongCode">
                                <Radio :disabled="checkGuaranteeFlag" label="1">债权人</Radio>
                                <Radio :disabled="checkGuaranteeFlag" label="2">代偿机构</Radio>
                                <Radio :disabled="checkGuaranteeFlag" label="3">首金</Radio>
                              </Radio-group>
                            </Form-item>
                        </Row>
                        <Row>
                          <!-- <Form-item label="代偿收款方：" prop="recComp">
                            <i-select :disabled="checkGuaranteeFlag" @on-change="changeRecComp"  v-model="guaranteeInfo.recComp" placeholder="请选择" style="width: 150px">
                                <i-option v-for="item in recCompsList" :value="item.value">{{ item.label }}</i-option>
                            </i-select>
                          </Form-item> -->
                          <Form-item :label-width="120" label="代偿后债权归属：" prop="recComp">
                            <Radio-group :disabled="checkGuaranteeFlag" v-model="guaranteeInfo.recComp">
                              <Radio :disabled="checkGuaranteeFlag" label="1">债权人</Radio>
                              <Radio :disabled="checkGuaranteeFlag" label="2">首金</Radio>
                            </Radio-group>
                          </Form-item>
                        </Row>
                        <Row>
                          <Col span="6">
                            <Form-item :label-width="120" label="代偿触发时间：" prop="guaDay">
                              T + <Input-number :disabled="checkGuaranteeFlag" size="small"  style="width: 50px" v-model="guaranteeInfo.guaDay" :max="100" :min="1" :stype="1"></Input-number> 天
                            </Form-item>
                          </Col>
                          <Col span="8">
                            <Form-item :label-width="120" label="" prop="guaTime">
                              <TimePicker :disabled="checkGuaranteeFlag" format="HH:mm" placeholder="选择时间" v-model="guaranteeInfo.guaTime" style="width: 112px"></TimePicker>
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
                    <Row type="flex" v-show="modifyShow" justify="end"  style="margin-top:10px;">
                      <i-button  type="success" @click="saveSafeModel(index)">保存</i-button>
                    </Row>
                     <!-- 机构名称 -->
                    <Modal width="1000px" :mask-closable="false"  v-model="organizeModal" title="机构名称" :loading="loading">
                      <Row>
                          <Radio-group v-model="orgCodeAndTypeName">
                            <Row>
                              <Radio v-for="item in orgCodeAndTypeList" :label="item.custid+'$'+item.custname+'$'+item.custtype+'$'+item.typename" :key="item.custid+'$'+item.custname+'$'+item.custtype+'$'+item.typename">{{ item.custname }}</Radio>
                            </Row>
                          </Radio-group>
                      </Row>
                      <Row>
                        <div style="margin-top:10px;float:right">
                          <Page :total="pageTotal5"  show-elevator @on-change="pageChange5"></Page>
                        </div>
                      </Row>
                      <div slot="footer">
                        <Button  type="success" @click="concernBtn1()">确定</Button>
                      </div>
                    </Modal>
                  </li>
                </ul>
              </i-form> 
            </Row>
        <!-- <Row type="flex" v-show="modifyShow" justify="end"  style="margin-top:10px;">
          <i-button  type="success" @click="saveSafeModel">保存</i-button>
        </Row> -->
           
        <!-- 审核记录 -->
        <Row style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #C2C2C2;">
          <span style="font-size: 20px;" >审核记录：</span>
          <Table style="margin-top: 20px;" border :columns="auditColumn" :data="auditData" size="small" ref="table"></Table>
        </Row>

        <!-- 审核备注 -->
        <Row v-show="reviewFlag" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #C2C2C2;">
          <Row><span style="font-size: 20px;" >审核备注：</span></Row>
          <i-input :disabled="reviewInputFlag" type="textarea" v-model="remark" placeholder="请描述..." style="width: 1050px; margin-top:20px;"></i-input>
        </Row>
      
      <div v-show="commitShow" slot="footer">
          <Button :disabled="checkBaseFlag" v-show="temporaryShow" type="success" @click="holdBtn('productInfo')">暂存</Button>
          <Button :disabled="checkBaseFlag" v-show="true" @click="submitBtn('productInfo')" type="primary">提交</Button>
          <Button :disabled="checkBaseFlag" v-show="true" @click="cancelBtn">取消</Button>
      </div>
      <div v-show="reviewShow" slot="footer">
          <Button type="success" @click="reviewPass">审核通过</Button>
          <Button v-show="true" @click="reviewRefuse" type="error">审核拒绝</Button>
          <Button v-show="true" @click="reviewCancel">取消</Button>
      </div>
    </Modal>

        <!-- 提单机构 -->
    <Modal width="1000px" :mask-closable="false"  v-model="orderModal" title="提单机构" :loading="loading">
      <Row>
          <Radio-group v-model="radioOrder">
            <Row>
              <Radio v-for="item in radioOrderList" :label="item.custid+'-'+item.custname">{{ item.custname }}</Radio>
            </Row>
          </Radio-group>
      </Row>
      <Row>
        <div style="margin-top:10px;float:right">
          <Page :total="pageTotal4"  show-elevator @on-change="pageChange4"></Page>
        </div>
      </Row>
      <div slot="footer">
        <Button  type="success" @click="concernBtn">确定</Button>
      </div>
    </Modal>

        <!-- 机构名称 -->
    

    <Modal  @on-cancel="jsgsCancel" :mask-closable="false" styles="z-index:1000;" width="800px" v-model="modal2" title="公式编辑" :loading="loading">
      <Row>
        <Col span="8">
          <Menu @on-select="route" :theme="theme2" accordion="true" style="min-height:100px;">
            <Submenu name="1">
              <template slot="title">系统变量</template>
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

    <!-- 合同列表 -->
    <Modal width="1200px" :mask-closable="false"  v-model="contractListModal" title="合同列表" :loading="loading">
      <Row>
        <Col span="8">
            <span>合同名称：</span>
            <i-input v-model="contractName" placeholder="请输入名称" style="width: 200px"></i-input>
        </Col>
        <Col span="8">
            <span>合同编号：</span>
            <i-input v-model="contractNo" placeholder="请输入编号" style="width: 200px"></i-input>
        </Col>
        <Col span="8">
            <i-button style="float:right;" @click="addContract(1)" type="primary">查询</i-button>
        </Col>
      </Row>
      <Row>
        <Table style="margin-top: 30px;" border :columns="contractListColumns" :data="contractListData" size="small" ref="table" :loading="contractListLoading"></Table>
      </Row>
      <Row>
        <div style="margin-top:10px;float:right">
          <Page :total="pageTotal2"  show-elevator @on-change="pageChange2"></Page>
        </div>
      </Row>
      
      <div slot="footer">
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
            <i-button style="float:right;" @click="addFeeBtn(1)" type="primary">查询</i-button>
        </Col>
      </Row>
      <Row>
        <Table style="margin-top: 30px;" border :columns="feeColumns" :data="feeData" size="small" ref="table" :loading="feeListLoading"></Table>
      </Row>
      <Row>
        <div style="margin-top:10px;float:right">
          <Page :total="pageTotal1"  show-elevator @on-change="pageChange1"></Page>
        </div>
      </Row>
      
      <div slot="footer">
      </div>
    </Modal>

    <!-- 参数配置 -->
    <Modal width="800px" :mask-closable="false" v-model="paraModal" title="参数配置" :loading="loading">
        <Row>
          <span>公式：</span>
          <i-input type="textarea" disabled v-model="formula" :rows="4" placeholder="" style="width: 600px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top: 20px;">
          <Col span="12">
            <span>收款方：</span>
            <i-select  @on-change="changeRecCode" v-model="recCode" span="6" style="width:150px">
                <i-option v-for="item in recCodeList" :value="item.label+'-'+item.value">{{ item.label }}</i-option>
            </i-select>
          </Col>
          <Col span="12">
            <span>付款方：</span>
            <i-select  @on-change="changePayCode" v-model="payCode" span="6" style="width:150px">
                <i-option v-for="item in payCodeList" :value="item.label+'-'+item.value">{{ item.label }}</i-option>
            </i-select>
          </Col>
        </Row>
        <Row style="margin-top: 20px;">
          <span>顺序：</span>
          <i-input v-model="feeOrder" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
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
            <Button default @click="cancelFeeInfo">取消</Button>
        </div>
    </Modal>
    
    <!-- 产品管理 -->
    <Row style="margin-top:10px" >
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
          <Table border :columns="productList" :data="productData" size="small" ref="table" :loading="prodLoading"></Table>
        </div>
        <div style="margin-top:10px;float:right">
          <Page :total="pageTotal"  show-elevator @on-change="pageChange"></Page>
        </div>
    </Row>
  </div>
 
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      // url前缀
      frontUrl: 'product-web/',
      urlBase:'fee-master-web/',
      // frontUrl: '',
      // urlBase: '',
      flagIndex: '',

      // 提单机构弹窗
      orderModal: false,
      // 机构名称弹窗
      organizeModal: false,
      // 弹窗自定义名称
      radioOrder: '',
      orgCodeAndTypeName: '',
      radioOrderList: [],
      orgCodeAndTypeList: [],
      modal2: false,
      // 系统函数
      findAllSystemFunction: [],
      // 系统变量
      findAllSystemVariables: [],
      srgs: '',
      srgs1: '',
      //公式试算列表
      gsSsList:[],
      // 运算保存 标识，
      ysBcFlag: false,
      // 运算符号
      ysfhJs: [],
      gsjg:'',

      // 拷贝标识
      copyFlag: 0,
      // 页面productCode
      productCodeAll: '',
      // 页面status
      productStatusAll: '',
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
        formula: '',
        // 顺序
        feeOrder: '',
        // 描述
        feeDesc: ''
      },
      // 合同模板
      contractListModal: false,
      // 合同名称
      contractName: "",
      // 合同编号
      contractNo: "",
      // 保存基础信息点击次数
      saveClick: 0,
      // 保存合同点击次数
      saveContractClick: 0,
      // 保存费用保障点击次数
      saveFeeClick: 0,
      // 保存保障模型点击次数
      saveGuaranteeClick: 0,
      // 新增标识
      addFlag: false,
      // 查看标识
      seeFlag: false,
      // 修改标识
      modifyFlag: false,
      // 编辑时index标识
      indexFlag: 0,
      // 审核备注展示
      reviewFlag: false,
      // 审核是否可填
      reviewInputFlag: false,
      // 提交展示
      commitShow: true,
      // 审核展示
      reviewShow: true,
      // 修改时暂存不显示
      temporaryShow: false,
      // 审核备注
      remark: "",
      // 参数配置收款方
      recCode: "",
      // 参数配置付款方
      payCode: "",
      recName: '',
      payName: "",
      // 参数配置中的顺序
      feeOrder: "",
      // 参数配置中的公式
      formula: "",
      // 付款方列表
      payCodeList: [],
      // 收款方列表
      recCodeList: [],
      // 参数配置模板
      paraModal: false,
      // 费用列表模板
      feeListModal: false,
      // 拷贝时的保存按钮
      modifyShow: false,
      // 分页总数
      pageTotal: 0,
      pageTotal1: 0,
      pageTotal2: 0,
      pageTotal4: 0,
      pageTotal5: 0,
      // 加载
      prodLoading: true,
      // 弹窗加载
      modalLoading: false,
      // 费用设置加载
      feeSetLoading: false,
      // 费用大类加载
      feeListLoading: false,
      // 产品管理字段
      productName: "",
      // 产品状态
      prodStatusList: [],
      // 产品信息页模板显示
      productModel: false,
      // 产品类型选择项
      prodTypeList: [],
      // 产品提单机构
      ladingCompList: [],
      // 预授信流程
      preCreditList: [],
      // 还款方式选择
      payTypeList: [],
      // 费用大类列表
      feeTypeList: [],
      // 费用大类
      feeCategory: "",
      // 费用名称
      feeName: "",
      // 点击费用列表里添加时保存隐藏的的收方
      hideRecCode: "",
      hideRecType: "",
      // 点击费用列表里添加时保存隐藏的的付方
      hidePayCode: "",
      hidePayType: "",
      // 新增产品页面
      
      // 首期还款日固定日
      fixAddTime: "",
      
      // 代偿后债权归属
      belongCodeList: [],
      belongCode1List: [],

      orgCodeList: [],
      belongCodeList: [],
      recCompsList: [],
      orgCodeList1: [],
      belongCodeList1: [],
      recCompsList1: [],
      // 产品基础信息禁用标识
      checkBaseFlag: false,
      // 产品保障模型金庸标识
      checkGuaranteeFlag: false,

      productStatusFlag: false,
      // 基础信息表单数据
      productInfo: {
        productName: "",
        productType: "",
        ladingComp: "",
        ladingCompName: "",
        preCredit: "",
        productCode: "",
        id: "",
        fundType: "1",
        deadlineType: "",
        minDeadline: 0,
        maxDeadline: 0,
        fronInterval: 0,
        intervalTime: "",
        payType: "",
        rateFormual: "",
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
        prdCondition: 0,
        wwwwe: 0,
        wwwrr:0
      },
      // 表单验证规则
      prodRuleValidate: {
        // productName: [
        //   { required: true, message: "期限不能为空", trigger: "blur" }
        // ],
        // productName: [
        //   { required: false, message: '期限不能为空', trigger: 'blur' }
        // ],
        productName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        productType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        ladingCompName: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        
        preCredit: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        fundType: [
          { required: true, message: "请选择资金方", trigger: "change" }
        ],
        deadlineType: [
          { required: true, message: "请选择期限", trigger: "change" }
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
        rateFormual: [
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
          guaOrder: 0,
          orgCodeAndType: "",
          orgCode: "",
          orgName: "",
          orgType: "",
          orgTypeName: "",
          isLading: "",
          guaranteeFeeList: ["0"],
          belongCode: "",
          recComp: "",
          guaDay: 0,
          // 代偿触发增加时间
          guaTime: "",
          isBuyBack: "",
          buyBackPeriod: 0
        }
      ],
      // 保障模型设置验证
      guaRuleValidate: {
        typeCode: [
          { required: false, message: "类型不能为空", trigger: "change" }
        ],
        orgCodeAndType: [
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
        recComp: [
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
          key: "contTemplateName",
          width: 332,
          align: "center"
        },
        {
          title: "合同类型",
          key: "contTemplateTypeName",
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
                    disabled: true == !this.seeFlag ? "disabled" : false
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
          key: "payName",
          width: 100,
          align: "center"
        },
        {
          title: "收方",
          key: "recName",
          width: 100,
          align: "center"
        },
        {
          title: "公式",
          key: "formula",
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
                    disabled: true == !this.seeFlag ? "disabled" : false
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.getRecCode(params);
                      this.getPayCode(params);
                      // 暂存数据
                      this.holdFeeInfo.feeName = params.row.feeName,
                      this.holdFeeInfo.feeCategory = params.row.feeCategory,
                      this.holdFeeInfo.feeTag = params.row.feeTag,
                      this.holdFeeInfo.payCode = params.row.payCode,
                      this.holdFeeInfo.recCode = params.row.recCode,
                      this.holdFeeInfo.formualId = params.row.formualId,
                      this.holdFeeInfo.feeOrder = params.row.feeOrder,
                      this.holdFeeInfo.feeDesc = params.row.feeDesc,
                      this.holdFeeInfo.formula = params.row.formula,

                      this.formula = params.row.formula,
                      this.feeOrder = params.row.feeOrder,
                      // this.recCode = params.row.recName + '-' + params.row.recCode,
                      // this.payCode = params.row.payName + '-' + params.row.payCode,
                      // this.hideRecType = params.row.hideRecType,
                      // this.hidePayType = params.row.hidePayType,
                      this.paraModal = true;
                      this.indexFlag = params.index;
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
                    disabled: true == !this.seeFlag ? "disabled" : false
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
      auditColumn: [
        {
          title: "审核结果",
          key: "result",
          width: 180,
          align: "center"
        },
        {
          title: "审核时间",
          key: "checkTime",
          width: 283,
          align: "center"
        },
        {
          title: "审核人",
          key: "operator",
          width: 182,
          align: "center"
        },
        {
          title: "审核备注",
          key: "remark",
          width: 400,
          align: "center"
        }
      ],
      auditData: [],
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
          key: "productStatusDetail",
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
                      this.copyFlag = 0;
                      this.productCodeAll = params.row.productCode;
                      // this.productIdAll = params.row.id;
                      this.productStatusAll = params.row.productStatus;
                      this.checkBaseFlag = true;
                      this.checkGuaranteeFlag = true;
                      this.modifyShow = false;
                      this.seeFlag = false;
                      this.productBaseInfo();
                      this.checkGuaranteeInfo();
                      this.checkContractInfo();
                      this.checkFeeInfo();
                      this.checkAuditList();
                      this.commitShow = true;
                      this.reviewInputFlag = true;
                      this.reviewShow = false;
                      this.temporaryShow = true;
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
                      this.copyFlag = 0;
                      this.productCodeAll = params.row.productCode;
                      // this.productIdAll = params.row.id;
                      this.productStatusAll = params.row.productStatus;
                      this.checkBaseFlag = false;
                      this.checkGuaranteeFlag = false;
                      this.modifyShow = true;
                      this.seeFlag = true;
                      this.productBaseInfo();
                      this.checkGuaranteeInfo();
                      this.checkContractInfo();
                      this.checkFeeInfo();
                      this.checkAuditList();
                      this.reviewInputFlag = false;
                      this.reviewFlag = false;
                      this.commitShow = true;
                      this.reviewShow = false;
                      this.temporaryShow = false;
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
                      this.copyFlag = 0;
                      this.productCodeAll = params.row.productCode;
                      // this.productIdAll = params.row.id;
                      this.productStatusAll = params.row.productStatus;
                      this.checkBaseFlag = true;
                      this.checkGuaranteeFlag = true;
                      this.modifyShow = false;
                      this.seeFlag = false;
                      this.productBaseInfo();
                      this.checkGuaranteeInfo();
                      this.checkContractInfo();
                      this.checkFeeInfo();
                      this.checkAuditList();
                      this.reviewInputFlag = false;
                      this.reviewFlag = true;
                      this.commitShow = false;
                      this.reviewShow = true;
                      this.productModel = true;

                    }
                  }
                },
                "审核"
              ),
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
                      this.publishProduct(params);
                    }
                  }
                },
                "发布"
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
                      this.soldOutProduct(params);
                    }
                  }
                },
                "下架"
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
                      this.copyFlag = 1;
                      this.productCodeAll = params.row.productCode; 
                      this.checkBaseFlag = false;
                      this.checkGuaranteeFlag = false;
                      this.modifyShow = false;
                      this.seeFlag = true;
                      this.productBaseInfo();
                      this.checkGuaranteeInfo();
                      this.checkContractInfo();
                      this.checkFeeInfo();
                      this.reviewInputFlag = false;
                      this.reviewFlag = false;
                      this.commitShow = true;
                      this.reviewShow = false;
                      this.temporaryShow = true;
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
            let curArray = [];
            if (params.row.productStatus == 1) {
              curArray = [curData[0], curData[1], curData[6]];
            } else if (params.row.productStatus == 2) {
              curArray = [curData[0], curData[2]];
            } else if (params.row.productStatus == 3) {
              curArray = [curData[0], curData[3]];
            } else if (params.row.productStatus == 4) {
              curArray = [curData[0], curData[1], curData[6]];
            } else if (params.row.productStatus == 5) {
              curArray = [curData[0], curData[4], curData[5]];
            } else if (params.row.productStatus == 6) {
              curArray = [curData[0]];
            } else if (params.row.productStatus == 7) {
              curArray = [curData[0]];
            };
            return h("div", curArray);
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
          key: "payName",
          width: 100,
          align: "center"
        },
        {
          title: "收方",
          key: "recName",
          width: 100,
          align: "center"
        },
        {
          title: "公式",
          key: "formula",
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
      feeData: [],
      // 合同列表
      contractListColumns: [
        {
          title: "合同id",
          key: "id",
          width: 180,
          align: "center"
        },
        {
          title: "合同编号",
          key: "no",
          width: 100,
          align: "center"
        },
        {
          title: "合同名称",
          key: "name",
          width: 185,
          align: "center"
        },
        {
          title: "备注",
          key: "remark",
          width: 100,
          align: "center"
        },
        {
          title: "启用状态",
          key: "enableStatusText",
          width: 100,
          align: "center"
        },
        {
          title: "提交状态",
          key: "submitStatusText",
          width: 100,
          align: "center"
        },
        {
          title: "合同模板编码",
          key: "typeCode",
          width: 110,
          align: "center"
        },
        {
          title: "合同模板名称",
          key: "typeName",
          width: 110,
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
                      this.addContractInfo(params);
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
      // 合同数据内容
      contractListData: []
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
        if (!this.paraModal) {
          this.clearHistory();
          this.saveClick = 0;
          this.saveGuaranteeClick = 0;
          this.checkBaseFlag = false;
          this.checkGuaranteeFlag = false;
          this.remark = '';
        }
      }
    },
    paraModal(val) {
      if(!val) {
        this.recCode = '',
        this.payCode = '',
        this.feeOrder = ''
      }
    }
  },
  methods: {
    concernBtn() {
     this.productInfo.ladingCompName = this.radioOrder.split('-')[1];
     this.productInfo.ladingComp = this.radioOrder.split('-')[0];
     this.orderModal = false;
    },
    // 点击机构名称框
    orderProductChange(d) {
      this.flagIndex = d;
      this.organizeModal = true;
      this.getOrgCode(1);
      // let orgCodeAll = this.guaranteeModelList[index].orgCodeAndType.split("$");
      // this.guaranteeModelList[index].orgCode = orgCodeAll[0];
      // this.guaranteeModelList[index].orgName = orgCodeAll[1];
      // this.guaranteeModelList[index].orgType = orgCodeAll[2];
      // this.guaranteeModelList[index].orgTypeName = orgCodeAll[3];
    },
    getOrgCode(index) {
      index = index || 1;
       util
        .ajax({
          // url: this.frontUrl + "v1/prdDictionary/getDeparts",
          url: this.frontUrl + "v1/prdDictionary/getNewDeparts",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            pageNum: index,
            pageSize: 10
          }
        })
        .then(res => {
          this.orgCodeAndTypeList = res.data.data.content;
          this.pageTotal5 = res.data.data.totalElements;
        });
    },
    concernBtn1() {
      let trueIndex = this.flagIndex;
     let orgCodeAll= this.orgCodeAndTypeName.split("$");
      this.guaranteeModelList[trueIndex].orgCode = orgCodeAll[0];
      this.guaranteeModelList[trueIndex].orgName = orgCodeAll[1];
      this.guaranteeModelList[trueIndex].orgType = orgCodeAll[2];
      this.guaranteeModelList[trueIndex].orgTypeName = orgCodeAll[3];
      this.guaranteeModelList[trueIndex].orgCodeAndType = orgCodeAll[1];
     this.organizeModal = false;

    },
    // 发布
    publishProduct(params) {
      util.ajax({
        url: this.frontUrl+"v1/product/publish/asset/"+ params.row.productCode + "/" + params.row.productStatus,
        method: "put"
      }).then(res => {
        if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.getProductList(1);
          } else {
            this.$Message.error(res.data.msg);
          }
      })
    },
    // 下架
    soldOutProduct(params) {
      util.ajax({
        url: this.frontUrl + "v1/product/down/asset/"+ params.row.productCode + "/" + params.row.productStatus,
        method: "put"
      }).then(res => {
        if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.getProductList(1);
          } else {
            this.$Message.error(res.data.msg);
          }
      })
    },


    //计算公式
      route(name) {
        this.srgs += name.split('&')[0];
        this.srgs1 += name.split('&')[1];
        if(name.split('&')[2]==1){
         
          this.gsSsList.push({
            a:name.split('&')[0],
            b:name.split('&')[1],
            jsgs:''
          })
           console.log(this.gsSsList)
        }
       
      },
      operationJs(){
          let curObj= {};
          this.gsSsList.forEach(function(item,index){
            curObj[item.b] = item.jsgs;
          })
          curObj.formula = this.srgs;
          console.log(curObj)
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
          // this.modal1 = true;
      },
      // 保存公式
      submitGs() {
        if (this.ysBcFlag == true) {
          this.productInfo.rateFormual = this.srgs;
          
          this.modal2 = false;
          // this.modal1 = true;
          // this.FeeInfo.eformula = this.srgs1;
          // this.FeeInfo.cformula = this.srgs;
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

    // 提单机构弹窗
    orderProduct() {
      this.orderModal = true;
      this.getOrderList(1);
    },
    
    changeorgCode(index) {
      // this.orgCode = s;
      
    },
    // 计算公式弹框
    feeFormuJs() {
      this.modal2 = true;
      this.prodRuleValidate.rateFormual[0].required = false;
      // this.modal1 = false;
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
    },

    // 合同模板添加按钮
    addContract(index) {
      this.contractListModal = true;
      index = index || 1;
      util
        .ajax({
          url: this.frontUrl + "v1/prdContractRelation/getContractList",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            pageNum: index,
            pageSize: 10,
            contractName: (this.contractName = this.contractName || ""),
            contractNo: (this.contractNo = this.contractNo || "")
          }
        })
        .then(res => {
          this.contractListData = res.data.data.content;
          this.pageTotal2 = res.data.data.totalElements;
        });
    },
    // 合同列表里的添加按钮
    addContractInfo(params) {
      this.contractData.push({
        contTemplateName: params.row.name,
        contTemplateTypeName: params.row.typeName,
        contTemplateCode: params.row.no,
        contTemplateType: params.row.typeCode,
       });
       this.contractListModal = false;
    },
    // 分页
      pageChange(index) {
        this.getProductList(index)
      },
      // 分页
      pageChange1(index) {
        this.addFeeBtn(index)
      },
      // 分页
      pageChange2(index) {
        this.addContract(index)
      },
      // 分页
      pageChange4(index) {
        this.getOrderList(index);
      },
      pageChange5(index) {
        this.getOrgCode(index);
      },
      getOrderList(index) {
      index = index || 1;
       util
        .ajax({
          // url: this.frontUrl + "v1/prdDictionary/getDeparts",
          url: this.frontUrl + "v1/prdDictionary/getNewDeparts",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            pageNum: index,
            pageSize: 10
          }
        })
        .then(res => {
          this.radioOrderList = res.data.data.content;
          this.pageTotal4 = res.data.data.totalElements;
        });
    },

    // 获取产品管理列表
    getProductList(index) {
      index = index || 1;
      this.prodLoading = true;
      util
        .ajax({
          url: this.frontUrl + "v1/product/getPageQuery",
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
          this.pageTotal = res.data.data.totalElements;
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
          url: this.frontUrl + "v1/prdDictionary/get/productStatus",
          method: "get"
        })
        .then(res => {
          this.prodStatusList = res.data.data;
        });
    },
    // 新增产品
    increaseProduct() {
      this.clearHistory();
      this.contractData =[];
      this.costData =[];
      this.getProductType();
      // this.getLadingComp();
      this.getPreCredit();
      this.getPayType();
      this.getOrgCode();
      this.getBelongCode();
      this.getRecComps();
      this.modifyShow = false;
      this.seeFlag = true;
      this.commitShow = true;
      this.temporaryShow = true;
      this.reviewShow = false;
      this.productModel = true;
    },
    // 打开产品信息页面默认请求的列表接口
    productDefaultList() {
      this.getProductType();
      // this.getLadingComp();
      this.getPreCredit();
      this.getPayType();
      this.getOrgCode();
      this.getBelongCode();
      this.getRecComps();
    },
    // 产品管理删除按钮
    deleteProduct(params) {

      util.ajax({
        url: this.frontUrl + "v1/product/delete/asset/"+ params.row.productCode + "/" + params.row.productStatus,
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
          url: this.frontUrl + "v1/prdDictionary/get/productType",
          method: "get"
        })
        .then(res => {
          this.prodTypeList = res.data.data;
        });
    },
    // 获取产品基础提单机构
    // getLadingComp() {
    //   util
    //     .ajax({
    //       // url: this.frontUrl + "v1/prdDictionary/getDeparts",
    //       url: this.frontUrl + "v1/prdDictionary/getNewDeparts",
    //       method: "get",
    //       params: {
    //         orgType: 3
    //       }
    //     })
    //     .then(res => {
    //       this.ladingCompList = res.data.data.list;
    //     });
    // },
    // 获取预授信流程
    getPreCredit() {
      util
        .ajax({
          url: this.frontUrl + "v1/prdDictionary/get/preCreditType",
          method: "get"
        })
        .then(res => {
          this.preCreditList = res.data.data;
        });
    },
    // 保存类型选择项
    changeProdType(s) {
      this.productType = s;
    },
    // changeLadingComp(s) {
    //   this.ladingComp = s;
    // },
    changePreCredit(s) {
      this.preCredit = s;
    },
    // 保存还款方式
    changePayType(s) {
      this.payType = s;
    },

    changeRecComp(s) {
      this.recComp = s;
    },
    changeBelongCode(s) {
      this.belongCode = s;
    },
    // 获取还款方式
    getPayType() {
      util
        .ajax({
          url: this.frontUrl + "v1/prdDictionary/get/payType",
          method: "get"
        })
        .then(res => {
          this.payTypeList = res.data.data;
        });
    },
    // 点击费用设置添加时获取费用大类
    getFeeCategory() {
      this.feeSetLoading = true;
      util
        .ajax({
          url: "fee-master-web/v1/feeInfo/findAllCostCategory",
          // url: 'v1/prdFeeRelation/findAllCostCategory',
          method: "get"
        })
        .then(res => {
          this.feeSetLoading = false;
          this.feeTypeList = res.data.data;
        });
    },
    // 费用设置添加按钮 获取费用表格
    addFeeBtn(index) {
      this.getFeeCategory();
      this.feeListModal = true;
      index = index || 1;
      util
        .ajax({
          url: "fee-master-web/v1/feeInfo/findFeeListByNameAndCategory",
          // 本地
          // url: 'v1/prdFeeRelation/getFeeList',
          method: "get",
          params: {
            pageNumber: index,
            pageSize: 10,
            feeName: (this.feeName = this.feeName || ""),
            feeCategory: (this.feeCategory = this.feeCategory || "")
          }
        })
        .then(res => {
          this.feeData = res.data.data.content;
          this.pageTotal1 = res.data.data.totalElements;
        });
    },
    // // 查询费用表格按钮
    // searchFeeList(index) {
    //   index = index || 1;
    //   util
    //     .ajax({
    //       // url: "fee-master-web/v1/feeInfo/findFeeListByNameAndCategory",
    //       url: 'v1/prdFeeRelation/getFeeList',
    //       method: "get",
    //       params: {
    //         pageNumber: index,
    //         pageSize: 5,
    //         feeName: (this.feeName = this.feeName || ""),
    //         feeCategory: (this.feeCategory = this.feeCategory || "")
    //       }
    //     })
    //     .then(res => {
    //       this.feeData = res.data.data.content;
    //       this.pageTotal1 = res.data.data.totalElements;
    //     });
    // },
    // 费用列表里的添加
    addFeeInfo(params) {
      this.costData.push({
        feeCode: params.row.feeCode,
        feeName: params.row.feeName,
        feeCategory: params.row.feeCategory,
        feeTag: params.row.feeTag,
        // payCode: params.row.payCode,
        // recCode: params.row.recCode,
        formula: params.row.formula,
        feeOrder: params.row.feeOrder,
        feeDesc: params.row.feeDesc,
        hideRecType: params.row.recCode,
        hidePayType: params.row.payCode,
        feeType: params.row.feeType
       });
       this.feeListModal = false;
    },
    // 获取保障模型机构名称
    // getOrgCode() {
    //   util
    //     .ajax({
    //       url: this.frontUrl + "v1/prdDictionary/getDeparts",
    //       method: "get",
    //       params: {
    //         // 查询担保机构
    //         orgType: 3
    //       }
    //     })
    //     .then(res => {
    //       this.orgCodeList1 = res.data.data.list;
    //     });
    // },

    

    // 获取代偿后债权归属
    getBelongCode() {
      util
        .ajax({
          url: this.frontUrl + "v1/prdDictionary/get/belongCode",
          method: "get"
        })
        .then(res => {
          this.belongCodeList1 = res.data.data;
        });
    },
    // 获取代偿收款方
    getRecComps() {
      util
        .ajax({
          url: this.frontUrl + "v1/prdDictionary/get/recComp",
          method: "get"
        })
        .then(res => {
          this.recCompsList1 = res.data.data;
        });
    },
    changeRecComps(s) {
      this.recComp = s;
    },
    // 获取参数配置收款方
    getRecCode(params) {
      // let paraRecCode;
      // if(!params.row.recCode && !params.row.payCode) {
      //   paraRecCode = params.row.recName;
      // } else {
      //   paraRecCode = params.row.hideRecType;
      // };
      util
        .ajax({
          url: this.frontUrl + "v1/prdDictionary/getFeeRecs",
          method: "get",
          params: {
            feeCode: params.row.hideRecType
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
      // let paraPayCode;
      // if(!params.row.recCode && !params.row.payCode) {
      //   paraPayCode = params.row.payName;
      // } else {
      //   paraPayCode = params.row.hidePayType;
      // };
      util
        .ajax({
          url: this.frontUrl + "v1/prdDictionary/getFeePays",
          method: "get",
          params: {
            feeCode: params.row.hidePayType
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
    productBaseInfo() {
      let getByCodeUrl;
      if (this.copyFlag == 1) {
        getByCodeUrl = this.frontUrl + "v1/product/copyByCode/asset/" + this.productCodeAll;
      } else {
        getByCodeUrl = this.frontUrl + "v1/product/getByCode/asset/" + this.productCodeAll;
      };
      util
        .ajax({
          url: getByCodeUrl,
          method: "get"
        })
        .then(res => {
          this.productInfo.productName = res.data.data.productName;
          this.productInfo.productType = res.data.data.productType;
          this.productInfo.preCredit = res.data.data.preCredit;
          this.productInfo.ladingComp = res.data.data.ladingComp;
          this.productInfo.ladingCompName = res.data.data.ladingCompName;
          this.productInfo.id = res.data.data.id;
          this.productInfo.fundType = res.data.data.fundType;
          this.productInfo.deadlineType = res.data.data.deadlineType;
          this.productInfo.minDeadline = res.data.data.minDeadline;
          this.productInfo.maxDeadline = res.data.data.maxDeadline;
          this.productInfo.fronInterval = res.data.data.deadlineType;
          this.productInfo.intervalTime = res.data.data.intervalTime;
          this.productInfo.payType = res.data.data.payType;
          this.productInfo.rateFormual = res.data.data.rateFormual;
          this.productInfo.startInterestType = res.data.data.startInterestType;
          this.productInfo.specificRepayDate = res.data.data.specificRepayDate;
          this.productInfo.toInt = res.data.data.toInt;
          this.productInfo.allocationOrder = res.data.data.allocationOrder;
          this.productInfo.isTransfer = res.data.data.isTransfer;
          this.productInfo.productStatus = res.data.data.productStatus;
          this.productInfo.prdDesc = res.data.data.prdDesc;
          this.productInfo.productCode = res.data.data.productCode;
        });
    },
    // 查看保障设置信息接口
    checkGuaranteeInfo() {
      let getByCodeUrl1;
      if (this.copyFlag == 1) {
        getByCodeUrl1 = this.frontUrl + "v1/prdGuaranteeModel/copyGuaranteeMods/" + this.productCodeAll;
      } else {
        getByCodeUrl1 = this.frontUrl + "v1/prdGuaranteeModel/getGuaranteeMods/" + this.productCodeAll;
      };
      util
        .ajax({
          url: getByCodeUrl1,
          method: "get"
        })
        .then(res => {
          this.guaranteeModelList = res.data.data;
        });
    },
    // 查看产品合同信息接口
    checkContractInfo() {
      let getByCodeUrl2;
      if (this.copyFlag == 1) {
        getByCodeUrl2 = this.frontUrl + "v1/prdContractRelation/copyContractRels/" + this.productCodeAll;
      } else {
        getByCodeUrl2 = this.frontUrl + "v1/prdContractRelation/getContractRels/" + this.productCodeAll;
      };
      util
        .ajax({
          url: getByCodeUrl2,
          method: "get"
        })
        .then(res => {
          this.contractData = res.data.data;
        });
    },
    // 查看产品费用设置信息接口
    checkFeeInfo() {
      this.feeSetLoading = true;
      let getByCodeUrl3;
      if (this.copyFlag == 1) {
        getByCodeUrl3 = this.frontUrl + "v1/prdFeeRelation/copyFeeRels/" + this.productCodeAll;
      } else {
        getByCodeUrl3 = this.frontUrl + "v1/prdFeeRelation/getFeeRels/" + this.productCodeAll;
      }
      util
        .ajax({
          url: getByCodeUrl3,
          method: "get"
        })
        .then(res => {
          this.feeSetLoading = false;
          this.costData = res.data.data;
        });
    },
    // 添加保障模型
    addGuarantee() {
      this.orgCodeList = this.orgCodeList1;
      this.belongCodeList = this.belongCodeList1;
      this.recCompsList = this.recCompsList1;
        // this.getOrgCode();
        // this.getBelongCode();
        // this.getRecComps();
        this.guaranteeModelList.push({
          // 利息是否默认
            interestFlag: false,
            typeCode: "",
            guaOrder: 0,
            orgCode: "",
            orgName: "",
            orgType: "",
            orgTypeName: "",
            isLading: "",
            guaranteeFeeList: ["0"],
            belongCode: "",
            recComp: "",
            guaDay: 0,
            guaTime: "",
            isBuyBack: "",
            buyBackPeriod: 0
        });
    },

    // 暂存按钮
    holdBtn(productInfo) {
      var collectData = {
                  asset: this.productInfo,
                  contractRelList: this.contractData,
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
                url: this.frontUrl + "v1/product/save",
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
                  this.$Message.error(res.data.details[0]);
                }
              });
          } else {
              this.$Message.error('暂存失败！');
          }
      });
    },
    // 提交按钮
    submitBtn(productInfo) {
      var collectData = {
                  asset: this.productInfo,
                  contractRelList: this.contractData,
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
                url: this.frontUrl + "v1/product/commit",
                method: "put",
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
                  this.$Message.error(res.data.details[0] ? res.data.details[0] : res.data.msg);
                  // this.$Message.error(res.data.details[0]);
                }
              });
          } else {
              this.$Message.error('提交失败！');
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
      if(this.guaranteeModelList) {
        this.guaranteeModelList.splice(0);
      }
    },

    // 修改时基础信息保存按钮
    saveBaseInfo() {
      if (this.saveClick > 0) {
        this.$Message.error('不能重复保存');
        return false;
      }
      this.productInfo.fronInterval = Number(this.productInfo.fronInterval);
      this.productInfo.startInterestDay = Number(this.productInfo.startInterestDay)
      util.ajax({
          url: this.frontUrl + "v1/product/update",
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
            this.saveClick++;
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 合同保存
    saveContractInfo(params) {
      util.ajax({
          url: this.frontUrl + "v1/prdContractRelation/save",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            id: params.row.id,
            productCode: this.productInfo.productCode,
            contTemplateName: params.row.contTemplateName,
            contTemplateTypeName: params.row.contTemplateTypeName,
            contTemplateCode: params.row.contTemplateCode,
            contTemplateType: params.row.contTemplateType
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.checkContractInfo();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 保存费用信息
    saveFeeInfo(params) {
      util.ajax({
          url: this.frontUrl + "v1/prdFeeRelation/save",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            id: params.row.id,
            productCode: this.productInfo.productCode,
            feeCode: params.row.feeCode,
            feeOrder: params.row.feeOrder,
            feeTime: params.row.feeTime,
            // 收付方code
            payCode: params.row.payCode,
            recCode: params.row.recCode,
            // 收付方名称
            payName: params.row.payName,
            recName: params.row.recName,
            // 费用配的类型
            hideRecType: params.row.hideRecType,
            hidePayType: params.row.hidePayType
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.checkFeeInfo();
          } else {
            this.$Message.error(res.data.details[0]);
          }
        });
    },
    // 费用编辑确定按钮
    updateFeeInfo() {
      this.costData[this.indexFlag].payCode = this.payCode.split('-')[1];
      this.costData[this.indexFlag].recCode = this.recCode.split('-')[1];
      this.costData[this.indexFlag].feeOrder = this.feeOrder;
      this.costData[this.indexFlag].payName = this.payCode.split('-')[0];
      this.costData[this.indexFlag].recName = this.recCode.split('-')[0];
      this.paraModal = false;
    },
    // 费用编辑取消按钮
    cancelFeeInfo() {
      this.paraModal = false;
    },
    // 保存保障模型信息
    saveSafeModel(index) {
      if (this.saveGuaranteeClick > 0) {
        this.$Message.error('不能重复保存');
        return false;
      }
      this.guaranteeModelList[index].guaOrder = index+1;
      // this.guaranteeModelList[index].orgCode = this.guaranteeModelList[index].orgCode.split("$")[0];
      // this.guaranteeModelList[index].orgName = this.guaranteeModelList[index].orgCode.split("$")[1];
      // this.guaranteeModelList[index].orgType = this.guaranteeModelList[index].orgCode.split("$")[2];
      // this.guaranteeModelList[index].orgTypeName = this.guaranteeModelList[index].orgCode.split("$")[3];
      util.ajax({
          url: this.frontUrl + "v1/prdGuaranteeModel/save",
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          data: this.guaranteeModelList[index]
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.saveGuaranteeClick++;
          } else {
            this.$Message.error(res.data.details[0]);
          }
        });
    },
    // 删除保障模型模块
    deleteGuarantee(index) {
      util.ajax({
          url: this.frontUrl + "v1/prdGuaranteeModel/delete/"+ index.id,
          method: "delete",
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.guaranteeModelList.splice(index,1);
            util
            .ajax({
              url: this.frontUrl + "v1/prdGuaranteeModel/getGuaranteeMods/" + index.productCode,
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
      if(!params.row.productCode) {
        this.contractData.splice(params.index,1);
      } else {
        util.ajax({
          url: this.frontUrl + "v1/prdContractRelation/deleteByCode",
          method: "delete",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            productCode: params.row.productCode,
            contTemplateCode:  params.row.contTemplateCode
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.checkContractInfo();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
      }
      
    },
    // 删除费用
    deleteFee(params) {
      if(!params.row.productCode) {
        this.costData.splice(params.index,1);
      } else {
        util.ajax({
          url: this.frontUrl + "v1/prdFeeRelation/deleteByCode",
          method: "delete",
          params: {
            productCode: params.row.productCode,
            feeCode:  params.row.feeCode
          }
        })
        .then(res => {
          if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.checkFeeInfo();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
      }
    },
    // 查询审核记录列表
    checkAuditList() {
      util.ajax({
         url: this.frontUrl + "v1/product/getRecords/asset/"+ this.productCodeAll,
        method: 'get'
      }).then(res => {
        if (res.data.code == 20000) {
            // this.$Message.success(res.data.msg);
            this.auditData = res.data.data;
          } else {
            this.$Message.error(res.data.msg);
          }
      })
    },

    // 审核通过
    reviewPass() {
      util.ajax({
        url: this.frontUrl + "v1/product/check/asset/"+ this.productCodeAll +"/" + this.productStatusAll,
        method: "post",
        data: {
          productCode: this.productCodeAll,
          result: 1,
          remark: this.remark
        }
      }).then(res => {
        if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);
            this.getProductList(1);
          } else {
            this.$Message.error(res.data.msg);
          }
      })
    },
    // 审核拒绝
    reviewRefuse() {
      util.ajax({
        url: this.frontUrl+"v1/product/check/asset/"+ this.productCodeAll +"/" + this.productStatusAll,
        method: "post",
        data: {
          productCode: this.productCodeAll,
          result: 0,
          remark: this.remark
        }
      }).then(res => {
        if (res.data.code == 20000) {
            this.$Message.success(res.data.msg);

          } else {
            this.$Message.error(res.data.msg);
          }
      })
    },
    reviewCancel() {
      this.productModel = false;
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
