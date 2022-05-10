import { useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { updateDrawPaths } from '../../slices/graphSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface DrawPathsCheckProps {}

const DrawPathsCheck: React.FC<DrawPathsCheckProps> = (props) => {
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const { data: paths } = gfaApi.useGetPathsQuery();
  const dispatch = useAppDispatch();
  const noPaths = useMemo(() => {
    return paths ? Object.keys(paths).length === 0 : true;
  }, [paths]);

  useEffect(() => {
    if (noPaths) dispatch(updateDrawPaths(false));
  }, [noPaths, dispatch]);
  return (
    <>
      <Form.Check
        type='switch'
        label='Draw paths'
        disabled={noPaths}
        checked={noPaths ? false : graphSettings.drawPaths}
        onChange={(e) => dispatch(updateDrawPaths(e.target.checked))}
      />
      <span style={{ color: 'orange' }}>No paths detected</span>
    </>
  );
};

export default DrawPathsCheck;
