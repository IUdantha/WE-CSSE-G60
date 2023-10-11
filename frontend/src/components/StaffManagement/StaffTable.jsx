import React from 'react';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const StaffTable = ({ columns, rows }) => {
  const getRowId = (row) => row.empID;
  return (
    <div className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowId={getRowId}
        />
      </Box>
    </div>
  );
};

export default StaffTable;
