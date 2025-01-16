import { defineStore } from "pinia";

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    nextId: 1,
  }),

  actions: {
    addTask(title: string, description: string) {
      const newTask: Task = {
        id: this.nextId++,
        title,
        description,
        status: 'todo',
      };
      this.tasks.push(newTask);
    },

    removeTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    updateTaskStatus(id: number, status: 'todo' | 'in-progress' | 'done') {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.status = status;
      }
    }
  }
})

