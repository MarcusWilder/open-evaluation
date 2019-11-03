export interface ResponseData {
    _id: {
        courseId: number;
        surveyId: number;
        studentId: number;    
    },
    template: string;
    responses: any[];
}