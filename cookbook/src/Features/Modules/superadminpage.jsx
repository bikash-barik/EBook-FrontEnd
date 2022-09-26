import { Box, Grid, TextField, Typography, styled } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ConfirmDialog from "../../Features/Notifications/ConfirmDialog";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import config from "../../Config/config";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import MenuAppBar from "../../Components/header";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
import Notification from "../Notifications/Notification";
import Menuaction from "../../Redux/actions/Menuaction";

import { Container, Modal, Snackbar } from "@material-ui/core";

const useStylestable = makeStyles((theme) => ({
  table: {
    width: "96%",
    // width:10
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
    color: "black",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      // height: '1rem'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  texttablecell: {
    // overflowX: 'hidden',
    whiteSpace: "nowrap",
    width: "140px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    "&:hover": {
      overflow: "visible",
    },
  },

  table: {
    // minWidth: 150,
    width: "60%",
    height: "10%",
    border: "1px black",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  rootc: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },

  //pop up weindow

  container: {
    border: "none",
    borderRadius: 15,
    width: 460,
    height: 390,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  container1: {
    border: "none",
    borderRadius: 15,
    width: 450,
    height: 350,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  container2: {
    border: "none",
    borderRadius: 15,
    width: 450,
    height: 300,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  root: {
    padding: "0px 16px",
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    height: 10,
  },
}))(TableRow);

export default function SuperadminFunction() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classestable = useStylestable();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isData, setIsData] = useState(true);
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
    project_version,
  } = useSelector((state) => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title);
  const [objtype, setObjtype] = useState("Procedure");
  const [Migtype, setMigtype] = useState("");
  const [fnnames, setFnnames] = useState([]);
  const [data, setData] = useState([]);
  const [selecetd1, setSelected1] = useState(false);
  const [selecetd, setSelected] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  // const [openAlert1, setOpenAlert1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [migtype_create, setMigtype_create] = useState();
  const [objtype_create, setObjtype_create] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [migtypelist, setMigtypeslist] = useState([]);
  const [objtypelist, setObjtypeslist] = useState([]);
  const [updatemiglist, setUpdatemiglist] = useState(false);
  const [updateobjlist, setUpdateobjlist] = useState(false);
  const [userslist, setUserslist] = useState([]);
  const [adminlistdata, setadminlistdata] = useState([]);
  const [superadminlist, setsuperadminlist] = useState([]);

  const [useremail, setuseremail] = useState();
  // const [superuseremail, setsuperuseremail] = useState()
  const [updateAdminTable, setUpdateAdminTable] = useState(false);
  const [updateSuperAdminTable, setUpdateSuperAdminTable] = useState(false);
  const [updatermSuperAdminTable, setUpdatermSuperAdminTable] = useState(false);
  const [updateaccessAdminTable, setupdateaccessAdminTable] = useState(false);
  const [rmitememail, setrmitemsemail] = useState();
  const [rmitemmig, setrmitemsmig] = useState();
  const [rm_miglist, setrm_miglist] = useState([]);
  const [objectTypeAdmin, setObjectTypeAdmin] = useState();
  const [rm_objectslist, setrm_objectslist] = useState([]);
  const [objecttype_rm, setObjecttype_rm] = useState();
  // const [proj_vers_list, setProj_vers_list] = useState([])
  const [project_max_limit, setProject_max_limit] = useState();
  const [feature_max_limit, setFeautre_max_limit] = useState();
  const [proj_vers_list, setProj_vers_list] = useState([]);
  const [useradmin_list, setUseradmin_list] = useState([]);
  const [useradmin_tableupdate, setuseradmin_tableupdate] = useState(false);
  const [isUserAdminData, setIsUserAdminData] = useState(false);
  const [deploymig, setDeploymig] = useState();
  const [select_prj_versionitem, setSelect_prj_versionitem] = useState();
  const [new_prj_versionitem, setNew_prj_versionitem] = useState();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [newMigtype, setNewMigtype] = useState();
  const [isdeployData, setIsDeploydata] = useState(false);
  const [deployeddata, setDeployeddata] = useState([]);
  const [deploy_update, setDeploy_update] = useState(false);

  let history = useHistory();

  // console.log(headerValue.title)
  const handleuseremail = (v) => {
    setSelected1(true);
    setuseremail(v?.email);
  };

  const handleuseremail1 = (v) => {
    setuseremail(v?.email);
  };

  // const handleuseremail1 = (v) => {

  // }

  const handleobjecttype = (v) => {
    setSelected(true);
    setObjectTypeAdmin(v?.Object_Type);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Box style={{ width: "100%" }}>
      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">Super Admin Creation</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction="row" justifyContent="center" spacing={1}>
          <Grid item>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              getOptionLabel={(option) => option.email}
              style={{ width: 300, marginLeft: 100 }}
              onChange={(e, v) => handleuseremail(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="username/email"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              disabled={!selecetd1}
              color="primary"
              component="span"
              style={{ marginTop: 10, marginLeft: 240 }}
              // onClick={() => handlesuperadmincreation()}
            >
              {" "}
              Create Super Admin
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Super Admin List
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="left">User Name</StyledTableCell>
                  <StyledTableCell align="left">User Email</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isData ? (
                  <>
                    {superadminlist.map((item) => (
                      <StyledTableRow container>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.User_Name}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Email}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <Button
                            type="button"
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{
                              marginTop: "9px",
                              fontSize: "9px",
                              marginBottom: "8px",
                            }}
                            // onClick={() => handledeletesuperadmin(item.Email)}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">
                        No Requests
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>

      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">User Admin Creation</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction="row" justifyContent="center" spacing={1}>
          <Grid item>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              getOptionLabel={(option) => option.email}
              style={{ width: 300, marginLeft: 100 }}
              onChange={(e, v) => handleuseremail1(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="username/email"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              style={{ marginTop: 10, marginLeft: 240 }}
              // onClick={() => handleuseradmincreation()}
            >
              {" "}
              Create User Admin
            </Button>
          </Grid>
        </Grid>
      </Box>


     
          
          

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Box>
  );
}
