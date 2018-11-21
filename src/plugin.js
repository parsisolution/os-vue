import OverlayScrollbars from './OverlayScrollbars';

export default {
    install: function (Vue, options) {
        Vue.component('overlay-scrollbars', OverlayScrollbars);
    }
};