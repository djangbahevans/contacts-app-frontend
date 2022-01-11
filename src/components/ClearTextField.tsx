import { Clear } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material"

type IClearTextFieldProps = {
  onClearClick?: React.MouseEventHandler<HTMLButtonElement>
} & TextFieldProps

const ClearTextField = ({ onClearClick, ...rest }: IClearTextFieldProps) => {
  return <TextField
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={onClearClick}>
            <Clear color="action" />
          </IconButton>
        </InputAdornment>
      )
    }}
    sx={{ maxWidth: 400 }}
    {...rest} />
}

export { ClearTextField }
