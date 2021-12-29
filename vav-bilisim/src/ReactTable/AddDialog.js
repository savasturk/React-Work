import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

const initialUser = {
  id: -1,
  kontrat: '',
  teklif: 0,
  data: '',
  subRows: undefined,
}

const AddDialog = props => {
  const [user, setUser] = useState(initialUser)
  const { addUserHandler } = props
  const [open, setOpen] = React.useState(false)

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  })

  const handleSwitchChange = name => event => {
    setSwitchState({ ...switchState, [name]: event.target.checked })
  }

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    resetSwitch()
  }

  const handleAdd = event => {
    addUserHandler(user)
    setUser(initialUser)
    switchState.addMultiple ? setOpen(true) : setOpen(false)
  }

  const handleChange = name => ({ target: { value } }) => {
    setUser({ ...user, [name]: value })
  }

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Id"
            type="number"
            fullWidth
            value={user.id}
            onChange={handleChange('id')}
          />
          <TextField
            margin="dense"
            label="Kontrat"
            type="text"
            fullWidth
            value={user.kontrat}
            onChange={handleChange('kontrat')}
          />
          <TextField
            margin="dense"
            label="Teklif"
            type="number"
            fullWidth
            value={user.teklif}
            onChange={handleChange('teklif')}
          />
          <TextField
            margin="dense"
            label="Data"
            type="text"
            fullWidth
            value={user.data}
            onChange={handleChange('data')}
          />
         
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
}

export default AddDialog
