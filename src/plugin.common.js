const OverlayScrollbars = require('./OverlayScrollbars');

module.exports = {
    install: function (Vue, options) {
        Vue.component('overlay-scrollbars', OverlayScrollbars);
    }
};