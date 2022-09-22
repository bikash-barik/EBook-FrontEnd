import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
// import Notification from "../Notifications/Notification";
import ConfirmDialog from "../../Features/Notifications/ConfirmDialog"

import {
  Container,
  Modal,
  Snackbar,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker
} from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableBody from '@material-ui/core/TableBody';
import Notification from "../Notifications/Notification";
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import axios from "axios";
import config from "../../Config/config";
import { TableContainer } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';



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
  },
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
    overflowX: 'hidden',
    whiteSpace: "nowrap",
    // width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    '&:hover': {
      overflow: 'visible'
    }
  },

  table: {
    // minWidth: 150,
    width: '90%',
    height: '10%',
    border: '1px black'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  rootc: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,

    },

    height: 10

  },
}))(TableRow);


const useStylestable = makeStyles((theme) => ({

  table: {
    minWidth: 100,
    // width:10,
    width: '98%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,

  },

}))


export default function AccessReview() {
  const classes = useStyles();
  const classestable = useStylestable();
  const [isData, setIsData] = useState(false);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, label } = useSelector(state => state.dashboardReducer);
  const [selecetd1, setSelected1] = useState(false)
  const [objtypeslist, setObjtypeslist] = useState([])
  const [userslist, setUserslist] = useState([])
  const [useremail, setUseremail] = useState()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [editData, setEditData] = useState([])
  const [selectedDate, handleDateChange] = useState(new Date());
  const [openAlert, setOpenAlert] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [new_type, setNew_type] = useState()
  const [permis_update, setPermis_update] = useState(false)


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
        let conf = {
          headers: {
            Authorization: "Bearer " + config.ACCESS_TOKEN(),
          },
        };

        let body;
        if ((label === undefined || label === null) && useremail === undefined) {
          body = {
            "Migration_TypeId": headerValue?.title,
          };
        }
        else if (label === undefined || label === null) {
          body = {
            "Migration_TypeId": headerValue?.title,
            "User_Email": useremail
          };
        } else {
          body = {
            "Migration_TypeId": headerValue?.title,
            "User_Email": useremail,
            "Object_Type": label
          };
        }

        const form = new FormData();
        Object.keys(body).forEach((key) => {
          form.append(key, body[key]);
        });
        axios.post(`${config.API_BASE_URL()}/api/permissionslist/`, form, conf).then(
          (res) => {

            setObjtypeslist(res.data)
            if (res.data.length > 0) {
              setIsData(true)
            } else {
              setIsData(false)
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

  }, [headerValue, label,permis_update])

  const handleAccessReview = () => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let body;
    if (label === undefined || label === null) {
      body = {
        "Migration_TypeId": headerValue?.title,
        "User_Email": useremail
      };
    } else {
      body = {
        "Migration_TypeId": headerValue?.title,
        "User_Email": useremail,
        "Object_Type": label
      };
    }
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/permissionslist/`, form, conf).then(
      (res) => {

        setObjtypeslist(res.data)
        if (res.data.length > 0) {
          setIsData(true)
        } else {
          setIsData(false)
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
    // setIsData(false)
  }

  const handleuseremail = (v) => {
    setSelected1(true)
    setUseremail(v?.email)
  }
  const handleEdit_Remove = (data, action) => {
    setConfirmDialog({
      confirmDialog,
      isOpen: false
    })
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    
    if (action === 'Edit') {
      let bodyedit = {
        "Migration_TypeId": data.Migration_TypeId,
        "User_Email": data.User_Email,
        "Object_Type": data.Object_Type,
        "Action": action,
        "Feature_Name": data.Feature_Name,
        "Access_Type": data.Access_Type,
        "New_Access_Type": new_type,
        "New_Expiry_Date": editData.Expiry_date

      };

      const formedit = new FormData();
      Object.keys(bodyedit).forEach((key) => {
        formedit.append(key, bodyedit[key]);
      });
      axios.post(`${config.API_BASE_URL()}/api/permissions_edit_rm/`, formedit, conf).then(
        (res) => {
          setOpen1(false)
          setNotify({
            isOpen: true,
            message: 'Permmission Updated Successfully',
            type: "success",
          });
          setPermis_update(true)

          setEditData({
            ...editData,
            Access_Type: ''
          })
          setNew_type('')
         
          
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: 'Something Went Wrong Please try Again',
            type: "error",
          });
        }
      )
    } else {
      let bodyrm = {
        "Migration_TypeId": data.Migration_TypeId,
        "User_Email": data.User_Email,
        "Object_Type": data.Object_Type,
        "Action": action,
        "Feature_Name": data.Feature_Name,
        "Access_Type": data.Access_Type,
        "New_Access_Type": '',
        "New_Expiry_Date": ''

      };
      const formrm = new FormData();
      Object.keys(bodyrm).forEach((key) => {
        formrm.append(key, bodyrm[key]);
      });
      axios.post(`${config.API_BASE_URL()}/api/permissions_edit_rm/`, formrm, conf).then(
        (res) => {
          setNotify({
            isOpen: true,
            message: 'Permission Removed',
            type: "success",
          });
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: 'Something Went Wrong Please try Again',
            type: "error",
          });
        }
      )
    }
    setPermis_update(false)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  // console.log(userslist)
  const handleSelectgroup = (value) => {
    setNew_type(value)
  }

  const handleChangeDate = (date) => {
    date = moment(date).format('YYYY-MM-DD');
    setEditData({
      ...editData,
      Expiry_date: date
    })
  }

  return (
    <Box style={{ width: '97%', marginLeft: 10 }} className={classes.Accesslistcontainer}>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              User Permissions
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2}>
        <Grid container direction='row' justifyContent='center' spacing={1}>

          <Grid item>
            <TextField
              id="outlined-multiline-static"
              label="Migration Type"
              // onChange={(e) => handleChange(e)}
              name='MigrationType_Id'
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
              size='small'
              disabled
              style={{ width: 300 }}

            />
          </Grid>
          <Grid item >

            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.email}
              style={{ width: 300 }}
              onChange={(e, v) => handleuseremail(v)}
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
            <Button
              variant="contained"
              disabled={!selecetd1}
              color="primary"
              component="span"
              // style={{ marginTop: 5, marginLeft: 100 }}
              onClick={() => handleAccessReview()}
            >
              {" "}
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>



      <Box py={2} px={2}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <TableContainer className={classestable.table}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={classes.primary}>
                  <TableRow>
                    <StyledTableCell align="left">User Email-ID</StyledTableCell>
                    <StyledTableCell align="left">Migration Type</StyledTableCell>
                    <StyledTableCell align="left">Object Type</StyledTableCell>
                    <StyledTableCell align="left">Feature Name</StyledTableCell>
                    <StyledTableCell align="left">Access Type</StyledTableCell>
                    <StyledTableCell align="left">Approved by</StyledTableCell>
                    <StyledTableCell align="left">Created date</StyledTableCell>
                    <StyledTableCell align="left">Expiry date</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {isData ? (
                    <>
                      {objtypeslist.map((item) =>
                        <StyledTableRow container>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.User_Email}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Migration_TypeId}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Object_Type}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Feature_Name}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Access_Type}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Approved_by}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Created_at}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Expiry_date}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <Box flexDirection="row">
                              <div className={classes.texttablecell}>
                                <IconButton
                                  onClick={(e) => { setEditData(item);setNew_type(item.Access_Type); setOpen1(true) }}

                                >
                                  <EditIcon style={{ color: "blue" }} />

                                </IconButton>
                                <IconButton
                                  onClick={(e) => {

                                    setConfirmDialog({
                                      isOpen: true,
                                      title: 'Do You Want Remove the Permission?',
                                      onConfirm: () => { handleEdit_Remove(item, 'Remove') }
                                    })
                                  }}
                                >

                                  <DeleteIcon style={{ color: "red" }} />
                                </IconButton>
                              </div>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  )
                    : <>
                      <StyledTableRow container>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">No Requests</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </StyledTableRow>
                    </>
                  }


                </TableBody>
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
                Edit Permissions
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
                  defaultValue={{ title: editData.Access_Type }}
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
                    value={editData.Expiry_date}
                    size="small"
                    onChange={date => handleChangeDate(date)}
                    defaultValue={editData.Expiry_date}
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
                  onClick={() => { handleEdit_Remove(editData, 'Edit') }}
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Box>
  )
}