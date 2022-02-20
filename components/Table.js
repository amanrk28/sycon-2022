import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F4F4F4',
    borderRadius: '4px 4px 0 0',
    fontWeight: 500,
    fontSize: 16,
    color: '#464646',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: '#A5A5A5',
    border: 'none',
  },
  '&[highlighted="true"]': {
    color: '#010E19',
  },
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    backgroundColor: '#F8F8F8',
  },
  '&[highlighted="true"]': {
    backgroundColor: '#FFD800',
  },
});

export default function CustomTable({
  columns,
  rows,
  tableMaxHeight = 380,
  highlighted,
}) {
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: tableMaxHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIdx) => (
              <StyledTableRow
                key={row.key}
                role="checkbox"
                tabIndex={-1}
                highlighted={rowIdx === highlighted ? 'true' : undefined}
              >
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      highlighted={rowIdx === highlighted ? 'true' : undefined}
                    >
                      {value}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
