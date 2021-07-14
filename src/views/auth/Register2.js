//init code
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

//material-ui components
import { Box, Button, Container, Grid, Paper, TextField, Typography, InputAdornment, Select, MenuItem, FormHelperText, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons import
import PersonIcon from '@material-ui/icons/Person';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockIcon from '@material-ui/icons/Lock';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';
import LocationCityIcon from '@material-ui/icons/LocationCity';

//image import
import Img from './../../assets/img/theme/signup-image.jpg';

//date
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//api call 
import axios from 'axios';

//makestyle use 
const useStyle = makeStyles((theme) => ({
    color: {
        color: theme.palette.grey[500]
    }
}))

//code of login from
function Register() {

    //css classes use 
    const classes = useStyle();

    //redirect the login page 
    const history = useHistory();

    //validation
    const { register, handleSubmit, errors, control, getValues, reset } = useForm();

    //unique email and user
    const [email_msg, setEmail_msg] = useState("");
    const [user_msg, setUser_msg] = useState("");

    //state and city
    const [STate, setSTate] = useState([]);
    const [city, setCity] = useState([]);

    const [stateid1,setStateID1] = useState([]);

    //use Effect
    useEffect(() => {
        async function fechData() {
            const requuest = await axios.get("http://localhost:8000/state");
            setSTate(requuest.data.result);
            return requuest;
        }
        fechData();
    }, [])

    //onsubmit validation chacked and insert data in mongooseDB
    const onSubmit = (data) => {

        //register data use of axios
        axios.post("http://localhost:8000/register", data)
            .then(response => {
                console.log(response);
                history.push('./login');
                console.log("Registration Successful");
            })
            .catch(err => {
                console.log(`Error : ${err}`);
            })
    }

    //main code
    return (<>
        <Container>
            <Grid container justify="space-evenly" alignItems="center">
                <Grid item lg={9} sm={10}>
                    <Paper style={{ borderRadius: "2rem" }} elevation={12} mb="10rem" component={Box} mt="4rem" p={4}>
                        <Grid container spacing={2} alignItems="center" justify="center">
                            <Grid item lg={7} sm={10} >
                                <Box component="form" maxWidth="100%" maxHeight="100%" pl={3} pr={3} onSubmit={handleSubmit(onSubmit)}>
                                    <Box pt={1} pb={1}>
                                        <Typography align="left" variant="h4" style={{ fontWeight: 750, }} >Sing up</Typography>
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item lg={6} sm={12} xs={12}>
                                            {/* firstname filed */}
                                            <TextField
                                                fullWidth={true}

                                                margin="normal"
                                                variant="standard"
                                                error={Boolean(errors.fname)}
                                                placeholder="Firstname*"
                                                inputRef={register({
                                                    required: "This field is required"
                                                })}
                                                name="fname"
                                                helperText={errors.fname?.message}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountBoxIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item lg={6} sm={12} xs={12}>
                                            {/* Lastname filed */}
                                            <TextField
                                                fullWidth={true}
                                                margin="normal"
                                                variant="standard"
                                                error={Boolean(errors.lname)}
                                                placeholder="Lastname"
                                                inputRef={register({
                                                    required: "This field is required"
                                                })}
                                                name="lname"
                                                helperText={errors.lname?.message}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountBoxIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* username filed */}
                                    <TextField
                                        fullWidth={true}
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(errors.user)}
                                        onBlur={(e) => {
                                            let em = e.target.value
                                            if (em == "") {
                                                setUser_msg("")
                                            } else {
                                                axios.get(`http://localhost:8000/user/${em}`)
                                                    .then(response => {
                                                        setUser_msg("")
                                                    })
                                                    .catch(err => {
                                                        setUser_msg("Email is alreday register")
                                                    }
                                                    )
                                            }

                                        }
                                        }

                                        placeholder="Username"
                                        inputRef={register({
                                            required: "This field is required"
                                        })}
                                        name="user"
                                        helperText={errors.user?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red' }}>{user_msg}</FormHelperText>


                                    {/* email filed */}
                                    <TextField
                                        type="type"
                                        fullWidth={true}
                                        margin="normal"
                                        variant="standard"
                                        onBlur={(e) => {
                                            let em = e.target.value
                                            if (em == "") {
                                                setEmail_msg()
                                            } else {
                                                axios.get(`http://localhost:8000/email/${em}`)
                                                    .then(response => {
                                                        setEmail_msg("")
                                                    })
                                                    .catch(err => {
                                                        setEmail_msg("Email is alreday register")
                                                    })
                                            }
                                        }
                                        }
                                        error={Boolean(errors.email)}
                                        placeholder="Email"
                                        inputRef={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: "please enter a valid e-mail address"
                                            }
                                        })}
                                        name="email"
                                        helperText={errors.email?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red' }}>{email_msg}</FormHelperText>

                                    {/* phone filed */}
                                    <TextField
                                        fullWidth={true}
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(errors.phone)}
                                        placeholder="Phone"
                                        inputRef={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: "please enter a valid 10-digit phone number"
                                            }
                                        })}
                                        name="phone"
                                        helperText={errors.phone?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CallIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    {/* date of birth */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        {/* 5) Date Picker */}
                                        <Controller
                                            render={(props) => (
                                                <KeyboardDatePicker
                                                    minDate="01/12/2000"
                                                    maxDate="01/01/1975"
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    label="Date of Admission"
                                                    value={props.value}
                                                    onChange={props.onChange}
                                                    fullWidth
                                                    error={Boolean(errors.dob)}
                                                    helperText={errors.dob?.message}
                                                />
                                            )}
                                            rules={{
                                                required: "Enter Date of Admission"
                                            }}
                                            name="dob"
                                            defaultValue="01/12/1999"
                                            control={control}
                                        />
                                    </MuiPickersUtilsProvider>

                                    {/* Gender filed */}
                                    <FormControl className={classes.color} margin="normal" error={Boolean(errors.gender)}>
                                        <FormLabel className={classes.color}>
                                            {/* <WcIcon 
                                                style={{
                                                    color: 'black',
                                                    paddingRight: '10px',
                                                    paddingTop : '5px' 
                                                }}    
                                            /> */}
                                            Gender
                                        </FormLabel>
                                        <RadioGroup row name="gender">
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio color="primary" inputRef={register({
                                                    required: "This field is required"
                                                })} />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio color="primary" inputRef={register({
                                                    required: "This field is required"
                                                })} />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio color="primary" inputRef={register({
                                                    required: "This field is required"
                                                })} />}
                                                label="Other"
                                            />
                                        </RadioGroup>
                                        <FormHelperText>{errors.gender?.message}</FormHelperText>
                                    </FormControl>

                                    {/* state and city */}
                                    <Grid container spacing={2}>
                                        <Grid item lg={6} sm={12} xs={12}>

                                            {/* State Flied */}
                                            <FormControl margin="normal" fullWidth error={Boolean(errors.states)}>
                                                <Controller
                                                    render={(props) => (
                                                        <Select displayEmpty value={props.value} className={classes.color} onChange={props.onChange}
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <RoomIcon style={{ color: 'black' }} />
                                                                </InputAdornment>
                                                            }
                                                            onBlur={(e) => {
                                                                console.log(e);
                                                                let statename = e.target.value
                                                                async function fechState(){
                                                                    const stateid = await axios.get(`http://localhost:8000/state/${statename}`);                           
                                                                    setStateID1(stateid.data.result)
                                                                    fechCity()
                                                                }
                                                                stateid1.map(items => {
                                                                    let stateid = items.stateid
                                                                    async function fechCity() {
                                                                    const re = await axios.get(`http://localhost:8000/city/${stateid}`);
                                                                    setCity(re.data.result)
                                                                }
                                                                })
                                                                
                                                                fechState()
                                                            }
                                                            }
                                                        >
                                                            <MenuItem value="">State</MenuItem>
                                                            {STate.map(post => (
                                                                <MenuItem key={post.stateid} value={post.lable}>{post.lable}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                    rules={{
                                                        required: "This field is required"
                                                    }}
                                                    name="states"
                                                    control={control}
                                                    defaultValue=""
                                                />
                                                <FormHelperText>{errors.states?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} sm={12} xs={12}>

                                            {/* City Filed */}
                                            <FormControl className={classes.color} margin="normal" fullWidth error={Boolean(errors.city)}>
                                                <Controller
                                                    render={(props) => (
                                                        <Select value={props.value} displayEmpty onChange={props.onChange}
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <LocationCityIcon style={{ color: 'black' }} />
                                                                </InputAdornment>
                                                            }
                                                            className={classes.color}
                                                        >
                                                            <MenuItem value="">City</MenuItem>
                                                            {city.map(post => (
                                                                <MenuItem key={post.cityid} value={post.label} name={post.label}>{post.lable}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                    rules={{
                                                        required: "This field is required"
                                                    }}
                                                    name="city"
                                                    control={control}
                                                    defaultValue=""
                                                />
                                                <FormHelperText>{errors.city?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    {/* Password filed */}
                                    <TextField
                                        autoComplete="true"
                                        type="password"
                                        margin="normal"
                                        fullWidth={true}
                                        placeholder="Password"
                                        inputRef={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                                message: "Password (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)"
                                            }
                                        })}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password?.message}
                                        name="password"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                    {/* Repeat Password filed */}
                                    <TextField
                                        autoComplete="true"
                                        type="password"
                                        margin="normal"
                                        fullWidth={true}
                                        placeholder="Repeat password"
                                        inputRef={register({
                                            validate: value => value === getValues("password") || "Password  doesn't match"
                                        })}
                                        error={Boolean(errors.repassword)}
                                        helperText={errors.repassword?.message}
                                        name="repassword"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                    {/* Terms and conditions filed */}
                                    <FormControl className={classes.color} error={Boolean(errors.tnc)}>
                                        <FormControlLabel
                                            style={{ display: "block", marginBottom: 15 }}
                                            control={<Checkbox name="tnc"
                                                color="primary"
                                                inputRef={register({
                                                    required: "Please aggree our terms and conditions"
                                                })}
                                            />}
                                            label="I aggree all terms and conditions"
                                        /><FormHelperText style={{ marginTop: '-1rem' }}>{errors.tnc?.message}</FormHelperText>
                                    </FormControl>

                                    {/* Button */}
                                    <Box pt={2}>
                                        <Button color="primary" size="large" variant="contained" type="Submit">Submit</Button>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* image display */}
                            <Grid item lg={5} sm={10}>
                                <Box textAlign="center" pt={6} pd={6} maxWidth="100%" maxHeight="100%">
                                    <img src={Img} width="80%" height="80%" alt="image" />
                                    <Typography component={Box} pt={4}>
                                        <a style={{ color: '#000' }} href="/login">
                                            I am already  member
                                            </a>
                                    </Typography>
                                </Box>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>)
}
export default Register;