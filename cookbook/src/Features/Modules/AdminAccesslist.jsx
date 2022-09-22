import { Box, Grid, TextField, Typography, styled, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
// import { format } from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import MenuAppBar from "../../Components/header";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import config from "../../Config/config";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { TableContainer } from "@material-ui/core";
import Notification from "../Notifications/Notification";

import {
  Container,
  Modal,
  Snackbar,
} from "@material-ui/core";
import { LocalActivity } from "@material-ui/icons";

const useStylestable = makeStyles((theme) => ({
  table: {
    // minWidth: 650
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
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
  Accesslistcontainer: {
   
    [theme.breakpoints.down('sm')]: {
      marginTop: "200px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "120px",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "50px",
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "0px",
    },


   
  },

  texttablecell: {
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    '&:hover': {
      overflow: 'visible'
    }
  },
  buttton: {
    height: 10
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
      width: "20ch",
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
  container1: {
    border: "none",
    borderRadius: 15,
    width: 380,
    height: 250,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  root: {
    padding: "0px 8px",
  },

  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    // height: 9,
  },
}))(TableRow);

export default function AdminAccesslist() {
  const classes = useStyles();
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, lable, project_version } = useSelector(state => state.dashboardReducer);
  const classestable = useStylestable();
  const [isData, setIsData] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [objtype, setObjtype] = useState();
  const [fnnames, setFnnames] = useState([]);
  const [data, setData] = useState([]);
  const [isEdit, setEdit] = React.useState(false);
  const [isEditaccess, setEditaccess] = React.useState(false);
  const [date, setDate] = useState()
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDateTable, setdateValue] = useState()
  const [objtypelist, setObjtypeslist] = useState([])
  const [userslist, setUserslist] = useState([])
  const [approvalslist, setApprovallist] = useState([])
  const [selecetd, setSelected] = useState(false)
  const [permissionslist, setpermissionslist] = useState([])
  const [fnname, setFnname] = useState()
  const [open1, setOpen1] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [objcount, setobjcount] = useState(0)
  const [updatetable, setupdateTable] = useState(false)
  const [accesschnage, setaccesschange] = useState()
  // const [accesstypeslist, setAccesstypeslist] = useState([
  //   { title: "Edit", code: 'Edit' },
  //   { title: "View", code: 'View' },
  // ])

  // const [grant_mig_type, setGrant_mig_type]= useState()
  const [grant_obj_type, setGrant_obj_type] = useState()
  const [grant_access_type, setGrant_access_type] = useState()
  const [grant_user, setGrant_user] = useState()
  const [grant_featurename, setGrant_featurename] = useState('')
  // const [grant_expiry_date, setGrant_expiry_date]= useState()
  const [edithandle, setEdithandle] = useState([])
  const [model_Item, setModel_Item] = useState([])

  const [migtypeid, setMigtypeid] = useState(headerValue?.title);
  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/userslist/`, conf).then(
      (res) => {

        setUserslist(res.data)

      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
  }, []);


  useEffect(() => {
    if (headerValue) {
      if (Object.keys(headerValue).length > 0) {
        let body = {
          "User_Email": sessionStorage.getItem('uemail'),
          "Migration_TypeId": headerValue?.title,
          "Object_Type": lable
        };
        let conf = {
          headers: {
            Authorization: "Bearer " + config.ACCESS_TOKEN(),
          },
        };
        const form = new FormData();
        Object.keys(body).forEach((key) => {
          form.append(key, body[key]);
        });
        axios.post(`${config.API_BASE_URL()}/api/approvalslist`, form, conf).then(
          (res) => {

            setApprovallist(res.data)

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
    }
  }, [updatetable, headerValue, lable]);



  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will 
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  const handleEditaccess = (i) => {
    // If edit mode is true setEdit will 
    // set it to false and vice versa
    setEditaccess(!isEditaccess);
  };

  const handleSaveDate = () => {

  }

  const handleaccess = () => {
    // setEditaccess(!isEditaccess);
  }

  const handledatedesible = () => {
    setSelected(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    let sval = 0;
    // if (headerValue) {
    //   if (headerValue?.title === "Oracle TO Postgres") {
    //     sval = 1;
    //   } else if (headerValue?.title === "SQLServer TO Postgres") {
    //     sval = 2;
    //   } else if (headerValue?.title === "MYSQL TO Postgres") {
    //     sval = 3;
    //   }
    // }

    if (objtype === 'ALL') {
      setFnnames([{ 'Feature_Name': "ALL" }])
    }
    else if (objcount === 0) {
      setFnnames([])
    }
    else {
      let body = {
        Object_Type: objtype,
        Migration_TypeId: headerValue?.title,
        "Feature_Name": grant_featurename,
        "Project_Version_Id": project_version
      };
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      const form = new FormData();
      Object.keys(body).forEach((key) => {
        form.append(key, body[key]);
      });
      axios.post(`${config.API_BASE_URL()}/api/requestfndata/`, form, conf).then(
        (res) => {
          // setFnnames(res.data);
          // console.log(res.data);
          setFnnames([{ 'Feature_Name': "ALL" }].concat(res.data))
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

  }, []);

  const handleObjecttype = (v) => {
    setObjtype(v?.Object_Type);
    setGrant_obj_type(v?.Object_Type)
    let body = {
      Object_Type: v?.Object_Type,
      Migration_TypeId: headerValue?.title,
      "Project_Version_Id": project_version
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    if (objcount === 0) {
      setFnnames([])
    }
    else if (v?.Object_Type === 'ALL') {
      setFnnames([{ 'Feature_Name': "ALL" }])
    } else {
      axios.post(`${config.API_BASE_URL()}/api/requestfndata/`, form, conf).then(
        (res) => {
          // setFnnames(res.data);
          setFnnames([{ 'Feature_Name': "ALL" }].concat(res.data))
          console.log(res.data);
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

  };

  const handledropdown = (e, v) => {
    setGrant_featurename(v?.Feature_Name)
    // let conf = {
    //   headers: {
    //     Authorization: "Bearer " + config.ACCESS_TOKEN(),
    //   },
    // };

    // axios
    //   .get(
    //     `${config.API_BASE_URL()}/api/fdetail/${v?.Feature_Id || null}`,
    //     conf
    //   )
    //   .then(
    //     (res) => {
    //       setData(res.data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

  };



  useEffect(() => {
    if (headerValue) {
      if (Object.keys(headerValue).length > 0) {
        let conf = {
          headers: {
            Authorization: "Bearer " + config.ACCESS_TOKEN(),
          },
        };
        let body = {
          "Migration_TypeId": headerValue?.title,
          "Object_Type": lable,
          "User_Email": sessionStorage.getItem('uemail')
        };

        const form = new FormData();
        Object.keys(body).forEach((key) => {
          form.append(key, body[key]);
        });
        axios.post(`${config.API_BASE_URL()}/api/objectadminviewtlist/`, form, conf).then(
          (res) => {
            if (res.data.length > 0) {
              setObjtypeslist(res.data)
              setobjcount(1)
            }


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
    }

  }, [headerValue, lable]);



  const handleversion = (v) => { setGrant_access_type(v?.title) };
  const handleUsername = (v) => { setGrant_user(v?.email) };

  const handleDate = (e) => {
    setData(e.target.value)
  }


  const handleRequestAccessApproved = (item, action) => {
    const form = new FormData();

    let body = {
      "User_Email": item.User_Email,
      "Migration_TypeId": item.Migration_TypeId,
      "Object_Type": item.Object_Type,
      "Feature_Name": item.Feature_Name,
      "Access_Type": item.Access_Type,
      'Created_at': item.Created_at,
      'Expiry_date': moment(item.Expiry_date).format('YYYY-MM-DD'),
      "Approval_Status": action,
      "Approved_by": sessionStorage.getItem('uemail'),
      "Project_Version_Id": 1,
    };
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });




    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };


    axios.post(`${config.API_BASE_URL()}/api/permissionscreate/`, form, conf).then(
      (res) => {
        if (res.data !== 'User already has permission') {
          handleUpdateApproval(res.data.Expiry_date, res.data.Access_Type, item, action)
        } else {
          handleUpdateApproval(item.Expiry_date, item.Access_Type, item, action)
        }



        // setNotify({
        //   isOpen: true,
        //   message: "Request Accepted",
        //   type: "success",
        // });
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

  const handleRequestAccessDeny = (item, action) => {
    const form = new FormData();

    let body = {
      "User_Email": item.User_Email,
      "Migration_TypeId": item.Migration_TypeId,
      "Object_Type": item.Object_Type,
      "Feature_Name": item.Feature_Name,
      "Access_Type": item.Access_Type,
      'Created_at': item.Created_at,
      'Expiry_date': item.Expiry_date,
      "Approval_Status": action,
      "Approved_by": sessionStorage.getItem('uemail')
    };
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });




    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };

    if (action === 'Denied') {
      handleUpdateApproval(item.Expiry_date, item.Access_Type, item, action)
    }


    // axios.post(`${config.API_BASE_URL()}/api/permissionscreate/`, form, conf).then(
    //   (res) => {
    //     // if (action === 'Denied') {
    //     //   handleUpdateApproval(res.data.Expiry_date, res.data.Access_Type, item, action)
    //     // }

    //     // setNotify({
    //     //   isOpen: true,
    //     //   message: "Request Accepted",
    //     //   type: "success",
    //     // });
    //   },

    //   (error) => {
    //     console.log(error);
    //     // setNotify({
    //     //   isOpen: true,
    //     //   message: "Something Went Wrong Please Try Again!",
    //     //   type: "error",
    //     // });
    //   }
    // );
  }


  const handleUpdateApproval = (selectedDateTable, accesschnage, item, action) => {
    const form = new FormData();
    let Expiry_date;

    Expiry_date = moment(selectedDateTable).format('YYYY-MM-DD')


    let body = {
      "User_Email": item.User_Email,
      "Access_Type": accesschnage,
      "Expiry_date": Expiry_date,
      "Migration_TypeId": item.Migration_TypeId,
      "Object_Type": item.Object_Type,
      "Feature_Name": item.Feature_Name,
      'Created_at': item.Created_at,
      "Approval_Status": action,
      "id": item.id,
      "Approved_by": sessionStorage.getItem('uemail'),
      "Project_Version_Id": 1,
    }

    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });


    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };


    axios.put(`${config.API_BASE_URL()}/api/approvalsupdate/${item.id}`, form, conf).then(
      (res) => {

        setOpen1(false)
        setupdateTable(true)
      },
      (error) => {

        setOpen1(false)
      }
    );
    setupdateTable(false)
  }

  const handleEditAcesschange = (e) => {
    setaccesschange(e.target.value)
  }


  const handleGrant_permission_create = (item, action) => {
    const form = new FormData();

    let body = {
      "User_Email": item.User_Email,
      "Migration_TypeId": item.Migration_TypeId,
      "Object_Type": item.Object_Type,
      "Feature_Name": item.Feature_Name,
      "Access_Type": item.Access_Type,
      'Created_at': item.Created_at,
      'Expiry_date': moment(item.Expiry_date).format('YYYY-MM-DD'),
      "Approval_Status": action,
      "Approved_by": sessionStorage.getItem('uemail'),
      "Project_Version_Id": 1,
    };
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });




    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };


    axios.post(`${config.API_BASE_URL()}/api/permissionscreate/`, form, conf).then(
      (res) => {
        if (res.data === 'User already has permission') {
          setNotify({
            isOpen: true,
            message: res.data,
            type: "error",
          });
        } else {
          setNotify({
            isOpen: true,
            message: "Request Creted and acepted Permissions",
            type: "success",
          });
        }
        // handleUpdateApproval(res.data.Expiry_date, res.data.Created_at, item, action)
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


  const handleGrantAcess = () => {

    let body = {
      "Object_Type": grant_obj_type,
      "Migration_TypeId": headerValue?.title,
      "User_Email": grant_user,
      "Feature_Name": grant_featurename,
      "Approval_Status": 'Approved',
      "Access_Type": grant_access_type,
      "Expiry_date": moment(selectedDate).format('YYYY-MM-DD'),
      "Approved_by": sessionStorage.getItem('uemail'),
      "Project_Version_Id": 1,
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    // console.log(`${config.API_BASE_URL()}/api/grantaccess/`)
    axios.post(`${config.API_BASE_URL()}/api/grantaccess/`, form, conf).then(
      (res) => {
        handleGrant_permission_create(res.data, 'Approved')

        // setNotify({
        //   isOpen: true,
        //   message: "Request Creted and acepted Permissions",
        //   type: "success",
        // });
        setupdateTable(true)

      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setupdateTable(false)
  }

  const handleModelopen = (item) => {
    // debugger
    setOpen1(true)
    setModel_Item(item)
  }
  const handleChangeDate = (date) => {
    date = moment(date).format('YYYY-MM-DD');
    setModel_Item({
      ...model_Item,
      Expiry_date: date
    })
  }

  const handleSelectgroup = (value) => {
    setModel_Item({
      ...model_Item,
      Access_Type: value
    })
  }
  console.log(objtypelist)
  return (
    <div className={classes.Accesslistcontainer}>
      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">Admin Access & Roles</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='space-around' spacing={1}>
          <Grid item >
            <TextField
              id="outlined-multiline-static"
              label="Migration Type"
              // onChange={(e) => handleChange(e)}
              name="MigrationType_Id"
              // defaultValue="Default Value"
              // helperText={featurenamemsg}
              className={classes.textField}
              // helperText="Some important text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={headerValue?.title}
              size="small"
              disabled
              style={{ width: 300 }}
            />
          </Grid>
          <Grid item >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={objtypelist}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.Object_Type}
              style={{ width: 300 }}
              onChange={(e, v) => handleObjecttype(v)}
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

          <Grid item >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={fnnames}
              groupBy={""}
              // defaultValue={{ title: "Edit" }}
              getOptionLabel={(option) => option.Feature_Name}
              style={{ width: 300 }}
              onChange={(e, v) => handledropdown(e, v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Feature Names"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}

                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='space-around' spacing={1}>
          <Grid item >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={[
                { title: "Edit", code: 'Edit' },
                { title: "View", code: 'View' },
                { title: "ALL", code: 'ALL' },
              ]}
              groupBy={""}
              // defaultValue={{ title: "Edit" }}
              getOptionLabel={(option) => option?.title}
              style={{ width: 300, marginTop: 10 }}
              onChange={(e, v) => handleversion(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Accesstype"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              // defaultValue={{ title: "Select email" }}
              getOptionLabel={(option) => option.email}
              style={{ width: 300, marginTop: 10 }}
              onChange={(e, v) => handleUsername(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ID"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item >

            <MuiPickersUtilsProvider utils={DateFnsUtils} >

              <KeyboardDatePicker
                margin="normal"
                size='small'
                id="date-picker-dialog"
                inputVariant="outlined"
                label="Expiry Date"
                style={{ width: 300, marginTop: '10px' }}
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}

              />


            </MuiPickersUtilsProvider>

          </Grid>
          {/* <Grid item xs={4}>

            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={[
                { title: "28-02-2022", code: 1 },
                { title: "29-02-2022", code: 2 },
                { title: "30-02-2022", code: 3 },
              ]}
              groupBy={""}
              defaultValue={{ title: "Expiry Date" }}
              getOptionLabel={(option) => option.title}
              style={{ width: 300, marginTop: 10 }}
              onChange={(e, v) => handleversion(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Expiry On"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              )}
            />
          </Grid> */}
        </Grid>
      </Box>
      <Box>
        <Grid container direction="row" justifyContent="center">
          <Button
            variant="contained"
            // disabled={!selecetd}
            // startIcon={<CloudUploadIcon />}
            color="primary"
            component="span"
            style={{ marginTop: 15 }}
            onClick={() => { handleGrantAcess() }}
          >
            {" "}
            Grant Access
          </Button>
        </Grid>
      </Box>

      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Approval Requests
            </Typography>
            <TableContainer className={classestable.table}>
              <Table stickyHeader aria-label="sticky table">
                {/* <Table className={classestable.table} aria-label="simple table"> */}
                <TableHead className={classes.primary}>
                  <TableRow>
                    <StyledTableCell align="left">User Email</StyledTableCell>
                    <StyledTableCell align="left">Access Type</StyledTableCell>
                    <StyledTableCell align="left">Object Type</StyledTableCell>
                    <StyledTableCell align="left">Feature Name</StyledTableCell>
                    <StyledTableCell align="left">Approved By</StyledTableCell>
                    <StyledTableCell align="left">Expiry Date</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                    <StyledTableCell align="center">
                      Approval Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isData ? (
                    <>
                      {approvalslist.map((item) =>

                        <StyledTableRow container>
                          <StyledTableCell item xl={10}>
                            <div className={classes.texttablecell}>
                              {item.User_Email}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>

                              {item.Access_Type}

                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={5}>
                            <div className={classes.texttablecell}>
                              {item.Object_Type}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {item.Feature_Name}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {/* {"SivaNagaraju"} */}
                              {item.Approved_by}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {item.Expiry_date}
                            </div>
                          </StyledTableCell>

                          <StyledTableCell>
                            <StyledTableCell item xl={6}>
                              <Grid item xs={1}>
                                {item.Approval_Status === "Pending" ? (
                                  <Tooltip
                                    title="Edit"
                                    label='Edit'
                                    aria-label="Edit"
                                    onClick={() => { handleModelopen(item) }}
                                  >

                                    <EditSharpIcon style={{ color: "blue" }} />
                                  </Tooltip>
                                ) : "No Actions"}

                              </Grid>
                            </StyledTableCell>
                          </StyledTableCell>
                          <StyledTableCell item align="center" xl={10}>
                            {item.Approval_Status === "Pending" ? (
                              <div className={classes.texttablecell}>
                                <Button
                                  type="button"
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  className={classes.submit}
                                  style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                                  onClick={(e) => { handleRequestAccessApproved(item, "Approved") }}
                                >
                                  APPROVE
                                </Button>
                                {' '}
                                <Button
                                  type="button"
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  className={classes.submit}
                                  style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                                  onClick={(e) => { handleRequestAccessDeny(item, "Denied") }}
                                >
                                  Deny
                                </Button>

                              </div>
                            ) : <div className={classes.texttablecell}>
                              {item.Approval_Status}
                            </div>
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  ) : (
                    <>
                      <StyledTableRow container>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">
                          No Requests
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </StyledTableRow>
                    </>

                  )

                  }
                </TableBody>
                {/* </Table> */}
              </Table>
            </TableContainer>
          </Grid>
          <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
          </Snackbar>
          <Modal open={open1}>
            <Container className={classes.container1} style={{ marginBottom: 200 }}>
              <Typography
                gutterBottom
                align="center"
                variant="h6"
                component="h2"
                style={{ marginBottom: '20px' }}
              >
                Edit Data
              </Typography>
              {/* <FormControl fullWidth variant="outlined" className={classes.formControl}> */}
              <Grid item xs={12} sm={4} md={4} xl={4}>
                <StyledAutocomplete
                  size="small"
                  id="grouped-demo"
                  className={classes.inputRoottype}
                  options={[
                    { title: "Edit", code: 'Edit' },
                    { title: "View", code: 'View' },
                    { title: "ALL", code: 'ALL' },
                  ]}
                  groupBy={""}
                  defaultValue={{ title: model_Item.Access_Type }}
                  // value={model_Item.Access_Type}
                  getOptionLabel={(option) => option?.title}
                  style={{ width: 330, marginTop: 20 }}
                  onChange={(e, v) => handleSelectgroup(v?.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Accesstype"
                      variant="outlined"
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                        shrink: true,
                      }}
                    />
                  )}
                />


              </Grid>
              <Grid item xs={12} sm={4} md={4} xl={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >

                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    inputVariant="outlined"
                    label="Expiry Date"
                    style={{ width: 330, marginTop: '30px' }}
                    format="MM/dd/yyyy"
                    value={model_Item.Expiry_date}
                    size="small"
                    onChange={date => handleChangeDate(date)}
                    defaultValue={model_Item.Expiry_date}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <div className={classes.item} >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 20, marginLeft: 70, marginTop: '20px' }}
                  onClick={() => handleUpdateApproval(model_Item.Expiry_date, model_Item.Access_Type, model_Item, 'Pending')}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen1(false)}
                  style={{ marginTop: '20px' }}
                >
                  Cancel
                </Button>
              </div>
            </Container>
          </Modal>
        </Grid>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
