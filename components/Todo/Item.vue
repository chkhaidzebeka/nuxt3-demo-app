<script setup lang="ts">
import { useTodoStore } from "~~/store/todo";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  tag: {
    type: String,
    default: "li",
  },
});

const time = reactive({
  raw: props.item.updatedAt ?? props.item.createdAt,
  human: new Intl.DateTimeFormat("en", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
  }).format(props.item.updatedAt ?? props.item.createdAt),
});

const todoStore = useTodoStore();

const removeTodo = () => {
  todoStore.remove(props.item.id);
};

const toggleDone = () => {
  console.log("toggle update");
  todoStore.update(props.item.id, { done: !props.item.done });
};
</script>

<template>
  <component
    :is="props.tag"
    v-if="item"
    :class="[
      'todo__item mb-4 border-b flex justify-between mx-auto items-center p-2',
      { 'bg-green-200': item.done },
    ]"
  >
    <div class="text-left overflow-hidden text-ellipsis whitespace-nowrap">
      <h3
        :class="['truncate', { 'line-through': item.done }]"
        :title="item.title"
      >
        {{ item.title }}
      </h3>
      <time class="italic text-sm" :datetime="time.raw">{{ time.human }}</time>
    </div>

    <div class="flex">
      <button class="hover:scale-105" @click="removeTodo">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <button class="hover:scale-105" @click="toggleDone">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </button>
    </div>
  </component>
</template>
