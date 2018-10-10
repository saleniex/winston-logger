import * as crypto from 'crypto';

export class RequestIdFactory {
    public create(): string {
        return crypto.randomBytes(8).toString("hex");
    }
}