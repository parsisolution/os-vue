import 'overlayscrollbars/js/OverlayScrollbars';

export default {
    name: "overlay-scrollbars",

    data() {
        return {
            instance: null,
        }
    },

    props: {
        options: {
            type: Object,
            default: {}
        },
    },

    mounted() {
        if (!this.instance)
            this.instance = OverlayScrollbars(this.$el, this.options);
    },

    beforeDestroy() {
        this.instance.destroy();
        this.instance = null;
    },

    render(h) {
        return h('div',
            [
                h('div', this.$slots.default),
            ]
        )
    }
}