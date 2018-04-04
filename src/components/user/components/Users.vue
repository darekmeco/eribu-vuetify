<template>
<div>

    <v-toolbar dense> <v-toolbar-side-icon></v-toolbar-side-icon> <v-toolbar-title>Title</v-toolbar-title> <v-spacer></v-spacer> <v-btn v-bind:to="{name: 'users.create'}" icon> <v-icon>search</v-icon> </v-btn> <v-btn icon> <v-icon>search</v-icon> </v-btn> <v-btn icon> <v-icon>favorite</v-icon> </v-btn> <v-btn icon> <v-icon>more_vert</v-icon> </v-btn> </v-toolbar>

    <v-data-table v-bind:headers="headers" v-bind:items="tableData" hide-actions class="elevation-1"> <template slot="items" slot-scope="props">
    <td>{{ props.item.id }}</td>
    <td class="text-xs-right">{{ props.item.email }}</td>
    <td class="text-xs-right">{{ props.item.first_name }}</td>
    <td class="text-xs-right">{{ props.item.last_name }}</td>
    <td class="text-xs-right">{{ props.item.created_at }}</td>
    <td class="text-xs-right">{{ props.item.iron }}</td>
    </template> </v-data-table>
</div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Users',
        data() {
            return {
                headers: [{
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Calories',
                        value: 'calories'
                    },
                    {
                        text: 'Fat (g)',
                        value: 'fat'
                    },
                    {
                        text: 'Carbs (g)',
                        value: 'carbs'
                    },
                    {
                        text: 'Protein (g)',
                        value: 'protein'
                    },
                    {
                        text: 'Iron (%)',
                        value: 'iron'
                    }
                ],
                msg: 'Welcome to Your Vue.js App',
                tableData: []
            };
        },
        components: {

        },
        methods: {
            handleClick() {
                console.log('click');
            },
            editRecord(index, row) {
                console.log('User::editRecord ', row.id);
                this.$router.push({
                    'name': 'users.edit',
                    'params': {
                        'id': row.id.toString()
                    }
                });
            }
        },
        mounted() {

            console.log(route);

            axios.get(route('users.index'), {
                    params: {}
                })
                .then((response) => {
                    console.log('users response: ', response);
                    this.tableData = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

        }
    }
</script>