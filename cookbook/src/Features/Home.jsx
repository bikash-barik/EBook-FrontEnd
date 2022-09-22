import React from "react";
import Footer from "../Components/Footer";

import MenuAppBar from "../Components/header";
import PreviewCode from "./Modules/PreviewCode";
import CreateFeature from '../Features/Modules/CreateFeature'
import { useSelector } from "react-redux";
import EditFeature from "./Modules/EditFeature";
export default function Home() {
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue } = useSelector(state => state.dashboardReducer);


  console.log(details, headerValue)
  return (
    <div>
      {/* <MenuAppBar> */}
      <>



        {/* {editpreview &&
          <EditFeature editPreviewdetails={editPreviewdetails} />} */}
      </>
    </div>
  );
}
