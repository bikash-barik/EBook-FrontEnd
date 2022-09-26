// import { DASHBOARD_DRAWER_OPEN } from "../actions/action-type";

const initialState = {
  drawerOpen: false,

  menuitem: null,
  headerValue: {},
  updatedValue: false,
  createFeature: false,
  preview: false,
  editpreview: false,
  details: {},
  editPreviewdetails: {},
  ITEMlIST: [],
  DropDownValues: [],
  admin: 0,
  lable: null,
  project_version: null,
  project_header_dropdown: [],
  proje_version_reload: false,
  // useradmin_check: null
};

const dashboardReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SELECTED_MENU":
      return {
        ...state,
        menuitem: action.payload
      };
    case "SELECTED_DROPDOWN":
      return {
        ...state,
        headerValue: action.payload
      };
    case "REALOAD_LIST":
      return {
        ...state,
        updatedValue: action.payload
      };



    case "CREATE_FEATURE":
      return {
        ...state,
        createFeature: true,
        details: action.payload.data,
        editpreview: false,
        preview: false

      };
    case "PREVIEW_FEATURE":
      return {
        ...state,
        preview: true,
        details: action.payload.data,
        editpreview: false,
        createFeature: false

      };
    case "EDIT_PREVIEW_FEATURE":
      return {
        ...state,
        editpreview: true,
        editPreviewdetails: action.payload.data,
        preview: false,
        createFeature: false

      };

    case "CREATE_REMOVED":
      return {
        ...state,
        createFeature: action.payload,
        details: {}
      };

    case "SELECTED_ITEM":
      return {
        ...state,
        ITEMlIST: action.payload
      };
    case "DROP_DOWN_LIST":
      return {
        ...state,
        DropDownValues: action.payload,
        headerValue: action.payload[0],
        // admin: action.payload[0].admin
      };




    case "UPDATE_SELECTED_ITEM":
      return {
        ...state,
        ITEMlIST: action.payload
      };
    case "DELETE_SELECTED_ITEM":
      return {
        ...state,
        ITEMlIST: action.payload
      };

    case "ADMIN_USER":
      return {
        ...state,
        admin: action.payload
      };
    case "LABLE":
      return {
        ...state,
        lable: action.payload
      };

    case "PROJECT_VERSION":
      return {
        ...state,
        project_version: action.payload
      };

    case "PROJECT_HEADER_VERSION":
      return {
        ...state,
        project_header_dropdown: action.payload,
      }

    case "PROJECT_VERSION_RELOAD":
      return {
        ...state,
        project_header_reload: action.payload,
      }
    // case "USERADMIN":
    //   return {
    //     ...state,
    //     useradmin_check: action.payload,
    //   }

    default:
      return state;
  }
};

export default dashboardReducer;