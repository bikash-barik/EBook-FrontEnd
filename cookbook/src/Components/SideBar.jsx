// import React from "react";
// import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Notification from "../Features/Notifications/Notification";
// import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { Box, Grid, Menu, MenuItem, styled, TextField } from "@material-ui/core";
// import GmailTreeView from "../Components/Treeview";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import { useHistory } from "react-router-dom";
// import Footer from "../Components/Footer";
// import axios from "axios";
// import API_BASE_URL from "../Config/config";
// import ActionMenu from "../../src/Redux/actions/Menuaction";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// //   import MenuIcon from "@material-ui/icons/Menu";

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   floatingLabelFocusStyle: {
//     color: "white"
//   },
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     background: "#3f51b5",
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     background: "#3f51b5",

//   },
//   drawerContainer: {
//     // overflow: "auto",
//     background: "#3f51b5",
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     width: '100%',

//   },
//   notchedOutline: {
//     borderWidth: "1px",
//     borderColor: "yellow !important",

//   },
//   inputRoot: {
//     color: "white",

//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     }
//   },

// }));


// const StyledAutocomplete = styled(Autocomplete)({
//   "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
//     // Default transform is "translate(14px, 20px) scale(1)""
//     // This lines up the label with the initial cursor position in the input
//     // after changing its padding-left.
//     transform: "translate(34px, 20px) scale(1);"
//   },
//   "& .MuiAutocomplete-inputRoot": {
//     color: "white",
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     }
//   }
// });

// export default function ClippedDrawer({ children }) {
//   const classes = useStyles();
//   //   const classes = useStyles();
//   const theme = useTheme();

//   const [isOpened, setIsOpened] = React.useState(true);

//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const openview = Boolean(anchorEl);
//   const [menuList, setmenuList] = React.useState([]);
//   const [dropdown, setdropdown] = React.useState({ name: 'Oracle To Postgres' });
//   const dispatch = useDispatch();
//   const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
//   const history = useHistory()
//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     //  localStorage.clear()
//     //  history.push('/')
//   };

//   const handleroute = () => {
//     setAnchorEl(null);
//     localStorage.clear()
//     history.push('/')

//   }
//   const getmenus = async (value) => {
//     const res = await axios.get(`${API_BASE_URL}/fol/${value}`);
//     setmenuList(res.data);
//   };

//   React.useEffect(() => {
//     getmenus(1);
//   }, []);

//   const handleversion = (v) => {
//     getmenus(v.code);
//     setdropdown(v)

//     dispatch(ActionMenu.dropdown(v));
//   };

//   const deleteitem = async (data) => {
    

//     const res = await axios.delete(`${API_BASE_URL}/delete/${data.Feature_Id}`);
//     getmenus(1);
//     setNotify({
//       isOpen: true,
//       message: 'Deleted Successfully',
//       type: 'success'
//     })
//     // window.location.href ='/dashboard'

//   }
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <Grid
//             container
//             direction="row"
//             spacing={10}
//             style={{ paddingLeft: "3rem" }}
//           >
//             <Grid item

//               onClick={() => history.push('/dashboard')}
//             >
//               <Typography variant="h6" className={classes.title}>
//                 Cookbook
//               </Typography>
//             </Grid>

//             <Grid item style={{ paddingRight: "1rem" }}>
//               <StyledAutocomplete
//                 size="small"
//                 id="grouped-demo"
//                 // className={classes.inputRoot}
//                 options={[
//                   { title: "Oracle To Postgres", code: 1 },
//                   { title: "Oracle TO SQLServer", code: 2 },
//                   { title: "Oracle To MYSQL", code: 3 },
//                 ]}
//                 groupBy={""}
//                 defaultValue={{ title: "Oracle To Postgres" }}
//                 getOptionLabel={(option) => option.title}
//                 style={{ width: 300 }}
//                 onChange={(e, v) => handleversion(v)}

//                 renderInput={(params) => (
//                   <TextField

//                     {...params}
//                     label="MigrationTypes"
//                     variant="outlined"
//                     InputLabelProps={{
//                       className: classes.floatingLabelFocusStyle,
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item>
//               <StyledAutocomplete
//                 size="small"
//                 id="grouped-demo"
//                 options={[
//                   { title: "v1", code: 1 },
//                   { title: "v2", code: 2 },
//                   { title: "v3", code: 3 },
//                 ]}
//                 className={classes.inputRoot}
//                 groupBy={""}
//                 getOptionLabel={(option) => option.title}
//                 defaultValue={{ title: "v1", code: 1 }}
//                 style={{ width: 300 }}


//                 renderInput={(params) => (
//                   <TextField

//                     {...params}
//                     label="Migration Type  Versions"
//                     variant="outlined"
//                     InputLabelProps={{
//                       className: classes.floatingLabelFocusStyle,
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//           {auth && (
//             <div>
//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={openview}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleroute}>Logout</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <Toolbar />

//         <div className={classes.drawerContainer}>
//           <Typography
//             variant="body2"
//             style={{ color: "white", paddingTop: 10, paddingLeft: 45 }}
//           >
//             Database Objects
//           </Typography>
//           <Divider />
//           <Box py={1}>
//             <GmailTreeView menuList={menuList}
//               dropdown={dropdown}
//               deleteitem={deleteitem}
//             />
//           </Box>
//         </div>
//       </Drawer>
//       <Box py={0}>
//         <main className={classes.content}>
//           <Toolbar />
//           {children}
//         </main>
//       </Box>
//       {/* <Footer /> */}
//       <Notification
//         notify={notify}
//         setNotify={setNotify}
//       />
//     </div>
//   );
// }
