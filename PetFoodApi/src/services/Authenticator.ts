import * as jwt from "jsonwebtoken";

export interface AuthenticatorData {
    id:string
}
export class Authenticator {

    generateToken(info: any): string{

        const token = jwt.sign(
            {id: info.id,
            role: info.role},
            process.env.JWT_KEY as string,
            {expiresIn: "36h"}
        )
        return token;
    }

    getTokenData(token: string): AuthenticatorData{

        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
        );

        return payload as AuthenticatorData

    }
}