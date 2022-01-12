import { ArrowBack, CalendarToday, Email, Language, LocationOn, Note, Person, Phone, Save, Wc, Work } from "@mui/icons-material"
import { Avatar, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClearTextField, PersistentDrawer, PrimarySearchAppBar } from "../components"
import { IContactCreate } from "../utils/sharedInterfaces"
import { randomMaterialColor } from "../utils/utilityFunctions"

const ContactEditPage = () => {
  const contactDefaults: IContactCreate = {
    given_name: "",
    additional_name: "",
    family_name: "",
    name_prefix: "",
    name_suffix: "",
    birthday: "",
    gender: "",
    location: "",
    occupation: "",
    notes: "",
    photo: "",
    email: "",
    phone1: "",
    phone2: "",
    organization: "",
    website: "",
  }

  const { id } = useParams()
  const [contact, setContact] = useState<IContactCreate>(contactDefaults)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const avatarColor = useMemo(() => randomMaterialColor(), []);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
        method: "get",
        mode: "cors",
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
        setContact(c => ({ ...c, ...data }))
      }
      else alert("Could not fetch the data")
    })()
  }, [token, id])

  const swapDrawerState = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const saveHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
        method: "put",
        mode: "cors",
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
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
          website: contact.website || undefined,
        })
      })
      const data = await response.json()
      if (response.status === 200)
        navigate(`/person/${data.id}`)
      else
        // TODO: Add visible error to screen
        alert(data.detail)
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <>
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
                  <Grid item xs={12} sx={{ my: 0 }}>
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
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>

                      <InputLabel id="gender-select-label">Gender</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        value={contact.gender}
                        variant="standard"
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
    </>
  )
}

export { ContactEditPage }

