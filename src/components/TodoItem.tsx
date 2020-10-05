import { defineComponent, onMounted, reactive, nextTick, ref } from 'vue'
import { ENTER_KEY, ESCAPE_KEY } from '@/constants'

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
  },
  emits: ['save-item', 'toggle-item', 'destroy-item'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>()

    const state = reactive({
      localValue: '',
      isEditing: false,
    })

    onMounted(() => (state.localValue = props.value))

    const handleDoubleClick = async () => {
      console.log('dbclick')
      state.isEditing = true
      await nextTick()
      if (inputRef.value) {
        inputRef.value.focus()
        inputRef.value.setSelectionRange(state.localValue.length, state.localValue.length)
      }
    }

    const handleBlur = (event: FocusEvent) => {
      console.log('blur', event)
      state.isEditing = false
      emit('save-item', props.id, state.localValue.trim())
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // 退出编辑模式，保存内容
      if (event.keyCode === ENTER_KEY) {
        state.isEditing = false
        emit('save-item', props.id, state.localValue.trim())
      }
      // 退出编辑模式，回滚内容
      if (event.keyCode === ESCAPE_KEY) {
        state.isEditing = false
        state.localValue = props.value
      }
    }

    return () => (
      <li
        class={{
          completed: !state.isEditing && props.checked,
          editing: state.isEditing,
        }}
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            checked={props.checked}
            onInput={(event: Event) =>
              emit('toggle-item', props.id, (event.target as HTMLInputElement).checked)
            }
          />
          <label onDblclick={handleDoubleClick}>{state.localValue}</label>
          <button class="destroy" onClick={() => emit('destroy-item', props.id)}></button>
        </div>
        <input
          class="edit"
          ref={inputRef}
          value={state.localValue}
          onBlur={(event: FocusEvent) => handleBlur(event)}
          onInput={(event: Event) => (state.localValue = (event.target as HTMLInputElement).value)}
          onKeydown={(event: KeyboardEvent) => handleKeyDown(event)}
        />
      </li>
    )
  },
})
