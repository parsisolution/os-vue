export default {
    name: "overlay-scrollbars",

    data() {
        return {
            oscroll: null,
        }
    },

    props: {
        options: {
            type: Object,
            default: {}
        },
    },

    mounted() {
        if (!this.oscroll)
            this.oscroll = OverlayScrollbars(this.$el, this.options);
    },

    beforeDestroy() {
        this.oscroll.destroy();
        this.oscroll = null;
    },

    render(h) {
        return h('div',
            [
                h('div', this.$slots.default),
            ]
        )
    }
}