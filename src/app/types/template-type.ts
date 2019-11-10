export enum TemplateType {
    DEFAULT = 'DEFAULT',
    CTL = 'CTL',
    CIOS = 'CIOS',
    GENERAL = 'GENERAL',
    LAB_PROBLEM_SOLVE = 'LAB_PROBLEM_SOLVE',
    DISCUSSION = 'DISCUSSION',
    TEAM = 'TEAM'
}

export function toDisplayString(type: TemplateType): string {
    switch(type) {
        case TemplateType.DEFAULT:
            return 'Default';
        case TemplateType.CTL:
            return 'CTL';
        case TemplateType.CIOS:
            return 'CIOS';
        case TemplateType.GENERAL:
            return 'General';
        case TemplateType.LAB_PROBLEM_SOLVE:
            return 'Lab Problem Solve';
        case TemplateType.DISCUSSION:
            return 'Discussion';
        case TemplateType.TEAM:
            return 'Team'
        default:
            return 'Undefined';
    }
}
