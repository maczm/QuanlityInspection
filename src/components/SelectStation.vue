<template>
  <el-dialog width="80%" title="选择工位" :visible="dialogFalg" :show-close="false">
    <el-form :rules="formLabelAlignRules" ref='ruleForm' :label-position="labelPosition" label-width="60px"
      :model="formLabelAlign">
      <el-row>
        <el-col :xs="24" :sm="12">
          <el-form-item label="工厂" prop="facility">
            <el-select v-model="formLabelAlign.facility" placeholder="请选择工厂" @change="facilityChang">
              <el-option v-for="(item, index) in selectionData" :label="item.FacilityName" :value="item" :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产线" prop="productionLine">
            <el-select v-model="formLabelAlign.productionLine" placeholder="请选择产线" @change="productionLineChang">
              <el-option v-for="(item) in ProductionLineList" :label="item.ProductionLineNo + '-' + item.ProductionLineDesc"
                :value="item.ProductionLineNo" :key="item.ProductionLineNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工位" prop="wrokStation">
            <el-select v-model="formLabelAlign.wrokStation" placeholder="请选择工位">
              <el-option v-for="(item, index) in WrokStationList" :label="item.WorkStation + '-' + item.WorkStationDesc"
                :value="item.WorkStation" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="closeClick">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "SelectStation",
  components: {},
  data() {
    return {
      dialogFalg: true,
      labelPosition: "left", //顶部对齐
      formLabelAlign: {
        facility: "",
        productionLine: '',
        wrokStation: '',
      }, //工位信息
      ProductionLineList: [],
      WrokStationList: [],
      formLabelAlignRules: {
        facility: [
          { required: true, message: '请选择工厂' }
        ],
        productionLine: [
          { required: true, message: '请选择产线' }
        ],
        wrokStation: [
          { required: true, message: '请选择工位' }
        ]
      },//工位验证信息
    };
  },
  props: {
    selectionData: {
      type: Array
    }
  },
  mounted() {
    if (localStorage.getItem("formLabelAlignStation")) {
      this.dialogFalg = false;
      let data = JSON.parse(localStorage.getItem("formLabelAlignStation"));
      this.formLabelAlign.facility =  data.facility
      this.ProductionLineList = data.facility.DataList;
      this.WrokStationList = this.ProductionLineList.filter((item) => { return item.ProductionLineNo == data.productionLine })[0].Data;
      this.formLabelAlign.productionLine = data.productionLine
      this.formLabelAlign.wrokStation = data.wrokStation
    }

  },
  methods: {
    facilityChang(data) {
      this.ProductionLineList = data.DataList;
      this.formLabelAlign.productionLine = "";
      this.formLabelAlign.wrokStation = "";
    },
    productionLineChang(data) {
      this.WrokStationList = this.ProductionLineList.filter((item) => { return item.ProductionLineNo == data })[0].Data;
      this.formLabelAlign.wrokStation = "";
    },
    open() {
      this.dialogFalg = true;

    },
    closeClick() {
      console.log(this.formLabelAlign)
      this.dialogFalg = false;
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit("updateStation", this.formLabelAlign)
          localStorage.setItem("formLabelAlignStation", JSON.stringify(this.formLabelAlign))
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
</style>
