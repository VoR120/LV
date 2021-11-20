const sql = require('../configs/db');

exports.getGenderStatistic = (req, res) => {
    try {
        sql.query(`SELECT  GioiTinh, count(GioiTinh) as SoLuong FROM dangvien GROUP BY GioiTinh`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getPartyCellStatistic = (req, res) => {
    try {
        sql.query(`SELECT  chibo.MaChiBo, chibo.TenChiBo ,count(dangvien.MaChiBo) as SoLuong 
        FROM chibo 
        LEFT JOIN dangvien 
        ON dangvien.MaChiBo = chibo.MaChiBo
        GROUP BY MaChiBo`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getPositionStatistic = (req, res) => {
    try {
        sql.query(`SELECT  chucvu.MaChucVu, chucvu.TenChucVu ,count(dangvien.MaChucVu) as SoLuong 
        FROM chucvu 
        LEFT JOIN dangvien 
        ON dangvien.MaChucVu = chucvu.MaChucVu
        GROUP BY MaChucVu`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getEthnicStatistic = (req, res) => {
    try {
        sql.query(`SELECT  dantoc.MaDanToc, dantoc.TenDanToc ,count(dangvien.MaDanToc) as SoLuong 
        FROM dantoc 
        LEFT JOIN dangvien 
        ON dangvien.MaDanToc = dantoc.MaDanToc
        GROUP BY MaDanToc`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getReligionStatistic = (req, res) => {
    try {
        sql.query(`SELECT  tongiao.MaTonGiao, tongiao.TenTonGiao ,count(dangvien.MaTonGiao) as SoLuong 
        FROM tongiao 
        LEFT JOIN dangvien 
        ON dangvien.MaTonGiao = tongiao.MaTonGiao
        GROUP BY MaTonGiao`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getAgeStatistic = (req, res) => {
    try {
        sql.query(`SELECT
        SUM(IF(year(current_date()) - year(dangvien.NgaySinh) BETWEEN 18 and 30,1,0)) as '18 - 30',
        SUM(IF(year(current_date()) - year(dangvien.NgaySinh) BETWEEN 31 and 40,1,0)) as '31 - 40',
        SUM(IF(year(current_date()) - year(dangvien.NgaySinh) BETWEEN 41 and 50,1,0)) as '41 - 50',
        SUM(IF(year(current_date()) - year(dangvien.NgaySinh) BETWEEN 51 and 60,1,0)) as '51 - 60',
        SUM(IF(year(current_date()) - year(dangvien.NgaySinh) >= 60,1,0)) as 'Trên 60'
        FROM dangvien;
        `,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}


exports.getITStatistic = (req, res) => {
    try {
        sql.query(`SELECT tinhoc.MaTinHoc, tinhoc.TenTinHoc ,count(dangvien.MaTinHoc) as SoLuong 
        FROM tinhoc 
        LEFT JOIN dangvien 
        ON dangvien.MaTinHoc = tinhoc.MaTinHoc
        GROUP BY MaTinHoc`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getPoliticsStatistic = (req, res) => {
    try {
        sql.query(`SELECT chinhtri.MaChinhTri, chinhtri.TenChinhTri ,count(dangvien.MaChinhTri) as SoLuong 
        FROM chinhtri 
        LEFT JOIN dangvien 
        ON dangvien.MaChinhTri = chinhtri.MaChinhTri
        GROUP BY MaChinhTri`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                res.status(200).json({ data: result })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}