enum QuestionType {
    RANKING = "RANKING",
    MULTIPLE_CHOID = "MULTIPLE_CHOICE",
    FREE_RESPONSE = "FREE_RESPONSE",
}

export interface Question {
    _id: number;
    type: QuestionType;
    baseQuestion: string;
    options?: unknown[];
    answer?: any;
}
