import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoHeader',
  setup() {
    return () => (
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus={true} />
      </header>
    )
  },
})
