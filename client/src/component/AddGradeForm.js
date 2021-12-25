import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { nanoid } from 'nanoid';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { actionGrade } from '../action/categoryAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import InputGrid from './InputGrid';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    inputWrapper: {
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: theme.palette.common.white,
        cursor: 'pointer'
    }
}))

const AddGradeForm = (props) => {
    const classes = useStyles();
    const { edit, year } = props
    const [open, setOpen] = useState(false)
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const [valueArray, setValueArray] = useState([])
    const [update, setUpdate] = useState([])
    const [add, setAdd] = useState(edit ? [] : [{ name: "", value: "", id: "" }])
    const [remove, setRemove] = useState([])

    const getData = () => {
        category.categories.grade.map(c => {
            if (c.Nam == year)
                if (c.Data.length > 0) {
                    let arr = [];
                    c.Data.forEach((data, index) => {
                        setValue("Nam", year)
                        setValue(`Loai${index + 1}`, data.TenLoai);
                        arr.push({ name: `Loai${index + 1}`, value: data.TenLoai, id: data.MaLoai });
                    })
                    setValueArray(arr);
                }
        })
    }

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        getValues,
        reset,
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleChangeInput = (e, id) => {
        setValue(e.target.name, e.target.value);
        let index = -1;
        update.forEach((el, i) => index = el["MaLoai"] == id ? i : -1)
        if (index != -1) {
            let UpdateEl = [...update];
            UpdateEl[index] = { MaLoai: id, TenLoai: e.target.value }
            setUpdate(UpdateEl)
        } else
            setUpdate([...update, { MaLoai: id, TenLoai: e.target.value }])
    }
    const handleChangeAddInput = (e, index) => {
        const { name, value } = e.target
        setValue(name, value);
        const list = [...add];
        list[index].name = name;
        list[index].value = value;
        setAdd(list);
    }
    const handleAddInput = () => {
        setAdd([...add, { name: "", value: "" }])
    }
    const handleRemoveInput = (id, index) => {
        let newData = [...valueArray];
        setValue(`Loai${index + 1}`, '');
        newData.splice(index, 1);
        setValueArray(newData);

        remove.includes(id) || setRemove([...remove, id])
    }
    const handleRemoveAddInput = (index) => {
        let list = [...add];
        setAdd(list[index], "")
        list.splice(index, 1);
        setAdd(list);
    }
    const onSubmit = () => {
        let year = getValues("Nam");
        let addArr = [];
        add.forEach(el => addArr.push(el["value"]));
        actionGrade(categoryDispatch, { add: addArr, update, remove, year }, openSnackbarDispatch);
        reset();
        handleClose();
    }

    useEffect(() => {
        if (category.categories.grade.length > 0 && edit)
            getData();
    }, [])

    useEffect(() => {
        add.forEach(a => setValue(a.name, a.value))
    }, [add])

    useEffect(() => {
        valueArray.forEach(d => setValue(d.name, d.value))
    }, [valueArray])

    return (
        <>
            {edit ?
                (
                    <MyButton onClick={handleOpen} style={{ marginRight: '8px' }} info small><EditIcon />Sửa</MyButton>
                ) :
                (
                    <MyButton onClick={handleOpen} success ><AddIcon />Thêm</MyButton>
                )
            }
            <Dialog PaperProps={{ style: { minWidth: '600px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{`Cập nhật loại Đảng viên`}</DialogTitle>
                <DialogContent>
                    <InputGrid
                        onChange={(e) => setValue('Nam', e.target.value)}
                        disabled={edit}
                        nameTitle={`Năm`}
                        name={"Nam"}
                        defaultValue={""}
                        control={control}
                        rules={{ required: "Vui lòng nhập trường này!" }}
                        errors={errors}
                    />
                    {valueArray.length > 0 &&
                        valueArray.map((c, index) => {
                            return (
                                <div key={c.id} className={classes.inputWrapper}>
                                    <InputGrid
                                        id={c.id}
                                        onChange={(e) => handleChangeInput(e, c.id)}
                                        nameTitle={`Tên loại`}
                                        name={c.name}
                                        defaultValue={""}
                                        control={control}
                                        rules={{ required: "Vui lòng nhập trường này!" }}
                                        errors={errors}
                                    />
                                    <CloseIcon id="close-icon"
                                        className={classes.closeIcon}
                                        onClick={() => handleRemoveInput(c.id, index)}
                                    />
                                </div>
                            )
                        })
                    }
                    {add.length > 0 &&
                        add.map((input, index) => {
                            let id = nanoid()
                            let inputName = input.name || `LoaiThem${id}`;
                            return (
                                <div className={classes.inputWrapper}>
                                    <InputGrid
                                        onChange={(e) => handleChangeAddInput(e, index)}
                                        nameTitle={"Tên loại"}
                                        name={inputName}
                                        defaultValue={""}
                                        control={control}
                                        rules={{ required: "Vui lòng nhập trường này!" }}
                                        errors={errors}
                                    />
                                    <CloseIcon id="chandleRemoveAddInputlose-icon"
                                        className={classes.closeIcon}
                                        onClick={() => handleRemoveAddInput(index)}
                                    />
                                </div>
                            )
                        })}
                    <Button style={{ marginTop: '18px' }} id="add-btn" onClick={handleAddInput} variant="outlined" fullWidth><AddIcon /></Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} info>
                        Lưu
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddGradeForm;