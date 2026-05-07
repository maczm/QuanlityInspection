<template>
  <div class="home" ref="home">
    <div class="home-flex">
      <div class="header-content">
        <div ref="specialConfiguration">
          <HeaderInfo :stationData="WorkStationData" :showSpecialConfiguration="showSpecialConfiguration"
            :selectStationData="selectStationData" @SelectStation="openSelectStationDialog" @SearchDate="SearchDateFun">
          </HeaderInfo>
          <SpecialConfiguration :stationData="WorkStationData" v-if="showSpecialConfiguration"></SpecialConfiguration>
        </div>

        <div class="top-icon">
          <!-- <i  v-if="dataList.length&&!showTableContent" class="back" :class="!showTableContent ? 'el-icon-arrow-left' : 'el-icon-arrow-right'" @click="()=>{showTableContent = !showTableContent;setHeight()}"></i> -->
          <div class="" style="float: left;line-height: 40px;font-size: 12px;" v-if="WorkStationData.OrderStatus"> <span
              style="padding-right:30px">单据状态：{{ WorkStationData.OrderStatus == 8 || WorkStationData.OrderStatus == 14 ?
                  '已关闭' : '检验中'
              }}
            </span> <span>单据检验结果：{{ WorkStationData.OrderStatus == 8 ? '不合格' : WorkStationData.OrderStatus == 14 ? '合格'
                : '/'
            }}
            </span></div>
          <i :class="!showSpecialConfiguration ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            @click="showSpecialConfigurationFun"></i>
          <span class="number" v-if="dataList.length">{{ dataList.length - notFinished }}/{{ dataList.length }}</span>
        </div>
      </div>
      <div style="min-height:300px" v-loading="loadingData">
        <div class="home-box" v-if="dataList.length">
          <div class="home-content" ref="homeContent" v-if="contentHeightNumer">
            <div class="table-content"
              :style="{ height: contentHeightNumer - (![8, 14].includes(WorkStationData.OrderStatus) ? 66 : 0) + 'px', 'position': 'relative' }"
              v-show="showTableContent">
              <TableContent :dataList="dataList" :showTableContent="showTableContent"
                :contentHeightNumer="contentHeightNumer - (![8, 14].includes(WorkStationData.OrderStatus) ? 66 : 0)"
                :showSpecialConfiguration="showSpecialConfiguration" :tableIndex="dataListIndex"
                @updateTableIndex="updateTableIndexFun">
              </TableContent>
              <div style=" padding: 15px 0px 10px;" v-if="(![8, 14].includes(WorkStationData.OrderStatus))">
                <el-button type="primary" @click="updateList">更新 </el-button>
              </div>
            </div>
            <div class="from-content" :style="{ height: contentHeightNumer + 'px' }" v-show="!showTableContent">
              <FromQualitative @backTable="backTable" @updateList="updateList"
                v-if="dataList[dataListIndex].Characteristicattr == 'DX'"
                :showNext="dataListIndex + 1 != dataList.length" @clickNext="clickNextFun"
                :dataObj="dataList[dataListIndex]" :WorkStationData="WorkStationData"
                @PartialModificationData="PartialModificationDataFun" @IsLastOne="IsLastOneFun"></FromQualitative>
              <FromQuantitative @backTable="backTable" @updateList="updateList"
                v-if="dataList[dataListIndex].Characteristicattr == 'DL'" @clickNext="clickNextFun"
                :dataObj="dataList[dataListIndex]" :WorkStationData="WorkStationData"
                :showNext="dataListIndex + 1 != dataList.length" @PartialModificationData="PartialModificationDataFun"
                @IsLastOne="IsLastOneFun"></FromQuantitative>
            </div>
          </div>

          <!-- <div class="right-icon"  @click="()=>{showTableContent = !showTableContent;setHeight()}">
          <i :class="!showTableContent ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
           ></i>
        </div> -->
        </div>
      </div>
      <div class="foolter-content"></div>
    </div>
    <SelectStation ref="SelectStationDialog" :selectionData="selectionData" @updateStation="updateStationFun">
    </SelectStation>
  </div>
</template> 

<script>
import SelectStation from "../components/SelectStation"
import HeaderInfo from "../components/HeaderInfo"
import SpecialConfiguration from "../components/SpecialConfiguration"
import TableContent from "../components/TableContent"
import FromQualitative from "../components/FromQualitative"  //定性
import FromQuantitative from "../components/FromQuantitative"  //定量


export default {
  name: "HomeView",
  components: { SelectStation, SpecialConfiguration, HeaderInfo, TableContent, FromQualitative, FromQuantitative },
  data() {
    return {

      notFinished: 0,
      count: 0,
      loadingData: false,
      activeName: 'first',
      selectStationData: {},//工位选中数据
      selectionData: [], //工位初始数据
      WorkStationData: {},//数据源
      dataList: [], //列表分类数据
      dataListIndex: 0,//列表当前选中数据
      showSpecialConfiguration: false,
      showTableContent: true,
      contentHeightNumer: 0,
      stationData: {
        name: 'K102PL01A0690'
      }//工位信息
    };
  },
  provide() {
    return {
      dashboard: this,
    };
  },
  watch: {
    dataListIndex() {
      console.log(this.dataList[this.dataListIndex])
    }
  },
  mounted() {
    if (localStorage.getItem("formLabelAlignStation")) {
      this.selectStationData = JSON.parse(localStorage.getItem("formLabelAlignStation"));
    }
    //  this.getData();

    setTimeout(() => {
      this.getSelectionListFun();
    }, 300)
  },
  methods: {
    setHeight() {
      setTimeout(() => {
        this.contentHeightNumer = this.$refs.home.offsetHeight - this.$refs.specialConfiguration.offsetHeight - 40 - 0;
        console.log(this.contentHeightNumer)
      })
    },
    showSpecialConfigurationFun() {
      this.showSpecialConfiguration = !this.showSpecialConfiguration
      this.setHeight()
    },
    updateStationFun(data) {
      console.log("工位信息", data);
      this.selectStationData = data;
      this.WorkStationData = {}
      this.dataList = []
      this.$refs.SelectStationDialog.closeClick()
      //
    },
    openSelectStationDialog() {
      this.getSelectionListFun();
      this.$refs.SelectStationDialog.open()
    },
    clickNextFun() {
      this.notFinished = 0;
      let minlistNum = false;
      let maxlistNum = false;
      let mindataListIndex = 0;
      let maxdataListIndex = 0
      this.dataList.map((item, index) => {
        console.log(item)
        if (item.Status != 8 && item.Status != 14) {
          this.minIndex++

          console.log(index, item.Status)
          this.notFinished++;

          if (!maxlistNum && this.dataListIndex < index) {
            maxdataListIndex = index;
            maxlistNum = true
          }

          if (!minlistNum) {
            mindataListIndex = index;
            minlistNum = true
          }
        }
      })
      if (maxdataListIndex) {
        this.dataListIndex = maxdataListIndex
      } else if (mindataListIndex) {
        this.dataListIndex = mindataListIndex
      }
    },
    updateTableIndexFun(num) {
      this.dataListIndex = num;
      //  if( this.count){
      this.showTableContent = false
      //  }
      //  this.count++
    },
    getSelectionListFun() {
      window.getSelectionList((data) => {
        console.log(data);
        this.selectionData = data;
      })
    },
    SearchDateFun(valueObj) {
      console.log(this.selectStationData)
      this.getData({ ...valueObj, WorkStation: this.selectStationData.wrokStation })
    },
    getData(valueObj) {  //获取工位检测数据列表
      this.setHeight()
      this.loadingData = true;
      console.log(this.one);

      this.count = 0;
      window.WorkStationFunc(valueObj, (data) => {
        console.log(data)
        this.loadingData = false;

        if (data.code == 0) {
          this.dataListIndex = 0;
          this.notFinished = 0;
          let dataList = [];
          this.WorkStationData = data;

          data.ResponseData.map((v) => {
            dataList = dataList.concat(v.DataList)
          })
          //dataList = this.sortedList(dataList);
          let listNum = false;
          dataList.map((item, index) => {
            console.log(item)
            item.index = index
            if (item.Status != 8 && item.Status != 14) {
              this.notFinished++;
              console.log(index, item.Status)
              if (!listNum) {
                this.dataListIndex = index;
                listNum = true
              }
            }
          })
          this.dataList = dataList;
        } else {
          this.$message.error(data.msg);
        }
        console.log("未完成", this.notFinished)
      });
    },
    PartialModificationDataFun(newData) {
      console.log(newData, this.dataList[this.dataListIndex])
      this.dataList[this.dataListIndex].TestAttribute = newData.TestAttribute;
      this.dataList[this.dataListIndex].Status = newData.Status;
      this.dataList[this.dataListIndex].TestValue = newData.TestValue;

      this.dataList[this.dataListIndex].Remark = newData.Remark;
      this.dataList[this.dataListIndex].PicPath = newData.PicPath;
      this.notFinished = 0;
      if (newData.IsLastOne) {
        this.WorkStationData = {}
        this.dataList = []
      }

      this.dataList.map((item) => {
        if (item.Status != 8 && item.Status != 14) {
          this.notFinished++;
        }
      })
    },
    backTable() {
      this.showTableContent = !this.showTableContent; this.setHeight()
    },
    updateList() {
      this.$confirm('更新后将清空已检验数据，是否确认更新？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',

        showClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
      }).then(() => {
        this.getData({ Update: true, WipOrderNo: this.WorkStationData.WipOrderNo, WorkStation: this.selectStationData.wrokStation })
      }).catch(() => {
        
      });

    },
    IsLastOneFun(callback) {
      let list = this.dataList.filter((item) => { return !item.TestAttribute });
      console.log(list)
      callback(list);
    },
    sortedList(list) {
      // 先按序号排序，然后将序号为0的元素移至最后
      const sorted = list.sort((a, b) => a.SequenceNo - b.SequenceNo);
      const zeroItems = sorted.splice(sorted.findIndex(item => item.SequenceNo === 0), 1);
      return sorted.concat(zeroItems);
    },
  },
};
</script>
<style lang="less">
.home {
  height: 100vh;
  overflow: hidden;
}

.home-flex {
  display: flex;
  flex-direction: column;
}

.top-icon {
  padding: 0 10px;

  i {
    font-size: 28px;
    padding: 6px 10px;
  }

  .back {
    margin: 3px 0;
    float: left;
    background-color: #2185d0;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 3px;
  }

  .number {
    float: right;
    line-height: 40px;
    font-weight: 6 00;

    font-size: 18px;
  }
}

.home-box {
  display: flex;

  .home-content {
    flex: 1;
    width: 100%;
  }

  .right-icon {
    width: 35x;
    text-align: left;
    padding-right: 2px;
    align-items: center;
    display: flex;

    i {
      font-size: 28px;
      padding: 6px 10px;
    }
  }
}
</style>
