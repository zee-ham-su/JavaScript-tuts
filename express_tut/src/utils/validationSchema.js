export const UserValidationSchema = {
    username:{
        isLength: {
            errorMessage: 'username must be a string with length between 5 and 32',
            options: { 
                min: 5, 
                max: 32
            },
        },
        notEmpty: {
            errorMessage: 'username must not be empty',
        },
        isString: {
            errorMessage: 'username must be a string',
        },
    },
    displayName:{
        notEmpty: {
            errorMessage: 'displayName must not be empty',
        },
    },
};