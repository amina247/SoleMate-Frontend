import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from "../components/navBar";


function ShoeListPage() {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [shoeList, setShoeList] = useState();

    const API_URL = 'http://localhost:5005';

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

            <h1>Shoe Collection</h1>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>

            {shoeList && (<div>
                {shoeList.map((shoe) => {
                    return (
                        <div>
                            <Image src={shoe.imageUrl} fluid onClick={() => { navigate(`/shoe-details/${shoe._id}`) }} />
                            <p>shoe Brand :{shoe.brand}</p>
                            <p>Model: {shoe.model}</p>
                            <p>Description: {shoe.description}</p>
                        </div>
                    )
                })
                }
            </div>)}
        </div>
    );
}

export default ShoeListPage;