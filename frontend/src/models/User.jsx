class User {
    email;
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    updateField(fieldName, value) {
        if (Object.hasOwnProperty.call(this, fieldName))
            this[fieldName] = value;
    }
}

export default User; 