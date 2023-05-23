// 枚举类型接口
interface EnumArrayObj {
  value: number | string
  label: string
}

// 提取对象属性类型
type GetObjType<T extends Record<string, any>, K extends keyof T> = T extends {
  [key in K]: infer R
}
  ? R
  : never

/** 将数组中所有对象的 vlaue 转换为联合类型 */
export type GetObjValuesType<Arr extends readonly Record<string, any>[]> = Arr extends readonly [
  infer First,
  ...infer Rest
]
  ?
      | GetObjType<First & Record<string, any>, 'value'>
      | GetObjValuesType<Rest & Record<string, any>[]>
  : never

/** 将数组中所有对象的 label 转换为联合类型 */
export type GetObjLabelsType<Arr extends readonly Record<string, any>[]> = Arr extends readonly [
  infer First,
  ...infer Rest
]
  ?
      | GetObjType<First & Record<string, any>, 'label'>
      | GetObjLabelsType<Rest & Record<string, any>[]>
  : never

// 枚举数组扩展类
class EnumArray<T extends readonly EnumArrayObj[]> extends Array<EnumArrayObj> {
  constructor(list: T) {
    super(...list)
  }

  /** 根据值获取标签 */
  getLabelByValue(value: GetObjValuesType<T>) {
    return this.find((item) => item.value === value)?.label || '-'
  }

  /** 根据标签获取值 */
  getValueByLabel(label: GetObjLabelsType<T>) {
    return this.find((item) => item.label === label)?.value || '-'
  }

  /** 根据值获取对应的枚举对象 */
  getCorrespondEnumObjByValue(value: GetObjValuesType<T>) {
    return this.find((item) => item.value === value)
  }
}

// 创建枚举的扩展类
function createEnum<T extends readonly EnumArrayObj[]>(enums: T) {
  return Object.freeze(new EnumArray(enums))
}

// 获取枚举数组value的联合类型
type GetEnumArrayType<T> = T extends Readonly<EnumArray<infer P>> ? GetObjValuesType<P> : never

// 创建性别枚举
export const sexEnum = createEnum([
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
] as const)

