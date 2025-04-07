import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  Rows: any;
  Cols: any;
  Title?: string;
}

const headerStyle = {
  // padding: "5px 3px",
  fontSize: "14px",
  whiteSpace: "nowrap",
  fontWeight: "medium",
};
const cellStyle = {
  fontFamily: "'Alata', sans-serif",
  fontSize: "12px",
  whiteSpace: "nowrap",
  // padding: "5px 8px",
};
export const headerOptions = {
  filter: true,
  setCellProps: () => {
    return {
      style: {
        ...cellStyle,
      },
    };
  },
  setCellHeaderProps: () => {
    return {
      style: {
        ...headerStyle,
      },
    };
  },
};

const DataTable = ({ Rows, Cols, Title = "" }: Props) => {
  const [dataRows, setDataRows] = useState<Array<any>>([]);
  const [dataColumns, setDataColumns] = useState<Array<any>>([]);

  const CustomToolbar = () => {
    return (
      <Tooltip title="Refresh">
        <RefreshSharpIcon
          className="refreshbutton"
          onClick={() => window.location.reload()}
        />
      </Tooltip>
    );
  };

  const options = {
    filter: true,
    selectableRows: "none",
    rowsPerPageOptions: [10, 20, 50, 100],
    filterType: "dropdown",
    responsive: "standard",
    // count: 50,
    rowsPerPage: 20,
    className: "whitespace-nowrap text-nowrap",
    print: false,
    downloadOptions: { filename: Title },
    customToolbar: () => <CustomToolbar />,
  };

  useEffect(() => {
    setDataRows(Rows);
    let headers: any = [];
    Cols.forEach((element: any) => {
      headers.push({
        ...element,
        options: element.options ?? { ...headerOptions },
      });
    });
    setDataColumns(headers);
  }, [Rows, Cols]);

  return (
    <div className="text-nowrap">
      <MUIDataTable
        title={Title}
        data={dataRows}
        columns={dataColumns}
        options={options}
      />
    </div>
  );
};

export default DataTable;
