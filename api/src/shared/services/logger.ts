import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: any, context?: string) {}
  error(message: any, trace?: string, context?: string) {
    // Sentry salvar erros e tudo mais
  }
  warn(message: any, context?: string) {
    console.log(message);
  }
  debug?(message: any, context?: string) {
    console.log(message);
  }
  verbose?(message: any, context?: string) {
    console.log(message);
  }
}
