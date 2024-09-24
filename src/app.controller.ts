import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from './auth/public/public.decorator';

@Public('basic')
@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  @Get('test')
  getHello(): string {
    return 'Hello World!';
  }
}
