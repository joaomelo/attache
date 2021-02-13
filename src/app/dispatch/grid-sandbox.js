import { createSendGridDispatch } from './grid';

export function createSendGridSandboxDispatch (options) {
  const optionsWithSandbox = {
    ...options,
    defaults: {
      from: 'sandbox@email.com',
      mailSettings: {
        sandboxMode: {
          enable: true
        }
      }
    }
  };

  return createSendGridDispatch(optionsWithSandbox);
}
