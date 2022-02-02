import { ArrowBack, CalendarToday, Delete, Edit, Email, Language, LocationOn, Man, Note, Phone, Woman, Work } from "@mui/icons-material"
import { Alert, Avatar, Backdrop, CircularProgress, Divider, Grid, IconButton, Link, Snackbar, Theme, Tooltip, Typography } from "@mui/material"
import { Box, SxProps } from "@mui/system"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { PersistentDrawer, PrimarySearchAppBar } from "../components"
import { deleteContact, getContactsById } from "../services/api"
import { IContact } from "../utils/sharedInterfaces"
import { randomMaterialColor } from "../utils/utilityFunctions"


const ContactViewPage = () => {
  const { id } = useParams()
  const [contact, setContact] = useState<IContact>()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const avatarColor = useMemo(() => randomMaterialColor(), [])

  const name = `${contact?.name_prefix || ""} ${contact?.given_name || ""} ${contact?.additional_name || ""} ${contact?.family_name || ""} ${contact?.name_suffix || ""}`
    .replace(/\s+/g, " ").trim()

  useQuery(['contactById', id], () => getContactsById(parseInt(id!)), {
    onSuccess: (data) => {
      setContact(data)
    }
  })

  const mutation = useMutation(deleteContact)

  const swapDrawerState = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const deleteHandler = () => { mutation.mutateAsync(parseInt(id!)) }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={mutation.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <PrimarySearchAppBar handleMenuClick={swapDrawerState} open={open} />
      <PersistentDrawer handleDrawerClose={handleDrawerClose} open={open}>
        <Box sx={{ my: 3 }}>
          <Grid container alignItems="center">
            <Grid item alignSelf="flex-start" xs={1} sm={1} order={{ xs: 1, sm: 1 }}>
              <Tooltip title="Go back">
                <IconButton aria-label="back" onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={9} sm={9} md={2} order={{ xs: 2, sm: 2 }}>
              {(() => {
                const avatarSize = 150
                const sx = { width: avatarSize, height: avatarSize, fontSize: avatarSize - avatarSize / 3, margin: "auto", bgcolor: avatarColor }
                if (contact?.photo)
                  return <Avatar alt={name} src={contact?.photo} />
                return <Avatar sx={sx}>{name[0]}</Avatar>
              })()}
            </Grid>

            <Grid container item xs={12} sm={12} md={3} spacing={1} order={{ xs: 5, sm: 5, md: 3 }}>
              <Grid item xs={12}><Typography variant="h5" textAlign="center">{name}</Typography></Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>{
                (() => {
                  const sx: SxProps<Theme> = { textAlign: "center" }
                  if (!contact?.gender)
                    return
                  return contact?.gender === "male" ? <Man color="action" fontSize="large" sx={sx} /> : <Woman color="action" fontSize="large" sx={sx} />
                })()
              }</Grid>
            </Grid>

            <Grid item alignSelf="flex-start" xs={1} sm={1} order={{ xs: 3, sm: 3, md: 4 }}>
              <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={() => navigate(`/edit/${id}`)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item alignSelf="flex-start" xs={1} sm={1} order={{ xs: 4, sm: 4, md: 5 }}>
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
      <Snackbar autoHideDuration={6000} open={mutation.isSuccess} onClose={() => { mutation.reset(); navigate(-1) }}>
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => { mutation.reset(); navigate(-1) }}>
          Contact deleted
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={6000} open={mutation.isError} onClose={() => { mutation.reset() }}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => { mutation.reset() }}>
          Contact deletion failed
        </Alert>
      </Snackbar>
    </>
  )
}

export { ContactViewPage }
