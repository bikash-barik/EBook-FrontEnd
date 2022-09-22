// import { Box, Grid, TextField, Typography, styled ,TableContainer} from '@material-ui/core'
// import { Autocomplete } from '@material-ui/lab';
// import ConfirmDialog from "../../Features/Notifications/ConfirmDialog"
// import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel';
// import React, { useEffect, useState } from 'react';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import config from "../../Config/config";
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import axios from "axios";
// import MenuAppBar from '../../Components/header'
// import Select from '@material-ui/core/Select';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { useSelector } from 'react-redux';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import AddIcon from '@material-ui/icons/Add';
// import { Avatar } from '@material-ui/core';
// import Notification from "../Notifications/Notification";
// import Menuaction from '../../Redux/actions/Menuaction';

// import {
//   Container,
//   Modal,
//   Snackbar,
// } from "@material-ui/core";



// const useStylestable = makeStyles((theme) => ({

//   table: {
//     width: '96%',
//     // width:10
//     marginLeft: 'auto',
//     marginRight: 'auto'
//   },
//   formControl: {
//     margin: theme.spacing(0),
//     minWidth: 300,

//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },

// }))




// const StyledAutocomplete = styled(Autocomplete)({
//   "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
//     // Default transform is "translate(14px, 20px) scale(1)""
//     // This lines up the label with the initial cursor position in the input
//     // after changing its padding-left.
//     transform: "translate(34px, 20px) scale(1);",
//   },
//   "& .MuiAutocomplete-inputRoot": {
//     color: "black",
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26,
//       // height: '1rem'
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "grey",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "black",
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#3f51b5",
//     },
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   Supercontainer: {
//     [theme.breakpoints.down('sm')]: {
//         marginTop: "200px",
//       },
//       [theme.breakpoints.up('sm')]: {
//         marginTop: "120px",
//       },
//       [theme.breakpoints.up('md')]: {
//         marginTop: "50px",
//       },
//       [theme.breakpoints.up('lg')]: {
//         marginTop: "0px",
//       },
   
//   },

//   createAdmin: {
//     [theme.breakpoints.up('md')]: {
//       marginTop: 9, 
//       marginLeft: 180
//     },
//     [theme.breakpoints.up('lg')]: {
//       marginTop: 9, 
//       marginLeft: 180
//     },
   
//   },

//   AvatarIcon:{
//     [theme.breakpoints.up('md')]: {
//       marginLeft: 100
//     },
//     [theme.breakpoints.up('lg')]: {
//       marginLeft: 100
//     },
   
//   },

//   MigrationType:{
//     [theme.breakpoints.up('md')]: {
//       width: 300,
//       marginLeft: 100
//     },
//     [theme.breakpoints.up('lg')]: {
//       width: 300,
//       marginLeft: 100
//     },
   
  
//   },

//   MigrationTypeGrid:{
//     [theme.breakpoints.up('md')]: {
//       marginLeft: 80, 
//       position: 'relative'
//     },
//     [theme.breakpoints.up('lg')]: {
//       marginLeft: 80, 
//       position: 'relative'
//     },
   
    
//   },
//   userNameEmail:{
//     [theme.breakpoints.up('md')]: {
//       width: 300, 
//       marginLeft: 90
//     },
//     [theme.breakpoints.up('lg')]: {
//       width: 300, 
//       marginLeft: 90
//     },
    
//   },

//   texttablecell: {
//     // overflowX: 'hidden',
//     whiteSpace: "nowrap",
//     width: "140px",
//     // overflow: "hidden",
//     // textOverflow: "ellipsis",
//     '&:hover': {
//       overflow: 'visible'
//     }
//   },

//   table: {
//     // minWidth: 150,
//     width: '60%',
//     height: '10%',
//     border: '1px black'
//   },
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
//   rootc: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },


//   //pop up weindow

//   container: {
//     border: "none",
//     borderRadius: 15,
//     width: 460,
//     height: 390,
//     backgroundColor: "white",
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     margin: "auto",
//   },
//   container1: {
//     border: "none",
//     borderRadius: 15,
//     width: 450,
//     height: 350,
//     backgroundColor: "white",
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     margin: "auto",
//   },
//   container2: {
//     border: "none",
//     borderRadius: 15,
//     width: 450,
//     height: 300,
//     backgroundColor: "white",
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     margin: "auto",
//   }

// }));

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: '#3f51b5',
//     color: theme.palette.common.white,
//   },
//   root: {
//     padding: "0px 16px",
//   },

//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,

//     },

//     height: 10

//   },
// }))(TableRow);


// export default function SuperadminFunction() {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const classestable = useStylestable();
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [isData, setIsData] = useState(true);
//   const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, project_version } = useSelector(state => state.dashboardReducer);
//   const [migtypeid, setMigtypeid] = useState(headerValue?.title)
//   const [objtype, setObjtype] = useState('Procedure')
//   const [Migtype, setMigtype] = useState('')
//   const [fnnames, setFnnames] = useState([])
//   const [data, setData] = useState([])
//   const [selecetd1, setSelected1] = useState(false)
//   const [selecetd, setSelected] = useState(false)
//   const [openAlert, setOpenAlert] = useState(false);
//   // const [openAlert1, setOpenAlert1] = useState(false);
//   const [open2, setOpen2] = useState(false)

//   const [migtype_create, setMigtype_create] = useState()
//   const [objtype_create, setObjtype_create] = useState()
//   const [notify, setNotify] = useState({
//     isOpen: false,
//     message: "",
//     type: "",
//   });
//   const [migtypelist, setMigtypeslist] = useState([])
//   const [objtypelist, setObjtypeslist] = useState([])
//   const [updatemiglist, setUpdatemiglist] = useState(false)
//   const [updateobjlist, setUpdateobjlist] = useState(false)
//   const [userslist, setUserslist] = useState([])
//   const [adminlistdata, setadminlistdata] = useState([])
//   const [superadminlist, setsuperadminlist] = useState([])

//   const [useremail, setuseremail] = useState()
//   // const [superuseremail, setsuperuseremail] = useState()
//   const [updateAdminTable, setUpdateAdminTable] = useState(false)
//   const [updateSuperAdminTable, setUpdateSuperAdminTable] = useState(false)
//   const [updatermSuperAdminTable, setUpdatermSuperAdminTable] = useState(false)
//   const [updateaccessAdminTable, setupdateaccessAdminTable] = useState(false)
//   const [rmitememail, setrmitemsemail] = useState()
//   const [rmitemmig, setrmitemsmig] = useState()
//   const [rm_miglist, setrm_miglist] = useState([])
//   const [objectTypeAdmin, setObjectTypeAdmin] = useState()
//   const [rm_objectslist, setrm_objectslist] = useState([])
//   const [objecttype_rm, setObjecttype_rm] = useState()
//   // const [proj_vers_list, setProj_vers_list] = useState([])
//   const [project_max_limit, setProject_max_limit] = useState()
//   const [feature_max_limit, setFeautre_max_limit] = useState()
//   const [proj_vers_list, setProj_vers_list] = useState([])
//   const [useradmin_list, setUseradmin_list] = useState([])
//   const [useradmin_tableupdate, setuseradmin_tableupdate] = useState(false)
//   const [isUserAdminData, setIsUserAdminData] = useState(false)
//   const [deploymig, setDeploymig] = useState()
//   const [select_prj_versionitem, setSelect_prj_versionitem] = useState()
//   const [new_prj_versionitem, setNew_prj_versionitem] = useState()

//   const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
//   const [newMigtype, setNewMigtype] = useState()
//   const [isdeployData, setIsDeploydata] = useState(false)
//   const [deployeddata, setDeployeddata] = useState([])
//   const [deploy_update, setDeploy_update] = useState(false)


//   let history = useHistory();


//   // useEffect(() => {
//   //   // let sval = 0;
//   //   // if (headerValue) {
//   //   //   if (headerValue.title === "Oracle TO Postgres") {
//   //   //     sval = 1;
//   //   //   } else if (headerValue.title === "SQLServer TO Postgres") {
//   //   //     sval = 2;
//   //   //   } else if (headerValue.title === "MYSQL TO Postgres") {
//   //   //     sval = 3;
//   //   //   }
//   //   // }

//   //   let body = {
//   //     "Object_Type": objtype,
//   //     "Migration_TypeId": headerValue?.title,
//   //     "Feature_Name": ''
//   //   };
//   //   let conf = {
//   //     headers: {
//   //       Authorization: "Bearer " + config.ACCESS_TOKEN(),
//   //     },
//   //   };
//   //   const form = new FormData();
//   //   Object.keys(body).forEach((key) => {
//   //     form.append(key, body[key]);
//   //   });
//   //   axios.post(`${config.API_BASE_URL()}/api/requestfndata/`, form, conf).then(
//   //     (res) => {
//   //       setFnnames(res.data)
//   //       console.log(res.data)
//   //     },
//   //     (error) => {
//   //       console.log(error);
//   //     }
//   //   );
//   // }, [objtype]);



//   React.useEffect(() => {
//     if (headerValue?.title) {
//       let conf = {
//         headers: {
//           Authorization: "Bearer " + config.ACCESS_TOKEN(),
//         },
//       };
//       let body_prj = {
//         "Migration_TypeId": headerValue?.title
//       }
//       const form_prj = new FormData();
//       Object.keys(body_prj).forEach((key) => {
//         form_prj.append(key, body_prj[key]);
//       });

//       axios.post(`${config.API_BASE_URL()}/api/project_versions_list/`, body_prj, conf).then(
//         (res) => {
//           setProj_vers_list(res.data)
//           // let prv = 0
//           // let tit ;
//           // Object.keys(res.data).forEach((key) => {
//           //   if (prv <= res.data[key]?.code) {
//           //     prv = res.data[key]?.code
//           //     tit = res.data[key]?.title
//           //   }

//           // });
//           // setSelect_pr_v(tit)
//           // dispatch(Menuaction.project_version(prv))
//           dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code))
//         },
//         (error) => {
//           setNotify({
//             isOpen: true,
//             message: 'Something Went Wrong Please try Again',
//             type: "error",
//           });
//         }
//       );
//     }

//   }, [headerValue?.title]);


//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     axios.get(`${config.API_BASE_URL()}/api/migtypes_useradmin/`, conf).then(
//       (res) => {
//         setMigtypeslist(res.data)
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, [updatemiglist]);




