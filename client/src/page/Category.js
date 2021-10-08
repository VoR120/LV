// import { MenuItem, Paper, Typography } from '@mui/material';
// import makeStyles from '@mui/styles/makeStyles';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { AgGridReact, AgGridColumn } from 'ag-grid-react';
// import React, { useEffect, useState } from 'react';
// import { getAllCategory } from '../action/categoryAction';
// import AddFormCategory from '../component/AddFormCategory';
// import CustomLoadingOverlay from '../component/CustomLoadingOverlay';
// import DeleteFormCategory from '../component/DeleteFormCategory';
// import EditFormCategory from '../component/EditFormCategory';
// import InputGrid from '../component/InputGrid';
// import Layout from '../component/Layout';
// import MySelect from '../component/UI/MySelect';
// import '../public/css/Table.scss'

// const useStyles = makeStyles(theme => ({
//     header: {
//         marginBottom: '40px'
//     },
//     headerContent: {
//         textTransform: 'uppercase',
//         fontWeight: '600',
//     },
//     table: {
//         height: '450px',
//         width: 'auto',
//         backgroundColor: 'white',
//         marginTop: '20px',
//     },
//     editBtn: {
//         color: theme.palette.common.white,
//         backgroundColor: theme.palette.info.main,
//         margin: '0 4px',
//         '&:hover': {
//             backgroundColor: theme.palette.info.dark
//         },
//     },
//     deleteBtn: {
//         color: theme.palette.common.white,
//         backgroundColor: theme.palette.error.main,
//         margin: '0 4px',
//         '&:hover': {
//             backgroundColor: theme.palette.error.dark
//         },
//     },
//     paper: {
//         display: 'flex',
//         alignItems: 'center',
//         padding: '16px',
//         marginBottom: '16px',
//     },
//     inputSelect: {
//         marginRight: '20px',
//     }
// }))

// const Category = () => {
//     const classes = useStyles();
//     const [value, setValue] = useState([]);

//     const [gridApi, setGridApi] = useState(null);
//     const [rowData, setRowData] = useState(value);

//     const [categoryField, setCategoryField] = useState("ethnic");
//     const [categoryName, setCategoryName] = useState("Dân tộc");
//     const [key, setKey] = useState([]);
//     const [columnName, setColumnName] = useState([]);
//     const [languageSelect, setLanguageSelect] = useState([]);
//     const [languageSelected, setLanguageSelected] = useState("0");
//     const [headerName, setHeaderName] = useState([`Mã ${categoryName}`, `Tên ${categoryName}`])

//     const getFieldName = (value) => {
//         const name = document.querySelector(`li[data-value=${value}]`)
//         return name.innerText;
//     }

//     const handleChangeField = (e) => {
//         setCategoryField(e.target.value);
//         setCategoryName(getFieldName(e.target.value));
//     }

//     const handleChangeSelect = (e) => {
//         setLanguageSelected(e.target.value);
//     }

//     const [columnDefs, setColumnDefs] = useState([
//         { headerName: "Mã Dân tộc", field: "MaDanToc" },
//         { headerName: "Tên Dân tộc", field: "TenDanToc" },
//         { headerName: "Số Đảng viên", field: "SoDangVien" },
//         {
//             headerName: "Chức năng", field: "MaDanToc", sortable: false, width: 200,
//             cellRendererFramework: (params) => {
//                 const paramsArray = Object.values(params.data)
//                 console.log(paramsArray);
//                 return (
//                     <>
//                         <EditFormCategory
//                             header={`Cập nhật ${categoryName}`}
//                         >
//                             <InputGrid nameTitle={`$headerName`} value={paramsArray[0]} />
//                             <InputGrid nameTitle={`Tên ${categoryName}`} value={paramsArray[1]} />
//                             {categoryField == "flanguagelevel" &&
//                                 <InputGrid
//                                     select={true}
//                                     nameTitle={`Tên Ngoại ngữ`}
//                                     value={languageSelected}
//                                     onChange={handleChangeSelect}
//                                 >
//                                     <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
//                                     {languageSelect.map(
//                                         l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
//                                     )}
//                                 </InputGrid>
//                             }
//                         </EditFormCategory>
//                         <DeleteFormCategory />
//                     </>
//                 )
//             }
//         },
//     ])

