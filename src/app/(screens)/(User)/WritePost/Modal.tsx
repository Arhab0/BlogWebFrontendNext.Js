import React from "react";

type PageProps = {
  isOpen: boolean;
  onClose: () => void;
};
const Modal = ({ isOpen, onClose }: PageProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full text-start">
        <h2 className="text-xl font-bold mb-4">Important Notice</h2>
        <p className="mb-4">
          Your Blog is Under Review Thank you for submitting your blog post. It
          is currently in the review stage. Our admin team will carefully review
          the content to ensure it complies with our community guidelines and
          quality standards.
          <br />
          <br />
          <strong>⏳ What to Expect:</strong> Once your blog is approved by the
          admin, it will be published and visible to all users on the platform.
          <br />
          <br />
          <strong>🔒 Note:</strong> Please remember that content that is
          offensive, racist, sexually explicit, or violates our terms will be
          rejected. Such posts will not be reactivated and may lead to a
          permanent ban from the website. We appreciate your understanding and
          patience during the review process.
        </p>
        <button
          className={`relative inline-flex items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
        >
          <span
            className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
            onClick={onClose}
          >
            I accept
          </span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
