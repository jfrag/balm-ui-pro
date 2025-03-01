<template>
  <div :class="className">
    <div class="mdc-dialog__container">
      <div class="mdc-dialog__surface">
        <h2 v-if="title" class="mdc-dialog__title">
          {{ title }}
        </h2>
        <div
          :class="{
            'mdc-dialog__content': true,
            'mdc-dialog__content--without-actions': !hasActions
          }"
        >
          <slot></slot>
        </div>
        <footer v-if="hasActions" class="mdc-dialog__actions">
          <slot name="actions"></slot>
        </footer>
      </div>
    </div>
    <div class="mdc-dialog__scrim" @click="handleClose"></div>
  </div>
</template>

<script>
// For $dialog
export default {
  name: 'MdcDialog',
  customOptions: {}
};
</script>

<script setup>
import { reactive, computed, watch, useSlots } from 'vue';

const props = defineProps({
  // States
  open: {
    type: Boolean,
    default: false
  },
  // UI attributes
  title: {
    type: String,
    default: ''
  },
  maskClosable: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['close']);
const slots = useSlots();

const state = reactive({
  opening: true,
  opened: false
});

const className = computed(() => ({
  'mdc-dialog': true,
  'mdc-dialog--opening': state.opening,
  'mdc-dialog--open': state.opened
}));
const hasActions = computed(() => slots.actions);

watch(
  () => props.open,
  (val) => {
    if (val) {
      // animation
      setTimeout(() => {
        state.opened = true;
        setTimeout(() => {
          state.opening = false;
        }, 150);
      }, 150);
    } else {
      // reset
      state.opening = true;
      state.opened = false;
    }
  }
);

function handleClose() {
  props.maskClosable && emit('close');
}
</script>
