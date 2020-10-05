import { defineComponent } from 'vue'
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from '@/constants'

export default defineComponent({
  name: 'TodoFooter',
  props: {
    activeCount: {
      type: Number,
      required: true,
    },
    completedCount: {
      type: Number,
      required: true,
    },
    nowShowing: {
      type: String,
      required: true,
    },
  },
  emits: ['set-now-showing', 'clear-completed'],
  setup(props, { emit }) {
    const pluralize = (word: string, count: number) => word + (count === 1 ? '' : 's')

    return () => (
      <footer class="footer">
        <span class="todo-count">
          <strong>{props.activeCount}</strong> {pluralize('item', props.activeCount)} left
        </span>
        <ul class="filters">
          <li>
            <a
              class={{ selected: props.nowShowing === ALL_TODOS }}
              onClick={() => emit('set-now-showing', ALL_TODOS)}
              href="#/"
            >
              All
            </a>
          </li>
          <li>
            <a
              class={{ selected: props.nowShowing === ACTIVE_TODOS }}
              onClick={() => emit('set-now-showing', ACTIVE_TODOS)}
              href="#/active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              class={{ selected: props.nowShowing === COMPLETED_TODOS }}
              onClick={() => emit('set-now-showing', COMPLETED_TODOS)}
              href="#/completed"
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show={props.completedCount > 0}
          onClick={() => emit('clear-completed')}
        >
          Clear completed
        </button>
      </footer>
    )
  },
})
