<script setup lang="ts">
import {ref, computed} from "vue";
import {useTaskStore} from "@/stores";
import Draggable from "vuedraggable";

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

const todoTasks = computed(() => taskStore.tasks.filter((task) => task.status === 'todo'));
const inProgressTasks = computed(() => taskStore.tasks.filter((task) => task.status === 'in-progress'));
const doneTasks = computed(() => taskStore.tasks.filter((task) => task.status === 'done'));

const removeTask = (id: number) => {
  taskStore.removeTask(id);
};

const onDrop = (event: any, newStatus: "todo" | "in-progress" | "done") => {
  if (event.moved || event.added) {
    const task = event.moved ? event.moved.element : event.added.element;
    if (task) {
      taskStore.updateTaskStatus(task.id, newStatus);
    }
  }
};
</script>

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
      <Draggable
        :list="todoTasks"
        :animation="300"
        group="tasks"
        item-key="id"
        @change="onDrop($event, 'todo')"
        class="tasks__items"
      >
        <template #item="{ element }">
          <li>
            {{ element.title }} — {{ element.description }}
            <div class="tasks__buttons">
              <button @click="moveTask(element.id, 'in-progress')">➡️ В работу</button>
              <button @click="removeTask(element.id)">❌ Удалить</button>
            </div>
          </li>
        </template>
      </Draggable>
    </div>
    <div class="tasks__in-progress">
      <h2>🚧 В процессе</h2>
      <Draggable
        :list="inProgressTasks"
        :animation="300"
        group="tasks"
        item-key="id"
        @change="onDrop($event, 'in-progress')"
        class="tasks__items"
      >
        <template #item="{ element }">
          <li>
            {{ element.title }} - {{ element.description }}
            <div class="tasks__buttons">
              <button @click="moveTask(element.id, 'done')">✅ Готово</button>
              <button @click="moveTask(element.id, 'todo')">⬅️ Вернуть</button>
              <button @click="removeTask(element.id)">❌ Удалить</button>
            </div>
          </li>
        </template>
      </Draggable>
    </div>
    <div class="tasks__done">
      <h2>✅ Готово</h2>
      <Draggable
        :list="doneTasks"
        :animation="300"
        group="tasks"
        item-key="id"
        @change="onDrop($event, 'done')"
        class="tasks__items"
      >
        <template #item="{ element }">
          <li>
            {{ element.title }} - {{ element.description }}
            <div class="tasks__buttons">
              <button @click="moveTask(element.id, 'in-progress')">⬅️ Вернуть</button>
              <button @click="removeTask(element.id)">❌ Удалить</button>
            </div>
          </li>
        </template>
      </Draggable>
    </div>
  </div>
</template>

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

.tasks__items {
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

.tasks__list, .tasks__todos, .tasks__in-progress, .tasks__done {
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
