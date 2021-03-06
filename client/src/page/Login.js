import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { login } from '../action/infoAction';
import Loading from '../component/CustomLoadingOverlay';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import BgImage from '../public/image/bg_login.jpg';
import logo from '../public/image/Party_logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        height: '56px',
        borderRadius: '28px',
        margin: theme.spacing(3, 0, 2),
    },
    contentWrapper: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textTransform: 'uppercase',
    },
    content: {
        fontWeight: '600',
        letterSpacing: '6px',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        marginTop: '40px',
    },
    logoWrapper: {
        width: '300px',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        margin: '0 auto',
    },
    logo: {
        width: '100%',
    }
}));

const CssTextField = withStyles(theme => ({
    root: {
        // '& label.Mui-focused': {
        //     color: theme.palette.primary.main,
        // },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.main,
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(18px, -6px) scale(0.75)'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '28px',
            },
            '& input': {
                paddingLeft: '20px'
            },
            // '&:hover fieldset': {
            //     borderColor: theme.palette.primary.main,
            // },
            // '&.Mui-focused fieldset': {
            //     borderColor: theme.palette.primary.main,
            // },
        },
    },
}))(TextField);

const Login = () => {
    const classes = useStyles();
    const { info, infoDispatch } = useContext(InfoContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext);
    const { loadingDispatch } = useContext(LoadingContext);
    const history = useHistory()

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const onLogin = (data) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        login(infoDispatch, data)
    }

    useEffect(() => {
        if (info.isAuthenticated) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "????ng nh???p th??nh c??ng!",
                    type: "success"
                }
            })
            history.push('/myfile')
        } else {
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
    }, [info])

    useEffect(() => {
        if (info.error == "email") {
            setError("email", {
                type: 'manual',
                message: info.message
            })
        }
        if (info.error == "password") {
            setError("password", {
                type: 'manual',
                message: info.message
            })
        }
    }, [info])

    useEffect(() => {
        if (info.loading) {
            clearErrors("email");
            clearErrors("password");
        }
    }, [info.loading])

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image}>
                    <div className={classes.contentWrapper}>
                        <div className={classes.logoWrapper}>
                            <img className={classes.logo} src={logo} alt="party-logo" />
                        </div>
                        <Typography className={classes.content} variant="h4">
                            Qu???n l?? h??? s?? ?????ng vi??n
                        </Typography>
                        <Typography variant='h5' sx={{ textAlign: 'center', letterSpacing: '2px' }}>Khoa CNTT&TT</Typography>
                        <Typography variant='h5' sx={{ textAlign: 'center', letterSpacing: '2px' }}>?????i h???c C???n Th??</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ????ng nh???p
                        </Typography>

                        <form className={classes.form} noValidate>
                            <CssTextField
                                {...register("email", {
                                    required: "Vui l??ng nh???p email",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Email kh??ng h???p l???!'
                                    }
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                            <CssTextField
                                {...register("password", {
                                    required: "Vui l??ng nh???p m???t kh???u!",
                                })}
                                autoComplete="current-password"
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="M???t kh???u"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit(onLogin)}
                            >
                                ????ng nh???p
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="#" variant="body2">
                                    Qu??n m???t kh???u?
                                </Link> */}
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
            <Loading />
        </>
    );
}

export default Login;