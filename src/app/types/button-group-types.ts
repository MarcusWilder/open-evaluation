import { ButtonType } from '@src/app/types/button-types';

export interface Button {
    content: string;
    type: ButtonType;
    onClick?: () => unknown;
}
