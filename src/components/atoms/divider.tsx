import {View} from 'react-native';

interface IProps {
  height: number;
  color?: string;
}
export const Divider = ({height, color}: IProps) => (
  <View style={{height, backgroundColor: color || 'white'}} />
);
