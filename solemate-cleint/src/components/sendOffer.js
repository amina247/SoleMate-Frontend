import { AuthContext } from "../context/auth.context";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";


function SendOffer(props) {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [successAlertShown, setSuccessAlertShown] = useState(false);
    const [shown, setShown] = useState();
    const [offer, setOffer] = useState();


    const { getUser, getToken } = useContext(AuthContext);
    const { ownerId, shoe } = props;
    const API_URL = process.env.REACT_APP_SERVER;


    useEffect(() => {
        const userId = getUser()._id;
        if (userId != ownerId && shoe.forSale) {
            setShown(true);
        }
    }, [ownerId, getUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sending offer of: ', offer);
        const userId = getUser()._id;

        const requestBody = { buyer: userId, seller: shoe.owner, shoe: shoe._id, price: offer };

        axios
            .post(`${API_URL}/api/transactions`, requestBody, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                console.log(response.data._id);
                setSuccessAlertShown(true);
                setAlertShown(false);
            })
            .catch((error) => {
                console.log(error);
                setAlertShown(true);
                setSuccessAlertShown(false);
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
            <div hidden={!successAlertShown}>
                <Alert key={"success"} variant={"success"}>
                    Your offer is sent to the seller! They will contact you soon!
                </Alert>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>enter your offer Here:</Form.Label>
                    <Form.Control type="number"
                        onChange={(event) => setOffer(event.target.value)} />
                </Form.Group>
                <Button variant="secondary" type="submit" className="mt-2">
                    Send Offer
                </Button>
            </Form>
        </div>
    )
}

export default SendOffer;