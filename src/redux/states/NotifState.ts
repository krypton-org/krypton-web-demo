export enum Severity {
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

export interface Notification {
    message: string;
    type: Severity;
    date: Date;
}

export default interface NotifierState {
    lastNotification: Notification | null;
}
