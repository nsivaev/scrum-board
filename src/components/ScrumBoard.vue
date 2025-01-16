<template>
  <div class="scrum-board">
    <div class="tasks__list">
      <h2>📋 Добавить задачу</h2>
      <input v-model="newTitle" placeholder="Название задачи"/>
      <input v-model="newDescription" placeholder="Описание задачи"/>
      <button @click="addNewTask">✏️ Добавить задачу</button>
    </div>

    <div class="tasks__todos">
      <h2>🕒 Нужно сделать</h2>
      <ul>
        <li v-for="task in todoTasks" :key="task.id">
          {{ task.title }} — {{ task.description }}
          <div class="tasks__buttons">
            <button @click="moveTask(task.id, 'in-progress')">➡️ В работу</button>
            <button @click="removeTask(task.id)">❌ Удалить</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="tasks__in-progress">
      <h2>🚧 В процессе</h2>
      <ul>
        <li v-for="task in inProgressTasks" :key="task.id">
          {{ task.title }} - {{ task.description }}
          <div class="tasks__buttons">
            <button @click="moveTask(task.id, 'done')">✅ Завершить</button>
            <button @click="moveTask(task.id, 'todo')">⬅️ Вернуть</button>
            <button @click="removeTask(task.id)">❌ Удалить</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="tasks__done">
      <h2>✅ Готово</h2>
      <ul>
        <li v-for="task in doneTasks" :key="task.id">
          {{ task.title }} - {{ task.description }}
          <div class="tasks__buttons">
            <button @click="moveTask(task.id, 'in-progress')">⬅️ Вернуть</button>
            <button @click="removeTask(task.id)">❌ Удалить</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import {useTaskStore} from "@/stores";

const taskStore = useTaskStore();

const newTitle = ref('');
const newDescription = ref('');

const addNewTask = () => {
  if (newTitle.value.trim() && newDescription.value.trim()) {
    taskStore.addTask(newTitle.value, newDescription.value);
    newTitle.value = '';
    newDescription.value = '';
  }
};

const moveTask = (id: number, status: 'todo' | 'in-progress' | 'done') => {
  taskStore.updateTaskStatus(id, status);
};

const todoTasks = computed(() =>
  taskStore.tasks.filter((task) => task.status === 'todo')
);

const inProgressTasks = computed(() =>
  taskStore.tasks.filter((task) => task.status === 'in-progress')
);

const doneTasks = computed(() =>
  taskStore.tasks.filter((task) => task.status === 'done')
);

const removeTask = (id: number) => {
  taskStore.removeTask(id);
};
</script>

<style scoped>
input {
  padding-inline: 10px;
  color: #ffffff;
  border-radius: 10px;
  height: 40px;
  max-width: 400px;
  border: 1px solid #ffffff;
  background-color: #181818;
  transition: 0.3s ease;

  &:hover {
    border-color: #b2b2b2;
    background-color: #ffffff;
    color: #181818;
  }
}

button {
  padding-inline: 15px;
  border-radius: 10px;
  color: #ffffff;
  height: 40px;
  max-width: 400px;
  border: 1px solid #ffffff;
  background-color: #181818;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    border-color: #b2b2b2;
    background-color: #ffffff;
    color: #181818;
  }
}

ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

li {
  display: flex;
  flex-direction: column;
  border: 2px solid #b2b2b2;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}

.scrum-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 40px;
}

.tasks__list,.tasks__todos,.tasks__in-progress,.tasks__done {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tasks__buttons {
  display: flex;
  gap: 10px;
  max-width: 400px;

  button {
    width: 100%;
  }
}
</style>
