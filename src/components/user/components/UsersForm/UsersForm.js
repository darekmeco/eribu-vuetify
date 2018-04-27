  import Vue from 'vue';
  import axios from 'axios';

  import {
      quillEditor
  } from 'vue-quill-editor'
  import VeeValidate from 'vee-validate';


  import _isEmpty from "lodash/isEmpty";
  import _findKey from "lodash/findKey";
  import _head from "lodash/head";

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  Vue.use(VeeValidate);
  //Vue.use(VueQuillEditor, /* { default global options } */);

  //import { quillEditor } from 'vue-quill-editor'

  //import { validRules } from "./UsersValidation";


  export default {
      name: 'UsersForm',
      props: {
          id: {
              type: String,
              default: null
          }
      },
      $_veeValidate: {
          validator: 'new'
      },
      data() {
          return {

              msg: 'Welcome to Your Vue.js App',
              tableData: [],
              form: {
                  email: null,
                  first_name: null,
                  last_name: null,
                  password: null,
                  password_confirmation: null,
                  content: null
              }
          };
      },
      components: {
          quillEditor
      },
      methods: {
          onSubmit() {
              console.log('submit!');
              this.$validator.validateAll().then((result) => {
                  if (result) {
                      this.store();
                  }
                  console.log('result', result);
              });
              console.log('after validate');
              //  this.$refs.form.validate();
          },
          onSubmitOld() {
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
              axios.get(route('users.edit', {
                      user: this.id
                  }))
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
                      console.log(response.data);
                  })
                  .catch((error) => {
                      if (error.response) {
                          // The request was made and the server responded with a status code
                          // that falls out of the range of 2xx
                          console.log(error.response.data);
                          console.log(error.response.status);
                          console.log(error.response.headers);

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
          clear() {

          },

          handleClick() {
              console.log('click');
          }
      },
      created() {

          let that = this;

          this.$validator.extend('server', {

              getMessage(field, args, data) {

                  console.log('validate message', field, args);
                  return (data && data.message) || 'Something went wrong';

              },
              validate(value, args) {

                  console.log('validate start', value, args);

                  return new Promise(resolve => {

                      axios.post(route('users.store'), that.form, {
                              headers: {
                                  'X-Custom-Header': 'validate'
                              }
                          })
                          .then((response) => {

                              resolve({
                                  valid: true,
                                  data: {
                                      message: 'Ok'
                                  }
                              });

                          })
                          .catch((error) => {

                              if (error.response) {
                                  // The request was made and the server responded with a status code
                                  // that falls out of the range of 2xx
                                  console.log(error.response.data.errors[args[0]]);
                                  console.log(error.response.status);
                                  console.log(error.response.headers);

                                  if (error.response.data.errors[args[0]]) {
                                      resolve({
                                          valid: false,
                                          data: {
                                              message: error.response.data.errors[args[0]]
                                          }
                                      });
                                  }

                                  //console.log('What about this: ', error.response.data.kuku);
                                  //this.errors = error.response.data.errors;


                              } else if (error.request) {

                                  console.log(error.request);

                              } else {

                                  console.log('Error', error.message);

                              }

                              console.log(error.config);
                              console.log(resolve);

                          });
                  });




                  //                    axios.post(route('users.store'), that.form, {
                  //                        headers: {'X-Custom-Header': 'validate'}
                  //                    }).then((response) => {
                  //                        console.log(response.data.data);
                  //                    })
                  //                            .catch((error) => {
                  //                                if (error.response) {
                  //                                    // The request was made and the server responded with a status code
                  //                                    // that falls out of the range of 2xx
                  //                                    console.log(error.response.data);
                  //                                    console.log(error.response.status);
                  //                                    console.log(error.response.headers);
                  //
                  //                                    //console.log('What about this: ', error.response.data.kuku);
                  //                                    //this.errors = error.response.data.errors;
                  //
                  //                                } else if (error.request) {
                  //                                    console.log(error.request);
                  //                                } else {
                  //                                    console.log('Error', error.message);
                  //                                }
                  //                                console.log(error.config);
                  //                                return false;
                  //                            });
              }
          });
      },
      mounted() {
          console.log(route);
          console.log('this.product.id', this.id);
          if (this.id) {
              this.getFormData();
          }

      }
  }
