import { BeatLoader } from "react-spinners";

const BeatLoaderComponent = ({ loading }) => {
  return (
    <div className="loader-container">
      <BeatLoader
        color="#36D7B7"
        loading={loading}
        size={15}
        className="flex justify-center items-center h-60"
      />
    </div>
  );
};

export default BeatLoaderComponent;
