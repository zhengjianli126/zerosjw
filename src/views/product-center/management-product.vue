<style lang="less" scoped>
.handleBtn {
  margin-top: 20px;
  border-top: 1px solid rgba(131, 129, 129, 0.808);
  padding-top: 10px;
}
</style>
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <i-button type="primary" @click="modal2 = true">参数配置</i-button>
    <Modal width="800px"  v-model="modal2" title="参数配置":loading="loading">
        <Row>
          <span>公式：</span>
          <i-input disabled :value.sync="value" placeholder="" style="width: 600px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top: 20px;">
          <Col span="12">
            <span>收款方：</span>
            <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
                <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
            </i-select>
          </Col>
          <Col span="12">
            <span>付款方：</span>
            <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
                <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
            </i-select>
          </Col>
        </Row>
        <Row style="margin-top: 20px;">
          <span>顺序：</span>
          <i-input :value.sync="value" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top: 20px;">
          <Col span="12">
            <span>参数1：</span>
            <i-input :value.sync="value" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
          </Col>
          <Col span="12">
            <span>参数2：</span>
            <i-input :value.sync="value" placeholder="" style="width: 120px; margin-left: 20px;"></i-input>
          </Col>
        </Row>
    <div slot="footer">
        <Button type="primary">确定</Button>
        <Button type="primary">取消</Button>
    </div>
    </Modal>
    <i-button type="primary" @click="modal1 = true">显示对话框</i-button>
    <Modal width="1000px" ok-text="保存" v-model="modal1" title="新增/查看/修改产品"
    :loading="loading">
      <Row>
        <div style="font-size: 20px; margin-bottom: 10px;">基础信息：</div>
      </Row>
      <Row>
        <Col span="8">
            <span>名称：</span><i-input  placeholder="请输入..." style="width: 200px"></i-input>
        </Col>
          <Col span="8">
            <span>类型：</span>
            <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
              <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
            </i-select>
        </Col>
        <Col span="8">
            <span>提单机构：</span>
            <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
              <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
            </i-select>
        </Col>
      </Row>
        <Row style="margin-top:10px;">
          资金方：
          <Radio-group v-model="fund">
            <Radio label="shoujin">首金</Radio>
            <Radio label="bank">银行</Radio>
          </Radio-group>
      </Row>
      <Row style="margin-top:10px;">
          期限：
          <Radio-group v-model="period">
            <Radio label="month1">月</Radio>
            <Radio label="day1">日</Radio>
          </Radio-group>
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input> 月/日 --
          <i-input :value.sync="value" placeholder="" style="width: 50px; "></i-input>月/日
      </Row>
      <Row style="margin-top:10px;">
          期间间隔：
          <Radio-group v-model="jiange">
            <Radio label="month2">月</Radio>
            <Radio label="day2">日</Radio>
          </Radio-group>
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input> 月/日
      </Row>
      <Row style="margin-top:10px;">
        <span>还款方式：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="repaymentMethod" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          <span>利息费用公式：</span>
          <i-input :value.sync="value" placeholder="" style="width: 200px; margin-left: 20px;"></i-input>
      </Row>
      <Row style="margin-top:10px;">
        <span>起息日：</span>
          <Radio-group v-model="qxr">
            <Radio style="margin-left: 20px;" label="month2">审核通过后 + <i-input :value.sync="value" placeholder="" style="width: 20px; "></i-input></Radio> 日
            <Radio style="margin-left: 20px;" label="month2">放款成功后 + <i-input :value.sync="value" placeholder="" style="width: 20px; "></i-input></Radio> 日
            <Radio style="margin-left: 20px;" label="month2">固定每月 + <i-input :value.sync="value" placeholder="" style="width: 20px; "></i-input></Radio> 日
          </Radio-group>
      </Row>
      <Row style="margin-top:10px;">
          <span>首期还款日：</span>
          <Radio-group v-model="repayday">
            <Radio label="shoujin">起息日后1期</Radio>
            <Radio label="bank">固定每月 <i-input :value.sync="value" placeholder="" style="width: 20px; "></i-input>日</Radio>
          </Radio-group>
      </Row>
      <Row style="margin-top:10px;">
          <span>月还取整：</span>
          <Radio-group v-model="yhqz">
            <Radio label="shoujin">是</Radio>
            <Radio label="bank">否</Radio>
          </Radio-group>
      </Row>
      <Row style="margin-top:10px;">
          <span>分配顺序：</span>
          <Radio-group v-model="fpsx">
            <Radio label="shoujin">费息本</Radio>
            <Radio label="bank">本息费</Radio>
          </Radio-group>
      </Row>
      <Row style="margin-top:10px;">
          <span>支持债转：</span>
          <Radio-group v-model="zczz">
            <Radio label="shoujin">支持</Radio>
            <Radio label="bank">不支持</Radio>
          </Radio-group>
      </Row>
      <Row style="margin-top:10px; margin-bottom: 40px;">
          <span >产品描述：</span>
        <i-input type="textarea" :value.sync="value" placeholder="" style="width: 650px; height: 30px;"></i-input>
      </Row>
      <Row style="padding-top:20px; border-top: 1px solid #000;">
          <span style="font-size: 20px;">合同模板：</span>
          <i-button style="float:right;" type="primary">添加</i-button>
        <Table style="margin-top: 30px;" border :columns="columns2" :data="data2" size="small" ref="table"></Table>
      </Row>
      <Row style="padding-top:20px; margin-top:30px; border-top: 1px solid #000;">
          <span style="font-size: 20px;">费用设置：</span>
          <i-button style="float:right;" type="primary">添加</i-button>
        <Table style="margin-top: 30px;" border :columns="columns3" :data="data3" size="small" ref="table"></Table>
      </Row>
      <Row style="padding-top:20px; margin-top:30px; border-top: 1px solid #000;">
          <span style="font-size: 20px;">保障模型设置：</span>
          <i-button style="float:right;" type="primary">添加</i-button>
      </Row>
      <Row style="margin-top:10px;">
        <Row style="margin-bottom: 15px; border-top: 1px solid #000; padding-top: 20px;">
          <span>偿付顺序1</span>
          <Icon style="float:right; " size="40px" type="minus-circled"></Icon>
        </Row>
        <Row style="margin-top:10px;">
          <span>类型：</span>
          <Radio-group v-model="fund">
            <Radio label="shoujin">借款人</Radio>
            <Radio label="bank">保险</Radio>
            <Radio label="bank">担保机构</Radio>
          </Radio-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>机构名称：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>提单关联机构：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">是</Radio>
                <Radio label="bank">否</Radio>
              </Radio-group>
          </Col>
        </Row>
        <Row style="margin-top:10px;">
          <span>担保费用项：</span>
          <Checkbox-group v-model="fruit">
            <Checkbox label="1">本金</Checkbox>
            <Checkbox label="2">利息</Checkbox>
            <Checkbox label="3">首金服务费</Checkbox>
            <Checkbox label="1">引流费</Checkbox>
            <Checkbox label="2">保险费</Checkbox>
            <Checkbox label="3">担保费</Checkbox>
            <Checkbox label="1">资管费</Checkbox>
            <Checkbox label="2">返佣</Checkbox>
            <Checkbox label="3">贴息</Checkbox>
            <Checkbox label="3">罚滞</Checkbox>
          </Checkbox-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>代偿后债权归属：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>代偿收款方：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
        </Row>
          <Row style="margin-top:10px;">
          <span>代偿触发时间：</span>
          T + <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>天
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>是否回购：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">否</Radio>
                <Radio label="bank">是</Radio>
              </Radio-group>
          </Col>
          <Col span="8">
            <span>连续逾期：</span>
            <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>期
          </Col>
          
        </Row>
      </Row>
      <Row style="margin-top:10px;  border-top: 1px solid #000; padding-top: 20px;">
        <Row style="margin-bottom: 15px;">
          <span>偿付顺序2</span>
          <Icon style="float:right; " size="40px" type="minus-circled"></Icon>
        </Row>
        <Row style="margin-top:10px;">
          <span>类型：</span>
          <Radio-group v-model="fund">
            <Radio label="shoujin">借款人</Radio>
            <Radio label="bank">保险</Radio>
            <Radio label="bank">担保机构</Radio>
          </Radio-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>机构名称：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>提单关联机构：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">是</Radio>
                <Radio label="bank">否</Radio>
              </Radio-group>
          </Col>
        </Row>
        <Row style="margin-top:10px;">
          <span>担保费用项：</span>
          <Checkbox-group v-model="fruit">
            <Checkbox label="1">本金</Checkbox>
            <Checkbox label="2">利息</Checkbox>
            <Checkbox label="3">首金服务费</Checkbox>
            <Checkbox label="1">引流费</Checkbox>
            <Checkbox label="2">保险费</Checkbox>
            <Checkbox label="3">担保费</Checkbox>
            <Checkbox label="1">资管费</Checkbox>
            <Checkbox label="2">返佣</Checkbox>
            <Checkbox label="3">贴息</Checkbox>
            <Checkbox label="3">罚滞</Checkbox>
          </Checkbox-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>代偿后债权归属：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>代偿收款方：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
        </Row>
          <Row style="margin-top:10px;">
          <span>代偿触发时间：</span>
          T + <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>天
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>是否回购：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">否</Radio>
                <Radio label="bank">是</Radio>
              </Radio-group>
          </Col>
          <Col span="8">
            <span>连续逾期：</span>
            <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>期
          </Col>
          
        </Row>
      </Row>
      <Row style="margin-top:10px;  border-top: 1px solid #000; padding-top: 20px;">
        <Row style="margin-bottom: 15px;">
          <span>偿付顺序3</span>
          <Icon style="float:right; " size="40px" type="minus-circled"></Icon>
        </Row>
        <Row style="margin-top:10px;">
          <span>类型：</span>
          <Radio-group v-model="fund">
            <Radio label="shoujin">借款人</Radio>
            <Radio label="bank">保险</Radio>
            <Radio label="bank">担保机构</Radio>
          </Radio-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>机构名称：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>提单关联机构：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">是</Radio>
                <Radio label="bank">否</Radio>
              </Radio-group>
          </Col>
        </Row>
        <Row style="margin-top:10px;">
          <span>担保费用项：</span>
          <Checkbox-group v-model="fruit">
            <Checkbox label="1">本金</Checkbox>
            <Checkbox label="2">利息</Checkbox>
            <Checkbox label="3">首金服务费</Checkbox>
            <Checkbox label="1">引流费</Checkbox>
            <Checkbox label="2">保险费</Checkbox>
            <Checkbox label="3">担保费</Checkbox>
            <Checkbox label="1">资管费</Checkbox>
            <Checkbox label="2">返佣</Checkbox>
            <Checkbox label="3">贴息</Checkbox>
            <Checkbox label="3">罚滞</Checkbox>
          </Checkbox-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
            <span>代偿后债权归属：</span>
            <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
              <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
            </i-select>
          </Col>
          <Col span="8">
            <span>代偿收款方：</span>
            <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
              <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
            </i-select>
          </Col>
        </Row>
          <Row style="margin-top:10px;">
          <span>代偿触发时间：</span>
          T + <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>天
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>是否回购：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">否</Radio>
                <Radio label="bank">是</Radio>
              </Radio-group>
          </Col>
          <Col span="8">
            <span>连续逾期：</span>
            <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>期
          </Col>
          
        </Row>
      </Row>
      <Row style="margin-top:10px;  border-top: 1px solid #000; padding-top: 20px;">
        <Row style="margin-bottom: 15px;">
          <span>偿付顺序4</span>
          <Icon style="float:right; " size="40px" type="minus-circled"></Icon>
        </Row>
        <Row style="margin-top:10px;">
          <span>类型：</span>
          <Radio-group v-model="fund">
            <Radio label="shoujin">借款人</Radio>
            <Radio label="bank">保险</Radio>
            <Radio label="bank">担保机构</Radio>
          </Radio-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>机构名称：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>提单关联机构：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">是</Radio>
                <Radio label="bank">否</Radio>
              </Radio-group>
          </Col>
        </Row>
        <Row style="margin-top:10px;">
          <span>担保费用项：</span>
          <Checkbox-group v-model="fruit">
            <Checkbox label="1">本金</Checkbox>
            <Checkbox label="2">利息</Checkbox>
            <Checkbox label="3">首金服务费</Checkbox>
            <Checkbox label="1">引流费</Checkbox>
            <Checkbox label="2">保险费</Checkbox>
            <Checkbox label="3">担保费</Checkbox>
            <Checkbox label="1">资管费</Checkbox>
            <Checkbox label="2">返佣</Checkbox>
            <Checkbox label="3">贴息</Checkbox>
            <Checkbox label="3">罚滞</Checkbox>
          </Checkbox-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>代偿后债权归属：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>代偿收款方：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
        </Row>
          <Row style="margin-top:10px;">
          <span>代偿触发时间：</span>
          T + <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>天
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>是否回购：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">否</Radio>
                <Radio label="bank">是</Radio>
              </Radio-group>
          </Col>
          <Col span="8">
            <span>连续逾期：</span>
            <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>期
          </Col>
          
        </Row>
      </Row>
      <Row style="margin-top:10px;  border-top: 1px solid #000; padding-top: 20px;">
        <Row style="margin-bottom: 15px;">
          <span>偿付顺序5</span>
          <Icon style="float:right; " size="40px" type="minus-circled"></Icon>
        </Row>
        <Row style="margin-top:10px;">
          <span>类型：</span>
          <Radio-group v-model="fund">
            <Radio label="shoujin">借款人</Radio>
            <Radio label="bank">保险</Radio>
            <Radio label="bank">担保机构</Radio>
          </Radio-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>机构名称：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>提单关联机构：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">是</Radio>
                <Radio label="bank">否</Radio>
              </Radio-group>
          </Col>
        </Row>
        <Row style="margin-top:10px;">
          <span>担保费用项：</span>
          <Checkbox-group v-model="fruit">
            <Checkbox label="1">本金</Checkbox>
            <Checkbox label="2">利息</Checkbox>
            <Checkbox label="3">首金服务费</Checkbox>
            <Checkbox label="1">引流费</Checkbox>
            <Checkbox label="2">保险费</Checkbox>
            <Checkbox label="3">担保费</Checkbox>
            <Checkbox label="1">资管费</Checkbox>
            <Checkbox label="2">返佣</Checkbox>
            <Checkbox label="3">贴息</Checkbox>
            <Checkbox label="3">罚滞</Checkbox>
          </Checkbox-group>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>代偿后债权归属：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
          <Col span="8">
          <span>代偿收款方：</span>
          <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:150px">
            <i-option v-for="item in name1" :value="item.id">{{ item.organizeName }}</i-option>
          </i-select>
          </Col>
        </Row>
          <Row style="margin-top:10px;">
          <span>代偿触发时间：</span>
          T + <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>天
          <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="8">
          <span>是否回购：</span>
              <Radio-group v-model="fund">
                <Radio label="shoujin">否</Radio>
                <Radio label="bank">是</Radio>
              </Radio-group>
          </Col>
          <Col span="8">
            <span>连续逾期：</span>
            <i-input :value.sync="value" placeholder="" style="width: 50px; margin-left: 20px;"></i-input>期
          </Col>
          
        </Row>
      </Row>
      <Row style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #000;">
        <span style="font-size: 20px;" >审核记录：</span>
        <Table  style="margin-top: 20px;" border :columns="columns4" :data="data4" size="small" ref="table"></Table>
      </Row>
    </Modal>

    <row style="margin-top:10px">
      <span>产品名称：</span><i-input  placeholder="请输入..." style="width: 300px"></i-input>
        <span>状态：</span>
      <i-select  @on-change="changeName1"  :disabled="organizeDisabled" :model.sync="organize" span="6" style="width:200px">
        <i-option v-for="item in name1" :value="item.id+-+item.levelArent">{{ item.organizeName }}</i-option>
        </i-select>
        <div class="handleBtn">
          <i-button type="primary">查询</i-button>
          <i-button type="primary">新增</i-button>
          <i-button type="primary">拷贝</i-button>
        </div>
    </row>
    
  
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
      button1: "北京",
      modal1: false,
      modal2: false,
      loading: true,
      total: 0,
      pageNum: 0,
      pageSize: 10,
      organize: "",
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
      options1: {},

      animal: "",
      fund: "",
      period: "",
      jiange: "",
      qxr: "",
      repayday: "",
      yhqz: "",
      fpsx: "",
      zczz: "",
      fruit: "",
      repaymentMethod: "",
      columns2: [
        {
          title: "合同名称",
          key: "customerName2",
          width: 250
        },
        {
          title: "合同类型",
          key: "orderId2",
          width: 250
          //    "sortable": true
        },
        {
          title: "操作",
          key: "orderTime2",
          width: 250,
          render: (h, params) => {
            const orderDealTime = util.formatDate(params.row.orderDealTime);
            return h("div", orderDealTime);
          }
          //    "sortable": true
        }
      ],
      data2: [],
      columns3: [
        {
          title: "名称",
          key: "customerName2",
          width: 80
        },
        {
          title: "费用大类",
          key: "orderId2",
          width: 80
          //    "sortable": true
        },
        {
          title: "费用项",
          key: "customerName2",
          width: 80
        },
        {
          title: "付方",
          key: "orderId2",
          width: 100
          //    "sortable": true
        },
        {
          title: "收方",
          key: "customerName2",
          width: 100
        },
        {
          title: "公式",
          key: "orderId2",
          width: 160
          //    "sortable": true
        },
        {
          title: "顺序",
          key: "orderId2",
          width: 60
          //    "sortable": true
        },
        {
          title: "描述",
          key: "orderId2",
          width: 160
          //    "sortable": true
        },
        {
          title: "操作",
          key: "orderTime2",
          width: 120,
          render: (h, params) => {
            const orderDealTime = util.formatDate(params.row.orderDealTime);
            return h("div", orderDealTime);
          }
          //    "sortable": true
        }
      ],
      data3: [],
      columns4: [
        {
          title: "审核结果",
          key: "customerName2",
          width: 150
        },
        {
          title: "审核时间",
          key: "orderId2",
          width: 150
          //    "sortable": true
        },
        {
          title: "审核人",
          key: "customerName2",
          width: 150
        },
        {
          title: "审核备注",
          key: "orderId2",
          width: 300
          //    "sortable": true
        }
      ],
      data4: [],
      columns8: [
        {
          title: "产品ID",
          type: "index",
          fixed: "left",
          width: 100
        },
        {
          title: "产品名称",
          key: "customerName",
          width: 150
        },
        {
          title: "提单机构",
          key: "orderId",
          width: 150
          //    "sortable": true
        },
        {
          title: "状态",
          key: "productName",
          width: 150
          //    "sortable": true
        },
        {
          title: "描述",
          key: "productTime",
          width: 320
          //    "sortable": true
        },
        {
          title: "操作",
          key: "orderTime",
          width: 335,
          render: (h, params) => {
            const orderDealTime = util.formatDate(params.row.orderDealTime);
            return h("div", orderDealTime);
          }
          //    "sortable": true
        }
      ],
      data8: []
    };
  },
  mounted() {},
  created() {},
  methods: {
    changeName1() {},
    searchData() {}
  }
};
</script>
