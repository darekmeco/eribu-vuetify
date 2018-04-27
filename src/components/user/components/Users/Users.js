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
              .catch(function (error) {
                  console.log(error);
              });

      }
  }
