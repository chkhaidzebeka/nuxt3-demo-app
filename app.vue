<template>
  <div class="min-h-screen bg-slate-50">
    <main class="max-w-[1400px] mx-auto py-5">
      <Todo />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/store/todo";

const todoStore = useTodoStore();
</script>
