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
             remoteFileList: [],
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
