import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ValidationError } from "class-validator";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const exceptionResponse = exception.getResponse() as any

        if (exceptionResponse.message && Array.isArray(exceptionResponse.message)) {
            const validationErrors = exceptionResponse.message;
            const errorType = this.categorizeError(validationErrors);

            let customResponse;

            switch (errorType) {
                case 'WRONG_DATATYPE':
                    customResponse = {
                        code: 201,
                        message: 'data is abnormal'
                    };
                    break;
                case 'MISSING_PARAMETER':
                    customResponse = {
                        code: 202,
                        message: 'necessary parameter/s are missing'
                    };
                    break;
                default:
                    customResponse = {
                        code: 201,
                        message: 'data is abnormal'
                    };
            }

            return response.status(HttpStatus.BAD_REQUEST).json(customResponse);
        }

        response.status(HttpStatus.BAD_REQUEST).json({
            code: 201,
            message: 'data is abnormal'
        });

    }

    private categorizeError(validationError: string[]): string {
        for (const error of validationError) {
            // Check for missing parameter errors
            if (error.includes('should not be empty') ||
                error.includes('must be defined') ||
                error.includes('is required')) {
                return 'MISSING_PARAMETER';
            }

            // Check for wrong datatype errors
            if (error.includes('must be a string') ||
                error.includes('must be a number') ||
                error.includes('must be a boolean') ||
                error.includes('must be an array') ||
                error.includes('must be a date') ||
                error.includes('should be a') ||
                error.includes('must match')) {
                return 'WRONG_DATATYPE';
            }
        }

        return "WRONG_DATATYPE"
    }

}