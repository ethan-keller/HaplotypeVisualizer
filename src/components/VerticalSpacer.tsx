interface VerticalSpacerProps {
  space: number;
}

const VerticalSpacer: React.FC<VerticalSpacerProps> = (props) => {
  return <div style={{ height: props.space }} className='vertical-spacer' />;
};

export default VerticalSpacer;
