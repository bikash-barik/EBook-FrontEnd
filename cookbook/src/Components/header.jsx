import React, { useEffect, useReducer } from "react";
import clsx from "clsx";
import fileSaver from "file-saver";
import config from "../../src/Config/config";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Notification from "../Features/Notifications/Notification";
import Menuaction from "../Redux/actions/Menuaction";

import {
  Box,
  Grid,
  Menu,
  MenuItem,
  styled,
  TextField,
} from "@material-ui/core";
import GmailTreeView from "../Components/Treeview";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ActionMenu from "../../src/Redux/actions/Menuaction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import qbook from "../Images/qbook1.jpg";

const drawerWidth = 375;

const useStyles = makeStyles((theme) => ({
  // ############################

  inputplaceholder: {
    "&::placeholder": {
      color: "white",
    },
  },
  drawer: {
    // position: "static",
    transition: "width .7s",
  },
  closed: {
    width: "0px",
  },
  opened: {
    width: "240px",
  },
  drawer1: {
    transition: "marginLeft .7s",
  },
  closed1: {
    // marginLeft:80,
    // marginRight:0,
    width: "100%",
    flex: 1,
  },
  opened1: {
    marginLeft: 240,

    [theme.breakpoints.down("xs")]: {
      width: "85%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
    [theme.breakpoints.up("md")]: {
      width: "82%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "84%",
    },
  },

  // ##########################

  sidebarbody: {
    // background:"fff",
    // color:"fff",
    // backgroundColor:"red",
  },

  downloadbutton: {
    position: "fixed",
    bottom: 0,
  },
  title: {
    marginLeft: 18,
    marginTop: 5,
  },
  floatingLabelFocusStyle: {
    color: "white",
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#3f51b5",
    boxShadow: "none",
    border: "1px solid #004280",
  },

  drawer: {
    flexShrink: 0,
    background: "#3f51b5",
  },

  // style={{  }}
  navbarcom: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "160px",
      // height:'100vh'
    },
  },

  drawerPaper: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 150,
      width: drawerWidth,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 95,
      width: drawerWidth,
      position: "relative",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 20,
      width: 40,
      background: "#3f51b5",
    },
    [theme.breakpoints.up("lg")]: {
      width: 240,
      marginTop: 10,
      background: "#3f51b5",
      // height:'100vh'
    },
  },
  drawerContainer: {
    overflow: "auto",
    height: "83vh",
    background: "#3f51b5",

    [theme.breakpoints.down("xs")]: {
      marginTop: "380px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "200px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "130px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "0px",
    },
  },
  content: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      padding: 40,
      width: drawerWidth,
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      padding: 40,
      width: drawerWidth,

      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {
      flexGrow: 1,
      marginLeft: 60,
      padding: theme.spacing(1),
      width: "78%",
    },
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },

  logoutbtn: {
    // marginLeft:"8px",

    // marginRight: "-1px",
    [theme.breakpoints.down("xs")]: {
      right: 100,
      position: "fixed",

      // padding: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      right: 30,
      position: "fixed",
    },
    [theme.breakpoints.up("md")]: {
      right: 30,
      position: "fixed",
    },
    [theme.breakpoints.up("lg")]: {
      right: 30,
      position: "fixed",
    },
  },

  inputRoottype: {
    color: "white",
    // width: '40px',
    marginTop: 5,
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },

  inputRootversion: {
    color: "white",
    // width: '40px',
    marginTop: 5,
    marginLeft: 10,
    // border:'none',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
}));

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      // height: '1rem'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& ::placeholder": {
      color: "#FFFFFF",
    },
  },
});

const StyledAutocompletesidebar = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 13px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      height: "0.3rem",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
});

