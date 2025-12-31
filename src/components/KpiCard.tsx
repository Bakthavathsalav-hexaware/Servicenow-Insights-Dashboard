import { Paper, Typography } from '@mui/material'
 
type KpiCardProps = {
  title: string
  value: number
}
 
const KpiCard = ({ title, value }: KpiCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        minWidth: 200,
        textAlign: 'center',
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
 
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  )
}
 
export default KpiCard