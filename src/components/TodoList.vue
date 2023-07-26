<template>
  <div class="column flex-center">
    <q-card class="my-card bg-white text-black q-pa-md q-gutter-md q-radius-md" style="width: 600px;">
      <q-card-section>
        <h3>Quasar To-dos</h3>
      </q-card-section>

      <q-card-section class="row">
        <q-input class="col-8" standout="bg-blue text-white" v-model="todo" label="New To Do" @keyup.enter="add" />
        <q-btn class="col-2" color="white" text-color="black" label="✔" @click="add" />
      </q-card-section>

      <q-card-section>
        <Todoitem :todos="list" @deleteTodo="deleteTodo" @doneTodo="doneTodo" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <h6>Done ({{ totalTODO }})</h6>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Todoitem from "./TodoItem.vue";
import { ref, reactive, toRefs, onMounted, computed } from "vue";

export default {
  components: { Todoitem },
  setup() {
    const todo = ref("");
    const todos = reactive({
      list: [],
    });

    onMounted(() => {
      const items = localStorage.getItem("todos");
      todos.list = items ? JSON.parse(items) : [];
    });

    const totalTODO = computed(() => {
      return todos.list.filter((list) => list.isDone == true).length;
    });

    const add = () => {
      todos.list.unshift({
        activity: todo.value,
        isDone: false,
      });
      todo.value = "";
      saveToLocalStorage();
    };

    const deleteTodo = (todoIndex) => {
      todos.list = todos.list.filter((item, index) => {
        if (index != todoIndex) {
          return item;
        }
      });
      saveToLocalStorage();
    };

    const doneTodo = (todoIndex) => {
      todos.list = todos.list.filter((item, index) => {
        if (index == todoIndex) {
          item.isDone = !item.isDone;
        }

        return item;
      });
      saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
      localStorage.setItem("todos", JSON.stringify(todos.list));
    };

    return { todo, ...toRefs(todos), totalTODO, add, deleteTodo, doneTodo };
  },
};
</script>


<!-- <script setup>
  import Todoitem from "./Todoitem.vue";
  import {ref, reactive, onMounted, computed, toRefs} from "vue";

  const todo = ref("");
  const todos = reactive({
    list: [],
  });

  onMounted(() => {
      const items = localStorage.getItem("todos");
      todos.list = items ? JSON.parse(items) : [];
  });

  const totalTODO = computed(() => {
      return todos.list.filter((list) => list.isDone == true).length;
  });

  function add(){

    todos.list.unshift({
      activity: todo.value,
      isDone: false,
    })

    todo.value = "";
    saveToLocalStorage();
  }

  function doneTodo(todoIndex){
    todos.list = todos.list.filter((item, index) => {

      if (index == todoIndex) {
        item.isDone = !item.isDone;
      }

      return item;
    });

    saveToLocalStorage();
  }

  function saveToLocalStorage(){
    localStorage.setItem("todos", JSON.stringify(todos.list));
  }
</script> -->
