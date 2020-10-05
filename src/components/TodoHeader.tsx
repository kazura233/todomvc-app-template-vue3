import { defineComponent, reactive } from 'vue'
import { ENTER_KEY } from '@/constants'

export default defineComponent({
  name: 'TodoHeader',
  emits: ['add-item'],
  setup(_, { emit }) {
    const state = reactive({
      value: '',
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === ENTER_KEY) {
        emit('add-item', state.value.trim())
        state.value = ''
        console.log('add-item')
      }
    }

    return () => (
      <header class="header">
        <h1>todos</h1>
        <input
          value={state.value}
          onInput={(event: Event) => (state.value = (event.target as HTMLInputElement).value)}
          onKeydown={(event: KeyboardEvent) => handleKeyDown(event)}
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus={true}
        />
      </header>
    )
  },
})
