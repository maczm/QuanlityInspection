window.config = {
  basePath: "/Apriso/Portal/VueProject/QualityInspection/",
  render: "board1",
};
// 获取当前登录人window.Operator
window.Operator = "张三";
// 获取工位列表
window.getSelectionList = function (callback) {
  // 入参 data
  let obj = [
    {
      FacilityName: "K102智联重卡超级工厂",
      DataList: [
        {
          ProductionLineNo: "K102PL01",
          ProductionLineDesc: "智联重卡整车总装",
          Data: [
            { WorkStation: "K102PL01A0650", WorkStationDesc: "气密性检测" },
            { WorkStation: "K102PL01A0660", WorkStationDesc: "OBD排放检测" },
            { WorkStation: "K102PL01A0670", WorkStationDesc: "调试静态检测" },
            { WorkStation: "K102PL01A0680", WorkStationDesc: "调试返修" },
            { WorkStation: "K102PL01A0690", WorkStationDesc: "总检" },
            { WorkStation: "K102PL01A0700", WorkStationDesc: "入库" },
            { WorkStation: "K102PL01B0010", WorkStationDesc: "工序1" },
            { WorkStation: "K102PL01B0020", WorkStationDesc: "工序2" },
            { WorkStation: "K102PL01A0010", WorkStationDesc: "车架上线" },
            { WorkStation: "K102PL01A0020", WorkStationDesc: "车架预装" },
            { WorkStation: "K102PL01A0030", WorkStationDesc: "V推拧紧" },
            {
              WorkStation: "K102PL01A0040",
              WorkStationDesc: "底盘线束和管束铺设1",
            },
            {
              WorkStation: "K102PL01A0050",
              WorkStationDesc: "底盘线束和管束铺设2",
            },
            {
              WorkStation: "K102PL01A0060",
              WorkStationDesc: "动力悬置软垫拧紧",
            },
            { WorkStation: "K102PL01A0070", WorkStationDesc: "气管链接" },
            { WorkStation: "K102PL01A0080", WorkStationDesc: "平衡悬架吊装" },
            {
              WorkStation: "K102PL01A0090",
              WorkStationDesc: "平衡悬架螺栓拧紧",
            },
            { WorkStation: "K102PL01A0100", WorkStationDesc: "后U型螺栓拧紧" },
            { WorkStation: "K102PL01A0110", WorkStationDesc: "前桥吊装1" },
            { WorkStation: "K102PL01A0120", WorkStationDesc: "前桥吊装2" },
            { WorkStation: "K102PL01A0130", WorkStationDesc: "前U型螺栓拧紧" },
            { WorkStation: "K102PL01A0140", WorkStationDesc: "中桥吊装1" },
            { WorkStation: "K102PL01A0150", WorkStationDesc: "中桥吊装2" },
            { WorkStation: "K102PL01A0160", WorkStationDesc: "后桥吊装1" },
            { WorkStation: "K102PL01A0170", WorkStationDesc: "后桥吊装2" },
            { WorkStation: "K102PL01A0180", WorkStationDesc: "储气筒气管插接" },
            { WorkStation: "K102PL01A0190", WorkStationDesc: "桥间传动轴吊装" },
            { WorkStation: "K102PL01A0200", WorkStationDesc: "中传动轴吊装" },
            { WorkStation: "K102PL01A0210", WorkStationDesc: "防护梁吊装" },
            { WorkStation: "K102PL01A0220", WorkStationDesc: "车架翻转" },
            { WorkStation: "K102PL01A0230", WorkStationDesc: "尿素箱管路连接" },
            { WorkStation: "K102PL01A0240", WorkStationDesc: "驾驶室前悬吊装" },
            { WorkStation: "K102PL01A0250", WorkStationDesc: "方向机吊装" },
            { WorkStation: "K102PL01A0260", WorkStationDesc: "水箱吊装" },
            { WorkStation: "K102PL01A0270", WorkStationDesc: "发动机落装1" },
            { WorkStation: "K102PL01A0280", WorkStationDesc: "发动机落装2" },
            { WorkStation: "K102PL01A0290", WorkStationDesc: "发动机落装3" },
            { WorkStation: "K102PL01A0300", WorkStationDesc: "蓄电池吊装" },
            { WorkStation: "K102PL01A0310", WorkStationDesc: "转向管路连接" },
            { WorkStation: "K102PL01A0320", WorkStationDesc: "V推与车桥拧紧" },
            { WorkStation: "K102PL01A0330", WorkStationDesc: "驾驶室后悬吊装" },
            { WorkStation: "K102PL01A0340", WorkStationDesc: "空调管路连接" },
            { WorkStation: "K102PL01A0350", WorkStationDesc: "SCR箱吊装" },
            { WorkStation: "K102PL01A0360", WorkStationDesc: "挂车板吊装" },
            { WorkStation: "K102PL01A0370", WorkStationDesc: "挂车管路连接" },
            { WorkStation: "K102PL01A0380", WorkStationDesc: "水寒宝管路连接" },
            { WorkStation: "K102PL01A0390", WorkStationDesc: "进气系统安装" },
            { WorkStation: "K102PL01A0400", WorkStationDesc: "中冷管路连接" },
            {
              WorkStation: "K102PL01A0410",
              WorkStationDesc: "前后轮挡泥板安装",
            },
            { WorkStation: "K102PL01A0420", WorkStationDesc: "油液加注1" },
            { WorkStation: "K102PL01A0430", WorkStationDesc: "油箱吊装" },
            { WorkStation: "K102PL01A0440", WorkStationDesc: "轮胎安装" },
            { WorkStation: "K102PL01A0450", WorkStationDesc: "轮胎拧紧" },
            { WorkStation: "K102PL01A0460", WorkStationDesc: "驾驶室落装1" },
            { WorkStation: "K102PL01A0470", WorkStationDesc: "驾驶室落装2" },
            {
              WorkStation: "K102PL01A0480",
              WorkStationDesc: "驾驶室前围管线连接1",
            },
            {
              WorkStation: "K102PL01A0490",
              WorkStationDesc: "驾驶室前围管线连接2",
            },
            { WorkStation: "K102PL01A0500", WorkStationDesc: "软轴连接" },
            { WorkStation: "K102PL01A0510", WorkStationDesc: "保险杠安装" },
            { WorkStation: "K102PL01A0520", WorkStationDesc: "油液加注2" },
            { WorkStation: "K102PL01A0530", WorkStationDesc: "油液加注3" },
            { WorkStation: "K102PL01A0540", WorkStationDesc: "鞍座吊装" },
            { WorkStation: "K102PL01A0550", WorkStationDesc: "方向盘安装" },
            { WorkStation: "K102PL01A0560", WorkStationDesc: "车辆下线" },
            { WorkStation: "K102PL01A0570", WorkStationDesc: "预调" },
            { WorkStation: "K102PL01A0580", WorkStationDesc: "四轮定位" },
            { WorkStation: "K102PL01A0590", WorkStationDesc: "检测线" },
            { WorkStation: "K102PL01A0600", WorkStationDesc: "ADAS标定" },
            { WorkStation: "K102PL01A0610", WorkStationDesc: "淋雨检查" },
            { WorkStation: "K102PL01A0620", WorkStationDesc: "厂内路试" },
            { WorkStation: "K102PL01A0630", WorkStationDesc: "地沟检测" },
            { WorkStation: "K102PL01A0640", WorkStationDesc: "四轮定位调整" },
          ],
        },
        {
          ProductionLineNo: "K102SL02",
          ProductionLineDesc: "智联重卡整车小件分装",
          Data: [{ WorkStation: "K102SL02A0010", WorkStationDesc: "小件分装" }],
        },
        {
          ProductionLineNo: "K102SL11",
          ProductionLineDesc: "智联重卡整车前桥分装",
          Data: [{ WorkStation: "K102SL11A0010", WorkStationDesc: "前桥分装" }],
        },
        {
          ProductionLineNo: "K102SL14",
          ProductionLineDesc: "智联重卡整车中桥分装",
          Data: [{ WorkStation: "K102SL14A0010", WorkStationDesc: "中桥分装" }],
        },
        {
          ProductionLineNo: "K102SL16",
          ProductionLineDesc: "智联重卡整车后桥分装",
          Data: [{ WorkStation: "K102SL16A0010", WorkStationDesc: "后桥分装" }],
        },
        {
          ProductionLineNo: "K102SL25",
          ProductionLineDesc: "智联重卡整车大件分装",
          Data: [{ WorkStation: "K102SL25A0010", WorkStationDesc: "大件分装" }],
        },
        {
          ProductionLineNo: "K102SL27",
          ProductionLineDesc: "智联重卡整车发动机变速箱分装",
          Data: [
            { WorkStation: "K102SL27A0050", WorkStationDesc: "风扇安装" },
            { WorkStation: "K102SL27A0060", WorkStationDesc: "压缩机安装" },
            {
              WorkStation: "K102SL27A0070",
              WorkStationDesc: "发动机后悬支架安装",
            },
            { WorkStation: "K102SL27A0080", WorkStationDesc: "空压机盘管安装" },
            {
              WorkStation: "K102SL27A0090",
              WorkStationDesc: "机油变速箱油加注",
            },
            { WorkStation: "K102SL27A0100", WorkStationDesc: "进气钢管安装" },
            { WorkStation: "K102SL27A0110", WorkStationDesc: "液缓管路安装1" },
            { WorkStation: "K102SL27A0120", WorkStationDesc: "液缓管路安装2" },
            {
              WorkStation: "K102SL27A0130",
              WorkStationDesc: "软轴固定发动机上线",
            },
            { WorkStation: "K102SL27A0040", WorkStationDesc: "变速箱吊装" },
            { WorkStation: "K102SL27A0030", WorkStationDesc: "离合器压盘安装" },
            {
              WorkStation: "K102SL27A0020",
              WorkStationDesc: "发动机前悬支架安装",
            },
            {
              WorkStation: "K102SL27A0010",
              WorkStationDesc: "发动机变速箱分装",
            },
          ],
        },
      ],
    },
  ];
  callback(obj);
};

