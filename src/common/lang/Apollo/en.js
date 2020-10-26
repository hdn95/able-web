module.exports = {
  MotorStatus: {
    Status: {
      status: 'Status',
      highTEMP: 'TEMP Over Limit Warning',
      lowTEMP: 'TEMP Under Limit Warning',
      highVoltage: 'Voltage Over Limit Warning',
      lowVoltage: ' Voltage Under Limit Warning',
      highCurrent: 'Current Over Limit Warning',
      voltageImbalance: 'Three Phase Voltage Imbalance',
      currentImbalance: 'Three Phase Current Imbalance',
      highPower: 'Power Over Warning',
      currentDirection: 'Current Transformer Direction',
      frequencyOutOfRange: 'Frequency Out of Range',
      runningDirection: 'Rotation Direction'
    },
    selfCheckState: {
      statusEnergyMeter: 'Status EnergyMeter',
      statusWifiModul: 'Status WifiModul',
      statusSub1Modul: 'Status Sub1Modul',
      statusTemperature1: 'Status Temperature1',
      statusTemperature2: 'Status Temperature2',
      statusTemperature3: 'Status Temperature3',
      statusTemperature4: 'Status Temperature4',
      statusTemperature5: 'Status Temperature5',
      statusTemperature6: 'Status Temperature6',
      statusVoltageInput: 'Status VoltageInput',
      statusAmpereInput: 'Status AmpereInput',
      statusVoltageValue: 'Status VoltageValue',
      statusVoltagePhase: 'Status VoltagePhase',
      statusVoltageAUnder: 'Status VoltageA Under',
      statusVoltageBCUnder: 'Status VoltageBC Under',
      statusVoltageInstable: 'Status Voltage Instable'
    },
    selfCheckState1: {
      statusVoltageAOver: 'Status VoltageA Over',
      statusVoltageBCOver: 'Status VoltageBC Over',
      statusVoltageDeficiency: 'Status Voltage Deficiency',
      statusVoltageUnbalance: 'Status Voltage Unbalance',
      statusAmpereAExist: 'Status AmpereA Exist',
      statusAmpereBExist: 'Status AmpereB Exist',
      statusAmpereCExist: 'Status AmpereC Exist',
      statusAmpereAShort: 'Status AmpereA Short',
      statusAmpereBShort: 'Status AmpereB Short',
      statusAmpereCShort: 'Status AmpereC Short',
      statusAmpereAUnder: 'Status AmpereA Under',
      statusAmpereBUnder: 'Status AmpereB Under',
      statusAmpereCUnder: 'Status AmpereC Under',
      statusAmpereAOver: 'Status AmpereA Over',
      statusAmpereBOver: 'Status AmpereB Over',
      statusAmpereCOver: 'Status AmpereC Over'
    },
    selfCheckState2: {
      statusFrequencyOutOfRange: 'Status Frequency OutOfRange',
      statusContactor: 'Status Contactor',
      statusAmpereBCUnbalance: 'Status AmpereBC Unbalance',
      statusAmpereABUnbalance: 'Status AmpereAB Unbalance',
      statusAmpereACUnbalance: 'Status AmpereAC Unbalance'
    },
    subdivisionStatus: {
      statusAlarmTemperature6: 'status Alarm Temperature6',
      statusTrippingTemperature: 'status Tripping Temperature',
      statusAlarmVoltageOver: 'status Alarm VoltageOver',
      statusAlarmVoltageUnder: 'status Alarm VoltageUnder',
      statusAlarmAmpereOver: 'status Alarm AmpereOver',
      statusAlarmVoltageUnbalance: 'status Alarm Voltage Unbalance',
      statusAlarmAmpereUnbalance: 'status Alarm Ampere Unbalance',
      statusPowerSupply: 'status Power Supply',
      statusAmpereDirection: 'status Ampere Direction',
      statusAlarmRateScopeOver: 'status Alarm Rate ScopeOver',
      statusAlarmUrgentButton: 'status Alarm UrgentButton',
      statusAlarmVoltageInstable: 'status Alarm Voltage Instable',
      statusAlarmAmpereInstable: 'status Alarm Ampere Instable',
      statusAlarmVoltageDeficiency: 'status Alarm Voltage Deficiency',
      statusAlarmAmpereUnderload: 'status Alarm Ampere Underload'
    },
    subdivisionStatus1: {
      statusAlarmAmpereAShort: 'status Alarm AmpereAShort',
      statusAlarmAmpereBShort: 'status Alarm AmpereBShort',
      statusAlarmAmpereCShort: 'status Alarm AmpereCShort',
      statusAlarmAmpereAUnderload: 'status Alarm AmpereAUnderload',
      statusAlarmAmpereBUnderload: 'status Alarm AmpereBUnderload',
      statusAlarmAmpereCUnderload: 'status Alarm AmpereCUnderload',
      statusAlarmVoltageAInstable: 'status Alarm VoltageAInstable',
      statusAlarmVoltageBInstable: 'status Alarm VoltageBInstable',
      statusAlarmVoltageCInstable: 'status Alarm VoltageCInstable',
      statusAlarmAmpereAInstable: 'status Alarm AmpereAInstable',
      statusAlarmAmpereBInstable: 'status Alarm AmpereBInstable',
      statusAlarmAmpereCInstable: 'status Alarm AmpereCInstable',
      statusAlarmAmpereBCUnbalance: 'status Alarm AmpereBCUnbalance',
      statusAlarmAmpereABUnbalance: 'status Alarm AmpereABUnbalance',
      statusAlarmAmpereACUnbalance: 'status Alarm AmpereACUnbalance'
    },
    Text: {
      charts: 'View Chart',
      electricity: 'Electricity',
      wifiSignal: 'WIFI Signal',
      totalTime: 'Total Running Time',
      hour: 'Hour'
    },
    Current: {
      text: {
        title: 'Current Display'
      },
      table: {
        current: 'Current',
        value: 'Current Value(A)',
        status: 'Current Status',
        aPhase: 'Phase A Current',
        bPhase: 'Phase B Current',
        cPhase: 'Phase C Current'
      }
    },
    Voltage: {
      text: {
        title: 'Voltage Display'
      },
      table: {
        voltage: 'Voltage',
        value: 'Voltage Value(V)',
        lackStatus: 'Undervoltage Status',
        fullStatus: 'Overvoltage Status',
        aPhase: 'Phase A Volt',
        bPhase: 'Phase B Volt',
        cPhase: 'Phase C Volt'
      }
    },
    Temperature: {
      text: {
        title: 'Temperature Display'
      },
      table: {
        temperature: 'Temperature',
        value: 'Temp Value(℃)',
        status: 'Temp Status',
        terminalBox: 'Motor Junction Box',
        statorWindingU: 'Stator Winding U',
        statorWindingV: 'Stator Winding V',
        statorWindingW: 'Stator Winding W',
        frontBearing: 'Front Bearing',
        realBearing: 'Rear Bearing'
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
      title: 'Temperature Chart',
      yTitle: 'Temp Value(℃)'
    },
    table: {
      create: 'Time',
      terminalBox: 'Motor Junction Box',
      statorWindingU: 'Stator Winding U',
      statorWindingV: 'Stator Winding V',
      statorWindingW: 'Stator Winding W',
      frontBearing: 'Front Bearing',
      realBearing: 'Rear Bearing'
    }
  },

  /**
   *@date: 2018-10-09 16:27:51
   *@author: jing.fu@gosafenet.com
   *@desc: 电流
   */
  ElectricCurrent: {
    text: {
      title: 'Dynamic Current Diagram',
      yTitle: 'Current Value（A）'
    },
    table: {
      create: 'Generation Time',
      aPhase: 'Phase A Current',
      bPhase: 'Phase B Current',
      cPhase: 'Phase C Current'
    }
  },

  /**
   *@date: 2018-10-17 14:46:51
   *@author: jing.fu@gosafenet.com
   *@desc: 电压
   */
  Voltage: {
    text: {
      title: 'Dynamic Voltage Diagram',
      yTitle: 'Voltage Value（V）'
    },
    table: {
      create: 'Generation Time',
      aPhase: 'Phase A Volt',
      bPhase: 'Phase B Volt',
      cPhase: 'Phase C Volt'
    }
  },

  /**
   *@date: 2018-11-01 15:16:16
   *@author: jing.fu@gosafenet.com
   *@desc: 开关机数据
   */
  Switchgear: {
    text: {
      title: 'Switchgear Value',
      yTitle: 'Value',
      stop: 'Stop',
      running: 'Running',
      runStatus: 'Run Status',
      statusValue: 'Status Value'
    },
    table: {
      switchgear: 'Switchgear Value',
      time: 'Time',
      downtime: 'Downtime',
      duration: 'Duration(second)',
      status: 'Status'
    }
  },

  /**
   *@date: 2018-10-17 15:50:54
   *@author: jing.fu@gosafenet.com
   *@desc: 安波电机
   */
  Apollo: {
    tips: {
      deviceClickError: " Sorry, Please select the Device for data"
    },
    status: {
      operating: 'Operating status',
      selfCheckState: 'Self checking state',
      selfCheckState1: 'Self checking state1',
      selfCheckState2: 'Self checking state2',
      subdivisionStatus: 'subdivision Status',
      subdivisionStatus1: 'subdivision Status1',
      detail: 'Detailed operating status'
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
        title: 'Save as Image'
      },
      dataView: {
        title: 'Data Display',
        close: 'Close',
        refresh: 'Refresh'
      }
    }
  }
}
