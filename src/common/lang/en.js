module.exports = {
  SystemName: 'AbleMotor Information Platform',
  Copyright: {
    fullName: 'CopyRight © 2018 Gosafenet Information Technology (Changsha) Co., Ltd.',
    shortName: 'Gosafenet'
  },
  ErrorPage: {
    errText: 'Page not found or No access'
  },
  Home: {
    title: 'Home'
  },
  Authorization: {
    auzResourceforRoleTitle: 'Resource for Authoritizaton of Role',
    auzResourceforUserTitle: 'Resource Authoritizaton of User',
    roleAuzTitle: 'Authoritizaton of Role'
  },
  Language: {
    btn: 'Language Switch',
    confirm: {
      text: 'Do you want to switch current language'
    }
  },
  WebSocket: {
    tips: {
      notSupport: 'Your browser does not support WebSocket'
    }
  },
  DefaultButton: {
    previousPage: "Prev",
    nextPage: "Next",
    refreshButtonText: "Refresh",
    searchButtonText: "Search",
    saveButtonText: "Save",
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    deleteButtonText: 'Delete',
    addButtonText: 'Add',
    editButtonText: 'Edit',
    detailButtonText: "Detail",
    resourceAuz: 'Authoritizaton',
    roleAuz: 'Authoritizaton of Role',
    import: 'Import',
    export: 'Export',
    selectFile: 'Upload file(s) selected',
    reselect: 'Reselect'
  },
  SearchTips: {
    filter: "Filter",
    requestType: "Request Type",
    resourceType: "Resource Type",
    detailedData: "detailedData"
  },
  RquestType: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    import: 'IMPORT',
    export: 'EXPORT'
  },
  DefaultTips: {
    successText: 'Successfully',
    all: "All",
    searchPlaceholder: "Please enter a keyword search",
    editDataTitle: "Edit",
    addDataTitle: "Add",
    detailDataTitle: "Detail",
    importTitle: 'Import',
    template: 'Template',
    basicInformation: "Basic Info",
    location: 'Location',
    selectLocation: 'Select location in map',
    treeStruct: "Tree Struct",
    datasheets: "Datasheets",
    refreshData: "Refresh Data",
    currentLocation: "Location",
    pendingSelectionTips: 'Please select the data of the operation',
    deletedConfirmTips: 'Do you want to delete?',
    overflowLimitedTips: 'Data selected is out of limits',
    saveSuccessText: 'Save Successfully',
    uploading: 'Uploading',
    startTime: 'Start time',
    endTime: 'End time',
    last10Minutes: 'Last 10 min',
    last30Minutes: 'Last 30 min',
    lastHour: "Last Hour",
    lastDay: "Last Day",
    today: 'Today',
    expand: 'Expand',
    collapse: 'Collapse',
    updateTime: 'Update Time'
  },
  belongTo:{
    department:'Higher Authorities',
    organ:'Mechanism'
  },
  MessageBox: {
    confirmTitle: 'System Tips'
  },
  LoginLog: {
    btn: "Login Log",
    table: {
      ipAddress: "IP Address",
      operatingTime: "Operating time"
    },
    tips: {
      tips: 'Tips:Only display last total 10'
    }
  },
  Login: {
    title: "System Login",
    loginBtn: "Login",
    clearBtn: "Clear",
    loginLoading: "Logging",
    rememberText: "Save Account",
    successText: "Login Successfully",
    loginName: "Login Name",
    loginNameTips: "Please enter your login name",
    loginPwd: "Login Password",
    loginPwdTips: "Please enter your login password"
  },
  LoginOutMessageBox: {
    btn: "Login Out",
    confirmButtonText: "Exit",
    cancelButtonText: 'Cancel',
    text: "Do you want to exit?",
    successText: "Exit Successfully"
  },
  RefreshCacheMessageBox: {
    btn: "Refresh Memory",
    confirmButtonText: "Refresh",
    cancelButtonText: 'Cancel',
    text: "Do you want to refresh cache?",
    successText: "Refresh Successfully"
  },
  ResourceType: {
    module: 'Module',
    page: 'Page',
    function: 'Function',
    other: 'Other'
  },
  Icon: {
    title: 'Select ICON'
  },
  Resource: {
    search: {
      owner: 'Owner',
      description: 'Description',
      url: 'URL'
    },
    table: {
      owner: 'Owner',
      description: 'Description',
      icon: 'ICON',
      cssName: 'CSSName',
      requestType: 'Request Type',
      resourceType: 'Resource Type',
      jsEvent: 'JS Event',
      url: 'URL',
      parentId: 'Parent Id',
      display: 'Whether Display or not',
      displayText: 'Whether display or not',
      parentModule: 'Parent Module'
    },
    placeholder: {
      owner: 'Please enter the module',
      description: 'Please enter a description',
      url: 'Please enter the URL',
      jsEvent: 'Please enter the JS event',
      parentId: 'Please make selection on the tree left',
      icon: 'Please select ICON',
      cssName: 'Please enter the CSSName'
    }
  },
  AreaManage: {
    table: {
      areaNumber: 'Zip Code',
      areaName: 'Name',
      shortSpell: 'Abbreviation',
      level: 'Class',
      enable: 'Enable',
      remark: 'Remark',
      parentId: 'Parent Id'
    },
    placeholder: {
      areaNumber: 'Please enter zip code',
      areaName: 'Please enter the name',
      shortSpell: 'Please enter an abbreviation',
      level: 'Please enter the class (0、1、2..)',
      remark: 'Please enter the remark',
      parentId: 'Please make selection on the tree left',
      enable: 'Enable'
    }
  },
  Dictionary: {
    search: {
      name: 'Name of Dictionary'
    },
    table: {
      name: 'Name of Dictionary',
      enable: 'Enable',
      remark: 'Remark',
      parentId: 'Parent Id',
      code: 'Code of Dictionary',
      setting: 'Setting'
    },
    placeholder: {
      name: 'Please enter the Name of Dictionary',
      parentId: 'Please make selection on the tree left',
      code: 'Please enter the Code of Dictionary',
      isTree: 'Is Tree',
      isNav: 'Is Nevigation',
      remark: 'Please enter the remark',
      enable: 'Enable'
    }
  },
  DictionaryDetail: {
    search: {
      projectName: "Project Name",
      projectValue: "Project Value",
      simpleSpelling: 'Project Abbreviation'
    },
    table: {
      projectName: "Project Name",
      projectValue: "Project Value",
      simpleSpelling: 'Project Abbreviation',
      enable: 'Enable',
      remark: 'Remark',
      parentId: 'Parent Id'
    },
    placeholder: {
      projectName: 'Please enter the project name',
      projectValue: 'Please enter the project value',
      simpleSpelling: 'Please enter the project abbreviation',
      remark: 'Please enter the remark',
      parentId: 'Please make the selection on the tree left',
      enable: 'Enable'
    }
  },
  Role: {
    category: {
      role: 'Role',
      post: 'Post',
      office: 'Position',
      workGroup: 'WorkGroup'
    },
    search: {
      roleName: 'Role Name',
      roleId: 'Role ID'
    },
    table: {
      category: 'Role Category',
      name: 'Role Name',
      code: 'Role Code',
      isPublic: 'IsPublic',
      expired: 'Expired'
    },
    placeholder: {
      category: 'Please select category',
      name: 'Please enter the name',
      code: 'Please enter the code',
      isPublic: 'IsPublic',
      expired: 'Empty means unauthoritized'
    }
  },
  User: {
    genderType: {
      male: 'Male',
      female: 'Female',
      other: 'Other'
    },
    search: {
      loginAccount: 'Login Account',
      realName: 'RealName',
      userId: 'User Id'
    },
    table: {
      enCode: 'Account',
      account: 'Login Account',
      gender: 'Gender',
      realName: 'RealName',
      mobile: 'Mobile',
      description: 'Description',
      password: 'Login PWD',
      loginType: 'Login Type',
      onLine: 'OnLine',
      ascriptionSystem: 'System Ascription',
      nickName: 'Nick Name',
      quickQuery: 'QuickQuery',
      simpleSpelling: 'Abbreviation',
      birthday: 'Birthday',
      telephone: 'Telephone',
      email: 'Email',
      QQ: 'QQ',
      MSN: 'MSN',
      weChat: 'WeChat'
    },
    placeholder: {
      onLine: 'Allow online login simultaneously',
      enCode: "Please enter the Account",
      account: "Please enter the login account",
      gender: "Gender",
      realName: "Please enter the realName",
      mobile: "Please enter the mobile number",
      description: "Please enter the description",
      password: "Please enter the password",
      loginType: "Please select loginType",
      ascriptionSystem: "Please enter the system ascription",
      nickName: "Please enter the nick name",
      editPwd: 'Default as not filled'
    }
  },
  Thresholds: {
    search: {
      name: 'Name'
    },
    table: {
      category: 'Category',
      enCode: 'Project Code',
      name: 'Project Name',
      suitable_Min: "Range Min",
      suitable_Max: "Range Max",
      warning_Min: "Alert Min",
      warning_Max: "Alert Max",
      standard_Min: "Standard Min",
      standard_Max: "Standard Max",
      unit: 'Unit',
      enable: 'Enable',
      remark: 'Remark'
    },
    placeholder: {
      category: 'Please select category',
      enCode: 'Please enter the project code',
      name: 'Please enter the project name',
      enable: 'Enable',
      unit: 'Please enter the unit',
      remark: 'Please enter the remark'
    }
  },
  ThresholdDetail: {
    search: {
      level_No: 'Level Name'
    },
    table: {
      level_No: 'Level Name',
      level_Desc: 'Level Description',
      level_Min: 'Level Min',
      level_Max: "Level Max",
      enable: 'Enable',
      remark: 'Remark',
      parentId: 'Category'
    },
    placeholder: {
      level_No: 'Please enter the level name',
      level_Desc: 'Please enter the level description',
      level_Min: 'Please enter the level min',
      level_Max: 'Please enter the level max',
      enable: 'Enable',
      remark: 'Please enter the remark',
      parentId: 'Please make selection on the tree left'
    }
  },
  Department: {
    search: {
      departmentName: 'Dept. Name',
      departmentID: 'Dept. ID',
      owner: 'Organization'
    },
    table: {
      id: "Dept ID",
      enCode: 'Dept Code',
      shortName: 'Abbreviation',
      fullName: 'Name',
      nature: 'Dept Category',
      outerPhone: 'External Phone',
      fax: 'Fax',
      manager: 'Responsible Persoonel',
      layer: 'Floor',
      parentId: 'Parent ID',
      owner: 'Organization',
      innerPhone: 'Internal Phone',
      email: 'Email'
    },
    placeholder: {
      enCode: 'Please enter the Dept Code',
      shortName: 'Please enter the Abbreviatioon',
      fullName: 'Please enter the Dept name',
      nature: 'Please enter the Dept Category',
      outerPhone: 'Please enter the External Phone',
      fax: 'Please enter the fax',
      layer: 'Please enter the Floor',
      parentId: 'Please make selection on the tree left',
      owner: 'Please enter select Organization',
      innerPhone: 'Please enter the Internal Phone',
      email: 'Please enter the email'
    }
  },
  Organize: {
    category: {
      group: 'Group',
      company: 'Company',
      branch: 'Branch',
      subsidiary: 'Sub-devision'
    },
    tips: {
      view: 'Official Website'
    },
    search: {
      organizeName: 'Organization Name',
      organizeID: 'Organization ID'
    },
    table: {
      shortName: 'Organization Abbreviation',
      fullName: 'Organization Name',
      nature: 'Organization Category',
      outerPhone: 'External Phone',
      fax: 'Fax',
      businessScope: 'Business Scope',
      webAddress: 'Website',
      description: 'Description',
      parentId: 'Parent Id',
      category: 'Category',
      enCode: 'Organization Code',
      innerPhone: 'Internal Phone',
      postalcode: 'Postal',
      email: 'Email',
      foundedTime: 'Date Founded',
      layer: 'Floor',
      address: 'Address'
    },
    placeholder: {
      shortName: 'Please enter the organization abbreviation',
      fullName: 'Please enter the organization name',
      nature: 'Please enter the category',
      outerPhone: 'Please enter the External Phone',
      fax: 'Please enter the fax',
      businessScope: 'Please enter the business scope',
      webAddress: 'Please enter the website',
      description: 'Please enter the organizaton description',
      parentId: 'Please make selectio on the tree left',
      category: 'Please select organization type',
      enCode: 'Please enter the organization code',
      innerPhone: 'Please enter the Internal Phone',
      postalcode: 'Please enter the postal',
      email: 'Please enter the email',
      foundedTime: 'Please select date founded',
      layer: 'Please enter the floor',
      address: 'Please enter the address'
    }
  },
  DeviceType: {
    table: {
      typeCode: 'Category Code',
      typeName: 'Category Name',
      typeName_en: 'Category Foriegn Name',
      enable: 'Enable',
      remark: 'Remark',
      parentId: "Parent Id"
    },
    placeholder: {
      typeCode: 'Please enter the category Code',
      typeName: 'Please enter the category name',
      typeName_en: 'Please enter the category foriegn name',
      enable: 'Enable',
      remark: 'Please enter the remark',
      parentId: "Please make selection on the tree left"
    }
  },
  Device: {
    search: {
      name: 'Device Name'
    },
    alert: {
      secretkey: 'Security Code'
    },
    text: {
      random: 'Random Generate',
      setting: 'Setting',
      qrCode: 'Exam 2D Barcode',
      secretkey: 'Exam Security code',
      bind: 'Device Connected',
      unbind: 'Device Disconnected',
      online: 'Online',
      offline: 'Offline',
      enable: 'Enable',
      disable: 'Disable',
      deleted: 'Deleted',
      notDelete: 'Using',
      operating: 'Operating',
      shutDown: 'ShutDown',
      changePwd: 'ChangePwd',
      oldPwd: 'OldPwd',
      newPwd: 'NewPwd',
      randomCode: 'RandomCode'
    },
    table: {
      uid: 'Device UID',
      name: 'Device Name',
      imei: 'Device IMEI',
      type: 'Device Type',
      sim_id: 'SIMCard',
      qrCode: 'Device 2D Barcode',
      address: 'Address',
      secretkey: 'Security Code',
      bind: 'Device Connected',
      online: 'Online',
      enable: 'Enable',
      deleted: 'Deleted',
      remark: 'Remark',
      productionDate: 'Production Date',
      activationDate: 'Activation Date',
      creationTime: 'Creation time'
    },
    placeholder: {
      uid: 'Please enter the device uid',
      type: 'Please make selectio on the tree left',
      name: 'Please enter the device name',
      imei: 'Please enter the device imei',
      secretkey: 'Please enter the device security code',
      remark: 'Please enter the remark',
      productionDate: 'Please select production date',
      activationDate: 'Please select activation date',
      oldPwd: 'Please enter the old Pwd',
      newPwd: 'Please enter the new Pwd'
    }
  },
  DeviceImport: {
    text: {
      importTips: 'Upload Excel file with upto 10M',
      errsize: 'File size cannot exceed 10M',
      errformat: 'Upload xls or xlsx suffix file only'
    },
    table: {
      row: 'Row Number',
      position: 'Position',
      reason: 'Reason'
    }
  },
  Logs: {
    search: {
      operateType: "OperateType",
      timeRang: "TimeRang"
    },
    tips: {
      requestParameter: "Request Parameter",
      responseData: "Response Data"
    },
    table: {
      operateType: "OperateType",
      ipAddress: "Requester IP",
      hostPort: 'Sevice Port',
      operator: "Operator",
      resouceDesc: "Module",
      requestUrl: 'Url',
      requestMethod: "Method",
      requestTime: "Request Time",
      responseTime: "Response Time",
      returnCode: "Return Code",
      isException: 'IsException',
      ascriptionSystem: "AscriptionSystem",
      headerAccept: "HeaderAccept",
      headerContentType: "HeaderContentType",
      browser: "Browser"
    }
  }
}
