import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

export default function ConfirmPopover ({ children, confirmAction, onConfirmation }) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick (event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose () {
    setAnchorEl(null);
  }

  function handleConfirm () {
    onConfirmation();
    return handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? 'confirmation-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        {children}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div>
          <Button onClick={handleConfirm}>
            {confirmAction}
          </Button>
          <Button variant='contained' onClick={handleClose}>
            CANCEL
          </Button>
        </div>
      </Popover>
    </div>
  );
}
