
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
//v1.4.4-Inject JWT service here
constructor(private jwtService:JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractFromHeader(request);
    if(!token){
        // return false; //this will return Forbidden 403 error. so better to avoid this.
        throw new UnauthorizedException("Invalid Null Token.");
    }
    //So the token is not empy so validation required!
    try{
        const payload = this.jwtService.verify(token); // Throw error in case of expired token or unavailable Token
        request.userID = payload.userID; //This will allow us to fetch the user id for valid tokens. So for valid users, we get user id and perform operations directly

    }catch(error){
        Logger.error(error.message); //console logging the error 
        throw new UnauthorizedException("Invalid Entry of Token.")
    }
    return true;
  }
}

function extractFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1]; 
    // fetching from header, .(key which is authorization here), optional part ?.split(' '), index value[0] mean Bearer, [1] entered token

}
