// import React from 'react'
import MenuAppBar from '../Components/header'

// export default function Layout() {
//     return (
//         <div>
//             <MenuAppBar/>
//         </div>
//     )
// }

import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Sidebar from "../Components/SideBar";
import Home from '../Features/Home';
// import { Sidebar } from "Components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  main: {
    backgroundColor: theme.palette.background.main,
    maxHeight: "100vh",
    overflow: "hidden",
    width:'94.5% !important',
    maxWidth: '94.5% !important',
    flexBasis: '94.5% !important',
  },
  sidebar:{
    width:'5.5% !important',
    maxWidth: '5.5% !important',
    flexBasis: '5.5% !important',
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <Home/>
   
  );
};

export default Layout;
