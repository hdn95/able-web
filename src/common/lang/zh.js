module.exports = {
  SystemName: "Able电机平台",
  Copyright: {
    fullName: 'CopyRight © 2018 联桥网云信息科技（长沙）有限公司',
    shortName: '联桥网云'
  },
  ErrorPage: {
    errText: '页面找不到或没有访问权限'
  },
  Home: {
    title: "首页"
  },
  Authorization: {
    auzResourceforRoleTitle: "给角色授权资源",
    auzResourceforUserTitle: "给用户授权资源",
    roleAuzTitle: "授权角色"
  },
  Language: {
    btn: "切换语言",
    confirm: {
      text: "确定要切换语言吗"
    }
  },
  WebSocket: {
    tips: {
      notSupport: '您的浏览器不支持WebSocket'
    }
  },
  DefaultButton: {
    previousPage: "上一页",
    nextPage: "下一页",
    refreshButtonText: "刷新",
    searchButtonText: "搜索",
    saveButtonText: "保存",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    deleteButtonText: "删除",
    addButtonText: "新增",
    editButtonText: "编辑",
    detailButtonText: "详情",
    resourceAuz: "授权资源",
    roleAuz: "授权角色",
    import: '导入',
    export: '导出',
    selectFile: '选择文件并上传',
    reselect: '重新选择'
  },
  SearchTips: {
    filter: "复合筛选",
    requestType: "请求类型",
    resourceType: "资源类型",
    detailedData: "详情数据"
  },
  RquestType: {
    get: "GET请求",
    post: "POST请求",
    put: "PUT请求",
    delete: "DELETE请求",
    import: "IMPORT请求",
    export: "EXPORT请求"
  },
  DefaultTips: {
    successText: '操作成功',
    all: "全部",
    searchPlaceholder: "请输入关键字搜索",
    editDataTitle: "编辑数据",
    addDataTitle: "新增数据",
    detailDataTitle: "详细数据",
    importTitle: '导入数据',
    template: '下载模板',
    basicInformation: "基础信息",
    location: '地理位置',
    selectLocation: '在地图中选择点确认地理位置',
    treeStruct: "树结构",
    datasheets: "数据列表",
    refreshData: "刷新数据",
    currentLocation: "当前位置",
    pendingSelectionTips: "请选择操作的数据",
    deletedConfirmTips: "确定删除选择的数据",
    overflowLimitedTips: "选择的数据超出限定",
    saveSuccessText: '保存成功',
    uploading: '上传中',
    startTime: '开始时间',
    endTime: '结束时间',
    last10Minutes: '最近10分钟',
    last30Minutes: '最近30分钟',
    lastHour: "最近一小时",
    lastDay: "最近一天",
    today: '今天',
    expand: '展开',
    collapse: '收起',
    updateTime: '更新时间'
  },
  belongTo:{
    department:'部门列表',
    organ:'机构列表'
  },
  MessageBox: {
    confirmTitle: "系统提示"
  },
  LoginLog: {
    btn: "登录日志",
    table: {
      ipAddress: "IP地址",
      operatingTime: "操作时间"
    },
    tips: {
      tips: '注：仅显示最近10条'
    }
  },
  Login: {
    title: "登录系统",
    loginBtn: "登录",
    clearBtn: "清空",
    loginLoading: "登录中",
    rememberText: "记住账号",
    successText: "登录成功",
    loginName: "登录账号",
    loginNameTips: "请输入登录账号",
    loginPwd: "登录密码",
    loginPwdTips: "请输入登录密码"
  },
  LoginOutMessageBox: {
    btn: "退出",
    confirmButtonText: "退出",
    cancelButtonText: "取消",
    text: "确定要退出系统吗",
    successText: "退出成功"
  },
  RefreshCacheMessageBox: {
    btn: "刷新缓存",
    confirmButtonText: "刷新",
    cancelButtonText: "取消",
    text: "确定要刷新系统缓存吗",
    successText: "刷新成功"
  },
  ResourceType: {
    module: "模块",
    page: "页面",
    function: "功能点",
    other: "其他"
  },
  Icon: {
    title: "选择Icon"
  },
  Resource: {
    search: {
      owner: "所属模块",
      description: "资源描述",
      url: "资源URL"
    },
    table: {
      owner: "所属模块",
      description: "资源描述",
      icon: "Icon图标",
      cssName: "CssName",
      requestType: "请求类型",
      resourceType: "资源类型",
      jsEvent: "Js事件",
      url: "资源URL",
      parentId: "上级节点",
      display: "是否显示",
      displayText: "是否在页面显示",
      parentModule: '父级模块',
      orderNum: '排序号'
    },
    placeholder: {
      owner: "请输入资源所属模块",
      description: "请输入资源描述",
      url: "请输入资源地址",
      jsEvent: "请输入Js事件",
      parentId: "请在左边树节点选择",
      icon: "请选择Icon图标",
      cssName: "请输入Css名称",
      orderNum: '请输入排序号'
    }
  },
  AreaManage: {
    table: {
      areaNumber: "行政编号",
      areaName: "行政名称",
      shortSpell: "简拼",
      level: "等级",
      enable: "是否启用",
      remark: "备注",
      parentId: "上级节点"
    },
    placeholder: {
      areaNumber: "请输入行政编号",
      areaName: "请输入行政名称",
      shortSpell: "请输入简拼",
      level: "请输入等级(0、1、2..)",
      remark: "请输入备注",
      parentId: "请在左边树节点选择",
      enable: "是否启用"
    }
  },
  Dictionary: {
    search: {
      name: "字典名称"
    },
    table: {
      name: "字典名称",
      enable: "是否启用",
      remark: "备注",
      parentId: "上级节点",
      code: "字典代码",
      setting: "字典设置"
    },
    placeholder: {
      name: "请输入字典名称",
      parentId: "请在左边树节点选择",
      code: "请输入字典代码",
      isTree: "是否树",
      isNav: "是否导航",
      remark: "请输入备注",
      enable: "是否启用"
    }
  },
  DictionaryDetail: {
    search: {
      projectName: "项目名",
      projectValue: "项目值",
      simpleSpelling: "简拼"
    },
    table: {
      projectName: "项目名",
      projectValue: "项目值",
      simpleSpelling: "简拼",
      enable: "是否启用",
      remark: "备注",
      parentId: "上级节点"
    },
    placeholder: {
      projectName: "请输入项目名",
      projectValue: "请输入项目值",
      simpleSpelling: "请输入简拼",
      remark: "请输入备注",
      parentId: "请在左边树节点选择",
      enable: "是否启用"
    }
  },
  Role: {
    category: {
      role: "角色",
      post: "岗位",
      office: "职位",
      workGroup: "工作组"
    },
    search: {
      roleName: "角色名称",
      roleId: "角色ID"
    },
    table: {
      category: "角色类型",
      name: "角色名称",
      code: "角色代码",
      isPublic: "公共角色",
      expired: "过期时间"
    },
    placeholder: {
      category: "请选择角色分类",
      name: "请输入角色名称",
      code: "请输入角色代码",
      isPublic: "公共角色",
      expired: "为空则没有限制"
    }
  },
  User: {
    genderType: {
      male: '男',
      female: '女',
      other: '其他'
    },
    search: {
      loginAccount: "登录账号",
      realName: "真实姓名",
      userId: "用户ID"
    },
    table: {
      enCode: "账号编码",
      account: "登录账号",
      gender: "性别",
      realName: "真实姓名",
      mobile: "手机号码",
      description: "备注",
      password: "登录密码",
      loginType: "登录类型",
      onLine: "同时在线",
      ascriptionSystem: "归属系统",
      nickName: "昵称",
      quickQuery: '快速查询',
      simpleSpelling: '简拼',
      birthday: '生日',
      telephone: '电话',
      email: '电子邮件',
      QQ: 'QQ',
      MSN: 'MSN',
      weChat: '微信'
    },
    placeholder: {
      onLine: "是否允许同时在线登录",
      enCode: "请输入账号编码",
      account: "请输入登录账号",
      gender: "性别",
      realName: "请输入真实姓名",
      mobile: "请输入手机号码",
      description: "请输入备注",
      password: "请输入登录密码",
      loginType: "请选择登录类型",
      ascriptionSystem: "请输入归属系统",
      nickName: "请输入昵称",
      editPwd: '默认不填则不做修改'
    }
  },
  Thresholds: {
    search: {
      name: "项目名称"
    },
    table: {
      category: "所属分类",
      enCode: "项目代码",
      name: "项目名称",
      suitable_Min: "合适区间最小值",
      suitable_Max: "合适区间最大值",
      warning_Min: "警戒最小值",
      warning_Max: "警戒最大值",
      standard_Min: "标准最小值",
      standard_Max: "标准最大值",
      unit: "计量单位",
      enable: "是否启用",
      remark: "备注"
    },
    placeholder: {
      category: "请选择所属分类",
      enCode: "请输入项目代码",
      name: "请输入项目名称",
      enable: "是否启用"
    }
  },
  ThresholdDetail: {
    search: {
      level_No: "等级名称"
    },
    table: {
      level_No: "等级名称",
      level_Desc: "等级描述",
      level_Min: "等级下限",
      level_Max: "等级上限",
      enable: "是否启用",
      remark: "备注",
      parentId: "所属分类"
    },
    placeholder: {
      level_No: "请输入等级名称",
      level_Desc: "请输入等级描述",
      level_Min: "请输入等级下限值",
      level_Max: "请输入等级上限值",
      enable: "是否启用",
      remark: "请输入备注",
      parentId: "请在左边树节点选择"
    }
  },
  Department: {
    search: {
      departmentName: "部门名称",
      departmentID: "部门ID",
      owner: "所属机构"
    },
    table: {
      id: "部门ID",
      enCode: "部门代码",
      shortName: "简称",
      fullName: "部门名称",
      nature: "部门性质",
      outerPhone: "外线电话",
      fax: "传真",
      manager: "负责人",
      layer: "楼层",
      parentId: "上级节点",
      owner: "所属机构",
      innerPhone: "内线电话",
      email: "电子邮件"
    },
    placeholder: {
      enCode: "请输入部门代码",
      shortName: "请输入部门简称",
      fullName: "请输入部门名称",
      nature: "请输入部门性质",
      outerPhone: "请输入外线电话",
      fax: "请输入部门传真",
      layer: "请输入部门楼层",
      parentId: "请在左边树节点选择",
      owner: "请在左边树节点选择所属机构",
      innerPhone: "请输入内线电话",
      email: "请输入电子邮件"
    }
  },
  Organize: {
    category: {
      group: "集团",
      company: "公司",
      branch: "分公司",
      subsidiary: "子公司"
    },
    tips: {
      view: "查看官网"
    },
    search: {
      organizeName: "机构名称",
      organizeID: "机构ID"
    },
    table: {
      shortName: "机构简称",
      fullName: "机构全称",
      nature: "性质",
      outerPhone: "外线电话",
      fax: "传真",
      businessScope: "经营范围",
      webAddress: "机构官网",
      description: "备注",
      parentId: "上级节点",
      category: "机构分类",
      enCode: "机构代码",
      innerPhone: "内线电话",
      postalcode: "邮编",
      email: "电子邮件",
      foundedTime: "成立时间",
      layer: "楼层",
      address: "详细地址"
    },
    placeholder: {
      shortName: '请输入机构简称',
      fullName: '请输入机构名称',
      nature: '请输入机构性质',
      outerPhone: '请输入外线电话',
      fax: '请输入机构传真',
      businessScope: '请输入机构经营范围',
      webAddress: '请输入官网地址',
      description: '请输入机构描述',
      parentId: '请在左边树结构选择',
      category: '请输入机构类型',
      enCode: 'P请输入机构代码',
      innerPhone: '请输入内线电话',
      postalcode: '请输入邮编',
      email: '请输入机构电子邮件',
      foundedTime: '请选择成立时间',
      layer: '请输入机构楼层',
      address: '请输入机构详细地址'
    }
  },
  DeviceType: {
    table: {
      typeCode: '类型编码',
      typeName: '类型名称',
      typeName_en: '类型外文',
      enable: '是否启用',
      remark: '备注',
      parentId: "上级节点"
    },
    placeholder: {
      typeCode: '请输入类型编码',
      typeName: '请输入类型名称',
      typeName_en: '请输入类型外文',
      enable: '是否启用',
      remark: '请输入备注',
      parentId: "请在左边树节点选择"
    }
  },
  Device: {
    search: {
      name: '设备名称'
    },
    alert: {
      secretkey: '设备的安全码'
    },
    text: {
      random: '随机生成',
      setting: '设置',
      qrCode: '查看二维码',
      secretkey: '查看安全码',
      bind: '设备未绑定',
      unbind: '解除绑定',
      online: '在线',
      offline: '离线',
      enable: '启用',
      disable: '禁用',
      deleted: '已删除',
      notDelete: '使用中',
      operating: '操作',
      shutDown: '关机',
      changePwd: '更改密码',
      oldPwd: '旧密码',
      newPwd: '新密码',
      randomCode: '随机码'
    },
    table: {
      uid: '设备编号',
      name: '设备名称',
      imei: 'IMEI',
      type: '设备类型',
      sim_id: 'SIM卡号',
      qrCode: '设备二维码',
      address: '设备地址',
      secretkey: '安全码',
      bind: '设备绑定',
      online: '在线状态',
      enable: '是否启用',
      deleted: '是否删除',
      remark: '备注',
      productionDate: '生产日期',
      activationDate: '激活日期',
      creationTime: '创建时间'
    },
    placeholder: {
      uid: '请输入设备编号',
      type: '请在左边树结构选择',
      name: '请输入设备名称',
      imei: '请输入设备IMEI',
      secretkey: '请输入设备安全码',
      remark: '请输入备注',
      productionDate: '请选择生产日期',
      activationDate: '请选择激活日期',
      oldPwd: '请输入旧密码',
      newPwd: '请输入新密码'
    }
  },
  DeviceImport: {
    text: {
      importTips: '只能上传Excel文件，且不超过10M',
      errsize: '文件大小不能超过10M',
      errformat: '只能xls或xlsx格式的文件'
    },
    table: {
      row: '行号',
      position: '位置',
      reason: '原因'
    }
  },
  Logs: {
    search: {
      operateType: "操作类型",
      timeRang: "时间范围"
    },
    tips: {
      requestParameter: "请求参数",
      responseData: "响应数据"
    },
    table: {
      operateType: "操作类型",
      ipAddress: "请求者IP",
      hostPort: '服务端口',
      operator: "操作账号",
      resouceDesc: "模块说明",
      requestUrl: '请求地址',
      requestMethod: "请求方式",
      requestTime: "请求时间",
      responseTime: "响应时间",
      returnCode: "返回结果",
      isException: '请求异常',
      ascriptionSystem: "归属系统",
      headerAccept: "HeaderAccept",
      headerContentType: "HeaderContentType",
      browser: "Browser"
    }
  }
}
