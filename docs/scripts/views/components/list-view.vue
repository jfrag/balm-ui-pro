<template>
  <docs-page name="list-view" without-css demo-count="1">
    <ui-list-view
      title="List View"
      model="user"
      model-path="model-config/a.json"
      :thead="thead"
      :tbody="tbody"
      :row-action-config="rowActionConfig"
      :top-action-config="topActionConfig"
      :row-action-rendering="rowActionRendering"
      @update:x="onChange"
      @action="onAction"
    >
      <!-- <template #before-form-view>xxx</template>
      <template #after-form-view>yyy</template> -->
      <!-- <template #pagination="{ currentMinRow, currentMaxRow, total }">
        {{ currentMinRow }} - {{ currentMaxRow }} / {{ total }}
      </template> -->
    </ui-list-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>


<script setup>
const thead = ['ID', 'Dessert', 'Calories', 'Fat', 'Actions'];
const tbody = [
  'id',
  'dessert',
  'calories',
  'fat',
  {
    slot: 'actions'
  }
];

const rowActionConfig = [
  {
    if: (data) => true,
    component: 'ui-icon',
    text: 'add'
  },
  {
    type: 'no-slot',
    component: 'ui-icon-button',
    attrOrProp: {
      icon: 'favorite'
    }
  },
  {
    component: 'ui-button',
    text: 'Add',
    attrOrProp: {
      icon: 'add'
    }
  },
  {
    text: 'BalmUI',
    href: 'https://material.balmjs.com/'
  },
  {
    type: 'router-link',
    text: 'RouterLink',
    routeName: 'components.detail-view'
  },
  {
    text: 'Link',
    handler: (data, refresh) => {
      console.log('link button', data);
    }
  }
];

const topActionConfig = [
  {
    type: 'router-link',
    icon: 'add',
    text: 'Create',
    routeName: 'components.detail-view'
  },
  {
    type: 'multi-update',
    text: 'Update',
    handler: (data, refresh) => {
      console.log('update', data);
    }
  },
  {
    type: 'multi-delete',
    text: 'Delete'
  }
];

function rowActionRendering(action, data) {
  // console.log(action, data);
  return true;
}

function onChange(key, value, refresh) {
  console.log('onChange', key, value);
  // refresh();
}

function onAction(action, data) {
  console.log('onAction', action, data);
}
</script>
