import { useState, useContext, useEffect } from "react";
import NavigationBar from "../components/navBar";
import { AuthContext } from "../context/auth.context";
import Offer from '../components/offer';

import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';


function OffersListPage() {

    const { getToken, getUser } = useContext(AuthContext);

    const [offersList, setOffersList] = useState();
    const [alertShown, setAlertShown] = useState();
    const [alertText, setAlertText] = useState();

    const API_URL = process.env.REACT_APP_SERVER;
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
            <h1 className="text-center my-4">Your Offers</h1>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>

            <MDBContainer>
                <MDBRow>
                    {offersList && offersList.map((item) => (
                        <MDBCol key={item._id} className="col-lg-6 col-md-6 mb-4">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{item.shoe.brand}</MDBCardTitle>
                                    <MDBCardText>
                                        Model: {item.shoe.model} <br />
                                        Description: {item.shoe.description}
                                    </MDBCardText>
                                    <Offer offer={item} />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>
        </div>
    )
};

export default OffersListPage;