//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     axios.get(`${config.API_BASE_URL()}/api/deploy_status/`, conf).then(
//       (res) => {
//         if (res.data.length > 0) {
//           setDeployeddata(res.data)
//           setIsDeploydata(true)
//         } else {
//           setDeployeddata([])
//         }

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, [deploy_update]);

//   useEffect(() => {
//     if (project_version) {
//       let conf = {
//         headers: {
//           Authorization: "Bearer " + config.ACCESS_TOKEN(),
//         },
//       };
//       let body = {
//         'email': sessionStorage.getItem('uemail'),
//         "Project_Version_Id": project_version
//       }
//       const form = new FormData();
//       Object.keys(body).forEach((key) => {
//         form.append(key, body[key]);
//       });
//       axios.post(`${config.API_BASE_URL()}/api/migrationlistperuser/`, form, conf).then(
//         (res) => {
//           // console.log("mig list ", res.data)
//           // setMigtypeslist(res.data)
//           res.data.map((key) => {
//             console.log(headerValue?.title)
//             if (key.Migration_TypeId === headerValue?.title) {
//               console.log("============ ", key.Migration_TypeId === headerValue?.title)
//               dispatch(Menuaction.getdropdownlist(key))
//               // dispatch(Menuaction.admin(key?.admin))
//             }
//           })
//           // dispatch(Menuaction.getdropdownlist(res.data))
//           // dispatch(Menuaction.admin(res.data[0].admin))
//         },
//         (error) => {
//           setNotify({
//             isOpen: true,
//             message: 'Something Went Wrong Please try Again',
//             type: "error",
//           });
//         }
//       );
//     }

//   }, [updatemiglist, project_version]);


//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     axios.get(`${config.API_BASE_URL()}/api/userslist/`, conf).then(
//       (res) => {

//         setUserslist(res.data)

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, []);


//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     let body = {
//       "Migration_TypeId": migtype_create,
//       "Project_Version_Id": project_version
//     };

//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/objectviewtlist/`, form, conf).then(
//       (res) => {

//         // setObjtypeslist(res.data)
//         if (res.data.length > 0) {
//           setObjtypeslist(([{ Object_Type: "ALL" }]).concat(res.data))
//         } else {
//           setObjtypeslist([])
//         }

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, [updateobjlist]);

//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     axios.get(`${config.API_BASE_URL()}/api/adminlist/`, conf).then(
//       (res) => {
//         setadminlistdata(res.data)
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, [updateAdminTable, updateaccessAdminTable]);


//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     axios.get(`${config.API_BASE_URL()}/api/superuserlist/`, conf).then(
//       (res) => {
//         setsuperadminlist(res.data)
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, [updateSuperAdminTable, updatermSuperAdminTable]);


//   useEffect(() => {
//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     axios.get(`${config.API_BASE_URL()}/api/useradminlist/`, conf).then(
//       (res) => {
//         setUseradmin_list(res.data)
//         setIsUserAdminData(true)
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }, [useradmin_tableupdate])



//   // console.log(headerValue.title)
//   const handleuseremail = (v) => {
//     setSelected1(true)
//     setuseremail(v?.email)
//   }

//   const handleuseremail1 = (v) => {
//     setuseremail(v?.email)
//   }

//   // const handleuseremail1 = (v) => {

//   // }

//   const handleobjecttype = (v) => {
//     setSelected(true)
//     setObjectTypeAdmin(v?.Object_Type)
//   }

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpenAlert(false);
//   };

//   const handleObjectviewslist = (v) => {
//     setMigtype_create(v?.Migration_TypeId)

//     let conf = {
//       headers: {
//         Authorization: "Bearer " + config.ACCESS_TOKEN(),
//       },
//     };
//     let body = {

//       "Migration_TypeId": v?.Migration_TypeId,
//       "Project_Version_Id": project_version
//     };

//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });

//     axios.post(`${config.API_BASE_URL()}/api/objectviewtlist/`, form, conf).then(
//       (res) => {
//         if (res.data.length > 0) {
//           // setObjtypeslist(res.data)
//           setObjtypeslist(([{ Object_Type: "ALL" }]).concat(res.data))

//         } else {

//           setObjtypeslist([])

//         }

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );

//   }

//   // const handledropdown = (e, v) => {

//   //   let conf = {
//   //     headers: {
//   //       'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//   //     }
//   //   }
//   //   axios.get(`${config.API_BASE_URL()}/api/fdetail/${v?.Feature_Id || null}`, conf).then(
//   //     (res) => {
//   //       setData(res.data)
//   //     },
//   //     (error) => {
//   //       console.log(error);
//   //     }
//   //   );
//   // }

//   const handleMigrationCreate = () => {
//     let prj_intial_creation;
//     if (project_version === null) {
//       prj_intial_creation = 1
//     } else {
//       prj_intial_creation = project_version
//     }
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "Object_Type": '',
//       "Migration_TypeId": migtype_create || null,
//       "Project_Version_Id": prj_intial_creation,
//       'Project_Version_limit': project_max_limit,
//       'Feature_Version_Limit': feature_max_limit
//     };

//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });


//     let postbody = {
//       "Project_Version_Id": project_version,
//     }
//     const postform = new FormData();
//     Object.keys(postbody).forEach((key) => {
//       postform.append(key, postbody[key]);
//     });

//     axios.post(`${config.API_BASE_URL()}/api/migrationsscreate/`, form, conf).then(
//       (res) => {
//         // setNotify("Created Migration Type")
//         setNotify({
//           isOpen: true,
//           message: "Created Migration Type",
//           type: "success",
//         });
//         setUpdatemiglist(true)
//         setOpen1(false)
//         // dispatch(Menuaction.getdropdownlist(res.data))
//         axios.post(`${config.API_BASE_URL()}/api/migrationviewlist/`, postform, conf).then(
//           (res) => {
//             setUpdatemiglist(true)
//             // setMigtypeslist(res.data)
//             // dispatch(Menuaction.getdropdownlist(res.data))
//           },
//           (error) => {
//             setNotify({
//               isOpen: true,
//               message: 'Something Went Wrong Please try Again',
//               type: "error",
//             });
//           }
//         );
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setUpdatemiglist(false)


//   }


//   const handleObjectypeCreate = () => {
//     let prj_intial_creation;
//     if (project_version === null) {
//       prj_intial_creation = 1
//     } else {
//       prj_intial_creation = project_version
//     }
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "Object_Type": objtype_create,
//       "Migration_TypeId": migtype_create,
//       "Project_Version_Id": prj_intial_creation,
//       'Project_Version_limit': '',
//       'Feature_Version_Limit': ''
//     };

//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/migrationsscreate/`, form, conf).then(
//       (res) => {
//         if (res.data === 'Object Type Already Existed') {
//           setNotify({
//             isOpen: true,
//             message: "Object Type Already Existed",
//             type: "error",
//           });
//         } else {
//           // setNotify("Created Object Type")
//           setNotify({
//             isOpen: true,
//             message: "Created Object Type",
//             type: "success",
//           });
//           setUpdateobjlist(true)
//           setOpen(false)
//           dispatch(Menuaction.reloadAction(true));

//         }

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setUpdateobjlist(false)
//     // handleObjectviewslist(body)

//   }


//   const handlecreateadmin = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "email": useremail,
//       "mig_type": migtype_create,
//       "Object_Type": objectTypeAdmin
//     };

//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/adminpermission/`, form, conf).then(
//       (res) => {
//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//         setUpdateobjlist(true)
//         setUpdateAdminTable(true)
//         setOpen(false)
//         dispatch(Menuaction.reloadAction(true));
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setUpdateobjlist(false)
//     setUpdateAdminTable(false)
//   }

//   const handlesuperadmincreation = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "email": useremail,
//     }; const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/createsuperadmin/`, form, conf).then(
//       (res) => {
//         setNotify({
//           isOpen: true,
//           message: "super admin created successfully",
//           type: "success",
//         });
//         // setOpen(false)
//         // dispatch(Menuaction.reloadAction(true));
//         setUpdateSuperAdminTable(true)

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setUpdateSuperAdminTable(false)
//   }


