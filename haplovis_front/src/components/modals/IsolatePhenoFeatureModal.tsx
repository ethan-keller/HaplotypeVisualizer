import { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import phenoApi from '../../api/pheno';
import { updateIsolate, clearIsolate } from '../../slices/pheno';
import { useAppDispatch, useAppSelector } from '../../store';
import { PhenoFeature, PhenosPerSample } from '../../types/pheno';
import ColorPicker from '../ColorPicker';
import ErrorCard from '../ErrorCard';
import PhenoFeatureIsolateSelect from '../select/PhenoFeatureIsolateSelect';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';
import { GfaPath } from '../../types/gfa';
import { useEffect } from 'react';

interface IsolatePhenoFeatureModalProps {
  onHide: () => void;
  show: boolean;
}

const IsolatePhenoFeatureModal: React.FC<IsolatePhenoFeatureModalProps> = (props) => {
  const { data: phenotypes, isError } = phenoApi.useGetPhenotypesQuery();
  const { data: phenosPerSample } = phenoApi.useGetPhenosPerSampleQuery();
  const { data: paths } = gfaApi.useGetPathsQuery();

  const isolate = useAppSelector((state) => state.pheno.isolate);
  const [phenoFeature, setPhenoFeature] = useState<PhenoFeature | undefined>(undefined);
  const [colors, setColors] = useState<Record<string, string> | undefined>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isolate) {
      setColors(undefined);
      setPhenoFeature(undefined);
    }
  }, [isolate]);

  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Pheno feature isolation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isError ? (
          <ErrorCard message='No phenotype information' />
        ) : phenotypes && phenosPerSample && paths ? (
          <>
            <p>Select a pheno feature</p>
            <PhenoFeatureIsolateSelect
              value={phenoFeature ? { label: phenoFeature, value: phenoFeature } : null}
              onChange={(newPheno) => {
                setPhenoFeature(newPheno ? newPheno.value : undefined);
                if (!newPheno) {
                  dispatch(clearIsolate());
                }
              }}
            />
            <VerticalSpacer space={20} />
            {phenoFeature && phenoFeature in phenotypes ? (
              <>
                <span>Assign colors to phenotypes</span>
                <VerticalSpacer space={10} />
                <Table>
                  <tbody>
                    {phenotypes[phenoFeature].map((phenotype, i) => {
                      return (
                        <tr key={i}>
                          <td>{phenotype}</td>
                          <td>
                            <ColorPicker
                              defaultColor={
                                colors && phenotype.toString() in colors
                                  ? colors[phenotype.toString()]
                                  : '#000000'
                              }
                              onPick={(color) =>
                                setColors((colors) => {
                                  const newColors = { ...colors };
                                  newColors[phenotype.toString()] = color;
                                  return newColors;
                                })
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Button
                  onClick={() => {
                    dispatch(
                      updateIsolate({
                        isolateColors: getIsolateColors(
                          phenosPerSample,
                          paths,
                          phenoFeature,
                          colors ?? {},
                        ),
                        phenoFeature: phenoFeature,
                      }),
                    );
                    props.onHide();
                  }}
                >
                  Isolate: <b>{phenoFeature}</b>
                </Button>
                <Button
                  style={{ marginLeft: 6 }}
                  variant='danger'
                  onClick={() => {
                    setPhenoFeature(undefined);
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

const getIsolateColors = (
  phenosPerSample: PhenosPerSample,
  paths: Record<string, GfaPath>,
  phenoFeature: PhenoFeature,
  colors: Record<string, string>,
) => {
  let result: Record<string, string[]> = {};
  for (const [sample, phenoRecord] of Object.entries(phenosPerSample)) {
    if (!(phenoFeature in phenoRecord) || !(phenoRecord[phenoFeature] in colors)) continue;
    const color = colors[phenoRecord[phenoFeature]];
    for (const segment of paths[sample].segment_names) {
      if (!(segment in result)) {
        result[segment] = [];
      }
      result[segment].push(color);
    }
  }
  console.log(result);
  return result;
};

export default IsolatePhenoFeatureModal;
