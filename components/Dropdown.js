import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Dropdown({
  id,
  label,
  value,
  open,
  handleClick,
  handleClose,
  anchor,
  error,
  list,
}) {
  return (
    <>
      <TextField
        value={value}
        label={label}
        id={`${id}-button`}
        onClick={e => handleClick(e, id)}
        aria-controls={open ? `${id}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disabled={!error}
        error={error}
        required
      />
      <Menu
        id={`${id}-menu`}
        anchorEl={anchor}
        open={open}
        onClose={e => handleClose(e, id)}
        MenuListProps={{ 'aria-labelledby': 'degree-button' }}
      >
        {list.map(item => (
          <MenuItem onClick={e => handleClose(e, id)} name={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}