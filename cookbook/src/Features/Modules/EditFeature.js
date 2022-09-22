import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from 'moment';
// import download from 'downloadjs'
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
// import fileDownload from "js-file-download";
import fileSaver from "file-saver";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import GetAppIcon from "@material-ui/icons/GetApp";
import TableRow from "@material-ui/core/TableRow";
import ConfirmDialog from "../Notifications/ConfirmDialog";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import CreatePreview from './CreatePreview';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuAppBar from "../../Components/header";
import { Box, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../Notifications/Notification";
import Menuaction from "../../Redux/actions/Menuaction";
import API_BASE_URL from "../../Config/config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory } from "react-router-dom";
import config from "../../Config/config";

const useStylestable = makeStyles({
  table: {
    minWidth: 100,
    // width:10
  },
});
const useStyles = makeStyles((theme) => ({

  EditFeatureContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: "180px",
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
    width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    '&:hover': {
      overflow: 'visible'
    }
  },
  convertbutton: {
    // color: "white",
    // backgroundColor: "blue",
    // top: "50%",
    // height: 30,
    // float: "right",
    marginLeft: "68vw",
    width: "80px",
    // position: "fixed",
    // transform: "translateY(-50%)"
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
}));

export default function EditFeature(props) {
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue, admin, project_version
  } = useSelector((state) => state.dashboardReducer);

  // console.log(props)
  // console.log("editdataprops", editPreviewdetails?.data)
  const history = useHistory();
  const [editdata, seteditdata] = useState({
    detaildata: editPreviewdetails?.data,
  });
  // const editdata = { detaildata: editPreviewdetails?.data }
  // console.log("editdata", editdata)
  const classes = useStyles();
  const classestable = useStylestable();

  const [formValues, setformvalues] = useState({
    Migration_TypeId: editPreviewdetails?.data?.type,
    Object_Type: editPreviewdetails?.data?.Label,
  });
  const [file, setfile] = useState([]);
  // const [AttachmentList, setAttachmentList] = useState({})

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  // const [migtypeid,setMigtypeid] = useState()
  const [Source_FeatureDescription, setSource_FeatureDescription] =
    useState("");
  const [Sequence, setSequence] = useState("");
  const [Target_FeatureDescription, setTarget_FeatureDescription] =
    useState("");
  const [Source_Code, setSource_Code] = useState("");
  const [Target_ActualCode, setTarget_ActualCode] = useState("");
  const [Target_Expected_Output, setTarget_Expected_Output] = useState("");
  const [Conversion_Code, setConversion_Code] = useState("");
  const [precon_val, setPrecon_val] = useState('')
  const [presource_code_val, setSource_code_val] = useState('')

  const [isTable, setIsTable] = useState(false);
  const [drop, setDrop] = useState("Sourcedescription");
  const [droptitle, setDroptitle] = useState("Source Description");
  // const [sourectabledata, setSourectabledata] = useState([])
  const [level, setLevel] = useState("");
  // const [targettabledata, setTargettabledata] = useState([])
  // const [contabledata, setContabledata] = useState([])
  const [source_att, setSource_att] = useState([]);
  const [target_att, setTarget_att] = useState([]);
  const [conv_att, setConv_att] = useState([]);
  const [issattdata, setIssattdata] = useState(false);
  const [iscattdata, setIscattdata] = useState(false);
  const [istattdata, setIstattdata] = useState(false);

  const [source_codeatt, setSource_codeatt] = useState([]);
  const [target_acodeatt, setTarget_acodeatt] = useState([]);
  const [target_ecodeatt, setTarget_ecodeatt] = useState([]);
  const [isscattdata, setIsscattdata] = useState(false);
  const [istaattdata, setIstaattdata] = useState(false);
  const [istettdata, setIstettdata] = useState(false);
  const [fupdate, setFupdate] = useState(false);
  const IsSuperAdmin = sessionStorage.getItem('isSuperAdmin')
  const [keywords, setkeyowrds] = useState("");
  const [estimation, setestimation] = useState("");

  const dispatch = useDispatch();

  useEffect((e) => {
    if (editdata.detaildata) {
      setSource_FeatureDescription(
        editdata.detaildata.Source_FeatureDescription
      );
      setTarget_FeatureDescription(
        editdata.detaildata.Target_FeatureDescription
      );
      setSource_Code(editdata.detaildata.Source_Code);
      setTarget_ActualCode(editdata.detaildata.Target_ActualCode);
      setTarget_Expected_Output(editdata.detaildata.Target_Expected_Output);
      setConversion_Code(editdata.detaildata.Conversion_Code);
      setSequence(editdata.detaildata.Sequence);
      setLevel(editdata.detaildata.Level);
      setkeyowrds(editdata.detaildata.Keywords);
      setestimation(editdata.detaildata.Estimations);
    } else {
      history.push({
        pathname: "/dashboard",
      });
    }
  }, []);

  useEffect(() => {
    if (!editdata.detaildata) {
      history.push({
        pathname: "/dashboard",
      });
    } else {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios
        .get(
          `${config.API_BASE_URL()}/api/sourcedesc/${editdata.detaildata.Feature_Id
          }`,
          conf
        )
        .then(
          (res) => {
            setSource_att(res.data);
            console.log(res.data);
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
  }, [fupdate]);
  useEffect(() => {
    if (!editdata.detaildata) {
      history.push({
        pathname: "/dashboard",
      });
    } else {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios
        .get(
          `${config.API_BASE_URL()}/api/targetdesc/${editdata.detaildata.Feature_Id
          }`,
          conf
        )
        .then(
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
  }, [fupdate]);

  useEffect(() => {
    if (!editdata.detaildata) {
      history.push({
        pathname: "/dashboard",
      });
    } else {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios
        .get(
          `${config.API_BASE_URL()}/api/convatt/${editdata.detaildata.Feature_Id
          }`,
          conf
        )
        .then(
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
  }, [fupdate]);

  useEffect(() => {
    if (!editdata.detaildata) {
      history.push({
        pathname: "/dashboard",
      });
    } else {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios
        .get(
          `${config.API_BASE_URL()}/api/codefiles/${editdata.detaildata.Feature_Id
          }`,
          conf
        )
        .then(
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
  }, [fupdate]);

  var handle_featurename = editdata?.detaildata?.Feature_Name

  const handleSubmit = (e) => {
    e.preventDefault();

    // var val = 0;
    // if (editdata.detaildata) {
    //   if (editdata.detaildata.Migration_TypeId === "Oracle TO Postgres") {
    //     val = 1;
    //   } else if (
    //     editdata.detaildata.Migration_TypeId === "SQLServer TO Postgres"
    //   ) {
    //     val = 2;
    //   } else if (editdata.detaildata.Migration_TypeId === "MYSQL TO Postgres") {
    //     val = 3;
    //   }
    // }
    let formData = {
      ...formValues,
      Migration_TypeId: editdata.detaildata?.Migration_TypeId,
      Object_Type: editdata.detaildata.Object_Type,
      Feature_Name: editdata.detaildata.Feature_Name,
      // Source_FeatureDescription, Target_FeatureDescription,
      Sequence: editdata.detaildata.Sequence,
      Source_FeatureDescription: Source_FeatureDescription,
      Target_FeatureDescription: Target_FeatureDescription,
      Target_Expected_Output: Target_Expected_Output,
      Target_ActualCode: Target_ActualCode,
      Source_Code: Source_Code,
      Conversion_Code: Conversion_Code,
      "Feature_version_approval_status": editdata.detaildata.Feature_version_approval_status,
      "Keywords": keywords,
      "Estimations": estimation,
      "Last_Modified_by": sessionStorage.getItem('uemail'),
      "Last_Modified_at": moment(new Date()).format('YYYY-MM-DD')
    };
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios
      .put(
        `${config.API_BASE_URL()}/api/fupdate/${editdata.detaildata.Feature_Id
        }`,
        form,
        conf
      )
      .then(
        (res) => {

          if (res.data === 'Request for approval already present.Please wait for admin to approve it') {
            console.log(res.data);
            setNotify({
              isOpen: true,
              message: res.data,
              type: "error",
            });
          } else {
            console.log(res.data);
            setNotify({
              isOpen: true,
              message: "Feature Updated Successfully",
              type: "success",
            });
          }

        },
        (error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "No Feature",
            type: "error",
          });
        }
      );

    // dispatch(Menuaction.reloadAction(true));
  };

  const handleChange = (e) => {
    if (e.target.value === null) {
      e.target.value = "";
    }
    setformvalues({
      ...editdata,
      [e.target.name]: [e.target.value],
    });
  };

  // const handledetale_conv = (value) => {
  //     const data = file.filter((item) => item.name != value.name)
  //     setConveratt(data)

  // }

  const handledes = (data) => {
    // setformvalues({
    //     ...formValues,
    //     "Source_FeatureDescription": data
    // })
    setSource_FeatureDescription(data);
  };
  const handletarget = (data) => {
    // setformvalues({
    //     ...formValues,
    //     "Target_FeatureDescription": data
    // })
    setTarget_FeatureDescription(data);
  };

  // if (editdata?.detaildata) {
  //   if (editdata.detaildata.Migration_TypeId === "1") {
  //     editdata.detaildata.Migration_TypeId = "Oracle TO Postgres";
  //     // setMigtypeid(1)
  //   } else if (editdata.detaildata.Migration_TypeId === "2") {
  //     editdata.detaildata.Migration_TypeId = "SQLServer TO Postgres";
  //     // setMigtypeid(2)
  //   } else if (editdata.detaildata.Migration_TypeId === "3") {
  //     editdata.detaildata.Migration_TypeId = "MYSQL TO Postgres";
  //     // setMigtypeid(3)
  //   }
  // }

  const handleDownload = (att_Type, migtypeid, id, obj_type, att_name, fid) => {
    let body = {
      file_name: att_name,
      migration_typeid: migtypeid,
      object_type: obj_type,
      AttachmentType: att_Type,
      id: id,
      fname: editdata.detaildata.Feature_Name,
      feature_id: fid,
      responseType: "blob",
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    // console.log(conf.headers)
    // axios
    //   .post(`${config.API_BASE_URL()}/api/download_att`, body, conf)
    //   .then((res) => {
    //     fileDownload(res.data, att_name);
    //     // const content = res.headers['content-type'];
    //     // download(res.data, att_name, content)
    //   })
    //   .catch((err) => { });

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
  const handledetale = (value) => {
    const data = file.filter((item) => item.name != value.name);
    setfile(data);
  };

  const handleConvertFiles = () => {
    // console.log('trigger convert files')
    let body = {
      Feature_Id: editdata.detaildata.Feature_Id,
      AttachmentType: "Sourcecode",
      Feature_Name: editdata.detaildata.Feature_Name,
      Migration_TypeId: editdata.detaildata.Migration_TypeId,
      Object_Type: editdata.detaildata.Object_Type,
      convcode: "r@rawstringstart'" + Conversion_Code + "'@rawstringend",
      "Project_Version_Id": editdata.detaildata.Project_Version_Id,
      "Feature_Version_Id": editdata.detaildata.Feature_Version_Id
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.post(`${config.API_BASE_URL()}/api/convertfiles`, body, conf).then(
      (res) => {
        if (res.data === 'Please Add Source Code Attachment') {
          setNotify({
            isOpen: true,
            message: res.data,
            type: "error",
          });
        } else {
          setNotify({
            isOpen: true,
            message: "Converted Files Please check",
            type: "success",
          });
          setFupdate(true);
        }

      },
      (error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: error.response.data.error,
          type: "error",
        });
        setFupdate(true);
      }
    );
    setFupdate(false);
  };

  const handleConvert = (e) => {
    e.preventDefault();
    // if (Conversion_Code === '') {
    //   setNotify({
    //     isOpen: true,
    //     message: "No Conversion Module, please add Conversion Module before Convert",
    //     type: "error",
    //   });

    // } else 
    if (Conversion_Code === precon_val && Source_Code === presource_code_val) {
      setNotify({
        isOpen: true,
        message: "Please make change to either Source code or conversion Module before clicking on the Convert button",
        type: "error",
      });
    }
    else {

      // console.log(formValues.Conversion_Code)
      // console.log(formValues.Source_Code)
      // console.log(formValues.Feature_Name)
      let wout_prefix = editdata.detaildata.Feature_Name;
      // "convcode": "r@rawstringstart'"+formValues.Conversion_Code+"'@rawstringend",
      let body = {
        sourcecode: Source_Code,
        // "convcode": Conversion_Code,
        convcode: "r@rawstringstart'" + Conversion_Code + "'@rawstringend",
        featurename: wout_prefix,
        migration_typeid: editdata.detaildata.Migration_TypeId,
        object_type: editdata.detaildata.Object_Type,
        Feature_Version_Id: editdata.detaildata.Feature_Version_Id,
        Project_Version_Id: editdata.detaildata.Project_Version_Id
      };
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios.post(`${config.API_BASE_URL()}/api/autoconv`, body, conf).then(
        (res) => {
          if (res.data === 'No Conversion Module, please add Conversion Module before Convert') {
            setNotify({
              isOpen: true,
              message: "No Conversion Module, please add Conversion Module before Convert",
              type: "info",
            });
          } else {
            // console.log("res",res.data)
            setTarget_ActualCode(res.data);

            setNotify({
              isOpen: true,
              message: "Conversion Completed Please Check The Output",
              type: "success",
            });
          }
        },
        (error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "Something Went wrong Please Try Again",
            type: "error",
          });
        }
      );
      setSource_code_val(Source_Code)
      setPrecon_val(Conversion_Code)
    }
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
      fname: editdata.detaildata.Feature_Name,
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
        setFupdate(true);
      },
      (error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: "File is Note Their",
          type: "error",
        });
      }
    );
    setFupdate(false);
  };

  var seq = null;
  seq = Sequence;
  // console.log(props.location.state)

  // console.log(AttachmentList)

  const handleChangedrop = (v) => {
    setDrop(v.code);
    setDroptitle(v.title);
    // console.log(v)
  };

  const dispatach = useDispatch();
  // console.log(props.location.state?.data?.type)
  const handleSubmitdrpm = (e) => {
    var filesub = [];
    if (drop === "Sourcedescription") {
      const { files } = e.target;
      if (files.length > 0) {
        const fileatt = e.target.files[0];
        filesub.push(fileatt);
        setFupdate(true);
      }
    } else if (drop === "Targetdescription") {
      const { files } = e.target;
      if (files.length > 0) {
        const fileatt = e.target.files[0];
        filesub.push(fileatt);
        setFupdate(true);
      }
    } else if (drop === "Sourcecode") {
      const { files } = e.target;
      if (files.length > 0) {
        const fileatt = e.target.files[0];
        filesub.push(fileatt);
        setFupdate(true);
      }
    } else if (drop === "Actualtargetcode") {
      const { files } = e.target;
      if (files.length > 0) {
        const fileatt = e.target.files[0];
        filesub.push(fileatt);
        setFupdate(true);
      }
    } else if (drop === "Expectedconversion") {
      const { files } = e.target;
      if (files.length > 0) {
        const fileatt = e.target.files[0];
        filesub.push(fileatt);
        setFupdate(true);
      }
    } else if (drop === "Conversion") {
      const { files } = e.target;
      if (files.length > 0) {
        const fileatt = e.target.files[0];
        filesub.push(fileatt);
        setFupdate(true);
      }
    }

    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let formData = {
      AttachmentType: drop,
      Attachment: filesub[0],
      filename: filesub[0].name,
    };
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    axios
      .post(
        `${config.API_BASE_URL()}/api/attachmentsupdate/${editdata.detaildata.Feature_Id
        }`,
        form,
        conf
      )
      .then(
        (res) => {
          console.log(res.data);
          setNotify({
            isOpen: true,
            message: droptitle + " Attachment Upload Successfully",
            type: "success",
          });
          setFupdate(false);
        },
        (error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "Please add Attachment " + droptitle,
            type: "error",
          });
          // setFupdate(false)
        }
      );
  };

  const deleteitem = async (data) => {
    seteditdata({});
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    setConfirmDialog({
      confirmDialog,
      isOpen: false,
    });

    let formData = {
      "Project_Version_Id": project_version,
      "Migration_TypeId": editdata.detaildata.Migration_TypeId,
      "Object_Type": editdata.detaildata.Object_Type,
    };
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    const res = await axios.post(
      `${config.API_BASE_URL()}/api/fdelete/${editdata.detaildata.Feature_Name}`, form,
      conf
    );
    // getmenus(1);

    if (res.status === 200) {

      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });

      // dispatch(ActionMenu.ActionMenu(
      seteditdata({});
      dispatch(Menuaction.reloadAction(true));
    }

  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            // fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
            //   method: "post",
            //   body: body
            //   // mode: "no-cors"
            // })
            //   .then((res) => res.json())
            //   .then((res) => {
            //     resolve({
            //       default: `${API_URL}/${res.filename}`
            //     });
            //   })
            //   .catch((err) => {
            //     reject(err);
            //   });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

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

  const handleFeatureStatus = (e, status) => {
    e.preventDefault();
    let mod_status;

    if (status === 'Approved') {
      mod_status = status
    }
    else if (status === 'Awaiting Approval') {
      mod_status = status

    }
    else {
      mod_status = 'In Progress'
    }
    setConfirmDialog({
      confirmDialog,
      isOpen: false
    })

    let formData = {
      ...formValues,
      Migration_TypeId: editdata.detaildata?.Migration_TypeId,
      Object_Type: editdata.detaildata.Object_Type,
      Feature_Name: editdata.detaildata.Feature_Name,
      // Source_FeatureDescription, Target_FeatureDescription,
      Sequence: editdata.detaildata.Sequence,
      Source_FeatureDescription: Source_FeatureDescription,
      Target_FeatureDescription: Target_FeatureDescription,
      Target_Expected_Output: Target_Expected_Output,
      Target_ActualCode: Target_ActualCode,
      Source_Code: Source_Code,
      Conversion_Code: Conversion_Code,
      "Project_Version_Id": editdata.detaildata?.Project_Version_Id,
      "Feature_Version_Id": editdata.detaildata?.Feature_Version_Id,
      "Feature_version_approval_status": status,
      "Feature_Approval_Date": moment(new Date()).format('YYYY-MM-DD'),
      "Level": editdata.detaildata?.Level,
      'Keywords': editdata.detaildata.Keywords,
      'Estimations': editdata.detaildata.Estimations,

    };




    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    if (status === 'Approved') {
      mod_status = status
      form.append('Feature_Requested_By', sessionStorage.getItem('uemail'));
      form.append('Feature_Requested_Date', moment(new Date()).format('YYYY-MM-DD'));
    }
    else if (status === 'Awaiting Approval') {
      mod_status = status
      // FormData["Feature_Requested_By"] = sessionStorage.getItem('uemail');
      // FormData["Feature_Requested_Date"] =moment(new Date()).format('YYYY-MM-DD');
      form.append('Feature_Requested_By', sessionStorage.getItem('uemail'));
      form.append('Feature_Requested_Date', moment(new Date()).format('YYYY-MM-DD'));
    }
    else {
      mod_status = 'In Progress'
    }


    // feature create 
    let formDatacreate = {
      ...formValues,
      Migration_TypeId: editdata.detaildata?.Migration_TypeId,
      Object_Type: editdata.detaildata.Object_Type,
      Feature_Name: editdata.detaildata.Feature_Name,
      // Source_FeatureDescription, Target_FeatureDescription,
      Sequence: editdata.detaildata.Sequence,
      Source_FeatureDescription: Source_FeatureDescription,
      Target_FeatureDescription: Target_FeatureDescription,
      Target_Expected_Output: Target_Expected_Output,
      Target_ActualCode: Target_ActualCode,
      Source_Code: Source_Code,
      Conversion_Code: Conversion_Code,
      "Project_Version_Id": editdata.detaildata?.Project_Version_Id,
      "Feature_Version_Id": editdata.detaildata?.Feature_Version_Id,
      "Feature_version_approval_status": 'In Progress',
      // "Feature_Approval_Date": null,
      "Level": editdata.detaildata?.Level,
      'Keywords': editdata.detaildata.Keywords,
      'Estimations': editdata.detaildata.Estimations,
      "Feature_Created_by": sessionStorage.getItem('uemail'),
      "Feature_Created_at": moment(new Date()).format('YYYY-MM-DD')
    };
    const formcreate = new FormData();
    Object.keys(formDatacreate).forEach((key) => {
      formcreate.append(key, formDatacreate[key]);
    });


    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios
      .put(
        `${config.API_BASE_URL()}/api/fupdate/${editdata.detaildata.Feature_Id
        }`,
        form,
        conf
      )
      .then(
        (res) => {
          if (mod_status === 'Approved') {

            axios.post(`${config.API_BASE_URL()}/api/featureapprovalcreate/`, formcreate, conf).then(
              (res) => {
                if (res.data === "New versions won't be created until it has a previous version approved") {
                  setNotify({
                    isOpen: true,
                    message: res.data,
                    type: "error",
                  });
                  // settableupdate(true)
                } else {
                  setNotify({
                    isOpen: true,
                    message: "Feature Approved! New Version Created and Redirecting To Preview",
                    type: "success",
                  });
                  setTimeout(
                    () => history.push({
                      pathname: `/PreviewCode`,

                    }),
                    1000
                  );
                  // settableupdate(true)
                }

              },
              (error) => {
                setNotify({
                  isOpen: true,
                  message: 'Something Went wrong Please Try Again!',
                  type: "error",
                });
              }
            );

            // // console.log(res.data);
            // setNotify({
            //   isOpen: true,
            //   message: "Feature Approved and Redirecting To Preview",
            //   type: "success",
            // });


          } else if (mod_status === 'Awaiting Approval') {
            if (res.data === 'Request for approval already present.Please wait for admin to approve it') {
              setNotify({
                isOpen: true,
                message: res.data,
                type: "error",
              });
            } else {
              setNotify({
                isOpen: true,
                message: "Feature Requested For the Admin Approval",
                type: "success",
              });
            }

          }

          else {
            setNotify({
              isOpen: true,
              message: "Feature Denied and Redirecting To Preview",
              type: "success",
            });
            setTimeout(
              () => history.push({
                pathname: `/PreviewCode`,
              }),
              3000
            );
          }
        },
        (error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "No Feature",
            type: "error",
          });
        }
      );

    // dispatch(Menuaction.reloadAction(true));
  };

  // const handleChangevalue = (event) => {
  //   setkeyowrds(event.target.Keywords);
  // };

  // const handleChangeesti = (event) => {
  //   setestimation(event.target.Estimations);
  // };


  return (
    <Box style={{ width: '95%', marginLeft: 40 }} className={classes.EditFeatureContainer}>
      {Object.keys(editdata).length > 0 && (
        <>

          {/* <Box py={1} px={1}>
            <Grid container direction='row' justifyContent='center'>
              <Grid item xs={3}>
                <Typography variant='h7' component="h7">
                  <strong>Created By :</strong> {editdata?.detaildata?.Feature_Created_by}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h7'>
                  <strong> Created Date :</strong> {editdata?.detaildata?.Feature_Created_at}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant='h7'>
                  <strong>Modified By :</strong> {editdata?.detaildata?.Last_Modified_by}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h7'>
                  <strong>Modified Date :</strong> {editdata?.detaildata?.Last_Modified_at}
                </Typography>
              </Grid>
            </Grid>
          </Box> */}
          <Box py={2}>
            {/* <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            Edit Feature
                        </Typography>
                    </Grid>

                </Grid> */}
          </Box>

          {/* <form autoComplete="off"> */}
          <Grid container direction="row" xs={12} spacing={4}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Migration Type"
                multiline
                rows={1}
                onChange={(e) => handleChange(e)}
                // label="Migration Type"
                // defaultValue="Default Value"
                value={editdata?.detaildata?.Migration_TypeId}
                variant="outlined"
                required
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Object Type"
                multiline
                rows={1}
                onChange={(e) => handleChange(e)}
                value={editdata?.detaildata?.Object_Type}
                name="Object_Type"
                variant="outlined"
                required
                disabled
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-static"
                label="Feature Name"
                multiline
                rows={1}
                onChange={(e) => handleChange(e)}
                value={handle_featurename}
                name="Feature_Name"
                // defaultValue="Default Value"
                variant="outlined"
                required
                disabled
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-static"
                label="Level"
                multiline
                rows={1}
                // onChange={(e) => handleChange(e)}
                value={level}
                name="Level"
                // defaultValue="Default Value"
                variant="outlined"
                required
                disabled
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-static"
                label="Predecessor"
                multiline
                fullWidth
                // onChange={(e, v) => handleChange(v)}
                // onChange={(e) => setSequence(e.target.value)}
                rows={1}
                name="Sequence_Number"
                // defaultValue="Default Value"
                value={seq}
                variant="outlined"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Grid>


            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="keywords"
                multiline
                fullWidth
                rows={1}
                name="keywords"
                value={keywords}
                onChange={(e) => setkeyowrds(e.target.value)}
                variant="outlined"
                required
                disable
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>


            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Estimation"
                multiline
                fullWidth
                rows={1}
                name="Estimations"
                value={estimation}
                onChange={(e) => setestimation(e.target.value)}
                variant="outlined"
                required
                disable
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>


            <Grid item xs={12}>
              <div className="App">
                <p>{"Source Description"}</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={editdata.detaildata?.Source_FeatureDescription}
                  // value ={editdata.detaildata.Source_FeatureDescription}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handledes(data);
                    // console.log( { event, editor, data } );
                  }}
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="App">
                <p>{"Target Description"}</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={editdata.detaildata?.Target_FeatureDescription}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handletarget(data);
                    // console.log( { event, editor, data } );
                  }}
                  // onChange={(e) => setTarget_FeatureDescription(e.target.value)}

                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </Grid>

            <Grid container style={{ justifyContent: "flex-end", marginRight: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size="small"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Source Code"
                multiline
                type="text"
                rows={15}
                name="Source_Code"
                onChange={(e) => setSource_Code(e.target.value)}
                defaultValue={Source_Code}
                fullWidth
                variant="outlined"
                required
                // value={Source_Code}
                InputLabelProps={{
                  shrink: true,
                }}

              // error={Source_Code === ""}
              // helperText={Source_Code === "" ? "Empty!" : " "}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Expected Target Code"
                multiline
                rows={15}
                name="Target_Expected_Output"
                onChange={(e) => setTarget_Expected_Output(e.target.value)}
                // defaultValue="Default Value"
                variant="outlined"
                // defaultValue={Target_Expected_Output}
                required
                value={Target_Expected_Output}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Conversion Module"
                placeholder="No Conversion Module"
                multiline
                name="Conversion_Code"
                rows={15}
                onChange={(e) => setConversion_Code(e.target.value)}
                // defaultValue="Default Value"
                // defaultValue={Conversion_Code}
                variant="outlined"
                required
                value={Conversion_Code}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* <Box> */}
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              style={{ marginRight: "20px" }}
            >
              <Grid item>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                  // style={{float: 'right'}}
                  // className={classes.submit}
                  // className={classes.convertbutton}
                  onClick={handleConvert}
                >
                  Convert
                </Button>
              </Grid>
              {/* <Grid item>
                <Button
                  // type="submit"
                  // className={classes.convertbutton}
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={classes.submit}
                  onClick={handleSubmit}
                  size="small"
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Grid> */}

            </Grid>
            {/* </Box> */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Actual Target Code"
                multiline
                rows={15}
                name="Target_ActualCode"
                onChange={(e) => setTarget_ActualCode(e.target.value)}
                // defaultValue="Default Value"
                // defaultValue={Target_ActualCode}
                variant="outlined"
                // required
                value={Target_ActualCode}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid container justifyContent="center">
              <Button
                // type="submit"

                variant="contained"
                color="primary"
                // className={classes.submit}
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>


            {/* <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="Conversion Module"
                                multiline
                                name='Conversion_Code'
                                rows={15}
                                onChange={(e) => setConversion_Code(e.target.value)}
                                // defaultValue="Default Value"
                                // defaultValue={Conversion_Code}
                                variant="outlined"
                                required
                                value={Conversion_Code}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid> */}
          </Grid>
          <Box py={4}>
            <Grid container direction="row" justifyContent="center">
              <Grid item>
                <Autocomplete
                  style={{ width: 300, maxHeight: 10, height: "1.5rem" }}
                  fullWidth
                  id="grouped-demo"
                  options={[
                    { title: "Source Description", code: "Sourcedescription" },
                    { title: "Target Description", code: "Targetdescription" },
                    { title: "Conversion Module", code: "Conversion" },
                    // { title: "Actual Target Code", code: 'Actualtargetcode' },
                    {
                      title: "Expected Target Code",
                      code: "Expectedconversion",
                    },
                    { title: "Source Code", code: "Sourcecode" },
                  ]}
                  groupBy={""}
                  // defaultValue={{ title: "Source Description" }}
                  getOptionLabel={(option) => option.title}
                  name="Attachemnets"
                  onChange={(e, v) => handleChangedrop(v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Attachments"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <div className={classes.rootc}>
                  <input
                    accept="file"
                    className={classes.input}
                    id="contained-button-file3"
                    multiple={false}
                    onChange={(e) => handleSubmitdrpm(e)}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                    type="file"
                  />

                  <label htmlFor="contained-button-file3">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      color="primary"
                      component="span"
                      // startIcon={<CloudUploadIcon />}
                      style={{ marginTop: 8 }}
                    >
                      Upload
                    </Button>
                  </label>

                  <Button
                    variant="contained"
                    onClick={(e) => handleConvertFiles()}
                    // startIcon={<CloudUploadIcon />}
                    color="primary"
                    component="span"
                    style={{ marginTop: 15 }}
                  >
                    Convert Files
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>

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
              <Table
                className={classestable.table}
                aria-label="customized table"
              >
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
                                          editdata.detaildata.Migration_TypeId,
                                          row.sid,
                                          editdata.detaildata.Object_Type,
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
                                          editdata.detaildata.Migration_TypeId,
                                          row.sid,
                                          editdata.detaildata.Object_Type,
                                          row.filename,
                                          editdata.detaildata.Feature_Id
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
                                          editdata.detaildata.Migration_TypeId,
                                          row.etid,
                                          editdata.detaildata.Object_Type,
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
                                          editdata.detaildata.Migration_TypeId,
                                          row.etid,
                                          editdata.detaildata.Object_Type,
                                          row.filename,
                                          editdata.detaildata.Feature_Id
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
                                          editdata.detaildata.Migration_TypeId,
                                          row.atid,
                                          editdata.detaildata.Object_Type,
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
                                          editdata.detaildata.Migration_TypeId,
                                          row.atid,
                                          editdata.detaildata.Object_Type,
                                          row.filename,
                                          editdata.detaildata.Feature_Id
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
              <Table
                className={classestable.table}
                aria-label="customized table"
              >
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
                                    editdata.detaildata.Migration_TypeId,
                                    row.id,
                                    editdata.detaildata.Object_Type,
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
                                    editdata.detaildata.Migration_TypeId,
                                    row.id,
                                    editdata.detaildata.Object_Type,
                                    row.filename,
                                    editdata.detaildata.Feature_Id
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
              <Table
                className={classestable.table}
                aria-label="customized table"
              >
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
                                    editdata.detaildata.Migration_TypeId,
                                    row.id,
                                    editdata.detaildata.Object_Type,
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
                                    editdata.detaildata.Migration_TypeId,
                                    row.id,
                                    editdata.detaildata.Object_Type,
                                    row.filename,
                                    editdata.detaildata.Feature_Id
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
              <Table
                className={classestable.table}
                aria-label="customized table"
              >
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
                                    editdata.detaildata.Migration_TypeId,
                                    row.id,
                                    editdata.detaildata.Object_Type,
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
                                    editdata.detaildata.Migration_TypeId,
                                    row.id,
                                    editdata.detaildata.Object_Type,
                                    row.filename,
                                    editdata.detaildata.Feature_Id
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

          <Notification notify={notify} setNotify={setNotify} />
          <Box py={5}>
            <Grid
              container
              direction="row "
              justifyContent="center"
              spacing={2}
            >
              {/* <Grid item>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={classes.submit}
                  onClick={handleSubmit}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Grid> */}
              <Grid item>
                {admin === 1 &&
                  <>
                    <Button
                      // type="submit"
                      fullWidth
                      variant="contained"
                      style={{ backgroundColor: "red", color: "white" }}
                      // className={classes.submit}
                      // onClick={() => deleteitem(editdata.detaildata.Feature_Id)}
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          // subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            deleteitem(editdata.detaildata.Feature_Id);
                          },
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </>

                }
              </Grid>


              {admin === 0 ?
                <>
                  <Grid item>
                    <Button
                      // type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ color: "white" }}
                      // className={classes.submit}
                      // onClick={() => deleteitem(editdata.detaildata.Feature_Id)}
                      // startIcon={<DeleteIcon />}
                      onClick={(e) =>
                        setConfirmDialog({
                          isOpen: true,
                          title: "Do you want to Request for the Approval?",
                          // subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            handleFeatureStatus(e, 'Awaiting Approval');
                          },
                        })
                      }


                    >
                      Request For Approval
                    </Button>
                  </Grid>
                </> :
                <>
                  <Grid item>
                    <Button
                      // type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ color: "white" }}
                      // className={classes.submit}
                      // onClick={() => deleteitem(editdata.detaildata.Feature_Id)}
                      // startIcon={<DeleteIcon />}
                      onClick={(e) =>
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to Approve the Feature?",
                          // subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            handleFeatureStatus(e, 'Approved')
                          },
                        })
                      }


                    >
                      Approve
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      // type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ color: "white" }}
                      // className={classes.submit}
                      // onClick={() => deleteitem(editdata.detaildata.Feature_Id)}
                      // startIcon={<DeleteIcon />}
                      onClick={(e) =>
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to Deny this Feature?",
                          // subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            handleFeatureStatus(e, 'In Progress')
                          },
                        })
                      }
                    >
                      Deny
                    </Button>
                  </Grid>
                </>

              }
            </Grid>


          </Box>
          {/* </form> */}

          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            seteditdata={seteditdata}
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
      )
      }
    </Box >
  );
}
