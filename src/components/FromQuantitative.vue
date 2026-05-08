<!-- 定量 -->
<template>
  <div
    class="from-name"
    ref="fromQualitative"
    style="height: heightNumer + 'px'"
  >
    <template v-if="fileInput.length">
      <input
        type="file"
        v-for="item in fileInput"
        :key="item.id"
        :id="fileInputId"
        @change="handleFileChange"
        accept="image/*"
        multiple="multiple"
      />
    </template>
    <div ref="formName">
      <el-form
        ref="ruleForm"
        :rules="formLabelAlignRules"
        :label-position="labelPosition"
        label-width="75px"
        :model="formLabelAlign"
      >
        <el-row>
          <el-col :xs="12" :sm="12">
            <el-form-item label="项目代码" prop="Characteristic" v-show="false">
              <el-input
                v-model="formLabelAlign.Characteristic"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12">
            <el-form-item label="标准值" prop="TargetValue">
              <el-input
                v-model="formLabelAlign.TargetValue"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8">
            <el-form-item label="单位" prop="Uom">
              <el-input v-model="formLabelAlign.Uom" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="w40" :gutter="10">
          <el-col :xs="8" :sm="8">
            <el-form-item label="上限" prop="UpperControlLimit">
              <el-input
                v-model="formLabelAlign.UpperControlLimit"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8">
            <el-form-item label="下限" prop="LowerControlLimit">
              <el-input
                v-model="formLabelAlign.LowerControlLimit"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          class="form-focus"
          label="项目描述"
          prop="CharacteristicText"
        >
          <!-- <div class="textarea-box">{{ formLabelAlign.CharacteristicText }}</div> -->

          <el-input
            type="textarea"
            readonly
            :autosize="{ minRows: 7, maxRows: 8 }"
            v-model="formLabelAlign.CharacteristicText"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          :label="formLabelAlign.EquipCodeTypeName"
          prop="ScanEquipCode"
          v-if="formLabelAlign.EquipCodeType"
        >
          <el-input
            readonly
            type="textarea"
            v-model="formLabelAlign.ScanEquipCode"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :xs="12" :sm="12">
            <el-form-item
              label="实测值"
              prop="TestValue"
              :rules="[
                { required: true, message: '请输入实测值', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="formLabelAlign.TestValue"
                :disabled="isOrderFleg"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12">
            <el-form-item label="检验判定" prop="TestAttribute">
              <el-input
                readonly
                v-model="formLabelAlign.TestAttribute"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="radioList" label="异常触发" prop="yichang">
          <el-checkbox-group
            v-model="formLabelAlign.CreateTypes"
            :disabled="isOrderFleg"
          >
            <el-checkbox label="Quality">不合格票触发</el-checkbox>
            <el-checkbox label="Andon">Andon触发</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          class="imagesList"
          label="图片"
          prop="imgfileList"
          :rules="[
            {
              required: formLabelAlign.Status == 8 ? true : false,
              message: '请选择图片',
              trigger: 'change',
            },
          ]"
        >
          <div class="imgUrls">（{{ imgfileList.length }}/30）</div>
          <div class="upload-demo-list">
            <div
              v-if="imgfileList.length < 30 && !isOrderFleg"
              v-loading="imgLoading"
              class="el-upload el-upload--picture-card el-upload--picture-card-imgs"
              @click="imgLoading ? '' : openGallery()"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <template v-if="imgfileList.length">
              <div
                class="el-upload el-upload--picture-card el-upload--picture-card-imgs"
                v-for="(item, index) in imgfileList"
                :key="index"
              >
                <el-image
                  :src="item"
                  :preview-src-list="[item]"
                  class="avatar"
                />
                <i class="el-icon-delete" @click="handleRemove(index)"></i>
              </div>
            </template>

            <!-- <el-upload v-if="imgfileList.length < 10" class="upload-demo" ref="upload" action="#"
                        :show-file-list="false" :on-change="httpRequest" :on-exceed="shebeiimgExceed" :limit="10"
                        :auto-upload="false">

                        <div slot="trigger" class="el-upload el-upload--picture-card el-upload--picture-card-imgs">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                    </el-upload> -->
          </div>
        </el-form-item>
        <!-- <el-form-item label="不合格描述" prop="Remark" style="padding-bottom: 75px;"
                :rules="[{ required: formLabelAlign.Status == 8 ? true : false, message: '请输入不合格描述', trigger: 'blur' }]">
                <el-input type="textarea" :disabled='isOrderFleg' :autosize="{ maxRows: 5 }"
                    v-model="formLabelAlign.Remark"
                    ref="inputRef"  
                @focus="handleFocus" @blur="handleBlur"
                ></el-input>
            </el-form-item> -->

        <div class="el-form-item__label is-required">问题描述</div>
        <el-row
          class="dynamic-item"
          :gutter="10"
          v-for="(item, index) in RemarkList"
          :key="index"
        >
          <el-col :xs="20" :sm="20">
            <el-form-item
              :label="'问题' + (index + 1)"
              class="mobile-form-item"
            >
              <el-input
                :autosize="{ maxRows: 5 }"
                ref="inputRef"
                :disabled="isOrderFleg"
                type="textarea"
                class="mobile-textarea"
                @focus="handleFocus"
                @blur="handleBlur"
                v-model="RemarkList[index]"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="4">
            <i
              @click="remarkListClick(index)"
              style="
                width: 100%;
                height: 100%;
                line-height: 40px;
                font-size: 24px;
              "
              class="action-col"
              :class="
                index == 0
                  ? 'el-icon-circle-plus-outline'
                  : 'el-icon-remove-outline'
              "
            ></i>
          </el-col>
          <el-col :xs="20" :sm="20">
            <el-form-item
              :label="'缺陷' + (index + 1)"
              class="mobile-form-item"
            >
              <el-select
                v-model="DefectCodeList[index]"
                filterable
                class="mobile-select"
                :disabled="isOrderFleg"
                @focus="handleFocus"
                @blur="handleBlur"
                ref="DefectCodeSelect"
                @hook:mounted="handleClick"
                @visible-change="handleClick"
                :rules="[
                  {
                    required: !RemarkList[index] ? true : false,
                    message: '请选择缺陷',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-option
                  v-for="item in BaseReasonCodeList"
                  :key="item.ReasonCode"
                  :label="item.ReasonDesc"
                  :value="item.ReasonCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label=""
          prop="Remark"
          style="padding-bottom: 75px"
          :rules="[
            {
              required: formLabelAlign.Status == 8 ? true : false,
              message: '请输入不合格描述',
              trigger: 'blur',
            },
          ]"
        >
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-list">
      <el-button type="primary" @click="backTable">检验列表</el-button>
      <el-button v-if="!isOrderFleg" @click="closeClick">重置</el-button>
      <el-button
        v-if="!isOrderFleg"
        type="primary"
        :loading="loadingTrue"
        @click="submitForm('next')"
        >保存并继续</el-button
      >
      <!--<el-button v-if="showNext && !isOrderFleg" :loading="loadingTrue" type="primary" @click="submitForm('next')">
                保存继续
            </el-button>
            -->
    </div>
  </div>
