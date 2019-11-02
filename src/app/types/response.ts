export interface ResponseData {
    _id: {
        courseId: number;
        surveyId: number;
        studentId: number;    
    },
    template: 'DEFAULT' | 'CTL';
    responses: any[];
}