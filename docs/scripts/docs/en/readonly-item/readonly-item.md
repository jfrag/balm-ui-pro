```html
<ui-readonly-item></ui-readonly-item>
```

### Props

| Name             | Type   | Default | Description            |
| ---------------- | ------ | ------- | ---------------------- |
| `config`         | object | `{}`    | Form item config       |
| `formData`       | object | `{}`    | Form model data        |
| `formDataSource` | object | `{}`    | Form model data source |

```ts
type ReadonlyItemData = {
  formData: object,
  formDataSource: object,
  config: object,
  type: string,
  value: unknown,
}

interface ReadonlyItemConfig extends FormItemConfig {
  value: unknown | (data: ReadonlyItemData) => any
}
```
