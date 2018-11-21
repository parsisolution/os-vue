# os-vue
Overlay Scrollbars Vue Component

## Installation

```shell
yarn add os-vue
# or
npm i --save os-vue
```

Then import it in your js file and install it

```js
import OverlayScrollbars from 'os-vue';

Vue.use(OverlayScrollbars);
```

Or

```js
import OverlayScrollbars from 'os-vue/overlay-scrollbars';

Vue.component(OverlayScrollbars.name, OverlayScrollbars);
```

## Usage

Once installed, it can be used in a template as simply as:

```vue
<overlay-scrollbars>
    <div v-for="item of count">{{ item }}</div>
</overlay-scrollbars>
```

You can also provide options

```vue
<overlay-scrollbars :options="os_options">
    <div v-for="item of count">{{ item }}</div>
</overlay-scrollbars>
```

To access OverlayScrollbars instance and for example add extensions to it see this [example](https://codepen.io/H4M3D3/pen/qJYjWq)

If you have discovered a 🐜 or have a feature suggestion, feel free to create an [issue](https://github.com/parsisolution/os-vue/issues) on Github.

# License
Released under The MIT [License](https://github.com/parsisolution/os-vue/blob/master/LICENSE). Copyright (c) hamed-ehtesham.