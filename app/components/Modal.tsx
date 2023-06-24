export const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-xl font-semibold mb-4">Bạn có chắc chắn muốn nộp bài?</p>
        <div className="flex items-center justify-around">
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg" onClick={onConfirm}>
            Đồng ý
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg mr-4" onClick={onClose}>
            Hủy
          </button>
          
        </div>
      </div>
    </div>
  );
};

export const ModalAdmin = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-xl font-semibold mb-4">Bạn có muốn thoát trang chỉnh sửa?</p>
        <div className="flex items-center justify-around">
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg" onClick={onConfirm}>
            Đồng ý
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg mr-4" onClick={onClose}>
            Hủy
          </button>
          
        </div>
      </div>
    </div>
  );
};

export const ModalDelete = ({ onClose, onConfirm, questionId }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-20">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-xl font-semibold mb-4">Bạn có muốn xóa câu hỏi này?</p>
        <div className="flex items-center justify-around">
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg" onClick={onConfirm}>
            Đồng ý
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg mr-4" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};