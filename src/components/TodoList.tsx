import { defineComponent, PropType } from 'vue'
import { Item } from './TodoItem'

export default defineComponent({
  name: 'TodoList',
  props: {
    dataSource: {
      type: Array as PropType<Array<Item>>,
      required: true,
    },
    activeCount: {
      type: Number,
      required: true,
    },
  },
  emits: ['toggle-all'],
  setup(props, { slots, emit }) {
    return () => (
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          checked={props.activeCount === 0}
          onInput={(event: Event) => {
            console.log('toggleAll')
            emit('toggle-all', (event.target as HTMLInputElement).checked)
          }}
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{props.dataSource.map(slots.default!)}</ul>
      </section>
    )
  },
})
