import { VNode, ref } from "vue"

interface SlotChildren {
  value?: VNode[]
}

export const useFirstElement = () => {
  // only save VNodes reference, not use ref
  const children: SlotChildren = {}
  const firstElement = ref<HTMLElement>()
}
