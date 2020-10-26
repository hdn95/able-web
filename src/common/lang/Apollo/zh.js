module.exports = {
  MotorStatus: {
    Status: {
      status: '运行状态',
      highTEMP: '高温警告',
      lowTEMP: '低温警告',
      highVoltage: '高压警告',
      lowVoltage: '低压警告',
      highCurrent: '过流警告',
      voltageImbalance: '三相电压不平衡',
      currentImbalance: '三相电流不平衡',
      highPower: '功率过高',
      currentDirection: '电流互感器方向',
      frequencyOutOfRange: '频率超出范围',
      runningDirection: '运行方向'
    },
    selfCheckState: {
      statusEnergyMeter: '电能表读取是否正常',
      statusWifiModul: 'IFI模块是否正常工作',
      statusSub1Modul: 'SUB1是否正常工作',
      statusTemperature1: '接线盒温度是否正常',
      statusTemperature2: '前轴温度是否正常',
      statusTemperature3: '后轴温度是否正常',
      statusTemperature4: 'U定子绕组温度是否正常',
      statusTemperature5: 'V定子绕组温度是否正常',
      statusTemperature6: 'W定子绕组温度是否正常',
      statusVoltageInput: '是否有电压输入',
      statusAmpereInput: '是否有电流输入',
      statusVoltageValue: '电压是否正常输入',
      statusVoltagePhase: '相序是否正常',
      statusVoltageAUnder: 'A相是否欠压',
      statusVoltageBCUnder: 'BC相是否欠压',
      statusVoltageInstable: '电压是否不平衡'
    },
    selfCheckState1: {
      statusVoltageAOver: 'A相是否过压',
      statusVoltageBCOver: 'BC相是否过压',
      statusVoltageDeficiency: '电机电压是否缺相',
      statusVoltageUnbalance: '电压是否不平衡',
      statusAmpereAExist: 'A相是否有电流',
      statusAmpereBExist: 'B相是否有电流',
      statusAmpereCExist: 'C相是否有电流',
      statusAmpereAShort: 'A相电流是否短路',
      statusAmpereBShort: 'B相电流是否短路',
      statusAmpereCShort: 'C相电流是否短路',
      statusAmpereAUnder: 'A相电流是否欠载',
      statusAmpereBUnder: 'B相电流是否欠载',
      statusAmpereCUnder: 'C相电流是否欠载',
      statusAmpereAOver: 'A相电流是否过载',
      statusAmpereBOver: 'B相电流是否过载',
      statusAmpereCOver: 'C相电流是否过载'
    },
    selfCheckState2: {
      statusFrequencyOutOfRange: '频率是否超出范围',
      statusContactor: '接触器是否正常',
      statusAmpereBCUnbalance: 'BC相电流不平衡',
      statusAmpereABUnbalance: 'AB相电流不平衡',
      statusAmpereACUnbalance: 'AC相电流不平衡'
    },
    subdivisionStatus: {
      statusAlarmTemperature6: 'W定子绕组温度报警',
      statusTrippingTemperature: '温度跳闸',
      statusAlarmVoltageOver: '过压报警',
      statusAlarmVoltageUnder: '欠压报警',
      statusAlarmAmpereOver: '过流报警',
      statusAlarmVoltageUnbalance: '电压不平衡报警',
      statusAlarmAmpereUnbalance: '电流不平衡报警',
      statusPowerSupply: '电机通电',
      statusAmpereDirection: '电流方向',
      statusAlarmRateScopeOver: '频率超出范围报警',
      statusAlarmUrgentButton: '紧急开关报警',
      statusAlarmVoltageInstable: '电压不稳定报警',
      statusAlarmAmpereInstable: '电流不稳定报警',
      statusAlarmVoltageDeficiency: '电机电压缺相报警',
      statusAlarmAmpereUnderload: '欠载报警'
    },
    subdivisionStatus1: {
      statusAlarmAmpereAShort: 'A相电流短路报警',
      statusAlarmAmpereBShort: 'B相电流短路报警',
      statusAlarmAmpereCShort: 'C相电流短路报警',
      statusAlarmAmpereAUnderload: 'A相电流欠载报警',
      statusAlarmAmpereBUnderload: 'B相电流欠载报警',
      statusAlarmAmpereCUnderload: 'C相电流欠载报警',
      statusAlarmVoltageAInstable: 'A相电压不稳定',
      statusAlarmVoltageBInstable: 'B相电压不稳定报警',
      statusAlarmVoltageCInstable: 'C相电压不稳定报警',
      statusAlarmAmpereAInstable: 'A相电流不稳定',
      statusAlarmAmpereBInstable: 'B相电流不稳定',
      statusAlarmAmpereCInstable: 'C相电流不稳定',
      statusAlarmAmpereBCUnbalance: 'BC相电流不平衡报警',
      statusAlarmAmpereABUnbalance: 'AB相电流不平衡报警',
      statusAlarmAmpereACUnbalance: 'AC相电流不平衡报警'
    },
    Text: {
      charts: '查看图表',
      electricity: '用电量',
      wifiSignal: 'WIFI信号',
      totalTime: '运行总时长',
      hour: '小时'
    },
    Current: {
      text: {
        title: '电流视图'
      },
      table: {
        current: '电流',
        value: '电流值(A)',
        status: '电流状态',
        aPhase: 'A相电流',
        bPhase: 'B相电流',
        cPhase: 'C相电流'
      }
    },
    Voltage: {
      text: {
        title: '电压视图'
      },
      table: {
        voltage: '电压',
        value: '电压值(V)',
        lackStatus: '欠压状态',
        fullStatus: '过压状态',
        aPhase: 'A相电压',
        bPhase: 'B相电压',
        cPhase: 'C相电压'
      }
    },
    Temperature: {
      text: {
        title: '温度视图'
      },
      table: {
        temperature: '温度',
        value: '温度值(℃)',
        status: '报警状态',
        terminalBox: '接线盒',
        statorWindingU: 'U定子绕组',
        statorWindingV: 'V定子绕组',
        statorWindingW: 'W定子绕组',
        frontBearing: '前轴承',
        realBearing: '后轴承'
      }
    }
  },

  /**
   *@date: 2018-10-23 15:28:09
   *@author: jing.fu@gosafenet.com
   *@desc: 温度图表
   */
  Temperature: {
    text: {
      title: '动态温度图',
      yTitle: '温度值（℃）'
    },
    table: {
      create: '生成时间',
      terminalBox: '接线盒',
      statorWindingU: 'U定子绕组',
      statorWindingV: 'V定子绕组',
      statorWindingW: 'W定子绕组',
      frontBearing: '前轴承',
      realBearing: '后轴承'
    }
  },

  /**
   *@date: 2018-10-09 16:27:51
   *@author: jing.fu@gosafenet.com
   *@desc: 电流
   */
  ElectricCurrent: {
    text: {
      title: '动态电流图',
      yTitle: '电流值（A）'
    },
    table: {
      create: '生成时间',
      aPhase: 'A相电流',
      bPhase: 'B相电流',
      cPhase: 'C相电流'
    }
  },

  /**
   *@date: 2018-10-17 14:46:51
   *@author: jing.fu@gosafenet.com
   *@desc: 电压
   */
  Voltage: {
    text: {
      title: '动态电压图',
      yTitle: '电压值（V）'
    },
    table: {
      create: '生成时间',
      aPhase: 'A相电压',
      bPhase: 'B相电压',
      cPhase: 'C相电压'
    }
  },

  /**
   *@date: 2018-11-01 15:16:16
   *@author: jing.fu@gosafenet.com
   *@desc: 开关机数据
   */
  Switchgear: {
    text: {
      title: '开关机数据',
      yTitle: '数值',
      stop: '停机',
      running: '运行中',
      runStatus: '运行状态',
      statusValue: '状态值'
    },
    table: {
      switchgear: '开关机数据',
      time: '检测时间',
      downtime: '停机时间',
      duration: '时长(秒)',
      status: '状态'
    }
  },

  /**
   *@date: 2018-10-17 15:50:54
   *@author: jing.fu@gosafenet.com
   *@desc: 安波电机
   */
  Apollo: {
    tips: {
      deviceClickError: "对不起，您点击的是设备类型，不支持查看数据"
    },
    status: {
      operating: '运行状态',
      selfCheckState: '自检',
      selfCheckState1: '自检1',
      selfCheckState2: '自检2',
      subdivisionStatus: '细分',
      subdivisionStatus1: '细分1',
      detail: '详细运行状态'
    }
  },

  /**
   *@date: 2018-10-10 10:59:49
   *@author: jing.fu@gosafenet.com
   *@desc: ECharts
   */
  ECharts: {
    toolbox: {
      saveAsImage: {
        title: '保存为图片'
      },
      dataView: {
        title: '数据视图',
        close: '关闭',
        refresh: '刷新'
      }
    }
  }
}
