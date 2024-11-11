import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";
import ProductsPage from ".";


const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(selectProductsPage, (ProductsPage) => ProductsPage.restaurant);

export const retrieveChoseProduct = createSelector(selectProductsPage, (ProductsPage) => ProductsPage.chosenProduct);

export const retrieveProducts = createSelector(selectProductsPage, (ProductsPage) => ProductsPage.products);