export default function ClippedDrawer({ children }) {
  const classes = useStyles();
  const IsSuperAdmin = sessionStorage.getItem("isSuperAdmin");
  const isUserAdmin = sessionStorage.getItem("isUserAdmin");

  const [isOpened, setIsOpened] = useState(true);
  const {
    updatedValue,
    headerValue,
    ITEMlIST,
    DropDownValues,
    admin,
    lable,
    project_version,
    project_header_dropdown,
  } = useSelector((state) => state.dashboardReducer);
  console.log(ITEMlIST,' = itemli')
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openview = Boolean(anchorEl);
  const [menuList, setmenuList] = React.useState([
    {
      Label: "PROCEDURE",
      SubMenu: [{ Feature_Name: "fp1" }, { Feature_Name: "fp2" }],
      Sub_Objects_List: [
        {
          Label: "Sub_PROCEDURE_1",
          SubMenu: [{ Feature_Name: "sub_fp1" }, { Feature_Name: "sub_fp2" }],
          Sub_Objects_List: [
            {
              Label: "Sub_PROC_1",
              SubMenu: [
                { Feature_Name: "sub_fp1_s" },
                { Feature_Name: "sub_fp2_s" },
              ],
              Sub_Objects_List: [
                {
                  Label: "Sub_PROC_11",
                  SubMenu: [
                    { Feature_Name: "sub_fp11_s" },
                    { Feature_Name: "sub_fp21_s" },
                  ],
                  Sub_Objects_List: [],
                  Admin_Flag: 1,
                },
              ],
              Admin_Flag: 1,
            },
            {
              Label: "Sub_PROC_2",
              SubMenu: [
                { Feature_Name: "sub_fp3_s" },
                { Feature_Name: "sub_fp4_s" },
              ],
              Sub_Objects_List: [],
              Admin_Flag: 1,
            },
          ],
          Admin_Flag: 1,
        },

        {
          Label: "Sub_PROCEDURE_2",
          SubMenu: [{ Feature_Name: "sub_fp5" }, { Feature_Name: "sub_fp6" }],
          Sub_Objects_List: [],
          Admin_Flag: 1,
        },

        {
          Label: "Sub_PROCEDURE_3",
          SubMenu: [{ Feature_Name: "sub_fp7" }, { Feature_Name: "sub_fp8" }],
          Sub_Objects_List: [],
          Admin_Flag: 1,
        },
      ],
      Admin_Flag: 1,
    },

    {
      Label: "FUNCION",
      SubMenu: [{ Feature_Name: "ff1" }, { Feature_Name: "ff2" }],
      Sub_Objects_List: [
        {
          Label: "Sub_FUNCTION_1",
          SubMenu: [{ Feature_Name: "sub_ff1" }, { Feature_Name: "sub_ff2" }],
          Sub_Objects_List: [],
          Admin_Flag: 1,
        },

        {
          Label: "Sub_FUNCTION_2",
          SubMenu: [{ Feature_Name: "sub_ff1" }, { Feature_Name: "sub_ff2" }],
          Sub_Objects_List: [
            {
              Label: "Sub_FUNC_1",
              SubMenu: [
                { Feature_Name: "sub_ff1_s" },
                { Feature_Name: "sub_ff2_s" },
              ],
              Sub_Objects_List: [],
              Admin_Flag: 1,
            },

            {
              Label: "Sub_FUNC_2",
              SubMenu: [
                { Feature_Name: "sub_ff1_s" },
                { Feature_Name: "sub_ff2_s" },
              ],
              Sub_Objects_List: [],
              Admin_Flag: 1,
            },
          ],
          Admin_Flag: 1,
        },
      ],
      Admin_Flag: 1,
    },

    {
      Label: "PACKAGE",
      SubMenu: [{ Feature_Name: "fpa1" }, { Feature_Name: "fpa2" }],
      Sub_Objects_List: [],
      Admin_Flag: 1,
    },
  ]);
  const [dropdown, setdropdown] = React.useState({
    name: "Oracle TO Postgres",
  });
  const [create_flag, setcreate_flag] = useState([]);
  const [create_check_flag, setcreate_check_flag] = useState(0);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [select_pr_v, setSelect_pr_v] = useState();

  useEffect(() => {
    history.push("/dashboard");
  }, []);

  

  React.useEffect(() => {
    if (headerValue?.title) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      let body = {
        Migration_TypeId: headerValue?.title,
      };
      const form = new FormData();
      Object.keys(body).forEach((key) => {
        form.append(key, body[key]);
      });

      axios
        .post(`${config.API_BASE_URL()}/api/project_versions_list/`, form, conf)
        .then(
          (res) => {
            setSelect_pr_v(res.data.slice(-1)[0]?.title);
            dispatch(Menuaction.getproj_header_dropdownlist(res.data));

            dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code));
          },
          (error) => {
            setNotify({
              isOpen: true,
              message: "Something Went Wrong Please try Again",
              type: "error",
            });
          }
        );
    }
  }, [headerValue?.title]);

  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
   
  };

  const handleroute = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    history.push("/");
  };


  const onDownload1 = () => {
   
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
   

    axios
      .get(`${config.API_BASE_URL()}/api/templatedownload/`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        var blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fileSaver.saveAs(blob, "template.py");
      })
      .catch((err) => {});
  };
  const onDownload2 = () => {
    
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    
    axios
      .get(`${config.API_BASE_URL()}/api/pdfdownload/`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        var blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fileSaver.saveAs(blob, "instructions.pdf");
      })
      .catch((err) => {});
  };


  const handleAdminMenus = () => {
    history.push("/AdminAccesslist");
  };
  const handleAcessreview = () => {
    history.push("/accessreview");
  };
  const handleSuperadmin = () => {
    history.push("/superadmin");
  };

  const handleUseradmin = () => {
    history.push("/useradmin");
  };

  const handlefeatureapprovals = () => {
    history.push("/FeatureApprovals");
  };

  const handleversion = () => {
    
  };
  const handlefeature = (v) => {
    dispatch(ActionMenu.selectedMenutlist(v))
    console.log(v," ===========")
  };

  const handlerequestMenus = () => {
    history.push("/Request");
  };

  const handleProject_Version = (v) => {
    setSelect_pr_v(v?.title);
    dispatch(Menuaction.project_version(v?.code));

    history.push("/dashboard");
  };

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" container className={classes.appBar}>
        <Toolbar container>
          <Grid
            container
            spacing={2}
          >
            <Grid item xm={12} sm={12} md={3} lg={1}>
              <div>
                <img
                  src={qbook}
                  style={{ width: 135, height: 40 }}
                  className={classes.title}
                  onClick={() => setIsOpened(!isOpened)}
                />
              </div>
            </Grid>

            <Grid
              item
              xm={12}
              sm={6}
              md={5}
              lg={1}
              className={classes.navbarcom}
            >
              {/* {IsSuperAdmin !== 'true' ? <> */}
              {
                DropDownValues.length > 0 && (
                  <StyledAutocomplete
                    size="small"
                    id="grouped-demo"
                    className={classes.inputRoottype}
                    options={DropDownValues}
                    groupBy={""}
                    defaultValue={{ title: DropDownValues[0]?.title }}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    onChange={(e, v) => handleversion(v)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="MigrationTypes"
                        variant="outlined"
                        InputLabelProps={{
                          className: classes.floatingLabelFocusStyle,
                          shrink: true,
                        }}
                      />
                    )}
                  />
                )
                // } </> : null
              }
            </Grid>

            <Grid
              item
              xm={12}
              sm={6}
              md={5}
              lg={1}
              className={classes.navbarcom}
            >
              {isUserAdmin == "true" && (
                <>
                  <Button
                    type="button"
                    size="small"
                    // variant="contained"
                    // color="orange"
                    onClick={handleUseradmin}
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      marginBottom: "8px",
                      width: "130px",
                      color: "white",
                      marginLeft: "70px",
                    }}
                  >
                    User Admin
                  </Button>
                  {"   "}

               
                </>
              )}
            </Grid>

            <Grid
              item
              xm={12}
              sm={6}
              md={5}
              lg={2}
              className={classes.navbarcom}
            >
              {IsSuperAdmin == "true" && (
                <>
                  <Button
                    type="button"
                    size="small"
                    // variant="contained"
                    // color="orange"
                    onClick={handleSuperadmin}
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      marginBottom: "8px",
                      width: "130px",
                      color: "white",
                    }}
                  >
                    Super Admin
                  </Button>
                  {"   "}

              
                </>
              )}
            </Grid>
            <Grid item xs={6} sm={1} md={1} lg={1}>
              {project_header_dropdown.length > 0 && (
                <StyledAutocomplete
                  size="small"
                  id="grouped-demo"
                  className={classes.inputRoottype}
                  options={project_header_dropdown}
                  groupBy={""}
                  value={select_pr_v}
                  defaultValue={{
                    title: project_header_dropdown.slice(-1)[0]?.title,
                  }}
                  // inputValue={select_pr_v}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 110 }}
                  onChange={(e, v) => handleProject_Version(v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Versions"
                      variant="outlined"
                      InputLabelProps={{
                        className: [
                          classes.floatingLabelFocusStyle,
                          classes.inputplaceholder,
                        ],
                        shrink: true,
                      }}
                      placeholder={String(select_pr_v)}
                    />
                  )}
                />
              )}
            </Grid>
          

            {auth && (
              <Grid
                item
                xs={6}
                sm={1}
                md={1}
                lg={1}
                className={classes.logoutbtn}
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <div style={{ fontSize: 14, marginTop: 5 }}>
                    {sessionStorage.getItem("quser")}
                  </div>
                
                </IconButton>
               

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openview}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleroute}>Logout</MenuItem>
                </Menu>
              </Grid>
            )}

          </Grid>
        </Toolbar>
      </AppBar>

      {/* Side bar */}

      <Grid container className={classes.sidebarbody}>
        <Grid item>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawer, {
                [classes.closed]: !isOpened,
                [classes.opened]: isOpened,
              }),
            }}
          >
            <Toolbar />

            <div className={classes.drawerContainer}>
             

              <Typography
                variant="body2"
                style={{
                  color: "white",
                  marginBottom: 10,
                  paddingTop: 8,
                  paddingLeft: 50,
                  marginTop: 0,
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handlerequestMenus}
              >
                Feature Catalog
              </Typography>
              {/* <Divider /> */}

                  <Typography
                    variant="body2"
                    style={{
                      color: "white",
                      marginBottom: 10,
                      paddingTop: 10,
                      paddingLeft: 50,
                      marginTop: 0,
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleAdminMenus}
                  >
                    Admin Approvals
                  </Typography>
                  {/* <Divider /> */}
                  <Typography
                    variant="body2"
                    style={{
                      color: "white",
                      marginBottom: 10,
                      paddingTop: 10,
                      paddingLeft: 50,
                      marginTop: 0,
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handlefeatureapprovals()}
                  >
                    Feature Approvals
                  </Typography>
                  {/* <Divider /> */}
                
              

              <Typography
                variant="body2"
                style={{
                  color: "white",
                  marginBottom: 10,
                  paddingTop: 10,
                  paddingLeft: 50,
                  marginTop: 0,
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handleAcessreview}
              >
                Access Review
              </Typography>

              <Box py={1}>
               
                <Grid container direction="column" spacing={0}>
                  <Grid item>
                    {menuList.length > 0 && (
                      <StyledAutocompletesidebar
                        size="medium"
                        id="grouped-demo"
                        className={classes.inputRoottype}
                        options={menuList}
                        groupBy={""}
                        defaultValue={{ Label: menuList[0].Label }}
                        getOptionLabel={(option) => option.Label}
                        style={{ width: 230, height: 50 }}
                        onChange={(e, v) => handlefeature(v)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Migration Objects"
                            variant="outlined"
                            InputLabelProps={{
                              className: classes.floatingLabelFocusStyle,
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    )}
                  </Grid>

                  <Grid item spacing={1}>
                    <GmailTreeView
                      menuList={ITEMlIST}
                      dropdown={dropdown}
                      admin={admin}
                      createflag={create_check_flag}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box py={1}>
                <Button
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    textTransform: "unset",
                  }}
                  startIcon={<GetAppIcon />}
                  onClick={onDownload1}
                  className={classes.downloadbutton}
                >
                  Template
                </Button>
                <Button
                  style={{
                    color: "white",
                    marginLeft: "120px",
                    textTransform: "unset",
                  }}
                  startIcon={<GetAppIcon />}
                  onClick={onDownload2}
                  className={classes.downloadbutton}
                >
                  Document
                </Button>
              </Box>
            </div>
          </Drawer>
        </Grid>

        <Grid item xs={12}>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawer1, {
                [classes.closed1]: !isOpened,
                [classes.opened1]: isOpened,
              }),
            }}
          >
            <Toolbar />
            {children}
          </Drawer>
        </Grid>
      </Grid>
    
      <Notification notify={notify} setNotify={setNotify} />
     
    </div>
  );
}
