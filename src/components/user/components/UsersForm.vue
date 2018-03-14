<template>
    <div>

        <v-card>
            <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
                >
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-form v-model="valid">
                            <v-text-field
                                label="Name"
                                v-model="name"
                                v-bind:rules="nameRules"
                                v-bind:counter="10"
                                required
                                ></v-text-field>
                            <v-text-field
                                label="E-mail"
                                v-model="email"
                                v-bind:rules="emailRules"
                                required
                                ></v-text-field>
                        </v-form>

                    </v-flex>

                </v-layout>
            </v-container>
        </v-card>




        <el-button-group>
            <el-button type="primary" icon="el-icon-edit" v-on:click="$router.push({name: 'users.create'})"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>

        <el-main>

            <el-form ref="form" v-bind:model="form"  label-width="120px" v-bind:rules="validrules.rules">
                <el-row v-bind:gutter="20">
                    <el-col v-bind:span="12">
                        <el-form-item label="Adres email" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>

                        <el-form-item label="Imię" prop="first_name">
                            <el-input v-model="form.first_name"></el-input>
                        </el-form-item>

                        <el-form-item label="Nazwisko">
                            <el-input v-model="form.last_name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="onSubmit">Create</el-button>
                            <el-button>Cancel</el-button>
                        </el-form-item>
                    </el-col>

                    <el-col v-bind:span="12">
                        <el-form-item label="Hasło" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="Powtórz hasło" prop="password_confirmation">
                            <el-input v-model="form.password_confirmation"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-main>
    </div>
</template>

<script>


    import axios from 'axios';
    import _isEmpty from "lodash/isEmpty";
    import _findKey from "lodash/findKey";
    import _head from "lodash/head";


    //import { validRules } from "./UsersValidation";

    export default {
        name: 'UsersForm',
        props: {
            id: {
                type: String,
                default: null
            }
        },
        data() {

            var validateBackend = (rule, value, callback) => {
                console.log('validation errors: ', this.errors, rule.field, value);
                if (!_isEmpty(this.errors)) {
                    if (this.errors[rule.field]) {
                        let message = _head(this.errors[rule.field]);
                        console.log('not empty errors', _head(message));
                        return callback(new Error(message));
                    }
                }
                return callback();
            };

            return {
                msg: 'Welcome to Your Vue.js App',
                tableData: [],
                form: {
                    email: null,
                    first_name: null,
                    last_name: null,
                    password: null,
                    password_confirmation: null
                },
                errors: {},
                'validrules': {
                    rules: {
                        email: [
                            {type: 'email', required: true, message: 'Please input an Email addres!', trigger: 'blur'},
                            {validator: validateBackend, trigger: 'blur'}
                        ],
                        password: [
                            {type: 'string', required: true, message: 'Please input password!', trigger: 'blur'},
                            {min: 6, max: 255, message: 'Min length should be 6', trigger: 'blur'},
                            {validator: validateBackend, trigger: 'blur'}
                        ],
                        password_confirmation: [
                            {type: 'string', required: true, message: 'Please repeat a password', trigger: 'blur'},
                            {min: 6, max: 255, message: 'Min length should be 6', trigger: 'blur'},
                            {validator: validateBackend, trigger: 'blur'}
                        ],
                        first_name: [
                            {required: true, message: 'Please input firstname', trigger: 'blur'},
                            {validator: validateBackend, trigger: 'blur'}
                        ]
                    }
                }

            };
        },
        components: {

        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.errors = {};

                //??
                //this.$refs.form.clearValidate();

                console.log('before validating...');

                this.$refs.form.validate((valid) => {

                    console.log('validating...');

                    if (valid) {
                        console.log('clean submit!!');

                        this.store();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getFormData() {
                //console.log('getFormData', route('users.edit', {user: this.id}));
                axios.get(route('users.edit', {user: this.id}))
                        .then((response) => {
                            console.log(response.data);
                            this.form = response.data;
                        });
            },
            getRoute() {

                if (this.id) {
                    return route('users.update');
                }

            },

            store() {
                axios.post(route('users.store'), this.form)
                        .then((response) => {
                            console.log(response.data.data);
                            this.tableData = response.data.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                // The request was made and the server responded with a status code
                                // that falls out of the range of 2xx
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);

                                console.log(this.$refs.form);

                                console.log('What about this: ', error.response.data.kuku);
                                this.errors = error.response.data.errors;

                                this.$refs.form.validate((valid) => {
                                    if (valid) {
                                        console.log('backend clean submit!!');
                                    } else {
                                        console.log('backend error submit!!');
                                        return false;
                                    }
                                });

                            } else if (error.request) {
                                // The request was made but no response was received
                                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                                // http.ClientRequest in node.js
                                console.log(error.request);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });

            },

            handleClick() {
                console.log('click');
            }
        },
        mounted() {
            console.log(route);
            console.log('this.product.id', this.id);

            if (this.id) {
                this.getFormData();
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