//     // useEffect(() => {
//     //     setColumnDefs([
//     //         { headerName: "Mã Dân tộc", field: "MaDanToc" },
//     //         { headerName: "Tên Dân tộc", field: "TenDanToc" },
//     //         { headerName: "Số Đảng viên", field: "SoDangVien" },
//     //         {
//     //             headerName: "Chức năng", field: "action", sortable: false, width: 200,
//     //             cellRendererFramework: (params) => {
//     //                 const paramsArray = Object.values(params.data)
//     //                 console.log(paramsArray);
//     //                 return (
//     //                     <>
//     //                         <EditFormCategory
//     //                             header={`Cập nhật ${categoryName}`}
//     //                         >
//     //                             <InputGrid nameTitle={`Mã ${categoryName}`} value={paramsArray[0]} />
//     //                             <InputGrid nameTitle={`Tên ${categoryName}`} value={paramsArray[1]} />
//     //                             {categoryField == "flanguagelevel" &&
//     //                                 <InputGrid
//     //                                     select={true}
//     //                                     nameTitle={`Tên Ngoại ngữ`}
//     //                                     value={languageSelected == 0 ? paramsArray[3] : languageSelected}
//     //                                     onChange={handleChangeSelect}
//     //                                 >
//     //                                     <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
//     //                                     {languageSelect.map(
//     //                                         l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
//     //                                     )}
//     //                                 </InputGrid>
//     //                             }
//     //                         </EditFormCategory>
//     //                         <DeleteFormCategory />
//     //                     </>
//     //                 )
//     //             }
//     //         },
//     //     ])
//     // }, [categoryField])

//     const gridOptions = {
//         defaultColDef: {
//             resizable: true,
//             sortable: true,
//         },
//         pagination: true,
//         paginationPageSize: "10",
//     }

//     const onGridReady = (params) => {
//         setGridApi(params);
//     }



//     useEffect(() => {
//         const fetchAPI = async () => {
//             const res = await getAllCategory(categoryField);
//             setValue(res.data);
//             // res.columnName.push("Chức năng")
//             // setColumnName(res.columnName)
//         }
//         const getLanguage = async () => {
//             const res = await getAllCategory("flanguage");
//             setLanguageSelect(res.data);
//         }
//         fetchAPI();
//         getLanguage();
//     }, [])

//     useEffect(() => {
//         setRowData(value)
//         if (value.length > 0) {
//             let keys = Object.keys(value[0])
//             setKey(keys)
//         }
//     }, [value])

//     useEffect(() => {
//         const fetchAPI = async () => {
//             const res = await getAllCategory(categoryField);
//             console.log(res.data);
//             setValue(res.data);
//             res.columnName.push("Chức năng")
//             setColumnName(res.columnName)
//         }
//         fetchAPI();
//     }, [categoryField])

//     useEffect(() => {
//         if (gridApi)
//             setHeaderNames();
//         console.log(categoryField, categoryName);
//     }, [columnName])

//     return (
//         <>
//             <Layout sidebar>
//                 <div className={classes.header} >
//                     <Typography className={classes.headerContent} variant="h5">
//                         Danh mục
//                     </Typography>
//                 </div>
//                 <Paper variant="outlined" className={classes.paper}>
//                     <Typography className={classes.inputSelect}>Danh mục</Typography>
//                     <MySelect
//                         onChange={handleChangeField}
//                         value={categoryField}
//                         autowidth
//                     >
//                         <MenuItem value="ethnic">Dân tộc</MenuItem>
//                         <MenuItem value="religion">Tôn giáo</MenuItem>
//                         <MenuItem value="position">Chức vụ</MenuItem>
//                         <MenuItem value="flanguage">Ngoại ngữ</MenuItem>
//                         <MenuItem value="flanguagelevel">Trình độ ngoại ngữ</MenuItem>
//                         <MenuItem value="it">Trình độ tin học</MenuItem>
//                         <MenuItem value="politics">Trình độ chính trị</MenuItem>
//                     </MySelect>
//                 </Paper>

