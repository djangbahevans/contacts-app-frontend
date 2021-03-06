import { ArrowBack, CalendarToday, Email, Language, LocationOn, Note, Person, Phone, Save, Wc, Work } from "@mui/icons-material"
import { Alert, Avatar, Backdrop, CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useMemo, useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { ClearTextField, PersistentDrawer, PrimarySearchAppBar } from "../components"
import { createContact } from "../services/api"
import { contactDefaults, IContactCreate } from "../utils/sharedInterfaces"
import { randomMaterialColor } from "../utils/utilityFunctions"


const ContactCreatePage = () => {
  const [contact, setContact] = useState<IContactCreate>(contactDefaults)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<number | null>(null)
  const navigate = useNavigate()

  const mutation = useMutation(createContact, { onSuccess: (response) => { setId(response.id) } })

  const avatarColor = useMemo(() => randomMaterialColor(), []);

  const swapDrawerState = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const saveHandler = async () => {
    mutation.mutateAsync({
      given_name: contact.given_name || undefined,
      additional_name: contact.additional_name || undefined,
      family_name: contact.family_name || undefined,
      name_prefix: contact.name_prefix || undefined,
      name_suffix: contact.name_suffix || undefined,
      birthday: contact.birthday || undefined,
      gender: contact.gender || undefined,
      location: contact.location || undefined,
      occupation: contact.occupation || undefined,
      notes: contact.notes || undefined,
      photo: contact.photo || undefined,
      email: contact.email || undefined,
      phone1: contact.phone1 || undefined,
      phone2: contact.phone2 || undefined,
      organization: contact.organization || undefined,
      website: contact.website || undefined
    })
  }

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
            <Grid item alignSelf="flex-start" xs={1} sm={1}>
              <Tooltip title="Go back">
                <IconButton aria-label="back" onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={10} sm={3}>
              {(() => {
                const avatarSize = 150
                return <Avatar sx={{ width: avatarSize, height: avatarSize, fontSize: avatarSize - avatarSize / 3, margin: "auto", bgcolor: avatarColor }} />
              })()}
            </Grid>

            <Grid item alignSelf="flex-start" xs={1} sm={1}>
              <Tooltip title="Save contact">
                <IconButton aria-label="save contact" onClick={saveHandler}>
                  <Save />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ my: 3, padding: 2, border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: 2 }}>
          <Typography variant="h6">Contact details</Typography>
          <Box sx={{ my: 2, maxWidth: 500 }}>
            <Grid container>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Person color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.name_prefix} type="text" label="Name prefix" variant="standard" onChange={(e) => {
                      setContact({ ...contact, name_prefix: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, name_prefix: "" })} /></Grid>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.given_name} type="text" label="Given name" variant="standard" onChange={(e) => {
                      setContact({ ...contact, given_name: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, given_name: "" })} /></Grid>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.additional_name} type="text" label="Additional name" variant="standard" onChange={(e) => {
                      setContact({ ...contact, additional_name: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, additional_name: "" })} /></Grid>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.family_name} type="text" label="Family name" variant="standard" onChange={(e) => {
                      setContact({ ...contact, family_name: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, family_name: "" })} /></Grid>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.name_suffix} type="text" label="Name suffix" variant="standard" onChange={(e) => {
                      setContact({ ...contact, name_suffix: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, name_suffix: "" })} /></Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Phone color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.phone1} type="tel" label="Phone 1" variant="standard" onChange={(e) => {
                      setContact({ ...contact, phone1: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, phone1: "" })} /></Grid>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.phone2} type="tel" label="Phone 2" variant="standard" onChange={(e) => {
                      setContact({ ...contact, phone2: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, phone2: "" })} /></Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Wc color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="gender-select-label">Gender</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        value={contact.gender}
                        variant="standard"
                        fullWidth
                        onChange={e => {
                          const value = e.target.value
                          let gender: "male" | "female" | "" = ""
                          if (value === "male") gender = "male"
                          else if (value === "female") gender = "female"
                          setContact({ ...contact, gender: gender })
                        }}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Email color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.email} type="email" label="Email" variant="standard" onChange={(e) => {
                      setContact({ ...contact, email: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, email: "" })} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <LocationOn color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.location} type="text" label="Location" variant="standard" onChange={(e) => {
                      setContact({ ...contact, location: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, location: "" })} /></Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <CalendarToday color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.birthday} type="date" label="Birthday" variant="standard" onChange={(e) => {
                      setContact({ ...contact, birthday: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, birthday: "" })} /></Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Work color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.occupation} type="text" label="Occupation" variant="standard" onChange={(e) => {
                      setContact({ ...contact, occupation: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, occupation: "" })} /></Grid>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.organization} type="text" label="Organization" variant="standard" onChange={(e) => {
                      setContact({ ...contact, organization: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, organization: "" })} /></Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Language color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.website} type="url" label="Website" variant="standard" onChange={(e) => {
                      setContact({ ...contact, website: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, website: "" })} /></Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ my: 1 }}>
                <Grid item xs={2} sx={{ top: 2.6 * 8, position: "relative" }}>
                  <Note color="action" />
                </Grid>
                <Grid container item xs={10}>
                  <Grid item xs={12}>
                    <ClearTextField value={contact.notes} type="text" label="Notes" variant="standard" onChange={(e) => {
                      setContact({ ...contact, notes: e.target.value })
                    }} onClearClick={() => setContact({ ...contact, notes: "" })} /></Grid>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </Box>
      </PersistentDrawer>
      <Snackbar autoHideDuration={6000} open={mutation.isSuccess} onClose={() => { mutation.reset(); navigate(`/person/${id}`) }}>
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => { mutation.reset(); navigate(`/person/${id}`) }}>
          Contact created successfully
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={6000} open={mutation.isError} onClose={() => { mutation.reset() }}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => { mutation.reset() }}>
          Contact creation failed
        </Alert>
      </Snackbar>
    </>
  )
}

export { ContactCreatePage }
