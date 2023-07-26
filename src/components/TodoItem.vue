<template>
  <div style="margin-top: 20px;">
    <ul>
      <li v-for="(todo, index) in todos" :key="index" class="row justify-between">
        <div>
          <q-checkbox v-model="todo.isDone" color="cyan" @click="done(index)" />
          <label v-if="todo.isDone">
            <del>{{ todo.activity }}</del>
          </label>
          <label v-else class="form-check-label">{{ todo.activity }}</label>
        </div>
        <q-btn color="red" text-color="white" label="X" @click="deleteTODO(index)" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  setup(_props, { emit }) {
    const deleteTODO = (index) => {
      emit("deleteTodo", index);
    };

    const done = (index) => {
      emit("doneTodo", index);
    };

    return { deleteTODO, done };
  },
};
</script>
