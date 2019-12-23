import { IRouterContext } from 'koa-router';
import { BetterRequest } from './'

export interface BetterContext extends IRouterContext {
  request: BetterRequest;
  session: any;
}