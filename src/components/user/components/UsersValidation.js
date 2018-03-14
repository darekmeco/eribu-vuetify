export default {

    validateBackend: (rule, value, callback) => {
        alert(1);
        console.log('validation errors: ', this.errors);
        return callback(new Error('Please input the age'));
    },

    rules: {
        email: [
            {validator: this.validateBackend, trigger: 'blur'},
        ],
        password: [
            {type: 'string', required: true, message: 'Please input Activity name!', trigger: 'blur'},
            {min: 3, max: 255, message: 'Min length should be 3', trigger: 'blur'}
        ],
        password_confirmation: [
            {type: 'string', required: true, message: 'Please input Activity name', trigger: 'blur'},
            {min: 3, max: 255, message: 'Min length should be 3', trigger: 'blur'}
        ],
        first_name: [
            {required: true, message: 'Please input Activity name', trigger: 'blur'}
        ]
    }
};


