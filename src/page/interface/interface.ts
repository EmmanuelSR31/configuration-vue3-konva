export interface IStringArr {
  arr: string[]
}
export interface IAnyArr {
  arr: any[]
}
export interface IUploadResData {
  ossId: string,
  relativePath: string,
  fileName: string,
  aliyunOssPath?: string
}
export interface IUploadArr {
  arr: IUploadResData[]
}
export interface ITableParams {
  row: any,
  index: number,
  column: any[],
  render: any
}
export interface ITableSearch {
  name: string,
  text: string,
  type: string,
  defaultValue?: any,
  selectData?: any[],
  valueName?: string,
  textName?: string,
  onChange?: boolean,
  changeAjax?: any,
  startDateText?: string,
  endDateText?: string,
  showTypeSelect?: boolean,
  width?: string
}
export interface ITableSearchArr {
  arr: ITableSearch[]
}
export interface IInterfaceData {
  data: any,
  code: number,
  msg: string
}
export interface IBreadcrumb {
  title: string,
  pid: string,
  perId: string
}
export interface IMenu {
  menuStructName: string,
  menuStructPid: string,
  menuStructId: string,
  menuStructIcon: string,
  menuStructUrl: string,
  children?: any[]
}
export interface IDictionaryCategory {
  classificationType: number
}
export interface IDictionary {
  classificationId: number
}
export interface IHierarchicalDictionary {
  classificationId: number,
  parentId: number,
  dictId: number
}
export interface IDepartment {
  deptId: string,
  title: string,
  children: any[]
}
export interface IPosition {
  position: string,
  positionName: string
}
