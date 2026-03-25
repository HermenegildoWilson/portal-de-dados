import deviceDto from './device.dto';
import userFields from './user-fields-auth.dto';

export default class SigInAuthDto {
  userFields!: userFields;
  deviceDto!: deviceDto;
}
