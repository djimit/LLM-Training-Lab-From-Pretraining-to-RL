
/**
 * Error logging utility
 * In production, this should integrate with services like Sentry, LogRocket, etc.
 */

export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export interface ErrorLog {
  message: string;
  severity: ErrorSeverity;
  timestamp: Date;
  context?: Record<string, unknown>;
  error?: Error;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100;

  log(
    message: string,
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    error?: Error,
    context?: Record<string, unknown>
  ): void {
    const errorLog: ErrorLog = {
      message,
      severity,
      timestamp: new Date(),
      context,
      error
    };

    this.logs.push(errorLog);

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console logging based on severity
    if (import.meta.env.DEV || severity === ErrorSeverity.CRITICAL) {
      switch (severity) {
        case ErrorSeverity.INFO:
          console.info(`[INFO] ${message}`, context);
          break;
        case ErrorSeverity.WARNING:
          console.warn(`[WARNING] ${message}`, context);
          break;
        case ErrorSeverity.ERROR:
        case ErrorSeverity.CRITICAL:
          console.error(`[${severity.toUpperCase()}] ${message}`, error, context);
          break;
      }
    }

    // TODO: In production, send to error tracking service
    // if (!import.meta.env.DEV && severity === ErrorSeverity.CRITICAL) {
    //   sendToSentry(errorLog);
    // }
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(message, ErrorSeverity.INFO, undefined, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(message, ErrorSeverity.WARNING, undefined, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(message, ErrorSeverity.ERROR, error, context);
  }

  critical(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(message, ErrorSeverity.CRITICAL, error, context);
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new ErrorLogger();
