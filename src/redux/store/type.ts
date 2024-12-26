import {IAuthState} from '../slices/auth';
import {INotificationState} from '../slices/notification';
interface IState {
  auth: IAuthState;
  notification: INotificationState;
}

export default IState;
