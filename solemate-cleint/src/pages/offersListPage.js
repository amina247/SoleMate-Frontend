import { useState, useContext, useEffect } from "react";
import NavigationBar from "../components/navBar";
import { AuthContext } from "../context/auth.context";
import Offer from '../components/offer';

import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function OffersListPage() {

    const { getToken, getUser } = useContext(AuthContext);

    const [offersList, setOffersList] = useState();
    const [alertShown, setAlertShown] = useState();
    const [alertText, setAlertText] = useState();

    const API_URL = 'http://localhost:5005';
    const id = getUser()._id;


    useEffect(() => {
        axios
            .get(`${API_URL}/api/transactions/seller/${id}`, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                console.log('offers', response.data);
                setOffersList(response.data);
            })
            .catch((error) => {
                console.log(error);
                setAlertShown(true);
                setAlertText(error.response.data.message);
            });

    }, []);

    return (

        <div>
            <NavigationBar />
            <h4>your Offers:</h4>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>

            {offersList && (<div>
                {offersList.map((item) => <Offer offer={item} />)}
            </div>)}

        </div>



    )
};

export default OffersListPage;