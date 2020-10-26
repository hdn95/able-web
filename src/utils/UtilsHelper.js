/**
 *@date: 2018-09-27 11:23:23
 *@desc: 字符串替换
 */
export function StringReplace (input, start, end, flag = '*') {
  if (input === null || input.length <= 0) {
    return ""
  }

  const regexp = eval(`/^(.{${start}})(.{${end}})(.*)$/`)

  return input.replace(regexp, `$1${flag}${flag}${flag}${flag}$3`)
}

/**
 *@date: 2018-09-27 11:23:23
 *@desc: 标准时间格式化
 */
export function formatDate (v, format) {
  if (!v) return ""
  var d = v

  if (typeof v === 'string') {
    if (v.indexOf("/Date(") > -1) d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10))
    else d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]))
  }
  var o = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    "S": d.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
    }
  }
  return format
}

/**
 *@date: 2018-10-22 11:00:25
 *@desc: 时间获取时分秒
 */
export function getHmsDate (v) {
  if (!v) return ""
  let dt = new Date(v)

  let h = dt.getHours()
  let m = dt.getMinutes()
  let s = dt.getSeconds()

  if (h < 10) {
    h = `0${h}`
  }

  if (m < 10) {
    m = `0${m}`
  }

  if (s < 10) {
    s = `0${s}`
  }

  return `${h}:${m}:${s}`
}

/**
 *@date: 2018-09-27 11:23:23
 *@desc: 获取菜单Json树结构，用于左侧菜单展示
 */
