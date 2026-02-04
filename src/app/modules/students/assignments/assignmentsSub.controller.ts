import { Request, Response } from 'express'
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { AssignmentsSubService } from './assignmentsSub.service';
import path from 'path';

const submitAssignment = catchAsync(async (req: Request, res: Response) => {
    const { assignmentId } = req.params;
    const studentId = req.user?.id; 

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const fileData = files?.['file-assignment'] ? files['file-assignment'][0] : null;
    
    let fileUrl = '';
    if (fileData?.path) {
        fileUrl = path.relative(process.cwd(), fileData.path);
    }

    if (!studentId || !fileUrl) {
        throw new Error(`Required data missing. studentId: ${studentId}, file: ${fileUrl}`);
    }

    const submissionData = {
        assignmentId,
        studentId,
        fileAssignment: fileUrl,
        ...req.body,
    };

    const result = await AssignmentsSubService.submitAssignmentIntoDB(submissionData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Assignment submitted successfully',
        data: result,
    });
});


const getAssignmentSubmissions = catchAsync(async (req: Request, res: Response) => {
  const { assignmentId } = req.params;
  const result = await AssignmentsSubService.getSubmissionsForTeacherFromDB(assignmentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Submissions retrieved successfully',
    data: result,
  });
});

const getMySubmissions = catchAsync(async (req: Request, res: Response) => {
  // Assuming student ID comes from auth middleware
  const studentId = req.user?.id;
  const result = await AssignmentsSubService.getStudentOwnSubmissionsFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your submissions retrieved successfully',
    data: result,
  });
});

export const AssignmentsSubController = {
  submitAssignment,
  getAssignmentSubmissions,
  getMySubmissions,
};