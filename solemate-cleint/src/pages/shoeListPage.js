import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from "../components/navBar";


function ShoeListPage() {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [shoeList, setShoeList] = useState();

    const API_URL = process.env.REACT_APP_SERVER;

    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get(`${API_URL}/api/shoes/`)
            .then((response) => {
                console.log('shoe', response.data);
                setShoeList(response.data);
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

            <h1 className="text-center my-4">Shoe Collection</h1>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>

            <MDBContainer>
                <MDBRow>
                    {shoeList && shoeList.map((shoe) => {
                        return (
                            <MDBCol key={shoe._id} className="col-lg-6 col-md-6 mb-4">
                                <MDBCard onClick={() => { navigate(`/shoe-details/${shoe._id}`) }} style={{ cursor: "pointer" }}>
                                    <MDBCardImage src={shoe.imageUrl} position="top" alt="shoe_image" />
                                    <MDBCardBody>
                                        <MDBCardTitle>{shoe.brand}</MDBCardTitle>
                                        <MDBCardText>
                                            Model: {shoe.model} <br />
                                            Description: {shoe.description}
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        )
                    })}
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default ShoeListPage;