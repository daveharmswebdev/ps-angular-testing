import { MessageService } from "./message.service";

describe('Message Service', () => {
  let service: MessageService

  beforeEach(() => {
  });

  it('should have no messages to start', () => {
    service = new MessageService();

    expect(service.messages.length).toEqual(0);
  });

  it('should add a message when add is called', () => {
    service = new MessageService();

    service.add('test');

    expect(service.messages.length).toEqual(1);
  });

  it('should have no messages when clear is called', () => {
    service = new MessageService();
    service.add('test');

    service.clear();

    expect(service.messages.length).toEqual(0);
  });
});
