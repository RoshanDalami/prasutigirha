import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

export async function GET(){
    const cookie = cookies().get('token').value;
    const decodedToken = jwt.decode(cookie)
    console.log(decodedToken,'cookie')
}