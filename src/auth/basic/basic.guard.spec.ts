import { BasicAuthGuard } from './basic.guard';
import { Reflector } from '@nestjs/core';

describe('BasicAuthGuard', () => {
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
  });

  it('should be defined', () => {
    expect(new BasicAuthGuard(reflector)).toBeDefined();
  });
});
