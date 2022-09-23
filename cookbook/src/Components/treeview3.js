import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const data =
{
  id: "PROCEDURE",
  name: [{ Feature_Name: "fp1" }, { Feature_Name: "fp2" }],
  children: [
    {
      id: "Sub_PROCEDURE_1",
      name: [{ Feature_Name: "sub_fp1" }, { Feature_Name: "sub_fp2" }],
      children: [
        {
          id: "Sub_PROC_1",
          name: [
            { Feature_Name: "sub_fp1_s" },
            { Feature_Name: "sub_fp2_s" },
          ],
          children: [
            {
              id: "Sub_PROC_11",
              name: [
                { Feature_Name: "sub_fp11_s" },
                { Feature_Name: "sub_fp21_s" },
              ],
              children: [],
              Admin_Flag: 1,
            },
          ],
          Admin_Flag: 1,
        },
        {
          id: "Sub_PROC_2",
          name: [
            { Feature_Name: "sub_fp3_s" },
            { Feature_Name: "sub_fp4_s" },
          ],
          children: [],
          Admin_Flag: 1,
        },
      ],
      Admin_Flag: 1,
    },

    {
      id: "Sub_PROCEDURE_2",
      name: [{ Feature_Name: "sub_fp5" }, { Feature_Name: "sub_fp6" }],
      children: [],
      Admin_Flag: 1,
    },

    {
      id: "Sub_PROCEDURE_3",
      name: [{ Feature_Name: "sub_fp7" }, { Feature_Name: "sub_fp8" }],
      children: [],
      Admin_Flag: 1,
    },
  ],
  Admin_Flag: 1,
}

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const renderTree = (nodes) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.id}>
    {nodes.name.map((fn, key) => {
      return (
        <TreeItem key={key} nodeId={key} label={fn.Feature_Name}></TreeItem>
      );
    })}
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node))
      : null}
  </TreeItem>
);

export default function RecursiveTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
