import Image from "next/image";
import toast from "react-hot-toast";
import './editable.css';

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response => {
        if (response.ok) {
          return response.json().then(link => {
            setLink(link);
          });
        }
        throw new Error('Something went wrong');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: 'Upload error',
      });
    }
  }

  return (
    <>
      {link ? (
        <Image
          className="editable-image"
          src={link}
          width={250}
          height={250}
          alt="avatar"
        />
      ) : (
        <div className="editable-placeholder">No image</div>
      )}
      <label>
        <input type="file" className="editable-input" onChange={handleFileChange} />
        <span className="editable-button">Change image</span>
      </label>
    </>
  );
}
