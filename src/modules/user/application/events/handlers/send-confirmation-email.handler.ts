import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../user.register.event';

@EventsHandler(UserRegisteredEvent)
export class SendConfirmationEmailHandler
  implements IEventHandler<UserRegisteredEvent>
{
  handle(event: UserRegisteredEvent) {
    console.log(`Send confirmation email to ${event.email}`);
  }
}
