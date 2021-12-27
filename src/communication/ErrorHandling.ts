class ErrorHandling {
  public static successfulResponse(status: number): boolean {
    return status >= 200 && status < 300;
  }
}

export default ErrorHandling;
