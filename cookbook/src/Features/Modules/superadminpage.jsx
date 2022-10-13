// import { useState } from "react";
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
// import Temp from "./SubDropDown";
import {IoMdArrowDropright} from 'react-icons/io';
import dropdownApi from "../../APIS/dropdownApi";
import DropDown from "../../Components/DropDown";
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
    height: 350,
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
  const [pathString,setPathString] = useState('');
  // const [ showList,setShowList] = useState('hidden');
  const classes = useStyles();
  const dispatch = useDispatch();
  const classestable = useStylestable();
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert,setOpenAlert] = useState(false);
  const[showSublist,setShowList] = useState('');
  const showSublistAction = (sublist) =>{
      if(showSublist === sublist){
          setShowList('');
      }else{
          setShowList(sublist);
      }
      
  }
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
    project_version,
  } = useSelector((state) => state.dashboardReducer);
  
  const updatePath =(new_path)=>{
     setPathString(new_path);
  }
  const updatePath3 = (new_path)=>{
    console.log(new_path+" we in 3")
    setPathString(new_path);
  }
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  
  let history = useHistory();


  const handleMigrationCreate= () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Project_Version_Id": '1',
      "Migration_Name": "Oracle To postgres",
      "Project_Version_limit": 3,
      "Feature_Version_Limit": 3
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });



    axios.post(`${config.API_BASE_URL()}/api/migrationcreate/`, form, conf).then(
      (res) => {
        // setNotify("Created Migration Type")
        setNotify({
          isOpen: true,
          message: "Created Migration Type",
          type: "success",
        });
        setOpen1(false)
        },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );


  }

  const handleObjectypeCreate= () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Project_Version_Id": '1',
      "Migration_Name": "Oracle To postgres",
      "Object_Type_Str": "ora2pg",
     
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });


    axios.post(`${config.API_BASE_URL()}/api/object_type_create/`, form, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: "Object Type created",
          type: "success",
        });
        setOpen(false)
        },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Object Type already exist',
          type: "error",
        });
      }
    );


  }



  return (
    <Box style={{ width: '100%' }}>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Migration Type and Admin Type Creation
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box py={2} px={2} >
        <Grid container direction='row' style={{ marginLeft: 80, position: 'relative' }} spacing={2}>
          <Grid item xs={4} >
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                className={classes.inputRoottype}
                groupBy={""}
                getOptionLabel={(option) => option.Migration_Name}
                style={{ width: 300, marginLeft: 100 }}
                // onChange={(e, v) => handleObjectviewslist(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Migration type"
                    variant="outlined"
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                      shrink: true,
                    }}

                  />
                )}
              />
            </Grid>
            <Grid item xs={1} style={{ marginLeft: 100 }}>
              <Avatar className={classes.avatar} onClick={() => setOpen1(true)}>
                <AddIcon style={{ color: 'green' }} />
              </Avatar>
            </Grid>
            <Snackbar
              open={openAlert}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
            </Snackbar>
            <Modal open={open1}>
            <Container className={classes.container}>
              <Typography
                gutterBottom
                align="center"
                variant="h6"
                component="h2"
                className={classes.Object_Type}
                style={{ marginBottom: '20px' }}
              >
                Create Migration Type
              </Typography>
              {/* <form className={classes.form} autoComplete="off"> */}
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Migration Type"
                  style={{ width: 410, marginBottom: '20px' }}
                  multiline
                  rows={1}
                  // value ={row.Keywords}
                  // onChange={(e) => setMigtype_create(e.target.value)}
                  name="Keywords"
                  // defaultValue={edithandle.Keywords}
                  // helperText={featurenamemsg}
                  // value={edithandle.Keywords}
                  className={classes.textField}
                  // helperText="Some important text"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Major Version"
                  style={{ width: 410, marginBottom: '20px' }}
                  multiline
                  rows={1}
                  // onChange={(e) => setProject_max_limit(e.target.value)}
                  name="Major Version"
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Minor Version"
                  style={{ width: 410, marginBottom: '10px' }}
                  multiline
                  rows={1}
                  // onChange={(e) => setFeautre_max_limit(e.target.value)}
                  name="Minor Version"
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <h4>Note:Major version and Minor version should not be 0 and 1</h4>
              <div className={classes.item} >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 20, marginLeft: 100 }}
                  onClick={() => handleMigrationCreate()}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen1(false)}
                >
                  Cancel
                </Button>
              </div>
            </Container>
          </Modal>
          <Grid>
            <Button
              variant="contained"
              // disabled={!selecetd}
              color="primary"
              component="span"
              style={{ marginTop: 9, marginLeft: 70 }}
              // onClick={() => { handlecreateadmin() }}
            >
              {" "}
              Create Admin
            </Button>
          </Grid>
          <Grid item xs={4} >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              // options={objtypelist}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.Object_Type}
              // onChange={(e, v) => handleobjecttype(v)}
              style={{ width: 300, marginLeft: 100 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ObjectType"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={1} style={{ marginLeft: 100 }}>
            <Avatar className={classes.avatar} onClick={() => setOpen(true)}>
              <AddIcon style={{ color: 'green' }} />
            </Avatar>
          </Grid>
          </Grid>
          <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
          </Snackbar>
          <Modal open={open}>
            <Container className={classes.container2} style={{ marginBottom: 100 }}>
              <Typography
                gutterBottom
                align="center"
                variant="h6"
                component="h2"
                className={classes.Object_Type}
                style={{ marginBottom: '20px' }}
              >
                Create Object Type
              </Typography>
              
              {
                dropdownApi.map((curElem,index)=>{
                  return (
                    <>
                    <div key={index} onClick={()=>showSublistAction(curElem.Object_Type)}>
                    <DropDown Object_Type={curElem.Object_Type} Sub_Objects={curElem.Sub_Objects} updatePath={updatePath}  showSublist={showSublist} />
                    </div>
                    </>
                  )
                })
              }
              
              <div className="w-full ">
                <h1 className="font-semibold">Path :</h1>
               <p className="w-full border px-5 h-10 py-2 border-gray-300 border-dashed shadow-sm ">{pathString}</p> 
              </div>
            </Container>
          </Modal>
      </Box>
    </Box>
  )
}


  
