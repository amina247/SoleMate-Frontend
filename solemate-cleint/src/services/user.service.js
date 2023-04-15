import axios from "axios";

const API_URL = 'http://localhost:5005';

function signUp(email, password, name) {
    const requestBody = { email, password, name };

    axios
        .post(`${API_URL}/signup`, requestBody)
        .then((response) => {
            // Reset the state to clear the inputs
            setTitle("");
            setDescription("");

            // Invoke the callback function coming through the props
            // from the ProjectDetailsPage, to refresh the project details
            props.refreshProject();
        })
        .catch((error) => console.log(error));

};