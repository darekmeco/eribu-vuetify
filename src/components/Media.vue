<template>
    <div class="hello">

        <v-toolbar dense> 
            <v-toolbar-side-icon>

            </v-toolbar-side-icon> 
            <v-toolbar-title>Title</v-toolbar-title> 
            <v-spacer></v-spacer> 
            <v-btn v-bind:to="{name: 'users.create'}" icon> 
                <v-icon>search</v-icon> 
            </v-btn> 
            <v-btn icon> 
                <v-icon>search</v-icon> 
            </v-btn> <v-btn icon> 
                <v-icon>favorite</v-icon> 
            </v-btn> 
            <v-btn icon> 
                <v-icon>more_vert</v-icon>
            </v-btn> 
        </v-toolbar>
        
        <el-upload 
            class="upload-demo" 
            drag 
            v-bind:action="getStoreRoute()" 
            v-bind:on-preview="handlePreview" 
            v-bind:on-remove="handleRemove" 
            v-bind:file-list="fileList" 
            v-bind:on-change="listChanged" 
            v-bind:auto-upload="false" 
            list-type="picture"
            multiple> 
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                Drop file here or
                <em>click to upload</em>
            </div>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>


        <v-data-table v-bind:headers="headers" v-bind:items="fileList" hide-actions class="elevation-1"> <template slot="items" slot-scope="props">
                <td>{{ props.item.uid }}</td>
                <td>
                    <img v-bind:src="props.item.url">
                </td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.percentage }}</td>
                <td class="text-xs-left">{{ props.item.size }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
            </template> </v-data-table>
        <el-tree v-bind:data="data" v-bind:props="defaultProps" v-on:node-click="handleNodeClick"></el-tree>

    </div>
</template>

<script>
    import Vue from 'vue';
    import {
    Tree,
            Upload
    } from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        name: 'HelloWorld',
        components: {

            'el-tree': Tree,
            'el-upload': Upload

        },
        data() {
            return {
                fileList: [],
                headers: [{
                        text: 'Id',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Nazwa',
                        align: 'left',
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
                    }
                ],
                msg: 'Welcome to Your Vue.js App',
                dialog: true,
                data: [{
                        label: 'Level one 1',
                        children: [{
                                label: 'Level two 1-1',
                                children: [{
                                        label: 'Level three 1-1-1'
                                    }]
                            }]
                    }, {
                        label: 'Level one 2',
                        children: [{
                                label: 'Level two 2-1',
                                children: [{
                                        label: 'Level three 2-1-1'
                                    }]
                            }, {
                                label: 'Level two 2-2',
                                children: [{
                                        label: 'Level three 2-2-1'
                                    }]
                            }]
                    }, {
                        label: 'Level one 3',
                        children: [{
                                label: 'Level two 3-1',
                                children: [{
                                        label: 'Level three 3-1-1'
                                    }]
                            }, {
                                label: 'Level two 3-2',
                                children: [{
                                        label: 'Level three 3-2-1'
                                    }]
                            }]
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            getStoreRoute() {
                return route('api.media.store');
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handlePreview() {

            },
            handleRemove() {

            },
            listChanged(file, fileList) {
                this.fileList = fileList;
                console.log('fileList: ', fileList);
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>