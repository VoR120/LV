import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { MenuItem, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { getAllCategory, getLanguage } from '../action/categoryAction';
import DeleteFormCategory from '../component/DeleteFormCategory';
import Layout from '../component/Layout';
import MySelect from '../component/UI/MySelect';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { downloadExcel, getKeyField } from '../utils/utils';
import CategoryForm from '../component/CategoryForm';
import GradeForm from '../component/GradeForm';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        marginBottom: '16px',
    },
    inputSelect: {
        marginRight: '20px',
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
    },
}))

const Category = () => {
    const classes = useStyles();

    const [categoryField, setCategoryField] = useState("ethnic");
    const [categoryName, setCategoryName] = useState("Dân tộc");
    const [languageSelect, setLanguageSelect] = useState([]);
    const [key, setKey] = useState([]);
    const [columnName, setColumnName] = useState([]);

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const { category, categoryDispatch } = useContext(CategoryContext);

    const getFieldName = (value) => {
        const name = document.querySelector(`li[data-value=${value}]`)
        return name.innerText;
    }

    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
        setCategoryName(getFieldName(e.target.value));
    }

    const getFLArray = async () => {
        const res = await getLanguage();
        if (res.data.length > 0)
            setLanguageSelect(res.data);
    }

    useEffect(() => {
        let newColumn = columnName.map((col, index) => {
            return ({
                title: col,
                field: `${key[index]}`,
            })
        })
        newColumn.push({
            title: "Chức năng",
            field: "action",
            render: (params) => {
                const dataArr = { ...params }
                Object.keys(dataArr).filter(key => (key == "SoDangVien" || key == "tableData") && delete dataArr[key])
                return (
                    <>
                        {categoryField == "grade" ?
                            (
                                <GradeForm
                                    edit
                                    year={params["Nam"]}
                                />
                            ) :
                            (
                                <>
                                    <CategoryForm
                                        edit
                                        categoryName={categoryName}
                                        dataArr={dataArr}
                                        flanguage={categoryField == 'flanguagelevel' ? params[`${key[2]}`] : null}
                                        languageSelect={languageSelect}
                                        categoryField={categoryField}
                                        keyField={key}
                                    />
                                    <DeleteFormCategory
                                        title={categoryName}
                                        dataArr={dataArr}
                                        categoryField={categoryField}
                                    />
                                </>
                            )
                        }
                    </>
                )
            }
        })
        setColumns(newColumn);
    }, [key])

    useEffect(() => {
        if (category.categoryNames[categoryField].length > 0) {
            setColumnName(category.categoryNames[categoryField])
            if (category.categories[categoryField].length > 0) {
                let arr = []
                if (categoryField == "grade") {
                    category.categories[categoryField].forEach(c => {
                        let obj = {};
                        obj.Nam = c.Nam
                        c.Data.forEach((d, index) => {
                            obj[`Loai${index + 1}`] = d.TenLoai;
                        })
                        arr.push(obj);
                    })
                    setRows(arr);
                } else
                    setRows(category.categories[categoryField])
            }
            else
                setRows([]);
            setKey(getKeyField(categoryField))
        }
    }, [category])

    useEffect(() => {
        if (categoryField == 'flanguagelevel') {
            getFLArray();
        }
        getAllCategory(categoryDispatch, categoryField);
    }, [categoryField])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Danh mục
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography className={classes.inputSelect}>Danh mục</Typography>
                    <MySelect
                        onChange={handleChangeField}
                        value={categoryField}
                        autowidth
                    >
                        <MenuItem value="ethnic">Dân tộc</MenuItem>
                        <MenuItem value="religion">Tôn giáo</MenuItem>
                        <MenuItem value="position">Chức vụ</MenuItem>
                        <MenuItem value="flanguage">Ngoại ngữ</MenuItem>
                        <MenuItem value="flanguagelevel">Trình độ ngoại ngữ</MenuItem>
                        <MenuItem value="it">Trình độ tin học</MenuItem>
                        <MenuItem value="politics">Trình độ chính trị</MenuItem>
                        <MenuItem value="grade">Loại Đảng viên</MenuItem>
                    </MySelect>
                </Paper>

                {/* Add form Category */}
                {categoryField == "grade" ? (
                    <GradeForm />
                ) :
                    (
                        <CategoryForm
                            categoryName={categoryName}
                            languageSelect={languageSelect}
                            categoryField={categoryField}
                            keyField={key}
                        />
                    )
                }

                <TableContainer style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) => <Paper
                                {...props}
                                className={classes.table}
                                variant="outlined"
                            />
                        }}
                        title={categoryName}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        actions={[
                            {
                                icon: () => <DownloadIcon />,
                                tooltip: "Export to excel",
                                onClick: () => downloadExcel(),
                                isFreeAction: true
                            }
                        ]}
                        isLoading={category.loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Category;