//                 {/* Add form Category */}

//                 <AddFormCategory header={`Thêm ${categoryName}`}>
//                     <InputGrid nameTitle={`Tên ${categoryName}`} />
//                     {categoryField == "flanguagelevel" &&
//                         <InputGrid
//                             select={true}
//                             nameTitle={`Tên Ngoại ngữ`}
//                             value={languageSelected}
//                             onChange={handleChangeSelect}
//                         >
//                             <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
//                             {languageSelect.map(
//                                 l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
//                             )}
//                         </InputGrid>
//                     }
//                 </AddFormCategory>

//                 {/* Table */}

//                 <div className={`${classes.table} ag-theme-alpine`}>
//                     <AgGridReact
//                         rowData={rowData}
//                         gridOptions={gridOptions}
//                         onGridReady={onGridReady}
//                         animateRows={true}
//                     >
//                         {columnDefs.map(column => (<AgGridColumn {...column} key={column.field} />))}
//                     </AgGridReact>
//                 </div>
//             </Layout>
//         </>
//     );
// };

// export default Category;

import { MenuItem, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../action/categoryAction';
import AddFormCategory from '../component/AddFormCategory';
import DeleteFormCategory from '../component/DeleteFormCategory';
import EditFormCategory from '../component/EditFormCategory';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MySelect from '../component/UI/MySelect';
import '../public/css/Table.scss'

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: {
        height: '450px',
        width: 'auto',
        backgroundColor: 'white',
        marginTop: '20px',
    },
    editBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.info.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.info.dark
        },
    },
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        },
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        marginBottom: '16px',
    },
    inputSelect: {
        marginRight: '20px',
    }
}))

