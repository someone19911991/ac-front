import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrderCallFormProps } from "../OrderCall/OrderCall";


export const orderCall = createAsyncThunk<any, IOrderCallFormProps>(
    "app/orderCall",
    async (data, thunkAPI) => {
        try {
            const formData = new FormData();
            data.file && formData.append("file", data.file[0]);
            const { file, ...rest } = data;
            for (let i in rest) {
                const fieldValue = rest[i as keyof typeof rest];
                fieldValue && formData.append(i, fieldValue);
            }
            let result = await fetch(`https://www.backend.autocomplex.am/api/mail`, {
                method: "POST",
                body: formData,
            });
            if(!result.ok){
                return thunkAPI.rejectWithValue(result.statusText);
            }
            return "All right";
        } catch (err) {
            const error = err as { message: string };
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
