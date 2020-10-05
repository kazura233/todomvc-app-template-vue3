import { defineComponent, reactive, computed, watch, toRaw } from 'vue'
import TodoFooter from './components/TodoFooter'
import TodoList from './components/TodoList'
import TodoItem, { Item } from './components/TodoItem'
import TodoHeader from './components/TodoHeader'
import { v4 as uuid } from 'uuid'
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, STORE_NAMESPACE } from './constants'

const routerMap = new Map([
  ['/', ALL_TODOS],
  ['/active', ACTIVE_TODOS],
  ['/completed', COMPLETED_TODOS],
])

type StateType = {
  nowShowing: string
  dataSource: Array<Item>
}

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive<StateType>({
      /**
       * 当前页面所展示的类目
       */
      nowShowing: routerMap.get(window.location.hash.slice(1)) || ALL_TODOS,

      /**
       * 所有数据
       */
      dataSource: JSON.parse(localStorage.getItem(STORE_NAMESPACE) || '[]') as Array<Item>,
    })

    /**
     * 当前要展示的数据
     */
    const shownDataSource = computed(() =>
      state.dataSource.filter((item) => {
        switch (state.nowShowing) {
          case ACTIVE_TODOS:
            return !item.checked
          case COMPLETED_TODOS:
            return item.checked
          default:
            return true
        }
      })
    )

    /**
     * 未完成数量
     */
    const activeCount = computed(() =>
      state.dataSource.reduce((count, item) => (item.checked ? count : count + 1), 0)
    )

    /**
     * 数据发生变化，自动保存。
     */
    watch(
      () => state.dataSource,
      (dataSource) => localStorage.setItem(STORE_NAMESPACE, JSON.stringify(toRaw(dataSource)))
    )

    /**
     * 增加
     * @param value
     */
    const addItem = (value: string) => {
      console.log(value)
      state.dataSource = state.dataSource.concat({
        id: uuid(),
        value,
        checked: false,
      })
    }

    /**
     * 更新
     * @param id
     * @param cover
     */
    const changeItem = (id: string, cover: Partial<Item>) => {
      state.dataSource = state.dataSource.map((item) =>
        item.id !== id ? item : { ...item, ...cover }
      )
    }

    /**
     * 保存
     * @param id
     * @param value
     */
    const save = (id: string, value: string) => {
      changeItem(id, { value })
    }

    /**
     * 切换
     * @param id
     * @param checked
     */
    const toggle = (id: string, checked: boolean) => {
      changeItem(id, { checked })
    }

    /**
     * 全部切换
     * @param checked
     */
    const toggleAll = (checked: boolean) => {
      console.log('toggleAll')
      state.dataSource = state.dataSource.map((item) => ({ ...item, checked }))
    }

    /**
     * 销毁
     * @param id
     */
    const destroy = (id: string) => {
      state.dataSource = state.dataSource.filter((item) => item.id !== id)
    }

    /**
     * 清除已经完成
     */
    const clearCompleted = () => {
      state.dataSource = state.dataSource.filter(({ checked }) => !checked)
    }

    return () => (
      <div>
        <section class="todoapp">
          <TodoHeader onAdd-item={addItem}></TodoHeader>
          <TodoList
            dataSource={shownDataSource.value}
            onToggle-all={toggleAll}
            activeCount={activeCount.value}
            v-slots={{
              default: (item: Item) => (
                <TodoItem
                  id={item.id}
                  value={item.value}
                  checked={item.checked}
                  key={item.id}
                  onSave-item={save}
                  onToggle-item={toggle}
                  onDestroy-item={destroy}
                />
              ),
            }}
          ></TodoList>
          <TodoFooter
            nowShowing={state.nowShowing}
            onSet-now-showing={(nowShowing: string) => (state.nowShowing = nowShowing)}
            activeCount={activeCount.value}
            completedCount={state.dataSource.length - activeCount.value}
            onClear-completed={clearCompleted}
          ></TodoFooter>
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
