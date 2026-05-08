<template>
  <div class="headerInfo">
    <div class="headerInfo-row">
      <div class="headerInfo-row-left">
        <div class="line-height" @click="$emit('SelectStation')">
          <div class="title-bg">
            {{ showSpecialConfiguration ? "当前工位" : "" }}
            <div style="white-space: nowrap">
              {{ selectStationData.wrokStation || "点击选择工位" }}
            </div>
          </div>
          <div
            class="title-bg"
            style="background-color: #f4f4f5; color: #2c3e50"
            v-if="showSpecialConfiguration"
          >
            机型编码
            <div style="white-space: nowrap">{{ stationData.ProductNo }}</div>
          </div>
        </div>
      </div>
      <div
        class="headerInfo-row-right input-box border-left"
        :span="15"
        :lg="15"
      >
        <el-form ref="ruleForm" label-width="65px" :model="formLabelAlign">
          <el-form-item label="当前订单" prop="WipOrderNo">
            <el-input v-model="formLabelAlign.WipOrderNo">
              <div slot="append">
                <el-button @click="seach('WipOrderNo')">
                  <svg
                    t="1735261568655"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8288"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M680.728354 651.326209c121.274064-137.208988 116.320239-346.908988-14.939247-478.166427-136.444579-136.433322-357.662913-136.433322-494.094188 0-136.443555 136.442532-136.443555 357.661889 0 494.105445 131.241067 131.253346 340.927763 136.204102 478.149031 14.942317l265.63187 265.63187 30.889521-30.877241L680.728354 651.326209zM649.273968 622.002346l-28.658713 28.668946c-120.345925 105.622596-303.678394 101.031021-418.524049-13.812587-119.651101-119.651101-119.651101-313.648466 0-433.299567C321.742307 83.909062 515.740696 83.909062 635.39282 203.569372 750.211868 318.380234 754.826979 501.656421 649.273968 622.002346z"
                      fill="#5D5D5D"
                      p-id="8289"
                    ></path>
                  </svg>
                </el-button>
                <el-button @click="onCamera('WipOrderNo')" v-if="isApp">
                  <svg
                    t="1735261528500"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8122"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M900.583644 150.827147l0 206.341508 51.588959 0 0-232.137011c0-56.423057-51.588959-51.574632-51.588959-51.574632L668.437423 73.457012l0 51.574632 206.351742 0C874.789165 125.031645 900.583644 125.839033 900.583644 150.827147z"
                      fill="#5D5D5D"
                      p-id="8123"
                    ></path>
                    <path
                      d="M126.755404 150.828171c0-24.988114 25.793456-25.795503 25.793456-25.795503l206.353788 0 0-51.574632-232.147244 0c0 0-51.588959-4.847401-51.588959 51.574632l0 232.137011 51.588959 0L126.755404 150.828171z"
                      fill="#5D5D5D"
                      p-id="8124"
                    ></path>
                    <path
                      d="M900.582621 873.070522 900.582621 873.070522c0.001023 25.001417-25.793456 25.806759-25.793456 25.806759L668.4364 898.877281l0 51.574632 232.146221 0c0 0 51.588959 4.810562 51.588959-51.574632L952.17158 666.714687l-51.588959 0L900.582621 873.070522z"
                      fill="#5D5D5D"
                      p-id="8125"
                    ></path>
                    <path
                      d="M126.755404 873.070522 126.755404 666.714687 75.167468 666.714687l0 232.162594c0 56.388265 51.588959 51.572586 51.588959 51.572586l232.148267 0 0-51.572586L152.54886 898.877281C152.54886 898.877281 126.755404 898.068869 126.755404 873.070522z"
                      fill="#5D5D5D"
                      p-id="8126"
                    ></path>
                    <path
                      d="M75.167468 486.152309l877.007181 0 0 51.587935-877.007181 0 0-51.587935Z"
                      fill="#5D5D5D"
                      p-id="8127"
                    ></path>
                  </svg>
                </el-button>
              </div>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="showSpecialConfiguration"
            label="月顺序号"
            prop="MonthSequence"
          >
            <el-input v-model="formLabelAlign.MonthSequence">
              <div slot="append">
                <el-button @click="seach('MonthSequence')">
                  <svg
                    t="1735261568655"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8288"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M680.728354 651.326209c121.274064-137.208988 116.320239-346.908988-14.939247-478.166427-136.444579-136.433322-357.662913-136.433322-494.094188 0-136.443555 136.442532-136.443555 357.661889 0 494.105445 131.241067 131.253346 340.927763 136.204102 478.149031 14.942317l265.63187 265.63187 30.889521-30.877241L680.728354 651.326209zM649.273968 622.002346l-28.658713 28.668946c-120.345925 105.622596-303.678394 101.031021-418.524049-13.812587-119.651101-119.651101-119.651101-313.648466 0-433.299567C321.742307 83.909062 515.740696 83.909062 635.39282 203.569372 750.211868 318.380234 754.826979 501.656421 649.273968 622.002346z"
                      fill="#5D5D5D"
                      p-id="8289"
                    ></path>
                  </svg>
                </el-button>
                <el-button @click="onCamera('MonthSequence')" v-if="isApp">
                  <svg
                    t="1735261528500"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8122"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M900.583644 150.827147l0 206.341508 51.588959 0 0-232.137011c0-56.423057-51.588959-51.574632-51.588959-51.574632L668.437423 73.457012l0 51.574632 206.351742 0C874.789165 125.031645 900.583644 125.839033 900.583644 150.827147z"
                      fill="#5D5D5D"
                      p-id="8123"
                    ></path>
                    <path
                      d="M126.755404 150.828171c0-24.988114 25.793456-25.795503 25.793456-25.795503l206.353788 0 0-51.574632-232.147244 0c0 0-51.588959-4.847401-51.588959 51.574632l0 232.137011 51.588959 0L126.755404 150.828171z"
                      fill="#5D5D5D"
                      p-id="8124"
                    ></path>
                    <path
                      d="M900.582621 873.070522 900.582621 873.070522c0.001023 25.001417-25.793456 25.806759-25.793456 25.806759L668.4364 898.877281l0 51.574632 232.146221 0c0 0 51.588959 4.810562 51.588959-51.574632L952.17158 666.714687l-51.588959 0L900.582621 873.070522z"
                      fill="#5D5D5D"
                      p-id="8125"
                    ></path>
                    <path
                      d="M126.755404 873.070522 126.755404 666.714687 75.167468 666.714687l0 232.162594c0 56.388265 51.588959 51.572586 51.588959 51.572586l232.148267 0 0-51.572586L152.54886 898.877281C152.54886 898.877281 126.755404 898.068869 126.755404 873.070522z"
                      fill="#5D5D5D"
                      p-id="8126"
                    ></path>
                    <path
                      d="M75.167468 486.152309l877.007181 0 0 51.587935-877.007181 0 0-51.587935Z"
                      fill="#5D5D5D"
                      p-id="8127"
                    ></path>
                  </svg>
                </el-button>
              </div>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="showSpecialConfiguration"
            label="车架号"
            prop="Vin"
          >
            <el-input v-model="formLabelAlign.Vin">
              <div slot="append">
                <el-button @click="seach('Vin')">
                  <svg
                    t="1735261568655"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8288"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M680.728354 651.326209c121.274064-137.208988 116.320239-346.908988-14.939247-478.166427-136.444579-136.433322-357.662913-136.433322-494.094188 0-136.443555 136.442532-136.443555 357.661889 0 494.105445 131.241067 131.253346 340.927763 136.204102 478.149031 14.942317l265.63187 265.63187 30.889521-30.877241L680.728354 651.326209zM649.273968 622.002346l-28.658713 28.668946c-120.345925 105.622596-303.678394 101.031021-418.524049-13.812587-119.651101-119.651101-119.651101-313.648466 0-433.299567C321.742307 83.909062 515.740696 83.909062 635.39282 203.569372 750.211868 318.380234 754.826979 501.656421 649.273968 622.002346z"
                      fill="#5D5D5D"
                      p-id="8289"
                    ></path>
                  </svg>
                </el-button>
                <el-button @click="onCamera('Vin')" v-if="isApp"
                  ><svg
                    t="1735261528500"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8122"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M900.583644 150.827147l0 206.341508 51.588959 0 0-232.137011c0-56.423057-51.588959-51.574632-51.588959-51.574632L668.437423 73.457012l0 51.574632 206.351742 0C874.789165 125.031645 900.583644 125.839033 900.583644 150.827147z"
                      fill="#5D5D5D"
                      p-id="8123"
                    ></path>
                    <path
                      d="M126.755404 150.828171c0-24.988114 25.793456-25.795503 25.793456-25.795503l206.353788 0 0-51.574632-232.147244 0c0 0-51.588959-4.847401-51.588959 51.574632l0 232.137011 51.588959 0L126.755404 150.828171z"
                      fill="#5D5D5D"
                      p-id="8124"
                    ></path>
                    <path
                      d="M900.582621 873.070522 900.582621 873.070522c0.001023 25.001417-25.793456 25.806759-25.793456 25.806759L668.4364 898.877281l0 51.574632 232.146221 0c0 0 51.588959 4.810562 51.588959-51.574632L952.17158 666.714687l-51.588959 0L900.582621 873.070522z"
                      fill="#5D5D5D"
                      p-id="8125"
                    ></path>
                    <path
                      d="M126.755404 873.070522 126.755404 666.714687 75.167468 666.714687l0 232.162594c0 56.388265 51.588959 51.572586 51.588959 51.572586l232.148267 0 0-51.572586L152.54886 898.877281C152.54886 898.877281 126.755404 898.068869 126.755404 873.070522z"
                      fill="#5D5D5D"
                      p-id="8126"
                    ></path>
                    <path
                      d="M75.167468 486.152309l877.007181 0 0 51.587935-877.007181 0 0-51.587935Z"
                      fill="#5D5D5D"
                      p-id="8127"
                    ></path></svg
                ></el-button>
              </div>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderInfo",
  components: {},
  data() {
    return {
      isApp: false,
      formLabelAlign: {
        WipOrderNo: "",
        MonthSequence: "",
        Vin: "",
      },
    };
  },
  props: {
    showSpecialConfiguration: {
      type: Boolean,
    },
    selectStationData: {
      type: Object,
    },
    stationData: {
      type: Object,
      default: function () {
        return {
          name: "",
          value: 0,
        };
      },
    },
  },
  watch: {
    stationData: {
      handler(data) {
        this.formLabelAlign.WipOrderNo = data.WipOrderNo;
        this.formLabelAlign.MonthSequence = data.MonthSequence;
        this.formLabelAlign.Vin = data.Vin;
      },
      deep: true,
    },
  },
  mounted() {
    this.isApp = this.isAppEnvironment();
    this.formLabelAlign.WipOrderNo = this.stationData.WipOrderNo;
    this.formLabelAlign.MonthSequence = this.stationData.MonthSequence;
    this.formLabelAlign.Vin = this.stationData.Vin;
  },
  methods: {
    isAppEnvironment() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return (
        /iPad|iPhone|iPod/.test(userAgent) || // iOS devices
        /Android/.test(userAgent)
      );
    },

    seach(name) {
      console.log("HeaderInfo: 搜索条件", {
        WipOrderNo: this.formLabelAlign.WipOrderNo,
        MonthSequence: this.formLabelAlign.MonthSequence,
        Vin: this.formLabelAlign.Vin,
      });
      let obj = {};
      if (!this.selectStationData.wrokStation) {
        this.$message.error("请选择工位号再搜索");
        return;
      }
      obj[name] = this.formLabelAlign[name];
      if (this.formLabelAlign[name]) {
        this.$emit("SearchDate", obj);
        return;
      }
      if (
        this.formLabelAlign.WipOrderNo ||
        this.formLabelAlign.MonthSequence ||
        this.formLabelAlign.Vin
      ) {
        this.$emit("SearchDate", this.formLabelAlign);
        return;
      } else {
        this.$message.error("请输入订单号，月顺序号，车架号再搜索");
      }
    },
    // 扫码
    onCamera(type) {
      if (!this.selectStationData.wrokStation) {
        this.$message.error("请选择工位号再扫码");
        return;
      }
      window.parent.OpenCamera &&
        window.parent.OpenCamera((res) => {
          if (res.code === 200) {
            this.formLabelAlign.WipOrderNo = "";
            this.formLabelAlign.MonthSequence = "";
            this.formLabelAlign.Vin = "";
            this.formLabelAlign[type] = res.data;
            this.$emit("SearchDate", this.formLabelAlign);
          }
        });
    },
  },
};
</script>

<style lang="less">
.headerInfo {
  .headerInfo-row {
    display: flex;

    .headerInfo-row-left {
      text-align: center;
    }

    .headerInfo-row-right {
      .el-form-item__label {
        padding: 0 6px 0 0;
      }
    }
  }

  background-color: #f4f4f5;
  text-align: left;
  padding: 10px 6px 0 8px;
  border-bottom: 1px solid #dcdfe6;

  .border-left {
    border-left: 1px solid #dcdfe6;
  }

  .input-box {
    .el-input__inner {
      padding: 0 6px;
    }
  }

  .title-bg {
    background-color: #2185d0;
    padding: 12px;
    color: #fff;
  }

  .gongchang-bg {
    background-color: #2185d0;
    text-align: center;
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .center {
    text-align: center;
  }

  .f12 {
    font-size: 12px;
  }

  .f14 {
    font-size: 14px;
  }

  .line-height {
    line-height: 22px;
  }

  .el-input-group__append {
    .el-button {
      padding: 12px 3px !important;

      &:hover {
        background-color: transparent !important;
      }

      + .el-button,
      .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 20px;
        border-left: 1px solid #dcdfe6;
      }

      .icon {
        padding: 0 5px !important;
      }
    }
  }
}
</style>
