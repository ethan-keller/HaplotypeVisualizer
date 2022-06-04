import { Modal } from 'react-bootstrap';

interface AboutModalProps {
  onHide: () => void;
  show: boolean;
}

const AboutModal: React.FC<AboutModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Haplotype browser</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This is a program to browse polyploid haplotype graphs. The app reads GFA files.
        </p>
        <p>
          Contact <a href={'mailto:e.keller@student.tudelft.nl'}>Ethan Keller</a>
        </p>
        <p>
          {'Thanks to '}
          <a href={'https://github.com/rrwick/Bandage'}>Bandage</a>
          {' and '}
          <a href={'https://github.com/cmdcolin'}>Colin Diesh</a>
          {' for inspiration.'}
        </p>
        <p>
          <b>The app is still in development</b>
        </p>
        <a href={'https://github.com/ethan-keller/HaplotypeVisualizer'}>GitHub</a>
      </Modal.Body>
    </Modal>
  );
};

export default AboutModal;
