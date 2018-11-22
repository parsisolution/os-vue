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
            default() {
                return {};
            }
        },
    },

    mounted() {
        this.instance = OverlayScrollbars(this.$el, this.options);
        this.$emit('start', this.instance);
    },

    beforeDestroy() {
        this.$emit('end', this.instance);
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