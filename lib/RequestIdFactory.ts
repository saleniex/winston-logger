import * as crypto from 'crypto';

export default class RequestIdFactory {
    public create(): string {
        return crypto.randomBytes(8).toString("hex");
    }
}