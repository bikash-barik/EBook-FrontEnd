import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../../Config/config";
import Notification from "../Notifications/Notification";
import { useDispatch, useSelector } from "react-redux";
import Menuaction from "../../Redux/actions/Menuaction";


const useStylestable = makeStyles((theme) => ({
    table: {
        minWidth: 100,
        // width:10
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto'
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
    container: {
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
    actions: {
        overflowX: 'hidden',
        whiteSpace: "nowrap",
        width: "230px",
        overflow: "hidden",
        textOverflow: "ellipsis",
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




export default function FeatureApprovals() {
    const classes = useStyles();
    const classestable = useStylestable();
    const { headerValue, lable, project_version } = useSelector(state => state.dashboardReducer);
    const [approvalslist, setApprovallist] = useState([])
    const [data, isData] = useState(false)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [tableupdate, settableupdate] = useState(false)
    const dispatach = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (headerValue) {
            if (Object.keys(headerValue).length > 0) {
                let body = {
                    "Migration_TypeId": headerValue?.title,
                    "Object_Type": lable,
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
                axios.post(`${config.API_BASE_URL()}/api/featureapprovalslist/`, form, conf).then(
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
    }, [headerValue, lable, tableupdate]);


    const handlestatus = (item, status) => {

        if (status === 'In Progress') {
            status = 'In Progress'
        } else {
            status = 'Approved'
        }
        let body = {
            "Migration_TypeId": item.Migration_TypeId,
            "Object_Type": item.Object_Type,
            "Project_Version_Id": item.Project_Version_Id,
            "Feature_Name": item.Feature_Name,
            Source_FeatureDescription: item.Source_FeatureDescription,
            Source_Code: item.Source_Code,
            Conversion_Code: item.Conversion_Code,
            Target_FeatureDescription: item.Target_FeatureDescription,
            Target_Expected_Output: item.Target_Expected_Output,
            Target_ActualCode: item.Target_ActualCode,
            Keywords: item.Keywords,
            Level: item.Level,
            Estimations: item.Estimations,
            Sequence: item.Sequence

        };

        const form = new FormData();
        Object.keys(body).forEach((key) => {
            form.append(key, body[key]);
        });
        let fupdatebody = {
            Migration_TypeId: item?.Migration_TypeId,
            Object_Type: item.Object_Type,
            Feature_Name: item.Feature_Name,
            // Source_FeatureDescription, Target_FeatureDescription,
            Sequence: item.Sequence,
            Source_FeatureDescription: item.Source_FeatureDescription,
            Target_FeatureDescription: item.Target_FeatureDescription,
            Target_Expected_Output: item.Target_Expected_Output,
            Target_ActualCode: item.Target_ActualCode,
            Source_Code: item.Source_Code,
            Conversion_Code: item.Conversion_Code,
            "Feature_version_approval_status": status,
            "Feature_Approval_Date": moment(new Date()).format('YYYY-MM-DD'),
            'Project_Version_Id': item.Project_Version_Id,
            
        }
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
            },
        };


        const formfupdate = new FormData();
        Object.keys(fupdatebody).forEach((key) => {
            formfupdate.append(key, fupdatebody[key]);
        });

        axios.put(`${config.API_BASE_URL()}/api/fupdate/${item.Feature_Id}`, formfupdate, conf).then(
            (res) => {
                // console.log(res)

                if (res.data === 'Request for approval already present.Please wait for admin to approve it') {
                    setNotify({
                        isOpen: true,
                        message: res.data,
                        type: "error",
                    });
                }

                else if (status !== 'In Progress') {
                    axios.post(`${config.API_BASE_URL()}/api/featureapprovalcreate/`, form, conf).then(
                        (res) => {
                            if (res.data === "New versions won't be created until it has a previous version approved") {
                                setNotify({
                                    isOpen: true,
                                    message: res.data,
                                    type: "error",
                                });
                                settableupdate(true)
                            } else {
                                setNotify({
                                    isOpen: true,
                                    message: "Feature Approved and New Version Created",
                                    type: "success",
                                });
                                settableupdate(true)
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
                } else {
                    settableupdate(true)
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
        settableupdate(false)

    }

    return (
        <div className={classes.container}>
            <Box py={1} px={1}>
                <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            Feature Requests
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
            <Box py={2} px={2}>
                <Grid container xl={12} justifyContent="space-between" spacing={1}>
                    <Grid item xs={12}>
                        <TableContainer className={classestable.table}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="left">Project Version Id</StyledTableCell> */}
                                        <StyledTableCell align="center">Migration Type</StyledTableCell>
                                        <StyledTableCell align="center">Object Type</StyledTableCell>
                                        <StyledTableCell align="center">Feature Name</StyledTableCell>
                                        <StyledTableCell align="center">Feature Version Id</StyledTableCell>
                                        <StyledTableCell align="center">Approval Requested By</StyledTableCell>
                                        <StyledTableCell align="center">Approval Requested Date</StyledTableCell>
                                        <StyledTableCell align="center">Approved Status</StyledTableCell>
                                        {/* <StyledTableCell align="left">Request Created Date</StyledTableCell> */}
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isData ? (
                                        <>
                                            {approvalslist.map((item) =>

                                                <StyledTableRow container align="center">
                                                    {/* <StyledTableCell item xl={10}>
                                                        <div className={classes.texttablecell}>
                                                            {item.Project_Version_Id}
                                                        </div>
                                                    </StyledTableCell>
                                                    */}
                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>

                                                            {item.Migration_TypeId}

                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell item xl={5}  align="center">
                                                        <div className={classes.texttablecell}>
                                                            {item.Object_Type}
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>
                                                            {item.Feature_Name}
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>
                                                            {/* {"SivaNagaraju"} */}
                                                            {item.Feature_Version_Id}
                                                        </div>
                                                    </StyledTableCell>



                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>
                                                            {item.Feature_Requested_By}
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>
                                                            {item.Feature_Requested_Date}
                                                        </div>
                                                    </StyledTableCell>

                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>
                                                            {item.Feature_version_approval_status}
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell item xl={6} align="center">
                                                        <div className={classes.texttablecell}>
                                                            {item.Feature_Approval_Date}
                                                        </div>
                                                    </StyledTableCell>





                                                    <StyledTableCell item align="center" xl={10} align="center">
                                                        {item.Feature_version_approval_status === "Awaiting Approval" ? (
                                                            <div className={classes.actions}>
                                                                <Button
                                                                    type="button"
                                                                    size="small"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className={classes.submit}
                                                                    style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                                                                    onClick={(e) => { handlestatus(item, 'Approved') }}
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
                                                                    // onClick={(e) => { handleRequestAccessDeny(item, "Denied") }}
                                                                    onClick={(e) => { handlestatus(item, 'In Progress') }}

                                                                >
                                                                    Deny

                                                                </Button>
                                                                {' '}
                                                                <Button
                                                                    type="button"
                                                                    size="small"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className={classes.submit}
                                                                    style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                                                                    onClick={(e) => {
                                                                        dispatach(Menuaction.EditPreviewFeature({ data: item }));

                                                                        history.push("/EditFeature");
                                                                    }
                                                                    }
                                                                >
                                                                    Review
                                                                </Button>

                                                            </div>
                                                        ) : <div className={classes.texttablecell}>
                                                            {"No Actions"}
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
                                                </StyledTableCell>
                                                <StyledTableCell align="center">No Requests</StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                            </StyledTableRow>
                                        </>

                                    )

                                    }
                                </TableBody>

                            </Table>
                            {/* <>
                                <StyledTableRow container>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center">No Requests</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                </StyledTableRow>
                            </> */}
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
            <Notification notify={notify} setNotify={setNotify} />
            {/* <Box py={1} px={1}>
                <Grid container direction='row' justifyContent='center'>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{ marginTop: 15 }}
                    >
                        {" "}
                        Delete Records
                    </Button>
                </Grid>
            </Box> */}

        </div>
    )
}