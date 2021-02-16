import { createDispatch } from './index';

describe('dispatch module', () => {
  const key = process.env.SEND_GRID_KEY;
  let logger, dispatch;

  beforeEach(() => {
    logger = { error: jest.fn() };
    dispatch = createDispatch('vanilla', { key, logger });
  });

  test('successful dispatch messages', async () => {
    const mail = {
      to: 'sandbox@mail.com',
      subject: 'sandbox',
      message: 'message send'
    };

    const result = await dispatch(mail);
    expect([200, 202]).toContain(result.statusCode);
  });

  test('logs error whens receives bad mail object', async () => {
    const mail = {
      message: 'test without "to" and "subject"'
    };
    await dispatch(mail);
    expect(logger.error).toHaveBeenCalled();
  });
});
