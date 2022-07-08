import { Modal } from 'react-bootstrap';

interface AboutModalProps {
  onHide: () => void;
  show: boolean;
}

const AboutModal: React.FC<AboutModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>
          HaplotypeVisualizer <span className='text-muted'>v{process.env.REACT_APP_VERSION}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>HaplotypeVisualizer is a graph-based haplotype visualizer.</p>
        <p>Haplotypes differences can be visualized with optional phenotype meta-data.</p>
        <p>
          Bug or feature request:{' '}
          <a href={'https://github.com/ethan-keller/HaplotypeVisualizer/issues'}>Post an issue</a>
        </p>
        <p>
          {'Thanks to '}
          <a href={'https://github.com/rrwick/Bandage'}>Bandage</a>
          {' and '}
          <a href={'https://github.com/cmdcolin'}>Colin Diesh</a>
          {' for inspiration.'}
        </p>
        <a href={'https://github.com/ethan-keller/HaplotypeVisualizer'}>GitHub</a>
      </Modal.Body>
    </Modal>
  );
};

export default AboutModal;
