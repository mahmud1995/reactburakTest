import React, { useEffect } from "react";
import Statistics from "./Statistcs";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUser from "./ActiveUser";
import Events from "./Events";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { setNewDishes, setPopularDishes } from "./slice";
import { setTopUsers } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { retrievePopularDishes } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/home.css"
import MemberService from "../../services/MemberService"
import {Member} from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
    setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
    setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});
    

// import './css/home.css'
export default function HomePage() {
    // const { setPopularDishes } = actionDispatch(useDispatch);
    // const { popularDishes} = useSelector(popularDishesRetriever)
    const {setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());
    
    console.log("process.env.REACT_APP_API_URL:",process.env.REACT_APP_API_URL);
    useEffect(() => {
        // Backend server data FETCH => DATA
        const product = new ProductService();
        product.getProducts({
            page: 1,
            limit: 4,
            order: "prductViews",
            productCollection: ProductCollection.DISH,
        }).then(data => {
            setPopularDishes(data);
        }).catch((err) => console.log(err));

        product.getProducts({
            page: 1,
            limit: 4,
            order: "createdAt",
            // productCollection: ProductCollection.DISH,
        }).then(data => {
            console.log("data passed here:", data);
            setNewDishes(data);
        }).catch((err) => console.log(err));

        const member = new MemberService();
        member
            .getTopUsers()
            .then((data) => setTopUsers(data))
            .catch((err) => console.log(err));
    }, []);



    return <div className={"home-page"}>
        <Statistics />
        <PopularDishes />
        <NewDishes />
        <Advertisement />
        <ActiveUser />
        <Events />
    </div>
}