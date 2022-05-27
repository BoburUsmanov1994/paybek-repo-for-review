import React from "react";
import { createGlobalStyle } from "styled-components";
import "react-confirm-alert/src/react-confirm-alert.css";

export default createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}

body {

  font-weight: 400;
  font-size: 16px;
  color: #585757;
  background: #F7F7F7;
  line-height: 1.25;
  font-family: 'Inter', sans-serif;
}
.p-30{
  padding: 5px 15px !important;
}

.mb-2 {
  margin-bottom: 2px !important;
}

.mb-8 {
  margin-bottom: 8px !important;
}

.mb-16 {
  margin-bottom: 16px !important;
}

.mr-4 {
  margin-right: 4px !important;
}

.mr-8 {
  margin-right: 8px !important;
}

.ml-2 {
  margin-left: 2px !important;
}

.ml-4 {
  margin-left: 4px !important;
}

.ml-8 {
  margin-left: 8px !important;
}

.ml-16 {
  margin-left: 16px !important;
}

.mr-16 {
  margin-right: 16px !important;
}

.mb-24 {
  margin-bottom: 24px !important;
}

.mb-32 {
  margin-bottom: 32px !important;
}

.mb-48 {
  margin-bottom: 48px !important;
}

.mt-48 {
  margin-top: 48px !important;
}

.mt-32 {
  margin-top: 32px !important;
}

.mt-24 {
  margin-top: 24px !important;
}
.mt-16{
  margin-top: 16px !important;
}

.pt-25 {
  padding-top: 25px !important;
}

.my-16 {
  margin-top: 16px !important;
  margin-bottom: 32px !important;
}

.p-50 {
  padding: 50px !important;
}

.p-50-minus {
  margin-right: -65px !important;
  margin-left: -65px !important;
}
.mr-24{
  margin-right: 32px !important;
}
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.visibility-hidden {
  visibility: hidden;
}

.minWidth-tdPhone {
  min-width: 180px;
}

.cursor-pointer {
  cursor: pointer;
}
.react-datepicker{
  display: flex;
}
.base-input{
  box-shadow: 0px 1px 1px rgb(0 0 0 / 6%);
  border-radius: 8px;
  border: 1px solid #E8E8E8;
  padding: 8px 12px;
  outline: none;
  color: #1C1C1C;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
}
.reset__link {
  color: #969696;
  font-size: 16px;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #0085FF;
  }
}
.d-none{
  display: none;
}
.img-fluid{
  max-width: 100%;
  height: auto;
}
.pg-detail hr{
  border-bottom: 1px solid #E8E8E8 !important;
}

@media print
{
  .no-print, .no-print *
  {
    display: none !important;
  }
  .print{
    width: 1800px !important;
    background-color:red;
    max-width: unset !important;
    flex: 0 0 100% !important;
  }
  .pg-detail{
    box-shadow: unset;
  }
}

`;
