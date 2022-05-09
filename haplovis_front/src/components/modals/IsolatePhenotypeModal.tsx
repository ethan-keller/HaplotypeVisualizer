import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { SingleValue } from 'react-select';
import gfaApi from '../../api/gfa';
import phenoApi from '../../api/pheno';
import { updateIsolate, clearIsolate } from '../../slices/pheno';
import { useAppDispatch, useAppSelector } from '../../store';
import { PhenoOption } from '../../types/pheno';
import ColorPicker from '../ColorPicker';
import ErrorCard from '../ErrorCard';
import { getFilteredSegments } from '../select/PhenoFilterSelect';
import PhenoIsolateSelect from '../select/PhenoIsolateSelect';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';

interface IsolatePhenotypeModalProps {
  onHide: () => void;
  show: boolean;
}

const IsolatePhenotypeModal: React.FC<IsolatePhenotypeModalProps> = (props) => {
  const { data: phenotypes, isError } = phenoApi.useGetPhenotypesQuery();
  const { data: phenosPerSample } = phenoApi.useGetPhenosPerSampleQuery();
  const { data: paths } = gfaApi.useGetPathsQuery();
  const isolate = useAppSelector((state) => state.pheno.isolate);
  const [pheno, setPheno] = useState<SingleValue<PhenoOption> | undefined>(undefined);
  const [color, setColor] = useState<string>(isolate.color);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isolate.pheno.value !== '') {
      setPheno(isolate.pheno);
    }
  }, [isolate]);

  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Phenotype isolation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isError ? (
          <ErrorCard message='No phenotype information' />
        ) : phenotypes && phenosPerSample && paths ? (
          <>
            <p>Select a phenotype</p>
            <PhenoIsolateSelect
              value={pheno}
              onChange={(newPheno) => {
                setPheno(newPheno);
                if (!newPheno) {
                  dispatch(clearIsolate());
                }
              }}
            />
            <VerticalSpacer space={20} />
            {pheno ? (
              <>
                <span>Select a color</span>
                <ColorPicker defaultColor={color} onPick={(newColor) => setColor(newColor)} />
                <VerticalSpacer space={40} />
                <Button
                  style={{
                    backgroundColor: color,
                    borderColor: color,
                  }}
                  onClick={() => {
                    let isolate: Record<string, Set<string>> = {};
                    isolate[pheno.phenotype] = new Set([pheno.value]);
                    dispatch(
                      updateIsolate({
                        isolateSegments: new Set(
                          getFilteredSegments(phenosPerSample, paths, isolate),
                        ),
                        color: color,
                        pheno: pheno,
                      }),
                    );
                    setPheno(undefined);
                    props.onHide();
                  }}
                >
                  Isolate: <b>{pheno.label}</b>
                </Button>
                <Button
                  style={{ marginLeft: 6 }}
                  variant='danger'
                  onClick={() => {
                    setPheno(null);
                    dispatch(clearIsolate());
                  }}
                >
                  Clear
                </Button>
              </>
            ) : null}
          </>
        ) : (
          <SpinnerAnnotated message='Loading phenotypes' />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default IsolatePhenotypeModal;
