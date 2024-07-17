import React from "react";

const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>

const PagesIcon = <i className="bx bx-file-blank side-menu__icon"></i>

const TaskIcon = <i className="bx bx-task side-menu__icon"></i>

const AuthenticationIcon = <i className="bx bx-fingerprint side-menu__icon"></i>

const ErrorIcon = <i className="bx bx-error side-menu__icon"></i>

const UiElementsIcon = <i className="bx bx-box side-menu__icon"></i>

const Utilities = <i className="bx bx-medal side-menu__icon"></i>

const FormsIcon = <i className="bx bx-file  side-menu__icon"></i>

const AdvancedUiIcon = <i className="bx bx-party side-menu__icon"></i>

const WidgetsIcon = <i className="bx bx-gift side-menu__icon"></i>

const AppsIcon = <i className="bx bx-grid-alt side-menu__icon"></i>

const NestedmenuIcon = <i className="bx bx-layer side-menu__icon"></i>

const TablesIcon = <i className="bx bx-table side-menu__icon"></i>

const ChartsIcon = <i className="bx bx-bar-chart-square side-menu__icon"></i>

const MapsIcon = <i className="bx bx-map side-menu__icon"></i>

const Icons = <i className="bx bx-store-alt side-menu__icon"></i>

const badge = <span className="badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2">12</span>
const badge1 = <span className="text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2">New</span>
const badge2 = <span className="text-danger text-[0.75em] rounded-sm badge !py-[0.25rem] !px-[0.45rem] !bg-danger/10 ms-2">Hot</span>
const badge4 = <span className="text-success text-[0.75em] badge !py-[0.25rem] !px-[0.45rem] rounded-sm bg-success/10 ms-2">3</span>

