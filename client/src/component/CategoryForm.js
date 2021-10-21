import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle, MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory, getfLanguageId, updateCategory } from '../action/categoryAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import InputGrid from './InputGrid';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
}))

const CategoryForm = (props) => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { dataArr, flanguage, languageSelect, categoryName, categoryField, edit, keyField } = props
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        unregister,
        control,
        setValue,
        register,
        formState: { errors },
        reset,
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = (data) => {
        Object.keys(data).forEach(key => (data[key] == undefined || data[key] == '0') && delete data[key])
        if (edit) {
            updateCategory(categoryDispatch, { categoryField, id: dataArr[`${keyField[0]}`], data })
        } else {
            createCategory(categoryDispatch, { categoryField, data })
        }
        Object.keys(data).forEach(key => key == "MaNgoaiNgu" ? setValue(key, '0') : setValue(key, undefined))
        handleClose();
    }

    useEffect(() => {
        if (edit) {
            Object.keys(dataArr).forEach(key => setValue(key, dataArr[key]));
            // setValue(`${keyField[0]}`, id);
            // setValue(`${keyField[1]}`, name);
        }
        const getId = async () => {
            const res = await getfLanguageId({ name: flanguage })
            if (res.data.length > 0) {
                setValue("MaNgoaiNgu", res.data[0].MaNgoaiNgu)
            }
        }
        if (categoryField == "flanguagelevel")
            getId()
    }, [])

    return (
        <>
            {edit ?
                (
                    <MyButton onClick={handleOpen} style={{ marginRight: '8px' }} info={true} small><EditIcon />Sửa</MyButton>
                ) :
                (
                    <MyButton onClick={handleOpen} success={true} ><AddIcon />Thêm</MyButton>
                )
            }
            <Dialog PaperProps={{ style: { minWidth: '300px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{`Cập nhật ${categoryName}`}</DialogTitle>
                <DialogContent>
                    {edit &&
                        <InputGrid
                            disabled
                            nameTitle={`Mã ${categoryName}`}
                            name={keyField[0]}
                            control={control}
                            errors={errors}
                        />
                    }
                    <InputGrid
                        nameTitle={`Tên ${categoryName}`}
                        name={keyField[1]}
                        control={control}
                        rules={{ required: "Vui lòng nhập trường này!" }}
                        errors={errors}
                    />
                    {categoryField == "flanguagelevel" &&
                        <InputGrid
                            select
                            nameTitle={"Tên Ngoại Ngữ"}
                            name={"MaNgoaiNgu"}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui lòng nhập trường này!"
                            }}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
                            {languageSelect.map(
                                l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
                            )}
                        </InputGrid>
                    }
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

export default CategoryForm;