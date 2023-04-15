import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import DeleteShoe from "../components/deleteShoe";
import Alert from 'react-bootstrap/Alert';


function ShoeDetailsPage() {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [shoe, setShoe] = useState();
    const [owner, setOwner] = useState();

    const API_URL = 'http://localhost:5005';
    const { getToken } = useContext(AuthContext);
    const { id } = useParams();


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
            <h1>Shoe Details Page</h1>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>
            {shoe && (<div>
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