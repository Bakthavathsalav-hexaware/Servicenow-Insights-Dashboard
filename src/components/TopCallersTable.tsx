import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Paper } from '@mui/material'
 
type Props = {
  data: { caller: string; count: number }[]
}
 
const columns: GridColDef[] = [
  { field: 'caller', headerName: 'Caller', flex: 1 },
  { field: 'count', headerName: 'Incidents', width: 150 },
]
 
const TopCallersTable = ({ data }: Props) => {
  const rows = data.map((row, index) => ({
    id: index,
    ...row,
  }))
 
  return (
    <Paper sx={{ height: 350, padding: 2 }}>
      <h3>Top 5 Callers (This Month)</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Paper>
  )
}
 
export default TopCallersTable