//  查询工位检验项列表
window.WorkStationFunc = function (Level, callback) {
  console.log("[Mock] WorkStationFunc 请求参数:", JSON.stringify(Level, null, 2));
  var data = {
    code: "0",
    msg: "",
    WipOrderNo: "220805190853",
    OrderStatus: 11.0,
    Vin: "220805190853",
    MonthSequence: "2025-0101",
    WorkStation: "K102PL01A0690",
    ProductNo: "14323419",
    SpecialsaleCommont: "",
    ResponseData: [
      {
        Classify: "0",
        ClassifyName: "其他",
        DataList: [
          {
            SequenceNo: 1,
            ID: 103480417,
            Characteristic: "ZZ-000036",
            CharacteristicText:
              "低压线束安装状态（轻卡）——1、与运动件之间间隙≥35mm，不与其它尖锐部件干涉，并有永久固定不因时间而发生变化，插接件插接到位，外层防护不漏白； 2 、线束从车架、电池框等处穿过的孔需在孔上加橡胶套防止磨线； 2、无裸露线束头在外； 3、无凌乱线路、管路甩出，均扎带固定良好，扎带端头剪切平齐，线束无晃动；",
            TestMethod: "100%",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark:
              "收到发生的发发发发生",
            PicPath:
              "http://mom-cszk.sany.com.cn/Apriso/Portal/SharedFolder/ZK/QMS/202502/Defect_20250217_DISPOSITIONTESTID_103480417_01.png",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 4,
            ID: 103480419,
            Characteristic: "ZZ-000750",
            CharacteristicText: "Test002",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DL",
            UpperControlLimit: 1.0,
            LowerControlLimit: 1.0,
            TargetValue: 1.0,
            Uom: "",
            TestValue: "",
            TestAttribute: "",
            Status: 0,
            Remark: "1231244124",
            PicPath:
              "http://mom-cszk.sany.com.cn/Apriso/Portal/SharedFolder/ZK/QMS/202502/Defect_20250211_DISPOSITIONTESTID_103480419_01.png",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 5,
            ID: 103480418,
            Characteristic: "ZZ-002605",
            CharacteristicText: "特色12",
            TestMethod: "100%",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "防守打法",
            PicPath: "",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: ",01002",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480423,
            Characteristic: "ZZ-001871",
            CharacteristicText: "整车型号:HQC42503S1S13F",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "",
            PicPath: "",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480425,
            Characteristic: "ZZ-001877",
            CharacteristicText: "整备质量:8740",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "",
            PicPath: "",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480420,
            Characteristic: "ZZ-001870",
            CharacteristicText: "牵引座最大设计静载荷:16130",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "",
            PicPath: "",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480426,
            Characteristic: "ZZ-001875",
            CharacteristicText: "车辆颜色:红/黑/白",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "发;擦拭",
            PicPath:
              "http://mom-cszk.sany.com.cn/Apriso/Portal/SharedFolder/ZK/QMS/202504/Defect_20250423_DISPOSITIONTESTID_103480426_01.jpeg,http://mom-cszk.sany.com.cn/Apriso/Portal/SharedFolder/ZK/QMS/202504/Defect_20250423_DISPOSITIONTESTID_103480426_03.jpeg,http://mom-cszk.sany.com.cn/Apriso/Portal/SharedFolder/ZK/QMS/202504/Defect_20250423_DISPOSITIONTESTID_103480426_02.jpeg",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "04017,02001",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480421,
            Characteristic: "ZZ-001878",
            CharacteristicText: "最大允许牵引质量:40000",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "",
            PicPath: "",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480422,
            Characteristic: "ZZ-001876",
            CharacteristicText: "发动机额定功率:368",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "",
            PicPath: "",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "",
            ScanEquipCode: "",
            EquipCodeTypeName: "",
            EquipCodeType: "",
          },
          {
            SequenceNo: 0,
            ID: 103480424,
            Characteristic: "ZZ-002611",
            CharacteristicText: "发动机型号:WP13.500E501TEST12041.1",
            TestMethod: "",
            Version: "1",
            Characteristicattr: "DX",
            UpperControlLimit: 0.0,
            LowerControlLimit: 0.0,
            TargetValue: 0.0,
            Uom: "",
            TestValue: 0.0,
            TestAttribute: "",
            Status: 0,
            Remark: "324234",
            PicPath:
              "http://mom-cszk.sany.com.cn/Apriso/Portal/SharedFolder/ZK/QMS/202502/Defect_20250211_DISPOSITIONTESTID_103480424_01.png",
            BaseReasonCodeList: [
              { ReasonCode: "01001", ReasonDesc: "钣金凹（凸）" },
              { ReasonCode: "01002", ReasonDesc: "开裂" },
            ],
            TestReasonCode: "01002,",
            ScanEquipCode: "1",
            EquipCodeTypeName: "电机码",
            EquipCodeType: "2",
          },
        ],
      },
    ],
  };
  console.log("[Mock] WorkStationFunc 响应数据:", JSON.stringify(data, null, 2));
  callback(data);
};
//  安灯不合格票创建
window.WreateIneligibleTicket = function (data, callback) {
  // 入参 data
  console.log("[Mock] WreateIneligibleTicket 请求参数:", JSON.stringify(data, null, 2));
  let obj = { code: "1", message: "保存成功" };
  console.log("[Mock] WreateIneligibleTicket 响应数据:", JSON.stringify(obj, null, 2));
  callback(obj);
};

// 工位检验结果提交
window.StationInspectionAndPreservation = function (data, callback) {
  console.log("[Mock] StationInspectionAndPreservation 请求参数:", JSON.stringify(data, null, 2));
  let obj = { code: "0", message: "保存成功" };
  console.log("[Mock] StationInspectionAndPreservation 响应数据:", JSON.stringify(obj, null, 2));
  callback(obj);
};
// 保存图片
window.saveImgFils = function (params, callback) {
  console.log("[Mock] saveImgFils 请求参数:", JSON.stringify(params, null, 2));
  const response = { code: 0, data: params.url };
  console.log("[Mock] saveImgFils 响应数据:", JSON.stringify(response, null, 2));
  callback(response);
};

window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
  if (event.data.url) {
    var key = event.data.key;
    var name = event.data.url;
    window.handleUpload(key, name);
  }
}

window.clearUpload = function () {
  document.getElementById("fileIframe").contentWindow.postMessage("clear");
};

window.uploadCallback = function () {};
window.handleUpload = function (key, fileName) {
  window.uploadCallback(key, fileName);
};

window.postFile = function (key, file, callback) {
  document.getElementById("fileIframe").contentWindow.postMessage({
    key: key,
    file: file,
  });
  window.uploadCallback = callback;
};
