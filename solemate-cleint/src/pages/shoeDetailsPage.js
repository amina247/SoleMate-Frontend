import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import DeleteShoe from "../components/deleteShoe";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import NavigationBar from "../components/navBar";


function ShoeDetailsPage() {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [shoe, setShoe] = useState();
    const [owner, setOwner] = useState();
    const [updateShown, setUpdateShown] = useState();

    const API_URL = 'http://localhost:5005';
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

            <h1>Shoe Details Page</h1>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>
            {shoe && (<div>
                <div hidden={!updateShown}>
                    <Button variant="primary" onClick={handleUpdateClick}>
                        Update Shoe
                    </Button>
                </div>
                <DeleteShoe ownerId={shoe.owner} shoeId={shoe._id} />
                <p>shoe Brand :{shoe.brand}</p>
                <p>Model: {shoe.model}</p>
                <p>{shoe.createdAt}</p>
                <p>{shoe.description}</p>
                <p>{shoe.size}</p>
                <p>{shoe.price}</p>
                <Image src={shoe.imageUrl} fluid />
                {owner && <p>{owner.name}</p>}
            </div>)}
        </div>
    );
}

export default ShoeDetailsPage;