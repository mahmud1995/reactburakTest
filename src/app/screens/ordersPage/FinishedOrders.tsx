import React from "react";
import TabPanel  from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

export default function FinishedOrders() {
    return (
        <TabPanel value={"3"}>
        <Stack>
            {[].map((ele, index) => {
                return (
                    <Box key={index} className={"order-main-box"}>
                        <Box className={"order-box-scroll"}>
                            {[1, 2, 3].map((order, index1) => {
                                return (
                                    <Box key={index1} className={"orders-name-price"}>
                                        <img 
                                        src={"/img/lavash.webp"}
                                        className={"order-dish-img"}
                                         />
                                         <p className={"title-dish"}>Lavash</p>
                                         <Box className={"price-box"}>
                                            <p>$9</p>
                                            <img src={"/icons/close.svg"} />
                                            <p>2</p>
                                            <img src="/icons/pause.svg"/>
                                            <p style={{marginLeft: "15px"}}>$24</p>
                                         </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                        <Box className={"total-price-finish"}>
                            <Box className={"box-total"}>
                                <p>Product price</p>
                                <p>$18</p>
                                <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}} alt="" />
                                <p>Delivery cost</p>
                                <p>$2</p>
                                <img src={"/icons/pause.svg"} style={{marginLeft: "20px"}} />
                                <p>Total</p>
                                <p>$20</p>
                            </Box>
                        </Box>
                    </Box>
                );
            })}

            {true && (
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <img 
                    src={"/icons/noimage-list.svg"}
                    alt=""
                    style={{width: 300, height: 300}}
                      />
                </Box>
            )}
        </Stack>
    </TabPanel>
    )
}