import React from 'react';

const MyInput = () => {
    return (
        <TextField
            {...register("name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
            })}
            fullWidth
            label="Họ Tên"
            variant="standard"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Nguyễn Văn A"
        />
    );
};

export default MyInput;