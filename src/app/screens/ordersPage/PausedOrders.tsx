import TabPanel  from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobal";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

// REDUX SLICE & SELECTOR

const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps{
    setValue: (input:string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const {setValue} = props;
    const { pausedOrders } = useSelector(pausedOrdersRetriever);
    const {authMember, setOrderBuilder} = useGlobals();

/** HANDLERS **/
    const deleteOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId, 
                orderStatus: OrderStatus.DELETE
            };
            const confirmation = window.confirm("Do want to delete the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrders(input);
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err)
            .then();
            
        }
    };

    /** HANDLERS **/
    const processOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId, 
                orderStatus: OrderStatus.PROCESS
            };
    
            const confirmation = window.confirm(
                "Do want to proceed with payment?"
            );
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrders(input);
                setValue("2");
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err)
            .then();
            
        }
    };

    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order.orderItems?.map((item: OrderItem) => {
                                    const product: Product = order.productData.filter(
                                        (ele: Product) => item.productId === ele._id)[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img 
                                            src={"/img/lavash.webp"}
                                            className={"order-dish-img"}
                                             />
                                             <p className={"title-dish"}>{product.productName}</p>
                                             <Box className={"price-box"}>
                                                <p>{item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{item.itemQuantity}</p>
                                                <img src="/icons/pause.svg"/>
                                                <p style={{marginLeft: "15px"}}>${item.itemQuantity * item.itemPrice}</p>
                                             </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}} alt="" />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img src={"/icons/pause.svg"} style={{marginLeft: "20px"}} />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <Button 
                                variant="contained"
                                color="secondary"
                                className={"cancel-button"}
                                onClick={deleteOrderHandler}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                value = {order._id}
                                variant="contained"
                                className={"pay-button"}
                                onClick={processOrderHandler}
                                >
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!pausedOrders || (pausedOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img 
                        src={"/icons/noimage-list.svg"}
                        alt=""
                        style={{width: 300, height: 300}}
                          />
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    )
}