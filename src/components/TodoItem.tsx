import { defineComponent } from 'vue'

export interface Item {
  id: string
  value: string
  checked: boolean
}

export default defineComponent({
  name: 'TodoItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <li
        class={{
          completed: true,
          editing: false,
        }}
      >
        <div class="view">
          <input class="toggle" type="checkbox" checked={props.checked} />
          <label>{props.value}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value={props.value} />
      </li>
    )
  },
})
