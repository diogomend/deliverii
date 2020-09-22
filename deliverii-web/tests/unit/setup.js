global.console = {
    ...global.console,
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
  };
  