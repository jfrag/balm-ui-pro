```html
<ui-form-view></ui-form-view>
```

### Props

```ts
type ModelConfig = FormItemConfig[] | (formData: object, formOptions: object) => FormItemConfig[] | false;
```

| Name                 | Type              | Default    | Description                                                                                           |
| -------------------- | ----------------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `modelConfig`        | ModelConfig       | `required` | Form model config                                                                                     |
| `modelValue`         | object            | `{}`       | Form model data                                                                                       |
| `modelOptions`       | object            | `{}`       | The extra options of the form model config                                                            |
| `useGrid`            | boolean           | `false`    | Enables layout grid for form items                                                                    |
| `formAttrOrProp`     | object            | `{}`       | See BalmUI `<ui-form>` props [docs](https://material.balmjs.com/layout/form)                          |
| `formItemAttrOrProp` | object            | `{}`       | Form items' common attrs (e.g. `class`)                                                               |
| `gridAttrOrProp`     | object            | `{}`       | See BalmUI `<ui-grid>` props [docs](https://material.balmjs.com/layout/grid)                          |
| `gridCellAttrOrProp` | object            | `{}`       | See BalmUI `<ui-grid-cell>` props [docs](https://material.balmjs.com/layout/grid)                     |
| `actionConfig`       | ActionButton[]    | `[]`       | Form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button) |
| `setModelOptionsFn`  | function, boolean | `false`    | Form model options handler by the `model` list of form model config                                   |

- `modelConfig: ModelConfig`

  ```ts
  interface FormItemConfig {
    // Show all custom slots names and component event in console
    debug?: boolean;
    // Conditional Rendering
    if?: boolean;
    show?: boolean | (formData) => boolean;
    // Form label
    label?: string | (formData) => string;
    required?: boolean;
    // Form data config
    key?: string;
    value?: string;
    // Form component config
    component?: string;
    components?: FormItemComponentConfig[];
    attrOrProp?: object;
    event?: string; // Defaults: 'change'
    model?: string; // For the options of the source data
    // Custom slot
    slot?: string;
    // BalmUI validator
    validator?: string;
    ...BalmUIValidationRule
  }

  interface FormItemComponentConfig {
    key?: string;
    value?: string;
    attrOrProp?: object;
    ...customAttrOrProp
  }
  ```

  > See BalmUI [$validator docs](https://material.balmjs.com/data-input/validator) for BalmUIValidationRule details

- `actionConfig: ActionButton[]`

  ```ts
  interface ActionButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | string;
    attrOrProp?: object;
    // ⚠️ NOTE: `validationResult` requires `submit` type
    handler?: (
      actionConfig: ActionButton,
      validationResult?: BalmUIValidationResult
    ) => void;
  }
  ```

  > See BalmUI [$validator docs](https://material.balmjs.com/data-input/validator) for BalmUIValidationResult details

### Slots

| Name                                          | Props                                             | Description                                                    |
| --------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| `before-form-view`                            | `itemClass`, `subitemClass`, `data`, `dataSource` | Before form items                                              |
| custom form item slots (by form model config) | `config`, `data`, `dataSource`                    | Custom form item slots (See all slots names by `config.debug`) |
| `after-form-view`                             | `itemClass`, `subitemClass`, `data`, `dataSource` | After form items                                               |
| `form-view-actions`                           | `className`, `config`, `data`, `dataSource`       | Custom form buttons                                            |

### Events

| Name                | Type                                                                              | Description                                  |
| ------------------- | --------------------------------------------------------------------------------- | -------------------------------------------- |
| `loaded`            | `function(modelValue: object)`                                                    | Emits when the form view config is loaded.   |
| `update:modelValue` | `function(modelValue: object)`                                                    | Emits when the form view data is changed.    |
| `update:x`          | `function(key: string, value: string)`                                            | Emits when the form item data is changed.    |
| `action`            | `function(actionConfig: ActionButton, validationResult?: BalmUIValidationResult)` | Emits when the form view actions is clicked. |
