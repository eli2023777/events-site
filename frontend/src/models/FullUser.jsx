class FullUser {
    first;
    last;
    phone;
    email;
    password;
    url;
    alt;
    state;
    country;
    city;
    street;
    houseNumber;
    zip;

    constructor(first, last, phone, email, password, url, alt,
        state, country, city, street, houseNumber, zip) {
        this.first = first;
        this.last = last;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.url = url;
        this.alt = alt;
        this.state = state;
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.zip = zip;
    }

    validate = (isEditUser) => {
        const formErrors = {};
        const stringReg = /^.{2,256}$/;
        const numReg = /^\d+$/;
        const nameReg = /^.{2,20}$/;
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/;

        const urlReg = /^[\s\S]{14,}$/;
        const phoneReg = /^0([2345789])(-?\d){8,10}$/;;

        // For Edit user case:
        // 1. Check if the feild is empty just when it is NOT for Edit User.
        // 2. check regex just if is not empty.

        // Validate firstName field
        if (!isEditUser && !this.first) {
            formErrors['first'] = "First Name field must not be empty."
        } else if (this.first && !nameReg.test(this.first)) {
            formErrors['first'] = "First Name must be from 2 to 256 characters."
        }

        // Validate lastName field
        if (!isEditUser && !this.last) {
            formErrors['last'] = "Last Name field must not be empty."
        } else if (this.last && !nameReg.test(this.last)) {
            formErrors['last'] = "Last Name must be from 2 to 256 characters."
        }

        // Validate phone field
        if (!isEditUser && !this.phone) {
            formErrors['phone'] = "Phone field must not be empty."
        } else if (this.phone && !phoneReg.test(this.phone)) {
            formErrors['phone'] = "Phone must be a valid Israeli phone number ."
        }


        // NO NEED for Email Validate, bec. there is a bootstrap validate on that.


        if (!isEditUser && !this.password) {
            formErrors['password'] = "Password field must not be empty."
        } else if (this.password && !passwordRegExp.test(this.password)) {
            formErrors['password'] = "Password must contain at least 7 and max 20 characters and max 20, with upper and lower case letters, numbers and symbols."
        }


        // Validate Image-url field

        if (this.url && !urlReg.test(this.url)) {
            formErrors['url'] = "Image-url must be at lest 14 characters."
        }

        // Validate State field
        if (!isEditUser && !this.state) {
            formErrors['alt'] = "'Image-alt' field must not be empty."
        } else if (this.state && !stringReg.test(this.state)) {
            formErrors['alt'] = "Image-alt must be from 2 to 256 characters."
        }

        // Validate country field
        if (!isEditUser && !this.country) {
            formErrors['country'] = "Country field must not be empty."
        } else if (this.country && !stringReg.test(this.country)) {
            formErrors['country'] = "Country must be from 2 to 256 characters."
        }

        // Validate city field
        if (!isEditUser && !this.city) {
            formErrors['city'] = "City field must not be empty."
        } else if (this.city && !stringReg.test(this.city)) {
            formErrors['city'] = "City must be from 2 to 256 characters."
        }

        // Validate street field
        if (!isEditUser && !this.street) {
            formErrors['street'] = "Street field must not be empty."
        } else if (this.street && !stringReg.test(this.street)) {
            formErrors['street'] = "Street must be from 2 to 256 characters."
        }

        // Validate houseNumber field
        if (!isEditUser && !this.houseNumber) {
            formErrors['houseNumber'] = "House Number field must not be empty."
        } else if (this.houseNumber && !numReg.test(this.houseNumber)) {
            formErrors['houseNumber'] = "House Number must be from 2 to 256 Digits."
        }

        // Validate zip field
        if (!isEditUser && !this.zip) {
            formErrors['zip'] = "Zip field must not be empty."
        } else if (this.zip && !numReg.test(this.zip)) {
            formErrors['zip'] = "Zip must be from 2 to 256 Digits."
        }

        return formErrors;
    }

    updateField(fieldName, value) {
        // Check if the field exists in the class instance
        if (this.hasOwnProperty(fieldName)) {
            this[fieldName] = value;
        } else {
            console.warn(`Field ${fieldName} does not exist on this object.`);
        }
    }
}

export default FullUser; 