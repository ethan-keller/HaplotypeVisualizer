import { useMemo } from 'react';
import { Form } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { updateDrawPaths } from '../../slices/graphSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface DrawPathsCheckProps {}

const DrawPathsCheck: React.FC<DrawPathsCheckProps> = (props) => {
  const drawPaths = useAppSelector((state) => state.graphSettings.drawPaths);
  const { data: paths } = gfaApi.useGetPathsQuery();
  const dispatch = useAppDispatch();
  const noPaths = useMemo(() => {
    return paths ? Object.keys(paths).length === 0 : true;
  }, [paths]);

  return (
    <>
      <Form.Check
        type='switch'
        label='Draw paths'
        disabled={noPaths}
        checked={noPaths ? false : drawPaths}
        onChange={(e) => dispatch(updateDrawPaths(e.target.checked))}
      />
      {noPaths ? <span style={{ color: 'orange' }}>No paths detected</span> : null}
    </>
  );
};

export default DrawPathsCheck;
