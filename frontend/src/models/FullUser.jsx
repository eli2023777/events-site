class FullUser {
    _id;
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

    constructor(_id, first, last, phone, email, password, url, alt,
        state, country, city, street, houseNumber, zip) {
        this._id = _id;
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

    validate = () => {
        const formErrors = {};
        const stringReg = /^.{2,256}$/;
        const nameReg = /^[a-zA-Z0-9]{2,20}$/;
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/;
        const urlReg = /^[\s\S]{14,}$/;
        const phoneReg = /^0([2345789])(-?\d){8,10}$/;;


        // Validate firstName field
        if (!this.first) {
            formErrors['firstName'] = "First Name field must not be empty."
        } else if (!nameReg.test(this.first)) {
            formErrors['firstName'] = "First Name must be from 2 to 256 characters."
        }

        // Validate lastName field
        if (!this.last) {
            formErrors['lastName'] = "Last Name field must not be empty."
        } else if (!nameReg.test(this.last)) {
            formErrors['lastName'] = "Last Name must be from 2 to 256 characters."
        }

        // Validate phone field
        if (!this.phone) {
            formErrors['phone'] = "Phone field must not be empty."
        } else if (!phoneReg.test(this.phone)) {
            formErrors['phone'] = "Phone must be a valid Israeli phone number ."
        }


        // NO NEED for Email Validate, bec. there is a bootstrap validate on that.


        if (!this.password) {
            formErrors['password'] = "'Password' field must not be empty."
        } else if (!passwordRegExp.test(this.password)) {
            formErrors['password'] = "Password must contain at least 7 and max 20 characters and max 20, with upper and lower case letters, numbers and symbols."
        }


        // Validate Image-url field
        if (!this.url) {
            formErrors['url'] = "'Image-url' field must not be empty."
        } else if (!urlReg.test(this.url)) {
            formErrors['url'] = "Image-url must be at lest 14 characters."
        }

        // Validate Image-alt field
        if (!this.alt) {
            formErrors['alt'] = "'Image-alt' field must not be empty."
        } else if (!stringReg.test(this.alt)) {
            formErrors['alt'] = "Image-alt must be from 2 to 256 characters."
        }

        // Validate country field
        if (!this.country) {
            formErrors['country'] = "'Country field must not be empty."
        } else if (!stringReg.test(this.country)) {
            formErrors['country'] = "Country must be from 2 to 256 characters."
        }

        // Validate city field
        if (!this.city) {
            formErrors['city'] = "City field must not be empty."
        } else if (!stringReg.test(this.city)) {
            formErrors['city'] = "City must be from 2 to 256 characters."
        }

        // Validate street field
        if (!this.street) {
            formErrors['street'] = "'Street field must not be empty."
        } else if (!stringReg.test(this.street)) {
            formErrors['street'] = "Street must be from 2 to 256 characters."
        }

        // Validate houseNumber field
        if (!this.houseNumber) {
            formErrors['houseNumber'] = "'House Number field must not be empty."
        } else if (!stringReg.test(this.houseNumber)) {
            formErrors['houseNumber'] = "House Number must be from 2 to 256 Digits."
        }

        // Validate zip field
        if (!this.zip) {
            formErrors['zip'] = "'Zip field must not be empty."
        } else if (!stringReg.test(this.zip)) {
            formErrors['zip'] = "Zip must be from 2 to 256 Digits."
        }

        return formErrors;
    }

    updateField(fieldName, value) {
        if (Object.hasOwnProperty.call(this, fieldName))
            this[fieldName] = value;
    }
}

export default FullUser; 