import React from "react";
import TabPanel  from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import {retrieveProcessOrders} from "./selector";
import {Product} from "../../../lib/types/product";
import {serverApi, Messages} from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobal";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";



/** REDUX SLICE & SELECTOR */
const processOrdersRetriever = createSelector(retrieveProcessOrders,
    (processOrders) => ({ processOrders })
);

interface ProcesOrdersProps{
    setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcesOrdersProps) {
    const  {setValue} = props;
    const {processOrders} = useSelector(processOrdersRetriever);
    const {authMember, setOrderBuilder} = useGlobals();
    
    /** HANDLERS **/
    const finishOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);

            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId, 
                orderStatus: OrderStatus.FINISH
            };
    
            const confirmation = window.confirm(
                "Have you received your order?"
            );
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrders(input);
                setValue("3");
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err)
            .then();
            
        }
    };

    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                            {order?.orderItems?.map((item: OrderItem) => {
                                    const product: Product = order.productData.filter(
                                        (ele: Product) => item.productId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img 
                                            src={imagePath}
                                            className={"order-dish-img"}
                                             />
                                             <p className={"title-dish"}>{product.productName}</p>
                                             <Box className={"price-box"}>
                                                <p>${item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} style={{marginLeft: "3px"}} />
                                                <p style={{marginLeft: "3px"}}>{item.itemQuantity}</p>
                                                <img style={{marginLeft: "3px"}} src="/icons/pause.svg"/>
                                                <p style={{marginLeft: "3px"}}>${item.itemQuantity * item.itemPrice}</p>
                                             </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{marginLeft: "5px"}} alt="" />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img src={"/icons/pause.svg"} style={{marginLeft: "5px"}} />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <p className="moment-data">
                                    {moment().format("YY-MM-DD, HH:mm")}
                                </p>
                                <Button 
                                value = {order._id}
                                variant="contained"
                                className={"verify-button"}
                                onClick={finishOrderHandler}
                                >
                                    VERIFY TO FULFILL
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!processOrders || (processOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img 
                        src={"/icons/noimage-list.svg"}
                        alt=""
                        style={{width: 300, height: 300}}
                          />
                    </Box>
                ))};
            </Stack>
        </TabPanel>
    )
}