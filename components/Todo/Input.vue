<script setup lang="ts">
import { useTodoStore } from "~~/store/todo";

const todoStore = useTodoStore();
const state = reactive({
  input: null,
  error: false,
});

const addItem = () => {
  if (!state.input?.length) return (state.error = true);
  todoStore.add(state.input);
  state.error = false;
  state.input = null;
};
</script>

<template>
  <div class="text-center w-max mx-auto py-5 md:px-14 rounded">
    <div class="flex w-max justify-center mx-auto">
      <input
        type="text"
        :class="[
          'outline-none border-2 transition-all rounded-sm focus:rounded p-1 px-3 mr-4 focus:border-blue-500 focus:border-2',
          { 'border-red-500 focus:border-red-500': state.error },
        ]"
        placeholder="type here"
        v-model="state.input"
        @keypress.enter="addItem"
      />
      <button
        class="bg-orange-400 rounded p-2 text-white hover:bg-orange-500"
        @click="addItem"
      >
        Add Todo
      </button>
    </div>
  </div>
</template>
