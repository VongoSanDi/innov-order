import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Button, Tooltip } from '@mui/material'
import { formatKeyName } from '@/i18n/translations';
import { VerticalTableProps } from '@/types/index';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '8px',
  [theme.breakpoints.down('sm')]: {
    padding: '6px 4px',
    '&:last-child': {
      paddingRight: 4,
    },
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '4px 8px',
  fontSize: '0.75rem',
  [theme.breakpoints.down('sm')]: {
    padding: '2px 4px',
    fontSize: '0.6rem',
  },
}));

const VerticalTable: React.FC<VerticalTableProps> = ({ data, onRemoveProduct }) => {
  /**
   * This recursive function flattens a potentially nested object into a single-level object.
   * If the key value is an object non-null and not an array, it call itself
   * Else it had they key and the prefix to acc
   * Example:
   * const obj = { a: 1, b: { c: 2, d: { e: 3 } } }
   * console.log(flattenObject(obj));
   * Output: { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
   */
  const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, any> => {
    return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
      const pre = prefix.length ? `${prefix}.${k}` : k;
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre));
      } else {
        acc[pre] = obj[k];
      }
      return acc;
    }, {});
  };

  /**
   * Used in the table, contain all the flattened object
   */
  const flattenedData = data.map(item => ({
    ...flattenObject(item),
    code: item.code
  }));

  /**
   * Extract all the unique keys
    */
  const allKeys = Array.from(new Set(flattenedData.flatMap(Object.keys)));

  /**
   * Format the data to display
   */
  const renderCellContent = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  };

  if (data.length === 0) {
    return <p>Please search for a product with the barcode to display it's informations</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Properties</StyledTableCell>
            {data.map((item, index) => (
              <StyledTableCell key={index} align="right">
                <StyledButton onClick={() => onRemoveProduct(index)} size="small" color="secondary" variant="contained">
                  Delete
                </StyledButton>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allKeys.map(key => (
            <TableRow key={key}>
              <StyledTableCell component="th" scope="row">{formatKeyName(key)}</StyledTableCell>
              {flattenedData.map((item, index) => (
                <Tooltip title={renderCellContent(item[key as keyof typeof item])} key={index}>
                  <StyledTableCell align="right">
                    {renderCellContent(item[key as keyof typeof item])}
                  </StyledTableCell>
                </Tooltip>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VerticalTable;
