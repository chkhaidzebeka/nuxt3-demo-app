<template>
  <div class="min-h-screen bg-slate-50">
    <section class="text-center py-10">
      <h1 class="text-4xl font-bold text-gray-700">What are we doing today</h1>
    </section>

    <section class="md:w-8/12 mx-auto lg:w-6/12 p-4 rounded-lg max-w-md">
      <TodoInput />
      <TodoList />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/store/todo";

const todoStore = useTodoStore();
</script>
