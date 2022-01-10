import { ArrowBack, CalendarToday, Delete, Edit, Email, Language, LocationOn, Man, Note, Phone, Woman, Work } from "@mui/icons-material"
import { Avatar, Divider, Grid, IconButton, Link, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PersistentDrawer, PrimarySearchAppBar } from "../components"
import { IContact } from "../utils/sharedInterfaces"

const ContactViewPage = () => {
  const { id } = useParams()
  const [contact, setContact] = useState<IContact>()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const name = `${contact?.name_prefix || ""} ${contact?.given_name || ""} ${contact?.additional_name || ""} ${contact?.family_name || ""} ${contact?.name_suffix || ""}`
    .replace(/\s+/g, " ").trim()

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8000/contacts/${id}`, {
        method: "get",
        mode: "cors",
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      const data: IContact = await response.json()

      setContact(data)
    })()
  }, [id, token])

  const swapDrawerState = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const deleteHandler = async () => {
    try {

      const response = await fetch(`http://127.0.0.1:8000/contacts/${id}`, {
        method: "delete",
        mode: "cors",
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      if (response.status === 204)
        navigate(-1)
      else {
        const data = await response.json()
        // TODO: Add visible error to screen
        alert(data.detail)
      }
    }
    catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <>
      <PrimarySearchAppBar handleMenuClick={swapDrawerState} open={open} />
      <PersistentDrawer handleDrawerClose={handleDrawerClose} open={open}>
        <Box sx={{ my: 3 }}>
          <Grid container alignItems="center">
            <Grid item alignSelf="flex-start" xs={1}>
              <Tooltip title="Go back">
                <IconButton aria-label="back" onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={2}>
              {(() => {
                const avatarSize = 150
                if (contact?.photo)
                  return <Avatar alt={name} src={contact?.photo} />
                return <Avatar sx={{ width: avatarSize, height: avatarSize, fontSize: avatarSize - avatarSize / 3 }}>{name[0]}</Avatar>
              })()}
            </Grid>

            <Grid container item xs={3} spacing={1}>
              <Grid item xs={12}><Typography variant="h5">{name}</Typography></Grid>
              <Grid item xs={12}>{contact?.gender ? <Man color="action" fontSize="large" /> : <Woman color="action" fontSize="large" />}</Grid>
            </Grid>

            <Grid item xs={1}>
              <Tooltip title="Edit">
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={1}>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deleteHandler}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ my: 3, padding: 2, border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: 2 }}>
          <Typography variant="h6">Contact details</Typography>
          <Box sx={{ my: 2 }}>
            <Grid container>

              {(contact?.phone1 || contact?.phone2) && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <Phone color="action" />
                </Grid>
                <Grid container item xs={10}>
                  {contact?.phone1 && <Grid item xs={12}>{contact?.phone1}</Grid>}
                  {contact?.phone2 && <Grid item xs={12}>{contact?.phone2}</Grid>}
                </Grid>
              </Grid>}

              {contact?.email && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <Email color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <Link href={`mailto:${contact?.email}`}>{contact?.email}</Link>
                  </Grid>
                </Grid>
              </Grid>}

              {contact?.location && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <LocationOn color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>{contact?.location}</Grid>
                </Grid>
              </Grid>}

              {contact?.birthday && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <CalendarToday color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>{contact?.birthday}</Grid>
                </Grid>
              </Grid>}

              {(contact?.occupation || contact?.organization) && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <Work color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>{
                    (() => {
                      if (contact?.occupation) return contact?.occupation
                      if (contact?.organization) return contact?.organization
                      return `${contact?.occupation} - ${contact?.organization}`
                    })()
                  }</Grid>
                </Grid>
              </Grid>}

              {contact?.website && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <Language color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}><Link target="_blank" rel="noopener" href={contact?.website}>{contact?.website}</Link></Grid>
                </Grid>
              </Grid>}

              {contact?.notes && <Grid item container xs={12} sx={{ my: 0.5 }}>
                <Grid item xs={2}>
                  <Note color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>{contact?.notes}</Grid>
                </Grid>
              </Grid>}

            </Grid>
          </Box>
        </Box>
      </PersistentDrawer>
    </>
  )
}

export { ContactViewPage }
