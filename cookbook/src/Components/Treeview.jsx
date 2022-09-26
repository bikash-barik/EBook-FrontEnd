import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ActionMenu from "../../src/Redux/actions/Menuaction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import ConfirmDialog from "../Features/Notifications/ConfirmDialog";
import { drop } from "lodash";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: "#0A7D7F",
      color: "",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
      
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const history = useHistory();
  const classes = useTreeItemStyles();
  const dispatch = useDispatch();
  const IsSuperAdmin = sessionStorage.getItem("isSuperAdmin");
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    mainheader,
    data,
    // deleteitem,
    datavalue,
    sub,
    admin,
    createflag,
    ...other
  } = props;

  return (
    <>
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography
              variant="body2"
              className={classes.labelText}
              style={{ color: "white" }}
            >
              {labelText}
            </Typography>

            <Typography
              variant="caption"
              color="inherit"
              style={{ color: "white" }}
            >
              {labelInfo}
            </Typography>
            {/* {IsSuperAdmin == "true" && */}
            {(admin === 1 || createflag === 1) && (
              <>
                {mainheader && (
                  <AddIcon
                    color="inherit"
                    className={classes.labelIcon}
                    style={{ color: "#0BCD19" }}
                    onClick={
                      () =>
                        history.push({
                          pathname: "/Create",
                          state: {
                            data: { ...data, type: props.dropdown?.name },
                          },
                        })
                      // dispatch(ActionMenu.CreateFeature({data: { ...data, type: props.dropdown?.name }, id:'createFeature'}))
                    }
                  />
                )}
              </>
            )}
            {/* {sub && (
              <Delete
                color="inherit"
                style={{ color: '#FCBFD7' }}
                className={classes.labelIcon}

                // onClick={() => deleteitem(datavalue)}
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: 'Are you sure to delete this record?',
                    // subTitle: "You can't undo this operation",
                    onConfirm: () => { deleteitem(datavalue) }
                  })
                  // {setConfirmDialog({
                  //   isOpen: false})
                  // }
                }}
              />
            )} */}
            {sub}
          </div>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    </>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});



const renderTree = (nodes) => (
  <TreeItem key={nodes?.Label} nodeId={nodes?.Label} label={nodes?.Label} style={{ color: "white" }} icon={<Label style={{color:'black', width:'100'}}/>}>
    {nodes?.SubMenu.map((fn, key) => {
      return (
        <StyledTreeItem key={fn?.Feature_Name} nodeId={key+fn?.Feature_Name} labelText={fn?.Feature_Name} labelIcon={ViewModuleIcon} style={{color: "white" }}></StyledTreeItem>
      );
    })}
    {Array?.isArray(nodes?.Sub_Objects_List)
      ? nodes?.Sub_Objects_List.map((node) => renderTree(node))
      : null}
  </TreeItem>
);

export default function GmailTreeView({
  menuList,
  dropdown,
  deleteitem,
  confirmDialog,
  setConfirmDialog,
  admin,
  createflag,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const MenuSelected = (value, lable) => {
    dispatch(ActionMenu.ActionMenu(value));
    dispatch(ActionMenu.lableselect(lable));

    // dispatch(ActionMenu.ActionObjectMenu(value));
  };

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      // expanded={true}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {menuList?.length >= 1 && (
          <>
            
            {renderTree(menuList[0])}
          </>
        )}
     
     
    </TreeView>
  );
}
