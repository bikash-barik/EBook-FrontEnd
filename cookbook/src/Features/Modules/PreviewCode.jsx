import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Notification from "../Notifications/Notification";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import TableBody from "@material-ui/core/TableBody";
// import fileDownload from "js-file-download";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper, TextField, Button, styled } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { useHistory, Link } from "react-router-dom";
// import fileDownload from "js-file-download";
import API_BASE_URL from "../../Config/config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import config from "../../Config/config";
import ActionMenu from "../../../src/Redux/actions/Menuaction";
import { Label } from "@material-ui/icons";
import fileSaver from "file-saver";
const useStylestable = makeStyles({
  table: {
    minWidth: 100,
    // width:10
  },
});
const useStyles = makeStyles((theme) => ({
  container: {


    [theme.breakpoints.down('sm')]: {
      marginTop: "180px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "120px",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "40px",
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "0px",
    },
  },

  texttablecell: {
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // '&:hover': {
    //     overflow: 'visible'
    // }
  },
  root: {
    // display: "flex",
  },
  lineheight: {
    lineHeight: "30px",
  },

  Object_Type: {
    margin: "16px 0",
    fontSize: "24px",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0em",
    paddingLeft: 1,
  },

  Description: {
    margin: "0 0 40px",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: "0em",
    paddingLeft: 3,
  },

  SourceDescription: {
    display: "block",
    lineHeight: 1.5,
    fontSize: "1.15rem",
    borderRadius: "10px",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: " 0px",
    webkitJustifyContent: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#E7EBF0",
    paddingLeft: 30,
  },

  SourceCode: {
    margin: "24px auto",
    padding: "24px",
    fontSize: "1.35rem",
    color: "#FFF",
    overflow: "auto",
    direction: "ltr",
    maxHeight: "500px",
    lineHeight: 2,
    maxWidth: "calc(78vw - 32px)",
    borderRadius: " 5px",
    backgroundColor: "#383f4a",
    webkitOverflowScrolling: "touch",
  },

  Editpart: {
    borderRadius: "5px",
    justifyItems: "center",
    padding: "10px 5px 0px 5px",
    // backgroundColor: "#E7EBF0",
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
      borderColor: "blue",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
});




export default function PreviewCode(props) {
  const classes = useStyles();
  const classestable = useStylestable();
  const [detaildata, setDetaildata] = useState();
  // const id = props.InfoId;
  let history = useHistory();
  const [isdata, setIsdata] = useState(false);
  const dispatch = useDispatch();
  const [source_att, setSource_att] = useState([]);
  const [target_att, setTarget_att] = useState([]);
  const [conv_att, setConv_att] = useState([]);
  const { menuitem } = useSelector((state) => state.dashboardReducer);
  const [issattdata, setIssattdata] = useState(false);
  const [iscattdata, setIscattdata] = useState(false);
  const [istattdata, setIstattdata] = useState(false);

  const [source_codeatt, setSource_codeatt] = useState([]);
  const [target_acodeatt, setTarget_acodeatt] = useState([]);
  const [target_ecodeatt, setTarget_ecodeatt] = useState([]);
  const [isscattdata, setIsscattdata] = useState(false);
  const [istaattdata, setIstaattdata] = useState(false);
  const [istettdata, setIstettdata] = useState(false);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, lable, project_version } = useSelector(state => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title)
  const [objtype, setObjtype] = useState()
  const [max_flag_ver, setMax_flag_ver] = useState()
  const [fnnames, setFnnames] = useState([])
  const [fnname, setFnname] = useState()
  const [checkIsEdit, setCheckIsEdit] = useState(0)
  const [versionSelect, setVersionSelect] = useState('')
  const [fversionslist, setFversionslist] = useState([])
  const [latest_flag, setLatest_flag] = useState(0)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [att_update, setAtt_update] = useState(false);



  useEffect(() => {

    if (menuitem) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };

      let body = {
        "Migration_Type": headerValue?.title,
        "Object_Type": lable,
        'Feature_Name': menuitem,
        'Project_Version_Id': project_version
      }
      const form = new FormData();
      Object.keys(body).forEach((key) => {
        form.append(key, body[key]);
      });

      axios
        .post(`${config.API_BASE_URL()}/api/fversions/`, form, conf)
        .then(
          (res) => {
            setFversionslist(res.data)
            if (res.data.length > 0) {
              Object.keys(res.data).forEach((key) => {
                setVersionSelect(String(res.data[key]?.title))
              });
              // setVersionSelect(String(res.data.length))
            }
            // else {
            //   setVersionSelect(String(1))
            // }

          },
          (error) => {
            setNotify({
              isOpen: true,
              message: 'Something Went Wrong Please try Again',
              type: "error",
            });
          }
        );
    } else {
      setDetaildata();
    }
  }, [menuitem]);

  useEffect(() => {
    if (menuitem) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };

      let body = {
        'User_Email': sessionStorage.getItem('uemail'),
        "Migration_Type": headerValue?.title,
        "Object_Type": lable,
        "Project_Version_Id": project_version
      }
      const form = new FormData();
      Object.keys(body).forEach((key) => {
        form.append(key, body[key]);
      });

      axios
        .post(`${config.API_BASE_URL()}/api/fdetail/${menuitem || null}`, form, conf)
        .then(
          (res) => {
            console.log(res.data);
            Object.keys(res.data).forEach((val) => {
              if (res.data[val]?.Max_Flag === 1) {
                setDetaildata(res.data[val]?.serializer);
                setFnname(res.data[val]?.serializer?.Feature_Name)
                setObjtype(res.data[val]?.serializer?.Object_Type)
                setIsdata(true);
                setCheckIsEdit(res.data[val]?.edit)
                setLatest_flag(res.data[val]?.Latest_Flag)
                setMax_flag_ver(res.data[val]?.Max_Project_Flag)
                // Max_Project_Flag
                // setVersionSelect(res.data[val]?.Feature_Version_Id)
              }
              // else{
              //   setCheckIsEdit(0)
              //   setLatest_flag(0)
              // }
            })

          },
          (error) => {
            setNotify({
              isOpen: true,
              message: 'Something Went Wrong Please try Again',
              type: "error",
            });
          }
        );
    } else {
      setDetaildata();
    }
  }, [menuitem, att_update]);

  // const handleObjecttype = (v) => {
  //   setObjtype(v.Object_Type)
  // }

  useEffect(() => {
    // console.log("menus ", menuitem);
    if (detaildata) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios.get(`${config.API_BASE_URL()}/api/sourcedesc/${detaildata.Feature_Id}`, conf).then(
        (res) => {
          setSource_att(res.data);
          if (res.data.length > 0) {
            setIssattdata(true);
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
  }, [detaildata, att_update]);
  useEffect(() => {
    if (detaildata) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios.get(`${config.API_BASE_URL()}/api/targetdesc/${detaildata.Feature_Id}`, conf).then(
        (res) => {
          setTarget_att(res.data);
          if (res.data.length > 0) {
            setIstattdata(true);
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
  }, [detaildata, att_update]);

  useEffect(() => {
    if (detaildata) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios.get(`${config.API_BASE_URL()}/api/convatt/${detaildata.Feature_Id}`, conf).then(
        (res) => {
          setConv_att(res.data);
          if (res.data.length > 0) {
            setIscattdata(true);
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
  }, [detaildata, att_update]);

  useEffect(() => {
    if (detaildata) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios.get(`${config.API_BASE_URL()}/api/codefiles/${detaildata.Feature_Id}`, conf).then(
        (res) => {
          setSource_codeatt(res.data);
          console.log(res.data);
          if (res.data.length > 0) {
            setIsscattdata(true);
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
  }, [detaildata, att_update]);

  const handleDownload = (att_Type, migtypeid, id, obj_type, att_name, fid) => {
    // if (migtypeid === "1") {
    //   migtypeid = "Oracle TO Postgres";
    //   // setMigtypeid(1)
    // } else if (migtypeid === "2") {
    //   migtypeid = "SQLServer TO Postgres";
    //   // setMigtypeid(2)
    // } else if (migtypeid === "3") {
    //   migtypeid = "MYSQL TO Postgres";
    //   // setMigtypeid(3)
    // }
    let body = {
      file_name: att_name,
      migration_typeid: migtypeid,
      object_type: obj_type,
      AttachmentType: att_Type,
      id: id,
      fname: detaildata.Feature_Name,
      feature_id: fid
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
        "Content-Type": "application/json",
      },
    };
    // console.log(conf.headers);
    axios
      .post(`${config.API_BASE_URL()}/api/download_att`, body, {
        responseType: "arraybuffer",
      })
      .then((res) => {

        var blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fileSaver.saveAs(blob, att_name);

      })
      .catch((err) => { });
  };

  const handleAttachment_delete = (
    AttachmentType,
    Migration_TypeId,
    id,
    Object_Type,
    fname
  ) => {
    let formData = {
      migration_typeid: Migration_TypeId,
      object_type: Object_Type,
      file_name: fname,
      AttachmentType: AttachmentType,
      id: id,
      fname: detaildata.Feature_Name,
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/attdelete`, form, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: "File Deleted",
          type: "success",
        });
        setAtt_update(true);
      },
      (error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: "Something Went Wrong! Please try Again",
          type: "error",
        });
        setAtt_update(true);
      }
    );
    setAtt_update(false);
  };

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


  const handleRequestAccess = () => {
    let body = {
      "Object_Type": objtype,
      "Migration_TypeId": headerValue?.title,
      "User_Email": sessionStorage.getItem('uemail'),
      "Feature_Name": fnname,
      "Approval_Status": 'Pending',
      "Access_Type": 'Edit'

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
            message: res.data,
            type: "error",
          });
        } else {
          setNotify({
            isOpen: true,
            message: "Request Sent Please Wiat For The Admin Approval",
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

  const handleFeatureversion = (versionnumber) => {
    setVersionSelect(String(versionnumber))
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };

    let body = {
      'User_Email': sessionStorage.getItem('uemail'),
      "Migration_Type": headerValue?.title,
      "Object_Type": lable,
      "Project_Version_Id": project_version
    }
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/fdetail/${menuitem}`, form, conf)
      .then(
        (res) => {
          console.log(res.data);
          Object.keys(res.data).forEach((val) => {
            if (res.data[val].serializer.Feature_Version_Id === versionnumber) {
              setDetaildata(res.data[val].serializer);
              setFnname(res.data[val]?.serializer?.Feature_Name)
              setObjtype(res.data[val]?.serializer?.Object_Type)
              setIsdata(true);
              setCheckIsEdit(res.data[val]?.edit)
              setLatest_flag(res.data[val]?.Latest_Flag)
              setMax_flag_ver(res.data[val]?.Max_Project_Flag)



            }
          })

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

  var data = null;
  let seq = null;
  if (detaildata) {

    seq = detaildata.Sequence;

    data = (
      <div className={classes.container}>
        <Box py={1} px={1}>
          <Grid container direction='row' justifyContent='center'>
            <Grid item xs={3}>
              <Typography variant='h7' component="h7">
                <strong>Created By :</strong> {detaildata?.Feature_Created_by}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h7'>
              <strong> Created Date :</strong> {detaildata?.Feature_Created_at}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant='h7'>
              <strong>Modified By :</strong> {detaildata?.Last_Modified_by}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h7'>
              <strong>Modified Date :</strong> {detaildata?.Last_Modified_at}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid container justifyContent="flex-end" style={{ paddingTop: 10 }} spacing={2}>
            <Grid item>
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                className={classes.inputRoottype}
                options={fversionslist}
                // renderTags={() => null}
                // freeSolo
                // displayEmpty

                groupBy={""}
                defaultValue={{ title: String(versionSelect) }}
                value={versionSelect}
                getOptionLabel={(option) => option?.title}
                style={{ width: 110 }}
                onChange={(e, v) => handleFeatureversion(v?.code)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Versions"
                    variant="outlined"
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                      shrink: true,
                    }}
                    placeholder={String(versionSelect)}
                  />
                )}
              />
            </Grid>
            {
              max_flag_ver === 1 ? <>
                {checkIsEdit === 0 ? <>
                  {
                    latest_flag === 0 ?

                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          component="span"
                          disabled
                          // startIcon={<EditSharpIcon />}
                          // onClick={
                          //   () => {
                          //     dispatch(
                          //       ActionMenu.EditPreviewFeature({ data: detaildata })
                          //     );

                          //     history.push("/EditFeature");
                          //   }
                          // }
                          onClick={(e) => { handleRequestAccess('Edit') }}>

                          Request Edit Access
                        </Button>
                      </Grid>
                      : <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          component="span"

                          // startIcon={<EditSharpIcon />}
                          // onClick={
                          //   () => {
                          //     dispatch(
                          //       ActionMenu.EditPreviewFeature({ data: detaildata })
                          //     );

                          //     history.push("/EditFeature");
                          //   }
                          // }
                          onClick={(e) => { handleRequestAccess('Edit') }}>

                          Request Edit Access
                        </Button>
                      </Grid>
                  }
                </>

                  :
                  <>

                    {
                      latest_flag === 0 ?
                        <>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<EditSharpIcon />}
                              disabled
                              onClick={
                                () => {
                                  dispatch(
                                    ActionMenu.EditPreviewFeature({ data: detaildata })
                                  );

                                  history.push("/EditFeature");
                                }
                                // history.push({
                                //   pathname: `/edit/${detaildata.Feature_Id}`,
                                //   data: { detaildata },

                                // })
                              }
                            >
                              Edit
                            </Button>
                          </Grid>
                        </>
                        :
                        <>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<EditSharpIcon />}
                              onClick={
                                () => {
                                  dispatch(
                                    ActionMenu.EditPreviewFeature({ data: detaildata })
                                  );

                                  history.push("/EditFeature");
                                }
                                // history.push({
                                //   pathname: `/edit/${detaildata.Feature_Id}`,
                                //   data: { detaildata },

                                // })
                              }
                            >
                              Edit
                            </Button>
                          </Grid>
                        </>

                    }
                  </>
                }

              </>
                :
                <>

                  {checkIsEdit === 0 ? <>
                    {
                      latest_flag === 0 ?

                        <Grid item>
                          <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            disabled
                            // startIcon={<EditSharpIcon />}
                            // onClick={
                            //   () => {
                            //     dispatch(
                            //       ActionMenu.EditPreviewFeature({ data: detaildata })
                            //     );

                            //     history.push("/EditFeature");
                            //   }
                            // }
                            onClick={(e) => { handleRequestAccess('Edit') }}>

                            Request Edit Access
                          </Button>
                        </Grid>
                        : <Grid item>
                          <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            disabled
                            // startIcon={<EditSharpIcon />}
                            // onClick={
                            //   () => {
                            //     dispatch(
                            //       ActionMenu.EditPreviewFeature({ data: detaildata })
                            //     );

                            //     history.push("/EditFeature");
                            //   }
                            // }
                            onClick={(e) => { handleRequestAccess('Edit') }}>

                            Request Edit Access
                          </Button>
                        </Grid>
                    }
                  </>

                    :
                    <>

                      {
                        latest_flag === 0 ?
                          <>
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<EditSharpIcon />}
                                disabled
                                onClick={
                                  () => {
                                    dispatch(
                                      ActionMenu.EditPreviewFeature({ data: detaildata })
                                    );

                                    history.push("/EditFeature");
                                  }
                                  // history.push({
                                  //   pathname: `/edit/${detaildata.Feature_Id}`,
                                  //   data: { detaildata },

                                  // })
                                }
                              >
                                Edit
                              </Button>
                            </Grid>
                          </>
                          :
                          <>
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<EditSharpIcon />}
                                disabled
                                onClick={
                                  () => {
                                    dispatch(
                                      ActionMenu.EditPreviewFeature({ data: detaildata })
                                    );

                                    history.push("/EditFeature");
                                  }
                                  // history.push({
                                  //   pathname: `/edit/${detaildata.Feature_Id}`,
                                  //   data: { detaildata },

                                  // })
                                }
                              >
                                Edit
                              </Button>
                            </Grid>
                          </>

                      }
                    </>
                  }
                </>
            }

          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={2}>
            <Typography
              gutterBottom
              variant="h5"
              // align="center"
              component="h2"
              className={classes.Object_Type}
            >
              Object Type
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>
              {/* {detaildata[0].Object_Type.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })} */}
              {detaildata.Object_Type}
              {/* </Typography> */}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={2}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Feature Name
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>
              {/* {detaildata[0].Feature_Name.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })} */}
              {detaildata.Feature_Name}
              {/* </Typography> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={2}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              // align="center"
              className={classes.Object_Type}
            >
              Level
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>{detaildata.Level}</div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={2}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Predecessor
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>{seq}</div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={2}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Keywords
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>{detaildata.Keywords}</div>


          </Grid>


          <Grid item xs={12} sm={6} md={6} lg={2} >

            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Estimation
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>{detaildata.Estimations}</div>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Source Feature Description
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.SourceDescription}>
              {/* {detaildata[0].Source_FeatureDescription.split("\n").map(
                (i, key) => {
                  return <div key={key}>{i}</div>;
                }
              )} */}
              <div className="App">
                {/* <h2>{'Source Description'}</h2> */}
                <CKEditor
                  editor={ClassicEditor}
                  data={detaildata.Source_FeatureDescription}
                  // value ={detaildata[0].Source_FeatureDescription}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  // onChange={(event, editor) => {
                  //     const data = editor.getData();
                  //     handledes(data)
                  //     // console.log( { event, editor, data } );
                  // }}

                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                  disabled="true"
                />
              </div>
              {/* </Typography> */}
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Feature Description
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.SourceDescription}>
              {/* {detaildata[0].Target_FeatureDescription.split("\n").map(
                (i, key) => {
                  return <div key={key}>{i}</div>;
                }
              )} */}
              <CKEditor
                editor={ClassicEditor}
                data={detaildata.Target_FeatureDescription}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                // onChange={(event, editor) => {
                //     const data = editor.getData();
                //     handledes(data)
                //     // console.log( { event, editor, data } );
                // }}

                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
                disabled="true"
              />
              {/* </Typography> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Source Code
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>{detaildata.Source_Code}</code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Expected Code
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>{detaildata.Target_Expected_Output}</code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Actual Code
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>{detaildata.Target_ActualCode}</code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Conversion Module
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>{detaildata.Conversion_Code}</code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>
        </Grid>

        <Grid container xl={12} justifyContent="space-between" spacing={1}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              SQL Code Attachemnets
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                  <StyledTableCell align="left">File Name</StyledTableCell>
                  <StyledTableCell align="left">Source Code</StyledTableCell>
                  <StyledTableCell align="left">
                    Expected Target Code
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Actual Target Code
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">Actions</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {isscattdata ? (
                  <>
                    {source_codeatt.map((row) => (
                      <StyledTableRow container>
                        {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            {row.filename}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            <Box flexDirection="row">
                              {row.Sourcecode}
                              {row.Sourcecode == "Y" ? (
                                <>
                                  <IconButton
                                    onClick={() =>
                                      handleAttachment_delete(
                                        "Sourcecode",
                                        detaildata.Migration_TypeId,
                                        row.sid,
                                        detaildata.Object_Type,
                                        row.filename
                                      )
                                    }
                                  >
                                    <DeleteIcon style={{ color: "red" }} />
                                  </IconButton>
                                  <IconButton
                                    onClick={(e) =>
                                      handleDownload(
                                        "Sourcecode",
                                        detaildata.Migration_TypeId,
                                        row.sid,
                                        detaildata.Object_Type,
                                        row.filename,
                                        detaildata.Feature_Id
                                      )
                                    }
                                  >
                                    <GetAppIcon style={{ color: "blue" }} />
                                  </IconButton>{" "}
                                </>
                              ) : null}
                            </Box>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            <Box flexDirection="row">
                              {row.Expectedconversion}
                              {row.Expectedconversion == "Y" ? (
                                <>
                                  <IconButton
                                    onClick={() => {
                                      handleAttachment_delete(
                                        "Expectedconversion",
                                        detaildata.Migration_TypeId,
                                        row.etid,
                                        detaildata.Object_Type,
                                        row.filename
                                      );
                                    }}
                                  >
                                    <DeleteIcon style={{ color: "red" }} />
                                  </IconButton>
                                  <IconButton
                                    onClick={(e) =>
                                      handleDownload(
                                        "Expectedconversion",
                                        detaildata.Migration_TypeId,
                                        row.etid,
                                        detaildata.Object_Type,
                                        row.filename,
                                        detaildata.Feature_Id
                                      )
                                    }
                                  >
                                    <GetAppIcon style={{ color: "blue" }} />
                                  </IconButton>{" "}
                                </>
                              ) : null}
                            </Box>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            <Box flexDirection="row">
                              {row.Actualtargetcode}
                              {row.Actualtargetcode == "Y" ? (
                                <>
                                  <IconButton
                                    onClick={() => {
                                      handleAttachment_delete(
                                        "Actualtargetcode",
                                        detaildata.Migration_TypeId,
                                        row.atid,
                                        detaildata.Object_Type,
                                        row.filename
                                      );
                                    }}
                                  >
                                    <DeleteIcon style={{ color: "red" }} />
                                  </IconButton>
                                  <IconButton
                                    onClick={(e) =>
                                      handleDownload(
                                        "Actualtargetcode",
                                        detaildata.Migration_TypeId,
                                        row.atid,
                                        detaildata.Object_Type,
                                        row.filename,
                                        detaildata.Feature_Id
                                      )
                                    }
                                  >
                                    <GetAppIcon style={{ color: "blue" }} />
                                  </IconButton>{" "}
                                </>
                              ) : null}
                            </Box>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  <>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="left">No Data</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </>
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid container xl={12} justifyContent="space-between" spacing={1}>
          <Grid item xl={4} xs={12} sm={12} md={4}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Source Description
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                  <StyledTableCell align="center">File</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issattdata ? (
                  <>
                    {source_att.map((row) => (
                      <StyledTableRow container>
                        {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            {row.filename}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={2}>
                          <Box flexDirection="row">
                            <IconButton
                              onClick={() =>
                                handleAttachment_delete(
                                  row.AttachmentType,
                                  detaildata.Migration_TypeId,
                                  row.id,
                                  detaildata.Object_Type,
                                  row.filename
                                )
                              }
                            >
                              <DeleteIcon style={{ color: "red" }} />
                            </IconButton>
                            <IconButton
                              onClick={(e) =>
                                handleDownload(
                                  row.AttachmentType,
                                  detaildata.Migration_TypeId,
                                  row.id,
                                  detaildata.Object_Type,
                                  row.filename,
                                  detaildata.Feature_Id
                                )
                              }
                            >
                              <GetAppIcon style={{ color: "blue" }} />
                            </IconButton>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  <>
                    {/* <StyledTableCell align="center"></StyledTableCell> */}
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </>
                )}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xl={4} xs={12} sm={12} md={4}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h5"
              className={classes.Object_Type}
            >
              Target Description
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                  <StyledTableCell align="center">File</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {istattdata ? (
                  <>
                    {target_att.map((row) => (
                      <StyledTableRow container>
                        {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            {row.filename}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={2}>
                          <Box flexDirection="row">
                            <IconButton
                              onClick={(e) =>
                                handleAttachment_delete(
                                  row.AttachmentType,
                                  detaildata.Migration_TypeId,
                                  row.id,
                                  detaildata.Object_Type,
                                  row.filename
                                )
                              }
                            >
                              <DeleteIcon style={{ color: "red" }} />
                            </IconButton>
                            <IconButton
                              onClick={(e) =>
                                handleDownload(
                                  row.AttachmentType,
                                  detaildata.Migration_TypeId,
                                  row.id,
                                  detaildata.Object_Type,
                                  row.filename,
                                  detaildata.Feature_Id
                                )
                              }
                            >
                              <GetAppIcon style={{ color: "blue" }} />
                            </IconButton>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  <>
                    {/* <StyledTableCell align="center"></StyledTableCell> */}
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </>
                )}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xl={4} xs={12} sm={12} md={4}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Conversion Module
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                  <StyledTableCell align="center">File</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {iscattdata ? (
                  <>
                    {conv_att.map((row) => (
                      <StyledTableRow container>
                        {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                        <StyledTableCell item xl={10}>
                          <div className={classes.texttablecell}>
                            {row.filename}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={2}>
                          <Box flexDirection="row">
                            <IconButton
                              onClick={(e) =>
                                handleAttachment_delete(
                                  row.AttachmentType,
                                  detaildata.Migration_TypeId,
                                  row.id,
                                  detaildata.Object_Type,
                                  row.filename
                                )
                              }
                            >
                              <DeleteIcon style={{ color: "red" }} />
                            </IconButton>
                            <IconButton
                              onClick={(e) =>
                                handleDownload(
                                  row.AttachmentType,
                                  detaildata.Migration_TypeId,
                                  row.id,
                                  detaildata.Object_Type,
                                  row.filename,
                                  detaildata.Feature_Id
                                )
                              }
                            >
                              <GetAppIcon style={{ color: "blue" }} />
                            </IconButton>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  <>
                    {/* <StyledTableCell align="center"></StyledTableCell> */}
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </>
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item style={{ marginTop: "10px" }}>

            {/* {checkIsEdit === 1 ?
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<EditSharpIcon />}
                // onClick={() =>
                //   // history.push({
                //   //   pathname: `/edit/${detaildata.Feature_Id}`,
                //   //   data: { detaildata },

                //   // })
                //   dispatch(ActionMenu.EditPreviewFeature({ data: detaildata }))
                // }
                onClick={() => {
                  dispatch(ActionMenu.EditPreviewFeature({ data: detaildata }));

                  history.push("/EditFeature");
                }}
              >
                Edit
              </Button> : null
            } */}


            {checkIsEdit === 0 ? <>
              {
                latest_flag === 0 ?

                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      // startIcon={<EditSharpIcon />}
                      // onClick={
                      //   () => {
                      //     dispatch(
                      //       ActionMenu.EditPreviewFeature({ data: detaildata })
                      //     );

                      //     history.push("/EditFeature");
                      //   }
                      // }
                      onClick={(e) => { handleRequestAccess('Edit') }}>

                      Request Edit Access
                    </Button>
                  </Grid>
                  : <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      disabled
                      // startIcon={<EditSharpIcon />}
                      // onClick={
                      //   () => {
                      //     dispatch(
                      //       ActionMenu.EditPreviewFeature({ data: detaildata })
                      //     );

                      //     history.push("/EditFeature");
                      //   }
                      // }
                      onClick={(e) => { handleRequestAccess('Edit') }}>

                      Request Edit Access
                    </Button>
                  </Grid>
              }
            </>

              :
              <>

                {
                  latest_flag === 0 ?
                    <>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          startIcon={<EditSharpIcon />}
                          disabled
                          onClick={
                            () => {
                              dispatch(
                                ActionMenu.EditPreviewFeature({ data: detaildata })
                              );

                              history.push("/EditFeature");
                            }
                            // history.push({
                            //   pathname: `/edit/${detaildata.Feature_Id}`,
                            //   data: { detaildata },

                            // })
                          }
                        >
                          Edit
                        </Button>
                      </Grid>
                    </>
                    :
                    <>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          startIcon={<EditSharpIcon />}
                          onClick={
                            () => {
                              dispatch(
                                ActionMenu.EditPreviewFeature({ data: detaildata })
                              );

                              history.push("/EditFeature");
                            }
                            // history.push({
                            //   pathname: `/edit/${detaildata.Feature_Id}`,
                            //   data: { detaildata },

                            // })
                          }
                        >
                          Edit
                        </Button>
                      </Grid>
                    </>

                }
              </>
            }
          </Grid>
        </Grid>
      </div>
    );
  }

  return (

    <Box style={{ width: '97%', marginLeft: 10 }}>
      {data}
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}
