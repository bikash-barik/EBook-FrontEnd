import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Notification from "../Notifications/Notification";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import TableBody from "@material-ui/core/TableBody";
// import fileDownload from "js-file-download";
import fileSaver from "file-saver";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { useHistory, Link } from "react-router-dom";
// import fileDownload from "js-file-download";
import API_BASE_URL from "../../Config/config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import config from "../../Config/config";
import ActionMenu from "../../../src/Redux/actions/Menuaction";

const useStylestable = makeStyles({
    table: {
        minWidth: 100,
        // width:10
    },
});
const useStyles = makeStyles((theme) => ({
    Requestcontainer: {
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

export default function RequestFeatureData(props) {
    var previewdata = props.location.data?.data


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
    const { project_version } = useSelector((state) => state.dashboardReducer);
    const [issattdata, setIssattdata] = useState(false);
    const [iscattdata, setIscattdata] = useState(false);
    const [istattdata, setIstattdata] = useState(false);

    const [source_codeatt, setSource_codeatt] = useState([]);
    const [target_acodeatt, setTarget_acodeatt] = useState([]);
    const [target_ecodeatt, setTarget_ecodeatt] = useState([]);
    const [isscattdata, setIsscattdata] = useState(false);
    const [istaattdata, setIstaattdata] = useState(false);
    const [istettdata, setIstettdata] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [att_update, setAtt_update] = useState(false);
    useEffect((e) => {
        if (previewdata) {

        } else {
            history.push({
                pathname: "/request",
            });
        }
    }, []);

    useEffect(() => {
        if (previewdata?.Feature_Name) {
            let conf = {
                headers: {
                    Authorization: "Bearer " + config.ACCESS_TOKEN(),
                },
            };
            let body = {
                'User_Email': sessionStorage.getItem('uemail'),
                "Migration_Type": previewdata.Migration_TypeId,
                "Object_Type": previewdata.Object_Type,
                "Project_Version_Id": project_version
            }
            const form = new FormData();
            Object.keys(body).forEach((key) => {
                form.append(key, body[key]);
            });
            axios
                .post(`${config.API_BASE_URL()}/api/fdetail/${previewdata?.Feature_Name || null}`, form, conf)
                .then(
                    (res) => {
                        Object.keys(res.data).forEach((val) => {
                            if (res.data[val]?.Max_Flag === 1) {
                                setDetaildata(res.data[val]?.serializer);
                                setIsdata(true);
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
        } else {
            setDetaildata();
        }
    }, [previewdata?.Feature_Id, att_update]);

    useEffect(() => {
        // console.log("menus ", menuitem);
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
            },
        };
        axios.get(`${config.API_BASE_URL()}/api/sourcedesc/${previewdata?.Feature_Id}`, conf).then(
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
    }, [previewdata?.Feature_Id, att_update]);
    useEffect(() => {
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
            },
        };
        axios.get(`${config.API_BASE_URL()}/api/targetdesc/${previewdata?.Feature_Id}`, conf).then(
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
    }, [previewdata?.Feature_Id, att_update]);

    useEffect(() => {
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
            },
        };
        axios.get(`${config.API_BASE_URL()}/api/convatt/${previewdata?.Feature_Id}`, conf).then(
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
    }, [previewdata?.Feature_Id, att_update]);

    useEffect(() => {
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
            },
        };
        axios.get(`${config.API_BASE_URL()}/api/codefiles/${previewdata?.Feature_Id}`, conf).then(
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
    }, [previewdata?.Feature_Id, att_update]);

    const handleDownload = (att_Type, migtypeid, id, obj_type, att_name, fid) => {
        // if (migtypeid === "1") {
        //     migtypeid = "Oracle TO Postgres";
        //     // setMigtypeid(1)
        // } else if (migtypeid === "2") {
        //     migtypeid = "SQLServer TO Postgres";
        //     // setMigtypeid(2)
        // } else if (migtypeid === "3") {
        //     migtypeid = "MYSQL TO Postgres";
        //     // setMigtypeid(3)
        // }
        let body = {
            file_name: att_name,
            migration_typeid: migtypeid,
            object_type: obj_type,
            AttachmentType: att_Type,
            id: id,
            fname: detaildata.Feature_Name,
            feature_id: fid,
            responseType: "blob",
        };
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
                "Content-Type": "application/json",
            },
        };
        console.log(conf.headers);
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

        // axios
        //     .post(`${config.API_BASE_URL()}/api/download_att`, body, conf)
        //     .then((res) => {
        //         fileDownload(res.data, att_name);
        //     })
        //     .catch((err) => { });

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

    var data = null;
    let seq = null;
    if (detaildata) {
        // if (detaildata.Sequence !== "No Predecessor") {
        //     seq = detaildata.Sequence.substr(5);
        // } else {
        seq = detaildata.Sequence;
        // }
        data = (
            <>

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
                <Grid container className={classes.Requestcontainer}>


                    <Grid container justifyContent="flex-end" style={{ paddingTop: 30 }} spacing={2}>
                        {/* <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                component="span"
                                // startIcon={<EditSharpIcon />}
                                onClick={
                                    () => {
                                        dispatch(
                                            ActionMenu.EditPreviewFeature({ data: detaildata })
                                        );

                                        history.push("/EditFeature");
                                    }

                                }
                            >
                                Request Edit Access
                            </Button>
                        </Grid> */}
                        {/* <Grid item>
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
                        </Grid> */}
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={2}>
                        <Typography
                            gutterBottom
                            variant="h5"
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
                            className={classes.Object_Type}
                        >
                            Level
                        </Typography>
                        {/* <Typography component="h2"> */}
                        <div className={classes.Descripti2n}>{detaildata.Level}</div>
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
                                                                    {/* <IconButton
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
                                                                    </IconButton> */}
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
                                                                    {/* <IconButton
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
                                                                    </IconButton> */}
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
                                                                    {/* <IconButton
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
                                                                    </IconButton> */}
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
                                                        {/* <IconButton
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
                                                        </IconButton> */}
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
                                                        {/* <IconButton
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
                                                        </IconButton> */}
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
                                                        {/* <IconButton
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
                                                        </IconButton> */}
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
                        {/* <Button
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
                        </Button> */}
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <Box style={{ width: '97%', marginLeft: 15 }}>
            {data}
            <Notification notify={notify} setNotify={setNotify} />
        </Box>
    );
}
