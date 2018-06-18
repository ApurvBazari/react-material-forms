const sampleData = [{
    "label": "Sample Form",
    "name": "form1",
    "registerFields": [
        {
            "name": "name",
            "type": "string",
            "label": "Full Name",
            "placeholder": "Enter your first & last name",
            "isRequired": true
        },
        {
            "name": "email",
            "type": "string",
            "label": "Email ID",
            "placeholder": "enter your enail ID",
            "isRequired": true,
            "pattern": "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}",
            "errorText": "Invalid Email!"
        },
        {
            "name": "phone",
            "type": "number",
            "label": "Mobile Number",
            "placeholder": "enter your 10-digit mobile number",
            "isRequired": true,
            "pattern": "[0-9]{10}$",
            "errorText": "Enter 10 digit number"
        },
        {
            "name": "languages",
            "type": "select",
            "isMultiple": true,
            "label": "Languages you know : ",
            "errorText": "Select atleast one value",
            "required": true,
            "payload": ["English", "Urdu", "Hindi", "Bengali", "Marathi", "Hebrew"]
        },
        {
            "name": "interests1",
            "type": "checkboxGroup",
            "label": "Choose your Interests : ",
            "required": true,
            "payload": ["sports", "games", "music"],
            "errorText": "Select atleast one Value"
        },
        {
            "name": "photo",
            "type": "file",
            "label": "Upload your photo",
            "placeholder": "Only supports images now!",
            "helperText": "Will send the file data back as blob",
            "required": true,
            "errorText": "Upload the correct format!!",
        },
        {
            "name": "gender",
            "type": "radioGroup",
            "label": "Gender",
            "required": true,
            "payload": [
                {
                    "name": "male",
                    "label": "Male",
                    "disabled": false,
                },
                {
                    "name": "female",
                    "label":"Female",
                    "disabled": false
                },
                {
                    "name": "others",
                    "label":"Others",
                    "disabled": true
                }
            ]
        },
        {
            "name": "password",
            "type": "password",
            "label": "Password",
            "placeholder": "set your password",
            "pattern": "[0-9a-zA-Z]{6,}",
            "isRequired": true,
            "errorText": "Minimum of 6 charecters is required"
        },
        {
            "name": "passwordCheck",
            "type": "password",
            "label": "Re-enter Password",
            "placeholder": "re-enter your password",
            "isRequired": true
        },
        {
            "name": "car",
            "type": "string",
            "label": "Car Model",
            "placeholder": "name of the car you have"
        }
    ]}
]