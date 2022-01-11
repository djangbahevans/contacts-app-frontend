import { TableRow, TableCell, Checkbox } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { IContact } from "../utils/sharedInterfaces"

interface IContactRowProps {
  contact: IContact
  isSelected: boolean
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void
}

const ContactRow = ({ contact, isSelected, handleClick }: IContactRowProps) => {
  const name = `${contact.name_prefix || ""} ${contact.given_name || ""} ${contact.additional_name || ""} ${contact.family_name || ""} ${contact.name_suffix || ""}`
    .replace(/\s+/g, " ").trim()
  const labelId = `contacts-table-checkbox-${contact.id}`
  const navigate = useNavigate()

  return (
    <TableRow
      hover
      onClick={() => navigate(`/person/${contact.id}`)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={name}
      selected={isSelected}
      sx={{ "&:hover": { cursor: "pointer" } }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={event => handleClick(event, contact.id)}
          color="primary"
          checked={isSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {name}
      </TableCell>
      <TableCell
        align="left"
        sx={{ display: { xs: "none", sm: "none", md: "table-cell", lg: "table-cell", xl: "table-cell" } }} >{contact.email}</TableCell>
      <TableCell
        align="left"
        sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >{contact.phone1 || contact.phone2}</TableCell>
      <TableCell
        align="left"
        sx={{ display: { xs: "none", sm: "none", md: "none", lg: "none", xl: "table-cell" } }} >{contact.organization}</TableCell>
      <TableCell
        align="left"
        sx={{ display: { xs: "none", sm: "none", md: "none", lg: "none", xl: "table-cell" } }} >{contact.notes}</TableCell>
      <TableCell align="left"></TableCell>
    </TableRow>
  )
}

export { ContactRow }
