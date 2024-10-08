const PopUp = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 z-50 left-0 right-0 bottom-0 flex 
    justify-center items-center bg-black bg-opacity-50 ">
      <div className="flex flex-col bg-white p-8  rounded-lg shadow-lg max-w-sm w-full">
        <div className="">
          <button onClick={onClose} className="rounded-lg p-3 shadow-lg ">
            X
          </button>
        </div>
        <h1 className="text-center p-5 pt-0 text-6xl">{message.type}</h1>
        <p className="text-center text-red-500 font-bold">{message.message}</p>
      </div>
    </div>
  );
};

export default PopUp;
