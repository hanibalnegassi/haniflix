import { useEffect, useState } from "react";
import "./thankyou.scss";
import { Box } from "@mui/material";
import CryptoES from 'crypto-es';
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../store/rtk-query/authApi";


const ThankYouPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const session_id = searchParams.get("session_id");
    const [login, loginState] = useLoginMutation();

    const api_url = import.meta.env.VITE_APP_API_URL;
    useEffect(() => {
        console.log(" i ran ");
        if (success) {
            let email = localStorage.getItem('haniemail')
            let password = localStorage.getItem('hanipassword')
            let username = localStorage.getItem('haniusername')
            console.log(email)
            if (email) {

                const hashEmail = CryptoES.SHA256(email).toString()
                let time = Math.floor(Date.now() / 1000)

                let data = JSON.stringify({
                    "data": [
                        {
                            "event_name": 'Purchase',
                            "event_time": time,
                            "action_source": "website",
                            "user_data": {
                                "em": [
                                    hashEmail
                                ]
                            },
                            "custom_data":
                            {
                                "currency": "USD",
                                "value": 0.99
                            }
                        }
                    ],
                });

                let config = {
                    method: 'post',
                    url: 'https://graph.facebook.com/v17.0/463413816189920/events?access_token=EAAGBZCN2k3EMBOZB158dnZBdNFUH9K8w56mjOKwtyDhLbE5D0LpAfBfY2PqOxEZCT0r4B3fGyLzwMrKvcjDnjcqu2fXbUHSH66hPVtDspey8KDGD1zkDlcZB6IIdc6jW4dE20IoChikN3UF7yGwMdZBkwWAB6ii8HyMyQABCwhYCcOk26vQrvQGoarlOAvTDwv9wZDZD',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

            const getQueryParams = () => {
                const params = new URLSearchParams(window.location.search);
                return {
                    subscriptionId: params.get('sub'),
                };
            };

            const { subscriptionId } = getQueryParams();
            axios
                .post(api_url + "auth/v1/payment-success", {
                    subscriptionId: subscriptionId,
                    email,
                    password,
                    username,
                })
                .then(async (res) => {
                    // alert();
                    Swal.fire({
                        title: "Success",
                        text: "Success! Check your email for the invoice. You can proceed to login",
                        icon: "success",
                    });
                    const savedEmail = localStorage.getItem("haniemail");
                    const savedPassword = localStorage.getItem("hanipassword");

                    console.log(savedEmail, "savedEmail");
                    console.log(savedPassword, "savedPassword");
                    await onLogin(savedEmail, savedPassword);
                    console.log(" after trying to login");
                    console.log(res.data.message);
                })

                .catch((e) => {
                    Swal.fire({
                        title: "Success",
                        text: e.error,
                        icon: "success",
                    });
                    console.log(e.error);
                });
        }
    }, [])

    const onLogin = async (email: string, password: string) => {
        console.log("i tried logging in");
        const res = await login({ email, password });
        console.log(res)
        if (res?.data) {
            console.log("Login successful");
            navigate('/')
        }

        if (!res?.data) {
            Swal.fire({
                title: res?.error.message || "Error encountered during login",
                text: res?.error.message,
                icon: "error",
            });
        }
    };
    return (
        <>
            <div className="loginNew">
            <div className="absolute pointer-events-none top-0 right-0 left-0 h-[60px] bg-gradient-to-b from-black to-transparent"></div>

                <Box
                    className="top ml-[40px] mr-[40px]"
                >
                    <div
                        className=" wrapperflex items-center justify-between "
                    >
                        <a href={"/"} style={{ textDecoration: "none" }} className="link">
                            <h1> <span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>

                        </a>

                    </div>
                </Box>

                <div className="section">
                    <div className="intro-section-thq">
                        <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
                            Thank You!
                        </h2>
                        <p className="text-white text-center m-[20px]">You have successfully registered, you would be redirected to dashboard.</p>
                    </div>
                </div>
            </div>
        </>
    );

}
export default ThankYouPage;
