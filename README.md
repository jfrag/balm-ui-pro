# BalmUI pro

> Coming up...

> [`balm-ui-pro@legacy`](https://github.com/balmjs/balm-ui-pro/tree/legacy) supports for Vue 2

- Preview components
  - `<ui-form-view>`
  - `<ui-readonly-item>`
  - `<ui-checkbox-group>`
  - `<ui-radio-group>`
  - `<ui-switch-box>`

## Quick Start

### Installing

```sh
yarn add balm-ui balm-ui-pro
# OR
npm install --save balm-ui balm-ui-pro
```

### Usage

```scss
@use 'balm-ui/dist/balm-ui';
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import { createApp } from 'vue';
import App from '@/views/layouts/app';
import BalmUI from 'balm-ui';
import BalmUIPro from 'balm-ui-pro';

const app = createApp(App);

app.use(BalmUI);
app.use(BalmUIPro);

app.mount('#app');
```

## Documentation

```html
<ui-form-view></ui-form-view>
```

### Props

| Name                 | Type                     | Default    | Description                                                                                           |
| -------------------- | ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| `modelValue`         | object                   | `{}`       | Form model data                                                                                       |
| `modelConfig`        | array, function, boolean | `required` | Form model config                                                                                     |
| `modelOptions`       | object                   | `{}`       | The extra options of the form model config                                                            |
| `useGrid`            | boolean                  | `false`    |                                                                                                       |
| `formAttrOrProp`     | object                   | `{}`       | See BalmUI `<ui-form>` props [docs](https://material.balmjs.com/layout/form)                          |
| `formItemAttrOrProp` | object                   | `{}`       |                                                                                                       |
| `gridAttrOrProp`     | object                   | `{}`       | See BalmUI `<ui-grid>` props [docs](https://material.balmjs.com/layout/grid)                          |
| `gridCellAttrOrProp` | object                   | `{}`       | See BalmUI `<ui-grid-cell>` props [docs](https://material.balmjs.com/layout/grid)                     |
| `actionConfig`       | array                    | `[]`       | Form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button) |

- `modelConfig: FormConfigItem[] | (formData: object) => FormConfigItem[] | false`

  ```ts
  interface FormConfigItem {
    // Show all custom slots names and component event in console
    debug?: boolean;
    // Conditional Rendering
    if?: boolean;
    show?: boolean | (formData) => boolean;
    // Form label
    label?: string | (formData) => string;
    // Form data config
    key?: string;
    value?: string;
    // Form component config
    component?: string;
    attrOrProp?: object;
    event?: string; // Defaults: 'update:modelValue'
    // Custom slot
    slot?: string;
    // BalmUI validator
    validator?: string;
    ...BalmUIValidationRule
  }
  ```

  > NOTE: see BalmUI $validator rule and result [docs](https://material.balmjs.com/data-input/validator)

- `actionConfig: ActionButton[]`

  ```ts
  interface ActionButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | string;
    attrOrProp?: object;
  }
  ```

### Slots

| Name                                          | Props                               | Description                                                    |
| --------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- |
| `before`                                      | `itemClass`, `subitemClass`, `data` | Before form items                                              |
| custom form item slots (by form model config) | `value`, `config`, `data`           | Custom form item slots (See all slots names by `config.debug`) |
| `after`                                       | `itemClass`, `subitemClass`, `data` | After form items                                               |
| `actions`                                     | `className`, `data`                 | Custom form buttons                                            |

### Events

| Name                | Type                                   | Description |
| ------------------- | -------------------------------------- | ----------- |
| `update:modelValue` | `function(modelValue: object)`         |             |
| `action`            | `function(antionResult: ActionResult)` |             |

```ts
interface ActionResult {
  type: string; // ActionButton.type,
  ...validationResult?: BalmUIValidationResult
}
```

## Demo

```html
<ui-form-view
  v-model="formData"
  :model-config="modelConfig"
  :action-config="actionConfig"
  @action="onAction"
>
  <template #form-item__ui-textfield--l>
    <input v-model="formData.l" />
  </template>
  <template #custom-slot>gg</template>
  <template #after>
    <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
  </template>
</ui-form-view>
```

```js
const formData = {};

const modelConfig = ({ data }) => {
  console.log('static data', data);
  const { id } = data;
  return [
    {
      if: !!id,
      label: 'ID',
      component: 'ui-textfield',
      key: 'id',
      value: id,
      attrOrProp: {
        attrs: {
          readonly: true
        }
      }
    },
    {
      label: 'Input',
      component: 'ui-textfield',
      key: 'a',
      value: ''
    },
    {
      label: 'Autocomplete',
      component: 'ui-autocomplete',
      key: 'b',
      value: ''
    },
    {
      label: 'Editor',
      component: 'ui-editor',
      key: 'c',
      value: ''
    },
    {
      label: 'Select',
      component: 'ui-select',
      key: 'd',
      value: '',
      attrOrProp: {
        'default-label': 'default',
        options: [
          {
            label: 'A',
            value: 1
          },
          {
            label: 'B',
            value: 2
          }
        ]
      }
    },
    {
      show: ({ d }) => d === 2,
      label: 'Checkbox',
      component: 'ui-checkbox-group',
      key: 'e',
      value: data.e || [],
      attrOrProp: {
        options: [
          {
            label: 'C',
            value: 3
          },
          {
            label: 'D',
            value: 4
          }
        ]
      }
    },
    {
      label: 'Radio',
      component: 'ui-radio-group',
      key: 'f',
      value: '',
      attrOrProp: {
        options: [
          {
            label: 'E',
            value: 5
          },
          {
            label: 'F',
            value: 6
          }
        ]
      }
    },
    {
      label: 'Chips',
      component: 'ui-chips',
      key: 'g',
      value: [],
      attrOrProp: {
        type: 'filter',
        options: [
          {
            label: 'G',
            value: 7
          },
          {
            label: 'H',
            value: 8
          },
          {
            label: 'I',
            value: 9
          }
        ]
      }
    },
    {
      label: 'Datepicker',
      component: 'ui-datepicker',
      key: 'h',
      value: '',
      attrOrProp: {
        clear: true
      }
    },
    {
      label: 'Rangepicker',
      component: 'ui-rangepicker',
      key: 'i',
      value: []
    },
    {
      label: 'Switch',
      component: 'ui-switch-box',
      key: 'j',
      value: false,
      attrOrProp: {
        options: [
          {
            label: 'On',
            value: true
          },
          {
            label: 'Off',
            value: false
          }
        ]
      }
    },
    {
      label: 'Slider',
      component: 'ui-slider',
      key: 'k',
      value: 0
    },
    {
      debug: true,
      label: 'Component slot',
      component: 'ui-textfield',
      key: 'l',
      value: ''
    },
    {
      debug: true,
      label: 'Custom component',
      component: 'x-form-item',
      key: 'm',
      value: '',
      event: 'input'
    },
    {
      label: 'Custom slot',
      slot: 'custom-slot'
    }
  ];
};

const actionConfig = [
  {
    type: 'reset',
    text: 'Reset',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: 'submit',
    text: 'Submit',
    attrOrProp: {
      raised: true
    }
  }
];

function onAction({ type, valid, message }) {
  console.log(type);

  if (type === 'submit') {
    state.message = message;

    if (valid) {
      console.log('gg');
    }
  }
}
```
