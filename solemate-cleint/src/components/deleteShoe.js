import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";


function DeleteShoe(props) {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [shown, setShown] = useState();
    const API_URL = 'http://localhost:5005';
    const { getUser, getToken } = useContext(AuthContext);

    const { ownerId, shoeId } = props;

    const navigate = useNavigate();

    useEffect(() => {
        const userId = getUser()._id;
        if (userId == ownerId) {
            setShown(true);
        }
    }, [ownerId, getUser]);

    const handleClick = (e) => {
        e.preventDefault();

        axios
            .delete(`${API_URL}/api/shoes/${shoeId}`, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAlertShown(true);
                setAlertText(error.response.data.message);
            });
    }




    return (
        <div hidden={!shown}>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>
            <Button variant="primary" onClick={handleClick}>
                Delete Shoe
            </Button>
        </div>
    )
}

export default DeleteShoe;