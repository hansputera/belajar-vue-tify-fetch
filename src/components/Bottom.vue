<template>
    <v-bottom-navigation fixed v-model="value" :background-color="changeColor" shift grow horizontal :dark="isDarkBar">
        <v-btn x-large depressed icon @click="gotoHome()">
            <span>
                Home
            </span>

            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn x-large depressed icon @click="gotoSearch()">
            <span>
                Cari COVID
            </span>

            <v-icon>
                mdi-text-search
            </v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    import Router from "../router";
    export default {
        name: "bottom-nav",
        data: () => ({ value: 0, isDarkBar: false }),
        computed: {
            changeColor() {
                switch(this.value) {
                    case 0:
                        this.changeDarkBar(false);
                        return 'white';
                    case 1:
                        this.changeDarkBar(true);
                        return 'blue-grey';
                    default:
                        this.changeDarkBar(false);
                        return 'white';
                }
            }
        },
        methods: {
            changeDarkBar(bol) {
                this.isDarkBar = bol;
            },
            gotoHome() {
                if (Router.currentRoute.name != "Home") Router.replace({ name: "Home" });
            },
            gotoSearch() {
                if (Router.currentRoute.name != "Search") Router.replace({ name: "Search" });
            }
        }
    }
</script>