export enum QuestionType {
    RANKING = "RANKING",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    FREE_RESPONSE = "FREE_RESPONSE",
}

export interface Question {
    _id: number;
    type: QuestionType;
    baseQuestion: string;
    options?: unknown[];
    answer?: any;
}
export interface QuestionWithResponses {
    _id: number;
    type: QuestionType;
    baseQuestion: string;
    options?: unknown[];
    responses: number[] | string[];
}