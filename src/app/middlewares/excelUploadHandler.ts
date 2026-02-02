import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const excelUploadHandler = () => {
    const storage = multer.memoryStorage();

    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowedMimes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel' // .xls
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new ApiError(StatusCodes.BAD_REQUEST, 'Only .xlsx or .xls files are allowed!'));
        }
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024, // 5 MB
        },
    }).single('file'); 

    return upload;
};

export default excelUploadHandler;