//   const handledeletesuperadmin = (email) => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "email": email,
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/removesuperadmin/`, form, conf).then(
//       (res) => {
//         if (res.data === 'super admin removed successfully') {
//           setNotify({
//             isOpen: true,
//             message: res.data,
//             type: "success",
//           });
//           setUpdatermSuperAdminTable(true)
//           // sessionStorage.setItem("isSuperAdmin", false);

//         } else {
//           setNotify({
//             isOpen: true,
//             message: res.data,
//             type: "error",
//           });
//           // setUpdatermSuperAdminTable(true)
//           // sessionStorage.setItem("isSuperAdmin", false);

//         }
//         // setNotify({
//         //   isOpen: true,
//         //   message: res.data,
//         //   type: "success",
//         // });
//         // setUpdatermSuperAdminTable(true)
//         // // sessionStorage.setItem("isSuperAdmin", false);

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setUpdatermSuperAdminTable(false)
//   }

//   const handle_rm_mig_list_data = (email) => {

//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "User_Email": email,
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/adminrmmigrationlist/`, form, conf).then(
//       (res) => {
//         setUpdatermSuperAdminTable(true)
//         setrm_miglist(res.data)
//       },
//       (error) => {
//         console.log(error.response.data);
//       }
//     );
//   }

//   const handleModelopen = (item) => {
//     setrmitemsemail(item.Email)
//     setrmitemsmig(item.Migration_Type)
//     handle_rm_mig_list_data(item.Email)

//     // calling rm admins objects list based on mig value and email

//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "User_Email": item.Email,
//       "Migration_Type": item.Migration_Type
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/adminsobjectslist/`, form, conf).then(
//       (res) => {
//         setUpdatermSuperAdminTable(true)
//         // setrm_miglist(res.data)
//         setrm_objectslist(res.data)
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     // debugger
//     setOpen2(true)
//   }



//   const handleremoveadminaccess = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       "User_Email": rmitememail,
//       "Migration_Type": rmitemmig,
//       "Object_type": objecttype_rm
//     }; const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.put(`${config.API_BASE_URL()}/api/removeadminmigrations/`, form, conf).then(
//       (res) => {
//         setNotify({
//           isOpen: true,
//           message: "Admin removed successfully",
//           type: "success",
//         });
//         setupdateaccessAdminTable(true)
//         setOpen2(false)
//         dispatch(Menuaction.reloadAction(true));

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setupdateaccessAdminTable(false)
//   }

//   const handleProject_Version = (v) => {
//     dispatch(Menuaction.project_version(v?.code))
//   }

//   const handleCreateNewVersion = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       'Project_Version_Id': project_version,
//       'Migration_TypeId': select_prj_versionitem
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });

//     axios.post(`${config.API_BASE_URL()}/api/create_project_version/`, form, conf).then(
//       (res) => {
//         // dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code))
//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });


//         let body_prj = {
//           "Migration_TypeId": headerValue?.title
//         }
//         const form_prj = new FormData();
//         Object.keys(body_prj).forEach((key) => {
//           form_prj.append(key, body_prj[key]);
//         });
//         axios.post(`${config.API_BASE_URL()}/api/project_versions_list/`, form_prj, conf).then(
//           (res) => {
//             dispatch(Menuaction.getproj_header_dropdownlist(res.data))
//             dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code))
//             // dispatch(Menuaction.project_reloadAction(true))
//             setTimeout(() => {
//               history.push('/')
//             }, 2000)

//           },
//           (error) => {
//             setNotify({
//               isOpen: true,
//               message: 'Something Went Wrong Please try Again',
//               type: "error",
//             });
//           }
//         );

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }

//   const handleuseradmincreation = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       'email': useremail
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/createuseradmin/`, form, conf).then(
//       (res) => {

//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//         setuseradmin_tableupdate(true)


//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setuseradmin_tableupdate(false)
//     // setIsUserAdminData(false)
//   }


//   const handledeleteuseradmin = (email) => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       'email': email
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/removeuseradmin/`, form, conf).then(
//       (res) => {

//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//         setuseradmin_tableupdate(true)
//         // setIsUserAdminData(true)

//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//     setuseradmin_tableupdate(false)
//     // setIsUserAdminData(false)
//   }

//   const handleMigDeploytype = (v) => {
//     setDeploymig(v?.Migration_TypeId)
//   }

//   const handleDeploy = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       'Migration_TypeId': deploymig
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });

//     axios.post(`${config.API_BASE_URL()}/api/createdeploystatus/`, form, conf).then(
//       (res) => {
//         setDeploy_update(true)
        
//         axios.post(`${config.API_BASE_URL()}/api/deploy/`, form, conf).then(
//           (res) => {
//             setDeploy_update(false)
//             setNotify({
//               isOpen: true,
//               message: res.data,
//               type: "success",
//             });
//             setDeploy_update(true)
//           },
//           (error) => {
//             setNotify({
//               isOpen: true,
//               message: 'Something Went Wrong Please try Again',
//               type: "error",
//             });
//           }
//         );
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );

//     // setDeploy_update(true)
//     setDeploy_update(false)
//   }


//   const delete_from_fileshare = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     setConfirmDialog({
//       confirmDialog,
//       isOpen: false
//     })
//     axios.get(`${config.API_BASE_URL()}/api/deletefromfileshare/`, conf).then(
//       (res) => {
//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }


//   const handleExport_Fileshare = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     setConfirmDialog({
//       confirmDialog,
//       isOpen: false
//     })
//     axios.get(`${config.API_BASE_URL()}/api/export_to_fileshare/`, conf).then(
//       (res) => {
//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }


//   const handleNewVersionMigration = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     let body = {
//       'Migration_TypeId': new_prj_versionitem,
//       "New_Migration_Type": newMigtype
//     };
//     const form = new FormData();
//     Object.keys(body).forEach((key) => {
//       form.append(key, body[key]);
//     });
//     axios.post(`${config.API_BASE_URL()}/api/newmigtype_old/`, form, conf).then(
//       (res) => {

//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }

//   const handleImport_to_prod = () => {
//     let conf = {
//       headers: {
//         'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
//       }
//     }
//     setConfirmDialog({
//       confirmDialog,
//       isOpen: false
//     })
//     axios.get(`${config.API_BASE_URL()}/api/import_to_prod/`, conf).then(
//       (res) => {
//         setNotify({
//           isOpen: true,
//           message: res.data,
//           type: "success",
//         });
//       },
//       (error) => {
//         setNotify({
//           isOpen: true,
//           message: 'Something Went Wrong Please try Again',
//           type: "error",
//         });
//       }
//     );
//   }

//   return (
//     <Box style={{ width: '100%' }} className={classes.Supercontainer}>


//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item>
//             <Typography variant='h6'>
//               Super Admin Creation
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' spacing={1}>
//           <Grid item xs={12} sm={5} md={4}  >
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={userslist}
//               groupBy={""}
//               getOptionLabel={(option) => option.email}
//               style={{ width: 300}}
//               onChange={(e, v) => handleuseremail(v)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="username/email"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5} md={3}>
//             <Button
//               variant="contained"
//               disabled={!selecetd1}
//               color="primary"
//               component="span"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               onClick={() => handlesuperadmincreation()}
//             >
//               {" "}
//               Create Super Admin
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container xl={12} justifyContent="space-between" spacing={3}>
//           <Grid item xs={12}>
//             <Typography
//               gutterBottom
//               align='center'
//               variant="h6"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               Super Admin List
//             </Typography>
//             <TableContainer className={classestable.table}>
//             <Table aria-label="customized table">
//               <TableHead className={classes.primary}>
//                 <TableRow>
//                   <StyledTableCell align="left">User Name</StyledTableCell>
//                   <StyledTableCell align="left">User Email</StyledTableCell>
//                   <StyledTableCell align="left">Actions</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {isData ? (
//                   <>
//                     {superadminlist.map((item) =>
//                       <StyledTableRow container>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.User_Name}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Email}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <Button
//                             type="button"
//                             size="small"
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                             style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
//                             onClick={() => handledeletesuperadmin(item.Email)}
//                           >
//                             Delete
//                           </Button>
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     )}
//                   </>
//                 )
//                   : <>
//                     <StyledTableRow container>
//                       <StyledTableCell align="center"></StyledTableCell>
//                       <StyledTableCell align="center">No Requests</StyledTableCell>
//                       <StyledTableCell align="center"></StyledTableCell>
//                     </StyledTableRow>
//                   </>
//                 }
//               </TableBody>
//             </Table>
//             </TableContainer>
//           </Grid>

//         </Grid>
//       </Box>

//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item >
//             <Typography variant='h6'>
//               User Admin Creation
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' spacing={1}>
//           <Grid item xs={12} sm={5} md={4}>
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={userslist}
//               groupBy={""}
//               getOptionLabel={(option) => option.email}
//               style={{ width: 300 }}
//               onChange={(e, v) => handleuseremail1(v)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="username/email"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5} md={3}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               onClick={() => handleuseradmincreation()}
//             >
//               {" "}
//               Create User Admin
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <Box py={2} px={2}>
//         <Grid container xl={12} justifyContent="space-between" spacing={3}>
//           <Grid item xs={12}>
//             <Typography
//               gutterBottom
//               align='center'
//               variant="h6"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               User Admin List
//             </Typography>
//             <TableContainer className={classestable.table}>
//             <Table  aria-label="customized table">
//               <TableHead className={classes.primary}>
//                 <TableRow>
//                   <StyledTableCell align="left">User Name</StyledTableCell>
//                   <StyledTableCell align="left">User Email</StyledTableCell>
//                   <StyledTableCell align="left">Actions</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {isUserAdminData ? (
//                   <>
//                     {useradmin_list.map((item) =>
//                       <StyledTableRow container>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.username}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.email}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <Button
//                             type="button"
//                             size="small"
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                             style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
//                             onClick={() => handledeleteuseradmin(item.email)}
//                           >
//                             Delete
//                           </Button>
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     )}
//                   </>
//                 )
//                   : <>
//                     <StyledTableRow container>
//                       <StyledTableCell align="center"></StyledTableCell>
//                       <StyledTableCell align="center">No Requests</StyledTableCell>
//                       <StyledTableCell align="center"></StyledTableCell>
//                     </StyledTableRow>
//                   </>
//                 }
//               </TableBody>
//             </Table>
//             </TableContainer>
//           </Grid>

//         </Grid>
//       </Box>

//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item>
//             <Typography variant='h6'>
//               Migration Admin Creation
//             </Typography>
//           </Grid>
//         </Grid>

//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' className={classes.MigrationTypeGrid}  spacing={2}>

//           <Grid item xs={12} sm={5} md={4} >
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={migtypelist}
//               groupBy={""}
//               class={classes.MigrationType}
//               // defaultValue={{ title: "Oracle TO Postgres" }}
//               getOptionLabel={(option) => option.Migration_TypeId}
//               // style={{ width: 300, marginLeft: 100 }}
//               onChange={(e, v) => handleObjectviewslist(v)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Migration type"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}

//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} sm={1} md={1} className={classes.AvatarIcon}>
//             <Avatar className={classes.avatar} onClick={() => setOpen1(true)}>
//               <AddIcon style={{ color: 'green' }} />
//             </Avatar>
//           </Grid>
//           <Snackbar
//             open={openAlert}
//             autoHideDuration={4000}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//           >
//           </Snackbar>
//           <Modal open={open1}>
//             <Container className={classes.container}>
//               <Typography
//                 gutterBottom
//                 align="center"
//                 variant="h6"
//                 component="h2"
//                 className={classes.Object_Type}
//                 style={{ marginBottom: '20px' }}
//               >
//                 Create Migration Type
//               </Typography>
//               {/* <form className={classes.form} autoComplete="off"> */}
//               <div className={classes.item}>
//                 <TextField
//                   id="outlined-multiline-static"
//                   label="Migration Type"
//                   style={{ width: 410, marginBottom: '20px' }}
//                   multiline
//                   rows={1}
//                   // value ={row.Keywords}
//                   onChange={(e) => setMigtype_create(e.target.value)}
//                   name="Keywords"
//                   // defaultValue={edithandle.Keywords}
//                   // helperText={featurenamemsg}
//                   // value={edithandle.Keywords}
//                   className={classes.textField}
//                   // helperText="Some important text"
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </div>
//               <div className={classes.item}>
//                 <TextField
//                   id="outlined-multiline-static"
//                   label="Major Version"
//                   style={{ width: 410, marginBottom: '20px' }}
//                   multiline
//                   rows={1}
//                   onChange={(e) => setProject_max_limit(e.target.value)}
//                   name="Major Version"
//                   className={classes.textField}
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </div>
//               <div className={classes.item}>
//                 <TextField
//                   id="outlined-multiline-static"
//                   label="Minor Version"
//                   style={{ width: 410, marginBottom: '10px' }}
//                   multiline
//                   rows={1}
//                   onChange={(e) => setFeautre_max_limit(e.target.value)}
//                   name="Minor Version"
//                   className={classes.textField}
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </div>
//               <h4>Note:Major version and Minor version should not be 0 and 1</h4>
//               <div className={classes.item} >
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   style={{ marginRight: 20, marginLeft: 100 }}
//                   onClick={() => handleMigrationCreate()}
//                 >
//                   Create
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => setOpen1(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </Container>
//           </Modal>
//           <Grid item xs={12} sm={5} md={4}>
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               class={classes.userNameEmail}
//               options={userslist}
//               groupBy={""}
//               // defaultValue={{ title: "Select Email" }}
//               getOptionLabel={(option) => option.email}
//               // style={{ width: 300, marginLeft: 90 }}
//               onChange={(e, v) => setuseremail(v?.email)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="username/email"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}

//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={4} >
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={objtypelist}
//               groupBy={""}
//               // defaultValue={{ title: "Procedure" }}
//               getOptionLabel={(option) => option.Object_Type}
//               onChange={(e, v) => handleobjecttype(v)}
//               class={classes.MigrationType}
//               // style={{ width: 300, marginLeft: 100 }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="ObjectType"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={1} className={classes.AvatarIcon} >
//           {/* style={{ marginLeft: 100 }} */}
//             <Avatar className={classes.avatar} onClick={() => setOpen(true)}>
//               <AddIcon style={{ color: 'green' }} />
//             </Avatar>
//           </Grid>
//           <Snackbar
//             open={openAlert}
//             autoHideDuration={4000}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//           >
//           </Snackbar>
//           <Modal open={open}>
//             <Container className={classes.container2} style={{ marginBottom: 100 }}>
//               <Typography
//                 gutterBottom
//                 align="center"
//                 variant="h6"
//                 component="h2"
//                 className={classes.Object_Type}
//                 style={{ marginBottom: '20px' }}
//               >
//                 Create Object Type
//               </Typography>
//               {/* <form className={classes.form} autoComplete="off"> */}

//               <Grid item xs={4} >
//                 <StyledAutocomplete
//                   size="small"
//                   id="grouped-demo"
//                   className={classes.inputRoottype}
//                   options={migtypelist}
//                   groupBy={""}
//                   // defaultValue={{ title: "Oracle TO Postgres" }}
//                   getOptionLabel={(option) => option.Migration_TypeId}
//                   style={{ width: 400, marginBottom: '20px', height: '60px' }}
//                   onChange={(e, v) => setMigtype_create(v?.Migration_TypeId)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Migration type"
//                       variant="outlined"
//                       InputLabelProps={{
//                         className: classes.floatingLabelFocusStyle,
//                         shrink: true,
//                       }}

//                     />
//                   )}
//                 />
//               </Grid>

//               <div className={classes.item}>
//                 <TextField
//                   id="outlined-multiline-static"
//                   label="Object Type"
//                   style={{ width: 400, marginBottom: '20px' }}
//                   multiline
//                   rows={1}
//                   // value ={row.Keywords}
//                   onChange={(e) => setObjtype_create(e.target.value)}
//                   name="Keywords"
//                   // defaultValue={edithandle.Keywords}
//                   // helperText={featurenamemsg}
//                   // value={edithandle.Keywords}
//                   className={classes.textField}
//                   // helperText="Some important text"
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}


//                 />
//               </div>
//               <div className={classes.item} >
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   style={{ marginRight: 20, marginLeft: 100 }}
//                   onClick={() => handleObjectypeCreate()}
//                 >
//                   Create
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => setOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//               {/* </form> */}
//             </Container>
//           </Modal>
//           <Grid item xs={12} md={4}>
//             <Button
//               variant="contained"
//               disabled={!selecetd}
//               color="primary"
//               component="span"
//               className={classes.createAdmin}
//               // style={{ marginTop: 9, marginLeft: 180 }}
//               onClick={() => { handlecreateadmin() }}
//             >
//               {" "}
//               Create Admin
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container xl={12} justifyContent="space-between" spacing={3}>
//           <Grid item xs={12}>
//             <Typography
//               gutterBottom
//               align='center'
//               variant="h6"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               Migration Admin List
//             </Typography>
//             <TableContainer className={classestable.table}>
//             <Table  aria-label="customized table">
//               <TableHead className={classes.primary}>
//                 <TableRow>
//                   <StyledTableCell align="left">User Email</StyledTableCell>
//                   <StyledTableCell align="left">Migration Types</StyledTableCell>
//                   <StyledTableCell align="left">Object Types</StyledTableCell>
//                   <StyledTableCell align="left">Actions</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>


//                 {isData ? (
//                   <>
//                     {adminlistdata.map((item) =>
//                       <StyledTableRow container>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Email}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Migration_Type}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {/* {item.Object_types} */}

//                             {
//                               item.Object_types.map((value, index, array) => {
//                                 if (array.length - 1 === index) {
//                                   return value
//                                 } else {
//                                   return value + ','
//                                 }

//                               })
//                             }
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell>
//                           <Button
//                             type="button"
//                             size="small"
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                             style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
//                             onClick={() => { handleModelopen(item) }}
//                           >
//                             Remove
//                           </Button>
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     )}
//                   </>
//                 )
//                   : <>
//                     <StyledTableRow container>
//                       <StyledTableCell align="center"></StyledTableCell>
//                       <StyledTableCell align="center">No Requests</StyledTableCell>
//                       <StyledTableCell align="center"></StyledTableCell>
//                     </StyledTableRow>
//                   </>
//                 }


//               </TableBody>
//             </Table>
//             </TableContainer>
//             <Snackbar
//               open={openAlert}
//               autoHideDuration={4000}
//               onClose={handleClose}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//             >
//             </Snackbar>
//             <Modal open={open2}>
//               <Container className={classes.container1}>
//                 <Typography
//                   gutterBottom
//                   align="center"
//                   variant="h6"
//                   component="h2"
//                   className={classes.Object_Type}
//                   style={{ marginBottom: '20px' }}
//                 >
//                   Admin Access
//                 </Typography>
//                 <Grid item xs={4} >
//                   <TextField
//                     id="outlined-multiline-static"
//                     label="username/email"
//                     name="username_ID"
//                     className={classes.textField}
//                     variant="outlined"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     fullWidth
//                     value={rmitememail}
//                     size="small"
//                     disabled
//                     style={{ width: 400, marginBottom: '20px', height: '60px' }}
//                   />


//                 </Grid>

//                 <TextField
//                   id="outlined-multiline-static"
//                   label="Migration Type"
//                   name="migrationtype"
//                   className={classes.textField}
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   fullWidth
//                   value={rmitemmig}
//                   size="small"
//                   disabled
//                   style={{ width: 400, marginBottom: '20px', height: '60px' }}
//                 />

//                 <Grid item xs={4} >
//                   <StyledAutocomplete
//                     size="small"
//                     id="grouped-demo"
//                     className={classes.inputRoottype}
//                     options={rm_objectslist}
//                     groupBy={""}
//                     // defaultValue={{ title: "Oracle TO Postgres" }}
//                     value={objecttype_rm}
//                     getOptionLabel={(option) => option.Object_type}
//                     style={{ width: 400, marginBottom: '20px', height: '60px' }}
//                     onChange={(e, v) => setObjecttype_rm(v?.Object_type)}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Object types"
//                         variant="outlined"
//                         InputLabelProps={{
//                           className: classes.floatingLabelFocusStyle,
//                           shrink: true,
//                         }}

//                       />
//                     )}
//                   />
//                 </Grid>
//                 <div className={classes.item} >
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     style={{ marginRight: 20, marginLeft: 100 }}
//                     onClick={() => handleremoveadminaccess()}
//                   >
//                     Remove
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => setOpen2(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </Container>
//             </Modal>

//           </Grid>

//         </Grid>
//       </Box>

//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item>
//             <Typography variant='h6'>
//               New Version Migration
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item xs={12} sm={5} md={5}>
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={migtypelist}
//               groupBy={""}
//               // defaultValue={{ title: "Oracle TO Postgres" }}
//               getOptionLabel={(option) => option.Migration_TypeId}
//               style={{ width: 300, marginBottom: '20px' }}
//               onChange={(e, v) => setNew_prj_versionitem(v?.Migration_TypeId)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Migration type"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}

//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4} md={4} >
//             <TextField
//               id="outlined-multiline-static"
//               label="New Migtype"
//               multiline
//               rows={1}
//               onChange={(e) => setNewMigtype(e.target.value)}
//               name="NewMigType"
//               // defaultValue="Default Value"
//               // helperText={featurenamemsg}
//               // className={classes.textField}
//               // helperText="Some important text"
//               variant="outlined"
//               size='small'
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               // multiline
//               fullWidth
//               style={{ width: 300, marginBottom: '20px', height: '50px' }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={2} md={2}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               size="small"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               onClick={() => handleNewVersionMigration()}
//             >
//               {" "}
//               Create
//             </Button>
//           </Grid>

//         </Grid>
//       </Box>

//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item>
//             <Typography variant='h6'>
//               Version Creation & Deployement
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' spacing={2}>
//           <Grid item style={{ marginTop: 8 }} xs={12} sm={4} md={4}>
//             <Typography variant='h7' >
//               Project Version Creation :
//             </Typography>
//           </Grid>

//           <Grid item xs={12} sm={5} md={5}>
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={migtypelist}
//               groupBy={""}
//               // defaultValue={{ title: "Oracle TO Postgres" }}
//               getOptionLabel={(option) => option.Migration_TypeId}
//               style={{ width: 300 }}
//               onChange={(e, v) => setSelect_prj_versionitem(v?.Migration_TypeId)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Migration type"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}

//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={2}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               size="small"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               onClick={() => handleCreateNewVersion()}
//             >
//               {" "}
//               Create
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' spacing={2}>
//           <Grid item style={{ marginTop: 8 }} xs={12} sm={4} md={4}>
//             <Typography variant='h7' >
//               Deployment (Get Approved Modules):
//             </Typography>
//           </Grid>

//           <Grid item xs={12} sm={5} md={5}>
//             <StyledAutocomplete
//               size="small"
//               id="grouped-demo"
//               className={classes.inputRoottype}
//               options={migtypelist}
//               groupBy={""}
//               // defaultValue={{ title: "Oracle TO Postgres" }}
//               getOptionLabel={(option) => option.Migration_TypeId}
//               style={{ width: 300 }}
//               onChange={(e, v) => handleMigDeploytype(v)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Migration type"
//                   variant="outlined"
//                   InputLabelProps={{
//                     className: classes.floatingLabelFocusStyle,
//                     shrink: true,
//                   }}

//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               size="small"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               onClick={() => handleDeploy()}
//             >
//               {" "}
//               Deploy
//             </Button>
//           </Grid>
//           {/* <Grid item >

//           </Grid> */}
//         </Grid>

//       </Box>


//       <Box py={2} px={2}>
//         <Grid container xl={12} justifyContent="space-between" spacing={3}>
//           <Grid item xs={12}>
//             <Typography
//               gutterBottom
//               align='center'
//               variant="h6"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               Deployement Status
//             </Typography>
//             <TableContainer className={classestable.table}>
//             <Table  aria-label="customized table">
//               <TableHead className={classes.primary}>
//                 <TableRow>
//                   <StyledTableCell align="center">Migration Type</StyledTableCell>
//                   <StyledTableCell align="center">Start Time</StyledTableCell>
//                   <StyledTableCell align="center">End Time</StyledTableCell>
//                   <StyledTableCell align="center">Status</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {isdeployData ? (
//                   <>
//                     {deployeddata.map((item) =>
//                       <StyledTableRow container>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Migration_TypeId}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Deploy_Start_Time}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Deploy_End_Time}
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell item xl={8}>
//                           <div className={classes.texttablecell}>
//                             {item.Deployment_Status}
//                           </div>
//                         </StyledTableCell>

//                       </StyledTableRow>
//                     )}
//                   </>
//                 )
//                   : <>
//                     <StyledTableRow container>
//                       <StyledTableCell align="center"></StyledTableCell>
//                       <StyledTableCell align="right">No Requests</StyledTableCell>
//                       <StyledTableCell align="center"></StyledTableCell>
//                       <StyledTableCell align="center"></StyledTableCell>
//                     </StyledTableRow>
//                   </>
//                 }
//               </TableBody>
//             </Table>
//             </TableContainer>
//           </Grid>

//         </Grid>
//       </Box>


//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item>
//             <Typography variant='h6'>
//               Imports & Exports
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' xs={12}>
//           <Grid item style={{ marginTop: 8 }} xs={4}>
//             <Typography variant='h7' >
//               Export (copy files to Fileshare):
//             </Typography>
//           </Grid>
//           <Grid item xs={1}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               size="small"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               // onClick={() => }
//               onClick={() => {
//                 setConfirmDialog({
//                   isOpen: true,
//                   title: 'Do You Want Copy Files To FileShare?',
//                   onConfirm: () => { handleExport_Fileshare() }
//                 })
//               }}
//             >
//               {" "}
//               Export
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' xs={12} spacing={2}>
//           <Grid item style={{ marginTop: 8 }} xs={4}>
//             <Typography variant='h7' >
//               Import (Fileshare to Docker) :
//             </Typography>
//           </Grid>
//           <Grid item xs={1}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               size="small"
//               // style={{ marginTop: 10, marginLeft: 240 }}
//               onClick={() => handleImport_to_prod()}
//               onClick={() => {
//                 setConfirmDialog({
//                   isOpen: true,
//                   title: 'do you want to import Files to Prod?',
//                   onConfirm: () => { handleImport_to_prod() }
//                 })
//               }}
//             >
//               {" "}
//               Import
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <Box py={1} px={1}>
//         <Grid container direction='row' justifyContent='center'>
//           <Grid item>
//             <Typography variant='h6'>
//               Delete            </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center' xs={12} spacing={2}>
//           <Grid item style={{ marginTop: 8 }} xs={4}>
//             <Typography variant='h7' >
//               Delete Data From Fileshare:
//             </Typography>
//           </Grid>
//           <Grid item xs={1}>
//             <Button
//               variant="contained"
//               // disabled={!selecetd1}
//               color="primary"
//               component="span"
//               size="small"

//               onClick={() => {
//                 setConfirmDialog({
//                   isOpen: true,
//                   title: 'Are you sure to delete Files from Fileshare?',
//                   onConfirm: () => { delete_from_fileshare() }
//                 })
//               }}
//             >
//               {" "}
//               Delete
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>



//       {/* <Box py={2} px={2}>
//         <Grid container direction='row' justifyContent='center'></Grid>
//       </Box> */}
//       <Notification notify={notify} setNotify={setNotify} />
//       <ConfirmDialog
//         confirmDialog={confirmDialog}
//         setConfirmDialog={setConfirmDialog}
//       />
//     </Box >
//   )
// }









import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import ConfirmDialog from "../../Features/Notifications/ConfirmDialog"
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from '@material-ui/core';
import Notification from "../Notifications/Notification";
import Menuaction from '../../Redux/actions/Menuaction';

import {
  Container,
  Modal,
  Snackbar,
} from "@material-ui/core";



const useStylestable = makeStyles((theme) => ({
  table: {
    width: '96%',
    // width:10
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  texttablecell: {
    // overflowX: 'hidden',
    whiteSpace: "nowrap",
    width: "140px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    '&:hover': {
      overflow: 'visible'
    }
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
  }

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


export default function SuperadminFunction() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classestable = useStylestable();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isData, setIsData] = useState(true);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, project_version } = useSelector(state => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title)
  const [objtype, setObjtype] = useState('Procedure')
  const [Migtype, setMigtype] = useState('')
  const [fnnames, setFnnames] = useState([])
  const [data, setData] = useState([])
  const [selecetd1, setSelected1] = useState(false)
  const [selecetd, setSelected] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);
  // const [openAlert1, setOpenAlert1] = useState(false);
  const [open2, setOpen2] = useState(false)

  const [migtype_create, setMigtype_create] = useState()
  const [objtype_create, setObjtype_create] = useState()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [migtypelist, setMigtypeslist] = useState([])
  const [objtypelist, setObjtypeslist] = useState([])
  const [updatemiglist, setUpdatemiglist] = useState(false)
  const [updateobjlist, setUpdateobjlist] = useState(false)
  const [userslist, setUserslist] = useState([])
  const [adminlistdata, setadminlistdata] = useState([])
  const [superadminlist, setsuperadminlist] = useState([])

  const [useremail, setuseremail] = useState()
  // const [superuseremail, setsuperuseremail] = useState()
  const [updateAdminTable, setUpdateAdminTable] = useState(false)
  const [updateSuperAdminTable, setUpdateSuperAdminTable] = useState(false)
  const [updatermSuperAdminTable, setUpdatermSuperAdminTable] = useState(false)
  const [updateaccessAdminTable, setupdateaccessAdminTable] = useState(false)
  const [rmitememail, setrmitemsemail] = useState()
  const [rmitemmig, setrmitemsmig] = useState()
  const [rm_miglist, setrm_miglist] = useState([])
  const [objectTypeAdmin, setObjectTypeAdmin] = useState()
  const [rm_objectslist, setrm_objectslist] = useState([])
  const [objecttype_rm, setObjecttype_rm] = useState()
  // const [proj_vers_list, setProj_vers_list] = useState([])
  const [project_max_limit, setProject_max_limit] = useState()
  const [feature_max_limit, setFeautre_max_limit] = useState()
  const [proj_vers_list, setProj_vers_list] = useState([])
  const [useradmin_list, setUseradmin_list] = useState([])
  const [useradmin_tableupdate, setuseradmin_tableupdate] = useState(false)
  const [isUserAdminData, setIsUserAdminData] = useState(false)
  const [deploymig, setDeploymig] = useState()
  const [select_prj_versionitem, setSelect_prj_versionitem] = useState()
  const [new_prj_versionitem, setNew_prj_versionitem] = useState()

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [newMigtype, setNewMigtype] = useState()
  const [isdeployData, setIsDeploydata] = useState(false)
  const [deployeddata, setDeployeddata] = useState([])
  const [deploy_update, setDeploy_update] = useState(false)


  let history = useHistory();


  // useEffect(() => {
  //   // let sval = 0;
  //   // if (headerValue) {
  //   //   if (headerValue.title === "Oracle TO Postgres") {
  //   //     sval = 1;
  //   //   } else if (headerValue.title === "SQLServer TO Postgres") {
  //   //     sval = 2;
  //   //   } else if (headerValue.title === "MYSQL TO Postgres") {
  //   //     sval = 3;
  //   //   }
  //   // }

  //   let body = {
  //     "Object_Type": objtype,
  //     "Migration_TypeId": headerValue?.title,
  //     "Feature_Name": ''
  //   };
  //   let conf = {
  //     headers: {
  //       Authorization: "Bearer " + config.ACCESS_TOKEN(),
  //     },
  //   };
  //   const form = new FormData();
  //   Object.keys(body).forEach((key) => {
  //     form.append(key, body[key]);
  //   });
  //   axios.post(`${config.API_BASE_URL()}/api/requestfndata/`, form, conf).then(
  //     (res) => {
  //       setFnnames(res.data)
  //       console.log(res.data)
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, [objtype]);



  React.useEffect(() => {
    if (headerValue?.title) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      let body_prj = {
        "Migration_TypeId": headerValue?.title
      }
      const form_prj = new FormData();
      Object.keys(body_prj).forEach((key) => {
        form_prj.append(key, body_prj[key]);
      });

      axios.post(`${config.API_BASE_URL()}/api/project_versions_list/`, body_prj, conf).then(
        (res) => {
          setProj_vers_list(res.data)
          // let prv = 0
          // let tit ;
          // Object.keys(res.data).forEach((key) => {
          //   if (prv <= res.data[key]?.code) {
          //     prv = res.data[key]?.code
          //     tit = res.data[key]?.title
          //   }

          // });
          // setSelect_pr_v(tit)
          // dispatch(Menuaction.project_version(prv))
          dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code))
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

  }, [headerValue?.title]);


  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/migtypes_useradmin/`, conf).then(
      (res) => {
        setMigtypeslist(res.data)
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
  }, [updatemiglist]);




  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/deploy_status/`, conf).then(
      (res) => {
        if (res.data.length > 0) {
          setDeployeddata(res.data)
          setIsDeploydata(true)
        } else {
          setDeployeddata([])
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
  }, [deploy_update]);

  useEffect(() => {
    if (project_version) {
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      let body = {
        'email': sessionStorage.getItem('uemail'),
        "Project_Version_Id": project_version
      }
      const form = new FormData();
      Object.keys(body).forEach((key) => {
        form.append(key, body[key]);
      });
      axios.post(`${config.API_BASE_URL()}/api/migrationlistperuser/`, form, conf).then(
        (res) => {
          // console.log("mig list ", res.data)
          // setMigtypeslist(res.data)
          res.data.map((key) => {
            console.log(headerValue?.title)
            if (key.Migration_TypeId === headerValue?.title) {
              console.log("============ ", key.Migration_TypeId === headerValue?.title)
              dispatch(Menuaction.getdropdownlist(key))
              // dispatch(Menuaction.admin(key?.admin))
            }
          })
          // dispatch(Menuaction.getdropdownlist(res.data))
          // dispatch(Menuaction.admin(res.data[0].admin))
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

  }, [updatemiglist, project_version]);


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
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let body = {
      "Migration_TypeId": migtype_create,
      "Project_Version_Id": project_version
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/objectviewtlist/`, form, conf).then(
      (res) => {

        // setObjtypeslist(res.data)
        if (res.data.length > 0) {
          setObjtypeslist(([{ Object_Type: "ALL" }]).concat(res.data))
        } else {
          setObjtypeslist([])
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
  }, [updateobjlist]);

  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/adminlist/`, conf).then(
      (res) => {
        setadminlistdata(res.data)
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
  }, [updateAdminTable, updateaccessAdminTable]);


  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/superuserlist/`, conf).then(
      (res) => {
        setsuperadminlist(res.data)
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
  }, [updateSuperAdminTable, updatermSuperAdminTable]);


  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/useradminlist/`, conf).then(
      (res) => {
        setUseradmin_list(res.data)
        setIsUserAdminData(true)
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
  }, [useradmin_tableupdate])



  // console.log(headerValue.title)
  const handleuseremail = (v) => {
    setSelected1(true)
    setuseremail(v?.email)
  }

  const handleuseremail1 = (v) => {
    setuseremail(v?.email)
  }

  // const handleuseremail1 = (v) => {

  // }

  const handleobjecttype = (v) => {
    setSelected(true)
    setObjectTypeAdmin(v?.Object_Type)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleObjectviewslist = (v) => {
    setMigtype_create(v?.Migration_TypeId)

    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let body = {

      "Migration_TypeId": v?.Migration_TypeId,
      "Project_Version_Id": project_version
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios.post(`${config.API_BASE_URL()}/api/objectviewtlist/`, form, conf).then(
      (res) => {
        if (res.data.length > 0) {
          // setObjtypeslist(res.data)
          setObjtypeslist(([{ Object_Type: "ALL" }]).concat(res.data))

        } else {

          setObjtypeslist([])

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

  // const handledropdown = (e, v) => {

  //   let conf = {
  //     headers: {
  //       'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
  //     }
  //   }
  //   axios.get(`${config.API_BASE_URL()}/api/fdetail/${v?.Feature_Id || null}`, conf).then(
  //     (res) => {
  //       setData(res.data)
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  const handleMigrationCreate = () => {
    let prj_intial_creation;
    if (project_version === null) {
      prj_intial_creation = 1
    } else {
      prj_intial_creation = project_version
    }
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Object_Type": '',
      "Migration_TypeId": migtype_create || null,
      "Project_Version_Id": prj_intial_creation,
      'Project_Version_limit': project_max_limit,
      'Feature_Version_Limit': feature_max_limit
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });


    let postbody = {
      "Project_Version_Id": project_version,
    }
    const postform = new FormData();
    Object.keys(postbody).forEach((key) => {
      postform.append(key, postbody[key]);
    });

    axios.post(`${config.API_BASE_URL()}/api/migrationsscreate/`, form, conf).then(
      (res) => {
        // setNotify("Created Migration Type")
        setNotify({
          isOpen: true,
          message: "Created Migration Type",
          type: "success",
        });
        setUpdatemiglist(true)
        setOpen1(false)
        // dispatch(Menuaction.getdropdownlist(res.data))
        axios.post(`${config.API_BASE_URL()}/api/migrationviewlist/`, postform, conf).then(
          (res) => {
            setUpdatemiglist(true)
            // setMigtypeslist(res.data)
            // dispatch(Menuaction.getdropdownlist(res.data))
          },
          (error) => {
            setNotify({
              isOpen: true,
              message: 'Something Went Wrong Please try Again',
              type: "error",
            });
          }
        );
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setUpdatemiglist(false)


  }


  const handleObjectypeCreate = () => {
    let prj_intial_creation;
    if (project_version === null) {
      prj_intial_creation = 1
    } else {
      prj_intial_creation = project_version
    }
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Object_Type": objtype_create,
      "Migration_TypeId": migtype_create,
      "Project_Version_Id": prj_intial_creation,
      'Project_Version_limit': '',
      'Feature_Version_Limit': ''
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/migrationsscreate/`, form, conf).then(
      (res) => {
        if (res.data === 'Object Type Already Existed') {
          setNotify({
            isOpen: true,
            message: "Object Type Already Existed",
            type: "error",
          });
        } else {
          // setNotify("Created Object Type")
          setNotify({
            isOpen: true,
            message: "Created Object Type",
            type: "success",
          });
          setUpdateobjlist(true)
          setOpen(false)
          dispatch(Menuaction.reloadAction(true));

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
    setUpdateobjlist(false)
    // handleObjectviewslist(body)

  }


  const handlecreateadmin = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "email": useremail,
      "mig_type": migtype_create,
      "Object_Type": objectTypeAdmin
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/adminpermission/`, form, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: res.data,
          type: "success",
        });
        setUpdateobjlist(true)
        setUpdateAdminTable(true)
        setOpen(false)
        dispatch(Menuaction.reloadAction(true));
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setUpdateobjlist(false)
    setUpdateAdminTable(false)
  }

  const handlesuperadmincreation = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "email": useremail,
    }; const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/createsuperadmin/`, form, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: "super admin created successfully",
          type: "success",
        });
        // setOpen(false)
        // dispatch(Menuaction.reloadAction(true));
        setUpdateSuperAdminTable(true)

      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setUpdateSuperAdminTable(false)
  }


  const handledeletesuperadmin = (email) => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "email": email,
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/removesuperadmin/`, form, conf).then(
      (res) => {
        if (res.data === 'super admin removed successfully') {
          setNotify({
            isOpen: true,
            message: res.data,
            type: "success",
          });
          setUpdatermSuperAdminTable(true)
          // sessionStorage.setItem("isSuperAdmin", false);

        } else {
          setNotify({
            isOpen: true,
            message: res.data,
            type: "error",
          });
          // setUpdatermSuperAdminTable(true)
          // sessionStorage.setItem("isSuperAdmin", false);

        }
        // setNotify({
        //   isOpen: true,
        //   message: res.data,
        //   type: "success",
        // });
        // setUpdatermSuperAdminTable(true)
        // // sessionStorage.setItem("isSuperAdmin", false);

      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setUpdatermSuperAdminTable(false)
  }

  const handle_rm_mig_list_data = (email) => {

    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "User_Email": email,
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/adminrmmigrationlist/`, form, conf).then(
      (res) => {
        setUpdatermSuperAdminTable(true)
        setrm_miglist(res.data)
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  }

  const handleModelopen = (item) => {
    setrmitemsemail(item.Email)
    setrmitemsmig(item.Migration_Type)
    handle_rm_mig_list_data(item.Email)

    // calling rm admins objects list based on mig value and email

    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "User_Email": item.Email,
      "Migration_Type": item.Migration_Type
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/adminsobjectslist/`, form, conf).then(
      (res) => {
        setUpdatermSuperAdminTable(true)
        // setrm_miglist(res.data)
        setrm_objectslist(res.data)
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    // debugger
    setOpen2(true)
  }



  const handleremoveadminaccess = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "User_Email": rmitememail,
      "Migration_Type": rmitemmig,
      "Object_type": objecttype_rm
    }; const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.put(`${config.API_BASE_URL()}/api/removeadminmigrations/`, form, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: "Admin removed successfully",
          type: "success",
        });
        setupdateaccessAdminTable(true)
        setOpen2(false)
        dispatch(Menuaction.reloadAction(true));

      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setupdateaccessAdminTable(false)
  }

  const handleProject_Version = (v) => {
    dispatch(Menuaction.project_version(v?.code))
  }

  const handleCreateNewVersion = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      'Project_Version_Id': project_version,
      'Migration_TypeId': select_prj_versionitem
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios.post(`${config.API_BASE_URL()}/api/create_project_version/`, form, conf).then(
      (res) => {
        // dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code))
        setNotify({
          isOpen: true,
          message: res.data,
          type: "success",
        });


        let body_prj = {
          "Migration_TypeId": headerValue?.title
        }
        const form_prj = new FormData();
        Object.keys(body_prj).forEach((key) => {
          form_prj.append(key, body_prj[key]);
        });
        axios.post(`${config.API_BASE_URL()}/api/project_versions_list/`, form_prj, conf).then(
          (res) => {
            dispatch(Menuaction.getproj_header_dropdownlist(res.data))
            dispatch(Menuaction.project_version(res.data.slice(-1)[0]?.code))
            // dispatch(Menuaction.project_reloadAction(true))
            setTimeout(() => {
              history.push('/')
            }, 2000)

          },
          (error) => {
            setNotify({
              isOpen: true,
              message: 'Something Went Wrong Please try Again',
              type: "error",
            });
          }
        );

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

  const handleuseradmincreation = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      'email': useremail
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/createuseradmin/`, form, conf).then(
      (res) => {

        setNotify({
          isOpen: true,
          message: res.data,
          type: "success",
        });
        setuseradmin_tableupdate(true)


      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setuseradmin_tableupdate(false)
    // setIsUserAdminData(false)
  }


  const handledeleteuseradmin = (email) => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      'email': email
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/removeuseradmin/`, form, conf).then(
      (res) => {

        setNotify({
          isOpen: true,
          message: res.data,
          type: "success",
        });
        setuseradmin_tableupdate(true)
        // setIsUserAdminData(true)

      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );
    setuseradmin_tableupdate(false)
    // setIsUserAdminData(false)
  }

  const handleMigDeploytype = (v) => {
    setDeploymig(v?.Migration_TypeId)
  }

  const handleDeploy = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      'Migration_TypeId': deploymig
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios.post(`${config.API_BASE_URL()}/api/createdeploystatus/`, form, conf).then(
      (res) => {
        setDeploy_update(true)
        
        axios.post(`${config.API_BASE_URL()}/api/deploy/`, form, conf).then(
          (res) => {
            setDeploy_update(false)
            setNotify({
              isOpen: true,
              message: res.data,
              type: "success",
            });
            setDeploy_update(true)
          },
          (error) => {
            setNotify({
              isOpen: true,
              message: 'Something Went Wrong Please try Again',
              type: "error",
            });
          }
        );
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong Please try Again',
          type: "error",
        });
      }
    );

    // setDeploy_update(true)
    setDeploy_update(false)
  }


  const delete_from_fileshare = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    setConfirmDialog({
      confirmDialog,
      isOpen: false
    })
    axios.get(`${config.API_BASE_URL()}/api/deletefromfileshare/`, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: res.data,
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
    );
  }


  const handleExport_Fileshare = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    setConfirmDialog({
      confirmDialog,
      isOpen: false
    })
    axios.get(`${config.API_BASE_URL()}/api/export_to_fileshare/`, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: res.data,
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
    );
  }


  const handleNewVersionMigration = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      'Migration_TypeId': new_prj_versionitem,
      "New_Migration_Type": newMigtype
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/newmigtype_old/`, form, conf).then(
      (res) => {

        setNotify({
          isOpen: true,
          message: res.data,
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
    );
  }

  const handleImport_to_prod = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    setConfirmDialog({
      confirmDialog,
      isOpen: false
    })
    axios.get(`${config.API_BASE_URL()}/api/import_to_prod/`, conf).then(
      (res) => {
        setNotify({
          isOpen: true,
          message: res.data,
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
    );
  }

  return (
    <Box style={{ width: '100%' }}>


      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Super Admin Creation
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' spacing={1}>
          <Grid item >
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
              onClick={() => handlesuperadmincreation()}
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
              align='center'
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
                    {superadminlist.map((item) =>
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
                            style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                            onClick={() => handledeletesuperadmin(item.Email)}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </>
                )
                  : <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">No Requests</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                }
              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Box>

      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              User Admin Creation
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' spacing={1}>
          <Grid item >
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
              onClick={() => handleuseradmincreation()}
            >
              {" "}
              Create User Admin
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align='center'
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              User Admin List
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
                {isUserAdminData ? (
                  <>
                    {useradmin_list.map((item) =>
                      <StyledTableRow container>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.username}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.email}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <Button
                            type="button"
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                            onClick={() => handledeleteuseradmin(item.email)}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </>
                )
                  : <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">No Requests</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                }
              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Box>

      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Migration Admin Creation
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
              options={migtypelist}
              groupBy={""}
              // defaultValue={{ title: "Oracle TO Postgres" }}
              getOptionLabel={(option) => option.Migration_TypeId}
              style={{ width: 300, marginLeft: 100 }}
              onChange={(e, v) => handleObjectviewslist(v)}
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
                  onChange={(e) => setMigtype_create(e.target.value)}
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
                  onChange={(e) => setProject_max_limit(e.target.value)}
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
                  onChange={(e) => setFeautre_max_limit(e.target.value)}
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
          <Grid item xs={4} >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              // defaultValue={{ title: "Select Email" }}
              getOptionLabel={(option) => option.email}
              style={{ width: 300, marginLeft: 90 }}
              onChange={(e, v) => setuseremail(v?.email)}
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
          <Grid item xs={4} >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={objtypelist}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.Object_Type}
              onChange={(e, v) => handleobjecttype(v)}
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
              {/* <form className={classes.form} autoComplete="off"> */}

              <Grid item xs={4} >
                <StyledAutocomplete
                  size="small"
                  id="grouped-demo"
                  className={classes.inputRoottype}
                  options={migtypelist}
                  groupBy={""}
                  // defaultValue={{ title: "Oracle TO Postgres" }}
                  getOptionLabel={(option) => option.Migration_TypeId}
                  style={{ width: 400, marginBottom: '20px', height: '60px' }}
                  onChange={(e, v) => setMigtype_create(v?.Migration_TypeId)}
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

              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Object Type"
                  style={{ width: 400, marginBottom: '20px' }}
                  multiline
                  rows={1}
                  // value ={row.Keywords}
                  onChange={(e) => setObjtype_create(e.target.value)}
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
              <div className={classes.item} >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 20, marginLeft: 100 }}
                  onClick={() => handleObjectypeCreate()}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
              {/* </form> */}
            </Container>
          </Modal>
          <Grid>
            <Button
              variant="contained"
              disabled={!selecetd}
              color="primary"
              component="span"
              style={{ marginTop: 9, marginLeft: 180 }}
              onClick={() => { handlecreateadmin() }}
            >
              {" "}
              Create Admin
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align='center'
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Migration Admin List
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="left">User Email</StyledTableCell>
                  <StyledTableCell align="left">Migration Types</StyledTableCell>
                  <StyledTableCell align="left">Object Types</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                {isData ? (
                  <>
                    {adminlistdata.map((item) =>
                      <StyledTableRow container>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Email}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Migration_Type}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {/* {item.Object_types} */}

                            {
                              item.Object_types.map((value, index, array) => {
                                if (array.length - 1 === index) {
                                  return value
                                } else {
                                  return value + ','
                                }

                              })
                            }
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            type="button"
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                            onClick={() => { handleModelopen(item) }}
                          >
                            Remove
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </>
                )
                  : <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">No Requests</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                }


              </TableBody>
            </Table>

            <Snackbar
              open={openAlert}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
            </Snackbar>
            <Modal open={open2}>
              <Container className={classes.container1}>
                <Typography
                  gutterBottom
                  align="center"
                  variant="h6"
                  component="h2"
                  className={classes.Object_Type}
                  style={{ marginBottom: '20px' }}
                >
                  Admin Access
                </Typography>
                <Grid item xs={4} >
                  <TextField
                    id="outlined-multiline-static"
                    label="username/email"
                    name="username_ID"
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    value={rmitememail}
                    size="small"
                    disabled
                    style={{ width: 400, marginBottom: '20px', height: '60px' }}
                  />


                </Grid>

                <TextField
                  id="outlined-multiline-static"
                  label="Migration Type"
                  name="migrationtype"
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={rmitemmig}
                  size="small"
                  disabled
                  style={{ width: 400, marginBottom: '20px', height: '60px' }}
                />

                <Grid item xs={4} >
                  <StyledAutocomplete
                    size="small"
                    id="grouped-demo"
                    className={classes.inputRoottype}
                    options={rm_objectslist}
                    groupBy={""}
                    // defaultValue={{ title: "Oracle TO Postgres" }}
                    value={objecttype_rm}
                    getOptionLabel={(option) => option.Object_type}
                    style={{ width: 400, marginBottom: '20px', height: '60px' }}
                    onChange={(e, v) => setObjecttype_rm(v?.Object_type)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Object types"
                        variant="outlined"
                        InputLabelProps={{
                          className: classes.floatingLabelFocusStyle,
                          shrink: true,
                        }}

                      />
                    )}
                  />
                </Grid>
                <div className={classes.item} >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 20, marginLeft: 100 }}
                    onClick={() => handleremoveadminaccess()}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setOpen2(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Container>
            </Modal>

          </Grid>

        </Grid>
      </Box>

      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              New Version Migration
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' xs={12}>
          <Grid item xs={5}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={migtypelist}
              groupBy={""}
              // defaultValue={{ title: "Oracle TO Postgres" }}
              getOptionLabel={(option) => option.Migration_TypeId}
              style={{ width: 300 }}
              onChange={(e, v) => setNew_prj_versionitem(v?.Migration_TypeId)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Migration type"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}

                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="New Migtype"
              multiline
              rows={1}
              onChange={(e) => setNewMigtype(e.target.value)}
              name="NewMigType"
              // defaultValue="Default Value"
              // helperText={featurenamemsg}
              // className={classes.textField}
              // helperText="Some important text"
              variant="outlined"
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              // multiline
              fullWidth
              style={{ width: 300, marginBottom: '20px', height: '50px' }}
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              size="small"
              // style={{ marginTop: 10, marginLeft: 240 }}
              onClick={() => handleNewVersionMigration()}
            >
              {" "}
              Create
            </Button>
          </Grid>

        </Grid>
      </Box>

      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Version Creation & Deployement
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' xs={12}>
          <Grid item style={{ marginTop: 8 }} xs={4}>
            <Typography variant='h7' >
              Project Version Creation :
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={migtypelist}
              groupBy={""}
              // defaultValue={{ title: "Oracle TO Postgres" }}
              getOptionLabel={(option) => option.Migration_TypeId}
              style={{ width: 300 }}
              onChange={(e, v) => setSelect_prj_versionitem(v?.Migration_TypeId)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Migration type"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}

                />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              size="small"
              // style={{ marginTop: 10, marginLeft: 240 }}
              onClick={() => handleCreateNewVersion()}
            >
              {" "}
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item style={{ marginTop: 8 }} xs={4}>
            <Typography variant='h7' >
              Deployment (Get Approved Modules):
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={migtypelist}
              groupBy={""}
              // defaultValue={{ title: "Oracle TO Postgres" }}
              getOptionLabel={(option) => option.Migration_TypeId}
              style={{ width: 300 }}
              onChange={(e, v) => handleMigDeploytype(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Migration type"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}

                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              size="small"
              // style={{ marginTop: 10, marginLeft: 240 }}
              onClick={() => handleDeploy()}
            >
              {" "}
              Deploy
            </Button>
          </Grid>
          {/* <Grid item >

          </Grid> */}
        </Grid>

      </Box>


      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align='center'
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Deployement Status
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="center">Migration Type</StyledTableCell>
                  <StyledTableCell align="center">Start Time</StyledTableCell>
                  <StyledTableCell align="center">End Time</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isdeployData ? (
                  <>
                    {deployeddata.map((item) =>
                      <StyledTableRow container>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Migration_TypeId}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Deploy_Start_Time}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Deploy_End_Time}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell item xl={8}>
                          <div className={classes.texttablecell}>
                            {item.Deployment_Status}
                          </div>
                        </StyledTableCell>

                      </StyledTableRow>
                    )}
                  </>
                )
                  : <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="right">No Requests</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                }
              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Box>


      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Imports & Exports
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' xs={12}>
          <Grid item style={{ marginTop: 8 }} xs={4}>
            <Typography variant='h7' >
              Export (copy files to Fileshare):
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              size="small"
              // style={{ marginTop: 10, marginLeft: 240 }}
              // onClick={() => }
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Do You Want Copy Files To FileShare?',
                  onConfirm: () => { handleExport_Fileshare() }
                })
              }}
            >
              {" "}
              Export
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' xs={12} spacing={2}>
          <Grid item style={{ marginTop: 8 }} xs={4}>
            <Typography variant='h7' >
              Import (Fileshare to Docker) :
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              size="small"
              // style={{ marginTop: 10, marginLeft: 240 }}
              onClick={() => handleImport_to_prod()}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'do you want to import Files to Prod?',
                  onConfirm: () => { handleImport_to_prod() }
                })
              }}
            >
              {" "}
              Import
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Delete            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center' xs={12} spacing={2}>
          <Grid item style={{ marginTop: 8 }} xs={4}>
            <Typography variant='h7' >
              Delete Data From Fileshare:
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              // disabled={!selecetd1}
              color="primary"
              component="span"
              size="small"

              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to delete Files from Fileshare?',
                  onConfirm: () => { delete_from_fileshare() }
                })
              }}
            >
              {" "}
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>



      {/* <Box py={2} px={2}>
        <Grid container direction='row' justifyContent='center'></Grid>
      </Box> */}
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Box >
  )
}