import { defineComponent, PropType } from 'vue'
import { Item } from './TodoItem'

export default defineComponent({
  name: 'TodoList',
  props: {
    dataSource: {
      type: Array as PropType<Array<Item>>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => (
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{props.dataSource.map(slots.default!)}</ul>
      </section>
    )
  },
})
