import { toRefs, computed } from 'vue';

const FORM_VIEW_EVENTS = {
  updateFormItem: 'change:x',
  action: 'action'
};

const viewProps = {
  title: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  modelConfig: {
    type: [Array, Function, Boolean],
    default: false
  },
  modelPath: {
    type: String,
    default: ''
  },
  defaultModelValue: {
    type: Object,
    default: () => ({})
  },
  modelOptions: {
    type: Object,
    default: () => ({})
  },
  keyName: {
    type: [String, Array],
    default: 'id'
  }
};

function useView(props, { slots, emit, state, refreshData }) {
  const hasTitle = computed(() => props.title || slots.title);

  function handleChange(key, value) {
    emit(FORM_VIEW_EVENTS.updateFormItem, key, value, refreshData);
  }

  function exposeAction(action, result = {}) {
    const { handler, ...actionConfig } = action;
    const customHandler = isFunction(handler) ? handler : false;

    const { model, modelOptions, keyName } = props;
    const data = {
      model,
      modelOptions,
      keyName,
      ...toRefs(state),
      ...result
    };

    customHandler
      ? customHandler(actionConfig, data, refreshData)
      : emit(FORM_VIEW_EVENTS.action, actionConfig, data, refreshData);
  }

  return {
    hasTitle,
    handleChange,
    exposeAction
  };
}

export { viewProps, useView };
