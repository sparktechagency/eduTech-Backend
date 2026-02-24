import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { AssignmentService } from './assignment.service';
import { getMultipleFilesPath, getSingleFilePath } from '../../../../shared/getFilePath';

const createAssignment = catchAsync(async (req: Request, res: Response) => {
  const { ...assignmentData } = req.body;
  const teacherId = req.user?.id;
  let attachment = getSingleFilePath(req.files, 'attachment');
  if (attachment) {
    assignmentData.attachment = attachment;
  }
  assignmentData.teacher = teacherId;
  const result = await AssignmentService.createAssignmentToDB(assignmentData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Assignment Created successfully',
    data: result,
  });
});

const getAllAssignments = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await AssignmentService.getAllAssignmentsFromDB(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All assignments retrieved successfully',
    pagination: result.pagination,
    data: result.assignments,
  });
});

const getAssignmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssignmentService.getAssignmentByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Assignment retrieved successfully',
    data: result,
  });
});

const updateAssignment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;
  const teacherId = req.user?.id;
  let attachment = getSingleFilePath(req.files, 'attachment');
  if (attachment) {
    updateData.attachment = attachment;
  }
  updateData.teacher = teacherId;
  const result = await AssignmentService.updateAssignmentToDB(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Assignment updated successfully',
    data: result,
  });
});

const deleteAssignment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssignmentService.deleteAssignmentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Assignment deleted successfully',
    data: result,
  });
});

export const AssignmentController = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
