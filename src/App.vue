<template>
<div id="app">
    <v-app id="inspire">
        <v-navigation-drawer clipped fixed v-model="drawer" class="grey lighten-4" app>
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-bind:to="{name: 'users.index'}">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Users</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-bind:to="{name: 'media.index'}">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Media</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>


                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Settings</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app fixed clipped-left color="amber">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-top>
                    <v-flex>
                        <router-view/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</div>

</template>
<script>
    export default {
        name: 'App',
        data: () => ({
            drawer: true
        }),
        props: {
            source: String
        }
    }

</script>
<style></style>