</template>

<script>
export default {
  name: "FromQuantitative",
  components: {},
  data() {
    return {
      RemarkList: [""],
      isOrderFleg: false,
      fileInput: [{ id: 1 }],
      fileInputId: 1,
      imgLoading: false,

      loadingTrue: false,
      fileList: [],
      imgfileList: [],
      BaseReasonCodeList: [],
      DefectCodeList: [""],
      dialogFalg: false,
      labelPosition: "right",
      formLabelAlign: {
        TargetValue: "",
        imgfileList: "",
        CreateTypes: [],
        TestAttribute: "",
        Remark: "",
        TestValue: "",
        TestReasonCode: "",
        printPdf: false,
        ScanEquipCode: "",
        EquipCodeTypeName: "",
        EquipCodeType: "",
      },
      formLabelAlignRules: {
        TestValue: [{ required: true, message: "请输入实测值" }],
      }, //工位验证信息
    };
  },
  watch: {
    formLabelAlign: {
      handler(data) {
        if (data.TestValue === 0 || data.TestValue) {
          if (
            data.LowerControlLimit <= data.TestValue &&
            data.UpperControlLimit >= data.TestValue
          ) {
            this.formLabelAlign.TestAttribute = "OK";
            this.formLabelAlign.Status = 14;
          } else {
            this.formLabelAlign.TestAttribute = "NG";
            this.formLabelAlign.Status = 8;
          }
        } else {
          this.formLabelAlign.TestAttribute = "";
          this.formLabelAlign.Status = 0;
        }
      },
      deep: true,
    },
    dataObj: {
      handler() {
        this.formLabelAlign.UpperControlLimit = this.dataObj.UpperControlLimit;
        this.formLabelAlign.LowerControlLimit = this.dataObj.LowerControlLimit;
        this.formLabelAlign.Uom = this.dataObj.Uom;
        this.formLabelAlign.Characteristic = this.dataObj.Characteristic;
        this.formLabelAlign.CharacteristicText =
          this.dataObj.CharacteristicText;
        this.formLabelAlign.TestAttribute = this.dataObj.TestAttribute;
        this.formLabelAlign.Status = this.dataObj.Status;
        this.formLabelAlign.Version = this.dataObj.Version;
        this.formLabelAlign.TargetValue = this.dataObj.TargetValue;
        this.formLabelAlign.ScanEquipCode = this.dataObj.ScanEquipCode;
        this.formLabelAlign.EquipCodeTypeName = this.dataObj.EquipCodeTypeName;
        this.formLabelAlign.EquipCodeType = this.dataObj.EquipCodeType;
        this.BaseReasonCodeList = this.dataObj.BaseReasonCodeList;

        // this.formLabelAlign.Remark = this.dataObj.Remark;
        this.RemarkList = [];
        let Remark = this.dataObj.Remark;
        if (Remark) {
          Remark = Remark.split(";");
          Remark.map((item) => {
            this.RemarkList.push(item);
          });
        } else {
          this.RemarkList.push("");
        }

        let TestReasonCode = this.dataObj.TestReasonCode;
        this.DefectCodeList = [];
        if (TestReasonCode) {
          TestReasonCode = TestReasonCode.split(",");
          TestReasonCode.map((item) => {
            this.DefectCodeList.push(item);
          });
        } else {
          this.DefectCodeList.push("");
        }
        this.formLabelAlign.IsLastOne = this.dataObj.IsLastOne;
        this.formLabelAlign.WipOrderNo = this.WorkStationData.WipOrderNo;
        this.formLabelAlign.ID = this.dataObj.ID;
        this.formLabelAlign.Operator = window.Operator;
        this.formLabelAlign.WorkStation = this.WorkStationData.WorkStation;
        // if(this.dataObj.TestValue){
        this.formLabelAlign.TestValue = this.dataObj.TestValue;
        // }
        if (
          this.WorkStationData.OrderStatus == 14 ||
          this.WorkStationData.OrderStatus == 8
        ) {
          this.isOrderFleg = true;
        } else {
          this.isOrderFleg = false;
        }

        this.imgfileList = [];
        let PicPath = this.dataObj.PicPath;
        if (PicPath) {
          PicPath = PicPath.split(",");
          PicPath.map((item) => {
            this.imgfileList.push(item);
          });

          this.formLabelAlign.imgfileList = this.imgfileList.join(",");
        }
      },
      deep: true,
    },
  },
  props: {
    showNext: {
      type: Boolean,
    },
    WorkStationData: {
      type: Object,
    },
    dataObj: {
      type: Object,
    },
  },
  mounted() {
    this.heightNumer = document.querySelector(".table-name").offsetHeight;
    this.formLabelAlign.UpperControlLimit = this.dataObj.UpperControlLimit;
    this.formLabelAlign.LowerControlLimit = this.dataObj.LowerControlLimit;
    this.formLabelAlign.Uom = this.dataObj.Uom;
    this.formLabelAlign.Characteristic = this.dataObj.Characteristic;
    this.formLabelAlign.CharacteristicText = this.dataObj.CharacteristicText;
    this.formLabelAlign.TestAttribute = this.dataObj.TestAttribute;
    this.formLabelAlign.Status = this.dataObj.Status;
    this.formLabelAlign.Version = this.dataObj.Version;
    this.formLabelAlign.TargetValue = this.dataObj.TargetValue;
    this.formLabelAlign.ScanEquipCode = this.dataObj.ScanEquipCode;
    this.formLabelAlign.EquipCodeTypeName = this.dataObj.EquipCodeTypeName;
    this.formLabelAlign.EquipCodeType = this.dataObj.EquipCodeType;

    // this.formLabelAlign.Remark = this.dataObj.Remark;
    this.RemarkList = [];
    let Remark = this.dataObj.Remark;
    if (Remark) {
      Remark = Remark.split(";");
      Remark.map((item) => {
        this.RemarkList.push(item);
      });
    } else {
      this.RemarkList.push("");
    }

    let TestReasonCode = this.dataObj.TestReasonCode;
    this.DefectCodeList = [];
    if (TestReasonCode) {
      TestReasonCode = TestReasonCode.split(",");
      TestReasonCode.map((item) => {
        this.DefectCodeList.push(item);
      });
    } else {
      this.DefectCodeList.push("");
    }

    this.formLabelAlign.IsLastOne = this.dataObj.IsLastOne;
    this.formLabelAlign.WipOrderNo = this.WorkStationData.WipOrderNo;
    this.formLabelAlign.ID = this.dataObj.ID;
    this.formLabelAlign.Operator = window.Operator;
    this.formLabelAlign.Inspector = window.Operator;
    this.formLabelAlign.WorkStation = this.WorkStationData.WorkStation;
    // if(this.dataObj.TestValue){
    this.formLabelAlign.TestValue = this.dataObj.TestValue;
    // }
    if (
      this.WorkStationData.OrderStatus == 14 ||
      this.WorkStationData.OrderStatus == 8
    ) {
      this.isOrderFleg = true;
    } else {
      this.isOrderFleg = false;
    }
    this.imgfileList = [];
    let PicPath = this.dataObj.PicPath;
    if (PicPath) {
      PicPath = PicPath.split(",");
      PicPath.map((item) => {
        this.imgfileList.push(item);
      });
    }

    this.formLabelAlign.imgfileList = this.imgfileList.join(",");
  },
  methods: {
    handleClick(onOff) {
      this.$nextTick(() => {
        if (!onOff) {
          let input;
          input = this.$refs.DefectCodeSelect?.$el?.querySelector("input");
          input?.removeAttribute("readonly");
        }
      });
    },
    remarkListClick(index) {
      if (index) {
        this.RemarkList.splice(index, 1);
        this.DefectCodeList.splice(index, 1);
      } else {
        this.RemarkList.push("");
        this.DefectCodeList.push("");
      }
    },
    handleFocus() {
      // 当输入框获得焦点时，监听键盘高度变化
      window.addEventListener("resize", this.adjustPosition("focus"));
      this.adjustPosition("focus");
    },
    handleBlur() {
      // 当输入框失去焦点时，停止监听
      window.removeEventListener("resize", this.adjustPosition("blur"));
    },
    adjustPosition(type) {
      // 根据实际情况获取键盘高度并调整输入框位置
      // const inputBottom = this.$refs.inputRef.$el.getBoundingClientRect().bottom;
      // const viewportHeight = window.innerHeight;
      // this.keyboardHeight = viewportHeight - inputBottom;
      if (type == "focus") {
        // 假设键盘高度超过视口高度的10%则进行调整
        this.$refs.formName.style.paddingBottom = "350px"; //`${this.keyboardHeight}px`;
        setTimeout(() => {
          this.$refs.fromQualitative.scrollTop =
            this.$refs.formName.scrollHeight;
        }, 100);
      } else {
        this.$refs.formName.style.paddingBottom = "0";
      }
    },
    loadImage(src) {
      //return new Promise((resolve, reject) => {
      //    const img = new FileReader();
      //    img.readAsDataURL(src);
      //    img.onload = (e) => resolve(e.target.result);
      //    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      //});
      const that = this;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = function (evt) {
          let img = new Image();
          //let width = 1200; // 调整压缩比例，这里设置600宽度
          let quality = 0.8;
          let canvas = document.createElement("canvas");
          let drawar = canvas.getContext("2d");
          img.src = evt.target.result;
          img.onload = function () {
            canvas.width = img.width;
            // 等比例算出图片高度
            // canvas.height = width * (img.height / img.width);
            canvas.height = img.height;
            drawar.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64String = canvas.toDataURL("image/jpeg", quality);
            resolve(base64String);
          };
        };
        reader.onerror = function () {
          reject("加载失败");
          that.imgLoading = false;
        };
      });
    },
    async loadImagesSequentially(imageSources) {
      // 将 window.saveImgFils 封装为 Promise
      const saveImgFilsPromise = (obj) => {
        return new Promise((resolve, reject) => {
          window.saveImgFils(obj, (data) => {
            if (data.code !== 0) {
              reject(new Error(data.msg)); // 如果失败，抛出错误
              resolve(data); // 如果成功，返回数据
            } else {
              resolve(data); // 如果成功，返回数据
            }
            //resolve(data); // 如果成功，返回数据
          });
        });
      };

      try {
        for (const src of imageSources) {
          try {
            //判断照片大小，以及是否为照片
            if (this.beforeimglistUpload(src) && this.imgfileList.length < 30) {
              const result = await this.loadImage(src); // 等待图片加载完成
              const results = []; // 将 results 定义在循环外部
              results.push(result); // 将结果存入数组
              let obj = {
                url: results,
                id: this.formLabelAlign.ID,
                FilePicker: result,
              };

              // 等待 saveImgFilsPromise 完成
              const data = await saveImgFilsPromise(obj);
              if (data.msg) {
                this.$message.error("图片上传失败：" + data.msg);
                continue;
              }
              // 处理返回的数据
              this.imgfileList = this.imgfileList.concat(data.data);
              this.fileList = this.fileList.concat(data.data.ReturnUrl);
              this.formLabelAlign.imgfileList = this.imgfileList.join(",");
            }
          } catch (error) {
            console.error("Error loading or saving image:", error);
          }
        }
      } finally {
        //解除图片上传限制
        this.imgLoading = false;
      }
    },
    handleFileChange(event) {
      this.fileInput = [];
      this.imgLoading = true;
      setTimeout(() => {
        this.fileInputId++;
        this.fileInput.push({ id: this.fileInputId });
      }, 100);
      const fileList = event.target.files;

      // if (fileList.length + this.imgfileList.length > 10) {
      //     this.shebeiimgExceed()
      //     return
      // }

      let fileListUrlData = [];

      for (let i = 0; i < fileList.length; i++) {
        fileListUrlData.push(fileList[i]);
      }
      this.loadImagesSequentially(fileListUrlData);
    },
    // 图片上传前校验
    beforeimglistUpload(file) {
      let isimg = true;
      // 判断文件类型
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        isimg = true;
      } else {
        this.$message.error("只能上传" + this.accept + "格式的图片");
        isimg = false;
      }
      // 判断文件大小
      //let isLt2M = file.size / 1024 / 1024 < 5;
      //if (!isLt2M) {
      //    this.$message.error('图片大小不能超过5MB哦');
      //    isimg = false;
      //}
      return isimg;
    },
    openGallery() {
      // 打开相册逻辑（通常通过文件输入实现）
      const input = document.querySelector('input[type="file"]');
      input.click();
    },
    httpRequest(file) {
      file.url = URL.createObjectURL(file.raw);
      file.id = this.formLabelAlign.ID;
      window.saveImgFils(file, (data) => {
        if (data.code) {
          this.$message.error(data.msg);
          return;
        }
        this.imgfileList.push(data.data);

        this.formLabelAlign.imgfileList = this.imgfileList.join(",");
      });
    },
    // 超出限制提示
    shebeiimgExceed() {
      this.$message.error("设备照片只能上传10张");
    },

    // 删除某个已上传的内容
    handleRemove(index) {
      this.imgfileList.splice(index, 1);

      this.formLabelAlign.imgfileList = this.imgfileList.join(",");
    },
    submitForm(typeFleg) {
      // "Andon：创建安灯
      // Quality：创建不合格票
      // Both：同时创建两种单据"
      if (this.imgLoading) {
        this.$message.error("图片上传中，请稍后提交");
        return;
      }
      if (
        this.formLabelAlign.ScanEquipCode == "" &&
        this.formLabelAlign.EquipCodeType
      ) {
        this.$message.error("当前设备码未采集，请先采集设备码后再检验！");
        return;
      }
      if (this.formLabelAlign.ScanEquipCode && this.imgfileList.length == 0) {
        this.$message.error("请先上传设备码图片，再进行保存操作");
        return;
      }

      const filteredArray = this.RemarkList.filter(
        (item) => item && item.trim() !== "",
      );
      this.formLabelAlign.Remark = filteredArray.length
        ? filteredArray.join(";")
        : "";
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.loadingTrue = true;
          this.$emit("IsLastOne", (notDetectedList) => {
            let isLastOneFleg = true;
            if (notDetectedList.length) {
              if (notDetectedList.length == 1) {
                if (notDetectedList[0].ID == this.formLabelAlign.ID) {
                  isLastOneFleg = true;
                } else {
                  isLastOneFleg = false;
                }
              } else {
                isLastOneFleg = false;
              }
            }

            let PicPath = [];
            this.imgfileList.map((item) => {
              PicPath.push(this.replacedStr(item));
            });

            this.formLabelAlign.PicPath = PicPath.join();
            this.formLabelAlign.TestAttribute =
              this.formLabelAlign.Status == 14 ? "OK" : "NG";
            if (isLastOneFleg) {
              this.openConfirm(typeFleg);
              return;
            }

            this.formLabelAlign.IsLastOne = false;
            this.submitFormData(typeFleg);
          });
        }
      });
    },

    replacedStr(originalStr) {
      return originalStr.replace(/(.*?)SharedFolder\//, "[ServerPath]/");
    },
    submitFormData(typeFleg) {
      if (this.formLabelAlign.CreateTypes.length) {
        if (this.formLabelAlign.CreateTypes.length == 2) {
          this.formLabelAlign.CreateType = "Both";
        } else {
          this.formLabelAlign.CreateType = this.formLabelAlign.CreateTypes[0];
        }
        // 存在 安灯不合格票创建 创建不合格票
        window.WreateIneligibleTicket(this.formLabelAlign, (data) => {
          if (data.code != 0) {
            this.$message.error({
              message: data.msg,
            });
          } else {
            this.$message.success({
              message: data.msg,
            });
          }
          if (data.code === 0) {
            this.formLabelAlign.CreateTypes = [];
            this.formLabelAlign.CreateType = "";
          }

          // 保存工位检测项结果回传
          window.StationInspectionAndPreservation(
            this.formLabelAlign,
            (data) => {
              if (data.code != 0) {
                this.$nextTick(() => {
                  this.$message.error({
                    message: data.msg,
                  });
                });

                this.loadingTrue = false;
                return;
              }

              this.$nextTick(() => {
                this.loadingTrue = false;
                this.$message.success({
                  message: "保存成功",
                });
              });
              this.$emit("PartialModificationData", this.formLabelAlign);
              if (typeFleg == "next") {
                this.$emit("clickNext");
              }
            },
          );
        });
      } else {
        // 保存工位检测项结果回传
        window.StationInspectionAndPreservation(this.formLabelAlign, (data) => {
          if (data.code != 0) {
            this.loadingTrue = false;
            this.$message.error({
              message: data.msg,
            });
            return;
          }

          this.$nextTick(() => {
            this.$message.success({
              message: "保存成功",
            });
          });
          this.loadingTrue = false;
          this.$emit("PartialModificationData", this.formLabelAlign);
          if (typeFleg == "next") {
            this.$emit("clickNext");
          }
        });
      }
    },
    openConfirm(typeFleg) {
      this.$confirm(
        "是否确认提交并关闭检验单?（关闭后将无法再修改！）",
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          showClose: false,
          closeOnPressEscape: false,
          closeOnClickModal: false,
        },
      )
        .then(() => {
          this.formLabelAlign.IsLastOne = true;
          //this.submitFormData(typeFleg);
          this.openPrintConfirm(typeFleg);
        })
        .catch(() => {
          this.formLabelAlign.IsLastOne = false;
          this.submitFormData(typeFleg);
        });
    },
    openPrintConfirm(typeFleg) {
      this.$confirm("是否打印不合格检验项文件", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",

        showClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
      })
        .then(() => {
          this.formLabelAlign.printPdf = true;
          this.submitFormData(typeFleg);
        })
        .catch(() => {
          this.formLabelAlign.printPdf = false;
          this.submitFormData(typeFleg);
        });
    },
    updateList() {
      this.$emit("updateList");
    },
    backTable() {
      this.$emit("backTable");
    },
    closeClick() {
      this.formLabelAlign.TestValue = "";
      this.formLabelAlign.CreateTypes = [];
      this.imgfileList = [];

      this.formLabelAlign.imgfileList = "";
      this.formLabelAlign.TestAttribute = "";
      this.formLabelAlign.Remark = "";
    },
  },
};
</script>
<style lang="less">
.from-name {
  height: 100%;
  overflow: hidden;
  padding: 0 10px;
  overflow-y: auto;

  /* 添加一些基本样式 */
  input[type="file"] {
    display: none;
  }

  .imgUrls {
    position: absolute;
    z-index: 111;
    top: 20px;
    right: calc(100% + 5px);
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .w40 {
    .el-form-item {
      .el-form-item__label {
        width: 50px !important;
      }

      .el-form-item__content {
        margin-left: 50px !important;
      }
    }
  }

  .form-focus {
    .textarea-box {
      display: block;
      text-align: left;
      resize: vertical;
      padding: 5px 5px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      font-size: inherit;
      color: #606266;
      background-color: #fff;
      background-image: none;
      // border: 1px solid #DCDFE6;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      font-weight: 600;
      font-size: 16px;
    }
  }

  .radioList {
    text-align: left;
    margin: 0;

    .el-checkbox {
      margin-right: 10px;
    }

    .el-radio__inner,
    .el-checkbox__inner {
      width: 18px;
      height: 18px;

      &.el-checkbox__inner::after {
        width: 6px;
        height: 10px;
      }
    }

    .el-radio__label {
      font-size: 16px;
    }
  }

  .imagesList {
    position: relative;

    .el-form-item__content {
      .upload-demo-list {
        white-space: nowrap;
        overflow: scroll;
        width: 100%;
        text-align: left;

        .el-upload--picture-card {
          width: 70px;
          overflow: hidden;
          height: 70px;
          line-height: 80px !important;
          margin-right: 10px;
          margin-bottom: 10px;
          position: relative;

          .avatar {
            width: 100%;
            height: 100%;
          }

          .el-icon-delete {
            position: absolute;
            right: 0px;
            font-size: 14px;
            padding: 5px;
            top: 0px;
            color: #fff;
            background: red;
          }
        }

        .el-upload-list--picture-card {
          display: flex;

          .el-upload-list__item {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  }

  .btn-list {
    display: flex;
    justify-content: space-around;
    padding: 15px 0px 10px;
    position: absolute;
    bottom: 0px;
    margin: 0 -10px;
    width: calc(100%);
    background-color: #fff;

    border-top: 1px solid #dcdfe6;

    .el-button {
      padding: 12px;
    }
  }
}

//优化问题描述样式结构

.dynamic-item {
  margin-bottom: 16px;
}

.mobile-form-item {
  margin-bottom: 12px;
}

.mobile-textarea {
  font-size: 14px;
}

.mobile-select {
  width: 100%;
}

.action-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.action-icon {
  font-size: 28px;
  color: #409eff;
  transition: all 0.3s;
}

.action-icon:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  /* 手机端适配 */
  .dynamic-item {
    margin-bottom: 12px;
  }

  .mobile-form-item :deep(.el-form-item__label) {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
