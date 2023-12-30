import { defineComponent, onBeforeMount, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "ResizeObserver",
  props: {
    watchOnUpdated: Boolean
  },
  emits: [
    /**
     * @description resize 事件
     * @property {ResizeObserverEntry} entry 触发 resize 的 dom 元素
     */
    "resize"
  ],
  setup(props, { emit, slots }) {
    let resizeObserver: ResizeObserver | null = null;
    const createResizeObserver = (target: HTMLElement) => {
      if(!target) return
       resizeObserver = new ResizeObserver((entries) => {
        emit("resize", entries[0]);
      });
      resizeObserver.observe(target);
    };
    const destoryResizeObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null
      }
    }; 
    onBeforeMount(() => {
      createResizeObserver()
    })
    onBeforeUnmount(() => {
      if (resizeObserver) {
        destoryResizeObserver()
      }
    })

    return () => {
      return slots.default?.()
    }
  }
}) 
