<script setup lang="ts">
defineProps<{
  visible: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  send: [text: string]
}>()

// 26 个字母键盘布局
const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

// 点击字母键，直接发送
function handleKey(key: string) {
  emit('send', key.toLowerCase())
}

function handleClose() {
  emit('update:visible', false)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/30 flex items-end justify-center z-50"
      @click.self="handleClose"
    >
      <div class="bg-neu-bg rounded-t-2xl p-4 w-full max-w-sm">
        <!-- 标题 -->
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-600 text-sm font-medium">点击字母直接发送</span>
          <button
            class="w-8 h-8 rounded-full neu-btn-sm flex items-center justify-center text-gray-400 hover:text-gray-600"
            @click="handleClose"
          >
            ✕
          </button>
        </div>

        <!-- 键盘 -->
        <div class="space-y-2">
          <div
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="flex justify-center gap-1"
            :class="{ 'px-4': rowIndex === 1, 'px-8': rowIndex === 2 }"
          >
            <button
              v-for="key in row"
              :key="key"
              class="w-8 h-10 rounded-lg neu-btn-sm text-gray-600 text-sm font-medium hover:text-blue-500 active:text-blue-600"
              :disabled="loading"
              @click="handleKey(key)"
            >
              {{ key }}
            </button>
          </div>
        </div>

        <!-- 空格键 -->
        <div class="flex justify-center mt-2">
          <button
            class="w-40 h-10 rounded-lg neu-btn-sm text-gray-500 text-sm"
            :disabled="loading"
            @click="emit('send', ' ')"
          >
            空格
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
