<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="[className, attrOrProp.class || '']"
    v-bind="attrOrProp"
  >
    <label
      v-if="config.label"
      :class="{
        'mdc-form-item__label': true,
        required: config.required
      }"
    >
      <slot :name="customSlots.beforeLabel"></slot>
      <span>{{ getFormLabel(config) }}</span>
      <slot :name="customSlots.afterLabel"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem"></slot>
      <template v-if="config.slot">
        <slot :name="config.slot"></slot>
      </template>
      <template v-else>
        <slot :name="customSlots.componentItem">
          <template v-if="hasSubComponents">
            <component
              :is="config.component"
              :components="config.components"
              v-bind="componentBind"
              @[eventName]="handleChange(config, $event)"
            ></component>
          </template>
          <template v-else>
            <ui-readonly-item
              v-if="config.component === 'ui-readonly-item'"
              v-bind="componentBind"
            ></ui-readonly-item>
            <template v-else>
              <component
                :is="config.component"
                v-model="formData[config.key]"
                v-bind="componentBind"
                @[eventName]="handleChange(config, $event)"
              ></component>
            </template>
          </template>
        </slot>
      </template>
      <slot :name="customSlots.afterItem"></slot>
    </div>
  </ui-form-field>
</template>

<script>
const UI_FORM_ITEM = {
  NAME: 'UiFormItem',
  EVENTS: {
    update: 'update:modelValue'
  }
};

export default {
  name: UI_FORM_ITEM.NAME,
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, computed, watch, onBeforeMount } from 'vue';
import UiReadonlyItem from '../readonly-item/readonly-item.vue';
import getType, { isFunction } from '../../utils/typeof';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  formDataSource: {
    type: Object,
    default: () => ({})
  },
  attrOrProp: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits([UI_FORM_ITEM.EVENTS.update]);

const state = reactive({
  formData: props.modelValue
});
const { formData } = toRefs(state);

const hasSubComponents = computed(() => Array.isArray(props.config.components));
const eventName = computed(() => {
  return props.config.event || UI_FORM_ITEM.EVENTS.update;
});
const component = computed(() => props.config.component || 'unknown-component');
const key = computed(() => props.config.key || 'unknown-key');
const componentKey = computed(() => `${component.value}--${key.value}`);
const className = computed(() => [
  'mdc-form__item',
  'mdc-form-item',
  `mdc-form-item__${component.value}`,
  `mdc-form-item__${key.value}`
]);
const componentBind = computed(() => {
  return Object.assign(
    {},
    {
      proConfig: props.config,
      proFormData: state.formData,
      proFormDataSource: props.formDataSource,
      proComponentKey: componentKey.value
    },
    props.config.attrOrProp || {}
  );
});
const customSlots = computed(() => ({
  beforeLabel: `before-label__${componentKey.value}`,
  afterLabel: `after-label__${componentKey.value}`,
  beforeItem: `before-item__${componentKey.value}`,
  componentItem: `form-item__${componentKey.value}`,
  afterItem: `after-item__${componentKey.value}`
}));

onBeforeMount(() => {
  if (props.config.debug) {
    const customSlotsNames = Object.values(customSlots.value).map((slot) => ({
      slot
    }));

    console.info(`[${UI_FORM_ITEM.NAME}] slots`);
    console.table(customSlotsNames, ['slot']);
  }
});

watch(
  () => props.modelValue,
  (val) => (state.formData = val)
);

function displayFormItem({ show }) {
  const display = isFunction(show)
    ? show(state.formData)
    : getType(show) === 'undefined' || show;

  return display;
}

function getFormLabel({ label }) {
  return isFunction(label) ? label(state.formData) : label;
}

function handleChange({ component, key }, value) {
  props.config.debug &&
    console.info[
      (`[${UI_FORM_ITEM.NAME}] ${component}@${eventName.value}`,
      hasSubComponents.value
        ? props.config.components.map(({ key }) => key)
        : key,
      getType(value) === 'object'
        ? Object.assign({}, value)
        : Array.isArray(value)
        ? [...value]
        : value)
    ];

  hasSubComponents.value
    ? emit(UI_FORM_ITEM.EVENTS.update, Object.keys(value), Object.values(value))
    : emit(UI_FORM_ITEM.EVENTS.update, key, value);
}
</script>
