import { deleteBudget } from "@/store/fundsSlice";
import { useDispatch } from "react-redux";

const DeleteBudgetModal = ({ category, id, isVisible, onChangeVisibility }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBudget({ id }));
    onChangeVisibility(false);
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20">
      <div className="w-[35rem] max-w-[90%] bg-white p-5 md:p-8 flex flex-col rounded-xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-grey-900 text-[2rem] font-bold">
            Delete &lsquo;{category}&rsquo;?
          </h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close delete pot window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500 mb-5">
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        <button
          className="mt-5 w-full h-[3.3125rem] bg-red text-white text-sm font-bold rounded-lg"
          onClick={handleDelete}
        >
          Yes, Confirm Deletion
        </button>
        <p
          className="mt-5 text-center text-sm font-bold text-grey-500 cursor-pointer"
          onClick={() => onChangeVisibility(false)}
        >
          No, Go Back
        </p>
      </div>
    </div>
  );
};

export default DeleteBudgetModal;