const Category = () => {
    const classes = useStyles();
    const [value, setValue] = useState([]);

    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState(value);

    const [categoryField, setCategoryField] = useState("ethnic");
    const [categoryName, setCategoryName] = useState("Dân tộc");

    const [key, setKey] = useState(["MaDanToc, TenDanToc, SoDangVien"])
    const [columnName, setColumnName] = useState([])
    const [valueField, setValueField] = useState('0001');

    const [languageSelect, setLanguageSelect] = useState([]);
    const [languageSelected, setLanguageSelected] = useState("0");

    const getFieldName = (value) => {
        const name = document.querySelector(`li[data-value=${value}]`)
        return name.innerText;
    }

    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
        setCategoryName(getFieldName(e.target.value));
    }

    const handleChangeSelect = (e) => {
        setLanguageSelected(e.target.value);
    }

    const handleChangeValueField = (e) => {
        console.log(e.target.value)
        setValueField(e.target.value);
    }
    
    useEffect(() => {
        console.log(languageSelect);
    },[languageSelect])

    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Mã Dân tộc", field: "MaDanToc" },
        { headerName: "Tên Dân tộc", field: "TenDanToc" },
        { headerName: "Số Đảng viên", field: "SoDangVien" },
        {
            headerName: "Chức năng", field: "MaDanToc", sortable: false, width: 200,
            cellRendererFramework: (params) => {
                const paramsArray = Object.values(params.data)
                return (
                    <>
                        <EditFormCategory
                            header={`Cập nhật ${categoryName}`}
                        >
                            <InputGrid nameTitle={"Mã Dân tộc"} value={paramsArray[0]} />
                            <InputGrid nameTitle={"Tên Dân tộc"} value={valueField} onChange={handleChangeValueField}/>
                            {categoryField == "flanguagelevel" &&
                                <InputGrid
                                    select={true}
                                    nameTitle={`Tên Ngoại ngữ`}
                                    value={languageSelected}
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
                                    {languageSelect.map(
                                        l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
                                    )}
                                </InputGrid>
                            }
                        </EditFormCategory>
                        <DeleteFormCategory />
                    </>
                )
            }
        },
    ])

    const gridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
        },
        pagination: true,
        paginationPageSize: "10",
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    const fetchApi = async () => {
        const res = await getAllCategory(categoryField)
        if (res) {
            res.columnName.push("Chức năng");
            setColumnName(res.columnName)
            setRowData(res.data);
            setKey(Object.keys(res.data[0]));
        }
    }

    const setHeaderNames = () => {
        if (gridApi) {
            const newColumns = gridApi.getColumnDefs();
            console.log(newColumns);
            newColumns.forEach((newColumn, index) => {
                newColumn.field = key[index];
                newColumn.headerName = columnName[index]
            });
            setColumnDefs(newColumns);
        }
    }

    useEffect(() => {
        console.log("key ", key);
        console.log("column name: ", columnName);
        console.log("row data: ", rowData);
        setHeaderNames();
        // gridApi.setColumnDefs()
    }, [key])

    useEffect(() => {
        fetchApi();
        const getFLanguage = async () => {
            const res = await getAllCategory("flanguage");
            setLanguageSelect(res.data);
        }
        getFLanguage();
    }, [])

    useEffect(() => {
        fetchApi();
    }, [categoryField])

    useEffect(() => {
        setColumnDefs([
            { headerName: "Mã Dân tộc", field: "MaDanToc" },
            { headerName: "Tên Dân tộc", field: "TenDanToc" },
            { headerName: "Số Đảng viên", field: "SoDangVien" },
            {
                headerName: "Chức năng", field: "MaDanToc", sortable: false, width: 200,
                cellRendererFramework: (params) => {
                    const paramsArray = Object.values(params.data)
                    return (
                        <>
                            <EditFormCategory
                                header={`Cập nhật ${categoryName}`}
                            >
                                <InputGrid nameTitle={`Mã ${categoryName}`} value={paramsArray[0]} />
                                <InputGrid nameTitle={`Tên ${categoryName}`} value={paramsArray[1]} />
                                {categoryField == "flanguagelevel" &&
                                    <InputGrid
                                        select={true}
                                        nameTitle={`Tên Ngoại ngữ`}
                                        value={languageSelected}
                                        onChange={handleChangeSelect}
                                    >
                                        <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
                                        {languageSelect.map(
                                            l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
                                        )}
                                    </InputGrid>
                                }
                            </EditFormCategory>
                            <DeleteFormCategory />
                        </>
                    )
                }
            },
        ])
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
                    </MySelect>
                </Paper>

                {/* Add form Category */}

                <AddFormCategory header={`Thêm ${categoryName}`}>
                    <InputGrid value={valueField} onChange={handleChangeValueField} nameTitle={`Tên ${categoryName}`} />
                    {categoryField == "flanguagelevel" &&
                        <InputGrid
                            select={true}
                            nameTitle={`Tên Ngoại ngữ`}
                            value={languageSelected}
                            onChange={handleChangeSelect}
                        >
                            <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
                            {languageSelect.map(
                                l => <MenuItem key={l.MaNgoaiNgu} value={l.MaNgoaiNgu}>{l.TenNgoaiNgu}</MenuItem>
                            )}
                        </InputGrid>
                    }
                </AddFormCategory>

                {/* Table */}

                <div className={`${classes.table} ag-theme-alpine`}>
                    <AgGridReact
                        rowData={rowData}
                        // columnDefs={columnDefs}
                        gridOptions={gridOptions}
                        onGridReady={onGridReady}
                        animateRows={true}
                    >
                        {columnDefs.map(column => (<AgGridColumn {...column} key={column.field} />))}
                    </AgGridReact>
                </div>
            </Layout>
        </>
    );
};

export default Category;