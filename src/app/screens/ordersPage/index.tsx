import React, { SyntheticEvent, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from  "@mui/lab/TabPanel";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import { Order } from "../../../lib/types/order";
import "../../../css/orders.css";
import { useDispatch } from "react-redux";
/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});
    

export default function OrdersPage() {
    // React Hook lari haqida kelajakda gaplashamiz
    const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
    const [value, setValue] = useState("1"); // by default 1chi panel ni och mantigi

     /*  HANDLERS */

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    };
    return (
        <div className={"order-page"}>
            <Container className={"order-container"}>
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-new-frame"}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    className={"table_list"}
                                >
                                    <Tab label="PAUSED ORDERS" value={"1"} />
                                    <Tab label="PROCESS ORDERS" value={"2"} />
                                    <Tab label="FINISHED ORDERS" value={"3"} />
                                </Tabs>
                            </Box>
                        </Box>
                        <Stack className={"order-main-content"}>
                            {/* <PausedOrders />
                            <ProcessOrders />
                            <FinishedOrders /> */}
                            <TabPanel value={"1"}>
                                <PausedOrders />
                            </TabPanel>
                            <TabPanel value={"2"}>
                                <ProcessOrders />
                            </TabPanel>
                            <TabPanel value={"3"}>
                                <FinishedOrders />
                            </TabPanel>
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order-rigth"}>
                    <Box className={"order-info"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={"/icons/default-user.svg"}
                                    className={"order-user-avatar"}
                                />
                                <div className={"order-user-icon-box"}>
                                    <img
                                        src={"/icons/default-user.svg"}
                                        className={"order-user-prof-img"}
                                    />
                                </div>
                            </div>
                            {/* <span className={"order-user-name"}>
                                {" "}
                                {authMember?.memberNick}
                            </span>
                            <span className={"order-user-name"}>
                                {" "}
                                {authMember?.memberType}
                            </span> */}
                        </Box>
                        <Box className={"liner"}></Box>
                        <Box className={"order-user-address"}>
                            <div style={{ display: "flex" }}>
                                <LocationOnIcon />
                            </div>
                            <div className={"spec-address-txt"}>
                                    {/* {authMember?.memberAddress
                                    ? authMember.memberAddress
                                    : "Do not exist"} */}
                            </div>
                        </Box>
                    </Box>
                    <Box className={"order-info-box"} sx={{ mt: "15px" }}>
                        <input
                            type={"text"}
                            name={"cardNumber"}
                            placeholder={"Card number : **** 4090 2002 7495"}
                            className={"card-input"}
                        />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                    <input
                        type={"text"}
                        name={"cardPeriod"}
                        placeholder={"07 / 24"}
                        className={"card-half-input"}
                    />
                    <input
                        type={"text"}
                        name={"cardCVV"}
                        placeholder={"CVV : 010"}
                        className={"card-half-input"}
                    />
                </div>
                <input
                type={"text"}
                name={"cardCreator"}
                placeholder={"Justin Robertson"}
                className={"card-input"}
                />
                <div className={"cards-box"}>
                <img src={"/icons/western-card.svg"} />
                <img src={"/icons/master-card.svg"} />
                <img src={"/icons/paypal-card.svg"} />
                <img src={"/icons/visa-card.svg"} />
                </div>
            </Box>
            </Stack>
        </Container>
    </div>
    );
}