export const MenuItems: any = [
    {
        menutitle: "MAIN",
    },

    {
        icon: DashboardIcon, badgetxt: badge, title: 'Dashboards', type: "sub", active: false, children: [
            { path: "/components/dashboards/ecommerce", type: "link", active: false, selected: false, title: "Ecommerce" },

        ]
    },

    {
        menutitle: "USER",
    },
    {
        icon: NestedmenuIcon, title: "User", type: "sub", active: false, selected: false, children: [

            {
                title: "User", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "../users/newUser", active: false, selected: false, title: "Add User" },
                    { type: "link", path: "../users/listUser", active: false, selected: false, title: "List User" },

                ]
            },

            {
                title: "Customer", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "../users/newCustomer", active: false, selected: false, title: "Add Customer" },
                    { type: "link", path: "../users/listCustomer", active: false, selected: false, title: "List Customer" },

                ]
            },
        ]
    },

    {
        menutitle: "PRODUCT",
    },
    {
        icon: NestedmenuIcon, title: "Product", type: "sub", active: false, selected: false, children: [

            {
                title: "Brand", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "#!!", active: false, selected: false, title: "Add Brand" },
                    { type: "link", path: "", active: false, selected: false, title: "List Brands" },

                ]
            },

            {
                title: "Categories", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "#!!", active: false, selected: false, title: "Add Category" },
                    { type: "link", path: "", active: false, selected: false, title: "List Categories" },

                ]
            },
            {
                title: "Product", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "#!!", active: false, selected: false, title: "Add Product" },
                    { type: "link", path: "", active: false, selected: false, title: "List Products" },

                ]
            },
            {
                title: "Collections", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "#!!", active: false, selected: false, title: "Add Collections" },
                    { type: "link", path: "", active: false, selected: false, title: "List Collections" },

                ]
            },
            { path: "/components/forms/form-layouts", type: "link", active: false, selected: false, title: "Option Sets" },
            { path: "/components/forms/form-layouts", type: "link", active: false, selected: false, title: "Reviews" },
            { path: "/components/forms/form-layouts", type: "link", active: false, selected: false, title: "Linked Products" },
            { path: "/components/forms/form-layouts", type: "link", active: false, selected: false, title: "Price Override" },
            { path: "/components/forms/form-layouts", type: "link", active: false, selected: false, title: "Price enquires" },
        ]
    },
    {
        menutitle: "MARKETING",
    },
    {
        icon: NestedmenuIcon, title: "Marketing", type: "sub", active: false, selected: false, children: [

            { title: "Marketing Tools", path: "#!", type: "link", active: false, selected: false },
            { title: "Discounts", path: "#!", type: "link", active: false, selected: false },
            { title: "Coupon Codes", path: "#!", type: "link", active: false, selected: false },
            { title: "Mailing Lists", path: "#!", type: "link", active: false, selected: false },
        ]
    },
    {
        menutitle: "DELIVERY",
    },
    {
        icon: NestedmenuIcon, title: "Delivery", type: "sub", active: false, selected: false, children: [
            { title: "Delevry Charges", path: "#!", type: "link", active: false, selected: false },
        ]
    },

    {
        menutitle: "ORDER",
    },
    {
        icon: NestedmenuIcon, title: "Order", type: "sub", active: false, selected: false, children: [

            { title: "Unchecked", path: "#!", type: "link", active: false, selected: false },
            { title: "Open", path: "#!", type: "link", active: false, selected: false },
            { title: "Confirmed", path: "#!", type: "link", active: false, selected: false },
            { title: "Dispatched", path: "#!", type: "link", active: false, selected: false },
            { title: "Delivered", path: "#!", type: "link", active: false, selected: false },
            { title: "Cancelled", path: "#!", type: "link", active: false, selected: false },
            { title: "Rejected", path: "#!", type: "link", active: false, selected: false },
            { title: "Returned", path: "#!", type: "link", active: false, selected: false },
            { title: "Payment Pending", path: "#!", type: "link", active: false, selected: false },
            { title: "Refund", path: "#!", type: "link", active: false, selected: false },
            { title: "All Orders", path: "#!", type: "link", active: false, selected: false },
            { title: "Create Order", path: "#!", type: "link", active: false, selected: false },
        ]
    },
    {
        menutitle: "REPORTS",
    },
    {
        icon: NestedmenuIcon, title: "Reports", type: "sub", active: false, selected: false, children: [

            {
                title: "Sales", type: "sub", menusub: true, active: false, selected: false, children: [
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by product" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by categories" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by collections" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by customer" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by countries" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by state" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by city" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by product seller" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by descount" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by payment methods" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by currency" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by language" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by device" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by financial status" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by status" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Average Order Value" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "New vs Returning User Sales" },
                ],
            },
            {
                title: "Customer", type: "sub", menusub: true, active: false, selected: false, children: [
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "User Count by Roles" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "First time vs Returning customer sales" },

                ],
            },

            {
                title: "Products", type: "sub", menusub: true, active: false, selected: false, children: [
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Product by Brands" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Product by categories" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Out of stock Products" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Low Stock Products" },
                ],
            },

            {
                title: "Legacy", type: "sub", menusub: true, active: false, selected: false, children: [
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "COD vs Online" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Best Selling Products" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Recent Orders" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Order Summary" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Top Customers" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Sales by Location" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Monthly Revenue" },
                    { path: "/components/forms/formeditors/quill-editor", type: "link", active: false, selected: false, title: "Stock Out" },

                ],
            },
        ]
    },
    {
        menutitle: "CMS"
    },

    {
        icon: NestedmenuIcon, title: "CMS", type: "sub", active: false, selected: false, children: [

            { title: "Offer Bar", path: "#!", type: "link", active: false, selected: false },
            { title: "Banner", path: "#!", type: "link", active: false, selected: false },
            { title: "Offer Cart", path: "#!", type: "link", active: false, selected: false },
            { title: "Blog", path: "#!", type: "link", active: false, selected: false },
            { title: "Feedback", path: "#!", type: "link", active: false, selected: false },
            {
                title: "Pages", type: "sub", active: false, selected: false, children: [

                    { type: "link", path: "#!!", active: false, selected: false, title: "About us" },
                    { type: "link", path: "", active: false, selected: false, title: "Contact Us" },
                    { type: "link", path: "#", active: false, selected: false, title: "Term & Conditions" },

                ]
            },
        ]
    },

];
export default MenuItems