export function GetMenusJsonTree (jsonList, parentId) {
  const retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {

      const newNode = {
        parentId: item.parentId,
        id: item.id,
        text: item.text,
        value: item.value,
        checkstate: item.checkstate,
        showcheck: item.showcheck,
        isexpand: item.isexpand,
        complete: item.complete,
        hasChildren: item.hasChildren,
        img: item.img,
        isDisplay: item.isDisplay,
        cssName: item.cssName,
        title: item.title,
        attribute: item.attribute,
        attributeValue: item.attributeValue,
        attributeA: item.attributeA,
        attributeValueA: item.attributeValueA,
        attributeB: item.attributeB,
        attributeValueB: item.attributeValueB,
        attributeC: item.attributeC,
        attributeValueC: item.attributeValueC,
        childNodes: GetMenusJsonTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-09-27 11:23:23
 *@desc: 获取资源Json树结构 用于修改、新增时的上级选择
 */
export function GetResourcesJsonTree (jsonList, parentId, needFun) {
  const retArray = []

  jsonList.forEach((item) => {
    if (needFun) {
      if (item.parentId === parentId) {
        const newNode = {
          parentId: item.parentId,
          id: item.id,
          description: item.description,
          resourceUrl: item.resourceUrl,
          reuqestMethod: item.reuqestMethod,
          resourceType: item.resourceType,
          owner: item.owner,
          icon: item.icon,
          jsEvent: item.jsEvent,
          childNodes: GetResourcesJsonTree(jsonList, item.id, needFun),
          disabled: item.resourceType === 999,
          parentName: item.parentName
        }

        retArray.push(newNode)
      }
    } else {
      if (item.parentId === parentId && (item.resourceType !== 300 && item.resourceType !== 999)) {
        const newNode = {
          parentId: item.parentId,
          id: item.id,
          description: item.description,
          resourceUrl: item.resourceUrl,
          reuqestMethod: item.reuqestMethod,
          resourceType: item.resourceType,
          owner: item.owner,
          icon: item.icon,
          jsEvent: item.jsEvent,
          childNodes: GetResourcesJsonTree(jsonList, item.id, needFun),
          parentName: item.parentName
        }

        retArray.push(newNode)
      }
    }
  })

  return retArray
}

/**
 *@date: 2018-09-27 11:23:23
 *@desc: 获取机构Json树结构 用于修改、新增时的上级选择
 */
export function GetOrganizesJsonTree (jsonList, parentId) {
  const retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {

      const newNode = {
        address: item.address,
        businessScope: item.businessScope,
        category: item.category,
        cityId: item.cityId,
        countyId: item.countyId,
        description: item.description,
        email: item.email,
        enCode: item.enCode,
        fax: item.fax,
        foundedTime: item.foundedTime,
        fullName: item.fullName,
        id: item.id,
        innerPhone: item.innerPhone,
        layer: item.layer,
        manager: item.manager,
        managerId: item.managerId,
        nature: item.nature,
        outerPhone: item.outerPhone,
        parentId: item.innerPhone,
        postalcode: item.layer,
        provinceId: item.manager,
        shortName: item.managerId,
        sortCode: item.nature,
        webAddress: item.outerPhone,

        childNodes: GetOrganizesJsonTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-09-30 08:55:50
 *@desc: 获取部门Json树结构 用于修改、新增时的上级选择
 */
export function GetDepartmentsJsonTree (jsonList, parentId) {
  const retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {

      const newNode = {
        email: item.email,
        enCode: item.enCode,
        fax: item.fax,
        fullName: item.fullName,
        id: item.id,
        innerPhone: item.innerPhone,
        layer: item.layer,
        manager: item.manager,
        managerId: item.managerId,
        nature: item.nature,
        organizeId: item.organizeId,
        outerPhone: item.outerPhone,
        parentId: item.parentId,
        shortName: item.shortName,

        childNodes: GetDepartmentsJsonTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-09-12 14:11:56
 *@desc: 获取字典Json树结构
 */
export function GetDictionaryJsonTree (jsonList, parentId) {
  const retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {

      const newNode = {
        parentId: item.parentId,
        itemCode: item.itemCode,
        itemName: item.itemName,
        isTree: item.isTree,
        isNav: item.isNav,
        remark: item.remark,
        id: item.id,
        deleteMark: item.deleteMark,
        enabledMark: item.enabledMark,
        childNodes: GetDictionaryJsonTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-09-19 10:24:45
 *@desc: 获取行政区域Json树结构
 */
export function GetAreaJsonTree (jsonList, parentId) {
  const retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {

      const newNode = {
        parentId: item.parentId,
        areaNumber: item.areaNumber,
        areaName: item.areaName,
        ascriptionSystem: item.ascriptionSystem,
        level: item.level,
        remarks: item.remarks,
        id: item.id,
        shortSpell: item.shortSpell,
        deleteMark: item.deleteMark,
        enabledMark: item.enabledMark,
        childNodes: GetAreaJsonTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-09-26 15:46:32
 *@desc: 获取设备类型Json树结构
 */
export function GetDeviceTypeJsonTree (jsonList, parentId) {
  const retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {

      const newNode = {
        parentId: item.parentId,
        typeName: item.typeName,
        typeCode: item.typeCode,
        ascriptionSystem: item.ascriptionSystem,
        typeName_en: item.typeName_en,
        remark: item.remark,
        id: item.id,
        deleteMark: item.deleteMark,
        enabledMark: item.enabledMark,
        childNodes: GetDeviceTypeJsonTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-11-01 16:06:39
 *@desc: 获取设备树结构（包括设备类型、设备）
 */
export function GetDevicesTree (jsonList, parentId) {
  let retArray = []

  jsonList.forEach((item) => {
    if (item.parentId === parentId) {
      const newNode = {
        code: item.code,
        parentId: item.parentId,
        sort: item.sort,
        uName: item.uName,
        uName_en: item.uName_en,
        lng: item.lng,
        lat: item.lat,
        id: item.id,
        deviceTypeId: item.deviceTypeId,
        description: item.description,
        childNodes: GetDevicesTree(jsonList, item.id)
      }

      retArray.push(newNode)
    }
  })

  return retArray
}

/**
 *@date: 2018-09-27 11:23:23
 *@desc: 获取URL所有参数
 */
export function ParseQueryString (url) {
  let obj = {}

  let start = url.indexOf("?") + 1
  let str = url.substr(start)
  let arr = str.split("&")

  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split("=")
    obj[arr2[0]] = arr2[1]
  }

  return obj
}
