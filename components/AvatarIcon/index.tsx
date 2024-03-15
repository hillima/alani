import { Image } from '../../styles/index.styled';
import { AvatarImage } from './AvatarIcon.styled';

type AvatarIconProps = {
  avatar: string;
  size: string;
  margin?: string;
};

const AvatarIcon = ({ avatar, size, margin }: AvatarIconProps): JSX.Element => {
  return (
      <Image
        style={{borderRadius: '50%'}}
        width={size || '32px'}
        height={size || '32px'}
        alt="avatar"
        src={
          avatar ? `data:image/jpeg;base64,${avatar}` : '/default-avatar.png'
        }
      />
  );
};

export default AvatarIcon;
