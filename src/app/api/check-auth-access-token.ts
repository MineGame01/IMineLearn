import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { IUser } from "@entities/User";
import { getEnvVar } from "@shared/lib";

export const checkAuthAccessToken = async (handler: (request: NextRequest) => NextResponse<any> | Promise<NextResponse<any> | undefined | void>) => {
    return async (request: NextRequest) => {
        const authorization: string | null = request.headers.get("authorization")

        if (!authorization) {
            return NextResponse.json({ message: 'Request not authorized!' }, { status: 401 })
        }

        try {
            return jwt.verify(authorization, getEnvVar("PRIVATE_KEY_JWT"), async (error, decoded) => {
                if (error) {
                    return NextResponse.json({ message: "Authorization failed! Please try again" }, { status: 500 })
                }
            
                if (decoded && typeof decoded === "object") {
                    request.auth = decoded as IUser
                    return await handler(request)
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ message: error.message }, { status: 401 })
            } else {
                throw error
            }
        }
    }
}