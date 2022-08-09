<script setup lang="ts">
import { useTodoStore } from "~~/store/todo";

const todoStore = useTodoStore();
</script>

<template>
  <ul class="mx-auto text-center" v-if="todoStore.todos?.length">
    <TodoItem
      v-for="(item, index) in todoStore.todos"
      :key="index"
      :item="item"
    />
  </ul>
  <p class="text-center text-red-600 italic" v-else>No item so far</p>
</template>
