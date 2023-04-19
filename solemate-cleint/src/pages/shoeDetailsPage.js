import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import DeleteShoe from "../components/deleteShoe";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import NavigationBar from "../components/navBar";
import SendOffer from "../components/sendOffer";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';


function ShoeDetailsPage() {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [shoe, setShoe] = useState();
    const [owner, setOwner] = useState();
    const [updateShown, setUpdateShown] = useState();

    const API_URL = process.env.REACT_APP_SERVER;
    const { getToken, getUser } = useContext(AuthContext);
    const { id } = useParams();

    const navigate = useNavigate();

    const handleUpdateClick = (e) => {
        e.preventDefault();
        navigate(`/edit-shoe/${id}`)
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/api/shoes/${id}`, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                console.log('shoe', response.data);
                setShoe(response.data);

                const ownerId = response.data.owner;
                console.log(ownerId);
                axios
                    .get(`${API_URL}/auth/${ownerId}`, {}, { headers: { 'authorization': `Bearer ${getToken()}` } })
                    .then((response) => {
                        console.log('owner', response.data);
                        setOwner(response.data);
                    })
                    .then(() => {
                        const userId = getUser()._id;
                        if (userId == ownerId) {
                            setUpdateShown(true);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

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

            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol className="col-lg-8 col-md-10 col-sm-12">
                        <MDBCard className="my-5">
                            <MDBCardBody>
                                <MDBCardTitle className="text-center">Shoe Details</MDBCardTitle>
                                <div hidden={!alertShown}>
                                    <Alert key={"danger"} variant={"danger"}>
                                        {alertText}
                                    </Alert>
                                </div>
                                {shoe && (
                                    <div>
                                        <MDBCardText><strong>Shoe Brand:</strong> {shoe.brand}</MDBCardText>
                                        <MDBCardText><strong>Model:</strong> {shoe.model}</MDBCardText>
                                        <MDBCardText><strong>Description:</strong> {shoe.description}</MDBCardText>
                                        <MDBCardText><strong>Shoe Size:</strong> {shoe.size}</MDBCardText>
                                        <MDBCardText><strong>Price:</strong> {shoe.price} €</MDBCardText>
                                        <Image src={shoe.imageUrl} fluid className="mb-3" />
                                        {owner && <MDBCardText><strong>Owned by:</strong> {owner.name}</MDBCardText>}
                                        <div className="d-flex justify-content-end">
                                            <div hidden={!updateShown}>
                                                <Button
                                                    variant="outline-secondary"
                                                    onClick={handleUpdateClick}
                                                    className="me-3 mb-3"> Update Shoe </Button>
                                            </div>
                                            <DeleteShoe ownerId={shoe.owner} shoeId={shoe._id} />
                                        </div>
                                        <SendOffer ownerId={shoe.owner} shoe={shoe} />
                                    </div>
                                )}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );

}

export default ShoeDetailsPage;