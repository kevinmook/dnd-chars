import {styled} from 'linaria/react';
import {colors} from '../styles';

const Table = styled.table`
  border-collapse: collapse;

  &, td, tr, th {
    border: 1px solid ${colors.lightGrey};
  }

  th {
    padding: 1em;
    white-space: nowrap;
  }

  td {
    padding: 0.25em;
  }
`;

export default Table;
