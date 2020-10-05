import { defineComponent, reactive } from 'vue'
import TodoFooter from './components/TodoFooter'
import TodoList from './components/TodoList'
import TodoItem, { Item } from './components/TodoItem'
import TodoHeader from './components/TodoHeader'
import { v4 as uuid } from 'uuid'

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      dataSource: [
        { id: uuid(), value: 'one', checked: true },
        { id: uuid(), value: 'two', checked: false },
        { id: uuid(), value: 'three', checked: false },
      ],
    })

    return () => (
      <div>
        <section class="todoapp">
          <TodoHeader></TodoHeader>
          <TodoList
            dataSource={state.dataSource}
            v-slots={{
              default: (item: Item) => (
                <TodoItem id={item.id} value={item.value} checked={item.checked} key={item.id} />
              ),
            }}
          ></TodoList>
          <TodoFooter></TodoFooter>
        </section>
        <footer class="info">
          <p>Double-click to edit a todo</p>
          <p>
            Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
          </p>
          <p>
            Created by <a href="http://todomvc.com">you</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    )
  },
})
