import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Notification from "../Notifications/Notification";
import config from "../../Config/config";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import axios from "axios";
import MenuAppBar from '../../Components/header'
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


const useStylestable = makeStyles((theme) => ({

  
  table: {
    minWidth: 100,
    // width:10
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,

  },

}))

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
  requestcontainer: {

   
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
    width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // '&:hover': {
    //     overflow: 'visible'
    // }
  },

  table: {
    // minWidth: 150,
    width: '60%',
    height: '10%',
    border: '1px black'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
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

export default function Request() {
  const classes = useStyles();
  const classestable = useStylestable();
  const [isData, setIsData] = useState(false);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, project_version } = useSelector(state => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title)
  const [objtype, setObjtype] = useState()
  const [fnnames, setFnnames] = useState([])
  const [data, setData] = useState([])
  const [selecetd, setSelected] = useState(false)
  const [objtypeslist, setObjtypeslist] = useState([])
  const [fnname, setFnname] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [flag, setFlag] = useState(0)
  const [objcount, setobjcount] = useState(0)
  const [editflag, setEditflag] = useState(0)
  let history = useHistory();


  useEffect(() => {
    // let sval = 0;
    // if (headerValue) {
    //   if (headerValue.title === "Oracle TO Postgres") {
    //     sval = 1;
    //   } else if (headerValue.title === "SQLServer TO Postgres") {
    //     sval = 2;
    //   } else if (headerValue.title === "MYSQL TO Postgres") {
    //     sval = 3;
    //   }
    // }

    // if (objtype !== 'All') {
    if (objtype === 'ALL') {
      setFnnames([{ 'Feature_Name': "ALL" }])
    }
    else if (objcount === 0) {
      setFnnames([])
    }
    else {
      let body = {
        "Object_Type": objtype,
        "Migration_TypeId": headerValue?.title,
        "Feature_Name": fnname,
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
      // }
      // else{
      //   setFnnames({Feature_Name:'All'})

    }
  }, [objtype]);

  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };

    let body = {
      "Migration_TypeId": headerValue?.title,
      "Project_Version_Id": project_version
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/objectviewtlist/`, form, conf).then(
      (res) => {
        if (res.data.length > 0) {
          setObjtypeslist(([{ Object_Type: "ALL" }]).concat(res.data))
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
  }, [headerValue?.title, project_version]);


  // console.log(headerValue.title)
  const handleObjecttype = (v) => {
    setObjtype(v.Object_Type)
  }

  const handledropdown = (e, v) => {

    if (v?.Feature_Name === 'ALL') {
      setSelected(false)
      // setEditflag(0)
      // setFlag(0)
      setFnname(v?.Feature_Name)
    } else {
      setSelected(true)
      setFnname(v?.Feature_Name)
    }
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      'User_Email': sessionStorage.getItem('uemail'),
      "Migration_Type": headerValue?.title,
      "Object_Type": objtype,
      "Feature_Name": v?.Feature_Name,
      "Project_Version_Id": project_version
    }
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/fdetailcatlog/`, form, conf).then(
      (res) => {
        setData(res.data?.serializer)
        // setEditflag(res.data?.edit)
        setFlag(res.data?.flag)
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


  const handleRequestAccess = (type) => {
    let access = ''
    if (type === 'Edit') {
      access = 'Edit'
    } else {
      access = 'View'
    }

    // if (objtype) {
    //   fnname = 'All'
    // }
    let body = {
      "Object_Type": objtype,
      "Migration_TypeId": headerValue?.title,
      "User_Email": sessionStorage.getItem('uemail'),
      "Feature_Name": fnname,
      "Approval_Status": 'Pending',
      "Access_Type": access,
      "Expiry_date": moment(new Date()).format('YYYY-MM-DD'),
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

    axios.post(`${config.API_BASE_URL()}/api/approvalscreate`, form, conf).then(
      (res) => {
        if (res.data === 'Request Already Sent') {
          setNotify({
            isOpen: true,
            message: "Request Already Sent to Admin Please Wait for the Approval",
            type: "error",
          });
        } else {
          setNotify({
            isOpen: true,
            message: "Request Sent Please Wait For The Admin Approval",
            type: "success",
          });
        }
      },
      (error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: "Something Went Wrong Please Try Again!",
          type: "error",
        });
      }
    );
  }
  return (
    <div  className={classes.requestcontainer}>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Request
            </Typography>
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
          <Grid item  >

            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={objtypeslist}
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
              // defaultValue={{ Feature_Name: "All" }}
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
                    shrink: true
                  }}

                />

              )}

            />
          </Grid>

          {fnname !== 'ALL' ? <>
            <Grid item xs={12} md={6}>


              <div className="App">
                <p>{'Source Description'}</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={data?.Source_FeatureDescription}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  // onChange={(event, editor) => {
                  //   const data = editor.getData();
                  //   handletarget(data)
                  //   // console.log( { event, editor, data } );
                  // }}
                  // onChange={(e) => setTarget_FeatureDescription(e.target.value)}

                  // config={{
                  //   extraPlugins: [uploadPlugin]
                  // }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                  disabled
                />
              </div>

            </Grid>


            <Grid item xs={12} md={6}>


              <div className="App">
                <p>{'Target Description'}</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={data?.Target_FeatureDescription}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  // onChange={(event, editor) => {
                  //   const data = editor.getData();
                  //   handletarget(data)
                  //   // console.log( { event, editor, data } );
                  // }}
                  // onChange={(e) => setTarget_FeatureDescription(e.target.value)}

                  // config={{
                  //   extraPlugins: [uploadPlugin]
                  // }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                  disabled
                />
              </div>

            </Grid>
          </>
            : <>

            </>}

        </Grid>
      </Box>
      <Box className={classes.root}>
        <Grid container direction="row" justifyContent="center">
          <Grid item direction="row" justifyContent="center" spacing={1}>


            {flag === 1 ?
              <Button variant="contained"
                // disabled={!selecetd}
                // startIcon={<CloudUploadIcon />}
                size='small'
                color="primary" component="span" style={{ marginTop: 15, width: "190px" }}
                onClick={(e) => { handleRequestAccess('View') }}>
                Request View Access
              </Button> : <Button variant="contained"
                disabled
                // startIcon={<CloudUploadIcon />}
                size='small'
                color="primary" component="span" style={{ marginTop: 15, width: "190px" }}
                onClick={(e) => { handleRequestAccess('View') }}>
                Request View Access
              </Button>
            }
            {" "}


            {flag !== 1 || flag === 2 ?

              <Button variant="contained"
                disabled={!selecetd}
                size='small'
                onClick={() =>
                  history.push({
                    pathname: `/requestdata`,
                    data: { data },
                  })}
                color="primary" component="span" style={{ marginTop: 15, width: "100px" }} >
                Show All
              </Button> : <Button variant="contained"
                disabled
                size='small'
                onClick={() =>
                  history.push({
                    pathname: `/requestdata`,
                    data: { data },
                  })}
                color="primary" component="span" style={{ marginTop: 15, width: "100px" }} >
                Show All
              </Button>
            }
            {"   "}
            {flag === 2 || flag === 1 ?
              <Button variant="contained"
                // disabled={!selecetd}
                // startIcon={<CloudUploadIcon />}
                size='small'
                color="primary" component="span" style={{ marginTop: 15, width: "180px" }}
                onClick={(e) => { handleRequestAccess('Edit') }}>
                Request Edit Access
              </Button> : <Button variant="contained"
                disabled
                // startIcon={<CloudUploadIcon />}
                size='small'
                color="primary" component="span" style={{ marginTop: 15, width: "180px" }}
                onClick={(e) => { handleRequestAccess('Edit') }}>
                Request Edit Access
              </Button>
            }
          </Grid>

        </Grid>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      {/* <Box direction='row'>
        <Grid container >

          <Button variant="contained"
            // startIcon={<CloudUploadIcon />}
            color="primary" component="span" style={{ marginTop: 15 }}>
            Request Access

          </Button>
        </Grid>
        <Grid container >
          <Button variant="outlined"
            // startIcon={<CloudUploadIcon />}
            color="primary" component="span" style={{ marginTop: 15, width:"170px" }}>
            Show All

          </Button>
        </Grid>
      </Box> */}
    </div>
  )
}