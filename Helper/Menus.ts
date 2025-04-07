export type MenuItem = {
  label: string;
  path: string;
};

type Menus = {
  [key: string]: MenuItem[];
};

export const menus: Menus = {
  Evaluator: [
    { label: "Dashboard", path: "/Home/Evaluator" },
    { label: "Pending Request", path: "/Home/Evaluator/PendingRequest" },
    { label: "Approved Profiles", path: "/Home/Evaluator/ApprovedProfiles" },
    // { label: "Evaluator Profile", path: `/Home/EvaluatorProfile/${1}` },
  ],
  EvaluatorProfile: [
    // { label: "Admin View", path: "/Home/Evaluator" },
    { label: "Dashboard", path: "/Home/EvaluatorProfile" },
    {
      label: "Invitation fo paper checking",
      path: "/Home/EvaluatorProfile/Invitation",
    },
    { label: "View Result", path: "/Home/EvaluatorProfile/Result" },
    { label: "View Profile", path: `/Home/EvaluatorProfile/ViewProfile` },
  ],
  Result: [
    { label: "Dashboard", path: "/Home/Result" },
    {
      label: "Search Specific Result",
      path: "/Home/Result/SearchSpecificResult",
    },
    { label: "View Checked Copy", path: "/Home/Result/ViewCheckedCopy" },
    { label: "Report and Analytics", path: "/Home/Result/Report" },
    { label: "Action Summary", path: "/Home/Result/ActionSummary" },
    {
      label: "Exclusions Management",
      path: "/Home/Result/ExclusionsManagement",
    },
    {
      label: "Reconciliation Process",
      path: "/Home/Result/ReconciliationProcess",
    },
    {
      label: "Result Finalization & Export",
      path: "/Home/Result/ResultFinalizedExport",
    },
  ],
  User: [
    { label: "Dashboard", path: "/Home/User" },
    { label: "Roles Management", path: "/Home/User/Roles" },
    { label: "Menus Management", path: "/Home/User/Menus" },
  ],
  Attendance: [
    { label: "Dashboard", path: "/Home/Attendance" },
    {
      label: "Course Specific Details",
      path: "/Home/Attendance/CourseSpecificDetails",
    },
  ],
  Allotment: [
    { label: "Dashboard", path: "/Home/Allotment" },
    { label: "Alloted Papers", path: "/Home/Allotment/AllotedPapers" },
    { label: "Return Copies", path: "/Home/Allotment/ReturnCopies" },
    // {
    //   label: "Duplicate Copy Summary",
    //   path: "/Home/Allotment/DuplicateCopySummary",
    // },
    // { label: "Copy Viewer", path: "/Home/Allotment/CopyViewer" },
  ],
  CopyReceiving: [
    { label: "Dashboard", path: "/Home/CopyReceiving" },
    {
      label: "Copy Arrival Status",
      path: "/Home/CopyReceiving/CopyArrivalStatus",
    },
    { label: "Copy Receiving", path: "/Home/CopyReceiving/CopyReceiving" },
  ],
  PaperManagement: [
    { label: "Dashboard", path: "/Home/PaperManagement" },
    { label: "Upload Paper", path: "/Home/PaperManagement/Upload" },
  ],
  Management: [
    {
      label: "Question Paper Management",
      path: "/Home/Management/QuestionPaperManagement",
    },
    { label: "Course Management", path: "/Home/Management" },
    { label: "Menu Mapping", path: "/Home/Management/MenuMapping" },
  ],
  UMC: [
    { label: "Dashboard", path: "/Home/UMC" },
    { label: "Unfair Means Cases Report", path: "/Home/UMC/UMCReport" },
  ],
  InventoryManagement: [
    { label: "Dashboard", path: "/Home/InventoryManagement" },
    { label: "Stock Inward", path: "/Home/InventoryManagement/StockInward" },
    { label: "Stock Outward", path: "/Home/InventoryManagement/StockOutward" },
    {
      label: "Inventory Reconciliation (SF4)",
      path: "/Home/InventoryManagement/InventoryReconciliation",
    },
  ],
  ConveryerBelt: [
    { label: "Dashboard", path: "/Home/ConveyerBelt" },
  ],
  CenterManagement: [
    { label: "Dashboard", path: "/Home/CenterManagement" },
  ],
};
