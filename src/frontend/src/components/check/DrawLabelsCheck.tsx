import { Form } from 'react-bootstrap';
import { updateDrawLabels } from '../../slices/graphSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface DrawLabelsCheckProps {}

const DrawLabelsCheck: React.FC<DrawLabelsCheckProps> = (props) => {
  const drawLabels = useAppSelector((state) => state.graphSettings.drawLabels);
  const dispatch = useAppDispatch();
  return (
    <Form.Check
      type='switch'
      label='Draw labels'
      checked={drawLabels}
      onChange={(e) => dispatch(updateDrawLabels(e.target.checked))}
    />
  );
};

export default DrawLabelsCheck;
